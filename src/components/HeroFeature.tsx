import Link from "next/link";
import type { Review } from "@/lib/data";
import CategoryArt from "./CategoryArt";

const TYPE_LABEL: Record<NonNullable<Review["raceType"]>, { label: string; cls: string }> = {
  決勝: { label: "GP決勝レビュー", cls: "bg-flabo-red text-white" },
  スプリント: { label: "スプリントレビュー", cls: "bg-flabo-yellow text-flabo-darker" },
  フィーチャー: { label: "フィーチャーレビュー", cls: "bg-flabo-red text-white" },
  予選: { label: "予選レビュー", cls: "bg-flabo-blue text-white" },
};

export default function HeroFeature({ review }: { review: Review }) {
  const typeMeta = review.raceType
    ? TYPE_LABEL[review.raceType]
    : { label: "LATEST REVIEW", cls: "bg-flabo-red text-white" };

  return (
    <div className="hero-glow rounded-2xl border border-white/5 bg-gradient-to-br from-flabo-carbon to-flabo-dark overflow-hidden">
      <div className="relative aspect-[16/8] bg-flabo-dark overflow-hidden">
        {review.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <CategoryArt category={review.series} className="absolute inset-0 w-full h-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-flabo-dark via-flabo-dark/40 to-transparent" />
        <div className={`absolute top-4 left-4 inline-flex items-center gap-2 font-display font-bold tracking-[0.24em] text-[0.6rem] uppercase px-3 py-1 rounded ${typeMeta.cls}`}>
          <span className="block w-1.5 h-1.5 bg-current rounded-full pulse-dot" />
          {typeMeta.label}
        </div>
      </div>
      <div className="p-7 md:p-9">
        <h1 className="font-display font-black text-[1.6rem] md:text-3xl leading-tight tracking-wide mb-3.5">
          <span className="text-flabo-red">{review.gpName}</span>
          {review.raceType && (
            <span className="ml-2 text-base md:text-lg text-flabo-grey">／{review.raceType}</span>
          )}
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
        <div className="flex flex-wrap gap-4">
          <Link
            href="/review"
            className="group inline-flex items-center gap-2 text-flabo-red font-display font-bold uppercase tracking-[0.18em] text-xs hover:gap-3 transition-all"
          >
            レビュー一覧へ →
          </Link>
          {review.sourceUrl && (
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-flabo-grey font-display tracking-[0.18em] text-[0.6rem] hover:text-white transition-colors"
            >
              元記事 ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
