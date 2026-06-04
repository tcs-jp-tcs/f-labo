import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import QuizCard from "@/components/QuizCard";
import { getQuizzes } from "@/lib/quizzes";

export const metadata = {
  title: "Fラボ検定 〜F1トリビアに挑戦〜 | フォーミュラ研究所",
  description:
    "F1・F2・F3・スーパーフォーミュラ・インディカーのトリビアに挑戦できるFラボ検定。全問正解でFラボマスター認定！",
};

// 検定データを Supabase の最新状態で反映（静的化させない）
export const revalidate = 0;

export default async function QuizListPage() {
  const quizzes = await getQuizzes();
  return (
    <Section>
      <SectionHeader title="Fラボ検定 〜F1トリビアに挑戦〜" />
      <p className="text-flabo-grey text-sm mb-6 leading-relaxed">
        モータースポーツの知識を腕試し。歴史・記録・伝説のエピソードまで、Fラボ独自のラインナップで出題します。全問正解すると「Fラボマスター」に認定！
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {quizzes.map((q) => (
          <QuizCard key={q.id} item={q} />
        ))}
      </div>
    </Section>
  );
}
