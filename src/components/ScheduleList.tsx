"use client";

import { useState } from "react";
import type { ScheduleItem, ScheduleSession } from "@/lib/data";
import { formatClock, tzLabel } from "@/lib/timezone";
import { useTz } from "./TzProvider";
import CardHeader from "./CardHeader";

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

  // 訪問者TZは TzProvider が単一ソース（手動設定 > 端末自動）。SSR/初回描画では null
  // （右列はプレースホルダ）→ mount後に確定。左列(開催地)は常にSSRで正しい。
  const { tz: visitorTz } = useTz();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const badge = !isWeekend && item.status ? STATUS_BADGE[item.status] : null;
        const isHighlight = isWeekend
          ? isOpen
          : item.status === "live" || item.status === "next";
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
                {/* 局名表記はSFのみ表示（他は実質1局独占で情報価値が低いため非表示。schedules.broadcast はDB保持） */}
                {item.series === "SF" && item.broadcast && (
                  <div className="mt-2 text-[0.65rem] text-flabo-green flex items-center gap-1">
                    ○ {item.broadcast}
                  </div>
                )}
                <div className="mt-3 text-[0.55rem] font-display tracking-[0.18em] text-flabo-grey">
                  {isOpen ? "閉じる ▲" : "詳細を見る ▼"}
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="rounded-b-xl border border-t-0 border-white/5 bg-flabo-carbon px-3 py-3 space-y-3">
                {/* セッションタイムテーブル */}
                {item.sessions && item.sessions.length > 0 && (() => {
                  const sessions = item.sessions;
                  // startUtc + tz があればこのカードは地域時間変換モード（左=開催地city / 右=訪問者地域）。
                  // 無い行（未移行）は従来の文字列（左=現地文字列 / 右=日本JST）にフォールバック。
                  const useUtc = Boolean(item.tz) && sessions.some((s) => s.startUtc);
                  const refUtc = sessions.find((s) => s.startUtc)?.startUtc;
                  const circuitHeader = useUtc ? (item.city ?? "開催地") : "開催地";
                  const visitorHeader = useUtc
                    ? visitorTz && refUtc
                      ? tzLabel(visitorTz, new Date(refUtc))
                      : "地域を判定中…"
                    : "日本 (JST)";
                  return (
                    <div>
                      <div className="font-display tracking-[0.18em] text-[0.5rem] text-flabo-grey uppercase mb-1.5">
                        セッションタイムテーブル
                      </div>
                      <div className="overflow-x-auto -mx-1">
                        <table className="w-full text-[0.65rem]">
                          <thead>
                            <tr className="text-flabo-grey font-display tracking-[0.14em] text-[0.5rem]">
                              <th className="text-left py-1 px-1 font-normal">セッション</th>
                              <th className="text-left py-1 px-1 font-normal">{circuitHeader}</th>
                              <th className="text-left py-1 px-1 font-normal text-flabo-green">{visitorHeader}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sessions.map((s) => {
                              const circuit =
                                s.startUtc && item.tz ? formatClock(s.startUtc, item.tz) : null;
                              const visitor =
                                s.startUtc && visitorTz ? formatClock(s.startUtc, visitorTz) : null;
                              return (
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
                                    {circuit ? (
                                      <>
                                        <div className="text-flabo-grey text-[0.55rem]">{circuit.date}</div>
                                        <div className="font-display">{circuit.time}</div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="text-flabo-grey text-[0.55rem]">{s.localDate}</div>
                                        <div className="font-display">{s.localTime}</div>
                                      </>
                                    )}
                                  </td>
                                  <td className="py-1.5 px-1 whitespace-nowrap">
                                    {visitor ? (
                                      <>
                                        <div className="text-flabo-grey text-[0.55rem]">{visitor.date}</div>
                                        <div className="font-display text-flabo-green">{visitor.time}</div>
                                      </>
                                    ) : s.startUtc ? (
                                      // 移行済みだが訪問者TZ未確定（mount前）。誤情報を出さずプレースホルダ。
                                      <div className="font-display text-flabo-grey/40">—</div>
                                    ) : (
                                      <>
                                        <div className="text-flabo-grey text-[0.55rem]">{s.jpDate}</div>
                                        <div className="font-display text-flabo-green">{s.jpTime}</div>
                                      </>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}

                {/* 結果は「結果」タブ(race_results)に一本化。スケジュールカードでは非表示（schedules.result はDB保持） */}

                {!item.sessions && (
                  <p className="text-flabo-grey text-[0.7rem] leading-relaxed">
                    詳細セッションは開催日が近づき次第こちらに反映します。
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
