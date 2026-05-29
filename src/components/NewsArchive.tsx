"use client";

import { useMemo, useState } from "react";
import SeriesTabs from "@/components/SeriesTabs";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/lib/data";

const TABS = ["ALL", "F1", "F2/F3", "SF", "INDY"] as const;
type Tab = (typeof TABS)[number];

/** 「2026年5月26日」→「2026年5月」。抽出できなければ "その他" */
function monthKey(date: string): string {
  const m = date.match(/^(\d+)年(\d+)月/);
  return m ? `${m[1]}年${m[2]}月` : "その他";
}

type MonthGroup = { key: string; items: NewsItem[] };

/** items は published_at DESC 前提。出現順でグループ化すれば月も新しい順になる */
function groupByMonth(items: NewsItem[]): MonthGroup[] {
  const map = new Map<string, NewsItem[]>();
  for (const item of items) {
    const key = monthKey(item.date);
    const bucket = map.get(key);
    if (bucket) bucket.push(item);
    else map.set(key, [item]);
  }
  return Array.from(map, ([key, groupItems]) => ({ key, items: groupItems }));
}

/** 折りたたみ可能な月セクション。defaultOpen で初期展開状態を指定 */
function MonthSection({
  group,
  defaultOpen,
}: {
  group: MonthGroup;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span
            className={`text-flabo-red text-[0.7rem] transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
            aria-hidden
          >
            ▶
          </span>
          <span className="font-display font-bold tracking-[0.18em] text-sm">
            {group.key}
          </span>
        </span>
        <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey">
          {group.items.length}件
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {group.items.map((n, i) => (
            <NewsCard key={`${group.key}-${n.category}-${i}`} item={n} />
          ))}
        </div>
      )}
    </section>
  );
}

/** アーカイブ記事をタブ絞り込み＋月別折りたたみで表示するクライアント部分 */
export default function NewsArchive({ items }: { items: NewsItem[] }) {
  const [tab, setTab] = useState<Tab>("ALL");

  const groups = useMemo(() => {
    const filtered =
      tab === "ALL"
        ? items
        : tab === "F2/F3"
          ? items.filter(
              (n) =>
                n.category === "F2" ||
                n.category === "F3" ||
                n.category === "F2/F3",
            )
          : items.filter((n) => n.category === tab);
    return groupByMonth(filtered);
  }, [tab, items]);

  return (
    <>
      <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
      {groups.length === 0 ? (
        <p className="text-flabo-grey text-sm">
          アーカイブされた記事はありません。
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {groups.map((group, i) => (
            // key に tab を含め、タブ切替時に再マウント→最新月のみ展開へリセット
            <MonthSection
              key={`${tab}-${group.key}`}
              group={group}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      )}
    </>
  );
}
