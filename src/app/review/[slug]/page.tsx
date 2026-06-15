import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Markdown from "@/components/Markdown";
import type { ReviewCategory } from "@/lib/data";
import { getReviewBySlug } from "@/lib/reviews";

// レビューはSupabaseの最新状態を常に反映（静的化させない）
export const revalidate = 0;

const CATEGORY_CHIP: Record<ReviewCategory, string> = {
  F1: "bg-flabo-red/15 text-flabo-red",
  SF: "bg-flabo-yellow/15 text-flabo-yellow",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return { title: "レビュー記事 | Fラボ" };
  return {
    title: `${review.title} | ${review.subtitle} | Fラボ`,
    description: review.excerpt,
  };
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);

  if (!review) notFound();

  return (
    <Section>
      <nav className="mb-6 text-[0.7rem] font-display tracking-[0.18em] text-flabo-grey">
        <Link href="/review" className="hover:text-flabo-red transition-colors">
          ← レースレビュー一覧
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto">
        <header className="mb-10 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`font-display tracking-[0.18em] text-[0.7rem] px-2 py-0.5 rounded ${CATEGORY_CHIP[review.category]}`}
            >
              {review.category}
            </span>
            <span className="font-display tracking-[0.18em] text-[0.7rem] text-flabo-grey uppercase">
              Round {review.round}
            </span>
            <span className="font-display tracking-[0.18em] text-[0.7rem] text-flabo-grey">
              {review.flag} {review.gpName}
            </span>
            <span className="text-[0.7rem] text-flabo-grey ml-auto">{review.date}</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl leading-snug mb-3">
            {review.title}
          </h1>
          {review.subtitle && (
            <p className="text-flabo-grey text-sm md:text-base leading-relaxed">
              {review.subtitle}
            </p>
          )}
        </header>

        <Markdown content={review.body} />

        <div className="mt-12 pt-6 border-t border-white/10">
          <Link
            href="/review"
            className="font-display tracking-[0.18em] text-[0.75rem] text-flabo-grey hover:text-flabo-red transition-colors"
          >
            ← レースレビュー一覧へ戻る
          </Link>
        </div>
      </article>
    </Section>
  );
}
