import { AssociateDisclosure } from "@/components/AmazonPromo";

/**
 * Audible（Amazonオーディオブック）プロモバナー。
 * 公式スクショから切り抜いた画像2枚を縦に重ねて1枚のカードに:
 *   public/images/audible-logo.png   … Audibleロゴ（an amazon company）366×154
 *   public/images/audible-promo.png  … 青い告知バナー（プレミアムプラン3か月無料体験）2076×124・超横長
 *
 * ロゴは小さい/白地、告知バナーは超横長のため、単純な全幅重ねだと崩れる。
 * 上=白地のロゴ帯（ロゴは中央・適正幅）／下=青バナー全幅、の2トーンで一体化する。
 *
 * 表示期間: 〜2026-07-15 23:59 JST。期間外は何も描画しない（自動非表示）。
 * ヘッダー直下・プライムデーバナーの上に配置する。
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
        aria-label="Audible（Amazonのオーディオブック）プレミアムプラン3か月無料体験へ（外部サイト・PR）"
        className="group block overflow-hidden rounded-xl border border-[#1399FF]/50 shadow-lg shadow-[#1399FF]/15 transition-all duration-300 hover:border-[#1399FF] hover:-translate-y-0.5 hover:shadow-[#1399FF]/25"
      >
        {/* 上: Audibleロゴ帯（白地・中央・適正幅） */}
        <div className="flex justify-center bg-white px-4 py-3">
          <img
            src="/images/audible-logo.png"
            alt="Audible（オーディブル）an amazon company"
            width={366}
            height={154}
            loading="lazy"
            className="block h-auto w-full max-w-[180px]"
          />
        </div>
        {/* 下: 青い告知バナー（プレミアムプラン3か月間無料体験）全幅 */}
        <img
          src="/images/audible-promo.png"
          alt="【Amazonプライム会員限定】プレミアムプラン3か月間無料体験 ※適用条件あり"
          width={2076}
          height={124}
          loading="lazy"
          className="block w-full h-auto"
        />
      </a>

      <AssociateDisclosure />
    </div>
  );
}
