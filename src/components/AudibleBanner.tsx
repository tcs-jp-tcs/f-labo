/**
 * Audible（Amazonオーディオブック）プロモバナー。
 * 最初のデザイン（画像2枚の縦積み）を踏襲。比率は白(ロゴ)3 : 青(告知画像)7。
 *   public/images/audible-logo.png   … Audibleロゴ（小さな白帯＝3）
 *   public/images/audible-promo.png  … 青い告知バナー画像（主役＝7）
 *
 * 表示期間: 〜2026-07-15 23:59 JST。期間外は何も描画しない（自動非表示）。
 * ヘッダー直下・最上部に配置する。開示文はプライムデーバナー側に1つ残るため本バナーには付けない。
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
      {/* 画像2枚を縦に重ねて1枚のカードに（全体がアフィリエイトリンク） */}
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
            className="block h-auto w-full max-w-[72px]"
          />
        </div>
        {/* 下: 青い告知バナー（プレミアムプラン3か月間無料体験）全幅＝主役7 */}
        <img
          src="/images/audible-promo.png"
          alt="【Amazonプライム会員限定】プレミアムプラン3か月間無料体験 ※適用条件あり"
          width={2076}
          height={124}
          loading="lazy"
          className="block w-full h-auto"
        />
      </a>
    </div>
  );
}
