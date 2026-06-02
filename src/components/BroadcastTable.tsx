import { seriesLabel, type WeekendBroadcast } from "@/lib/data";

export default function BroadcastTable({ weekend }: { weekend: WeekendBroadcast }) {
  const cols = weekend.channels.length;
  const hasLocalTime = weekend.sessions.some((s) => s.localTime);
  const gridStyle = hasLocalTime
    ? ({
        gridTemplateColumns: `minmax(110px, 1.2fr) minmax(70px, 0.9fr) minmax(70px, 0.9fr) minmax(80px, 1fr) repeat(${cols}, 1fr)`,
      } as const)
    : ({
        gridTemplateColumns: `minmax(110px, 1.2fr) minmax(80px, 1fr) minmax(80px, 1fr) repeat(${cols}, 1fr)`,
      } as const);

  const minWidth = hasLocalTime ? "min-w-[640px]" : "min-w-[560px]";

  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden">
      <div className="px-5 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-white/5 bg-gradient-to-r from-flabo-red/10 to-transparent">
        <span className="font-bold text-base flex items-center gap-2 flex-wrap">
          {/* カテゴリバッジ：/news のカテゴリタブと同じ flabo-red 系で統一 */}
          <span className="font-display tracking-[0.18em] text-[0.6rem] rounded-md px-2 py-0.5 bg-flabo-red text-white shrink-0">
            {seriesLabel[weekend.series]}
          </span>
          <span aria-hidden>{weekend.flag}</span> {weekend.gpName} — Round {weekend.round}
        </span>
        {/* F2/F3 はスプリント＋フィーチャーが通常フォーマットのため週末タイプ表示は省略 */}
        {weekend.series !== "F2" && weekend.series !== "F3" && (
          <span
            className={`font-display tracking-[0.18em] text-[0.55rem] uppercase rounded px-2.5 py-1 ${
              weekend.weekendType === "スプリント週末"
                ? "text-flabo-yellow bg-flabo-yellow/10"
                : "text-flabo-grey bg-white/5"
            }`}
          >
            {weekend.weekendType}
          </span>
        )}
      </div>
      <div className="py-1 overflow-x-auto">
        <div
          className={`grid items-center px-3 md:px-5 py-3 border-b border-white/5 font-display tracking-[0.1em] text-[0.6rem] text-flabo-grey uppercase ${minWidth}`}
          style={gridStyle}
        >
          <span>セッション</span>
          <span>日付</span>
          {hasLocalTime && <span>現地時間</span>}
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
            className={`grid items-center px-3 md:px-5 py-2.5 border-b border-white/[0.03] last:border-b-0 text-xs md:text-[0.85rem] ${minWidth} ${
              s.session.includes("決勝") ? "bg-flabo-red/5 font-bold" : ""
            }`}
            style={gridStyle}
          >
            <span>{s.session}</span>
            <span className="text-flabo-grey text-[0.7rem] md:text-xs">{s.date}</span>
            {hasLocalTime && (
              <span className="text-flabo-grey text-[0.7rem] md:text-xs">
                {s.localTime ?? "—"}
              </span>
            )}
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
