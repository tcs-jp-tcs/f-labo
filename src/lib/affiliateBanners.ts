import { cache } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Supabase affiliate_banners テーブルから Amazonアフィリエイトバナーを取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * embeds.ts / news.ts と同じパターン。
 *
 * テーブルカラム: id, title, placement('top'|'mid'), variant('image'|'banded'|'multi'),
 *   badge, heading, copy, cta_label, links(jsonb), image_url, link_url, sort_order,
 *   starts_at, ends_at, is_active, created_at, updated_at
 *
 * 運用: affiliate_banners を INSERT/UPDATE するだけでバナー差し替えが可能（コード変更不要）。
 *   is_active=true かつ表示期間内（starts_at〜ends_at）を placement 別に sort_order 昇順で表示。
 *   variant: 'image'=全部入り画像（帯なし・PRのみ） / 'banded'=画像＋HTML帯（PR・Amazon＋見出し等）
 *          / 'multi'=画像＋HTML帯だが CTA を links 配列ぶん複数並べる（cta_label / link_url は未使用）。
 *   links: [{ label, url }, ...] の JSONB。multi 以外は NULL。
 *
 * 画像: image_url は resolveBannerImageUrl() で正規化する（下記3形式に対応）。
 *   新規バナーは Supabase Storage の banner-images バケットへ置く運用（Git commit / デプロイ不要）。
 */

/** バナー画像を置く Supabase Storage の public バケット */
const BANNER_BUCKET = "banner-images";

/**
 * DB の image_url を表示用URLに正規化する。次の3形式を受け付ける:
 *  - 絶対URL（例: https://<ref>.supabase.co/storage/v1/object/public/banner-images/xxx.jpg）→ そのまま
 *  - 相対パス（例: /images/xxx.jpg）→ そのまま。public/images/ 配下の Git 管理ファイル（過去バナー互換）
 *  - パスのみ（例: xxx.jpg, 2026/xxx.jpg）→ banner-images バケットの公開URLに解決
 */
export function resolveBannerImageUrl(rawUrl: string): string {
  const value = rawUrl.trim();
  if (/^(https?:|data:)/i.test(value)) return value;
  if (value.startsWith("/")) return value;
  return supabase.storage.from(BANNER_BUCKET).getPublicUrl(value).data
    .publicUrl;
}

export type BannerPlacement = "top" | "mid";
export type BannerVariant = "image" | "banded" | "multi";

/** variant='multi' の CTA ボタン1つぶん */
export interface BannerLink {
  label: string;
  url: string;
}

export interface AffiliateBanner {
  id: string;
  title: string;
  placement: BannerPlacement;
  variant: BannerVariant;
  badge: string | null;
  heading: string;
  copy: string | null;
  ctaLabel: string;
  /** multi では NULL 許容（画像なしの帯だけのバナーも組める） */
  imageUrl: string | null;
  /** multi では NULL（遷移先は links 側） */
  linkUrl: string | null;
  /** multi のみ。それ以外は空配列 */
  links: BannerLink[];
  sortOrder: number;
}

type BannerRow = {
  id: string;
  title: string;
  placement: string;
  variant: string;
  badge: string | null;
  heading: string;
  copy: string | null;
  cta_label: string | null;
  links: unknown;
  image_url: string | null;
  link_url: string | null;
  sort_order: number | null;
  starts_at: string | null;
  ends_at: string | null;
};

/** DB の variant 文字列を既知の値に正規化（未知の値は banded 扱い） */
function normalizeVariant(value: string): BannerVariant {
  if (value === "image" || value === "multi") return value;
  return "banded";
}

/** links(JSONB) を [{label,url}] に正規化。壊れた要素は捨てる */
function normalizeLinks(raw: unknown): BannerLink[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const { label, url } = item as { label?: unknown; url?: unknown };
    if (typeof label !== "string" || typeof url !== "string") return [];
    if (!label.trim() || !url.trim()) return [];
    return [{ label, url }];
  });
}

/** 指定 placement の表示対象バナーを sort_order 昇順で取得。error 時は空配列 */
export const getAffiliateBanners = cache(
  async (placement: BannerPlacement): Promise<AffiliateBanner[]> => {
    const { data, error } = await supabase
      .from("affiliate_banners")
      .select(
        "id, title, placement, variant, badge, heading, copy, cta_label, links, image_url, link_url, sort_order, starts_at, ends_at",
      )
      .eq("placement", placement)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[affiliateBanners] fetch failed:", error.message);
      return [];
    }

    const now = Date.now();
    return (data ?? [])
      .map((row) => row as BannerRow)
      // 表示期間: starts_at（NULL=即時）〜 ends_at（NULL=無期限、境界は終了時刻で非表示）
      .filter((r) => {
        const startOk = !r.starts_at || Date.parse(r.starts_at) <= now;
        const endOk = !r.ends_at || now < Date.parse(r.ends_at);
        return startOk && endOk;
      })
      .map((r) => ({
        id: r.id,
        title: r.title,
        placement: r.placement as BannerPlacement,
        variant: normalizeVariant(r.variant),
        badge: r.badge,
        heading: r.heading,
        copy: r.copy,
        ctaLabel: r.cta_label ?? "",
        imageUrl: r.image_url ? resolveBannerImageUrl(r.image_url) : null,
        linkUrl: r.link_url,
        links: normalizeLinks(r.links),
        sortOrder: r.sort_order ?? 0,
      }));
  },
);
