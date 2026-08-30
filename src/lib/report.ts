import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * /admin/report（分析レポート）のデータアクセス層。
 * sns_posts からの自動集計と、insights テーブルの所見をまとめて返す。
 */

/* ------------------------------------------------------------------ 型 */

export type ReportMetric = "yt" | "ig";

export const REPORT_METRIC_LABEL: Record<ReportMetric, string> = {
  yt: "YT再生",
  ig: "IGリーチ",
};

export type GenrePerformance = {
  genre: string;
  /** 計測済みの件数（中央値などの母数） */
  count: number;
  /** ジャンルの制作本数（未計測を含むショートの総数） */
  produced: number;
  median: number;
  mean: number;
  max: number;
  min: number;
};

export type ReportSummary = {
  totalPosts: number;
  shortCount: number;
  longCount: number;
  igReachTotal: number;
  igMeasured: number;
  ytViewsTotal: number;
  ytMeasured: number;
  firstDate: string | null;
  lastDate: string | null;
};

export type Insight = {
  id: string;
  writtenOn: string;
  section: string;
  headline: string;
  body: string;
  evidence: string | null;
};

export type Report = {
  configured: boolean;
  error: string | null;
  summary: ReportSummary;
  genreYt: GenrePerformance[];
  genreIg: GenrePerformance[];
  insights: Insight[];
};

/* ------------------------------------------------------------ 集計ヘルパ */

/** 線形補間による中央値 */
function medianOf(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = (sorted.length - 1) / 2;
  const low = Math.floor(mid);
  const high = Math.ceil(mid);
  return low === high ? sorted[low] : (sorted[low] + sorted[high]) / 2;
}

/** YYYY-MM-DD（JST）に整形 */
function toJstDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

type PostRow = {
  posted_at: string;
  genre: string;
  format: string;
  ig_reach: number | null;
  yt_views: number | null;
};

/** ショート投稿を指標ごとにジャンル集計する（未計測は母数から除く） */
function buildGenrePerformance(
  shorts: PostRow[],
  metric: ReportMetric,
): GenrePerformance[] {
  const producedByGenre = new Map<string, number>();
  for (const row of shorts) {
    producedByGenre.set(row.genre, (producedByGenre.get(row.genre) ?? 0) + 1);
  }

  const valuesByGenre = new Map<string, number[]>();
  for (const row of shorts) {
    const value = metric === "yt" ? row.yt_views : row.ig_reach;
    if (value == null) continue;
    valuesByGenre.set(row.genre, [...(valuesByGenre.get(row.genre) ?? []), value]);
  }

  return [...valuesByGenre.entries()]
    .map(([genre, values]) => ({
      genre,
      count: values.length,
      produced: producedByGenre.get(genre) ?? values.length,
      median: medianOf(values),
      mean: values.reduce((a, b) => a + b, 0) / values.length,
      max: Math.max(...values),
      min: Math.min(...values),
    }))
    .sort((a, b) => b.median - a.median);
}

const EMPTY_SUMMARY: ReportSummary = {
  totalPosts: 0,
  shortCount: 0,
  longCount: 0,
  igReachTotal: 0,
  igMeasured: 0,
  ytViewsTotal: 0,
  ytMeasured: 0,
  firstDate: null,
  lastDate: null,
};

/* ------------------------------------------------------------------ 取得 */

export async function getReport(): Promise<Report> {
  const empty: Report = {
    configured: true,
    error: null,
    summary: EMPTY_SUMMARY,
    genreYt: [],
    genreIg: [],
    insights: [],
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      ...empty,
      configured: false,
      error: "SUPABASE_SERVICE_ROLE_KEY が未設定です。",
    };
  }

  const [postsRes, insightsRes] = await Promise.all([
    supabase
      .from("sns_posts")
      .select("posted_at, genre, format, ig_reach, yt_views")
      .order("posted_at", { ascending: true }),
    supabase
      .from("insights")
      .select("id, written_on, section, headline, body, evidence")
      .eq("active", true)
      .order("display_order", { ascending: true }),
  ]);

  const errors = [postsRes.error, insightsRes.error].filter((e) => e != null);
  for (const e of errors) console.error("[admin/report] fetch failed:", e.message);

  const posts = (postsRes.data ?? []) as PostRow[];
  const shorts = posts.filter((row) => row.format !== "long");
  const igValues = posts.map((r) => r.ig_reach).filter((v): v is number => v != null);
  const ytValues = posts.map((r) => r.yt_views).filter((v): v is number => v != null);

  const summary: ReportSummary = {
    totalPosts: posts.length,
    shortCount: shorts.length,
    longCount: posts.length - shorts.length,
    igReachTotal: igValues.reduce((a, b) => a + b, 0),
    igMeasured: igValues.length,
    ytViewsTotal: ytValues.reduce((a, b) => a + b, 0),
    ytMeasured: ytValues.length,
    firstDate: posts.length > 0 ? toJstDate(posts[0].posted_at) : null,
    lastDate: posts.length > 0 ? toJstDate(posts[posts.length - 1].posted_at) : null,
  };

  return {
    configured: true,
    error: errors.length > 0 ? "一部のデータ取得に失敗しました。" : null,
    summary,
    genreYt: buildGenrePerformance(shorts, "yt"),
    genreIg: buildGenrePerformance(shorts, "ig"),
    insights: ((insightsRes.data ?? []) as {
      id: string;
      written_on: string;
      section: string;
      headline: string;
      body: string;
      evidence: string | null;
    }[]).map((row) => ({
      id: row.id,
      writtenOn: row.written_on,
      section: row.section,
      headline: row.headline,
      body: row.body,
      evidence: row.evidence,
    })),
  };
}
