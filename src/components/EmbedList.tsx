"use client";

import { useEffect } from "react";
import type { Embed } from "@/lib/data";

/**
 * 動画埋め込み（DB: embeds テーブル）の表示コンポーネント。
 * platform を見て TikTok / Instagram / YouTube の埋め込みを出し分ける。
 * 旧 TikTokEmbed.tsx のハードコードを廃止し、embeds テーブルを単一ソースにする。
 *
 * - TikTok:    blockquote.tiktok-embed + tiktok/embed.js（data-video-id は URL から抽出）
 * - Instagram: blockquote.instagram-media + instagram/embed.js（data-instgrm-permalink=URL）
 * - YouTube:   iframe（外部スクリプト不要。URL から video-id を抽出）
 * TikTok/Instagram は縦型(9:16)なので max-w 330px、YouTube は横型(16:9)なので max-w 720px。
 * いずれも中央寄せ。SPA 遷移での再マウントにも追従させる。
 */

const PLATFORM_LABEL: Record<Embed["platform"], string> = {
  tiktok: "● From TikTok",
  instagram: "● From Instagram",
  youtube: "▶ From YouTube",
};

/** 縦型(9:16)は 330px、横型(16:9)の YouTube は 720px まで広げる */
const PLATFORM_MAX_WIDTH: Record<Embed["platform"], string> = {
  tiktok: "max-w-[330px]",
  instagram: "max-w-[330px]",
  youtube: "max-w-[720px]",
};

/** TikTok 動画 URL（…/video/{id}）から数値の video-id を抽出 */
function tiktokVideoId(url: string): string {
  const m = url.match(/\/video\/(\d+)/);
  return m ? m[1] : "";
}

/**
 * YouTube URL から video-id を抽出。次の形式に対応：
 * youtu.be/{id} / watch?v={id} / /shorts/{id} / /embed/{id} / /live/{id}
 * （?si=… などのクエリは無視する）
 */
function youtubeVideoId(url: string): string {
  const byPath = url.match(
    /(?:youtu\.be\/|\/shorts\/|\/embed\/|\/live\/)([A-Za-z0-9_-]{11})/,
  );
  if (byPath) return byPath[1];
  const byQuery = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  return byQuery ? byQuery[1] : "";
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
        <div
          key={e.id}
          className={`mx-auto w-full ${PLATFORM_MAX_WIDTH[e.platform]}`}
        >
          <div className="font-display tracking-[0.24em] text-[0.75rem] uppercase text-flabo-grey mb-2">
            {PLATFORM_LABEL[e.platform]}
          </div>

          {e.platform === "tiktok" && (
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
          )}

          {e.platform === "instagram" && (
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

          {e.platform === "youtube" &&
            (youtubeVideoId(e.url) ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/5 bg-flabo-carbon">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeVideoId(e.url)}`}
                  title="F Labo の YouTube 動画"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              // video-id を抽出できない URL が入っていた場合のフォールバック
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-flabo-grey hover:text-white text-sm transition-colors"
              >
                @FLabo-tcs の YouTube を見る
              </a>
            ))}
        </div>
      ))}
    </div>
  );
}
