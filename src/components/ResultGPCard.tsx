"use client";

import { useState } from "react";
import type { RaceResult, Series } from "@/lib/data";
import CardHeader from "./CardHeader";
import PodiumBody from "./PodiumBody";

/**
 * シリーズごとの固定セッションタブ定義（左→右の表示順）。
 * optional=true のタブはそのカードにデータがある時だけ表示（例: SF 2レース大会の決勝1/決勝2）。
 * optional でないタブは常に表示し、データが無ければグレーアウト（タップ不可）にする。
 */
const SERIES_SESSION_TABS: Record<Series, { type: string; optional?: boolean }[]> = {
  F1: [
    { type: "スプリント予選" },
    { type: "スプリント" },
    { type: "予選" },
    { type: "決勝" },
  ],
  F2: [{ type: "予選" }, { type: "スプリント" }, { type: "フィーチャー" }],
  F3: [{ type: "予選" }, { type: "スプリント" }, { type: "フィーチャー" }],
  SF: [
    { type: "予選" },
    { type: "決勝" },
    { type: "決勝1", optional: true },
    { type: "決勝2", optional: true },
  ],
  INDY: [{ type: "予選" }, { type: "決勝" }],
};

export type GPGroup = {
  series: Series;
  round: number;
  gpName: string;
  flag: string;
  /** race_type → その結果行 */
  sessions: Record<string, RaceResult>;
};

export default function ResultGPCard({ group }: { group: GPGroup }) {
  const { series, round, gpName, flag, sessions } = group;

  const template = SERIES_SESSION_TABS[series] ?? [{ type: "決勝" }];
  // optional タブはデータがある時のみ表示
  const tabs = template.filter((t) => !t.optional || sessions[t.type]);
  // デフォルト選択 = 最終セッション（最も右でデータがあるタブ）
  const enabled = tabs.filter((t) => sessions[t.type]).map((t) => t.type);
  const defaultType =
    enabled[enabled.length - 1] ?? tabs[tabs.length - 1]?.type ?? "";

  const [active, setActive] = useState(defaultType);
  const session = sessions[active];

  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden">
      <CardHeader category={series} />
      <div className="p-5 flex flex-col gap-3">
        {/* GP 見出し */}
        <div>
          <div className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
            ROUND {round}
          </div>
          <h3 className="font-bold text-[0.95rem] mt-0.5">
            {flag} {gpName}
          </h3>
        </div>

        {/* セッションタブ（データ無しはグレーアウト・タップ不可） */}
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((t) => {
            const hasData = !!sessions[t.type];
            const isActive = t.type === active;
            return (
              <button
                key={t.type}
                type="button"
                disabled={!hasData}
                onClick={() => hasData && setActive(t.type)}
                className={`font-display tracking-[0.14em] text-[0.6rem] px-3 py-1.5 rounded-md border transition-all ${
                  isActive
                    ? "bg-flabo-red text-white border-flabo-red"
                    : hasData
                      ? "bg-white/[0.03] text-flabo-grey border-white/5 hover:text-white hover:border-white/20"
                      : "bg-transparent text-white/20 border-white/5 cursor-not-allowed"
                }`}
              >
                {t.type}
              </button>
            );
          })}
        </div>

        {/* セッションの日付 / LIVE */}
        {session && (
          <div className="flex items-center gap-2">
            {session.status === "live" && (
              <span className="text-flabo-green text-[0.55rem] font-display tracking-[0.18em] animate-pulse">
                ● LIVE
              </span>
            )}
            {session.date && (
              <span className="text-[0.65rem] text-flabo-grey ml-auto">
                {session.date}
              </span>
            )}
          </div>
        )}

        {/* 表彰台（タブ切替で state リセットされるよう key を付与） */}
        {session ? (
          <PodiumBody key={active} podium={session.podium} large />
        ) : (
          <p className="text-flabo-grey text-xs leading-relaxed py-1">
            結果待ち
          </p>
        )}

        {/* 補足 */}
        {session?.note && (
          <p className="text-[0.65rem] text-white leading-relaxed border-t border-white/5 pt-3">
            {session.note}
          </p>
        )}

        {/* 出典 */}
        {session?.sourceUrl && (
          <a
            href={session.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.65rem] text-flabo-grey hover:text-flabo-red font-display tracking-[0.18em]"
          >
            出典 ↗
          </a>
        )}
      </div>
    </div>
  );
}
