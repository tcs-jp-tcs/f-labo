import { getRecentResults } from "@/lib/results";
import { getActiveReviews } from "@/lib/reviews";
import type { RaceResult, Series } from "@/lib/data";
import ResultsClient from "./ResultsClient";

export const revalidate = 0;

/** シリーズの表示順（F1 → F2 → F3 → SF → INDY） */
const SERIES_ORDER: Series[] = ["F1", "F2", "F3", "SF", "INDY"];

export default async function ResultsPage() {
  const [recentResults, activeReviews] = await Promise.all([
    getRecentResults(),
    getActiveReviews(), // archived=false のみ（公開中）
  ]);

  // シリーズ別にグループ化（各シリーズ内は display_order 昇順のまま）
  const resultsBySeries = Object.fromEntries(
    SERIES_ORDER.map((series) => [
      series,
      recentResults.filter((r) => r.series === series),
    ]),
  ) as Record<Series, RaceResult[]>;

  // 結果カード → レビューの紐付け（"{category}:{round}" → slug）。
  // reviews.category(F1/SF) と race_results.series を一致させ、round が合う公開レビューだけ拾う。
  // getActiveReviews は published_at DESC 順なので、同キーは最新の1件を採用する。
  const reviewSlugByKey: Record<string, string> = {};
  for (const r of activeReviews) {
    const key = `${r.category}:${r.round}`;
    if (!(key in reviewSlugByKey)) reviewSlugByKey[key] = r.slug;
  }

  return (
    <ResultsClient
      resultsBySeries={resultsBySeries}
      reviewSlugByKey={reviewSlugByKey}
    />
  );
}
