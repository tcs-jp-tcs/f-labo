"use client";

import { useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import PodiumCard from "@/components/PodiumCard";
import type { RaceResult, Series } from "@/lib/data";

const TABS = ["F1", "F2", "F3", "SF", "INDY"] as const;

type Props = {
  resultsBySeries: Record<Series, RaceResult[]>;
};

export default function ResultsClient({ resultsBySeries }: Props) {
  const [tab, setTab] = useState<Series>("F1");
  const results = resultsBySeries[tab];

  return (
    <Section>
      <SectionHeader title="レース結果" />
      <p className="text-flabo-grey text-sm mb-6">
        直近の主要レース結果です。決勝・スプリント・フィーチャー・予選を区別して掲載。各カードに出典元へのリンクを記載しています。
      </p>
      <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {results.map((r, idx) => (
            <div
              key={`${r.series}-${r.round}-${r.raceType}-${idx}`}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center justify-between px-1">
                <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
                  {r.raceType} · ROUND {r.round}
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
      ) : (
        <p className="text-[0.7rem] text-flabo-grey">
          このシリーズの結果はまだ掲載されていません。
        </p>
      )}
    </Section>
  );
}
