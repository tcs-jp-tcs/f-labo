import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import CircuitMap from "@/components/CircuitMap";
import type { Circuit } from "@/lib/data";
import { getCircuitBySlug } from "@/lib/circuits";

// 図鑑はSupabaseの最新状態を常に反映（静的化させない）
export const revalidate = 0;

/** チーム名 → チップ配色（部分一致・大文字小文字無視）。歴代ウィナー表で使用。 */
function teamChip(team: string): { bg: string; fg: string } {
  const t = team.toLowerCase();
  const M: { keys: string[]; bg: string; fg?: string }[] = [
    { keys: ["mercedes", "メルセデス"], bg: "#00a19c" },
    { keys: ["ferrari", "フェラーリ"], bg: "#e8002d" },
    { keys: ["red bull", "redbull", "レッドブル"], bg: "#1e3a8a" },
    { keys: ["mclaren", "mclaren", "マクラーレン"], bg: "#ff8000" },
    { keys: ["williams", "ウィリアムズ"], bg: "#1868db" },
    { keys: ["aston", "アストン"], bg: "#229971" },
    { keys: ["alpine", "アルピーヌ"], bg: "#2173b8" },
    { keys: ["racing bulls", "rb", "レーシングブルズ"], bg: "#6692ff" },
    { keys: ["sauber", "ザウバー", "kick"], bg: "#52e252", fg: "#0a0a0a" },
    { keys: ["haas", "ハース"], bg: "#b6babd", fg: "#0a0a0a" },
    { keys: ["alfa", "アルファ"], bg: "#900000" },
    { keys: ["renault", "ルノー"], bg: "#ffd800", fg: "#0a0a0a" },
    { keys: ["lotus", "ロータス"], bg: "#0d5e2f" },
    { keys: ["force india", "フォースインディア"], bg: "#f596c8", fg: "#0a0a0a" },
    { keys: ["brawn", "ブラウン"], bg: "#c8e600", fg: "#0a0a0a" },
  ];
  for (const m of M) {
    if (m.keys.some((k) => t.includes(k))) return { bg: m.bg, fg: m.fg ?? "#ffffff" };
  }
  return { bg: "#2A2A2A", fg: "#F0F0F0" };
}

/** スペック1マス。値が無ければ "—" を出す。 */
function Spec({ label, value, unit }: { label: string; value?: React.ReactNode; unit?: string }) {
  const has = value !== undefined && value !== null && value !== "";
  return (
    <div className="bg-flabo-carbon border border-white/10 rounded-[10px] p-3.5">
      <div className="text-flabo-grey text-[11px] tracking-[0.08em] uppercase">{label}</div>
      <div className="text-[1.4rem] font-black mt-0.5 tabular-nums leading-tight">
        {has ? value : <span className="text-flabo-grey">—</span>}
        {has && unit && <span className="text-xs text-flabo-grey font-bold"> {unit}</span>}
      </div>
    </div>
  );
}

/** 見出し（赤い縦線 + 大文字ラベル） */
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[0.95rem] tracking-[0.12em] uppercase text-flabo-grey mt-9 mb-3 pl-2.5 border-l-[3px] border-flabo-red">
      {children}
    </h2>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const circuit = await getCircuitBySlug(slug);
  if (!circuit) return { title: "サーキット図鑑 | Fラボ" };
  return {
    title: `${circuit.nameJa}（${circuit.gpNameEn}）| サーキット図鑑 | Fラボ`,
    description:
      circuit.characterJa?.slice(0, 100) ??
      `${circuit.nameJa} のコースマップ・スペック・ラップレコード・歴代ウィナー。`,
  };
}

export default async function CircuitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const circuit = await getCircuitBySlug(slug);

  if (!circuit) notFound();

  const c: Circuit = circuit;
  const fmt = (n?: number) =>
    n === undefined ? undefined : Number.isInteger(n) ? String(n) : n.toString();

  return (
    <Section>
      <div className="max-w-[860px] mx-auto">
      <nav className="mb-6 text-[0.7rem] font-display tracking-[0.18em] text-flabo-grey">
        <Link href="/circuits" className="hover:text-flabo-red transition-colors">
          ← サーキット図鑑一覧
        </Link>
      </nav>

      {/* ヒーロー：国旗 + 日本語名 + GP名（ROUNDは入れない） */}
      <header className="pb-5 border-b border-white/10">
        <div className="font-display text-flabo-red font-black tracking-[0.2em] text-[13px]">
          CIRCUIT GUIDE
        </div>
        <h1 className="text-[1.9rem] md:text-[2.1rem] font-black mt-1.5 mb-1 flex items-center gap-2.5 leading-tight">
          <span className="text-[2rem]" aria-hidden>
            {c.flag}
          </span>
          {c.nameJa}
        </h1>
        <div className="text-flabo-grey text-[0.95rem] font-semibold tracking-[0.04em]">
          {c.gpNameEn}
        </div>
      </header>

      {/* コース図（主役位置）: 動くコースマップ→静止SVG→準備中 の3段フォールバック */}
      <CircuitMap embedKey={c.mapEmbedKey} mapSvg={c.mapSvg} title={`${c.nameEn} コースマップ`} />

      {/* スペック9項目 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
        <Spec label="Length" value={fmt(c.lengthKm)} unit="km" />
        <Spec label="Laps" value={fmt(c.laps)} />
        <Spec label="Race Distance" value={fmt(c.raceDistanceKm)} unit="km" />
        <Spec label="Corners" value={fmt(c.corners)} />
        <Spec label="Direction" value={c.direction} />
        <Spec label="First GP" value={fmt(c.firstGp)} />
        <Spec label="Top Speed" value={fmt(c.topSpeedKmh)} unit="km/h" />
        <Spec label="Avg Speed" value={fmt(c.avgSpeedKmh)} unit="km/h" />
        <Spec label="Elevation" value={fmt(c.elevationM)} unit="m" />
      </div>
      {c.topSpeedNote && (
        <div className="text-flabo-grey text-xs mt-2.5 leading-relaxed">{c.topSpeedNote}</div>
      )}

      {/* ラップレコード：2枚をラベル付きで併記（1つにまとめない） */}
      <H2>Lap Records</H2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-flabo-carbon border border-white/10 rounded-[10px] p-4">
          <div className="text-xs text-flabo-grey font-bold">コースレコード（予選最速）</div>
          <div className="text-[1.6rem] font-black tabular-nums my-1.5 tracking-[0.02em]">
            {c.recordQualiTime ?? "—"}
          </div>
          <div className="text-[0.85rem]">
            {c.recordQualiDriver ?? "—"}
            {(c.recordQualiTeam || c.recordQualiYear) && (
              <span className="text-flabo-grey">
                {" / "}
                {[c.recordQualiTeam, c.recordQualiYear].filter(Boolean).join(" · ")}
              </span>
            )}
          </div>
        </div>
        <div className="bg-flabo-carbon border border-white/10 rounded-[10px] p-4">
          <div className="text-xs text-flabo-grey font-bold">決勝ファステスト</div>
          <div className="text-[1.6rem] font-black tabular-nums my-1.5 tracking-[0.02em]">
            {c.recordRaceTime ?? "—"}
          </div>
          <div className="text-[0.85rem]">
            {c.recordRaceDriver ?? "—"}
            {(c.recordRaceTeam || c.recordRaceYear) && (
              <span className="text-flabo-grey">
                {" / "}
                {[c.recordRaceTeam, c.recordRaceYear].filter(Boolean).join(" · ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* コース特徴 */}
      {c.characterJa && (
        <>
          <H2>Circuit Character</H2>
          <div className="bg-flabo-carbon border border-white/10 rounded-[10px] p-4 text-[0.95rem] leading-relaxed">
            {c.characterJa}
          </div>
        </>
      )}

      {/* 歴代ウィナー 直近10年 */}
      {c.winners.length > 0 && (
        <>
          <H2>Winners · 直近10年</H2>
          <div className="overflow-hidden rounded-[10px] border border-white/10">
            <table className="w-full border-collapse bg-flabo-carbon">
              <thead>
                <tr>
                  <th className="bg-flabo-darker text-flabo-grey text-[11px] tracking-[0.08em] uppercase text-left py-2.5 px-3.5 font-normal w-16">
                    Year
                  </th>
                  <th className="bg-flabo-darker text-flabo-grey text-[11px] tracking-[0.08em] uppercase text-left py-2.5 px-3.5 font-normal">
                    Winner
                  </th>
                  <th className="bg-flabo-darker text-flabo-grey text-[11px] tracking-[0.08em] uppercase text-left py-2.5 px-3.5 font-normal">
                    Team
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.winners.map((w) => {
                  const chip = teamChip(w.team);
                  return (
                    <tr key={w.year} className="border-t border-white/10">
                      <td className="py-2.5 px-3.5 text-flabo-grey tabular-nums font-bold text-[0.9rem]">
                        {w.year}
                      </td>
                      <td className="py-2.5 px-3.5 font-bold text-[0.9rem]">{w.driver}</td>
                      <td className="py-2.5 px-3.5">
                        <span
                          className="inline-block text-[12px] font-extrabold px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: chip.bg, color: chip.fg }}
                        >
                          {w.team}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="mt-12 pt-6 border-t border-white/10">
        <Link
          href="/circuits"
          className="font-display tracking-[0.18em] text-[0.75rem] text-flabo-grey hover:text-flabo-red transition-colors"
        >
          ← サーキット図鑑一覧へ戻る
        </Link>
      </div>
      </div>
    </Section>
  );
}
