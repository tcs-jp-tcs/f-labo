export default function HeaderLogo({ height = 40 }: { height?: number }) {
  // 丸型エンブレム（正方形 1080x1080）。ヘッダー内では小さく出るため height 基準で
  // アスペクト比を維持する（w-auto）。60px ヘッダーに対し既定 40px。
  return (
    <img
      src="/flabo-emblem.png"
      alt="F-LABO"
      width={height}
      height={height}
      className="block w-auto notranslate"
      style={{ height }}
    />
  );
}
