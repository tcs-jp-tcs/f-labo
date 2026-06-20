import { getSiteSettings } from "@/lib/settings";

/**
 * Amazonアソシエイト プロモバナー（TOP用）。
 * 目的はクリック誘導（Amazonに入ってもらう）なので、目立つCTAカードにする。
 *
 * 通常時: Supabase site_settings（key/value）駆動の F1グッズ テキストバナー
 *   amazon_keyword / amazon_headline / amazon_subtext / amazon_tag
 *   毎週の差し替えは site_settings の UPDATE 1行で済む（コード変更不要）。
 *
 * プライムデー期間中（2026-06-19〜2026-07-13 23:59 JST）は公式画像バナーに自動差し替え。
 *   期間が終われば自動で通常のテキストバナーに戻る（コード変更・削除不要）。
 */

// プライムデー2026 表示期間（JST）を UTC エポックで定義
// 開始: 2026-06-19 00:00 JST = 2026-06-18 15:00 UTC
// 終了: 2026-07-13 23:59 JST 終わり = 2026-07-14 00:00 JST = 2026-07-13 15:00 UTC
const PRIMEDAY_START = Date.UTC(2026, 5, 18, 15, 0, 0);
const PRIMEDAY_END = Date.UTC(2026, 6, 13, 15, 0, 0);
const PRIMEDAY_URL = "https://amzn.to/4xIb9d2";

function isPrimedayActive(): boolean {
  const now = Date.now();
  return now >= PRIMEDAY_START && now < PRIMEDAY_END;
}

/**
 * プライムデー2026 画像バナー（640×360・スマホ全幅／デスクトップは max-640px 中央寄せ）。
 * 画像の下に告知テキスト＋CTAボタンを付ける。期間外は本コンポーネント自体が
 * レンダリングされない（AmazonPromo の分岐）ため、下段ごと自動で非表示になる。
 */
function PrimedayBanner() {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      {/* 画像＋下段を1枚のカードに一体化（プライムデーブルー基調） */}
      <div className="overflow-hidden rounded-xl border border-[#0073E6]/50 shadow-lg shadow-[#0073E6]/15">
        {/* 上段: 公式画像バナー（画像部分がリンク） */}
        <a
          href={PRIMEDAY_URL}
          target="_blank"
          rel="sponsored noopener"
          aria-label="Amazonプライムデー 2026（外部サイト・PR）"
          className="block"
        >
          <img
            src="/images/primeday2026.jpg"
            alt="Amazonプライムデー 2026 7/10(金)〜7/13(月) 4日間のビッグセール"
            width={640}
            height={360}
            loading="lazy"
            className="block w-full h-auto"
          />
        </a>

        {/* 下段: 告知テキスト＋CTAボタン（バナーの青に合わせ画像と地続き） */}
        <div className="bg-gradient-to-b from-[#0F8FF0] to-[#0073E6] px-5 py-4 md:px-6 md:py-5 text-center">
          <p className="font-black text-base md:text-lg leading-tight text-white">
            先行セールは7/7(火)スタート！
          </p>
          <p className="text-[0.85rem] text-white/85 mt-1.5">
            ポイントアップキャンペーン エントリー受付中
          </p>
          <a
            href={PRIMEDAY_URL}
            target="_blank"
            rel="sponsored noopener"
            aria-label="セール会場をチェック（外部サイト・PR）"
            className="mt-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-display font-bold tracking-[0.12em] text-sm text-[#0073E6] shadow-md transition-colors hover:bg-[#001F3F] hover:text-white"
          >
            セール会場をチェック →
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function AmazonPromo() {
  // プライムデー期間中は公式画像バナーを表示し、期間外は下の通常バナーへ
  if (isPrimedayActive()) {
    return <PrimedayBanner />;
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
