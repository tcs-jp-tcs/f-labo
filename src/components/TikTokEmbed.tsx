"use client";

import { useEffect } from "react";

/**
 * ホームの TikTok 埋め込みカード（代表作・MONACO GP コース動画）。
 * TikTok公式の blockquote.tiktok-embed + embed.js 方式。
 * 縦型(9:16)なので max-w で抑え、中央寄せでレイアウトに馴染ませる。
 */
const VIDEO_ID = "7648092610598309140";
const VIDEO_URL = `https://www.tiktok.com/@flabo.jp/video/${VIDEO_ID}`;

export default function TikTokEmbed() {
  // embed.js は実行時に未処理の .tiktok-embed を iframe に差し替える。
  // クライアント遷移での再マウント時も確実に処理させるため、毎マウントで
  // 新しい script を読み込み、アンマウントで除去する。
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.tiktok.com/embed.js";
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[330px]">
      <div className="font-display tracking-[0.24em] text-[0.65rem] uppercase text-flabo-grey mb-2">
        ● From TikTok
      </div>
      <blockquote
        className="tiktok-embed"
        cite={VIDEO_URL}
        data-video-id={VIDEO_ID}
        style={{ maxWidth: 330, minWidth: 280, margin: "0 auto" }}
      >
        {/* embed.js 読み込み前／失敗時のフォールバック（TikTokで開くリンク） */}
        <section>
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-flabo-grey hover:text-white text-sm transition-colors"
          >
            @flabo.jp の TikTok（MONACO GP）を見る
          </a>
        </section>
      </blockquote>
    </div>
  );
}
