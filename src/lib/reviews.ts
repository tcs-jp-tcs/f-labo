import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { Review, ReviewCategory, ReviewSummary } from "@/lib/data";

/**
 * Supabase reviews テーブルから記事を取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * news.ts の getActiveNews と同じパターン。
 *
 * テーブルカラム: id, slug, category, round, flag, gp_name, title, subtitle,
 *                 excerpt, body, thumbnail_url, published_at, archived, created_at
 */

/** DB の reviews 行（読み取りに使うカラムのみ） */
type ReviewRow = {
  slug: string;
  category: string;
  round: number;
  flag: string;
  gp_name: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  body: string;
  published_at: string | null;
};

/** published_at(ISO) → 表示用「2026年5月25日」(JST) に整形 */
function formatJpDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/** DB 行 → Review 型に変換 */
function toReview(row: ReviewRow): Review {
  return {
    slug: row.slug,
    category: row.category as ReviewCategory,
    round: row.round,
    flag: row.flag,
    gpName: row.gp_name,
    title: row.title,
    subtitle: row.subtitle ?? "",
    excerpt: row.excerpt ?? "",
    date: formatJpDate(row.published_at),
    body: row.body,
  };
}

const SELECT_COLUMNS =
  "slug, category, round, flag, gp_name, title, subtitle, excerpt, body, published_at";

/** archived=false のレビューを取得（published_at DESC、同日内は round DESC） */
export const getActiveReviews = cache(async (): Promise<ReviewSummary[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select(SELECT_COLUMNS)
    .eq("archived", false)
    .order("published_at", { ascending: false })
    .order("round", { ascending: false });

  if (error) {
    console.error("[reviews] fetch failed:", error.message);
    return [];
  }
  // 一覧では本文は不要だが、変換を共通化して body を落とす
  return (data ?? []).map((row) => {
    const r = toReview(row as ReviewRow);
    const { body: _body, ...summary } = r;
    void _body;
    return summary;
  });
});

/** slug 指定でレビュー1件を取得（本文込み・無ければ null） */
export const getReviewBySlug = cache(
  async (slug: string): Promise<Review | null> => {
    if (!slug) return null;
    const { data, error } = await supabase
      .from("reviews")
      .select(SELECT_COLUMNS)
      .eq("slug", slug)
      .eq("archived", false)
      .maybeSingle();

    if (error) {
      console.error("[reviews] getReviewBySlug failed:", error.message);
      return null;
    }
    return data ? toReview(data as ReviewRow) : null;
  },
);
