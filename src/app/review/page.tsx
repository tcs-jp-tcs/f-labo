"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/lib/data";

const TABS = ["ALL", "F1", "SF"] as const;
type Tab = (typeof TABS)[number];

export default function ReviewPage() {
  const [tab, setTab] = useState<Tab>("ALL");

  const filtered = useMemo(() => {
    if (tab === "ALL") return reviews;
    return reviews.filter((r) => r.category === tab);
  }, [tab]);

  return (
    <Section>
      <SectionHeader title="レースレビュー" />
      <p className="text-flabo-grey text-sm mb-6">
        Fラボ独自の視点でまとめるレース後の振り返り記事。F1とスーパーフォーミュラを中心に、現地映像・公式記者会見・各種一次情報をもとに執筆しています。
      </p>
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
    </Section>
  );
}
