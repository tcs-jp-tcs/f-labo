import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import PodiumCard from "@/components/PodiumCard";
import { recentResults, seriesLabel } from "@/lib/data";

export default function ResultsPage() {
  return (
    <Section>
      <SectionHeader title="レース結果" />
      <p className="text-flabo-grey text-sm mb-6">
        直近の主要レースの表彰台です。シリーズを横断して掲載しています。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {recentResults.map((r) => (
          <div key={`${r.series}-${r.round}`} className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
                {seriesLabel[r.series]} · ROUND {r.round}
              </span>
              <span className="text-[0.7rem] text-flabo-grey">{r.date}</span>
            </div>
            <PodiumCard
              title={`${r.flag} ${r.gpName}`}
              podium={r.podium}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
