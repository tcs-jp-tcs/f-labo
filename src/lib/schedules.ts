import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type {
  ScheduleItem,
  ScheduleResult,
  ScheduleSession,
  Series,
} from "@/lib/data";

/**
 * Supabase schedules テーブルからレーススケジュールを取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * news.ts / reviews.ts と同じパターン。
 *
 * テーブルカラム: id, series, round, round_label, country, flag, name, date,
 *                 weekend_type, status, broadcast, networks(jsonb), sessions(jsonb),
 *                 result(jsonb), created_at, updated_at
 */

const SERIES_KEYS: Series[] = ["F1", "F2", "F3", "SF", "INDY"];

/** DB の schedules 行（読み取りに使うカラムのみ） */
type ScheduleRow = {
  series: string;
  round: number;
  round_label: string | null;
  country: string;
  flag: string;
  name: string;
  date: string;
  weekend_type: string;
  status: string | null;
  broadcast: string;
  networks: string[] | null;
  sessions: ScheduleSession[] | null;
  result: ScheduleResult | null;
};

const SELECT_COLUMNS =
  "series, round, round_label, country, flag, name, date, weekend_type, status, broadcast, networks, sessions, result";

/** 全 Series キーを空配列で埋めた Record を生成 */
function emptyRecord(): Record<Series, ScheduleItem[]> {
  return { F1: [], F2: [], F3: [], SF: [], INDY: [] };
}

/** DB 行 → ScheduleItem 型に変換 */
function toScheduleItem(row: ScheduleRow): ScheduleItem {
  return {
    series: row.series as Series,
    round: row.round,
    roundLabel: row.round_label ?? undefined,
    country: row.country,
    flag: row.flag,
    name: row.name,
    date: row.date,
    weekendType: row.weekend_type as ScheduleItem["weekendType"],
    status: (row.status as ScheduleItem["status"]) ?? undefined,
    broadcast: row.broadcast,
    networks: row.networks ?? undefined,
    sessions: row.sessions ?? undefined,
    result: row.result ?? undefined,
  };
}

/** schedules を series ごとにまとめた Record で取得（series, round 昇順） */
export const getSchedules = cache(
  async (): Promise<Record<Series, ScheduleItem[]>> => {
    const { data, error } = await supabase
      .from("schedules")
      .select(SELECT_COLUMNS)
      .order("series", { ascending: true })
      .order("round", { ascending: true });

    if (error) {
      console.error("[schedules] fetch failed:", error.message);
      return emptyRecord();
    }

    const grouped = emptyRecord();
    for (const row of data ?? []) {
      const item = toScheduleItem(row as ScheduleRow);
      if (SERIES_KEYS.includes(item.series)) {
        grouped[item.series].push(item);
      }
    }
    return grouped;
  },
);
