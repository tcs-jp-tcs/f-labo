import Link from "next/link";
import type { NewsItem } from "@/lib/data";

const CATEGORY_BAR: Record<NewsItem["category"], { bg: string; text: string; label: string }> = {
  F1: { bg: "bg-flabo-red", text: "text-white", label: "FORMULA 1" },
  F2: { bg: "bg-flabo-blue", text: "text-white", label: "FORMULA 2" },
  F3: { bg: "bg-flabo-blue", text: "text-white", label: "FORMULA 3" },
  "F2/F3": { bg: "bg-flabo-blue", text: "text-white", label: "FORMULA 2 / 3" },
  SF: { bg: "bg-flabo-yellow", text: "text-flabo-darker", label: "SUPER FORMULA" },
  INDY: { bg: "bg-flabo-green", text: "text-flabo-darker", label: "INDYCAR" },
};

export default function HeroFeature({ item }: { item: NewsItem }) {
  const bar = CATEGORY_BAR[item.category];

  return (
    <article className="hero-glow rounded-2xl border border-white/5 bg-gradient-to-br from-flabo-carbon to-flabo-dark overflow-hidden">
      {/* compact category bar */}
      <div className={`flex items-center justify-between px-5 py-2 ${bar.bg} ${bar.text}`}>
        <div className="flex items-center gap-2 font-display font-bold tracking-[0.24em] text-[0.6rem] uppercase">
          <span className="block w-1.5 h-1.5 bg-current rounded-full pulse-dot" />
          TOP STORY · {bar.label}
        </div>
        <span className="font-display tracking-[0.18em] text-[0.55rem] uppercase opacity-90">
          {item.source}
        </span>
      </div>

      {/* optional small thumbnail */}
      {item.imageUrl && (
        <div className="relative aspect-[16/6] bg-flabo-dark overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-flabo-dark/90 via-flabo-dark/30 to-transparent" />
        </div>
      )}

      <div className="p-6 md:p-8">
        <h1 className="font-display font-black text-[1.5rem] md:text-[1.85rem] leading-tight tracking-wide mb-4">
          {item.title}
        </h1>
        <p className="text-[0.95rem] leading-relaxed text-white/80 mb-5">
          {item.summary}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className="text-flabo-grey text-xs">{item.date}</span>
          <div className="flex items-center gap-4 flex-wrap">
            {item.translationBody && item.id != null && (
              <Link
                href={`/news/${item.id}`}
                className="inline-flex items-center gap-2 text-flabo-red font-display font-bold uppercase tracking-[0.18em] text-xs hover:gap-3 transition-all"
              >
                翻訳を読む ↗
              </Link>
            )}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-flabo-red font-display font-bold uppercase tracking-[0.18em] text-xs hover:gap-3 transition-all"
            >
              元記事を読む ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
