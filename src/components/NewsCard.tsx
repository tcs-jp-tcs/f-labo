import type { NewsItem } from "@/lib/data";

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
    <article className="flex flex-col rounded-xl border border-white/5 bg-flabo-carbon p-5 transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5">
      <span
        className={`font-display tracking-[0.08em] text-[0.55rem] px-1.5 py-0.5 rounded mb-2 w-fit ${
          CATEGORY_STYLE[item.category]
        }`}
      >
        {item.category}
      </span>
      <div className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-red uppercase mb-2">
        {item.source}
      </div>
      <h3 className="font-bold text-[0.9rem] leading-relaxed mb-2.5 flex-1">
        {item.title}
      </h3>
      <div className="text-[0.7rem] text-flabo-grey">{item.date}</div>
    </article>
  );
}
