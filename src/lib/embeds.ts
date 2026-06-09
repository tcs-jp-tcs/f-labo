import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { Embed, EmbedPlatform } from "@/lib/data";

/**
 * Supabase embeds テーブルから動画埋め込みを取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * news.ts / reviews.ts / schedules.ts と同じパターン。
 *
 * テーブルカラム: id, platform('tiktok'|'instagram'), url, active, display_order, created_at
 *
 * 運用: embeds を UPDATE するだけで TikTok⇄Instagram の切替・動画差し替えが可能
 *       （active=true の行を display_order 順に表示）。コード変更は不要。
 */

type EmbedRow = {
  id: number;
  platform: string;
  url: string;
  active: boolean | null;
  display_order: number | null;
};

/** active=true の埋め込みを display_order 昇順で取得。error 時は空配列 */
export const getActiveEmbeds = cache(async (): Promise<Embed[]> => {
  const { data, error } = await supabase
    .from("embeds")
    .select("id, platform, url, active, display_order")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[embeds] fetch failed:", error.message);
    return [];
  }

  return (data ?? [])
    .map((row) => {
      const r = row as EmbedRow;
      return {
        id: r.id,
        platform: r.platform as EmbedPlatform,
        url: r.url,
        active: r.active ?? false,
        displayOrder: r.display_order ?? 0,
      };
    })
    .filter((e) => e.platform === "tiktok" || e.platform === "instagram");
});
