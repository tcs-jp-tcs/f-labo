import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { Series, StandingRow } from "@/lib/data";

/**
 * Supabase standings テーブルからチャンピオンシップ順位を取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * news.ts / reviews.ts と同じパターン。
 *
 * テーブルカラム: id, series, standing_type, as_of, rows(jsonb), created_at, updated_at
 * 1 series につき standing_type="driver" / "constructor" の最大2行。
 */

type StandingsEntry = { drivers: StandingRow[]; teams: StandingRow[]; note?: string };

const SERIES_KEYS: Series[] = ["F1", "F2", "F3", "SF", "INDY"];

/** DB の standings 行（読み取りに使うカラムのみ） */
type StandingsRowRecord = {
  series: string;
  standing_type: string;
  as_of: string | null;
  rows: StandingRow[] | null;
};

const SELECT_COLUMNS = "series, standing_type, as_of, rows";

/** 全 Series キーを drivers/teams 空配列で埋めた Record を生成 */
function emptyRecord(): Record<Series, StandingsEntry> {
  return {
    F1: { drivers: [], teams: [] },
    F2: { drivers: [], teams: [] },
    F3: { drivers: [], teams: [] },
    SF: { drivers: [], teams: [] },
    INDY: { drivers: [], teams: [] },
  };
}

/** standings を series ごとにまとめた Record で取得 */
export const getStandings = cache(
  async (): Promise<Record<Series, StandingsEntry>> => {
    const { data, error } = await supabase
      .from("standings")
      .select(SELECT_COLUMNS);

    if (error) {
      console.error("[standings] fetch failed:", error.message);
      return emptyRecord();
    }

    const grouped = emptyRecord();
    for (const raw of data ?? []) {
      const row = raw as StandingsRowRecord;
      const series = row.series as Series;
      if (!SERIES_KEYS.includes(series)) continue;
      const rows = row.rows ?? [];
      if (row.standing_type === "driver") {
        grouped[series].drivers = rows;
      } else if (row.standing_type === "constructor") {
        grouped[series].teams = rows;
      }
      if (row.as_of) grouped[series].note = row.as_of;
    }
    return grouped;
  },
);
