"use client";

import { useMemo, useState } from "react";
import SeriesTabs from "@/components/SeriesTabs";
import ReviewCard from "@/components/ReviewCard";
import type { ReviewSummary } from "@/lib/data";

const TABS = ["ALL", "F1", "SF"] as const;
type Tab = (typeof TABS)[number];

export default function ReviewBrowser({ items }: { items: ReviewSummary[] }) {
  const [tab, setTab] = useState<Tab>("ALL");

  const filtered = useMemo(() => {
    if (tab === "ALL") return items;
    return items.filter((r) => r.category === tab);
  }, [tab, items]);

  return (
    <>
      <SeriesTabs tabs={TABS} active={tab} onChange={setTab} />
      {filtered.length === 0 ? (
        <p className="text-flabo-grey text-sm">該当するレビュー記事はまだありません。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((r) => (
            <ReviewCard key={r.slug} item={r} />
          ))}
        </div>
      )}
    </>
  );
}
