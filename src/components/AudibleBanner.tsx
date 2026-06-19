/**
 * Audible（Amazonオーディオブック）プロモバナー。
 * 上=Audibleロゴ（白地・小さく＝3）／下=青い告知（主役＝7）。
 *
 * 青い告知は元スクショ(audible-promo.png)が超横長(2076×124)で、スマホ幅では高さ約20px・
 * 文字が潰れて読めない（画像なので拡大も縦長化も不可）。そのため青はテキストで再現し、
 * 大きく読めるようにする。Audibleロゴだけ実画像(audible-logo.png)を小さく使う。
 *
 * 表示期間: 〜2026-07-15 23:59 JST。期間外は何も描画しない（自動非表示）。
 * ヘッダー直下・最上部に配置。開示文はプライムデーバナー側に1つ残るため付けない。
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
      {/* カード全体がアフィリエイトリンク */}
      <a
        href={AUDIBLE_URL}
        target="_blank"
        rel="sponsored noopener"
        aria-label="Audible（Amazonのオーディオブック）プレミアムプラン3か月間無料体験へ（外部サイト・PR）"
        className="group block overflow-hidden rounded-xl border border-[#1399FF]/50 shadow-lg shadow-[#1399FF]/15 transition-all duration-300 hover:border-[#1399FF] hover:-translate-y-0.5 hover:shadow-[#1399FF]/25"
      >
        {/* 上: Audibleロゴ帯（白地・小さく＝3） */}
        <div className="flex justify-center bg-white px-3 py-1">
          <img
            src="/images/audible-logo.png"
            alt="Audible（オーディブル）an amazon company"
            width={366}
            height={154}
            loading="lazy"
            className="block h-auto w-full max-w-[60px]"
          />
        </div>

        {/* 下: 青い告知（主役＝7・テキストで大きく読める） */}
        <div className="bg-gradient-to-br from-[#4a74ea] via-[#3b63dd] to-[#2f50c4] px-4 py-3.5 text-center">
          <p className="text-[0.64rem] font-bold leading-none text-white/90 md:text-[0.72rem]">
            【Amazonプライム会員限定】
          </p>
          <p className="mt-1 text-base font-black leading-tight text-white md:text-lg">
            プレミアムプラン3か月間無料体験
          </p>
          <p className="mt-0.5 text-[0.6rem] leading-none text-white/75">
            ※適用条件あり
          </p>
          <span className="mt-2.5 inline-flex items-center justify-center gap-2 rounded-full bg-[#1f2d4a] px-4 py-1.5 font-display text-[0.76rem] font-bold tracking-[0.06em] text-white shadow-md transition-colors group-hover:bg-white group-hover:text-[#1f2d4a]">
            プレミアムプランを試す →
          </span>
        </div>
      </a>
    </div>
  );
}
