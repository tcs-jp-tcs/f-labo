import { cache } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Supabase site_settings テーブル（key/value）を取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 *
 * テーブルカラム: key(TEXT,PK), value, description, updated_at
 * 例: amazon_keyword / amazon_headline / amazon_subtext / amazon_tag
 */

type SettingRow = { key: string; value: string | null };

/** key→value の Record で全設定を取得。error 時は空 */
export const getSiteSettings = cache(
  async (): Promise<Record<string, string>> => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) {
      console.error("[settings] fetch failed:", error.message);
      return {};
    }
    const map: Record<string, string> = {};
    for (const row of (data ?? []) as SettingRow[]) {
      if (row.key) map[row.key] = row.value ?? "";
    }
    return map;
  },
);
