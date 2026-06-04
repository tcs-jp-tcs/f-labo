import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type {
  BroadcastSession,
  ScheduleItem,
  ScheduleSession,
  Series,
  WeekendBroadcast,
} from "@/lib/data";

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

/** セッション名からセッション種別（バッジ色）を推定 */
const SESSION_TYPE_RULES: Array<[RegExp, NonNullable<ScheduleSession["type"]>]> = [
  [/決勝|レース|race|フィーチャー|feature/i, "race"],
  [/スプリント|sprint/i, "sprint"],
  [/予選|ポール|quali/i, "quali"],
];

function inferSessionType(name: string): ScheduleSession["type"] {
  for (const [re, type] of SESSION_TYPE_RULES) {
    if (re.test(name)) return type;
  }
  return "practice";
}

/**
 * weekend_broadcasts 行を ScheduleList 用の ScheduleItem に変換する。
 * schedules テーブルに該当ラウンドの詳細が無いシリーズ（例: INDY の今週末ラウンド）を、
 * トップの「今週のレース予定」展開カードで表示するためのフォールバック。
 * 放送局列は ✓ 表示（番組開始時刻は weekend_broadcasts に保持していないため）。
 */
export function weekendBroadcastToScheduleItem(w: WeekendBroadcast): ScheduleItem {
  const sessions: ScheduleSession[] = w.sessions.map((s) => ({
    name: s.session,
    type: inferSessionType(s.session),
    jpDate: s.date,
    jpTime: s.jst,
    localDate: s.date,
    localTime: s.localTime ?? "",
    broadcasts: Object.fromEntries(
      w.channels.filter((c) => s.channels?.[c]).map((c) => [c, "✓"]),
    ),
  }));
  const dates = w.sessions.map((s) => s.date).filter(Boolean);
  const date =
    dates.length === 0
      ? ""
      : dates[0] === dates[dates.length - 1]
        ? dates[0]
        : `${dates[0]}〜${dates[dates.length - 1]}`;
  return {
    series: w.series,
    round: w.round,
    roundLabel: `ROUND ${w.round}`,
    country: w.gpName,
    flag: w.flag,
    name: w.gpName,
    date,
    weekendType: w.weekendType,
    status: "next",
    broadcast: w.channels.join(" / "),
    networks: w.channels,
    sessions,
  };
}
