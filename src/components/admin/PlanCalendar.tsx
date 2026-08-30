"use client";

import { useState } from "react";
import type { PlanDay, PlanItem } from "@/lib/plan";

/**
 * 週カレンダー。1日を上段=投稿／下段=制作の2段に分ける。
 *
 * デスクトップは「ラベル列 + 7日」のグリッドで、投稿の帯と制作の帯が横に揃う。
 * .cal-day を display:contents にして DOM 上は日ごとにまとめてあるので、
 * 768px 未満ではそのまま日付ごとの縦積みに切り替わる。
 */

/** status → 色帯のクラス。未定だけカード全体を点線にする */
const STATUS_CLASS: Record<string, string> = {
  企画: "st-plan",
  制作中: "st-wip",
  完成: "st-done",
  投稿済: "st-posted",
  未定: "st-tbd",
};

const PLATFORM_CLASS: Record<string, string> = {
  YouTube: "pf-yt",
  Instagram: "pf-ig",
  両方: "pf-both",
  未定: "pf-tbd",
};

type Band = "post" | "prod";

function PlanCard({
  item,
  band,
  date,
  openIds,
  onToggle,
}: {
  item: PlanItem;
  band: Band;
  date: string;
  openIds: Set<string>;
  onToggle: (key: string) => void;
}) {
  // 同じ計画が投稿と制作の両方に出るので、開閉はカード単位で持つ
  const key = `${item.id}:${band}:${date}`;
  const open = openIds.has(key);
  const hasRationale = (item.rationale ?? "").trim().length > 0;

  return (
    <div className={`pcard ${STATUS_CLASS[item.status] ?? "st-tbd"}`}>
      <button
        type="button"
        className="pcard-main"
        aria-expanded={hasRationale ? open : undefined}
        onClick={() => hasRationale && onToggle(key)}
        disabled={!hasRationale}
      >
        <span className="pcard-title">{item.title}</span>
        <span className="pcard-badges">
          <span className={`pb ${PLATFORM_CLASS[item.platform] ?? "pf-tbd"}`}>
            {item.platform}
          </span>
          {item.production && <span className="pb pb-prod">{item.production}</span>}
        </span>
        {hasRationale && <span className="pcard-caret">{open ? "▲" : "▼"}</span>}
      </button>
      {open && hasRationale && (
        <div className="pcard-why">
          <span className="pcard-why-lbl">なぜこの日・この形式か</span>
          <p>{item.rationale}</p>
        </div>
      )}
    </div>
  );
}

function Band({
  band,
  day,
  openIds,
  onToggle,
}: {
  band: Band;
  day: PlanDay;
  openIds: Set<string>;
  onToggle: (key: string) => void;
}) {
  const items = band === "post" ? day.posts : day.productions;
  return (
    <div className={`cal-cell ${band === "post" ? "is-post" : "is-prod"}`}>
      <span className="cal-band-lbl">{band === "post" ? "投稿" : "制作"}</span>
      {items.length === 0 ? (
        <span className="cal-none">—</span>
      ) : (
        items.map((item) => (
          <PlanCard
            key={`${item.id}:${band}`}
            item={item}
            band={band}
            date={day.date}
            openIds={openIds}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
}

export default function PlanCalendar({ days }: { days: PlanDay[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="cal">
      <div className="cal-rail cal-corner" aria-hidden />
      <div className="cal-rail cal-rail-post">投稿</div>
      <div className="cal-rail cal-rail-prod">制作</div>

      {days.map((day, index) => (
        <div
          className="cal-day"
          key={day.date}
          style={{ ["--col" as string]: String(index + 2) }}
        >
          <div
            className={`cal-head ${day.isToday ? "is-today" : ""} ${
              day.weekdayIndex === 5 ? "is-sat" : day.weekdayIndex === 6 ? "is-sun" : ""
            } ${day.isRaceDay ? "is-race" : ""}`}
          >
            <span className="cal-date">{day.label}</span>
            <span className="cal-wd">{day.weekday}</span>
          </div>
          <Band band="post" day={day} openIds={openIds} onToggle={toggle} />
          <Band band="prod" day={day} openIds={openIds} onToggle={toggle} />
        </div>
      ))}
    </div>
  );
}
