import Link from "next/link";
import type { Quiz } from "@/lib/quiz-data";

function stars(n: number) {
  return "★".repeat(n) + "☆".repeat(3 - n);
}

export default function QuizCard({ item }: { item: Quiz }) {
  return (
    <Link
      href={`/quiz/${item.id}`}
      className="group flex flex-col rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden transition-all duration-300 hover:border-flabo-red/60 hover:-translate-y-0.5"
    >
      <div className="h-1.5 bg-flabo-red" aria-hidden />
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display tracking-[0.18em] text-[0.55rem] px-1.5 py-0.5 rounded bg-flabo-red/15 text-flabo-red">
            RD.{item.rd}
          </span>
          <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey">
            {item.questions.length}問
          </span>
          <span
            className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-yellow"
            aria-label={`難易度 ${item.difficulty}`}
          >
            {stars(item.difficulty)}
          </span>
        </div>
        <h3 className="font-bold text-[1.05rem] leading-relaxed group-hover:text-flabo-red transition-colors">
          {item.title}
        </h3>
        <p className="text-[0.78rem] leading-relaxed text-white/65 flex-1">
          {item.description}
        </p>
        <div className="mt-1 flex items-center justify-end">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flabo-red text-white font-display tracking-[0.18em] text-[0.65rem] group-hover:bg-white group-hover:text-flabo-red transition-colors">
            挑戦する →
          </span>
        </div>
      </div>
    </Link>
  );
}
