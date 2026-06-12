"use client";

import { useEffect, useState } from "react";

/**
 * 【一時的な診断用オーバーレイ】スタンドアロン(PWA)起動時のみ表示。
 * Google翻訳ウィジェットがどこで止まっているかを実機で切り分けるための仮設。
 * 原因特定後にこのコンポーネントと layout の読み込みは撤去する。
 */

type WinGT = {
  google?: { translate?: unknown };
  googleTranslateElementInit?: () => void;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const ios =
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
    true;
  const dm =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(display-mode: standalone)").matches;
  return ios || dm;
}

function readCookie(): string {
  if (typeof document === "undefined") return "(none)";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "(none)";
}

export default function StandaloneDebug() {
  const [show, setShow] = useState(false);
  const [tick, setTick] = useState(0);
  const [log, setLog] = useState<string>("");

  useEffect(() => {
    if (!isStandalone()) return;
    setShow(true);
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!show) return null;

  const w = window as unknown as WinGT;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  const dm =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(display-mode: standalone)").matches;
  const container = document.getElementById("google_translate_element");
  const combo = document.querySelector(
    "select.goog-te-combo"
  ) as HTMLSelectElement | null;
  const scriptTag = document.querySelector(
    'script[src*="translate_a/element.js"]'
  );
  const yn = (b: unknown) => (b ? "✅yes" : "❌no");

  const forceInit = () => {
    try {
      if (typeof w.googleTranslateElementInit === "function") {
        w.googleTranslateElementInit();
        setLog("googleTranslateElementInit() を実行しました");
      } else {
        setLog("googleTranslateElementInit が未定義");
      }
    } catch (e) {
      setLog("init例外: " + String(e));
    }
    setTick((t) => t + 1);
  };

  const applyEn = () => {
    const c = document.querySelector(
      "select.goog-te-combo"
    ) as HTMLSelectElement | null;
    if (!c) {
      setLog("combo が見つからない（適用不可）");
      return;
    }
    c.value = "en";
    c.dispatchEvent(new Event("change", { bubbles: true }));
    setLog("combo=en に change を発火しました");
    setTick((t) => t + 1);
  };

  const reloadTest = () => {
    setLog("location.reload() を呼びます…");
    window.location.reload();
  };

  return (
    <div
      className="notranslate"
      translate="no"
      style={{
        position: "fixed",
        left: 8,
        right: 8,
        bottom: 8,
        zIndex: 99999,
        background: "rgba(0,0,0,0.92)",
        color: "#fff",
        border: "1px solid #E10600",
        borderRadius: 10,
        padding: "10px 12px",
        fontSize: 11,
        lineHeight: 1.5,
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <strong style={{ color: "#E10600" }}>🔧 翻訳診断 (standalone専用)</strong>
        <button
          type="button"
          onClick={() => setShow(false)}
          style={{ color: "#888", background: "none", border: "none" }}
        >
          ✕閉じる
        </button>
      </div>
      <div>tick: {tick}s</div>
      <div>
        mode: navigator.standalone={yn(nav.standalone)} / display-mode=
        {yn(dm)}
      </div>
      <div>script(element.js)タグ: {yn(scriptTag)}</div>
      <div>window.google: {yn(w.google)}</div>
      <div>google.translate: {yn(w.google && w.google.translate)}</div>
      <div>
        googleTranslateElementInit:{" "}
        {yn(typeof w.googleTranslateElementInit === "function")}
      </div>
      <div>
        container子要素数: {container ? container.childElementCount : "(no container)"}
      </div>
      <div>goog-te-combo: {yn(combo)}</div>
      <div>combo.value: {combo ? `"${combo.value}"` : "-"}</div>
      <div>combo option数: {combo ? combo.options.length : "-"}</div>
      <div style={{ wordBreak: "break-all" }}>cookie googtrans: {readCookie()}</div>
      <div style={{ wordBreak: "break-all" }}>
        &lt;html&gt; lang={document.documentElement.lang} dir=
        {document.documentElement.dir}
      </div>
      {log && (
        <div style={{ color: "#FFD700", marginTop: 4 }}>→ {log}</div>
      )}
      <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={forceInit}
          style={{
            background: "#E10600",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "5px 8px",
          }}
        >
          強制init
        </button>
        <button
          type="button"
          onClick={applyEn}
          style={{
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: 6,
            padding: "5px 8px",
          }}
        >
          combo=EN適用
        </button>
        <button
          type="button"
          onClick={reloadTest}
          style={{
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: 6,
            padding: "5px 8px",
          }}
        >
          reloadテスト
        </button>
      </div>
    </div>
  );
}
