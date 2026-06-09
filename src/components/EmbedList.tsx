"use client";

import { useEffect } from "react";
import type { Embed } from "@/lib/data";

/**
 * 動画埋め込み（DB: embeds テーブル）の表示コンポーネント。
 * platform を見て TikTok / Instagram の公式 blockquote 埋め込みを出し分ける。
 * 旧 TikTokEmbed.tsx のハードコードを廃止し、embeds テーブルを単一ソースにする。
 *
 * - TikTok:    blockquote.tiktok-embed + tiktok/embed.js（data-video-id は URL から抽出）
 * - Instagram: blockquote.instagram-media + instagram/embed.js（data-instgrm-permalink=URL）
 * 縦型(9:16)なので max-w で抑え中央寄せ。SPA 遷移での再マウントにも追従させる。
 */

const PLATFORM_LABEL: Record<Embed["platform"], string> = {
  tiktok: "● From TikTok",
  instagram: "● From Instagram",
};

/** TikTok 動画 URL（…/video/{id}）から数値の video-id を抽出 */
function tiktokVideoId(url: string): string {
  const m = url.match(/\/video\/(\d+)/);
  return m ? m[1] : "";
}

type InstagramEmbeds = { Embeds?: { process: () => void } };

export default function EmbedList({ embeds }: { embeds: Embed[] }) {
  const hasTikTok = embeds.some((e) => e.platform === "tiktok");
  const hasInstagram = embeds.some((e) => e.platform === "instagram");

  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    if (hasTikTok) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.tiktok.com/embed.js";
      document.body.appendChild(s);
      scripts.push(s);
    }

    if (hasInstagram) {
      const instgrm = (window as unknown as { instgrm?: InstagramEmbeds })
        .instgrm;
      if (instgrm?.Embeds) {
        // SPA 再マウント時：スクリプト既読込なら未処理 blockquote を処理し直す
        instgrm.Embeds.process();
      } else {
        const s = document.createElement("script");
        s.async = true;
        s.src = "https://www.instagram.com/embed.js";
        document.body.appendChild(s);
        scripts.push(s);
      }
    }

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [hasTikTok, hasInstagram]);

  if (embeds.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      {embeds.map((e) => (
        <div key={e.id} className="mx-auto w-full max-w-[330px]">
          <div className="font-display tracking-[0.24em] text-[0.65rem] uppercase text-flabo-grey mb-2">
            {PLATFORM_LABEL[e.platform]}
          </div>

          {e.platform === "tiktok" ? (
            <blockquote
              className="tiktok-embed"
              cite={e.url}
              data-video-id={tiktokVideoId(e.url)}
              style={{ maxWidth: 330, minWidth: 280, margin: "0 auto" }}
            >
              {/* embed.js 読み込み前／失敗時のフォールバック */}
              <section>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-flabo-grey hover:text-white text-sm transition-colors"
                >
                  @flabo.jp の TikTok を見る
                </a>
              </section>
            </blockquote>
          ) : (
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={e.url}
              data-instgrm-version="14"
              style={{
                maxWidth: 330,
                minWidth: 280,
                width: "100%",
                margin: "0 auto",
                background: "#000",
              }}
            >
              {/* embed.js 読み込み前／失敗時のフォールバック */}
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-flabo-grey hover:text-white text-sm transition-colors"
              >
                @flabo.jp の Instagram を見る
              </a>
            </blockquote>
          )}
        </div>
      ))}
    </div>
  );
}
