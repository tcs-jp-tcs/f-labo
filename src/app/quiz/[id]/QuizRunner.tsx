"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Section from "@/components/Section";
import Confetti from "@/components/Confetti";
import Fireworks from "@/components/Fireworks";
import PodiumScene from "@/components/PodiumScene";
import Trophy from "@/components/Trophy";
import {
  categoryBadge,
  categoryLabel,
  getRank,
  type Quiz,
  type RankTone,
} from "@/lib/quiz-data";

type Phase = "question" | "answer" | "result";

function playFanfare() {
  if (typeof window === "undefined") return;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  // C major triad arpeggio + chord (short fanfare).
  const notes: Array<[number, number, number]> = [
    [523.25, 0.0, 0.18],
    [659.25, 0.18, 0.18],
    [783.99, 0.36, 0.18],
    [1046.5, 0.54, 0.45],
  ];
  for (const [freq, start, dur] of notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, now + start);
    gain.gain.exponentialRampToValueAtTime(0.18, now + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + start);
    osc.stop(now + start + dur + 0.05);
  }
}

const TONE_ACCENT: Record<RankTone, string> = {
  winner: "text-flabo-yellow drop-shadow-[0_0_22px_rgba(255,215,0,0.7)]",
  podium: "text-flabo-red drop-shadow-[0_0_16px_rgba(225,6,0,0.55)]",
  prize: "text-flabo-yellow drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]",
  finished: "text-white",
  rookie: "text-white",
  fail: "text-flabo-grey",
};

export default function QuizRunner({ quiz }: { quiz: Quiz }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("question");
  const [correctCount, setCorrectCount] = useState(0);

  const total = quiz.questions.length;
  const current = quiz.questions[index];
  const isLast = index === total - 1;
  const isCorrect = selected !== null && selected === current.correctIndex;

  const rank = phase === "result" ? getRank(correctCount, total) : null;

  useEffect(() => {
    if (rank?.tone === "winner") {
      playFanfare();
    }
  }, [rank?.tone]);

  function handleSelect(choiceIndex: number) {
    if (phase !== "question") return;
    const correct = choiceIndex === current.correctIndex;
    setSelected(choiceIndex);
    setPhase("answer");
    if (correct) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (isLast) {
      setPhase("result");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setPhase("question");
  }

  function handleRetry() {
    setIndex(0);
    setSelected(null);
    setPhase("question");
    setCorrectCount(0);
  }

  return (
    <Section className="max-w-[760px]">
      <div className="mb-6 flex items-center justify-between text-[0.7rem]">
        <Link
          href="/quiz"
          className="font-display tracking-[0.18em] text-flabo-grey hover:text-flabo-red transition-colors"
        >
          ← 検定一覧
        </Link>
        <span className="font-display tracking-[0.18em] text-flabo-grey">
          {quiz.title}
        </span>
      </div>

      {phase !== "result" ? (
        <div className="rounded-2xl border border-white/5 bg-flabo-carbon p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`font-display tracking-[0.18em] text-[0.7rem] px-1.5 py-0.5 rounded ${categoryBadge[current.category]}`}
              >
                {categoryLabel[current.category]}
              </span>
              <span className="font-display tracking-[0.18em] text-[0.7rem] text-flabo-grey">
                Q{index + 1} / {total}
              </span>
            </div>
            <div className="flex-1 mx-4 h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-flabo-red transition-all duration-500"
                style={{
                  width: `${((index + (phase === "answer" ? 1 : 0)) / total) * 100}%`,
                }}
              />
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-bold leading-relaxed">
            {current.question}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {current.choices.map((choice, i) => {
              const isThisCorrect = i === current.correctIndex;
              const isThisSelected = i === selected;
              let stateClass =
                "border-white/10 bg-white/[0.03] hover:border-flabo-red/60 hover:bg-white/[0.06]";
              if (phase === "answer") {
                if (isThisCorrect)
                  stateClass =
                    "border-flabo-green bg-flabo-green/10 text-white";
                else if (isThisSelected)
                  stateClass = "border-flabo-red bg-flabo-red/10 text-white";
                else stateClass = "border-white/5 bg-white/[0.02] opacity-60";
              }
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(i)}
                  disabled={phase !== "question"}
                  className={`text-left rounded-xl border px-4 py-3.5 transition-all duration-200 flex items-center gap-3 ${stateClass} ${phase === "question" ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span className="font-display tracking-[0.18em] text-[0.75rem] text-flabo-grey w-5 shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm leading-relaxed flex-1">
                    {choice}
                  </span>
                  {phase === "answer" && isThisCorrect && (
                    <span className="text-flabo-green text-lg">✓</span>
                  )}
                  {phase === "answer" && isThisSelected && !isThisCorrect && (
                    <span className="text-flabo-red text-lg">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {phase === "answer" && (
            <div
              key={`answer-${index}`}
              className="rounded-xl border border-white/5 bg-flabo-darker/60 p-5 space-y-3 animate-[flabo-fade-in_320ms_ease-out]"
            >
              <p
                className={`font-bold text-lg ${isCorrect ? "text-flabo-green" : "text-flabo-red"}`}
              >
                {isCorrect
                  ? "✅ 正解！"
                  : `❌ 残念！正解は ${String.fromCharCode(65 + current.correctIndex)}「${current.choices[current.correctIndex]}」`}
              </p>
              <p className="text-[0.85rem] leading-relaxed text-white/75">
                {current.explanation}
              </p>
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-flabo-red text-white font-display tracking-[0.18em] text-[0.7rem] hover:bg-white hover:text-flabo-red transition-colors"
                >
                  {isLast ? "結果を見る →" : "次の問題へ →"}
                </button>
              </div>
            </div>
          )}

          <style>{`
            @keyframes flabo-fade-in {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      ) : (
        <ResultView
          quiz={quiz}
          correct={correctCount}
          total={total}
          rank={rank!}
          accentClass={TONE_ACCENT[rank!.tone]}
          onRetry={handleRetry}
        />
      )}
    </Section>
  );
}

function ResultView({
  quiz,
  correct,
  total,
  rank,
  accentClass,
  onRetry,
}: {
  quiz: Quiz;
  correct: number;
  total: number;
  rank: ReturnType<typeof getRank>;
  accentClass: string;
  onRetry: () => void;
}) {
  const dateLabel = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const shareText = `Fラボ検定 ${quiz.title.replace("Fラボ検定 ", "")} で${correct}問正解！ランク: ${rank.emoji} ${rank.title} #Fラボ検定 #F1`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(`https://f-labo.vercel.app/quiz/${quiz.id}`)}`;

  return (
    <>
      {rank.tone === "winner" && <Fireworks />}
      {(rank.tone === "winner" || rank.tone === "podium") && <Confetti />}
      <div className="rounded-2xl border border-white/5 bg-flabo-carbon p-6 md:p-10 text-center space-y-6">
        <p className="font-display tracking-[0.32em] text-[0.75rem] text-flabo-grey">
          RESULT
        </p>
        <div className="space-y-1">
          <p className="font-display tracking-[0.12em] text-sm text-flabo-grey">
            あなたのスコア
          </p>
          <p className={`font-display font-bold text-6xl md:text-7xl ${accentClass}`}>
            {correct}
            <span className="text-3xl md:text-4xl text-flabo-grey"> / {total}</span>
          </p>
        </div>
        <div className="space-y-2">
          <p className={`text-2xl md:text-3xl font-bold ${accentClass}`}>
            {rank.emoji} {rank.title}
          </p>
          <p className="text-sm text-white/75 leading-relaxed">{rank.message}</p>
        </div>

        {rank.tone === "winner" && (
          <div className="pt-2">
            <Trophy rd={quiz.rd} dateLabel={dateLabel} />
            <p className="mt-3 text-[0.7rem] text-flabo-grey">
              ※ スクリーンショットで保存できます
            </p>
          </div>
        )}

        {rank.tone === "podium" && (
          <div className="pt-2">
            <PodiumScene rd={quiz.rd} dateLabel={dateLabel} />
            <p className="mt-3 text-[0.7rem] text-flabo-grey">
              ※ スクリーンショットで保存できます
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-flabo-red text-white font-display tracking-[0.18em] text-[0.7rem] hover:bg-white hover:text-flabo-red transition-colors"
          >
            もう一度挑戦
          </button>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white font-display tracking-[0.18em] text-[0.7rem] hover:border-flabo-red hover:text-flabo-red transition-colors"
          >
            他の検定に挑戦 →
          </Link>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-flabo-blue/40 text-flabo-blue font-display tracking-[0.18em] text-[0.7rem] hover:bg-flabo-blue hover:text-flabo-dark transition-colors"
          >
            𝕏 でシェア
          </a>
        </div>
      </div>
    </>
  );
}
