import Link from "next/link";
import type { NewsItem } from "@/lib/data";
import CardHeader from "./CardHeader";

export default function NewsCard({ item }: { item: NewsItem }) {
  const hasTranslation = Boolean(item.translationBody && item.id != null);
  return (
    <div className="group flex flex-col rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden transition-all duration-300 hover:border-flabo-red/60 hover:-translate-y-0.5">
      <CardHeader category={item.category} />
      <div className="p-5 flex flex-col flex-1 gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
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
                Fラボ解説 ↗
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
