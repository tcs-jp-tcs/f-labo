"use client";

import { useEffect, useState } from "react";

/**
 * tier① 動くコースマップ（iframe）＋全画面表示。
 *
 * 全画面は「iframeを内包するコンテナごと position:fixed で画面いっぱいに拡大」する方式。
 * Fullscreen API ではなく CSS オーバーレイにしているのは、iOS Safari が任意要素の
 * requestFullscreen を実質サポートしないため（実機で確実に動く方を優先）。
 * iframe を丸ごと拡大するので、コース図・エレベーション・PLAY LAP / RESET ボタンを
 * 含むコンテナ全体が拡大対象になり、全画面中もアニメ再生・リセット操作が効く。
 * iframe 内の CSS は vh 基準なので、拡大＝ビューポート高が増える＝コースが大きく描画される。
 */

// Spa は縦長でコンテンツ高が大きいため専用に iframe を高くする。
// （flex-start 配置なので高くしても下に余白が出るだけでコースはクリップされない）
// それ以外は共通の 520 / 360。※Tailwind JIT が拾えるようクラス文字列はリテラルで記述。
const HEIGHT_CLASS: Record<string, string> = {
  "spa-francorchamps": "h-[680px] max-[560px]:h-[600px]",
};
const DEFAULT_HEIGHT = "h-[520px] max-[560px]:h-[360px]";

export default function AnimatedCircuitMap({
  embedKey,
  title,
}: {
  embedKey: string;
  title: string;
}) {
  const [full, setFull] = useState(false);
  const heightClass = HEIGHT_CLASS[embedKey] ?? DEFAULT_HEIGHT;

  // 全画面中は背景スクロールを止め、Escape で閉じられるようにする。
  useEffect(() => {
    if (!full) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [full]);

  return (
    <div
      className={
        full
          ? "fixed inset-0 z-[100] bg-[#0a1430]"
          : "relative mt-5 border border-white/10 rounded-xl overflow-hidden bg-[#0a1430]"
      }
    >
      <iframe
        src={`/circuit-maps/${embedKey}.html`}
        title={title}
        loading="lazy"
        className={
          full
            ? "w-full h-full block border-0"
            : `w-full ${heightClass} block border-0`
        }
      />
      <button
        type="button"
        onClick={() => setFull((v) => !v)}
        aria-label={full ? "全画面を閉じる" : "全画面表示"}
        className="absolute top-2 right-2 z-[101] flex items-center gap-1 rounded-lg border border-white/20 bg-[#16223f]/90 px-3 py-2 text-xs font-bold tracking-[0.08em] text-white backdrop-blur-sm transition-colors hover:bg-[#1e2d52]"
      >
        {full ? "✕ 閉じる" : "⛶ 全画面"}
      </button>
    </div>
  );
}
