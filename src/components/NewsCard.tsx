import Link from "next/link";
import type { NewsItem } from "@/lib/data";

const CATEGORY_BAR: Record<NewsItem["category"], string> = {
  F1: "bg-flabo-red",
  F2: "bg-flabo-blue",
  F3: "bg-flabo-blue",
  "F2/F3": "bg-flabo-blue",
  SF: "bg-flabo-yellow",
  INDY: "bg-flabo-green",
};

const CATEGORY_CHIP: Record<NewsItem["category"], string> = {
  F1: "bg-flabo-red/15 text-flabo-red",
  F2: "bg-flabo-blue/15 text-flabo-blue",
  F3: "bg-flabo-blue/15 text-flabo-blue",
  "F2/F3": "bg-flabo-blue/15 text-flabo-blue",
  SF: "bg-flabo-yellow/15 text-flabo-yellow",
  INDY: "bg-flabo-green/15 text-flabo-green",
};

export default function NewsCard({ item }: { item: NewsItem }) {
  const hasTranslation = Boolean(item.translationBody && item.id != null);
  return (
    <div className="group flex flex-col rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden transition-all duration-300 hover:border-flabo-red/60 hover:-translate-y-0.5">
      <div className={`h-1.5 ${CATEGORY_BAR[item.category]}`} aria-hidden />
      <div className="p-5 flex flex-col flex-1 gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-display tracking-[0.18em] text-[0.55rem] px-1.5 py-0.5 rounded ${CATEGORY_CHIP[item.category]}`}
          >
            {item.category}
          </span>
          <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey uppercase">
            {item.source}
          </span>
        </div>
        <h3 className="font-bold text-[0.95rem] leading-relaxed group-hover:text-flabo-red transition-colors">
          {item.title}
        </h3>
        <p className="text-[0.78rem] leading-relaxed text-white/65 flex-1">
          {item.summary}
        </p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="text-[0.7rem] text-flabo-grey">{item.date}</span>
          <div className="flex items-center gap-3 font-display tracking-[0.18em] text-[0.55rem]">
            {hasTranslation && (
              <Link
                href={`/news/${item.id}`}
                className="text-flabo-grey hover:text-flabo-red transition-colors"
              >
                翻訳を読む ↗
              </Link>
            )}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-flabo-grey hover:text-flabo-red transition-colors"
            >
              元記事を読む ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
