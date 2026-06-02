import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { BroadcastSession, Series, WeekendBroadcast } from "@/lib/data";

/**
 * Supabase weekend_broadcasts テーブルから今週末の放送予定を取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * news.ts / reviews.ts と同じパターン。
 *
 * テーブルカラム: id, series, round, flag, gp_name, weekend_type, channels(jsonb),
 *                 sessions(jsonb), note, display_order, created_at, updated_at
 */

/** DB の weekend_broadcasts 行（読み取りに使うカラムのみ） */
type WeekendBroadcastRow = {
  series: string;
  round: number;
  flag: string;
  gp_name: string;
  weekend_type: string;
  channels: string[];
  sessions: BroadcastSession[];
  note: string | null;
};

const SELECT_COLUMNS =
  "series, round, flag, gp_name, weekend_type, channels, sessions, note, display_order";

/** DB 行 → WeekendBroadcast 型に変換 */
function toWeekendBroadcast(row: WeekendBroadcastRow): WeekendBroadcast {
  return {
    series: row.series as Series,
    round: row.round,
    flag: row.flag,
    gpName: row.gp_name,
    weekendType: row.weekend_type as WeekendBroadcast["weekendType"],
    channels: row.channels ?? [],
    sessions: row.sessions ?? [],
    note: row.note ?? undefined,
  };
}

/** 今週末の放送予定を取得（display_order 昇順） */
export const getThisWeekendBroadcasts = cache(
  async (): Promise<WeekendBroadcast[]> => {
    const { data, error } = await supabase
      .from("weekend_broadcasts")
      .select(SELECT_COLUMNS)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[broadcasts] fetch failed:", error.message);
      return [];
    }
    return (data ?? []).map((row) =>
      toWeekendBroadcast(row as WeekendBroadcastRow),
    );
  },
);
