import type { NewsItem } from "@/lib/data";

/** カードヘッダーのカテゴリー種別（ニュースのカテゴリー定義を共有） */
export type CardCategory = NewsItem["category"]; // "F1" | "F2" | "F3" | "F2/F3" | "SF" | "INDY"

type HeaderStyle = {
  /** ワードマークのソリッドブロック背景 */
  block: string;
  /** ワードマーク文字色 */
  text: string;
  /** チェッカー柄セルの塗り色 */
  accent: string;
  /** 下端ヘアライン（カテゴリー色・半透明） */
  line: string;
  /** ワードマーク既定ラベル */
  label: string;
};

/**
 * カテゴリー → 色・ラベルのマッピング。
 * 既存ニュースバー（HeroFeature）の配色定義を踏襲して共有化したもの。
 * 黄（SF）・緑（INDY）は白文字だと視認性が低いため、既存定義同様に濃色文字を使う。
 * 色は新規ハードコードせず flabo-* トークンのみを使用。
 */
const CATEGORY_STYLE: Record<CardCategory, HeaderStyle> = {
  F1: { block: "bg-flabo-red", text: "text-white", accent: "bg-flabo-red", line: "bg-flabo-red/45", label: "F1" },
  F2: { block: "bg-flabo-blue", text: "text-white", accent: "bg-flabo-blue", line: "bg-flabo-blue/45", label: "F2" },
  F3: { block: "bg-flabo-blue", text: "text-white", accent: "bg-flabo-blue", line: "bg-flabo-blue/45", label: "F3" },
  "F2/F3": { block: "bg-flabo-blue", text: "text-white", accent: "bg-flabo-blue", line: "bg-flabo-blue/45", label: "F2/F3" },
  SF: { block: "bg-flabo-yellow", text: "text-flabo-darker", accent: "bg-flabo-yellow", line: "bg-flabo-yellow/45", label: "SF" },
  INDY: { block: "bg-flabo-green", text: "text-flabo-darker", accent: "bg-flabo-green", line: "bg-flabo-green/45", label: "INDY" },
};

/** カテゴリー無しの汎用カードはブランド色（赤）をデフォルトに */
const BRAND_STYLE: HeaderStyle = {
  block: "bg-flabo-red",
  text: "text-white",
  accent: "bg-flabo-red",
  line: "bg-flabo-red/45",
  label: "Fラボ",
};

/** チェッカー柄: 2行×3列の市松（true=塗り / false=透明） */
const CHECKER_CELLS = [true, false, true, false, true, false];

/**
 * 全カード共通の「チェッカー・ヘッダー帯」。
 * 左にカテゴリー色ブロック＋シリーズのワードマーク、右にチェッカー柄アクセント、
 * 帯の下端にカテゴリー色のヘアライン。
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
      <div className="flex items-stretch">
        {/* カテゴリー色ブロック＋ワードマーク */}
        <div className={`flex items-center px-4 py-[7px] ${style.block}`}>
          <span
            className={`font-display font-medium tracking-[0.18em] text-[12px] leading-none ${style.text}`}
          >
            {wordmark}
          </span>
        </div>
        {/* チェッカー柄アクセント（カテゴリー色） */}
        <div className="flex items-center pl-2.5" aria-hidden>
          <div className="grid grid-cols-3 grid-rows-2">
            {CHECKER_CELLS.map((on, i) => (
              <span key={i} className={`block w-2 h-[7px] ${on ? style.accent : "bg-transparent"}`} />
            ))}
          </div>
        </div>
      </div>
      {/* 下端ヘアライン（全幅・カテゴリー色） */}
      <div className={`h-px w-full ${style.line}`} aria-hidden />
    </div>
  );
}
