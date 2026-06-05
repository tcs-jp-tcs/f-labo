import { getRecentResults } from "@/lib/results";
import type { RaceResult, Series } from "@/lib/data";
import ResultsClient from "./ResultsClient";

export const revalidate = 0;

/** シリーズの表示順（F1 → F2 → F3 → SF → INDY） */
const SERIES_ORDER: Series[] = ["F1", "F2", "F3", "SF", "INDY"];

export default async function ResultsPage() {
  const recentResults = await getRecentResults();

  // シリーズ別にグループ化（各シリーズ内は display_order 昇順のまま）
  const resultsBySeries = Object.fromEntries(
    SERIES_ORDER.map((series) => [
      series,
      recentResults.filter((r) => r.series === series),
    ]),
  ) as Record<Series, RaceResult[]>;

  return <ResultsClient resultsBySeries={resultsBySeries} />;
}
