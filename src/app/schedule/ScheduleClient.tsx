"use client";

import { useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import ScheduleList from "@/components/ScheduleList";
import BroadcastTable from "@/components/BroadcastTable";
import { seriesLabel } from "@/lib/data";
import type { ScheduleItem, Series, WeekendBroadcast } from "@/lib/data";

const TABS = ["F1", "F2", "F3", "SF", "INDY"] as const;

type Props = {
  schedules: Record<Series, ScheduleItem[]>;
  broadcasts: WeekendBroadcast[];
};

export default function ScheduleClient({ schedules, broadcasts }: Props) {
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
        {broadcasts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {broadcasts.map((w) => (
              <BroadcastTable key={`${w.series}-${w.round}`} weekend={w} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/5 bg-flabo-carbon p-5 space-y-3">
            <p className="font-display tracking-[0.18em] text-xs text-flabo-grey uppercase">
              📅 今週末のレースはありません
            </p>
            <p className="text-xs text-flabo-grey leading-relaxed">
              次回レースのあるカテゴリ：
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[0.8rem]">
              {(Object.keys(schedules) as Series[]).map((s) => {
                const upcoming = schedules[s].find(
                  (r) => r.status === "next" || r.status === "upcoming" || r.status === "live",
                );
                if (!upcoming) return null;
                return (
                  <li
                    key={s}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/[0.03]"
                  >
                    <span className="text-base" aria-hidden>{upcoming.flag}</span>
                    <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey">
                      {seriesLabel[s]}
                    </span>
                    <span className="font-bold flex-1 truncate">{upcoming.name}</span>
                    <span className="text-flabo-grey text-[0.7rem]">{upcoming.date}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
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
