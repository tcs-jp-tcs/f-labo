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
import { isSeriesVisible } from "@/lib/displayConfig";

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
  city: string | null;
  tz: string | null;
  date: string;
  weekend_type: string;
  status: string | null;
  is_weekend: boolean | null;
  broadcast: string;
  networks: string[] | null;
  sessions: ScheduleSession[] | null;
  result: ScheduleResult | null;
  circuit_slug: string | null;
};

const SELECT_COLUMNS =
  "series, round, round_label, country, flag, name, city, tz, date, weekend_type, status, is_weekend, broadcast, networks, sessions, result, circuit_slug";

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
    city: row.city ?? undefined,
    tz: row.tz ?? undefined,
    date: row.date,
    weekendType: row.weekend_type as ScheduleItem["weekendType"],
    status: (row.status as ScheduleItem["status"]) ?? undefined,
    isWeekend: row.is_weekend ?? false,
    broadcast: row.broadcast,
    networks: row.networks ?? undefined,
    sessions: row.sessions ?? undefined,
    result: row.result ?? undefined,
    circuitSlug: row.circuit_slug ?? undefined,
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
  // カテゴリ表示制御（displayConfig）に従い、表示対象シリーズのみ抽出する。
  return SERIES_PRIORITY.filter(isSeriesVisible).flatMap((s) =>
    schedules[s].filter((r) => r.isWeekend),
  );
}

/**
 * 決勝（=最終セッション）開始からこの時間が過ぎたら「レース終了」とみなす。
 * 終了判定の余裕。決勝開催中はまだ「次のレース」として掴み続けるための緩衝。
 */
const RACE_FINISH_BUFFER_MS = 4 * 60 * 60 * 1000; // 4時間

/**
 * そのレース週末の「終了時刻の目安」を返す（決勝開始 startUtc + 緩衝）。
 * startUtc を持つセッションが無い行（過去の旧データ等）は null。
 */
function raceFinishEstimate(item: ScheduleItem): number | null {
  const sessions = item.sessions ?? [];
  for (let i = sessions.length - 1; i >= 0; i--) {
    const u = sessions[i]?.startUtc;
    if (u) {
      const t = new Date(u).getTime();
      if (!Number.isNaN(t)) return t + RACE_FINISH_BUFFER_MS;
    }
  }
  return null;
}

/**
 * 現在日時を基準に「次に開催される（まだ終わっていない）レース」を1件返す。
 * 表示対象シリーズ（displayConfig・現状F1のみ）の中から、決勝終了見込みが
 * 現在以降のレースを最も早い順で選ぶ。終了したレースは掴まない。
 * is_weekend / status の手動フラグには依存しない（日時から自動判定）。
 */
export function selectNextRace(
  schedules: Record<Series, ScheduleItem[]>,
): ScheduleItem | null {
  const now = Date.now();
  const upcoming = SERIES_PRIORITY.filter(isSeriesVisible)
    .flatMap((s) => schedules[s])
    .map((item) => ({ item, finish: raceFinishEstimate(item) }))
    .filter(
      (x): x is { item: ScheduleItem; finish: number } =>
        x.finish !== null && x.finish >= now,
    )
    .sort((a, b) => a.finish - b.finish);
  return upcoming[0]?.item ?? null;
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
