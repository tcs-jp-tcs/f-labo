import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * /admin/plan（投稿計画・週カレンダー）のデータアクセス層。
 *
 * content_plan は「投稿日(planned_date)」と「制作日(production_date)」の2つの日付を持つ。
 * カレンダーは各日を上段=投稿／下段=制作の2段に分けるため、同じ行が両段に出ることがある。
 */

export type PlanItem = {
  id: string;
  plannedDate: string | null;
  productionDate: string | null;
  title: string;
  genre: string;
  platform: string;
  production: string | null;
  status: string;
  rationale: string | null;
};

/** カレンダーの1日ぶん */
export type PlanDay = {
  /** YYYY-MM-DD */
  date: string;
  /** 「9/3」 */
  label: string;
  /** 「木」 */
  weekday: string;
  /** 月=0 … 日=6 */
  weekdayIndex: number;
  isToday: boolean;
  /**
   * レース開催日かどうか。schedules テーブルとの紐付けは未実装のため常に false。
   * 将来 getPlan() で埋めれば、日付ヘッダに .is-race が付いて見た目だけ変わる。
   */
  isRaceDay: boolean;
  /** planned_date がこの日の計画（上段） */
  posts: PlanItem[];
  /** production_date がこの日の計画（下段） */
  productions: PlanItem[];
};

export type PlanWeek = {
  /** 週の月曜（YYYY-MM-DD） */
  monday: string;
  sunday: string;
  /** 「2026.08.31 — 09.06」 */
  label: string;
  prevMonday: string;
  nextMonday: string;
  /** 今日を含む週かどうか */
  isCurrentWeek: boolean;
  days: PlanDay[];
  /** この週に出てくる計画の実数（重複を除く） */
  itemCount: number;
};

export type Plan = {
  configured: boolean;
  error: string | null;
  week: PlanWeek;
  /** 今日を含む週の月曜（「今週へ」リンク用） */
  todayMonday: string;
  /** 全計画の件数 */
  totalCount: number;
  /** 根拠が書かれている件数 */
  withRationale: number;
  /**
   * 表示中の週が空のときに案内する、計画のある最も近い週の月曜。
   * 空でない、または候補が無いときは null。
   */
  nearestWeekWithItems: string | null;
};

/* ------------------------------------------------------------ 日付ヘルパ */

const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"];

/** JST の今日（YYYY-MM-DD） */
export function todayJst(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * 実在する YYYY-MM-DD かどうか。
 * 形式だけ見ると "9999-99-99" や "2026-02-30" も通ってしまい、Date が桁あふれして
 * toISOString() が投げる（=500）ため、往復チェックと年の範囲で弾く。
 */
function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 2000 || year > 2100) return false;
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

/** YYYY-MM-DD に n 日足す。UTC で計算するのでタイムゾーンの影響を受けない */
export function addDays(date: string, days: number): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

/** 月=0 … 日=6 */
function weekdayIndex(date: string): number {
  const [year, month, day] = date.split("-").map(Number);
  return (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7;
}

/** その日を含む週の月曜 */
export function mondayOf(date: string): string {
  return addDays(date, -weekdayIndex(date));
}

/** 「9/3」 */
function shortLabel(date: string): string {
  const [, month, day] = date.split("-").map(Number);
  return `${month}/${day}`;
}

/** 「2026.08.31 — 09.06」 */
function weekLabel(monday: string, sunday: string): string {
  return `${monday.replaceAll("-", ".")} — ${sunday.slice(5).replace("-", ".")}`;
}

/** ?week= の値を週の月曜に正規化する。不正なら今日の週 */
export function parseWeekParam(
  value: string | string[] | undefined,
  today: string,
): string {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !isRealDate(raw)) return mondayOf(today);
  return mondayOf(raw);
}

/* ------------------------------------------------------------------ 取得 */

type PlanRow = {
  id: string;
  planned_date: string | null;
  production_date: string | null;
  title: string;
  genre: string;
  platform: string;
  production: string | null;
  status: string;
  rationale: string | null;
};

function toItem(row: PlanRow): PlanItem {
  return {
    id: row.id,
    plannedDate: row.planned_date,
    productionDate: row.production_date,
    title: row.title,
    genre: row.genre,
    platform: row.platform,
    production: row.production,
    status: row.status,
    rationale: row.rationale,
  };
}

function buildWeek(
  monday: string,
  items: PlanItem[],
  today: string,
  raceDates: Set<string>,
): PlanWeek {
  const days: PlanDay[] = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(monday, index);
    return {
      date,
      label: shortLabel(date),
      weekday: WEEKDAYS[index],
      weekdayIndex: index,
      isToday: date === today,
      isRaceDay: raceDates.has(date),
      posts: items.filter((item) => item.plannedDate === date),
      productions: items.filter((item) => item.productionDate === date),
    };
  });

  const sunday = addDays(monday, 6);
  const ids = new Set(
    days.flatMap((day) => [...day.posts, ...day.productions]).map((item) => item.id),
  );

  return {
    monday,
    sunday,
    label: weekLabel(monday, sunday),
    prevMonday: addDays(monday, -7),
    nextMonday: addDays(monday, 7),
    isCurrentWeek: monday === mondayOf(today),
    days,
    itemCount: ids.size,
  };
}

/** 計画が1件でもある週のうち、指定の週にいちばん近いものの月曜 */
function findNearestWeek(items: PlanItem[], monday: string): string | null {
  const mondays = new Set<string>();
  for (const item of items) {
    if (item.plannedDate) mondays.add(mondayOf(item.plannedDate));
    if (item.productionDate) mondays.add(mondayOf(item.productionDate));
  }
  const base = Date.parse(`${monday}T00:00:00Z`);
  let nearest: string | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;
  for (const candidate of mondays) {
    const distance = Math.abs(Date.parse(`${candidate}T00:00:00Z`) - base);
    if (distance < nearestDistance) {
      nearest = candidate;
      nearestDistance = distance;
    }
  }
  return nearest;
}

export async function getPlan(weekParam?: string | string[]): Promise<Plan> {
  const today = todayJst();
  const monday = parseWeekParam(weekParam, today);

  // レース開催日。schedules テーブルとの紐付けは未実装なので今は空。
  // ここを埋めれば日付ヘッダに .is-race が付く（PlanDay.isRaceDay）。
  const raceDates = new Set<string>();

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      configured: false,
      error: "SUPABASE_SERVICE_ROLE_KEY が未設定です。",
      week: buildWeek(monday, [], today, raceDates),
      todayMonday: mondayOf(today),
      totalCount: 0,
      withRationale: 0,
      nearestWeekWithItems: null,
    };
  }

  const { data, error } = await supabase
    .from("content_plan")
    .select(
      "id, planned_date, production_date, title, genre, platform, production, status, rationale",
    )
    .order("planned_date", { ascending: true });

  if (error) {
    console.error("[admin/plan] fetch failed:", error.message);
    return {
      configured: true,
      error: "計画データの取得に失敗しました。",
      week: buildWeek(monday, [], today, raceDates),
      todayMonday: mondayOf(today),
      totalCount: 0,
      withRationale: 0,
      nearestWeekWithItems: null,
    };
  }

  const items = ((data ?? []) as PlanRow[]).map(toItem);
  const week = buildWeek(monday, items, today, raceDates);

  return {
    configured: true,
    error: null,
    week,
    todayMonday: mondayOf(today),
    totalCount: items.length,
    withRationale: items.filter((item) => (item.rationale ?? "").trim().length > 0).length,
    nearestWeekWithItems: week.itemCount === 0 ? findNearestWeek(items, monday) : null,
  };
}
