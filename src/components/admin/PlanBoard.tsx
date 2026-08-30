"use client";

import { useMemo, useState } from "react";
import type { PlanItem } from "@/lib/plan";

/**
 * 投稿計画のリスト。ステータス／プラットフォームで絞り込み、
 * 各行の rationale（なぜ作るのか）をクリックで開く。
 */

const PLATFORM_CLASS: Record<string, string> = {
  Instagram: "pf-ig",
  YouTube: "pf-yt",
  両方: "pf-both",
};

const STATUS_CLASS: Record<string, string> = {
  企画: "st-idea",
  制作中: "st-wip",
  完成: "st-done",
  投稿済み: "st-posted",
};

const ALL = "__all__";

export default function PlanBoard({
  items,
  statuses,
  platforms,
}: {
  items: PlanItem[];
  statuses: string[];
  platforms: string[];
}) {
  const [status, setStatus] = useState<string>(ALL);
  const [platform, setPlatform] = useState<string>(ALL);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (status === ALL || item.status === status) &&
          (platform === ALL || item.platform === platform),
      ),
    [items, status, platform],
  );

  const withRationale = filtered.filter((i) => (i.rationale ?? "").trim().length > 0).length;
  const allOpen = filtered.length > 0 && filtered.every((i) => openIds.has(i.id));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <div className="pl-filters">
        <div className="pl-filter">
          <span className="pl-filter-lbl">ステータス</span>
          <div className="an-toggle">
            <button
              type="button"
              className={status === ALL ? "on" : ""}
              onClick={() => setStatus(ALL)}
            >
              すべて
            </button>
            {statuses.map((value) => (
              <button
                key={value}
                type="button"
                className={status === value ? "on" : ""}
                onClick={() => setStatus(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="pl-filter">
          <span className="pl-filter-lbl">プラットフォーム</span>
          <div className="an-toggle">
            <button
              type="button"
              className={platform === ALL ? "on" : ""}
              onClick={() => setPlatform(ALL)}
            >
              すべて
            </button>
            {platforms.map((value) => (
              <button
                key={value}
                type="button"
                className={platform === value ? "on" : ""}
                onClick={() => setPlatform(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pl-strip">
        <span>
          表示 <b>{filtered.length}</b> / {items.length} 件
        </span>
        <span>
          過去実績にもとづく根拠あり <b>{withRationale}</b> 件
          {filtered.length > 0 && `（${Math.round((withRationale / filtered.length) * 100)}%）`}
        </span>
        <button
          type="button"
          className="pl-openall"
          onClick={() =>
            setOpenIds(allOpen ? new Set() : new Set(filtered.map((item) => item.id)))
          }
        >
          {allOpen ? "根拠をすべて閉じる" : "根拠をすべて開く"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">該当する計画がありません</div>
      ) : (
        <div className="pl">
          {filtered.map((item) => {
            const open = openIds.has(item.id);
            const hasRationale = (item.rationale ?? "").trim().length > 0;
            return (
              <div className="pl-row" key={item.id}>
                <div className="pl-date">{item.dateLabel}</div>
                <div className="pl-main">
                  <div className="pl-title">{item.title}</div>
                  <div className="pl-badges">
                    <span className="badge">{item.genre}</span>
                    <span className={`badge pf ${PLATFORM_CLASS[item.platform] ?? ""}`}>
                      {item.platform}
                    </span>
                    {item.production && <span className="badge prod">{item.production}</span>}
                  </div>
                  {hasRationale ? (
                    <>
                      <button
                        type="button"
                        className="pl-why"
                        aria-expanded={open}
                        onClick={() => toggle(item.id)}
                      >
                        なぜ作るのか（根拠）{open ? " ▲" : " ▼"}
                      </button>
                      {open && (
                        <div className="pl-rationale">
                          <span className="pl-rationale-lbl">Evidence</span>
                          <code>{item.rationale}</code>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="pl-norationale">根拠は未記入</p>
                  )}
                </div>
                <div className="pl-status">
                  <span className={`st ${STATUS_CLASS[item.status] ?? ""}`}>{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
