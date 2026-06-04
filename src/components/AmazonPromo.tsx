/**
 * Amazonアソシエイト プロモバナー（TOP用）。
 * 目的はクリック誘導（Amazonに入ってもらう）なので、目立つCTAカードにする。
 *
 * リンクURLはこの1定数で管理。キーワードを差し替える場合は k= の値を変更する。
 * tag（tcsjptcs-22）は確定済み・変更不可。
 */
const AMAZON_URL = "https://www.amazon.co.jp/s?k=モナコ+F1&tag=tcsjptcs-22";

export default function AmazonPromo() {
  return (
    <div>
      <a
        href={AMAZON_URL}
        target="_blank"
        rel="sponsored nofollow noopener"
        aria-label="モナコGP特集 AmazonでF1グッズを探す（外部サイト・PR）"
        className="group block rounded-xl border border-flabo-red/40 bg-gradient-to-r from-flabo-red/20 via-flabo-carbon to-flabo-carbon px-5 py-5 md:px-7 md:py-6 transition-all duration-300 hover:border-flabo-red hover:-translate-y-0.5 hover:shadow-lg hover:shadow-flabo-red/20"
      >
        <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="font-display tracking-[0.2em] text-[0.55rem] text-flabo-red uppercase mb-1.5">
              PR · Amazon
            </div>
            <h3 className="font-black text-lg md:text-xl leading-tight">
              🏁 モナコGP特集｜AmazonでF1グッズを探す
            </h3>
            <p className="text-[0.8rem] text-white/65 mt-1.5">
              ミニカー・キャップ・ウェア・書籍など、最新グッズをチェック。
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-flabo-red px-6 py-3 font-display font-bold tracking-[0.12em] text-sm text-white transition-colors group-hover:bg-white group-hover:text-flabo-red">
            Amazonで見る →
          </span>
        </div>
      </a>
      {/* 開示テキスト（必須・削除しない） */}
      <p className="text-[0.6rem] text-flabo-grey leading-relaxed mt-2 px-1">
        当サイトは、Amazon.co.jpを宣伝しリンクすることで紹介料を得る手段を提供する、Amazonアソシエイト・プログラムの参加者です。
      </p>
    </div>
  );
}
