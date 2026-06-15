import Link from "next/link";
import { sns } from "@/lib/data";
// 【応急処置】YouTubeチャンネル復活までフッターのYouTubeリンクを非表示にするため YouTubeLogo は一旦外す
import { XLogo, InstagramLogo, TikTokLogo } from "./SnsIcons";

export default function Footer() {
  return (
    <footer className="max-w-[1280px] mx-auto px-6 py-8 border-t border-white/5 relative z-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <svg viewBox="0 0 120 50" width="72" height="30">
            <g transform="skewX(-9)">
              <rect x="16" y="4" width="9" height="34" fill="#E10600" opacity="0.5" />
              <rect x="16" y="4" width="26" height="7" fill="#E10600" opacity="0.5" />
              <rect x="16" y="16" width="20" height="6" fill="#E10600" opacity="0.5" />
            </g>
            <g transform="skewX(-9)">
              <rect x="48" y="4" width="9" height="34" fill="#FFF" opacity="0.3" />
              <rect x="48" y="32" width="20" height="5" fill="#FFF" opacity="0.3" />
            </g>
            <text
              x="62"
              y="31"
              fontFamily="Arial, sans-serif"
              fontSize="14"
              fontWeight="500"
              fontStyle="italic"
              fill="#666"
              transform="skewX(-4)"
            >
              abo
            </text>
          </svg>
          <div className="text-[0.75rem] text-white/65 leading-relaxed max-w-xs">
            F1・F2・F3・スーパーフォーミュラ・インディカーの<br />
            ニュース＆スケジュールメディア
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-display tracking-[0.18em] text-[0.7rem] text-flabo-grey uppercase">サイト</span>
          <Link href="/about" className="text-flabo-grey hover:text-white text-xs transition-colors">運営者情報</Link>
          <Link href="/contact" className="text-flabo-grey hover:text-white text-xs transition-colors">お問い合わせ</Link>
          <Link href="/privacy" className="text-flabo-grey hover:text-white text-xs transition-colors">プライバシーポリシー</Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-display tracking-[0.18em] text-[0.7rem] text-flabo-grey uppercase">フォロー</span>
          <a
            href={sns.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-flabo-grey hover:text-white text-xs transition-colors"
          >
            <XLogo className="h-3.5 w-3.5" />
            <span>X {sns.x.handle}</span>
          </a>
          <a
            href={sns.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-flabo-grey hover:text-white text-xs transition-colors"
          >
            <InstagramLogo className="h-3.5 w-3.5" />
            <span>Instagram {sns.instagram.handle}</span>
          </a>
          <a
            href={sns.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-flabo-grey hover:text-white text-xs transition-colors"
          >
            <TikTokLogo className="h-3.5 w-3.5" />
            <span>TikTok {sns.tiktok.handle}</span>
          </a>
          {/* 【応急処置】YouTubeチャンネル削除（ポリシー誤検知・再審査請求中）により死にリンクと
              なったため一旦非表示。チャンネル復活時はこのコメントアウトを解除し、
              import の YouTubeLogo も戻すこと。
          <a
            href={sns.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-flabo-grey hover:text-white text-xs transition-colors"
          >
            <YouTubeLogo className="h-3.5 w-3.5" />
            <span>YouTube {sns.youtube.handle}</span>
          </a>
          */}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-white/5 text-[0.75rem] text-white/60 text-center">
        © 2026 フォーミュラ研究所（Fラボ）— 当サイトは公式団体ではありません。掲載情報は各公式ソースに基づきます。
      </div>
    </footer>
  );
}
