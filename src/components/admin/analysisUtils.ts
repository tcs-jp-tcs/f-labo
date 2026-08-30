import type { SnsPost } from "@/lib/telemetry";

/** ANALYSIS セクションの共有ロジック（描画は AnalysisSection 側） */

export type Metric = "ig" | "yt";

export const METRIC_LABEL: Record<Metric, string> = {
  ig: "IGリーチ",
  yt: "YT再生",
};

export const metricValue = (post: SnsPost, metric: Metric): number | null =>
  metric === "ig" ? post.igReach : post.ytViews;

/** ジャンルの色。未知のジャンルはフォールバック配列から順に割り当てる */
const GENRE_COLORS: Record<string, string> = {
  コース図: "#00D8F0",
  速報: "#FF4257",
  ニュース: "#C9FF3D",
  ランキング: "#FFA23D",
  レビュー: "#A77BFF",
  クイズ: "#4DE3A2",
  解説: "#FF7BD5",
  プレビュー: "#7EA6FF",
};

const FALLBACK_COLORS = ["#8FA3B8", "#E0B65C", "#5CC9E0", "#D67CA8", "#9BD65C"];

export function buildGenreColors(genres: string[]): Map<string, string> {
  const map = new Map<string, string>();
  let fallbackIndex = 0;
  for (const genre of genres) {
    const known = GENRE_COLORS[genre];
    if (known) {
      map.set(genre, known);
    } else {
      map.set(genre, FALLBACK_COLORS[fallbackIndex % FALLBACK_COLORS.length]);
      fallbackIndex += 1;
    }
  }
  return map;
}

/** 出現順（件数の多い順）にジャンルを並べる */
export function genresOf(posts: SnsPost[]): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.genre, (counts.get(post.genre) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"))
    .map(([genre]) => genre);
}

/** 対数スケール用。0 を扱えるよう log10(v+1) を使う */
export const logScale = (value: number): number => Math.log10(Math.max(0, value) + 1);

/** 線形補間による分位点（R type 7）。空配列は 0 */
export function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];
  const index = (sorted.length - 1) * p;
  const low = Math.floor(index);
  const high = Math.ceil(index);
  if (low === high) return sorted[low];
  return sorted[low] + (sorted[high] - sorted[low]) * (index - low);
}

export function median(values: number[]): number {
  return quantile([...values].sort((a, b) => a - b), 0.5);
}

/** 軸の上限をきりのいい値に丸める（1/2/2.5/5 × 10^n） */
export function niceCeil(value: number): number {
  if (value <= 0) return 1;
  const exponent = Math.floor(Math.log10(value));
  const base = 10 ** exponent;
  const normalized = value / base;
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => normalized <= s) ?? 10;
  return step * base;
}

/**
 * 対数軸の範囲と目盛り。
 * 0 起点にすると実データ（100〜3000程度）が上端に固まって下半分が死ぬので、
 * 最小値の少し下から最大値の少し上までを軸の範囲にする。
 * 目盛りは 1/2/5 × 10^n のうち範囲に入るものを使う。
 */
export function logDomain(values: number[]): { lo: number; hi: number; ticks: number[] } {
  const finite = values.filter((v) => Number.isFinite(v));
  if (finite.length === 0) return { lo: 0, hi: 1, ticks: [0, 1] };

  const min = Math.min(...finite);
  const max = Math.max(...finite);
  let lo = logScale(min);
  let hi = logScale(max);
  const span = hi - lo;
  const pad = span < 0.15 ? 0.3 : span * 0.1;
  lo = Math.max(0, lo - pad);
  hi += pad;

  const ticks: number[] = [];
  if (min === 0) ticks.push(0);
  for (let power = 0; power <= 7; power += 1) {
    for (const multiplier of [1, 2, 5]) {
      const tick = multiplier * 10 ** power;
      const position = logScale(tick);
      if (position >= lo && position <= hi) ticks.push(tick);
    }
  }
  if (ticks.length < 2) return { lo, hi, ticks: [Math.round(min), Math.round(max)] };
  return { lo, hi, ticks };
}

export const WEEKDAY_LABELS = ["月", "火", "水", "木", "金", "土", "日"];

/** 3時間ごとの8区分 */
export const HOUR_BUCKETS = [0, 3, 6, 9, 12, 15, 18, 21];

export const bucketIndex = (hour: number): number =>
  Math.min(HOUR_BUCKETS.length - 1, Math.floor(hour / 3));

/** 小数時刻 → "9:30" */
export function formatHour(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${h}:${String(m).padStart(2, "0")}`;
}

export const engagementOf = (post: SnsPost): number =>
  (post.igLikes ?? 0) + (post.igSaves ?? 0) + (post.igShares ?? 0);
