import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { getCircuits } from "@/lib/circuits";

// 図鑑はSupabaseの最新状態を常に反映（静的化させない）
export const revalidate = 0;

export const metadata: Metadata = {
  title: "サーキット図鑑 | 情報・DB | Fラボ",
  description:
    "F1開催サーキットのコースマップ・標高プロファイル・スペック・ラップレコード・歴代ウィナーをまとめたサーキット図鑑。",
};

export default async function CircuitsIndexPage() {
  const circuits = await getCircuits();

  return (
    <Section>
      <SectionHeader title="サーキット図鑑" />
      <p className="text-flabo-grey text-sm mb-6">
        各サーキットのコースマップ・スペック・ラップレコード・歴代ウィナーをまとめた図鑑。
      </p>

      {circuits.length === 0 ? (
        <p className="text-flabo-grey text-sm">
          サーキットデータは順次追加していきます。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {circuits.map((c) => (
            <Link
              key={c.slug}
              href={`/circuits/${c.slug}`}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-flabo-carbon p-5 transition-all duration-300 hover:border-flabo-red hover:-translate-y-0.5"
            >
              <div className="text-xl mb-2.5" aria-hidden>
                {c.flag}
              </div>
              <div className="font-black text-base leading-tight mb-1 group-hover:text-flabo-red transition-colors">
                {c.nameJa}
              </div>
              <div className="text-[0.8rem] text-flabo-grey font-semibold tracking-[0.03em] mb-3">
                {c.gpNameEn}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] text-flabo-grey font-display tracking-[0.08em]">
                {c.lengthKm !== undefined && <span>{c.lengthKm} km</span>}
                {c.corners !== undefined && <span>{c.corners} corners</span>}
                {c.firstGp !== undefined && <span>Since {c.firstGp}</span>}
              </div>
              <div className="mt-3 text-[0.7rem] font-display tracking-[0.18em] text-flabo-grey group-hover:text-flabo-red transition-colors">
                詳細を見る →
              </div>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
