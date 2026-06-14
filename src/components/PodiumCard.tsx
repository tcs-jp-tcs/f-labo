import type { PodiumRow } from "@/lib/data";
import CardHeader, { type CardCategory } from "./CardHeader";
import PodiumBody from "./PodiumBody";

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
        <PodiumBody podium={podium} />
        {note && (
          <p className="text-[0.65rem] text-white leading-relaxed mt-3 border-t border-white/5 pt-3">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
