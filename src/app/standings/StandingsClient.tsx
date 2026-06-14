"use client";

import { useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import StandingsCard from "@/components/StandingsCard";
import type { Series, StandingRow } from "@/lib/data";

const TABS = ["F1", "F2", "F3", "SF", "INDY"] as const;

type StandingsEntry = { drivers: StandingRow[]; teams: StandingRow[]; note?: string };

type Props = {
  standings: Record<Series, StandingsEntry>;
};

export default function StandingsClient({ standings }: Props) {
  const [tab, setTab] = useState<Series>("F1");
  const current = standings[tab];
  const hasTeams = current.teams.length > 0;

  return (
    <Section>
      <SectionHeader title="チャンピオンシップ順位表" />
      <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
      <div className={`mt-3.5 grid grid-cols-1 ${hasTeams ? "md:grid-cols-2" : ""} gap-3.5`}>
        <StandingsCard
          title="🏎️ ドライバーズ"
          rows={current.drivers}
          note={current.note}
        />
        {hasTeams && (
          <StandingsCard
            title="コンストラクターズ"
            rows={current.teams}
            note={current.note}
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
