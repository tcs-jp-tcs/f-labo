import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title:
    "2026 F1 第4戦 マイアミGP レビュー | アントネッリ3連勝、ノリスがスプリントで一矢報いる | Fラボ",
  description:
    "アントネッリが3戦連続ポール・トゥ・ウィンでリード拡大。土曜のスプリントはノリスがメルセデス以外で今季初勝利。ルクレール最終ラップの悲劇——マイアミをFラボの視点で振り返る。",
};

const SPRINT = [
  { pos: 1, driver: "L. ノリス", team: "McLaren" },
  { pos: 2, driver: "O. ピアストリ", team: "McLaren" },
  { pos: 3, driver: "C. ルクレール", team: "Ferrari" },
  { pos: 4, driver: "G. ラッセル", team: "Mercedes" },
  { pos: 5, driver: "M. フェルスタッペン", team: "Red Bull" },
];

const RESULTS = [
  { pos: 1, driver: "K. アントネッリ", team: "Mercedes", gap: "1:33:19.273" },
  { pos: 2, driver: "L. ノリス", team: "McLaren", gap: "+3.264s" },
  { pos: 3, driver: "O. ピアストリ", team: "McLaren", gap: "+27.092s" },
  { pos: 4, driver: "G. ラッセル", team: "Mercedes", gap: "+43.051s" },
  { pos: 5, driver: "M. フェルスタッペン", team: "Red Bull", gap: "+48.949s（5秒加算込）" },
  { pos: 6, driver: "L. ハミルトン", team: "Ferrari", gap: "+53.753s" },
  { pos: 7, driver: "F. コラピント", team: "Alpine", gap: "+1:01.871s" },
  { pos: 8, driver: "C. ルクレール", team: "Ferrari", gap: "+1:04.245s（20秒加算込）" },
  { pos: 9, driver: "C. サインツJr.", team: "Williams", gap: "+1:22.072s" },
  { pos: 10, driver: "A. アルボン", team: "Williams", gap: "+1:30.972s" },
];

const HIGHLIGHTS = [
  {
    emoji: "🏆",
    title: "アントネッリ、止まらない",
    body: "中国、日本、そしてマイアミ。キャリア3連勝でチャンピオンシップのリードはほぼ1レース分に。スプリントではスタートの弱さが課題だが、決勝では毎回きっちり修正して勝ちきる。この安定感は19歳のものとは思えない。",
  },
  {
    emoji: "🦁",
    title: "MAXがMAXらしい走り",
    body: "予選では0.166秒差の2番手に入り、レッドブルの復調を感じさせた。スタートでは持ち前の攻撃性で3ワイドのバトルに飛び込むが、ターン2でスピン。その後、セーフティカーを利用してハードタイヤに交換し一時は暫定首位に立つも、タイヤの劣化で終盤に順位を落とす。ピット出口の白線越えで5秒ペナルティのおまけ付き。攻めて、スピンして、巻き返して、ペナルティ。良くも悪くもMAXらしい全部入りの週末だった。",
  },
  {
    emoji: "💥",
    title: "ルクレールの最終ラップ",
    body: "表彰台目前でスピン→壁→サスペンション破損→8位。レース中は安定した走りを見せていただけに、最後の最後でこれは痛い。フェラーリのPU馬力不足が話題になる中、ドライバーにも厳しい週末となった。",
  },
  {
    emoji: "⚡",
    title: "ノリス、スプリントで見せた力",
    body: "メルセデス以外で今季初勝利をスプリントで挙げたノリス。決勝でもアントネッリに肉薄し、マクラーレンがまだ戦えることを証明した。ディフェンディングチャンピオンの意地を感じる走りだった。",
  },
];

export default function MiamiGpReview2026() {
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
              Round 4
            </span>
            <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
              🇺🇸 マイアミGP
            </span>
            <span className="text-[0.7rem] text-flabo-grey ml-auto">2026年5月3日</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl leading-snug mb-3">
            2026 F1 第4戦 マイアミGP レビュー
          </h1>
          <p className="text-flabo-grey text-sm md:text-base leading-relaxed">
            アントネッリ3連勝、ノリスがスプリントで一矢報いる
          </p>
        </header>

        <div className="space-y-8 text-[0.9rem] md:text-[0.95rem] leading-[1.85] text-white/85">
          <section className="space-y-4">
            <p>
              2026年F1第4戦マイアミGPは、キミ・アントネッリが3戦連続のポール・トゥ・ウィンを達成し、チャンピオンシップのリードをさらに拡大したグランプリとなった。しかし土曜のスプリントではランド・ノリスがメルセデス以外で今季初の勝利を挙げ、マクラーレンの巻き返しを予感させる週末でもあった。
            </p>
            <p>
              激しい雷雨の予報を受け、決勝スタートは16時から13時へ3時間繰り上げ。当日朝に雨が降ったものの決勝時には止んでおり、不安定な空模様の下でのレースとなった。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              スプリント：ノリス完勝、メルセデス以外の初勝利
            </h2>
            <p>
              土曜のスプリントでは、ノリスがポールポジションから一度もトップを譲らず完勝。2026年シーズンでメルセデス以外のドライバーによる初の勝利を挙げた。マクラーレンはピアストリも2位に入り、1-2フィニッシュでチームの戦闘力を証明した。
            </p>
            <p>
              アントネッリはスタートで出遅れ、さらにレース後のペナルティで6位に降格。スプリント週末はスプリントでの苦戦パターンが定着しつつある。
            </p>
            <div className="rounded-xl border border-white/5 bg-flabo-carbon overflow-x-auto">
              <table className="w-full text-[0.82rem]">
                <thead className="text-flabo-grey font-display tracking-[0.12em] text-[0.6rem] uppercase">
                  <tr className="border-b border-white/5">
                    <th className="px-3 py-2 text-center w-12">順位</th>
                    <th className="px-3 py-2 text-left">ドライバー</th>
                    <th className="px-3 py-2 text-left">チーム</th>
                  </tr>
                </thead>
                <tbody>
                  {SPRINT.map((r) => (
                    <tr key={r.pos} className="border-b border-white/5 last:border-b-0">
                      <td className="px-3 py-2 text-center font-bold">{r.pos}</td>
                      <td className="px-3 py-2">{r.driver}</td>
                      <td className="px-3 py-2 text-flabo-grey">{r.team}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.7rem] text-flabo-grey">スプリント結果（トップ5）</p>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              予選ハイライト：アントネッリ3戦連続ポール、フェルスタッペンが復調
            </h2>
            <p>
              アントネッリが1分27秒798を叩き出し、3戦連続のポールポジションを獲得。1分27秒台に入ったのはアントネッリとフェルスタッペンの2人だけで、その差はわずか0.166秒。レッドブルが復調の兆しを見せた。3番手にルクレール、4番手にノリス。チームメイトのラッセルは5番手にとどまり、アントネッリとのギャップは0.4秒に広がった。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              決勝ハイライト：波乱のスタートからアントネッリが逆転制圧
            </h2>

            <div>
              <h3 className="font-bold text-base mb-2">3ワイドのスタート、フェルスタッペンのスピン</h3>
              <p>
                スタート直後から大混乱。アントネッリが第1コーナーでロックアップし、フェルスタッペンとルクレールとの3ワイドの争いに。ルクレールが首位を奪い、フェルスタッペンはターン2で360度スピンを喫して10番手まで後退した。
              </p>
              <p className="mt-3">
                4周目には、ハジャーの壁への接触と、ガスリーがローソンとの接触で横転するという衝撃的な事故が相次ぎ、セーフティカーが導入された。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">アントネッリ vs ノリス — 終盤の緊迫</h3>
              <p>
                レース後半、首位に返り咲いたアントネッリを、スプリント勝者のノリスが猛追。40周目には差が1秒を切り、マクラーレンが遂にメルセデスを捉えるかと思わせる展開に。しかしアントネッリは19歳とは思えない落ち着きでプレッシャーに屈せず、最後は3.264秒差でフィニッシュ。3連勝を達成した。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">ルクレール、最終ラップの悲劇</h3>
              <p>
                表彰台圏内を走っていたルクレールが最終ラップでスピン、壁に接触しサスペンションを破損。スロー走行を余儀なくされ、チェッカー直前でラッセルとフェルスタッペンに抜かれ8位に転落。20秒のタイムペナルティも加算され、フェラーリにとっては悔しすぎる結末だった。
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-4 pt-4">
              注目ポイント：Fラボ的マイアミGPの見どころ
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
                K. アントネッリ（Mercedes）1:27.798
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  FASTEST LAP
                </span>
                L. ノリス（McLaren）1:31.869（Lap 35）
              </p>
            </div>
          </section>

          <section className="pt-4 border-t border-white/10">
            <p className="text-[0.85rem] italic text-flabo-grey leading-relaxed">
              次戦は初のスプリント連戦となるカナダGP（5/22-24）。モントリオールの市街地コースでアントネッリの独走は続くのか。
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
