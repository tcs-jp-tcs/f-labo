import PollCard from "@/components/PollCard";
import type { Poll } from "@/lib/polls";

/** 投票カードのグリッド表示（メイン／アーカイブ共通） */
export default function VoteClient({
  polls,
  emptyText = "現在受付中の投票はありません。",
}: {
  polls: Poll[];
  emptyText?: string;
}) {
  if (polls.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-flabo-carbon p-8 text-center">
        <p className="text-flabo-grey text-sm">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 items-start">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
}
