"use client";

import { useState } from "react";
import {
  REPORT_METRIC_LABEL,
  type GenrePerformance as GenrePerformanceRow,
  type ReportMetric,
} from "@/lib/report";

/**
 * ジャンル別パフォーマンス表。
 * <table> ではなく CSS グリッドで組み、行の背後に中央値の横棒を重ねている。
 */
const num = (value: number): string => Math.round(value).toLocaleString("en-US");

export default function GenrePerformance({
  yt,
  ig,
}: {
  yt: GenrePerformanceRow[];
  ig: GenrePerformanceRow[];
}) {
  const [metric, setMetric] = useState<ReportMetric>("yt");
  const rows = metric === "yt" ? yt : ig;
  const max = Math.max(1, ...rows.map((row) => row.median));

  return (
    <>
      <div className="an-subbar">
        <div className="an-toggle">
          {(["yt", "ig"] as ReportMetric[]).map((key) => (
            <button
              key={key}
              type="button"
              className={key === metric ? "on" : ""}
              onClick={() => setMetric(key)}
            >
              {REPORT_METRIC_LABEL[key]}
            </button>
          ))}
        </div>
        <span className="gp-note">中央値の降順／横棒は中央値の相対値</span>
      </div>

      {rows.length === 0 ? (
        <div className="empty">データなし</div>
      ) : (
        <div className="gp-scroll">
          <div className="gp">
            <div className="gp-head">
              <span>ジャンル</span>
              <span>件数</span>
              <span>中央値</span>
              <span>平均</span>
              <span>最高</span>
              <span>最低</span>
            </div>
            {rows.map((row) => (
              <div className="gp-row" key={row.genre}>
                <span className="gp-bar" style={{ width: `${(row.median / max) * 100}%` }} />
                <span className="gp-genre">{row.genre}</span>
                <span>{row.count}</span>
                <span className="gp-strong">{num(row.median)}</span>
                <span>{num(row.mean)}</span>
                <span>{num(row.max)}</span>
                <span>{num(row.min)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
