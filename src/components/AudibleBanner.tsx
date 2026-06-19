import { AssociateDisclosure } from "@/components/AmazonPromo";

/**
 * Audible（Amazonオーディオブック）プロモバナー。
 * 公式スクショから切り抜いた画像2枚（青ヘッダー＋メインビジュアル）を縦に重ねて1枚のカードに。
 *
 * 画像（和博さんがブラウザのスクショから切り抜いて配置）:
 *   public/images/audible-top-banner.png  … 青いヘッダー（プレミアムプラン3か月無料体験）
 *   public/images/audible-main-banner.png … メインビジュアル（Amazonのオーディオブック・書影入り）
 *
 * 表示期間: 〜2026-07-15 23:59 JST。期間外は本コンポーネントが何も描画しない（自動非表示）。
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
        aria-label="Audible（Amazonのオーディオブック）3か月無料体験へ（外部サイト・PR）"
        className="group block overflow-hidden rounded-xl border border-[#1399FF]/50 bg-flabo-carbon shadow-lg shadow-[#1399FF]/15 transition-all duration-300 hover:border-[#1399FF] hover:-translate-y-0.5 hover:shadow-[#1399FF]/25"
      >
        {/* 上: 青いヘッダーバナー（プレミアムプラン3か月無料体験） */}
        <img
          src="/images/audible-top-banner.png"
          alt="【Amazonプライム会員限定】Audibleプレミアムプラン3か月間無料体験"
          loading="lazy"
          className="block w-full h-auto"
        />
        {/* 下: メインビジュアル（Amazonのオーディオブック・書影入り） */}
        <img
          src="/images/audible-main-banner.png"
          alt="Amazonのオーディオブック Audible（オーディブル）"
          loading="lazy"
          className="block w-full h-auto"
        />
      </a>

      <AssociateDisclosure />
    </div>
  );
}
