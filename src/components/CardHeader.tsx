import type { NewsItem } from "@/lib/data";

/** カードヘッダーのカテゴリー種別（ニュースのカテゴリー定義を共有） */
export type CardCategory = NewsItem["category"]; // "F1" | "F2" | "F3" | "F2/F3" | "SF" | "INDY"

type HeaderStyle = {
  /** ワードマークのソリッドブロック背景 */
  block: string;
  /** ワードマーク文字色 */
  text: string;
  /** チェッカー塗り色（既存 flabo-* トークンの CSS 変数） */
  cssVar: string;
  /** 下端ヘアライン（カテゴリー色・半透明） */
  line: string;
  /** ワードマーク既定ラベル */
  label: string;
};

/**
 * カテゴリー → 色・ラベルのマッピング。
 * 既存ニュースバー（HeroFeature）の配色定義を踏襲。色は新規ハードコードせず
 * flabo-* トークン（CSS変数）のみを使用。黄(SF)・緑(INDY)は白文字だと視認性が
 * 低いため、既存定義同様に濃色文字を使う。
 */
const CATEGORY_STYLE: Record<CardCategory, HeaderStyle> = {
  F1: { block: "bg-flabo-red", text: "text-white", cssVar: "var(--color-flabo-red)", line: "bg-flabo-red/50", label: "F1" },
  F2: { block: "bg-flabo-blue", text: "text-white", cssVar: "var(--color-flabo-blue)", line: "bg-flabo-blue/50", label: "F2" },
  F3: { block: "bg-flabo-blue", text: "text-white", cssVar: "var(--color-flabo-blue)", line: "bg-flabo-blue/50", label: "F3" },
  "F2/F3": { block: "bg-flabo-blue", text: "text-white", cssVar: "var(--color-flabo-blue)", line: "bg-flabo-blue/50", label: "F2/F3" },
  SF: { block: "bg-flabo-yellow", text: "text-flabo-darker", cssVar: "var(--color-flabo-yellow)", line: "bg-flabo-yellow/50", label: "SF" },
  INDY: { block: "bg-flabo-green", text: "text-flabo-darker", cssVar: "var(--color-flabo-green)", line: "bg-flabo-green/50", label: "INDY" },
};

/** カテゴリー無しの汎用カードはブランド色（赤）をデフォルトに */
const BRAND_STYLE: HeaderStyle = {
  block: "bg-flabo-red",
  text: "text-white",
  cssVar: "var(--color-flabo-red)",
  line: "bg-flabo-red/50",
  label: "Fラボ",
};

/** 左→右へ消えるマスク（ブロック寄り 0.8 → 右端 0.05） */
const FADE_MASK = "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.05) 100%)";

/**
 * 全コンテンツカード共通の「チェッカー・ヘッダー帯」。
 * 左にカテゴリー色ブロック＋シリーズのワードマーク（Chakra Petch）、
 * その右隣からカード右端まで細かい市松（≈6px・2行）を敷き、左→右へフェードアウト。
 * 帯の下端にカテゴリー色のヘアラインを全幅で1本。
 * カードのルートに overflow-hidden / rounded を付けた上で最上部に配置して使う。
 */
export default function CardHeader({
  category,
  label,
}: {
  category?: CardCategory;
  label?: string;
}) {
  const style = category ? CATEGORY_STYLE[category] : BRAND_STYLE;
  const wordmark = label ?? style.label;
  return (
    <div>
      <div className="flex items-center">
        {/* カテゴリー色ブロック＋ワードマーク（Chakra Petch / 700 / 大文字） */}
        <div className={`flex items-center px-3.5 py-[6px] ${style.block}`}>
          <span
            className={`uppercase tracking-[0.08em] text-[12px] font-bold leading-none ${style.text}`}
            style={{ fontFamily: "var(--font-chakra), var(--font-orbitron), sans-serif" }}
          >
            {wordmark}
          </span>
        </div>
        {/* 全幅フェードチェッカー（CSS市松 + 右へ消えるマスク） */}
        <div
          className="h-3 flex-1"
          aria-hidden
          style={{
            backgroundImage: `repeating-conic-gradient(${style.cssVar} 0% 25%, transparent 0% 50%)`,
            backgroundSize: "12px 12px",
            WebkitMaskImage: FADE_MASK,
            maskImage: FADE_MASK,
          }}
        />
      </div>
      {/* 下端ヘアライン（全幅・カテゴリー色） */}
      <div className={`h-px w-full ${style.line}`} aria-hidden />
    </div>
  );
}
