import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { Quiz, Question } from "@/lib/quiz-data";

/**
 * Supabase quizzes テーブルから検定データを取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * news.ts / reviews.ts / schedules.ts と同じパターン。
 *
 * テーブルカラム: id(TEXT,PK), rd(int), title, description, difficulty(int),
 *                 questions(jsonb), is_active(bool), created_at, updated_at
 */

type QuizRow = {
  id: string;
  rd: number;
  title: string;
  description: string;
  difficulty: number;
  questions: Question[] | null;
};

const SELECT_COLUMNS = "id, rd, title, description, difficulty, questions";

/** DB 行 → Quiz 型に変換 */
function toQuiz(row: QuizRow): Quiz {
  return {
    id: row.id,
    rd: row.rd,
    title: row.title,
    description: row.description,
    difficulty: row.difficulty as Quiz["difficulty"],
    questions: row.questions ?? [],
  };
}

/** is_active な検定を rd 昇順で取得（一覧用） */
export const getQuizzes = cache(async (): Promise<Quiz[]> => {
  const { data, error } = await supabase
    .from("quizzes")
    .select(SELECT_COLUMNS)
    .eq("is_active", true)
    .order("rd", { ascending: true });

  if (error) {
    console.error("[quizzes] fetch failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => toQuiz(row as QuizRow));
});

/** id 指定で 1 検定を取得（個別ページ用）。無ければ undefined */
export const getQuiz = cache(
  async (id: string): Promise<Quiz | undefined> => {
    const { data, error } = await supabase
      .from("quizzes")
      .select(SELECT_COLUMNS)
      .eq("id", id)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.error("[quizzes] fetch failed:", error.message);
      return undefined;
    }
    return data ? toQuiz(data as QuizRow) : undefined;
  },
);
