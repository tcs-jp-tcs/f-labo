import type { PodiumRow } from "@/lib/data";
import CardHeader, { type CardCategory } from "./CardHeader";

const POS_BORDER = [
  "border-l-flabo-yellow",
  "border-l-[#C0C0C0]",
  "border-l-[#CD7F32]",
];

export default function PodiumCard({
  title,
  podium,
  note,
  category,
}: {
  title: React.ReactNode;
  podium: PodiumRow[];
  note?: string;
  /** 結果のシリーズ。指定するとそのシリーズ色・ラベルのヘッダーになる */
  category?: CardCategory;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon overflow-hidden">
      <CardHeader category={category} />
      <div className="p-5">
        <h3 className="font-display tracking-[0.24em] text-[0.65rem] uppercase text-flabo-grey mb-3 flex items-center gap-1.5 flex-wrap">
          {title}
        </h3>
      {podium.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {podium.map((row, i) => (
            <div
              key={row.pos}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md bg-white/[0.03] border-l-[3px] ${POS_BORDER[i]}`}
            >
              <span className="font-display font-black text-base w-7">
                {row.pos}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[0.85rem] truncate">{row.driver}</div>
                <div className="text-[0.65rem] text-flabo-grey truncate">
                  {row.team}
                </div>
              </div>
              <span className="font-display text-[0.7rem] text-flabo-grey">
                {row.time}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-flabo-grey text-xs leading-relaxed py-1">
          結果待ち
        </p>
      )}
        {note && (
          <p className="text-[0.65rem] text-white leading-relaxed mt-3 border-t border-white/5 pt-3">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
