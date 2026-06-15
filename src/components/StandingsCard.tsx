"use client";

import { useState } from "react";
import type { StandingRow } from "@/lib/data";

export default function StandingsCard({
  title,
  rows,
  showTeamBar = false,
  note,
}: {
  title: string;
  rows: StandingRow[];
  showTeamBar?: boolean;
  note?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const teamColor = (name: string): string => {
    const map: Record<string, string> = {
      McLaren: "bg-[#FF8000]",
      Ferrari: "bg-[#DC0000]",
      "Red Bull": "bg-[#1E41FF]",
      Mercedes: "bg-[#00D2BE]",
      "Aston Martin": "bg-[#229971]",
      Williams: "bg-[#1868DB]",
      RB: "bg-[#6692FF]",
      Alpine: "bg-[#FF87BC]",
      Sauber: "bg-[#52E252]",
      Haas: "bg-[#B6BABD]",
    };
    return map[name] ?? "bg-white/30";
  };

  // 上位3名カードのポジション番号の配色（金・銀・銅）
  const posStyle = (pos: number): string => {
    if (pos === 1) return "bg-flabo-yellow/15 text-flabo-yellow";
    if (pos === 2) return "bg-white/10 text-white/80";
    if (pos === 3) return "bg-[#CD7F32]/20 text-[#E8A55F]";
    return "bg-white/5 text-flabo-grey";
  };

  const top3 = rows.slice(0, 3);
  const hasMore = rows.length > 3;

  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon p-5">
      <h3 className="font-display tracking-[0.24em] text-[0.75rem] uppercase text-flabo-grey mb-1">
        {title}
      </h3>
      {note && (
        <p className="text-[0.75rem] text-flabo-grey mb-3.5">{note}</p>
      )}

      {/* 上位3名カード */}
      <div className="space-y-2">
        {top3.map((row) => (
          <div
            key={`${row.pos}-${row.name}`}
            className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-display font-black text-[0.85rem] ${posStyle(
                row.pos,
              )}`}
            >
              {row.pos}
            </span>
            {showTeamBar && (
              <span
                className={`block w-1 h-7 rounded-sm ${teamColor(row.name)}`}
                aria-hidden
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-[0.85rem] leading-tight">
                {row.name}
              </p>
              {row.team && (
                <p className="truncate text-[0.7rem] text-flabo-grey leading-tight mt-0.5">
                  {row.team}
                </p>
              )}
            </div>
            <span className="font-display text-[0.8rem] text-flabo-yellow shrink-0">
              {row.points}
              <span className="text-[0.7rem] text-flabo-grey ml-1">pts</span>
            </span>
          </div>
        ))}
      </div>

      {hasMore && (
        <>
          {/* 全員リスト（grid-rows 0fr→1fr で height:auto を滑らかに展開） */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              expanded ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-[0.7rem] uppercase tracking-[0.12em] text-flabo-grey">
                    <th className="font-display font-normal py-1.5 pr-2 w-8">Pos</th>
                    <th className="font-display font-normal py-1.5 pr-2">Name</th>
                    <th className="font-display font-normal py-1.5 pr-2">Team</th>
                    <th className="font-display font-normal py-1.5 text-right">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(3).map((row) => (
                    <tr
                      key={`${row.pos}-${row.name}`}
                      className="border-t border-white/5"
                    >
                      <td className="font-display font-black text-[0.75rem] text-flabo-grey py-1.5 pr-2">
                        {row.pos}
                      </td>
                      <td className="font-bold text-[0.75rem] py-1.5 pr-2">
                        {row.name}
                      </td>
                      <td className="text-[0.7rem] text-flabo-grey py-1.5 pr-2">
                        {row.team ?? "—"}
                      </td>
                      <td className="font-display text-[0.75rem] text-flabo-yellow py-1.5 text-right">
                        {row.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 w-full rounded-lg border border-white/10 bg-white/[0.02] py-2 font-display text-[0.75rem] uppercase tracking-[0.18em] text-flabo-grey transition-colors hover:text-white hover:border-white/20"
          >
            {expanded ? "閉じる ▲" : "全員を見る ▼"}
          </button>
        </>
      )}
    </div>
  );
}
