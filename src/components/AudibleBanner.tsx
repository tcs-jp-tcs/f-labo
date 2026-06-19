/**
 * Audible（Amazonオーディオブック）プロモバナー。
 *
 * 告知部分は元スクショ（audible-promo.png）が超横長(2076×124)で、640px幅では
 * 高さ約38pxにしかならず文字が読めない。画像はどの幅でも比率固定で拡大できないため、
 * 告知は画像をやめてテキストで再現（サイズ自由・くっきり・老眼配慮）。
 * Audibleロゴ（audible-logo.png）だけ実画像を小さなチップで使う。
 *
 * 表示期間: 〜2026-07-15 23:59 JST。期間外は何も描画しない（自動非表示）。
 * ヘッダー直下・最上部に配置する。
 */

// 表示終了（JST）: 2026-07-15 23:59 終わり = 2026-07-16 00:00 JST = 2026-07-15 15:00 UTC
const AUDIBLE_END = Date.UTC(2026, 6, 15, 15, 0, 0);
const AUDIBLE_URL = "https://amzn.to/4vZXYCt";

function isAudibleActive(): boolean {
  return Date.now() < AUDIBLE_END;
}

export default function AudibleBanner() {
  if (!isAudibleActive()) return null;

  return (
    <div className="mx-auto w-full max-w-[640px]">
      {/* カード全体がアフィリエイトリンク。青基調（Audible告知バナーの色）で一体化 */}
      <a
        href={AUDIBLE_URL}
        target="_blank"
        rel="sponsored noopener"
        aria-label="Audible（Amazonのオーディオブック）プレミアムプラン3か月間無料体験へ（外部サイト・PR）"
        className="group block overflow-hidden rounded-xl border border-[#1399FF]/50 bg-gradient-to-br from-[#4a74ea] via-[#3b63dd] to-[#2f50c4] px-4 py-4 text-center shadow-lg shadow-[#2f50c4]/25 transition-all duration-300 hover:border-[#1399FF] hover:-translate-y-0.5 hover:shadow-[#2f50c4]/40"
      >
        {/* Audibleロゴ（小さな白チップ＝3） */}
        <span className="inline-flex rounded-md bg-white px-2.5 py-1 shadow-sm">
          <img
            src="/images/audible-logo.png"
            alt="Audible（オーディブル）an amazon company"
            width={366}
            height={154}
            loading="lazy"
            className="block h-auto w-full max-w-[84px]"
          />
        </span>

        {/* 告知テキスト（主役＝7・読みやすく） */}
        <p className="mt-2.5 text-[0.7rem] font-bold text-white/90 md:text-[0.78rem]">
          【Amazonプライム会員限定】
        </p>
        <p className="mt-0.5 text-base font-black leading-snug text-white md:text-lg">
          プレミアムプラン3か月間無料体験
        </p>
        <p className="mt-0.5 text-[0.68rem] text-white/75">※適用条件あり</p>

        {/* CTAピル（ネイビー） */}
        <span className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#1f2d4a] px-5 py-2 font-display text-[0.8rem] font-bold tracking-[0.08em] text-white shadow-md transition-colors group-hover:bg-white group-hover:text-[#1f2d4a]">
          プレミアムプランを試す →
        </span>
      </a>
    </div>
  );
}
