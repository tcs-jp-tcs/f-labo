"use client";

import { useState } from "react";
import type { PodiumRow } from "@/lib/data";
import CardHeader, { type CardCategory } from "./CardHeader";

const POS_BORDER = [
  "border-l-flabo-yellow",
  "border-l-[#C0C0C0]",
  "border-l-[#CD7F32]",
];

/** リタイア・除外（DNF/NC/DNS/DSQ 等）の行はグレーで区別する */
function isOut(row: PodiumRow): boolean {
  if (typeof row.pos !== "number") return true;
  return ["DNF", "NC", "DNS", "DSQ", "NS"].includes(
    (row.time ?? "").trim().toUpperCase(),
  );
}

export default function PodiumCard({
  title,
  podium,
  note,
  category,
}: {
  title: React.ReactNode;
  podium: PodiumRow[];
  note?: string;
  /** 結果のシリーズ。指定するとそのシリーズ色・ラベルのヘッダーになる */
  category?: CardCategory;
}) {
  const [expanded, setExpanded] = useState(false);

  const top3 = podium.slice(0, 3);
  const hasMore = podium.length > 3;

  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden">
      <CardHeader category={category} />
      <div className="p-5">
        <h3 className="font-display tracking-[0.24em] text-[0.65rem] uppercase text-flabo-grey mb-3 flex items-center gap-1.5 flex-wrap">
          {title}
        </h3>
        {podium.length > 0 ? (
          <>
            {/* 上位3名カード */}
            <div className="flex flex-col gap-1.5">
              {top3.map((row, i) => {
                const out = isOut(row);
                return (
                  <div
                    key={`top-${i}`}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md bg-white/[0.03] border-l-[3px] ${POS_BORDER[i]}`}
                  >
                    <span
                      className={`font-display font-black text-base w-7 ${
                        out ? "text-flabo-grey" : ""
                      }`}
                    >
                      {row.pos}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-bold text-[0.85rem] truncate ${
                          out ? "text-flabo-grey" : ""
                        }`}
                      >
                        {row.driver}
                      </div>
                      <div className="text-[0.65rem] text-flabo-grey truncate">
                        {row.team}
                      </div>
                    </div>
                    <span className="font-display text-[0.7rem] text-flabo-grey">
                      {row.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <>
                {/* 全員テーブル（grid-rows 0fr→1fr で height:auto を滑らかに展開・順位表と統一） */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    expanded ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="text-[0.55rem] uppercase tracking-[0.12em] text-flabo-grey">
                          <th className="font-display font-normal py-1.5 pr-2 w-8">
                            Pos
                          </th>
                          <th className="font-display font-normal py-1.5 pr-2">
                            Driver
                          </th>
                          <th className="font-display font-normal py-1.5 pr-2">
                            Team
                          </th>
                          <th className="font-display font-normal py-1.5 text-right">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {podium.map((row, i) => {
                          const out = isOut(row);
                          return (
                            <tr
                              key={`row-${i}`}
                              className="border-t border-white/5"
                            >
                              <td
                                className={`font-display font-black text-[0.75rem] py-1.5 pr-2 ${
                                  out ? "text-flabo-grey" : ""
                                }`}
                              >
                                {row.pos}
                              </td>
                              <td
                                className={`font-bold text-[0.75rem] py-1.5 pr-2 ${
                                  out ? "text-flabo-grey" : ""
                                }`}
                              >
                                {row.driver}
                              </td>
                              <td className="text-[0.7rem] text-flabo-grey py-1.5 pr-2">
                                {row.team}
                              </td>
                              <td className="font-display text-[0.7rem] text-flabo-grey py-1.5 text-right">
                                {row.time}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-3 w-full rounded-lg border border-white/10 bg-white/[0.02] py-2 font-display text-[0.65rem] uppercase tracking-[0.18em] text-flabo-grey transition-colors hover:text-white hover:border-white/20"
                >
                  {expanded ? "閉じる ▲" : "全員を見る ▼"}
                </button>
              </>
            )}
          </>
        ) : (
          <p className="text-flabo-grey text-xs leading-relaxed py-1">結果待ち</p>
        )}
        {note && (
          <p className="text-[0.65rem] text-white leading-relaxed mt-3 border-t border-white/5 pt-3">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
