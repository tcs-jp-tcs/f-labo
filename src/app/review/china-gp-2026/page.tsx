import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title:
    "2026 F1 第2戦 中国GP レビュー | アントネッリ初優勝、イタリアに20年ぶりの歓喜 | Fラボ",
  description:
    "19歳のアントネッリがキャリア初優勝。イタリア人としては2006年フィジケラ以来20年ぶりのF1勝利。フェラーリのロケットスタート、マクラーレン2台DNS——上海をFラボの視点で振り返る。",
};

const SPRINT = [
  { pos: 1, driver: "G. ラッセル", team: "Mercedes" },
  { pos: 2, driver: "C. ルクレール", team: "Ferrari" },
  { pos: 3, driver: "L. ハミルトン", team: "Ferrari" },
  { pos: 4, driver: "L. ノリス", team: "McLaren" },
  { pos: 5, driver: "K. アントネッリ", team: "Mercedes" },
];

const RESULTS = [
  { pos: 1, driver: "K. アントネッリ", team: "Mercedes", gap: "1:33:15.607" },
  { pos: 2, driver: "G. ラッセル", team: "Mercedes", gap: "+5.515s" },
  { pos: 3, driver: "L. ハミルトン", team: "Ferrari", gap: "+25.267s" },
  { pos: 4, driver: "C. ルクレール", team: "Ferrari", gap: "+28.894s" },
  { pos: 5, driver: "O. ベアマン", team: "Haas", gap: "+57.268s" },
  { pos: 6, driver: "P. ガスリー", team: "Alpine", gap: "+59.647s" },
  { pos: 7, driver: "L. ローソン", team: "Racing Bulls", gap: "+1:20.588s" },
  { pos: 8, driver: "I. ハジャー", team: "Red Bull", gap: "+1:27.247s" },
  { pos: 9, driver: "C. サインツJr.", team: "Williams", gap: "+1 LAP" },
  { pos: 10, driver: "F. コラピント", team: "Alpine", gap: "+1 LAP" },
];

const HIGHLIGHTS = [
  {
    emoji: "🚀",
    title: "フェラーリのスタート、今年はヤバい",
    body: "開幕戦に続き、フェラーリのスタートが異次元。ハミルトンが3番グリッドから1コーナーで首位に立つロケットスタートを見せた。新レギュレーションのクラッチ制御でフェラーリが何かを掴んでいるのは明白。序盤の抜きつ抜かれつのバトルも含めて、今年のフェラーリは「スタートだけは」確実に速い。",
  },
  {
    emoji: "🏆",
    title: "アントネッリ、泣きの初優勝",
    body: "19歳202日でF1勝利。イタリア人としては20年ぶり。表彰台で父親と抱き合い、ハミルトンが隣で微笑む。自分がメルセデスのシートを譲った若者が、そのマシンで初勝利を挙げる瞬間を見届けるハミルトンの姿も印象的だった。",
  },
  {
    emoji: "💔",
    title: "マクラーレン2台DNS、新PUの信頼性に暗雲",
    body: "開幕戦でピアストリがレコノサンスラップでクラッシュ（DNS）、そして中国GPでは2台揃って電気系トラブルでDNS。ディフェンディングチャンピオンチームがまさかの連続不出走。新レギュレーションのPU信頼性が序盤戦の大きなテーマになっている。",
  },
  {
    emoji: "🔥",
    title: "ハミルトン vs ルクレール、チーム内バトル勃発",
    body: "フェラーリの2人が3位争いで火花を散らした。25周目から40周目まで、何度も抜きつ抜かれつ。チームメイト同士とは思えない激しさで、フェラーリ内部のパワーバランスが早くも揺れ始めている。",
  },
];

export default function ChinaGpReview2026() {
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
              Round 2
            </span>
            <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
              🇨🇳 中国GP
            </span>
            <span className="text-[0.7rem] text-flabo-grey ml-auto">2026年3月15日</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl leading-snug mb-3">
            2026 F1 第2戦 中国GP レビュー
          </h1>
          <p className="text-flabo-grey text-sm md:text-base leading-relaxed">
            アントネッリ初優勝、イタリアに20年ぶりの歓喜
          </p>
        </header>

        <div className="space-y-8 text-[0.9rem] md:text-[0.95rem] leading-[1.85] text-white/85">
          <section className="space-y-4">
            <p>
              2026年F1第2戦は、23万人の観客が集まった上海インターナショナル・サーキットが舞台。今季初のスプリント週末で、土曜のスプリントはラッセルが制し開幕2連勝。しかし日曜の決勝では、19歳のアントネッリがキャリア初優勝を飾り、イタリア人ドライバーとしては2006年マレーシアGPのフィジケラ以来、実に20年ぶりのF1勝利を記録した。
            </p>
            <p>
              メルセデスの強さが際立つ一方で、フェラーリのスタートの速さと序盤のバトルの激しさ、そしてマクラーレン2台のまさかのDNSと、新レギュレーション時代のF1が持つ面白さと危うさが同居した週末だった。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              スプリント：ラッセル連勝、ハミルトンとの序盤バトルが白熱
            </h2>
            <p>
              ラッセルがスプリントポールから優勝し、開幕戦に続く連勝。しかし簡単なレースではなかった。スタートでハミルトンが猛然と襲いかかり、1コーナーやヘアピンでアウト側から抜き返すなどの激しい首位争いを展開。ここでもフェラーリのスタートの良さが光った。
            </p>
            <p>
              終盤にはセーフティカーが導入され、ルクレールが背後に迫る緊迫の展開に。ラッセルはソフトタイヤに交換してリスタートを凌ぎ、1秒差以内で逃げ切った。アントネッリは1周目の接触で10秒ペナルティを受けたが、そこから5位まで挽回している。
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
              予選ハイライト：アントネッリ、史上最年少ポール
            </h2>
            <p>
              アントネッリが1分32秒064で自身初のポールポジションを獲得。19歳202日でのPP獲得は、セバスチャン・ベッテルの記録を更新する史上最年少記録となった。チームメイトのラッセルはギアボックスの不具合に見舞われながらも2番手タイムを記録。メルセデスがフロントロウを独占した。
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4">
              決勝ハイライト：ロケットスタートのフェラーリ、しかしアントネッリが制す
            </h2>

            <div>
              <h3 className="font-bold text-base mb-2">またもフェラーリのロケットスタート</h3>
              <p>
                開幕戦に続き、フェラーリのスタートが炸裂。3番グリッドのハミルトンが1コーナーでアントネッリとラッセルの両方を抜き去り、いきなり首位に立った。新レギュレーションのスタートでは、フェラーリが明らかにアドバンテージを持っている。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">序盤の抜きつ抜かれつ</h3>
              <p>
                しかしアントネッリは2周目のバックストレートですぐにハミルトンを抜き返し首位を奪還。ラッセルも3周目の1コーナーでルクレールをパスして挽回。メルセデスとフェラーリが入り乱れる、開幕戦の再現のような序盤のバトルが展開された。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">マクラーレン、まさかの2台DNS</h3>
              <p>
                一方、マクラーレンのノリスとピアストリは電気系トラブルによりフォーメーションラップにすら出られずDNS。ディフェンディングチャンピオンチームにとって、2台揃ってのDNSは衝撃的だった。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">アントネッリ、初優勝の瞬間</h3>
              <p>
                10周目にストロール（アストンマーティン）がコース上で停止しセーフティカーが導入。上位陣はこのタイミングでピットに入り、アントネッリはハードタイヤに交換。リスタート後は一度も首位を脅かされることなくレースをコントロールした。
              </p>
              <p className="mt-3">
                残り3周、最終コーナーでワイドになり2秒を失うヒヤリとする場面もあったが、リードを守り切ってチェッカー。無線では「信じられない。正直、泣きそうだ」と感情を爆発させた。19歳202日でのF1勝利は、フェルスタッペンに次ぐ史上2番目の最年少記録。メルセデスは開幕2戦連続で1-2フィニッシュを達成した。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">ハミルトン vs ルクレール — フェラーリ同士の激闘</h3>
              <p>
                レース中盤から終盤にかけて、ハミルトンとルクレールが熾烈な3位争いを展開。25周目から40周目にかけて何度も順位が入れ替わるバトルを繰り広げ、最終的にハミルトンが3位を死守。フェラーリ移籍後初の表彰台を手にした。
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-4 pt-4">
              注目ポイント：Fラボ的中国GPの見どころ
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
                K. アントネッリ（Mercedes）1:32.064
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  FASTEST LAP
                </span>
                K. アントネッリ（Mercedes）1:35.275（Lap 52）
              </p>
              <p>
                <span className="font-display tracking-[0.12em] text-[0.65rem] text-flabo-grey mr-2">
                  DNS
                </span>
                L. ノリス／ O. ピアストリ（電気系トラブル）
              </p>
            </div>
          </section>

          <section className="pt-4 border-t border-white/10">
            <p className="text-[0.85rem] italic text-flabo-grey leading-relaxed">
              次戦は2週間後の第3戦日本GP（3/27-29）。鈴鹿でアントネッリの勢いは続くのか、それともラッセルが巻き返すか。
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
