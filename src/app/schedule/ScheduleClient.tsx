"use client";

import { useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import ScheduleList from "@/components/ScheduleList";
import type { ScheduleItem, Series } from "@/lib/data";
import { visibleTabs } from "@/lib/displayConfig";

// 表示対象シリーズのみのタブ（displayConfig 一元管理）。F1のみのときはタブ自体を出さない。
const TABS = visibleTabs(["F1", "F2", "F3", "SF", "INDY"]);

type Props = {
  schedules: Record<Series, ScheduleItem[]>;
};

export default function ScheduleClient({ schedules }: Props) {
  const [tab, setTab] = useState<Series>(TABS[0] ?? "F1");
  const list = schedules[tab];

  return (
    <>
      <Section>
        <SectionHeader title="レーススケジュール" />
        <p className="text-flabo-grey text-xs mb-4">
          レースカードをタップするとセッションごとの現地時間／日本時間が展開表示されます。
        </p>
        {TABS.length > 1 && (
          <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
        )}
        <ScheduleList items={list} />
      </Section>
    </>
  );
}
