"use client";

import { useState } from "react";
import type { ScheduleItem, ScheduleSession } from "@/lib/data";

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
              } ${item.status === "past" ? "opacity-70" : ""}`}
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
                {isOpen ? "閉じる ▲" : "セッション詳細 ▼"}
              </div>
            </button>

            {isOpen && (
              <div className="mt-2 rounded-xl border border-white/5 bg-flabo-carbon p-4 md:p-5">
                {item.sessions && item.sessions.length > 0 ? (
                  <div className="overflow-x-auto">
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
                ) : (
                  <p className="text-flabo-grey text-xs leading-relaxed">
                    詳細なセッションタイムテーブルは現在準備中です。決まり次第こちらに反映します。
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
