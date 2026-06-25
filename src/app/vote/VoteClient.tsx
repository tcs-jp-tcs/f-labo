"use client";

import { useEffect, useState } from "react";
import {
  castVote,
  fetchVoteCounts,
  type Poll,
  type VoteCounts,
} from "@/lib/polls";

/** localStorage に投票済み選択肢を保存するキー */
const storageKey = (pollId: string) => `flabo_vote_${pollId}`;

function readStoredChoice(pollId: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(storageKey(pollId));
  } catch {
    return null;
  }
}

function writeStoredChoice(pollId: string, option: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(pollId), option);
  } catch {
    /* localStorage 不可環境（プライベートブラウズ等）は無視 */
  }
}

export default function VoteClient({ polls }: { polls: Poll[] }) {
  if (polls.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-flabo-carbon p-8 text-center">
        <p className="text-flabo-grey text-sm">
          現在受付中の投票はありません。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
}

type Phase = "vote" | "result";

function PollCard({ poll }: { poll: Poll }) {
  const [phase, setPhase] = useState<Phase>("vote");
  const [counts, setCounts] = useState<VoteCounts>({});
  const [myChoice, setMyChoice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  // マウント時: 過去に投票済みなら結果表示を復元（Cookie/localStorage 記憶）
  useEffect(() => {
    const stored = readStoredChoice(poll.id);
    if (!stored) return;
    setMyChoice(stored);
    setPhase("result");
    fetchVoteCounts(poll.id).then(setCounts);
  }, [poll.id]);

  async function handleVote(option: string) {
    if (busy) return;
    setBusy(true);
    setMyChoice(option);
    const ok = await castVote(poll.id, option);
    if (!ok) {
      // 失敗時は投票画面のまま戻す
      setMyChoice(null);
      setBusy(false);
      return;
    }
    writeStoredChoice(poll.id, option);
    const fresh = await fetchVoteCounts(poll.id);
    setCounts(fresh);
    setPhase("result");
    setBusy(false);
  }

  function handleRevote() {
    setPhase("vote");
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-flabo-carbon p-5 md:p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base md:text-lg font-bold leading-relaxed flex-1">
          {poll.question}
        </h2>
        {phase === "result" && (
          <span className="font-display tracking-[0.18em] text-[0.65rem] text-flabo-grey shrink-0 pt-1">
            {total}票
          </span>
        )}
      </div>

      {/* 選択肢は縦リスト。22人想定でスクロール対応（高さ上限＋縦スクロール） */}
      <div className="flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
        {poll.options.map((option) => {
          if (phase === "vote") {
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleVote(option)}
                disabled={busy}
                className={`text-left rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed transition-all duration-200 ${
                  busy
                    ? "opacity-60 cursor-default"
                    : "hover:border-flabo-red/60 hover:bg-white/[0.06] cursor-pointer"
                }`}
              >
                {option}
              </button>
            );
          }

          // result: IGアンケート風バーグラフ
          const count = counts[option] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const isMine = option === myChoice;
          return (
            <div
              key={option}
              className={`relative overflow-hidden rounded-xl border px-4 py-3 ${
                isMine ? "border-flabo-red/70" : "border-white/10"
              }`}
            >
              {/* バー（投票率の幅） */}
              <div
                className={`absolute inset-y-0 left-0 transition-[width] duration-700 ease-out ${
                  isMine ? "bg-flabo-red/25" : "bg-white/[0.07]"
                }`}
                style={{ width: `${pct}%` }}
                aria-hidden
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className="text-sm leading-relaxed flex items-center gap-2">
                  {option}
                  {isMine && <span className="text-flabo-red text-xs">✓</span>}
                </span>
                <span className="font-display tracking-[0.1em] text-xs text-white/80 shrink-0">
                  {pct}%
                  <span className="text-flabo-grey ml-1.5">({count})</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {phase === "result" && (
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-[0.65rem] text-flabo-grey">
            タップで再投票できます
          </span>
          <button
            type="button"
            onClick={handleRevote}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 text-flabo-grey font-display tracking-[0.18em] text-[0.65rem] hover:border-flabo-red hover:text-flabo-red transition-colors"
          >
            ↺ もう一度投票
          </button>
        </div>
      )}
    </div>
  );
}
