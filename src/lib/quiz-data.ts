// 検定データ本体（quizzes 配列）は Supabase quizzes テーブルへ移行しました。
// 取得は lib/quizzes.ts の getQuizzes() / getQuiz(id) を使用してください。
// このファイルには「型定義」と「表示ロジック（配色・ラベル・ランク判定）」だけを残します。

export type QuizCategory = "f1" | "f2" | "f3" | "sf" | "indy";

export type Question = {
  id: string;
  category: QuizCategory;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  rd: number;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  questions: Question[];
};

export const categoryLabel: Record<QuizCategory, string> = {
  f1: "F1",
  f2: "F2",
  f3: "F3",
  sf: "SF",
  indy: "INDY",
};

export const categoryBadge: Record<QuizCategory, string> = {
  f1: "bg-flabo-red/15 text-flabo-red",
  f2: "bg-flabo-blue/15 text-flabo-blue",
  f3: "bg-flabo-green/15 text-flabo-green",
  sf: "bg-flabo-yellow/15 text-flabo-yellow",
  indy: "bg-flabo-yellow/15 text-flabo-yellow",
};

export type RankTone =
  | "winner"
  | "podium"
  | "prize"
  | "finished"
  | "rookie"
  | "fail";

export type Rank = {
  emoji: string;
  title: string;
  message: string;
  tone: RankTone;
};

export function getRank(correct: number, total: number): Rank {
  // Vol.1 is fixed at 5 questions; map scores directly.
  if (correct >= 5)
    return {
      emoji: "🏆",
      title: "Winner",
      message: "優勝おめでとう！",
      tone: "winner",
    };
  if (correct === 4)
    return {
      emoji: "🥈",
      title: "表彰台",
      message: "次は頂点を目指せ！",
      tone: "podium",
    };
  if (correct === 3)
    return {
      emoji: "🎖️",
      title: "入賞",
      message: "表彰台まであと一歩！",
      tone: "prize",
    };
  if (correct === 2)
    return {
      emoji: "🏁",
      title: "完走",
      message: "次は入賞を狙え！",
      tone: "finished",
    };
  if (correct === 1)
    return {
      emoji: "🏁",
      title: "ルーキー",
      message: "まずは完走を目指そう！",
      tone: "rookie",
    };
  return {
    emoji: "⚡",
    title: "デプロイ不足",
    message: "チャージして再挑戦！",
    tone: "fail",
  };
}
