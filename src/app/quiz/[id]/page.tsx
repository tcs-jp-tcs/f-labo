import { notFound } from "next/navigation";
import { getQuiz } from "@/lib/quizzes";
import QuizRunner from "./QuizRunner";

// 検定データを Supabase の最新状態で反映（静的化させない）
export const revalidate = 0;

export default async function QuizRunnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = await getQuiz(id);

  if (!quiz) notFound();

  return <QuizRunner quiz={quiz} />;
}
