"use client";

import { useEffect, useRef, useState } from "react";
import type { Embed } from "@/lib/data";

/**
 * 動画埋め込み（DB: embeds テーブル）の表示コンポーネント。
 * platform を見て TikTok / Instagram / YouTube の埋め込みを出し分ける。
 * 旧 TikTokEmbed.tsx のハードコードを廃止し、embeds テーブルを単一ソースにする。
 *
 * - TikTok:    blockquote.tiktok-embed + tiktok/embed.js（data-video-id は URL から抽出）
 * - Instagram: iframe（/embed/ を直接埋める。instagram/embed.js は使わない。理由は InstagramEmbed 参照）
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

/**
 * Instagram のパーマリンク（/reel/{code}/ や /p/{code}/）を埋め込み用 URL に変換。
 * クエリ・ハッシュを落として末尾に embed/ を付ける（embed.js と同じ組み立て）。
 */
function instagramEmbedSrc(url: string, width: number): string {
  const base = url.replace(/^(.*?)\/?(\?.*|#.*|$)/, "$1/");
  // SSR とクライアントで同じ URL になるよう window 依存の値は入れない
  // （embed.js が付ける rd= は計測用で、表示には不要）
  return `${base}embed/?cr=1&v=14&wp=${width}`;
}

/** wp=330 で埋め込んだときの実測値。MEASURE が届くまでの初期高さに使う */
const INSTAGRAM_EMBED_WIDTH = 330;
const INSTAGRAM_INITIAL_HEIGHT = 618;

const INSTAGRAM_ORIGIN = /^https?:\/\/(www\.)?instagram\.com$/;

/**
 * Instagram 埋め込み。公式の embed.js（blockquote → iframe 置換）は使わない。
 *
 * embed.js は iframe 内から届く postMessage を順に処理して高さを決めるが、
 * MOUNTED の処理で「元の blockquote の clientHeight」を高さとして書き戻す。
 * MEASURE（正しい高さ）が MOUNTED より先に届くと、その値がフォールバック用
 * blockquote の高さ（数十 px）で上書きされ、iframe が潰れてヘッダー部分しか
 * 見えなくなる（＝プロフィールカードだけが出る状態）。到着順はネットワーク次第で
 * 揺れるため、環境によって出たり出なかったりする。
 *
 * ここでは iframe を自前で置き、MEASURE の height だけを採用して追従させる。
 */
function InstagramEmbed({ url }: { url: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(INSTAGRAM_INITIAL_HEIGHT);
  const src = instagramEmbedSrc(url, INSTAGRAM_EMBED_WIDTH);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!INSTAGRAM_ORIGIN.test(e.origin)) return;
      if (e.source !== iframeRef.current?.contentWindow) return;
      try {
        const payload = JSON.parse(String(e.data));
        if (
          payload?.type === "MEASURE" &&
          typeof payload?.details?.height === "number" &&
          payload.details.height > 0
        ) {
          setHeight(payload.details.height);
        }
      } catch {
        // Instagram 以外の形式のメッセージは無視
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title="@flabo.jp の Instagram 投稿"
      className="block w-full rounded-[3px] border border-white/10 bg-white"
      style={{ height, maxWidth: INSTAGRAM_EMBED_WIDTH }}
      scrolling="no"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

export default function EmbedList({ embeds }: { embeds: Embed[] }) {
  const hasTikTok = embeds.some((e) => e.platform === "tiktok");

  useEffect(() => {
    if (!hasTikTok) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.tiktok.com/embed.js";
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, [hasTikTok]);

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

          {e.platform === "instagram" && <InstagramEmbed url={e.url} />}

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
