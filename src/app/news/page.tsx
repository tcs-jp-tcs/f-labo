"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SeriesTabs from "@/components/SeriesTabs";
import NewsCard from "@/components/NewsCard";
import { news } from "@/lib/data";

const TABS = ["ALL", "F1", "F2/F3", "SF", "INDY"] as const;
type Tab = (typeof TABS)[number];

export default function NewsPage() {
  const [tab, setTab] = useState<Tab>("ALL");

  const filtered = useMemo(() => {
    if (tab === "ALL") return news;
    if (tab === "F2/F3")
      return news.filter(
        (n) => n.category === "F2" || n.category === "F3" || n.category === "F2/F3",
      );
    return news.filter((n) => n.category === tab);
  }, [tab]);

  return (
    <Section>
      <SectionHeader title="ニュース" />
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
    </Section>
  );
}
