/**
 * ベルギーGP特集 Amazonアソシエイト プロモバナー（TOP用・旧 AudibleBanner の枠）。
 *
 * 画像は帯（コピー＋ボタン）を含む完成版デザイン（belgian-gp-2026.jpg）を1枚で表示し、
 * カード全体をアフィリエイトリンクにする（帯はHTML化せず画像のまま／ユーザー指定）。
 * アフィリエイト開示のため右上に小さく「PR」を重ねる。
 *
 * 表示期間: 〜2026-07-20 00:00 JST（ベルギーGP 7/17-19 終了翌日）。
 * 期間外は何も描画しない（自動非表示）。次戦バナーへ差し替える際はこの枠を更新する。
 */

// 表示終了（JST）: 2026-07-20 00:00 JST = 2026-07-19 15:00 UTC
const BELGIAN_END = Date.UTC(2026, 6, 19, 15, 0, 0);
const BELGIAN_URL = "https://amzn.to/3RwRRXC";

function isBelgianActive(): boolean {
  return Date.now() < BELGIAN_END;
}

export default function BelgianBanner() {
  if (!isBelgianActive()) return null;

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <a
        href={BELGIAN_URL}
        target="_blank"
        rel="sponsored noopener"
        aria-label="今週末はベルギーGP ― Amazonでベルギー特集（チョコ・ビール等）をチェック（外部サイト・PR）"
        className="group relative block overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/25 transition-all duration-300 hover:border-flabo-red/60 hover:-translate-y-0.5 hover:shadow-flabo-red/15"
      >
        <img
          src="/images/belgian-gp-2026.jpg"
          alt="今週末はベルギーGP ― ベルギーを食べて、飲んで、観戦しよう。Amazonでベルギー特集をチェック"
          width={1280}
          height={714}
          loading="eager"
          className="block w-full h-auto"
        />
        {/* アフィリエイト開示（PR） */}
        <span className="absolute right-2 top-2 rounded bg-black/55 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider text-white/90">
          PR
        </span>
      </a>
    </div>
  );
}
