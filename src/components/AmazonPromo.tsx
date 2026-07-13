import { getSiteSettings } from "@/lib/settings";

/**
 * Amazonアソシエイト プロモバナー（TOP用）。
 * 目的はクリック誘導（Amazonに入ってもらう）なので、目立つCTAカードにする。
 *
 * 通常時: Supabase site_settings（key/value）駆動の F1グッズ テキストバナー
 *   amazon_keyword / amazon_headline / amazon_subtext / amazon_tag
 *   毎週の差し替えは site_settings の UPDATE 1行で済む（コード変更不要）。
 *
 * 夏バテ・エナジードリンク特集 期間中は画像バナー（絵のみ＋HTMLの告知帯）に自動差し替え。
 *   期間が終われば自動で通常のテキストバナーに戻る（コード変更・削除不要）。
 */

// エナジードリンク特集 表示期間（JST）を UTC エポックで定義
// 終了: 2026-09-01 00:00 JST = 2026-08-31 15:00 UTC（夏の間表示。要調整可）
const ENERGY_END = Date.UTC(2026, 7, 31, 15, 0, 0);
const ENERGY_URL =
  "https://www.amazon.co.jp/s?k=エナジードリンク&i=food-beverage&linkCode=ll2&tag=tcsjptcs-22&linkId=f671fa3ebf31d1a894e6377c366bf634";

function isEnergyActive(): boolean {
  return Date.now() < ENERGY_END;
}

/**
 * 夏バテ・エナジードリンク特集 画像バナー（スマホ全幅／デスクトップは max-640px 中央寄せ）。
 * 画像は帯なしのコミック絵（energy-drink-2026.jpg）を使い、下段の告知帯（コピー＋ボタン）は
 * HTML/CSSで実装（Amazonカラー：濃紺#232F3E＋オレンジ#FF9900）。期間外は本コンポーネント
 * 自体がレンダリングされない（AmazonPromo の分岐）ため、下段ごと自動で非表示になる。
 */
function EnergyBanner() {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      {/* 画像＋下段を1枚のカードに一体化（Amazon濃紺×オレンジ基調） */}
      <div className="overflow-hidden rounded-xl border border-[#FF9900]/40 shadow-lg shadow-black/25">
        {/* 上段: コミック絵（画像部分がリンク） */}
        <a
          href={ENERGY_URL}
          target="_blank"
          rel="sponsored noopener"
          aria-label="夏バテしてない？観戦のお供にエナジードリンク特集（外部サイト・PR）"
          className="block"
        >
          <img
            src="/images/energy-drink-2026.jpg"
            alt="夏バテしてない？観戦のお供に エナジードリンク特集"
            width={1280}
            height={714}
            loading="lazy"
            className="block w-full h-auto"
          />
        </a>

        {/* 下段: 告知帯（HTML実装・Amazonカラー 濃紺#232F3E＋オレンジ#FF9900） */}
        <div className="bg-[#232F3E] px-5 py-4 md:px-6 md:py-5 text-center">
          <div className="font-display tracking-[0.2em] text-[0.65rem] text-[#FF9900] uppercase mb-1.5">
            PR · Amazon
          </div>
          <p className="font-black text-base md:text-lg leading-tight text-white">
            夏バテしてない？
          </p>
          <p className="text-[0.85rem] text-white/80 mt-1.5">
            観戦のお供に エナジードリンク特集
          </p>
          <a
            href={ENERGY_URL}
            target="_blank"
            rel="sponsored noopener"
            aria-label="エナジードリンク特集をチェック（外部サイト・PR）"
            className="mt-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF9900] px-6 py-3 font-display font-bold tracking-[0.12em] text-sm text-[#232F3E] shadow-md transition-colors hover:bg-white"
          >
            今すぐチェック →
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function AmazonPromo() {
  // エナジードリンク特集 期間中は画像バナーを表示し、期間外は下の通常バナーへ
  if (isEnergyActive()) {
    return <EnergyBanner />;
  }

  const s = await getSiteSettings();
  const keyword = s.amazon_keyword || "F1";
  const tag = s.amazon_tag || "tcsjptcs-22";
  const headline = s.amazon_headline || "AmazonでF1グッズを探す";
  const subtext =
    s.amazon_subtext || "ミニカー・キャップ・ウェア・書籍など、最新グッズをチェック。";

  // keyword は URL エンコード。tag は確定値だが念のためエンコード。
  const url = `https://www.amazon.co.jp/s?k=${encodeURIComponent(
    keyword,
  )}&tag=${encodeURIComponent(tag)}`;

  return (
    <div>
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener"
        aria-label={`${headline}（外部サイト・PR）`}
        className="group block rounded-xl border border-flabo-red/40 bg-gradient-to-r from-flabo-red/20 via-flabo-carbon to-flabo-carbon px-5 py-5 md:px-7 md:py-6 transition-all duration-300 hover:border-flabo-red hover:-translate-y-0.5 hover:shadow-lg hover:shadow-flabo-red/20"
      >
        <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="font-display tracking-[0.2em] text-[0.7rem] text-flabo-red uppercase mb-1.5">
              PR · Amazon
            </div>
            <h3 className="font-black text-lg md:text-xl leading-tight">
              🏁 {headline}
            </h3>
            <p className="text-[0.8rem] text-white/65 mt-1.5">{subtext}</p>
          </div>
          <span className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-flabo-red px-6 py-3 font-display font-bold tracking-[0.12em] text-sm text-white transition-colors group-hover:bg-white group-hover:text-flabo-red">
            Amazonで見る →
          </span>
        </div>
      </a>
    </div>
  );
}
