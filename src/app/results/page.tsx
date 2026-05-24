import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import PodiumCard from "@/components/PodiumCard";
import { recentResults, seriesLabel } from "@/lib/data";

export default function ResultsPage() {
  return (
    <Section>
      <SectionHeader title="レース結果" />
      <p className="text-flabo-grey text-sm mb-6">
        直近の主要レース結果です。決勝・スプリント・フィーチャー・予選を区別して掲載。各カードに出典元へのリンクを記載しています。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {recentResults.map((r, idx) => (
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
    </Section>
  );
}
