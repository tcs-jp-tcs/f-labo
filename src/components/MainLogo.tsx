export default function MainLogo({ width = 240 }: { width?: number }) {
  // 横長カーボンロゴ（1408x768）。ヒーローでは width 基準でアスペクト比を維持する。
  const height = Math.round((width * 768) / 1408);
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
