import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/** /admin/plan（投稿計画）のデータアクセス層 */

export type PlanStatus = "企画" | "制作中" | "完成" | "投稿済み";
export type PlanPlatform = "Instagram" | "YouTube" | "両方";

export type PlanItem = {
  id: string;
  plannedDate: string;
  /** 表示用「9/2（水）」 */
  dateLabel: string;
  title: string;
  genre: string;
  platform: string;
  production: string | null;
  status: string;
  rationale: string | null;
};

export type Plan = {
  configured: boolean;
  error: string | null;
  items: PlanItem[];
  /** データに実在するステータス（表示順は STATUS_ORDER に従う） */
  statuses: string[];
  platforms: string[];
  /** 根拠が書かれている件数 */
  withRationale: number;
};

/** ステータスの進行順。未知の値は末尾に回す */
export const STATUS_ORDER: string[] = ["企画", "制作中", "完成", "投稿済み"];
export const PLATFORM_ORDER: string[] = ["Instagram", "YouTube", "両方"];

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

/** YYYY-MM-DD → 「9/2（水）」。date 型なのでタイムゾーン変換はしない */
function toDateLabel(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${month}/${day}（${weekday}）`;
}

function orderBy(list: string[], order: string[]): string[] {
  return [...list].sort((a, b) => {
    const ra = order.indexOf(a);
    const rb = order.indexOf(b);
    return (ra < 0 ? order.length : ra) - (rb < 0 ? order.length : rb);
  });
}

export async function getPlan(): Promise<Plan> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      configured: false,
      error: "SUPABASE_SERVICE_ROLE_KEY が未設定です。",
      items: [],
      statuses: [],
      platforms: [],
      withRationale: 0,
    };
  }

  const { data, error } = await supabase
    .from("content_plan")
    .select("id, planned_date, title, genre, platform, production, status, rationale")
    .order("planned_date", { ascending: true });

  if (error) {
    console.error("[admin/plan] fetch failed:", error.message);
    return {
      configured: true,
      error: "計画データの取得に失敗しました。",
      items: [],
      statuses: [],
      platforms: [],
      withRationale: 0,
    };
  }

  const items: PlanItem[] = (data ?? []).map((row) => {
    const r = row as {
      id: string;
      planned_date: string;
      title: string;
      genre: string;
      platform: string;
      production: string | null;
      status: string;
      rationale: string | null;
    };
    return {
      id: r.id,
      plannedDate: r.planned_date,
      dateLabel: toDateLabel(r.planned_date),
      title: r.title,
      genre: r.genre,
      platform: r.platform,
      production: r.production,
      status: r.status,
      rationale: r.rationale,
    };
  });

  return {
    configured: true,
    error: null,
    items,
    statuses: orderBy([...new Set(items.map((i) => i.status))], STATUS_ORDER),
    platforms: orderBy([...new Set(items.map((i) => i.platform))], PLATFORM_ORDER),
    withRationale: items.filter((i) => (i.rationale ?? "").trim().length > 0).length,
  };
}
