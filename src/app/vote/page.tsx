import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import VoteClient from "./VoteClient";
import { getActivePolls } from "@/lib/polls";

// 投票結果は常に最新のSupabaseの状態を反映（静的化させない）
export const revalidate = 0;

export default async function VotePage() {
  const polls = await getActivePolls();

  return (
    <Section className="max-w-[760px]">
      <SectionHeader title="ファン投票" />
      <p className="text-flabo-grey text-sm mb-6">
        気になる質問に投票しよう。タップするとすぐにみんなの結果が見られます。
      </p>
      <VoteClient polls={polls} />
    </Section>
  );
}
