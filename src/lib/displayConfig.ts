import type { Series } from "@/lib/data";

/**
 * カテゴリ（シリーズ）表示制御の単一ソース。
 *
 * 結果（/results）・スケジュール（/schedule）・順位表（/standings）・放送予定の
 * フロント表示を、ここで定義したシリーズだけに絞る。DBのデータは消さず表示のみ制御する。
 *
 * 全カテゴリに戻すときは VISIBLE_SERIES を ALL_SERIES に差し替えるだけでよい。
 *   例) export const VISIBLE_SERIES: readonly Series[] = ALL_SERIES;
 *
 * ※ニュースはこの制御の対象外（全カテゴリ維持）。
 */
export const ALL_SERIES = ["F1", "F2", "F3", "SF", "INDY"] as const;

/** 現在表示するシリーズ（F1のみ）。全カテに戻すなら ALL_SERIES を入れる。 */
export const VISIBLE_SERIES: readonly Series[] = ["F1"];

/** そのシリーズを表示してよいか */
export function isSeriesVisible(series: Series): boolean {
  return VISIBLE_SERIES.includes(series);
}

/** 表示対象シリーズのタブだけに絞る（タブ並びは元の順序を維持） */
export function visibleTabs<T extends Series>(tabs: readonly T[]): T[] {
  return tabs.filter((t) => isSeriesVisible(t));
}

/** series プロパティを持つ配列を表示対象シリーズだけに絞る */
export function filterVisibleSeries<T extends { series: Series }>(items: T[]): T[] {
  return items.filter((i) => isSeriesVisible(i.series));
}
