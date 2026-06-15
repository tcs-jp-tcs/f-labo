import { getSiteSettings } from "@/lib/settings";

/**
 * Amazonアソシエイト プロモバナー（TOP用）。
 * 目的はクリック誘導（Amazonに入ってもらう）なので、目立つCTAカードにする。
 *
 * リンク内容は Supabase site_settings（key/value）から取得:
 *   amazon_keyword / amazon_headline / amazon_subtext / amazon_tag
 * 毎週の差し替えは site_settings の UPDATE 1行で済む（コード変更不要）。
 */
export default async function AmazonPromo() {
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
      {/* 開示テキスト（必須・削除しない） */}
      <p className="text-[0.7rem] text-flabo-grey leading-relaxed mt-2 px-1">
        当サイトは、Amazon.co.jpを宣伝しリンクすることで紹介料を得る手段を提供する、Amazonアソシエイト・プログラムの参加者です。
      </p>
    </div>
  );
}
