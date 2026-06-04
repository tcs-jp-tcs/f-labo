import Link from "next/link";
import type { ReviewSummary } from "@/lib/data";
import CardHeader from "./CardHeader";

export default function ReviewCard({ item }: { item: ReviewSummary }) {
  return (
    <Link
      href={`/review/${item.slug}`}
      className="group flex flex-col rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden transition-all duration-300 hover:border-flabo-red/60 hover:-translate-y-0.5"
    >
      <CardHeader category={item.category} />
      <div className="p-5 flex flex-col flex-1 gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey uppercase">
            Round {item.round}
          </span>
          <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey">
            {item.flag} {item.gpName}
          </span>
        </div>
        <h3 className="font-bold text-[1rem] leading-relaxed group-hover:text-flabo-red transition-colors">
          {item.title}
        </h3>
        <p className="text-[0.78rem] leading-relaxed text-flabo-grey -mt-1">
          {item.subtitle}
        </p>
        <p className="text-[0.78rem] leading-relaxed text-white/65 flex-1">
          {item.excerpt}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[0.7rem] text-flabo-grey">{item.date}</span>
          <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey group-hover:text-flabo-red transition-colors">
            続きを読む →
          </span>
        </div>
      </div>
    </Link>
  );
}
