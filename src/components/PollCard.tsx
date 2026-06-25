"use client";

import { useEffect, useState } from "react";
import CardHeader from "@/components/CardHeader";
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

type Phase = "vote" | "result";

/**
 * ニュースカードと同じ見た目の投票カード。
 * 折りたたみ時は質問のみ → タップで展開して選択肢を表示。
 * 投票すると IGアンケート風バーグラフで結果表示（localStorage で投票済みを記憶し、
 * 再訪時も展開すると結果が見える）。制限なし・何回でも投票可。
 */
export default function PollCard({ poll }: { poll: Poll }) {
  const [expanded, setExpanded] = useState(false);
  const [phase, setPhase] = useState<Phase>("vote");
  const [counts, setCounts] = useState<VoteCounts>({});
  const [myChoice, setMyChoice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const hasVoted = phase === "result";

  // マウント時: 過去に投票済みなら結果フェーズを復元
  useEffect(() => {
    const stored = readStoredChoice(poll.id);
    if (!stored) return;
    setMyChoice(stored);
    setPhase("result");
  }, [poll.id]);

  async function loadCounts() {
    const fresh = await fetchVoteCounts(poll.id);
    setCounts(fresh);
  }

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    // 展開時・投票済みなら最新の結果を取得
    if (next && phase === "result") loadCounts();
  }

  async function handleVote(option: string) {
    if (busy) return;
    setBusy(true);
    setMyChoice(option);
    const ok = await castVote(poll.id, option);
    if (!ok) {
      setMyChoice(null);
      setBusy(false);
      return;
    }
    writeStoredChoice(poll.id, option);
    await loadCounts();
    setPhase("result");
    setBusy(false);
  }

  function handleRevote() {
    setPhase("vote");
  }

  return (
    <div className="group flex flex-col rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden transition-all duration-300 hover:border-flabo-red/60">
      <CardHeader label="投票" />

      {/* 折りたたみトグル（質問＋ヒント） */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className="text-left p-5 flex flex-col gap-2.5 hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="font-bold text-[0.95rem] leading-relaxed group-hover:text-flabo-red transition-colors">
          {poll.question}
        </h3>
        <div className="flex items-center justify-between gap-3">
          <span className="font-display tracking-[0.18em] text-[0.7rem] text-flabo-grey uppercase">
            {hasVoted ? "投票済み" : `${poll.options.length}つの選択肢`}
          </span>
          <span className="font-display tracking-[0.18em] text-[0.7rem] text-flabo-red flex items-center gap-1.5">
            {hasVoted ? "結果を見る" : "投票する"}
            <span
              className={`transition-transform duration-200 ${
                expanded ? "rotate-90" : ""
              }`}
              aria-hidden
            >
              ▶
            </span>
          </span>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-0 space-y-3">
          {phase === "result" && (
            <div className="flex justify-end">
              <span className="font-display tracking-[0.12em] text-sm text-flabo-grey">
                合計 {total}票
              </span>
            </div>
          )}

          {/* 選択肢は縦リスト。22人想定でスクロール対応 */}
          <div className="flex flex-col gap-2.5 max-h-[55vh] overflow-y-auto pr-1">
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
                  className={`relative overflow-hidden rounded-xl border px-4 py-3 min-h-[60px] flex items-center ${
                    isMine ? "border-flabo-red/70" : "border-white/10"
                  }`}
                >
                  <div
                    className={`absolute inset-y-0 left-0 transition-[width] duration-700 ease-out ${
                      isMine ? "bg-flabo-red/25" : "bg-white/[0.07]"
                    }`}
                    style={{ width: `${pct}%` }}
                    aria-hidden
                  />
                  <div className="relative flex items-center justify-between gap-2.5 w-full">
                    {/* 名前＋チーム名は折り返して2行で表示（min-h-[60px]で確実に収まる） */}
                    <span className="flex-1 min-w-0 text-sm font-medium leading-snug break-words">
                      {option}
                    </span>
                    {isMine && (
                      <span className="text-flabo-red text-sm shrink-0">✓</span>
                    )}
                    <span className="font-display tracking-[0.05em] text-base font-bold text-white shrink-0 flex items-baseline gap-1">
                      {pct}%
                      <span className="text-flabo-grey text-xs font-normal">
                        ({count})
                      </span>
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
      )}
    </div>
  );
}
