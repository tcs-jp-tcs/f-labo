"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isStandalone } from "@/components/LangProvider";

// PWA(standalone)実機で Google翻訳が本当に動くかを、devtools 無しで画面上だけで
// 観測するための一時診断ページ。検証が終わったら削除する（どこからもリンクしない）。

type Snapshot = {
  time: string;
  standalone: boolean;
  navStandalone: string;
  dmStandalone: boolean;
  dmBrowser: boolean;
  dmFullscreen: boolean;
  dmMinimalUi: boolean;
  ua: string;
  googleDefined: boolean;
  googleTranslateDefined: boolean;
  widgetChildren: number;
  comboExists: boolean;
  comboOptions: number;
  comboValue: string;
  translatedClass: string;
  cookie: string;
};

function takeSnapshot(): Snapshot {
  const w = window as unknown as {
    google?: { translate?: unknown };
  };
  const nav = window.navigator as Navigator & { standalone?: boolean };
  const html = document.documentElement;
  const combo = document.querySelector(
    ".goog-te-combo",
  ) as HTMLSelectElement | null;
  const widget = document.getElementById("google_translate_element");
  const mm = (q: string) =>
    typeof window.matchMedia === "function" && window.matchMedia(q).matches;
  return {
    time: new Date().toLocaleTimeString(),
    standalone: isStandalone(),
    navStandalone: String(nav.standalone),
    dmStandalone: mm("(display-mode: standalone)"),
    dmBrowser: mm("(display-mode: browser)"),
    dmFullscreen: mm("(display-mode: fullscreen)"),
    dmMinimalUi: mm("(display-mode: minimal-ui)"),
    ua: nav.userAgent,
    googleDefined: typeof w.google !== "undefined",
    googleTranslateDefined: !!(w.google && w.google.translate),
    widgetChildren: widget ? widget.childElementCount : -1,
    comboExists: !!combo,
    comboOptions: combo ? combo.options.length : -1,
    comboValue: combo ? combo.value : "(none)",
    translatedClass:
      html.className
        .split(" ")
        .filter((c) => c.startsWith("translated"))
        .join(",") || "(none)",
    cookie: document.cookie.match(/googtrans=[^;]*/)?.[0] || "(none)",
  };
}

const GOOGTRANS_DOMAINS = (host: string) => ["", `domain=${host};`, `domain=.${host};`];

export default function GtDiagClient() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const logRef = useRef<string[]>([]);

  const pushLog = useCallback((msg: string) => {
    const line = `${new Date().toLocaleTimeString()}  ${msg}`;
    logRef.current = [line, ...logRef.current].slice(0, 30);
    setLog(logRef.current);
  }, []);

  useEffect(() => {
    setSnap(takeSnapshot());
    const t = window.setInterval(() => setSnap(takeSnapshot()), 1000);
    return () => window.clearInterval(t);
  }, []);

  // .goog-te-combo を直接駆動（リロードなし）で翻訳が当たるか試す
  const driveCombo = useCallback(
    (code: string) => {
      const combo = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement | null;
      if (!combo) {
        pushLog("❌ .goog-te-combo が見つからない（GTウィジェット未生成）");
        return;
      }
      combo.value = code;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      pushLog(
        `combo.value="${code}" に設定し change 発火。数秒後に下のサンプル文が英語になるか見てください`,
      );
    },
    [pushLog],
  );

  // googtrans cookie を書いてフルリロード（本番の切替と同じ方式）
  const cookieReload = useCallback(
    (code: string) => {
      const host = window.location.hostname;
      const domains = GOOGTRANS_DOMAINS(host);
      if (code === "ja") {
        const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
        for (const d of domains)
          document.cookie = `googtrans=;path=/;${d}${expired}`;
        pushLog("cookie 失効（ja）→ リロードします");
      } else {
        for (const d of domains)
          document.cookie = `googtrans=/ja/${code};path=/;${d}`;
        pushLog(`cookie=/ja/${code} を書込 → リロードします`);
      }
      window.setTimeout(() => window.location.reload(), 300);
    },
    [pushLog],
  );

  const Row = ({ k, v, ok }: { k: string; v: string; ok?: boolean | null }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "6px 10px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        fontSize: 13,
      }}
    >
      <span style={{ color: "#9aa" }}>{k}</span>
      <span
        style={{
          fontWeight: 700,
          textAlign: "right",
          wordBreak: "break-all",
          color: ok == null ? "#eee" : ok ? "#5f5" : "#f77",
        }}
      >
        {v}
      </span>
    </div>
  );

  const btn: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "#1a1a1a",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 12px 60px" }}>
      <h1 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>
        GT 診断 / gt-diag
      </h1>
      <p style={{ fontSize: 12, color: "#9aa", marginBottom: 16 }}>
        ホーム画面PWAで開いて、下のボタンで翻訳が当たるか確認する一時ページです。
      </p>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        {snap && (
          <>
            <Row k="更新時刻" v={snap.time} />
            <Row
              k="isStandalone()"
              v={String(snap.standalone)}
              ok={null}
            />
            <Row
              k="navigator.standalone"
              v={snap.navStandalone}
              ok={null}
            />
            <Row k="display-mode:standalone" v={String(snap.dmStandalone)} ok={null} />
            <Row k="display-mode:browser" v={String(snap.dmBrowser)} ok={null} />
            <Row k="display-mode:fullscreen" v={String(snap.dmFullscreen)} ok={null} />
            <Row k="display-mode:minimal-ui" v={String(snap.dmMinimalUi)} ok={null} />
            <Row
              k="window.google 定義"
              v={String(snap.googleDefined)}
              ok={snap.googleDefined}
            />
            <Row
              k="google.translate 定義"
              v={String(snap.googleTranslateDefined)}
              ok={snap.googleTranslateDefined}
            />
            <Row
              k="翻訳widget 子要素数"
              v={String(snap.widgetChildren)}
              ok={snap.widgetChildren > 0}
            />
            <Row
              k=".goog-te-combo 存在"
              v={String(snap.comboExists)}
              ok={snap.comboExists}
            />
            <Row
              k="combo option 数"
              v={String(snap.comboOptions)}
              ok={snap.comboOptions > 0}
            />
            <Row k="combo 現在値" v={snap.comboValue} ok={null} />
            <Row
              k="html.translated-*"
              v={snap.translatedClass}
              ok={snap.translatedClass !== "(none)"}
            />
            <Row k="googtrans cookie" v={snap.cookie} ok={null} />
            <Row k="UA" v={snap.ua} ok={null} />
          </>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <button type="button" style={btn} onClick={() => driveCombo("en")}>
          ① combo駆動で英語化（リロードなし）
        </button>
        <button type="button" style={btn} onClick={() => cookieReload("en")}>
          ② cookie+リロードで英語化
        </button>
        <button type="button" style={btn} onClick={() => cookieReload("ja")}>
          リセット（日本語に戻す）
        </button>
      </div>

      <div
        style={{
          border: "2px dashed rgba(255,255,255,0.25)",
          borderRadius: 10,
          padding: 12,
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 11, color: "#9aa", marginBottom: 6 }}>
          ▼ 翻訳判定用サンプル文（英語になれば翻訳成功）
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.7 }}>
          これはテスト用の文章です。ボタンを押して数秒待っても、この文が日本語のままなら、この環境では翻訳が当たっていません。英語に変われば翻訳は正常に動いています。
        </p>
      </div>

      <div>
        <p style={{ fontSize: 11, color: "#9aa", marginBottom: 6 }}>▼ ログ</p>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: 10,
            minHeight: 60,
            whiteSpace: "pre-wrap",
          }}
        >
          {log.length ? log.join("\n") : "（操作するとここに記録されます）"}
        </div>
      </div>
    </div>
  );
}
