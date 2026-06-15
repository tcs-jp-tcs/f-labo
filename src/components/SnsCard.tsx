import { sns } from "@/lib/data";
// 【応急処置】YouTubeチャンネル復活までYouTubeアイコンを非表示にするため YouTubeLogo は一旦外す
import { XLogo, InstagramLogo, TikTokLogo } from "./SnsIcons";

export default function SnsCard() {
  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon p-5 flex flex-col gap-2">
      <h3 className="font-display tracking-[0.24em] text-[0.75rem] uppercase text-flabo-grey mb-1">
        📱 Follow Us
      </h3>
      <a
        href={sns.x.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`X ${sns.x.handle}`}
        className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/[0.04] text-white text-sm hover:bg-white/10 transition-colors"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
          <XLogo className="h-4 w-4 text-white" />
        </span>
        <span>{sns.x.handle}</span>
      </a>
      <a
        href={sns.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${sns.instagram.handle}`}
        className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/[0.04] text-white text-sm hover:bg-white/10 transition-colors"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
          <InstagramLogo className="h-4 w-4 text-white" />
        </span>
        <span>{sns.instagram.handle}</span>
      </a>
      <a
        href={sns.tiktok.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`TikTok ${sns.tiktok.handle}`}
        className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/[0.04] text-white text-sm hover:bg-white/10 transition-colors"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
          <TikTokLogo className="h-4 w-4 text-white" />
        </span>
        <span>{sns.tiktok.handle}</span>
      </a>
      {/* 【応急処置】YouTubeチャンネル削除（ポリシー誤検知・再審査請求中）により死にリンクと
          なったため、YouTubeアイコン／リンクを一旦非表示（X / Instagram の2つ並びに）。
          チャンネル復活時はこのコメントアウトを解除し、import の YouTubeLogo も戻すこと。
      <a
        href={sns.youtube.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`YouTube ${sns.youtube.handle}`}
        className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/[0.04] text-white text-sm hover:bg-white/10 transition-colors"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
          <YouTubeLogo className="h-4 w-4 text-white" />
        </span>
        <span>{sns.youtube.handle}</span>
      </a>
      */}
    </div>
  );
}
