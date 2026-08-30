import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * 管理画面（/admin）のデータアクセス層。
 * service_role キーでのみ読めるテーブル（sns_posts / ga4_daily / ga4_channels /
 * sns_followers）を扱うため、Server Component / Route Handler からのみ呼ぶこと。
 */

/* ------------------------------------------------------------------ 期間 */

export type RangeKey = "7" | "30" | "all";

export const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "7", label: "直近7日" },
  { key: "30", label: "直近30日" },
  { key: "all", label: "全期間" },
];

export const DEFAULT_RANGE: RangeKey = "30";

/** ?range= の値を RangeKey に正規化する（不正値は既定の30日） */
export function parseRange(value: string | string[] | undefined): RangeKey {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "7" || raw === "30" || raw === "all" ? raw : DEFAULT_RANGE;
}

/** Date → JST の YYYY-MM-DD */
function toJstDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** 期間の開始日（JST・当日を含む N 日間）。全期間なら null */
export function rangeStartDate(range: RangeKey, now: Date = new Date()): string | null {
  if (range === "all") return null;
  const days = range === "7" ? 7 : 30;
  return toJstDate(new Date(now.getTime() - (days - 1) * 86_400_000));
}

/** ISO 日時 → JST の MM/DD */
function toJstMonthDay(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return toJstDate(d).slice(5).replace("-", "/");
}

/** YYYY-MM-DD → YYYY.MM.DD */
function toDotted(date: string): string {
  return date.replaceAll("-", ".");
}

/* ------------------------------------------------------------------ 型 */

export type Winner = "ig" | "yt" | "tie" | "na";

export type SnsPost = {
  id: string;
  postedAt: string;
  dateLabel: string;
  title: string;
  genre: string;
  igReach: number | null;
  igLikes: number | null;
  igSaves: number | null;
  igShares: number | null;
  igUrl: string | null;
  ytViews: number | null;
  ytLikes: number | null;
  ytUrl: string | null;
  note: string | null;
  winner: Winner;
};

export type Kpi = {
  postCount: number;
  igReachTotal: number;
  igReachMax: number;
  igReachCount: number;
  ytViewsTotal: number;
  ytViewsMax: number;
  ytViewsCount: number;
  igLikesTotal: number;
  igSavesTotal: number;
  igSharesTotal: number;
  igWins: number;
  ytWins: number;
  ties: number;
  pending: number;
};

export type GenreStat = {
  genre: string;
  count: number;
  ig: number;
  yt: number;
};

export type Ga4Daily = {
  date: string;
  sessions: number;
  users: number;
  newUsers: number;
  pageViews: number;
  engagementRate: number | null;
};

export type ChannelStat = {
  channel: string;
  sessions: number;
  users: number;
  share: number;
};

export type Telemetry = {
  configured: boolean;
  error: string | null;
  range: RangeKey;
  periodLabel: string;
  posts: SnsPost[];
  kpi: Kpi;
  genres: GenreStat[];
  ga4Daily: Ga4Daily[];
  ga4Channels: ChannelStat[];
};

/* ------------------------------------------------ 優勢プラットフォーム判定 */

/**
 * どちらで伸びたかの判定。
 * - IG リーチ / YT 再生のどちらかが未計測（null）なら「計測中」
 * - 大きい方が小さい方の 1.5 倍以上なら、その方が優勢
 * - それ未満は拮抗
 */
const WIN_RATIO = 1.5;

function judgeWinner(igReach: number | null, ytViews: number | null): Winner {
  if (igReach == null || ytViews == null) return "na";
  if (igReach === 0 && ytViews === 0) return "tie";
  const high = Math.max(igReach, ytViews);
  const low = Math.min(igReach, ytViews);
  if (low === 0 || high / low >= WIN_RATIO) {
    return igReach > ytViews ? "ig" : "yt";
  }
  return "tie";
}

/* ------------------------------------------------------------ 集計ヘルパ */

const sum = (values: (number | null)[]): number =>
  values.reduce<number>((acc, v) => acc + (v ?? 0), 0);

function buildKpi(posts: SnsPost[]): Kpi {
  const igValues = posts.map((p) => p.igReach).filter((v): v is number => v != null);
  const ytValues = posts.map((p) => p.ytViews).filter((v): v is number => v != null);

  return {
    postCount: posts.length,
    igReachTotal: sum(igValues),
    igReachMax: igValues.length ? Math.max(...igValues) : 0,
    igReachCount: igValues.length,
    ytViewsTotal: sum(ytValues),
    ytViewsMax: ytValues.length ? Math.max(...ytValues) : 0,
    ytViewsCount: ytValues.length,
    igLikesTotal: sum(posts.map((p) => p.igLikes)),
    igSavesTotal: sum(posts.map((p) => p.igSaves)),
    igSharesTotal: sum(posts.map((p) => p.igShares)),
    igWins: posts.filter((p) => p.winner === "ig").length,
    ytWins: posts.filter((p) => p.winner === "yt").length,
    ties: posts.filter((p) => p.winner === "tie").length,
    pending: posts.filter((p) => p.winner === "na").length,
  };
}

function buildGenres(posts: SnsPost[]): GenreStat[] {
  const map = new Map<string, GenreStat>();
  for (const post of posts) {
    const stat = map.get(post.genre) ?? { genre: post.genre, count: 0, ig: 0, yt: 0 };
    stat.count += 1;
    stat.ig += post.igReach ?? 0;
    stat.yt += post.ytViews ?? 0;
    map.set(post.genre, stat);
  }
  return [...map.values()].sort((a, b) => b.ig + b.yt - (a.ig + a.yt));
}

function buildChannels(
  rows: { channel: string; sessions: number | null; users: number | null }[],
): ChannelStat[] {
  const map = new Map<string, { sessions: number; users: number }>();
  for (const row of rows) {
    const stat = map.get(row.channel) ?? { sessions: 0, users: 0 };
    stat.sessions += row.sessions ?? 0;
    stat.users += row.users ?? 0;
    map.set(row.channel, stat);
  }
  const total = [...map.values()].reduce((acc, v) => acc + v.sessions, 0);
  return [...map.entries()]
    .map(([channel, v]) => ({
      channel,
      sessions: v.sessions,
      users: v.users,
      share: total > 0 ? v.sessions / total : 0,
    }))
    .sort((a, b) => b.sessions - a.sessions);
}

function buildPeriodLabel(
  range: RangeKey,
  posts: SnsPost[],
  ga4: Ga4Daily[],
  startDate: string | null,
): string {
  const dates = [
    ...posts.map((p) => toJstDate(new Date(p.postedAt))),
    ...ga4.map((d) => d.date),
  ].filter(Boolean);

  if (dates.length === 0) {
    return range === "all" ? "全期間（データなし）" : "データなし";
  }
  dates.sort();
  const from = range === "all" ? dates[0] : (startDate ?? dates[0]);
  return `${toDotted(from)} — ${toDotted(dates[dates.length - 1])}`;
}

/* ------------------------------------------------------------ DB 行の型 */

type SnsPostRow = {
  id: string;
  posted_at: string;
  title: string;
  genre: string;
  ig_reach: number | null;
  ig_likes: number | null;
  ig_saves: number | null;
  ig_shares: number | null;
  ig_url: string | null;
  yt_views: number | null;
  yt_likes: number | null;
  yt_url: string | null;
  note: string | null;
};

type Ga4DailyRow = {
  date: string;
  sessions: number | null;
  users: number | null;
  new_users: number | null;
  page_views: number | null;
  engagement_rate: number | string | null;
};

type Ga4ChannelRow = {
  date: string;
  channel: string;
  sessions: number | null;
  users: number | null;
};

function toPost(row: SnsPostRow): SnsPost {
  return {
    id: row.id,
    postedAt: row.posted_at,
    dateLabel: toJstMonthDay(row.posted_at),
    title: row.title,
    genre: row.genre,
    igReach: row.ig_reach,
    igLikes: row.ig_likes,
    igSaves: row.ig_saves,
    igShares: row.ig_shares,
    igUrl: row.ig_url,
    ytViews: row.yt_views,
    ytLikes: row.yt_likes,
    ytUrl: row.yt_url,
    note: row.note,
    winner: judgeWinner(row.ig_reach, row.yt_views),
  };
}

const EMPTY_KPI: Kpi = {
  postCount: 0,
  igReachTotal: 0,
  igReachMax: 0,
  igReachCount: 0,
  ytViewsTotal: 0,
  ytViewsMax: 0,
  ytViewsCount: 0,
  igLikesTotal: 0,
  igSavesTotal: 0,
  igSharesTotal: 0,
  igWins: 0,
  ytWins: 0,
  ties: 0,
  pending: 0,
};

/* ------------------------------------------------------------------ 取得 */

/** 指定期間のSNS実績とGA4データをまとめて取得・集計する */
export async function getTelemetry(range: RangeKey): Promise<Telemetry> {
  const empty: Telemetry = {
    configured: true,
    error: null,
    range,
    periodLabel: "データなし",
    posts: [],
    kpi: EMPTY_KPI,
    genres: [],
    ga4Daily: [],
    ga4Channels: [],
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      ...empty,
      configured: false,
      error:
        "SUPABASE_SERVICE_ROLE_KEY が未設定です。Vercel と .env.local に設定してください。",
    };
  }

  const startDate = rangeStartDate(range);
  const startTimestamp = startDate ? `${startDate}T00:00:00+09:00` : null;

  const postsQuery = supabase
    .from("sns_posts")
    .select(
      "id, posted_at, title, genre, ig_reach, ig_likes, ig_saves, ig_shares, ig_url, yt_views, yt_likes, yt_url, note",
    )
    .order("posted_at", { ascending: true });
  if (startTimestamp) postsQuery.gte("posted_at", startTimestamp);

  const dailyQuery = supabase
    .from("ga4_daily")
    .select("date, sessions, users, new_users, page_views, engagement_rate")
    .order("date", { ascending: true });
  if (startDate) dailyQuery.gte("date", startDate);

  const channelQuery = supabase
    .from("ga4_channels")
    .select("date, channel, sessions, users");
  if (startDate) channelQuery.gte("date", startDate);

  const [postsRes, dailyRes, channelRes] = await Promise.all([
    postsQuery,
    dailyQuery,
    channelQuery,
  ]);

  const errors = [postsRes.error, dailyRes.error, channelRes.error].filter(
    (e) => e != null,
  );
  if (errors.length > 0) {
    for (const e of errors) console.error("[admin/telemetry] fetch failed:", e.message);
  }

  const posts = ((postsRes.data ?? []) as SnsPostRow[]).map(toPost);
  const ga4Daily = ((dailyRes.data ?? []) as Ga4DailyRow[]).map((row) => ({
    date: row.date,
    sessions: row.sessions ?? 0,
    users: row.users ?? 0,
    newUsers: row.new_users ?? 0,
    pageViews: row.page_views ?? 0,
    engagementRate: row.engagement_rate == null ? null : Number(row.engagement_rate),
  }));
  const ga4Channels = buildChannels((channelRes.data ?? []) as Ga4ChannelRow[]);

  return {
    configured: true,
    error: errors.length > 0 ? "一部のデータ取得に失敗しました。" : null,
    range,
    periodLabel: buildPeriodLabel(range, posts, ga4Daily, startDate),
    posts,
    kpi: buildKpi(posts),
    genres: buildGenres(posts),
    ga4Daily,
    ga4Channels,
  };
}
