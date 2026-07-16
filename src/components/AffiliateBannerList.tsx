import type { AffiliateBanner } from "@/lib/affiliateBanners";

/**
 * Amazonアフィリエイトバナー（DB: affiliate_banners テーブル）の表示コンポーネント。
 * 旧 BelgianBanner.tsx / AmazonPromo.tsx のハードコードを廃止し、DB を単一ソースにする。
 *
 * variant で出し分ける（見た目は移行前と一致）:
 *  - 'image' : 全部入り画像（バッジ/見出し/コピー/ボタンが画像に焼き込み）＋右上「PR」。帯なし。
 *  - 'banded': 絵のみ画像＋下段のHTML帯（PR・Amazon＋見出し/コピー/CTAボタン。Amazon濃紺×オレンジ）。
 *
 * PR／PR・Amazon の開示ラベルは全バナーで常時表示（必須・削除不可）。
 * 呼び出し側（page.tsx）が banners を placement 別に渡す。0件時は親側でセクションごと非表示。
 */

/** alt/aria 用のプレーンテキスト（heading の改行を空白に） */
function plainText(b: AffiliateBanner): string {
  const h = b.heading.replace(/\n/g, " ").trim();
  return b.copy ? `${h} ― ${b.copy}` : h;
}

/** variant='image': 全部入り画像＋PR（旧 BelgianBanner と同一） */
function ImageBanner({ b }: { b: AffiliateBanner }) {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      <a
        href={b.linkUrl}
        target="_blank"
        rel="sponsored noopener"
        aria-label={`${plainText(b)}（外部サイト・PR）`}
        className="group relative block overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/25 transition-all duration-300 hover:border-flabo-red/60 hover:-translate-y-0.5 hover:shadow-flabo-red/15"
      >
        <img
          src={b.imageUrl}
          alt={plainText(b)}
          width={1280}
          height={714}
          loading="eager"
          className="block w-full h-auto"
        />
        {/* アフィリエイト開示（PR）— 必須 */}
        <span className="absolute right-2 top-2 rounded bg-black/55 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider text-white/90">
          PR
        </span>
      </a>
    </div>
  );
}

/** variant='banded': 絵＋HTML帯（旧 EnergyBanner と同一。badge があれば見出し上に表示） */
function BandedBanner({ b }: { b: AffiliateBanner }) {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      <div className="overflow-hidden rounded-xl border border-[#FF9900]/40 shadow-lg shadow-black/25">
        {/* 上段: 画像（画像部分がリンク） */}
        <a
          href={b.linkUrl}
          target="_blank"
          rel="sponsored noopener"
          aria-label={`${plainText(b)}（外部サイト・PR）`}
          className="block"
        >
          <img
            src={b.imageUrl}
            alt={plainText(b)}
            width={1280}
            height={714}
            loading="lazy"
            className="block w-full h-auto"
          />
        </a>

        {/* 下段: 告知帯（Amazonカラー 濃紺#232F3E＋オレンジ#FF9900） */}
        <div className="bg-[#232F3E] px-5 py-4 md:px-6 md:py-5 text-center">
          {/* アフィリエイト開示（PR・Amazon）— 必須 */}
          <div className="font-display tracking-[0.2em] text-[0.65rem] text-[#FF9900] uppercase mb-1.5">
            PR · Amazon
          </div>
          {b.badge && (
            <div className="text-[0.7rem] tracking-[0.12em] text-white/70 mb-1.5">
              {b.badge}
            </div>
          )}
          <p className="font-black text-base md:text-lg leading-tight text-white whitespace-pre-line">
            {b.heading}
          </p>
          {b.copy && (
            <p className="text-[0.85rem] text-white/80 mt-1.5">{b.copy}</p>
          )}
          <a
            href={b.linkUrl}
            target="_blank"
            rel="sponsored noopener"
            aria-label={`${b.ctaLabel}（外部サイト・PR）`}
            className="mt-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF9900] px-6 py-3 font-display font-bold tracking-[0.12em] text-sm text-[#232F3E] shadow-md transition-colors hover:bg-white"
          >
            {b.ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AffiliateBannerList({
  banners,
}: {
  banners: AffiliateBanner[];
}) {
  if (banners.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      {banners.map((b) =>
        b.variant === "image" ? (
          <ImageBanner key={b.id} b={b} />
        ) : (
          <BandedBanner key={b.id} b={b} />
        ),
      )}
    </div>
  );
}
