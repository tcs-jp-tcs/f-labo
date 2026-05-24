"use client";

import { useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import StandingsCard from "@/components/StandingsCard";
import { standings } from "@/lib/data";
import type { Series } from "@/lib/data";

const TABS = ["F1", "F2", "F3", "SF", "INDY"] as const;

export default function StandingsPage() {
  const [tab, setTab] = useState<Series>("F1");
  const current = standings[tab];
  const hasTeams = current.teams.length > 0;

  return (
    <Section>
      <SectionHeader title="チャンピオンシップ順位表" />
      <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
      {current.note && (
        <p className="text-[0.7rem] text-flabo-grey mb-4">{current.note}</p>
      )}
      <div className={`grid grid-cols-1 ${hasTeams ? "md:grid-cols-2" : ""} gap-3.5`}>
        <StandingsCard title="🏎️ ドライバーズ" rows={current.drivers} />
        {hasTeams && (
          <StandingsCard
            title="コンストラクターズ"
            rows={current.teams}
            showTeamBar={tab === "F1"}
          />
        )}
      </div>
      {!hasTeams && (
        <p className="text-[0.7rem] text-flabo-grey mt-4">
          このシリーズのチームランキングは集計後に追加予定です。
        </p>
      )}
    </Section>
  );
}
