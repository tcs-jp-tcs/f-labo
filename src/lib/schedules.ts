import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type {
  BroadcastSession,
  ScheduleItem,
  ScheduleResult,
  ScheduleSession,
  Series,
  WeekendBroadcast,
} from "@/lib/data";

/**
 * Supabase schedules テーブルからレーススケジュールを取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * news.ts / reviews.ts と同じパターン。
 *
 * テーブルカラム: id, series, round, round_label, country, flag, name, date,
 *                 weekend_type, status, is_weekend, broadcast, networks(jsonb),
 *                 sessions(jsonb), result(jsonb), created_at, updated_at
 *
 * is_weekend: トップ「今週のレース予定」/ スケジュール「今週末の放送予定」に出す今週末フラグ。
 *             旧 weekend_broadcasts テーブルを廃止し、schedules 一本で管理する単一ソース。
 */

const SERIES_KEYS: Series[] = ["F1", "F2", "F3", "SF", "INDY"];

/** トップ/スケジュールの今週末カードの並び順（優先度順） */
const SERIES_PRIORITY: Series[] = ["F1", "F2", "F3", "SF", "INDY"];

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
  is_weekend: boolean | null;
  broadcast: string;
  networks: string[] | null;
  sessions: ScheduleSession[] | null;
  result: ScheduleResult | null;
};

const SELECT_COLUMNS =
  "series, round, round_label, country, flag, name, date, weekend_type, status, is_weekend, broadcast, networks, sessions, result";

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
    isWeekend: row.is_weekend ?? false,
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

/**
 * 今週末（is_weekend=true）のレースを優先度順（F1→F2→F3→SF→INDY）で抽出する。
 * トップ「今週のレース予定」とスケジュール「今週末の放送予定」の単一ソース。
 * 今週末セットを切り替えるときは schedules の is_weekend を立て替えるだけでよい。
 */
export function selectWeekendItems(
  schedules: Record<Series, ScheduleItem[]>,
): ScheduleItem[] {
  return SERIES_PRIORITY.flatMap((s) =>
    schedules[s].filter((r) => r.isWeekend),
  );
}

/**
 * ScheduleItem → 放送統合表（BroadcastTable）用の WeekendBroadcast に変換する。
 * 旧 weekend_broadcasts テーブルの代わりに、schedules.sessions（放送局→開始時刻を保持）
 * から放送局列と ○ 表示を導出する。weekendBroadcastToScheduleItem の逆変換にあたる。
 */
export function scheduleItemToWeekendBroadcast(
  item: ScheduleItem,
): WeekendBroadcast {
  const sessions = item.sessions ?? [];
  // 放送局列：各セッションの broadcasts キーを初出順で集約（networks をフォールバック）
  const channels: string[] = [];
  for (const s of sessions) {
    for (const ch of Object.keys(s.broadcasts ?? {})) {
      if (!channels.includes(ch)) channels.push(ch);
    }
  }
  if (channels.length === 0 && item.networks) channels.push(...item.networks);

  const broadcastSessions: BroadcastSession[] = sessions.map((s) => ({
    session: s.name,
    date: s.jpDate,
    localTime: s.localTime || undefined,
    jst: s.jpTime,
    channels: Object.fromEntries(
      channels.map((ch) => [ch, Boolean(s.broadcasts?.[ch])]),
    ),
  }));

  return {
    series: item.series,
    round: item.round,
    flag: item.flag,
    gpName: item.name,
    weekendType: item.weekendType,
    channels,
    sessions: broadcastSessions,
  };
}
