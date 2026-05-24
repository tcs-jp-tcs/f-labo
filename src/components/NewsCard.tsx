import type { NewsItem } from "@/lib/data";
import CategoryArt from "./CategoryArt";

const CATEGORY_STYLE: Record<NewsItem["category"], string> = {
  F1: "bg-flabo-red/20 text-flabo-red",
  F2: "bg-flabo-blue/20 text-flabo-blue",
  F3: "bg-flabo-blue/20 text-flabo-blue",
  "F2/F3": "bg-flabo-blue/20 text-flabo-blue",
  SF: "bg-flabo-yellow/20 text-flabo-yellow",
  INDY: "bg-flabo-green/20 text-flabo-green",
};

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden transition-all duration-300 hover:border-flabo-red/60 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] bg-flabo-dark overflow-hidden">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CategoryArt category={item.category} className="absolute inset-0 w-full h-full" />
        )}
        <span
          className={`absolute top-2 left-2 font-display tracking-[0.18em] text-[0.55rem] px-1.5 py-0.5 rounded ${CATEGORY_STYLE[item.category]}`}
        >
          {item.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-red uppercase mb-2">
          {item.source}
        </div>
        <h3 className="font-bold text-[0.95rem] leading-relaxed mb-2.5 group-hover:text-flabo-red transition-colors">
          {item.title}
        </h3>
        <p className="text-[0.8rem] leading-relaxed text-white/65 mb-4 line-clamp-4">
          {item.summary}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[0.7rem] text-flabo-grey">{item.date}</span>
          <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey group-hover:text-flabo-red transition-colors">
            元記事 ↗
          </span>
        </div>
      </div>
    </a>
  );
}
