import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title:
    "2026 F1 第1戦 オーストラリアGP レビュー | 新時代の幕開け、メルセデスが1-2で制す | Fラボ",
  description:
    "シャシーとPUの大幅レギュレーション変更で迎えた2026年F1開幕戦。ラッセルがポール・トゥ・ウィン、アントネッリが2位でメルセデスが1-2。フェラーリのスタート、新PUの洗礼——アルバート・パークをFラボの視点で振り返る。",
};

const RESULTS = [
  { pos: 1, driver: "G. ラッセル", team: "Mercedes", gap: "1:23:06.801" },
  { pos: 2, driver: "K. アントネッリ", team: "Mercedes", gap: "+2.974s" },
  { pos: 3, driver: "C. ルクレール", team: "Ferrari", gap: "+15.519s" },
  { pos: 4, driver: "L. ハミルトン", team: "Ferrari", gap: "+16.144s" },
  { pos: 5, driver: "L. ノリス", team: "McLaren", gap: "+51.741s" },
  { pos: 6, driver: "M. フェルスタッペン", team: "Red Bull", gap: "+54.617s" },
  { pos: 7, driver: "O. ベアマン", team: "Haas", gap: "+1 LAP" },
  { pos: 8, driver: "A. リンドブラッド", team: "Racing Bulls", gap: "+1 LAP" },
  { pos: 9, driver: "G. ボルトレート", team: "Audi", gap: "+1 LAP" },
  { pos: 10, driver: "P. ガスリー", team: "Alpine", gap: "+1 LAP" },
];

const HIGHLIGHTS = [
  {
    emoji: "🆕",
    title: "新レギュレーション、力関係が見えた",
    body: "テストで散々だったアストンマーティンは案の定苦戦。メルセデスの一強に近い構図が見え、フェラーリが追う形。マクラーレンとレッドブルはPUの信頼性に不安を抱えたスタートとなった。新時代の勢力図は、事前の予想通りメルセデスが一歩リードしている。",
  },
  {
    emoji: "🚀",
    title: "フェラーリのスタート、開幕戦から異次元",
    body: "ルクレールが4番グリッドから1コーナーで首位を奪うロケットスタート。その後のラッセルとの抜きつ抜かれつのバトルは、新レギュレーションF1の面白さを存分に見せてくれた。「今年はこの2チームが中心か」と期待させた。",
  },
  {
    emoji: "😩",
    title: "俺たちのフェラーリ、VSCで自沈",
    body: "スタートで首位、序盤はラッセルと互角のバトル。しかしVSCでメルセデスだけがピットに入り、フェラーリはステイアウト→ピットレーン閉鎖で動けず。速さはあるのに戦略で自滅する、「俺たちのフェラーリ」が開幕戦から全開だった。",
  },
  {
    emoji: "💥",
    title: "新PUの洗礼",
    body: "ピアストリのレコノサンスラップクラッシュ、ヒュルケンベルグのDNS、フェルスタッペンのQ1クラッシュ、ハジャーのエンジン故障。新レギュレーション初戦は、マシンの信頼性が大きなテーマとなった。どのチームも手探りの状態で、序盤戦はサバイバルレースの様相だ。",
  },
];

export default function AustraliaGpReview2026() {
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
              Round 1
            </span>
            <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
              🇦🇺 オーストラリアGP
            </span>
            <span className="text-[0.7rem] text-flabo-grey ml-auto">2026年3月8日</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl leading-snug mb-3">
            2026 F1 第1戦 オーストラリアGP レビュー
          </h1>
          <p className="text-flabo-grey text-sm md:text-base leading-relaxed">
            新時代の幕開け、メルセデスが1-2で制す
          </p>
        </header>

        <div className="space-y-8 text-[0.9rem] md:text-[0.95rem] leading-[1.85] text-white/85">
          <section className="space-y-4">
            <p>
              2026年F1が開幕。シャシーとパワーユニットの大幅なレギュレーション変更が導入された新時代の最初のレースは、アルバート・パーク・サーキットに舞台を移し、メルセデスのジョージ・ラッセルがポール・トゥ・ウィンで制した。チームメイトのアントネッリが2位に入り、メルセデスが1-2フィニッシュで新時代の主役候補に名乗りを上げた。
            </p>
            <p>
              テスト段階から苦戦が伝えられていたアストンマーティンやレッドブルの力関係、新PUの信頼性、そしてフェラーリのスタートの速さなど、2026年シーズンを占う多くのテーマが一気に浮き彫りになった開幕戦だった。
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              予選ハイライト：メルセデスがフロントロウ独占、フェルスタッペンQ1クラッシュ
            </h2>
            <p>
              ラッセルが1分18秒518でポールポジションを獲得。アントネッリはFP3での激しいクラッシュから復帰して2番手を確保し、メルセデスがフロントロウを独占した。
            </p>
            <p className="mt-3">
              衝撃だったのはフェルスタッペン。Q1でブレーキ時にリアをロックさせてスピン、バリアに衝突。タイム記録なしで最後尾20番手スタートとなった。ディフェンディングチャンピオンのノリスは3番手、ルクレールが4番手につけた。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              決勝ハイライト：フェラーリのスタート、VSCの明暗、そして「俺たちのフェラーリ」
            </h2>

            <div>
              <h3 className="font-bold text-base mb-2">ルクレール、ロケットスタートで首位奪取</h3>
              <p>
                4番グリッドのルクレールがスタートで一気に首位を奪取。フェラーリのスタートの良さは、この開幕戦から際立っていた。ルクレールとラッセルはエネルギーの展開を駆使しながら、何度も首位を入れ替える激しいバトルを展開。新レギュレーションでのデプロイ管理が生む「抜きつ抜かれつ」は、2026年F1の新しい見どころとなった。
              </p>
              <p className="mt-3">
                この2チームの攻防を見て、「今年はメルセデスとフェラーリの2強か」と思ったファンも多かっただろう。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">VSC2回、メルセデスだけが動いた</h3>
              <p>
                10周目、ハジャー（レッドブル）のエンジン故障で最初のバーチャル・セーフティカー（VSC）が導入。メルセデスの2台はここでピットインしたが、フェラーリはステイアウトを選択。16周目にはボッタス（カディラック）の停止で2度目のVSCが出たが、フェラーリがピットに入る前にピットレーンが閉鎖された。
              </p>
              <p className="mt-3">
                結局フェラーリは通常走行中にピットストップを行うことになり、メルセデスに首位を明け渡す。序盤あれだけ速さを見せておきながら、戦略で自沈。まさに「俺たちのフェラーリ」だった。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">ピアストリ、母国レースの悲劇</h3>
              <p>
                5番グリッドのピアストリは、レコノサンスラップでターン4の縁石に乗りすぎてスピン、バリアに衝突しDNS。新PUの予期せぬパワーサージが原因と後に判明している。母国メルボルンの観客の前でグリッドにすら着けなかった。ヒュルケンベルグ（アウディ）もテクニカルトラブルでDNS。新レギュレーション初戦の波乱を象徴する出来事だった。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">フェルスタッペン、20番手から6位へ</h3>
              <p>
                Q1クラッシュで最後尾スタートとなったフェルスタッペンは、決勝で着実に順位を上げて6位フィニッシュ。ファステストラップ（1:22.091）も記録し、マシンに速さがあることは証明した。ただし5位ノリスとは51秒以上の差があり、レッドブルの課題は深い。
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-4 pt-4">
              注目ポイント：Fラボ的オーストラリアGPの見どころ
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
                G. ラッセル（Mercedes）1:18.518
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  FASTEST LAP
                </span>
                M. フェルスタッペン（Red Bull）1:22.091（Lap 43）
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  DNS
                </span>
                O. ピアストリ（クラッシュ）／ N. ヒュルケンベルグ（テクニカルトラブル）
              </p>
            </div>
          </section>

          <section className="pt-4 border-t border-white/10">
            <p className="text-[0.85rem] italic text-flabo-grey leading-relaxed">
              新時代のF1が幕を開けた。メルセデスの1-2で始まった2026年シーズン。次戦は1週間後の第2戦中国GP（3/13-15）、今季初のスプリント週末だ。
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
