"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTz } from "./TzProvider";
import { TZ_OPTIONS, allTimeZones, tzAbbr, tzRegion } from "@/lib/timezone";

function GearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

/**
 * 地域・時間設定（歯車）。スケジュールの「訪問者時刻列」をどの地域の時刻で表示するかを
 * 手動で上書きできる（保険／任意設定）。既定は「自動（端末に合わせる）」。
 * 言語切替は別の 🌐 アイコン（LangSwitcher）に残す。
 */
export default function TzSwitcher() {
  const { tz, mode, setTz } = useTz();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const now = useMemo(() => new Date(), []);

  // ボタン表示：自動なら「AUTO」、手動なら略称（JST等）か地域名
  const buttonText =
    mode === "manual" && tz ? tzAbbr(tz, now) || tzRegion(tz) : "AUTO";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return allTimeZones()
      .filter((iana) => {
        const region = tzRegion(iana).toLowerCase();
        return (
          iana.toLowerCase().includes(q) ||
          region.includes(q)
        );
      })
      .slice(0, 60);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (iana: string | null) => {
    setTz(iana);
    setOpen(false);
    setQuery("");
  };

  const renderRegion = (iana: string, label?: string) => {
    const active = mode === "manual" && tz === iana;
    const abbr = tzAbbr(iana, now);
    return (
      <button
        key={iana}
        type="button"
        onClick={() => choose(iana)}
        className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
          active ? "bg-flabo-red/15 text-white" : "text-flabo-text hover:bg-white/5"
        }`}
      >
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-medium">{label ?? tzRegion(iana)}</span>
          <span className="truncate text-[0.65rem] text-flabo-grey">
            {iana}
            {abbr ? ` · ${abbr}` : ""}
          </span>
        </span>
        {active && (
          <span className="shrink-0 text-flabo-red" aria-hidden>
            ✓
          </span>
        )}
      </button>
    );
  };

  return (
    <div ref={containerRef} className="relative notranslate" translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="地域・時間を設定 / Region & time settings"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-flabo-grey transition-colors hover:border-white/20 hover:text-white"
      >
        <GearIcon />
        <span className="font-display text-[0.7rem] font-bold uppercase tracking-[0.12em]">
          {buttonText}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[60] md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 z-[70] mt-2 w-[min(92vw,320px)] overflow-hidden rounded-xl border border-white/10 bg-flabo-carbon shadow-2xl shadow-black/60">
            <div className="border-b border-white/10 px-3 py-2.5">
              <p className="text-[0.7rem] font-bold text-flabo-text">
                地域・時間設定
              </p>
              <p className="mt-0.5 text-[0.6rem] leading-relaxed text-flabo-grey">
                スケジュールの「あなたの時刻」をどの地域で表示するか選べます（言語は 🌐 から）。
              </p>
            </div>

            {/* 自動 */}
            <div className="p-2">
              <button
                type="button"
                onClick={() => choose(null)}
                className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  mode === "auto"
                    ? "bg-flabo-red/15 text-white"
                    : "text-flabo-text hover:bg-white/5"
                }`}
              >
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-medium">自動（端末に合わせる）</span>
                  <span className="truncate text-[0.65rem] text-flabo-grey">
                    {tz && mode === "auto" ? `${tzRegion(tz)} · ${tz}` : "ブラウザのタイムゾーンを使用"}
                  </span>
                </span>
                {mode === "auto" && (
                  <span className="shrink-0 text-flabo-red" aria-hidden>
                    ✓
                  </span>
                )}
              </button>
            </div>

            <div className="border-y border-white/10 p-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="地域・都市を検索 / Search region"
                className="w-full rounded-md border border-white/10 bg-flabo-dark px-3 py-2 text-sm text-flabo-text placeholder:text-flabo-grey focus:border-flabo-red focus:outline-none"
              />
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered ? (
                filtered.length > 0 ? (
                  <div className="flex flex-col gap-0.5">
                    {filtered.map((iana) => renderRegion(iana))}
                  </div>
                ) : (
                  <p className="px-3 py-4 text-center text-sm text-flabo-grey">
                    該当なし / No results
                  </p>
                )
              ) : (
                <>
                  <p className="px-3 pb-1 pt-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-flabo-grey">
                    主要地域
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {TZ_OPTIONS.map((o) => renderRegion(o.iana, o.label))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
