import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title:
    "2026 F1 第3戦 日本GP レビュー | 桜咲く鈴鹿、アントネッリが史上最年少ポイントリーダーに | Fラボ",
  description:
    "スタートで6位に落ちたアントネッリがセーフティカーを味方に逆転し2連勝。19歳216日で史上最年少ポイントリーダーに。デプロイ切れ問題で起きたベアマンの50Gクラッシュ——鈴鹿をFラボの視点で振り返る。",
};

const RESULTS = [
  { pos: 1, driver: "K. アントネッリ", team: "Mercedes", gap: "1:28:03.403" },
  { pos: 2, driver: "O. ピアストリ", team: "McLaren", gap: "+13.722s" },
  { pos: 3, driver: "C. ルクレール", team: "Ferrari", gap: "+15.270s" },
  { pos: 4, driver: "G. ラッセル", team: "Mercedes", gap: "+15.754s" },
  { pos: 5, driver: "L. ノリス", team: "McLaren", gap: "+23.479s" },
  { pos: 6, driver: "L. ハミルトン", team: "Ferrari", gap: "+25.037s" },
  { pos: 7, driver: "P. ガスリー", team: "Alpine", gap: "+32.340s" },
  { pos: 8, driver: "M. フェルスタッペン", team: "Red Bull", gap: "+32.677s" },
  { pos: 9, driver: "L. ローソン", team: "Racing Bulls", gap: "+50.180s" },
  { pos: 10, driver: "E. オコン", team: "Haas", gap: "+51.216s" },
];

const HIGHLIGHTS = [
  {
    emoji: "🌸",
    title: "桜の鈴鹿で新時代の幕開け",
    body: "31万5000人が見守った鈴鹿。今年も桜が咲く時期の開催となり、新レギュレーション時代のF1を日本で体感できた週末だった。海外から訪れるファンにとっても、サーキットを彩る桜は日本の春の美しさを肌で感じる特別な体験。モータースポーツと日本文化が交わる鈴鹿ならではの光景だ。",
  },
  {
    emoji: "⚠️",
    title: "デプロイ切れ問題、ついに現実に",
    body: "コラピントのエネルギー切れ→ベアマンの45km/h差での追突。50Gのクラッシュでベアマンが無事だったのは幸いだが、FIAはこの問題にどう対処するのか。今後のレースでも同様の事故が起きかねない。",
  },
  {
    emoji: "😤",
    title: "フェルスタッペン、鈴鹿の王座から転落",
    body: "4年連続でポールを獲得してきた鈴鹿で、まさかのQ2敗退。「completely undriveable」という言葉が全てを物語る。11番手スタートから8位まで挽回したが、かつての鈴鹿の王者の姿ではなかった。",
  },
  {
    emoji: "🏎️",
    title: "ピアストリ、ようやく完走",
    body: "開幕戦DNS、第2戦DNS。3戦目にしてようやく初完走、しかも2位表彰台。スタートで首位を奪う速さを見せただけに、SCの巡り合わせが恨めしい。",
  },
];

export default function JapanGpReview2026() {
  return (
    <Section>
      <nav className="mb-6 text-[0.7rem] font-display tracking-[0.18em] text-flabo-grey">
        <Link href="/review" className="hover:text-flabo-red transition-colors">
          ← レースレビュー一覧
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto">
        <header className="mb-10 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-display tracking-[0.18em] text-[0.6rem] px-2 py-0.5 rounded bg-flabo-red/15 text-flabo-red">
              F1
            </span>
            <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey uppercase">
              Round 3
            </span>
            <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
              🇯🇵 日本GP
            </span>
            <span className="text-[0.7rem] text-flabo-grey ml-auto">2026年3月29日</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl leading-snug mb-3">
            2026 F1 第3戦 日本GP レビュー
          </h1>
          <p className="text-flabo-grey text-sm md:text-base leading-relaxed">
            桜咲く鈴鹿、アントネッリが史上最年少ポイントリーダーに
          </p>
        </header>

        <div className="space-y-8 text-[0.9rem] md:text-[0.95rem] leading-[1.85] text-white/85">
          <section className="space-y-4">
            <p>
              2026年F1第3戦は、31万5000人の観客が詰めかけた鈴鹿サーキットが舞台。曇り空の下、通常フォーマットの週末で行われた一戦は、スタートで6位まで落ちたアントネッリがセーフティカーを味方につけて逆転し、2連勝を達成するという劇的な展開となった。
            </p>
            <p>
              この勝利でアントネッリは19歳216日という史上最年少でのポイントリーダーに。メルセデスは開幕3連勝で、新レギュレーション時代の主役が誰なのかを鮮明にした。
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              予選ハイライト：アントネッリ2戦連続ポール、フェルスタッペンQ2敗退
            </h2>
            <p>
              アントネッリが1分28秒778で前戦中国GPに続く2戦連続のポールポジションを獲得。2番手のラッセルに0.298秒の差をつけ、メルセデスがフロントロウを独占した。3番手にはピアストリが入り、マクラーレンの復調を印象づけた。
            </p>
            <p className="mt-3">
              衝撃だったのはフェルスタッペン。Q2で11番手に沈み敗退。鈴鹿での連続ポールポジション記録が4年で途絶えた。マシンについて「全く運転できない（completely undriveable）」とコメントしており、レッドブルの苦戦ぶりが浮き彫りになった。トラブルのないフェルスタッペンがQ2敗退というのは、ここ数年記憶にない。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              決勝ハイライト：スタート失敗からの逆転劇
            </h2>

            <div>
              <h3 className="font-bold text-base mb-2">ピアストリ、ようやくの見せ場</h3>
              <p>
                スタートではピアストリが素晴らしい蹴り出しでターン1の首位を奪取。一方ポールのアントネッリは過度なホイールスピンで6位まで転落。メルセデスのスタートの弱さが、ここでも露呈した。
              </p>
              <p className="mt-3">
                ピアストリにとっては開幕戦オーストラリアGPでのレコノサンスラップ（グリッド試走）でのクラッシュ（DNS）、第2戦中国GPでも電気系トラブル（DNS）と散々な開幕2戦からの、ようやくの好スタート。このまま初完走＆初勝利かと期待が高まった。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">今年誰もが予想していた事故 — コラピントのデプロイ切れとベアマンのクラッシュ</h3>
              <p>
                20周目、スプーンカーブ手前で衝撃的なアクシデントが発生した。
              </p>
              <p className="mt-3">
                前方を走っていたコラピント（アルピーヌ）が、ストレート後半で電気エネルギーの回収フェーズに入りデプロイをカット。一方、後方のベアマン（ハース）はまだエネルギーを使い続けており、両者の速度差は推定45km/hにもなった。ベアマンは芝生に逃れて回避を試みたが、コントロールを失いバリアに激突。衝撃は50Gに達した。
              </p>
              <p className="mt-3">
                ベアマンは自力でマシンを降り、右膝の打撲で済んだのは不幸中の幸いだった。
              </p>
              <p className="mt-3">
                2026年の新レギュレーションではMGU-Kの出力が120kWから350kWへ約3倍に引き上げられた一方、バッテリー容量は据え置き、さらにMGU-Hも廃止された。同じ容量のバッテリーで3倍のパワーを出し入れするため、エネルギーを使い切ったマシンと使用中のマシンとの速度差が劇的に広がる。この「デプロイ切れ問題」は開幕前から危険性が指摘されており、「今年、誰かがこれでやられる」と多くの人が予想していた。それが現実になった瞬間だった。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">セーフティカーがアントネッリに微笑む</h3>
              <p>
                22周目にセーフティカーが導入された時点で、首位のピアストリやラッセルはすでにピットを済ませていた。一方、まだピットに入っていなかったアントネッリはSC中にピットストップを行い、タイヤ交換のロスを最小限に抑えて首位のままコースに復帰。完璧なタイミングだった。
              </p>
              <p className="mt-3">
                再開後のアントネッリは別次元のペースを見せ、2位ピアストリに13.722秒の大差をつけてチェッカー。「運も実力のうち」とはまさにこのことだ。
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-4 pt-4">
              注目ポイント：Fラボ的日本GPの見どころ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.title}
                  className="rounded-xl border border-white/5 bg-flabo-carbon p-4"
                >
                  <h3 className="font-bold text-[0.95rem] mb-2">
                    <span className="mr-1">{h.emoji}</span>
                    {h.title}
                  </h3>
                  <p className="text-[0.82rem] leading-relaxed text-white/75">
                    {h.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-4 pt-4">
              決勝結果（トップ10）
            </h2>
            <div className="rounded-xl border border-white/5 bg-flabo-carbon overflow-x-auto">
              <table className="w-full text-[0.82rem]">
                <thead className="text-flabo-grey font-display tracking-[0.12em] text-[0.6rem] uppercase">
                  <tr className="border-b border-white/5">
                    <th className="px-3 py-2 text-center w-12">順位</th>
                    <th className="px-3 py-2 text-left">ドライバー</th>
                    <th className="px-3 py-2 text-left">チーム</th>
                    <th className="px-3 py-2 text-right">タイム/差</th>
                  </tr>
                </thead>
                <tbody>
                  {RESULTS.map((r) => (
                    <tr key={r.pos} className="border-b border-white/5 last:border-b-0">
                      <td className="px-3 py-2 text-center font-bold">{r.pos}</td>
                      <td className="px-3 py-2">{r.driver}</td>
                      <td className="px-3 py-2 text-flabo-grey">{r.team}</td>
                      <td className="px-3 py-2 text-right text-flabo-grey">{r.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-[0.78rem] leading-relaxed text-white/75 space-y-1">
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  POLE
                </span>
                K. アントネッリ（Mercedes）1:28.778
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  FASTEST LAP
                </span>
                K. アントネッリ（Mercedes）1:32.432（Lap 49）
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  DNF
                </span>
                O. ベアマン（クラッシュ）
              </p>
            </div>
          </section>

          <section className="pt-4 border-t border-white/10">
            <p className="text-[0.85rem] italic text-flabo-grey leading-relaxed">
              次戦は約1ヶ月のインターバルを経て第4戦マイアミGP（5/1-3）。初のスプリント週末で、メルセデスの独走を止めるチームは現れるのか。
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
          <Link
            href="/review"
            className="font-display tracking-[0.18em] text-[0.65rem] text-flabo-grey hover:text-flabo-red transition-colors"
          >
            ← レースレビュー一覧へ戻る
          </Link>
        </div>
      </article>
    </Section>
  );
}
