import { cache } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Supabase polls / votes テーブルのデータアクセス層。
 * - polls: 質問文＋選択肢（options jsonb 配列）＋ is_active
 * - votes: 1投票=1行（poll_id, option_value）。制限なし・何回でも投票可
 *
 * 一覧取得は Server Component から await（reviews.ts と同じパターン）。
 * 投票登録・集計は VoteClient（クライアント）から下記ヘルパーを呼ぶ。
 */

export type Poll = {
  id: string;
  question: string;
  options: string[];
};

/** 選択肢テキスト → 投票数 */
export type VoteCounts = Record<string, number>;

type PollRow = {
  id: string;
  question: string;
  options: unknown;
};

/** jsonb の options を文字列配列へ正規化（不正値は除外） */
function normalizeOptions(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((o): o is string => typeof o === "string");
}

/** is_active=true の質問を作成日時の新しい順で全件取得 */
export const getActivePolls = cache(async (): Promise<Poll[]> => {
  const { data, error } = await supabase
    .from("polls")
    .select("id, question, options")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[polls] fetch failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => {
    const r = row as PollRow;
    return {
      id: r.id,
      question: r.question,
      options: normalizeOptions(r.options),
    };
  });
});

/** 指定 poll の投票数を選択肢ごとに集計（クライアント用） */
export async function fetchVoteCounts(pollId: string): Promise<VoteCounts> {
  const { data, error } = await supabase
    .from("votes")
    .select("option_value")
    .eq("poll_id", pollId);

  if (error) {
    console.error("[polls] fetchVoteCounts failed:", error.message);
    return {};
  }
  const counts: VoteCounts = {};
  for (const row of data ?? []) {
    const v = (row as { option_value: string }).option_value;
    counts[v] = (counts[v] ?? 0) + 1;
  }
  return counts;
}

/** 投票を1件登録（クライアント用）。成功なら true */
export async function castVote(
  pollId: string,
  optionValue: string,
): Promise<boolean> {
  const { error } = await supabase
    .from("votes")
    .insert({ poll_id: pollId, option_value: optionValue });

  if (error) {
    console.error("[polls] castVote failed:", error.message);
    return false;
  }
  return true;
}
