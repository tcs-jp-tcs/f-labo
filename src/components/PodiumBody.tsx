"use client";

import { useState } from "react";
import type { PodiumRow } from "@/lib/data";

/** リタイア・除外（DNF/NC/DNS/DSQ 等）の行はグレーで区別する */
export function isOut(row: PodiumRow): boolean {
  if (typeof row.pos !== "number") return true;
  return ["DNF", "NC", "DNS", "DSQ", "NS"].includes(
    (row.time ?? "").trim().toUpperCase(),
  );
}

const POS_BORDER = [
  "border-l-flabo-yellow",
  "border-l-[#C0C0C0]",
  "border-l-[#CD7F32]",
];

/**
 * 表彰台（podium 配列）の共通表示。
 * 上位3名をカードで、「全員を見る ▼」で全件テーブルを grid-rows アニメで展開。
 * large=true で上位3名カードをやや大きく表示（結果ページ用）。
 */
export default function PodiumBody({
  podium,
  large = false,
}: {
  podium: PodiumRow[];
  large?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  if (podium.length === 0) {
    return (
      <p className="text-flabo-grey text-xs leading-relaxed py-1">結果待ち</p>
    );
  }

  const top3 = podium.slice(0, 3);
  const hasMore = podium.length > 3;

  return (
    <div>
      {/* 上位3名カード */}
      <div className="flex flex-col gap-1.5">
        {top3.map((row, i) => {
          const out = isOut(row);
          return (
            <div
              key={`top-${i}`}
              className={`flex items-center gap-2.5 rounded-md bg-white/[0.03] border-l-[3px] ${
                POS_BORDER[i]
              } ${large ? "px-3 py-2.5" : "px-2.5 py-2"}`}
            >
              <span
                className={`font-display font-black ${
                  large ? "text-lg w-8" : "text-base w-7"
                } ${out ? "text-flabo-grey" : ""}`}
              >
                {row.pos}
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className={`font-bold truncate ${
                    large ? "text-[0.95rem]" : "text-[0.85rem]"
                  } ${out ? "text-flabo-grey" : ""}`}
                >
                  {row.driver}
                </div>
                <div
                  className={`text-flabo-grey truncate ${
                    large ? "text-[0.7rem]" : "text-[0.65rem]"
                  }`}
                >
                  {row.team}
                </div>
              </div>
              <span
                className={`font-display text-flabo-grey ${
                  large ? "text-[0.75rem]" : "text-[0.7rem]"
                }`}
              >
                {row.time}
              </span>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <>
          {/* 全員テーブル（grid-rows 0fr→1fr で height:auto を滑らかに展開） */}
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
                    <th className="font-display font-normal py-1.5 pr-2">Team</th>
                    <th className="font-display font-normal py-1.5 text-right">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {podium.map((row, i) => {
                    const out = isOut(row);
                    return (
                      <tr key={`row-${i}`} className="border-t border-white/5">
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
    </div>
  );
}
