import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { PodiumRow, RaceResult, Series } from "@/lib/data";

/**
 * Supabase race_results テーブルから直近のレース結果を取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * news.ts / reviews.ts と同じパターン。
 *
 * テーブルカラム: id, series, round, flag, gp_name, date, race_type, status,
 *                 podium(jsonb), note, source_url, display_order, created_at, updated_at
 */

/** DB の race_results 行（読み取りに使うカラムのみ） */
type RaceResultRow = {
  series: string;
  round: number;
  flag: string;
  gp_name: string;
  date: string;
  race_type: string | null;
  status: string | null;
  podium: PodiumRow[] | null;
  note: string | null;
  source_url: string | null;
};

const SELECT_COLUMNS =
  "series, round, flag, gp_name, date, race_type, status, podium, note, source_url, display_order";

/** DB 行 → RaceResult 型に変換 */
function toRaceResult(row: RaceResultRow): RaceResult {
  return {
    series: row.series as Series,
    round: row.round,
    flag: row.flag,
    gpName: row.gp_name,
    date: row.date,
    raceType: (row.race_type as RaceResult["raceType"]) ?? undefined,
    status: (row.status as RaceResult["status"]) ?? undefined,
    podium: row.podium ?? [],
    note: row.note ?? undefined,
    sourceUrl: row.source_url ?? undefined,
  };
}

/** 直近のレース結果を取得（display_order 昇順） */
export const getRecentResults = cache(async (): Promise<RaceResult[]> => {
  const { data, error } = await supabase
    .from("race_results")
    .select(SELECT_COLUMNS)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[results] fetch failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => toRaceResult(row as RaceResultRow));
});
