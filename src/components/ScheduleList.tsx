"use client";

import { useState } from "react";
import { seriesNetworks } from "@/lib/data";
import type { ScheduleItem, ScheduleResult, ScheduleSession } from "@/lib/data";
import CardHeader from "./CardHeader";

/**
 * 放送統合テーブルの列ヘッダー（放送局名）を決定する。
 * 各セッションの broadcasts オブジェクトのキーを初出順で集約して列にする
 * （F1: FOD/フジTV NEXT、F2・F3: F1 TV のように実態に合わせて動的化）。
 * broadcasts が未設定の行は networks → seriesNetworks の従来フォールバックを使う。
 */
function resolveNetworks(item: ScheduleItem): string[] {
  const seen: string[] = [];
  for (const s of item.sessions ?? []) {
    for (const key of Object.keys(s.broadcasts ?? {})) {
      if (!seen.includes(key)) seen.push(key);
    }
  }
  if (seen.length > 0) return seen;
  return item.networks ?? seriesNetworks[item.series] ?? [];
}

const STATUS_BADGE: Record<NonNullable<ScheduleItem["status"]>, { label: string; cls: string }> = {
  live: { label: "LIVE", cls: "text-flabo-green bg-flabo-green/15 animate-pulse" },
  next: { label: "NEXT", cls: "text-flabo-red bg-flabo-red/15" },
  past: { label: "PAST", cls: "text-flabo-grey bg-white/5" },
  upcoming: { label: "", cls: "" },
};

const SESSION_BADGE: Record<NonNullable<ScheduleSession["type"]>, string> = {
  race: "text-flabo-red bg-flabo-red/15",
  sprint: "text-flabo-yellow bg-flabo-yellow/15",
  quali: "text-flabo-blue bg-flabo-blue/15",
  practice: "text-flabo-grey bg-white/5",
};

const POS_BORDER = [
  "border-l-flabo-yellow",
  "border-l-[#C0C0C0]",
  "border-l-[#CD7F32]",
];

function PodiumLines({ podium }: { podium: NonNullable<ScheduleResult["podium"]> }) {
  return (
    <div className="space-y-1">
      {podium.map((p, i) => (
        <div
          key={p.pos}
          className={`flex items-center gap-1.5 text-[0.7rem] pl-1.5 border-l-2 ${POS_BORDER[i]}`}
        >
          <span className="font-display font-black w-4 text-center">{p.pos}</span>
          <span className="font-bold flex-1 truncate">{p.driver}</span>
          <span className="text-flabo-grey text-[0.6rem] truncate max-w-[80px]">{p.team}</span>
        </div>
      ))}
    </div>
  );
}

function ResultBlock({ title, result }: { title: string; result: { pole?: ScheduleResult["pole"]; podium?: ScheduleResult["podium"] } }) {
  if (!result.pole && (!result.podium || result.podium.length === 0)) return null;
  return (
    <div className="rounded-md bg-white/[0.02] border border-white/5 p-2.5">
      <div className="font-display tracking-[0.18em] text-[0.5rem] text-flabo-grey uppercase mb-1.5">
        {title}
      </div>
      {result.pole && (
        <div className="text-[0.7rem] mb-1.5 flex items-start gap-1.5">
          <span className="font-display tracking-[0.18em] text-[0.45rem] text-flabo-red bg-flabo-red/15 px-1 py-0.5 rounded shrink-0 mt-0.5">
            POLE
          </span>
          <div className="min-w-0">
            <span className="font-bold">{result.pole.driver}</span>
            {result.pole.time && (
              <span className="font-display text-flabo-yellow ml-1.5 text-[0.65rem]">{result.pole.time}</span>
            )}
          </div>
        </div>
      )}
      {result.podium && result.podium.length > 0 && <PodiumLines podium={result.podium} />}
    </div>
  );
}

function FastestLapInline({ fl }: { fl: NonNullable<ScheduleResult["fastestLap"]> }) {
  return (
    <div className="rounded-md bg-flabo-blue/5 border border-flabo-blue/30 p-2 flex items-center gap-1.5 text-[0.7rem]">
      <span className="font-display tracking-[0.18em] text-[0.45rem] text-flabo-blue bg-flabo-blue/15 px-1 py-0.5 rounded shrink-0">
        FL
      </span>
      <span className="font-bold truncate">{fl.driver}</span>
      {fl.time && <span className="font-display text-white ml-auto text-[0.65rem]">{fl.time}</span>}
    </div>
  );
}

export default function ScheduleList({
  items,
  variant = "season",
}: {
  items: ScheduleItem[];
  /**
   * "season"（既定・/schedule）: NEXT/PASTバッジ表示・NEXT/LIVEを赤枠で強調。
   * "weekend"（今週のレース予定）: バッジ非表示・赤枠は「開いているカード」だけ
   *   （全カードが今週なのでNEXT強調は無意味。選択中カードの表示として枠を出す）。
   */
  variant?: "season" | "weekend";
}) {
  const initial = items.findIndex((i) => i.status === "live" || i.status === "next");
  const [openIndex, setOpenIndex] = useState<number>(initial >= 0 ? initial : -1);
  const isWeekend = variant === "weekend";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const badge = !isWeekend && item.status ? STATUS_BADGE[item.status] : null;
        const isHighlight = isWeekend
          ? isOpen
          : item.status === "live" || item.status === "next";
        const networks = resolveNetworks(item);
        return (
          <div key={`${item.series}-${item.round}`} className="flex flex-col">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`w-full text-left relative overflow-hidden rounded-xl border transition-all duration-300 ${
                isHighlight
                  ? "bg-gradient-to-br from-flabo-red/10 to-flabo-carbon border-flabo-red"
                  : "bg-flabo-carbon border-white/5 hover:border-flabo-red hover:-translate-y-0.5"
              } ${item.status === "past" ? "opacity-80" : ""} ${isOpen ? "rounded-b-none" : ""}`}
            >
              <CardHeader category={item.series} />
              <div className="relative p-5">
                {badge && badge.label && (
                  <span className={`absolute top-3 right-3 font-display font-bold tracking-[0.18em] text-[0.5rem] px-1.5 py-0.5 rounded ${badge.cls}`}>
                    {badge.label}
                  </span>
                )}
                <div className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey mb-2">
                  {item.roundLabel ?? `ROUND ${item.round}`}
                  {item.weekendType === "スプリント週末" && (
                    <span className="ml-2 text-flabo-yellow">SPRINT</span>
                  )}
                </div>
                <div className="text-xl mb-2.5" aria-hidden>
                  {item.flag}
                </div>
                <div className="font-black text-base leading-tight mb-1">{item.name}</div>
                <div className="text-xs text-flabo-grey">{item.date}</div>
                <div className="mt-2 text-[0.65rem] text-flabo-green flex items-center gap-1">
                  ○ {item.broadcast}
                </div>
                <div className="mt-3 text-[0.55rem] font-display tracking-[0.18em] text-flabo-grey">
                  {isOpen ? "閉じる ▲" : "詳細を見る ▼"}
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="rounded-b-xl border border-t-0 border-white/5 bg-flabo-carbon px-3 py-3 space-y-3">
                {/* セッション × 放送統合テーブル */}
                {item.sessions && item.sessions.length > 0 && (
                  <div>
                    <div className="font-display tracking-[0.18em] text-[0.5rem] text-flabo-grey uppercase mb-1.5">
                      セッション × 放送
                    </div>
                    <div className="overflow-x-auto -mx-1">
                      <table className="w-full text-[0.65rem]">
                        <thead>
                          <tr className="text-flabo-grey font-display tracking-[0.14em] text-[0.5rem]">
                            <th className="text-left py-1 px-1 font-normal">セッション</th>
                            <th className="text-left py-1 px-1 font-normal">現地</th>
                            <th className="text-left py-1 px-1 font-normal text-flabo-green">日本</th>
                            {networks.map((n) => (
                              <th key={n} className="text-center py-1 px-1 font-normal">{n}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {item.sessions.map((s) => (
                            <tr key={s.name} className="border-t border-white/5 align-top">
                              <td className="py-1.5 px-1">
                                <div className="flex items-center gap-1 flex-wrap">
                                  {s.type && (
                                    <span className={`font-display tracking-[0.14em] text-[0.45rem] px-1 py-0.5 rounded ${SESSION_BADGE[s.type]}`}>
                                      {s.type.toUpperCase()}
                                    </span>
                                  )}
                                  <span className="font-bold text-[0.65rem]">{s.name}</span>
                                </div>
                              </td>
                              <td className="py-1.5 px-1 whitespace-nowrap">
                                <div className="text-flabo-grey text-[0.55rem]">{s.localDate}</div>
                                <div className="font-display">{s.localTime}</div>
                              </td>
                              <td className="py-1.5 px-1 whitespace-nowrap">
                                <div className="text-flabo-grey text-[0.55rem]">{s.jpDate}</div>
                                <div className="font-display text-flabo-green">{s.jpTime}</div>
                              </td>
                              {networks.map((n) => {
                                const t = s.broadcasts?.[n];
                                return (
                                  <td key={n} className="py-1.5 px-1 whitespace-nowrap font-display text-center align-middle">
                                    {t ? (
                                      <span className={t === "○" ? "text-white text-[0.95rem] leading-none" : "text-white"}>{t}</span>
                                    ) : (
                                      <span className="text-flabo-grey/40">—</span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-1.5 text-[0.5rem] text-flabo-grey/70 leading-relaxed">
                      ※ 放送局列は番組開始時刻（公式番組表）。空欄は未確認。
                    </div>
                  </div>
                )}

                {/* レース結果（過去） */}
                {item.result && (
                  <div className="space-y-2 border-t border-white/5 pt-3">
                    <div className="font-display tracking-[0.18em] text-[0.5rem] text-flabo-grey uppercase">
                      結果（公式）
                    </div>
                    {item.result.sprint && (
                      <ResultBlock title="🏁 スプリント" result={item.result.sprint} />
                    )}
                    {(item.result.pole || (item.result.podium && item.result.podium.length > 0)) && (
                      <ResultBlock
                        title="🏁 決勝"
                        result={{
                          pole: item.result.pole,
                          podium: item.result.podium,
                        }}
                      />
                    )}
                    {item.result.fastestLap && <FastestLapInline fl={item.result.fastestLap} />}
                    {item.result.sourceUrl && (
                      <a
                        href={item.result.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[0.55rem] text-flabo-grey hover:text-flabo-red font-display tracking-[0.18em]"
                      >
                        出典 ↗
                      </a>
                    )}
                  </div>
                )}

                {!item.sessions && !item.result && (
                  <p className="text-flabo-grey text-[0.7rem] leading-relaxed">
                    詳細セッション・結果は開催日が近づき次第こちらに反映します。
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
