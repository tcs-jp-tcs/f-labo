"use client";

import { useMemo, useState } from "react";
import SeriesTabs from "@/components/SeriesTabs";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/lib/data";

const TABS = ["ALL", "F1", "F2/F3", "SF", "INDY"] as const;
type Tab = (typeof TABS)[number];

/** Supabase から取得済みの記事一覧を受け取り、タブで絞り込み表示するクライアント部分 */
export default function NewsList({ items }: { items: NewsItem[] }) {
  const [tab, setTab] = useState<Tab>("ALL");

  const filtered = useMemo(() => {
    if (tab === "ALL") return items;
    if (tab === "F2/F3")
      return items.filter(
        (n) => n.category === "F2" || n.category === "F3" || n.category === "F2/F3",
      );
    return items.filter((n) => n.category === tab);
  }, [tab, items]);

  return (
    <>
      <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
      {filtered.length === 0 ? (
        <p className="text-flabo-grey text-sm">該当するニュースはありません。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((n, i) => (
            <NewsCard key={`${n.category}-${i}-${tab}`} item={n} />
          ))}
        </div>
      )}
    </>
  );
}
