"use client";

import { useState } from "react";
import type { ScheduleItem, ScheduleResult, ScheduleSession } from "@/lib/data";

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

function ResultBlock({ title, result }: { title: string; result: NonNullable<ScheduleResult["sprint"]> | ScheduleResult }) {
  return (
    <div className="rounded-lg bg-white/[0.02] border border-white/5 p-3 md:p-4">
      <div className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey uppercase mb-2">
        {title}
      </div>
      {result.pole && (
        <div className="text-[0.75rem] mb-2 flex items-start gap-2">
          <span className="font-display tracking-[0.18em] text-[0.5rem] text-flabo-red bg-flabo-red/15 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
            POLE
          </span>
          <div>
            <span className="font-bold">{result.pole.driver}</span>
            <span className="text-flabo-grey ml-1">({result.pole.team})</span>
            {result.pole.time && (
              <span className="font-display text-flabo-yellow ml-2">{result.pole.time}</span>
            )}
          </div>
        </div>
      )}
      {result.podium && result.podium.length > 0 && (
        <div className="space-y-1">
          {result.podium.map((p, i) => (
            <div
              key={p.pos}
              className={`flex items-center gap-2 text-[0.75rem] pl-2 border-l-2 ${POS_BORDER[i]}`}
            >
              <span className="font-display font-black w-5 text-center">{p.pos}</span>
              <span className="font-bold flex-1 truncate">{p.driver}</span>
              <span className="text-flabo-grey text-[0.65rem] truncate">{p.team}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FastestLapBlock({ fl }: { fl: NonNullable<ScheduleResult["fastestLap"]> }) {
  return (
    <div className="rounded-lg bg-flabo-blue/5 border border-flabo-blue/30 p-3 flex items-center gap-2 text-[0.75rem]">
      <span className="font-display tracking-[0.18em] text-[0.5rem] text-flabo-blue bg-flabo-blue/15 px-1.5 py-0.5 rounded">
        FASTEST LAP
      </span>
      <span className="font-bold">{fl.driver}</span>
      <span className="text-flabo-grey">({fl.team})</span>
      {fl.time && <span className="font-display text-white ml-auto">{fl.time}</span>}
    </div>
  );
}

export default function ScheduleList({ items }: { items: ScheduleItem[] }) {
  const initial = items.findIndex((i) => i.status === "live" || i.status === "next");
  const [openIndex, setOpenIndex] = useState<number>(initial >= 0 ? initial : -1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const badge = item.status ? STATUS_BADGE[item.status] : null;
        const isHighlight = item.status === "live" || item.status === "next";
        return (
          <div key={`${item.series}-${item.round}`} className={isOpen ? "sm:col-span-2 lg:col-span-4" : ""}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`w-full text-left relative overflow-hidden rounded-xl border p-5 transition-all duration-300 ${
                isHighlight
                  ? "bg-gradient-to-br from-flabo-red/10 to-flabo-carbon border-flabo-red"
                  : "bg-flabo-carbon border-white/5 hover:border-flabo-red hover:-translate-y-0.5"
              } ${item.status === "past" ? "opacity-80" : ""}`}
            >
              {badge && badge.label && (
                <span className={`absolute top-2.5 right-2.5 font-display font-bold tracking-[0.18em] text-[0.5rem] px-1.5 py-0.5 rounded ${badge.cls}`}>
                  {badge.label}
                </span>
              )}
              <div className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey mb-2">
                ROUND {item.round}
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
                ✓ {item.broadcast}
              </div>
              <div className="mt-3 text-[0.55rem] font-display tracking-[0.18em] text-flabo-grey">
                {isOpen ? "閉じる ▲" : "詳細を見る ▼"}
              </div>
            </button>

            {isOpen && (
              <div className="mt-2 rounded-xl border border-white/5 bg-flabo-carbon p-4 md:p-5 space-y-4">
                {/* セッションタイムテーブル（未来 / live） */}
                {item.sessions && item.sessions.length > 0 && (
                  <div className="overflow-x-auto">
                    <div className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey uppercase mb-2">
                      セッションタイム
                    </div>
                    <table className="w-full text-[0.75rem] md:text-xs">
                      <thead>
                        <tr className="text-flabo-grey font-display tracking-[0.18em] text-[0.55rem]">
                          <th className="text-left py-2 pr-3">セッション</th>
                          <th className="text-left py-2 pr-3">現地</th>
                          <th className="text-left py-2 pr-3">日本</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.sessions.map((s) => (
                          <tr key={s.name} className="border-t border-white/5">
                            <td className="py-2.5 pr-3">
                              <div className="flex items-center gap-2">
                                {s.type && (
                                  <span className={`font-display tracking-[0.18em] text-[0.5rem] px-1.5 py-0.5 rounded ${SESSION_BADGE[s.type]}`}>
                                    {s.type.toUpperCase()}
                                  </span>
                                )}
                                <span className="font-bold">{s.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5 pr-3">
                              <div className="text-flabo-grey text-[0.65rem]">{s.localDate}</div>
                              <div className="font-display">{s.localTime}</div>
                            </td>
                            <td className="py-2.5 pr-3">
                              <div className="text-flabo-grey text-[0.65rem]">{s.jpDate}</div>
                              <div className="font-display text-flabo-green">{s.jpTime}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* レース結果（過去） */}
                {item.result && (
                  <div className="space-y-3">
                    <div className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey uppercase">
                      結果（公式ソース）
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.result.sprint && (
                        <ResultBlock title="🏁 スプリント" result={item.result.sprint} />
                      )}
                      {(item.result.pole || (item.result.podium && item.result.podium.length > 0)) && (
                        <ResultBlock
                          title={
                            item.result.sprint || item.status === "live"
                              ? "🏁 GP予選 / 決勝"
                              : "🏁 決勝"
                          }
                          result={{
                            pole: item.result.pole,
                            podium: item.result.podium,
                          }}
                        />
                      )}
                    </div>
                    {item.result.fastestLap && <FastestLapBlock fl={item.result.fastestLap} />}
                    {item.result.sourceUrl && (
                      <a
                        href={item.result.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[0.6rem] text-flabo-grey hover:text-flabo-red font-display tracking-[0.18em]"
                      >
                        出典 ↗
                      </a>
                    )}
                  </div>
                )}

                {!item.sessions && !item.result && (
                  <p className="text-flabo-grey text-xs leading-relaxed">
                    詳細なセッションタイムテーブル・結果は開催日が近づき次第こちらに反映します。
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
