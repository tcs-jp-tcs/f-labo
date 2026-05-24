import type { WeekendBroadcast } from "@/lib/data";

export default function BroadcastTable({ weekend }: { weekend: WeekendBroadcast }) {
  const cols = weekend.channels.length;
  const gridStyle = {
    gridTemplateColumns: `minmax(110px, 1.2fr) minmax(80px, 1fr) minmax(80px, 1fr) repeat(${cols}, 1fr)`,
  } as const;

  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden">
      <div className="px-5 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-white/5 bg-gradient-to-r from-flabo-red/10 to-transparent">
        <span className="font-bold text-base">
          <span aria-hidden>{weekend.flag}</span> {weekend.gpName} — Round {weekend.round}
        </span>
        <span
          className={`font-display tracking-[0.18em] text-[0.55rem] uppercase rounded px-2.5 py-1 ${
            weekend.weekendType === "スプリント週末"
              ? "text-flabo-yellow bg-flabo-yellow/10"
              : "text-flabo-grey bg-white/5"
          }`}
        >
          {weekend.weekendType}
        </span>
      </div>
      <div className="py-1 overflow-x-auto">
        <div
          className="grid items-center px-3 md:px-5 py-3 border-b border-white/5 font-display tracking-[0.1em] text-[0.6rem] text-flabo-grey uppercase min-w-[560px]"
          style={gridStyle}
        >
          <span>セッション</span>
          <span>日付</span>
          <span>日本時間</span>
          {weekend.channels.map((c) => (
            <span key={c} className="text-center">
              {c}
            </span>
          ))}
        </div>
        {weekend.sessions.map((s) => (
          <div
            key={s.session}
            className={`grid items-center px-3 md:px-5 py-2.5 border-b border-white/[0.03] last:border-b-0 text-xs md:text-[0.85rem] min-w-[560px] ${
              s.session.includes("決勝") ? "bg-flabo-red/5 font-bold" : ""
            }`}
            style={gridStyle}
          >
            <span>{s.session}</span>
            <span className="text-flabo-grey text-[0.7rem] md:text-xs">{s.date}</span>
            <span className="font-display text-white">{s.jst}</span>
            {weekend.channels.map((c) => (
              <span
                key={c}
                className={`text-center ${
                  s.channels[c] ? "text-flabo-green" : "text-white/15"
                }`}
              >
                {s.channels[c] ? "✓" : "—"}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
