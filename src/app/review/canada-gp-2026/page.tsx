import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title:
    "2026 F1 第5戦 カナダGP レビュー | 史上初の4連勝、そして雨と波乱のモントリオール | Fラボ",
  description:
    "アントネッリがF1史上初のキャリア初4連勝。ラッセルのリードからのリタイア、マクラーレンのタイヤ戦略大失敗、ハミルトンvsフェルスタッペンの名バトル——2026カナダGPをFラボの視点で振り返る。",
};

const RESULTS = [
  { pos: 1, driver: "K. アントネッリ", team: "Mercedes", gap: "WINNER" },
  { pos: 2, driver: "L. ハミルトン", team: "Ferrari", gap: "+10.768s" },
  { pos: 3, driver: "M. フェルスタッペン", team: "Red Bull", gap: "+11.276s" },
  { pos: 4, driver: "C. ルクレール", team: "Ferrari", gap: "+44.151s" },
  { pos: 5, driver: "I. ハジャー", team: "Red Bull", gap: "+1 LAP" },
  { pos: 6, driver: "F. コラピント", team: "Alpine", gap: "+1 LAP" },
  { pos: 7, driver: "L. ローソン", team: "Racing Bulls", gap: "+1 LAP" },
  { pos: 8, driver: "P. ガスリー", team: "Alpine", gap: "+1 LAP" },
  { pos: 9, driver: "C. サインツ", team: "Williams", gap: "+1 LAP" },
  { pos: 10, driver: "O. ベアマン", team: "Haas", gap: "+1 LAP" },
];

const HIGHLIGHTS = [
  {
    emoji: "🏆",
    title: "アントネッリ、19歳で歴史を塗り替える",
    body: "中国GP、日本GP、マイアミGP、そしてカナダGP。キャリア最初の4勝を全て連続で挙げたドライバーはF1の70年以上の歴史で初めて。43ポイントのリードはもはや独走態勢。ラッセルも「タイトルはアントネッリのものだ」と認めるほどだ。",
  },
  {
    emoji: "💔",
    title: "ラッセルの不運と怒り",
    body: "スプリント優勝、ポールポジション、そしてレースでも首位を走りながらのリタイア。「まるでタイトルから遠ざける力が働いているかのようだ」というラッセルの言葉が印象的。速さは間違いなくあるだけに、信頼性が足を引っ張る展開は見ていて辛い。",
  },
  {
    emoji: "🤝",
    title: "ハミルトン vs フェルスタッペン、2021年の再来",
    body: "かつてF1史上最も激しいタイトル争いを繰り広げた2人が、再びホイール・トゥ・ホイールのバトルを見せてくれた。今回はタイトルを争う立場ではないが、だからこそ純粋にレーシングとして楽しめた。チャンピオン同士のプライドがぶつかり合う瞬間は、何度見ても胸が熱くなる。",
  },
  {
    emoji: "😩",
    title: "マクラーレン、踏んだり蹴ったり",
    body: "雨を読み違えたインターミディエイト選択、ピアストリの接触、ノリスのギアボックストラブル。負の連鎖が止まらなかった。ディフェンディングチャンピオンとして巻き返しが求められる。",
  },
];

export default function CanadaGpReview2026() {
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
              Round 5
            </span>
            <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
              🇨🇦 カナダGP
            </span>
            <span className="text-[0.7rem] text-flabo-grey ml-auto">2026年5月25日</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl leading-snug mb-3">
            2026 F1 第5戦 カナダGP レビュー
          </h1>
          <p className="text-flabo-grey text-sm md:text-base leading-relaxed">
            史上初の4連勝、そして雨と波乱のモントリオール
          </p>
        </header>

        <div className="space-y-8 text-[0.9rem] md:text-[0.95rem] leading-[1.85] text-white/85">
          <section className="space-y-4">
            <p>
              2026年F1第5戦カナダGPは、メルセデスのキミ・アントネッリがキャリア初勝利からの4連勝という、F1史上誰も成し遂げたことのない偉業を達成したグランプリとなった。しかしその裏では、チームメイト・ラッセルのリード中のまさかのリタイア、マクラーレンのタイヤ戦略大失敗、そして2人のワールドチャンピオンによる終盤の名バトルと、68周のレースに詰め込まれたドラマはあまりに濃密だった。
            </p>
            <p>
              週末を通じてメルセデスの速さは圧倒的で、大規模アップデートの効果は明白。ラッセルがスプリント予選からスプリント、予選と連続でトップに立ち、アントネッリとの0.068秒差がこのチームメイト対決の激しさを物語っていた。
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              スプリント：ラッセル制圧、しかし火種も
            </h2>
            <p>
              ラッセルがスプリントでも勝利を収め、ポール・トゥ・ウィンを達成。しかしこのスプリントでは、ラッセルとアントネッリの間にピリピリした空気が漂い始めていた。「今のは相当汚い」とアントネッリが無線で声を荒らげる場面もあり、翌日の決勝に向けて火種が残るスプリントとなった。優勝争い以外は大きな動きがなく、下位チームは決勝に向けたデータ収集に徹している印象だった。
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              予選ハイライト：ラッセルがアントネッリの連続ポールを阻止
            </h2>
            <p>
              ジョージ・ラッセルが3年連続のカナダGPポールポジションを獲得。アントネッリの連続ポール記録をここで止めた。メルセデスがフロントロウを独占し、大規模アップデートの成果を見せつけた形だ。3番手にはノリス、4番手にピアストリとマクラーレンが続き、この時点では決勝もメルセデス対マクラーレンの構図が予想された。フェルスタッペンは6番手に沈み、「セットアップを変えても苦戦した」と予選後にこぼしている。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              決勝ハイライト：3度のフォーメーションラップから始まった68周の激闘
            </h2>

            <div>
              <h3 className="font-bold text-base mb-2">スタート前の混乱</h3>
              <p>
                レース直前に雨がパラつき、タイヤ選択が大きく分かれた。大半のドライバーがスリックタイヤ（ソフトまたはミディアム）を選ぶ中、マクラーレンがインターミディエイトを装着するという大胆な賭けに出た。
              </p>
              <p className="mt-3">
                さらにスタート手順でも波乱が起きる。信号システムのトラブルでスタートが切れず、エクストラフォーメーションラップへ。その最中、レーシング・ブルズのリンドブラッドがギアボックストラブルでストップし、マシン撤去のためにさらにもう1周。結局3回目のフォーメーションラップでようやくレースが始まり、規定周回数は70周から68周に短縮された。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">マクラーレンの誤算</h3>
              <p>
                スタートではインターミディエイトのノリスが一気に首位に躍り出る。しかし路面はすでにほぼ乾いており、ウェットタイヤの優位はあっという間に消えた。1周目終わりにピアストリがピットイン、2周目にはノリスも続いてピットに飛び込み、スリックタイヤへ交換。この時点で両者とも後方に沈んだ。
              </p>
              <p className="mt-3">
                焦りからかピアストリは無理なオーバーテイクを仕掛け、ウィリアムズのアルボンに接触して撃沈。自身もダメージを抱えて11位に終わる。その後ノリスもギアボックストラブルでリタイア。マクラーレンにとってはまさに「踏んだり蹴ったり」の週末だった。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">メルセデス同士の死闘</h3>
              <p>
                マクラーレンが消えた後、レースの主役はメルセデスの2台になった。アントネッリとラッセルが抜きつ抜かれつの激しいバトルを展開。24周目には接触し、アントネッリがコース外に逃れる場面も。チームから順位を戻すよう指示が出るなど、チームメイト同士とは思えない限界ギリギリの攻防が続いた。
              </p>
              <p className="mt-3">
                しかし30周目、首位を走るラッセルのマシンが突如スローダウン。パワーユニット（バッテリー系統）の故障だった。失意のラッセルはヘッドレストをトラックに投げつけ、グローブを地面に叩きつけた。この行為は後に「危険行為」として罰金処分を受けることになる。レース後、ラッセルは「あと40周バトルしたかった。あの戦いは最高だった」と悔しさをにじませた。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">チャンピオン同士の名バトル</h3>
              <p>
                ラッセルがいなくなった後、レースの注目は2位争いに移った。フェルスタッペンが9周目にハミルトンを抜いて2位に浮上し、しばらくリードを築く。このまま逃げ切るかと思われた。
              </p>
              <p className="mt-3">
                しかし終盤、ハミルトンが猛然とペースを上げて追いつく。62周目、タイヤのグリップが落ちたフェルスタッペンに対し、ハミルトンがターン1で鮮やかにオーバーテイク。2021年のタイトル争いを彷彿とさせる、ワールドチャンピオン同士のバトルだった。ハミルトンはフェラーリ移籍後の最高位となる2位、フェルスタッペンは今季初の表彰台を手にした。
              </p>
              <p className="mt-3">
                レース後、ハミルトンは「最高のバトルだった。グレートの1人と戦えて光栄だ」とコメント。フェルスタッペンも「前の方でレースができるのは気持ちがいい。ルイスとのバトルも楽しかった」と互いの健闘を称え合った。
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-4 pt-4">
              注目ポイント：Fラボ的カナダGPの見どころ
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
                G. ラッセル（Mercedes）1:12.578
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  FASTEST LAP
                </span>
                K. アントネッリ（Mercedes）1:14.210
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  DNF
                </span>
                G. ラッセル（PU故障）／ L. ノリス（ギアボックス）／ F. アロンソ／ A. アルボン／ S. ペレス
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  DNS
                </span>
                A. リンドブラッド（ギアボックス）
              </p>
            </div>
          </section>

          <section className="pt-4 border-t border-white/10">
            <p className="text-[0.85rem] italic text-flabo-grey leading-relaxed">
              次戦は欧州ラウンド開幕のモナコGP（6/5-7）。市街地コースでアントネッリの連勝は続くのか、それともラッセルのリベンジなるか。
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
