"use client";

import { useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import ScheduleList from "@/components/ScheduleList";
import BroadcastTable from "@/components/BroadcastTable";
import { schedules, thisWeekendBroadcasts } from "@/lib/data";
import type { Series } from "@/lib/data";

const TABS = ["F1", "F2", "F3", "SF", "INDY"] as const;

export default function SchedulePage() {
  const [tab, setTab] = useState<Series>("F1");
  const list = schedules[tab];

  return (
    <>
      <Section>
        <SectionHeader title="レーススケジュール" />
        <p className="text-flabo-grey text-xs mb-4">
          レースカードをタップするとセッションごとの現地時間／日本時間が展開表示されます。
        </p>
        <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
        <ScheduleList items={list} />
      </Section>

      <Section>
        <SectionHeader title="📺 今週末の放送予定" />
        <div className="grid grid-cols-1 gap-4">
          {thisWeekendBroadcasts.map((w) => (
            <BroadcastTable key={`${w.series}-${w.round}`} weekend={w} />
          ))}
        </div>
        <p className="text-[0.7rem] text-flabo-grey mt-4 leading-relaxed">
          時間表記は日本時間（深夜0:30／早朝4:50形式）。F1は2026年からフジテレビ独占（FOD / フジテレビNEXT / フジテレビNEXTsmart）、
          スーパーフォーミュラはABEMA（決勝無料）/ J SPORTS / SFgo、
          インディカーはGAORA SPORTS / GAORAオンデマンド、
          F2・F3はFODプロコース以上（F1 TV経由）で視聴可能です。
        </p>
      </Section>
    </>
  );
}
