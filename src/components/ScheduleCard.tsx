import type { ScheduleItem } from "@/lib/data";

export default function ScheduleCard({ item }: { item: ScheduleItem }) {
  const isNext = item.status === "next";
  const isPast = item.status === "past";
  return (
    <article
      className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-300 ${
        isNext
          ? "bg-gradient-to-br from-flabo-red/10 to-flabo-carbon border-flabo-red"
          : "bg-flabo-carbon border-white/5 hover:border-flabo-red hover:-translate-y-0.5"
      } ${isPast ? "opacity-70" : ""}`}
    >
      {isNext && (
        <span className="absolute top-2.5 right-2.5 font-display font-bold tracking-[0.18em] text-[0.5rem] text-flabo-red bg-flabo-red/15 px-1.5 py-0.5 rounded">
          NEXT
        </span>
      )}
      {isPast && (
        <span className="absolute top-2.5 right-2.5 font-display font-bold tracking-[0.18em] text-[0.5rem] text-flabo-grey bg-white/5 px-1.5 py-0.5 rounded">
          PAST
        </span>
      )}
      <div className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey mb-2">
        ROUND {item.round}
        {item.weekendType === "スプリント週末" && (
          <span className="ml-2 text-flabo-yellow">SPRINT</span>
        )}
      </div>
      <div className="text-xl mb-2.5" aria-hidden>
        {item.flag}
      </div>
      <div className="font-black text-base leading-tight mb-1">{item.name}</div>
      <div className="text-xs text-flabo-grey">{item.date}</div>
      <div className="mt-2 text-[0.65rem] text-flabo-green flex items-center gap-1">
        ✓ {item.broadcast}
      </div>
    </article>
  );
}
