"use client";

import { useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import ResultGPCard, { type GPGroup } from "@/components/ResultGPCard";
import type { RaceResult, Series } from "@/lib/data";

const TABS = ["F1", "F2", "F3", "SF", "INDY"] as const;

type Props = {
  resultsBySeries: Record<Series, RaceResult[]>;
};

/**
 * round + gp_name で1つのGPカードにまとめる。
 * 入力は display_order 昇順（新しい順）前提。各グループは最初に出現した行の
 * index を順序キーにして、新しいGPほど先頭に並ぶよう維持する。
 */
function groupByGP(results: RaceResult[]): GPGroup[] {
  const map = new Map<string, GPGroup & { order: number }>();
  results.forEach((r, idx) => {
    const key = `${r.round}|||${r.gpName}`;
    let g = map.get(key);
    if (!g) {
      g = {
        series: r.series,
        round: r.round,
        gpName: r.gpName,
        flag: r.flag,
        sessions: {},
        order: idx,
      };
      map.set(key, g);
    }
    if (r.raceType) g.sessions[r.raceType] = r;
  });
  return [...map.values()].sort((a, b) => a.order - b.order);
}

export default function ResultsClient({ resultsBySeries }: Props) {
  const [tab, setTab] = useState<Series>("F1");
  const groups = groupByGP(resultsBySeries[tab]);

  return (
    <Section>
      <SectionHeader title="レース結果" />
      <p className="text-flabo-grey text-sm mb-6">
        直近の主要レース結果です。GPごとにまとめ、予選・スプリント・決勝などのセッションをタブで切り替えできます。各カードに出典元へのリンクを記載しています。
      </p>
      <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {groups.map((g) => (
            <ResultGPCard key={`${g.round}-${g.gpName}`} group={g} />
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
