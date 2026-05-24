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

  return (
    <Section>
      <SectionHeader title="チャンピオンシップ順位表" />
      <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <StandingsCard title="🏎️ ドライバーズ" rows={current.drivers} />
        <StandingsCard
          title="コンストラクターズ"
          rows={current.teams}
          showTeamBar={tab === "F1"}
        />
      </div>
    </Section>
  );
}
