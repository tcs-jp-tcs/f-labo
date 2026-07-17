export default function MainLogo({ width = 240 }: { width?: number }) {
  // カーボンロゴ（830x590・丸エンブレム除去版）。ヒーローでは width 基準でアスペクト比を維持する。
  const height = Math.round((width * 590) / 830);
  return (
    <img
      src="/flabo-logo-full.png"
      alt="F-LABO フォーミュラ研究所"
      width={width}
      height={height}
      className="h-auto max-w-full notranslate"
      style={{ width }}
    />
  );
}
