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
 * ※ニュースは VISIBLE_SERIES ではなく HIDDEN_NEWS_CATEGORIES で別に制御する。
 */
export const ALL_SERIES = ["F1", "F2", "F3", "SF", "INDY"] as const;

/** 現在表示するシリーズ（F1のみ）。全カテに戻すなら ALL_SERIES を入れる。 */
export const VISIBLE_SERIES: readonly Series[] = ["F1"];

/**
 * ニュース（一覧・記事ページ）で表示しないカテゴリ。DBの記事は消さず表示のみ止める。
 * 戻すときは空配列にし、NewsList / NewsArchive の TABS に "INDY" を戻す。
 */
export const HIDDEN_NEWS_CATEGORIES: readonly string[] = ["INDY"];

/** そのニュースカテゴリを表示してよいか */
export function isNewsCategoryVisible(category: string): boolean {
  return !HIDDEN_NEWS_CATEGORIES.includes(category);
}

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
