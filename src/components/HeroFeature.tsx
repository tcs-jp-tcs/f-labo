import Link from "next/link";
import type { Review } from "@/lib/data";

export default function HeroFeature({ review }: { review: Review }) {
  return (
    <div className="hero-glow rounded-2xl border border-white/5 bg-gradient-to-br from-flabo-carbon to-flabo-dark p-7 md:p-9">
      <div className="inline-flex items-center gap-2 bg-flabo-red text-white font-display font-bold tracking-[0.24em] text-[0.6rem] uppercase px-3 py-1 rounded mb-4">
        <span className="block w-1.5 h-1.5 bg-white rounded-full pulse-dot" />
        LATEST REVIEW
      </div>
      <h1 className="font-display font-black text-[1.6rem] md:text-3xl leading-tight tracking-wide mb-3.5">
        <span className="text-flabo-red">{review.gpName}</span>
        <br />
        {review.title}
      </h1>
      <div className="text-flabo-grey text-xs md:text-sm mb-5 flex flex-wrap items-center gap-3">
        <span>🏁 Round {review.round}</span>
        <span>📅 {review.date}</span>
        <span aria-hidden>{review.flag}</span>
      </div>
      <p className="text-[0.95rem] leading-relaxed text-white/75 mb-6">
        {review.excerpt}
      </p>
      <Link
        href="/review"
        className="group inline-flex items-center gap-2 text-flabo-red font-display font-bold uppercase tracking-[0.18em] text-xs hover:gap-3 transition-all"
      >
        レビューを読む →
      </Link>
    </div>
  );
}
