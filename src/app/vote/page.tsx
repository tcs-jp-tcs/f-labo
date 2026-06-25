import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import VoteClient from "./VoteClient";
import { getActivePolls } from "@/lib/polls";

// 投票結果は常に最新のSupabaseの状態を反映（静的化させない）
export const revalidate = 0;

export default async function VotePage() {
  const polls = await getActivePolls();

  return (
    <Section>
      <SectionHeader
        title="ファン投票"
        seeAllHref="/vote/archive"
        seeAllLabel="アーカイブを見る →"
      />
      <p className="text-flabo-grey text-sm mb-6">
        気になる質問のカードをタップして投票しよう。投票するとみんなの結果が見られます。
      </p>
      <VoteClient polls={polls} />
    </Section>
  );
}
