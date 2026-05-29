import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { NewsItem } from "@/lib/data";

/**
 * Supabase news テーブルから記事を取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 *
 * テーブルカラム: id, category, title, summary, source_name, source_url,
 *                 thumbnail_url, published_at, archived, created_at
 */

/** DB の news 行（読み取りに使うカラムのみ） */
type NewsRow = {
  category: string;
  title: string;
  summary: string | null;
  source_name: string | null;
  source_url: string | null;
  thumbnail_url: string | null;
  published_at: string | null;
};

/** published_at(ISO) → 表示用「2026年5月26日」(JST) に整形 */
function formatJpDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
  return parts; // 例: "2026年5月26日"
}

/** DB 行 → 既存の NewsItem 型に変換 */
function toNewsItem(row: NewsRow): NewsItem {
  return {
    category: row.category as NewsItem["category"],
    source: row.source_name ?? "",
    title: row.title,
    summary: row.summary ?? "",
    date: formatJpDate(row.published_at),
    url: row.source_url ?? "",
    imageUrl: row.thumbnail_url ?? undefined,
  };
}

const SELECT_COLUMNS =
  "category, title, summary, source_name, source_url, thumbnail_url, published_at";

/**
 * archived 状態を指定して記事を取得（published_at DESC、同日内は登録順）。
 * category: "F2/F3" は F2・F3 をまとめて取得。未指定なら全カテゴリ。
 */
async function fetchNews(
  archived: boolean,
  category?: string,
): Promise<NewsItem[]> {
  let query = supabase
    .from("news")
    .select(SELECT_COLUMNS)
    .eq("archived", archived)
    .order("published_at", { ascending: false })
    .order("id", { ascending: true });

  if (category && category !== "ALL") {
    if (category === "F2/F3") {
      query = query.in("category", ["F2", "F3"]);
    } else {
      query = query.eq("category", category);
    }
  }

  const { data, error } = await query;
  if (error) {
    console.error("[news] fetch failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => toNewsItem(row as NewsRow));
}

/** archived=false の記事を取得 */
export const getActiveNews = cache(
  (category?: string): Promise<NewsItem[]> => fetchNews(false, category),
);

/** archived=true の記事を取得 */
export const getArchivedNews = cache(
  (category?: string): Promise<NewsItem[]> => fetchNews(true, category),
);
