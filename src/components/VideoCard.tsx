"use client";

import { useState } from "react";

/**
 * ホームの人気動画（YouTube Short）カード。
 * インライン再生はせず、サムネ＋▶オーバーレイのクリック可能カード（B案）。
 * タップで YouTube（アプリ or ブラウザ）の Shorts を開く。
 */
const VIDEO_ID = "wgW3X6tqiNw";
const SHORTS_URL = `https://www.youtube.com/shorts/${VIDEO_ID}`;
const THUMB_MAXRES = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const THUMB_HQ = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export default function VideoCard() {
  // maxres が取得できない場合は hq にフォールバック
  const [thumb, setThumb] = useState(THUMB_MAXRES);

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="font-display tracking-[0.24em] text-[0.75rem] uppercase text-flabo-grey mb-2">
        ▶ 人気動画
      </div>
      <a
        href={SHORTS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="人気動画を YouTube で見る"
        className="group block relative overflow-hidden rounded-xl border border-white/5 bg-flabo-carbon aspect-[9/16] transition-all duration-300 hover:border-flabo-red/60 hover:-translate-y-0.5"
      >
        {/* サムネ（自動サムネは16:9なので cover で縦カードに収める） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          onError={() => setThumb((cur) => (cur === THUMB_HQ ? cur : THUMB_HQ))}
          alt="人気動画のサムネイル"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* コントラスト用グラデーション（赤×黒の世界観） */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        {/* 再生（▶）オーバーレイ */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-flabo-red/90 text-white shadow-lg shadow-black/40 ring-1 ring-white/20 transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-7 w-7 ml-0.5" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        {/* 右上に Short バッジ */}
        <span className="absolute top-2.5 right-2.5 font-display tracking-[0.18em] text-[0.7rem] px-1.5 py-0.5 rounded bg-black/55 text-white uppercase">
          Short
        </span>
      </a>
    </div>
  );
}
