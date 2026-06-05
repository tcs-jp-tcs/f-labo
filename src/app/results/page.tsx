import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import PodiumCard from "@/components/PodiumCard";
import { seriesLabel } from "@/lib/data";
import type { Series } from "@/lib/data";
import { getRecentResults } from "@/lib/results";

export const revalidate = 0;

/** シリーズの表示順（F1 → F2 → F3 → SF → INDY） */
const SERIES_ORDER: Series[] = ["F1", "F2", "F3", "SF", "INDY"];

export default async function ResultsPage() {
  const recentResults = await getRecentResults();

  // シリーズ別にグループ化（各シリーズ内は display_order 昇順のまま）
  const resultsBySeries = SERIES_ORDER.map((series) => ({
    series,
    results: recentResults.filter((r) => r.series === series),
  })).filter((group) => group.results.length > 0);

  return (
    <Section>
      <SectionHeader title="レース結果" />
      <p className="text-flabo-grey text-sm mb-6">
        直近の主要レース結果です。決勝・スプリント・フィーチャー・予選を区別して掲載。各カードに出典元へのリンクを記載しています。
      </p>
      <div className="flex flex-col gap-10">
        {resultsBySeries.map(({ series, results }) => (
          <div key={series}>
            <h2 className="font-display tracking-[0.2em] text-sm text-flabo-red border-b border-flabo-red/30 pb-2 mb-4">
              {seriesLabel[series]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {results.map((r, idx) => (
                <div
                  key={`${r.series}-${r.round}-${r.raceType}-${idx}`}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between px-1">
                    <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
                      {seriesLabel[r.series]} · ROUND {r.round} · {r.raceType}
                    </span>
                    <span className="text-[0.7rem] text-flabo-grey">{r.date}</span>
                  </div>
                  <PodiumCard
                    title={
                      <>
                        {r.status === "live" && (
                          <span className="text-flabo-green text-[0.55rem] font-display tracking-[0.18em] mr-1 animate-pulse">
                            ● LIVE
                          </span>
                        )}
                        <span>
                          {r.flag} {r.gpName}
                        </span>
                      </>
                    }
                    podium={r.podium}
                    note={r.note}
                    category={r.series}
                  />
                  {r.sourceUrl && (
                    <a
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.65rem] text-flabo-grey hover:text-flabo-red font-display tracking-[0.18em] px-1"
                    >
                      出典 ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
