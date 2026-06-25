import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import VoteClient from "../VoteClient";
import { getArchivedPolls } from "@/lib/polls";

// 投票はSupabaseの最新状態を常に反映（静的化させない）
export const revalidate = 0;

export default async function VoteArchivePage() {
  const polls = await getArchivedPolls();

  return (
    <Section>
      <SectionHeader
        title="投票アーカイブ"
        seeAllHref="/vote"
        seeAllLabel="最新の投票へ →"
      />
      <p className="text-flabo-grey text-sm mb-6">
        過去の投票（最新9件より前の質問）。タップして結果を見られます。
      </p>
      <VoteClient
        polls={polls}
        emptyText="アーカイブされた投票はまだありません。"
      />
    </Section>
  );
}
