import { cache } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Supabase affiliate_banners テーブルから Amazonアフィリエイトバナーを取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * embeds.ts / news.ts と同じパターン。
 *
 * テーブルカラム: id, title, placement('top'|'mid'), variant('image'|'banded'),
 *   badge, heading, copy, cta_label, image_url, link_url, sort_order,
 *   starts_at, ends_at, is_active, created_at, updated_at
 *
 * 運用: affiliate_banners を INSERT/UPDATE するだけでバナー差し替えが可能（コード変更不要）。
 *   is_active=true かつ表示期間内（starts_at〜ends_at）を placement 別に sort_order 昇順で表示。
 *   variant: 'image'=全部入り画像（帯なし・PRのみ） / 'banded'=画像＋HTML帯（PR・Amazon＋見出し等）。
 */

export type BannerPlacement = "top" | "mid";
export type BannerVariant = "image" | "banded";

export interface AffiliateBanner {
  id: string;
  title: string;
  placement: BannerPlacement;
  variant: BannerVariant;
  badge: string | null;
  heading: string;
  copy: string | null;
  ctaLabel: string;
  imageUrl: string;
  linkUrl: string;
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
  cta_label: string;
  image_url: string;
  link_url: string;
  sort_order: number | null;
  starts_at: string | null;
  ends_at: string | null;
};

/** 指定 placement の表示対象バナーを sort_order 昇順で取得。error 時は空配列 */
export const getAffiliateBanners = cache(
  async (placement: BannerPlacement): Promise<AffiliateBanner[]> => {
    const { data, error } = await supabase
      .from("affiliate_banners")
      .select(
        "id, title, placement, variant, badge, heading, copy, cta_label, image_url, link_url, sort_order, starts_at, ends_at",
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
        variant: (r.variant === "image" ? "image" : "banded") as BannerVariant,
        badge: r.badge,
        heading: r.heading,
        copy: r.copy,
        ctaLabel: r.cta_label,
        imageUrl: r.image_url,
        linkUrl: r.link_url,
        sortOrder: r.sort_order ?? 0,
      }));
  },
);
