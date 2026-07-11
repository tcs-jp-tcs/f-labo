"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// RTL言語集合
const RTL_LANGS = new Set([
  "ar",
  "he",
  "fa",
  "ur",
  "ps",
  "sd",
  "ug",
  "yi",
  "dv",
]);

const STORAGE_KEY = "flabo_lang";
const DEFAULT_LANG = "ja";

type LangContextValue = {
  lang: string;
  setLang: (code: string) => void;
};

const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

/**
 * googtrans cookie を読み、翻訳先の言語コードを返す（例 "/ja/hi" → "hi"）。
 * cookie が無い／原文(ja)のときは DEFAULT_LANG。
 * Google翻訳ウィジェットはこの cookie を読んでロード時に自動翻訳するため、
 * cookie を「いま実際に表示されている言語」の唯一の真実として扱う。
 */
function readGoogTransLang(): string {
  if (typeof document === "undefined") return DEFAULT_LANG;
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!m) return DEFAULT_LANG;
  const parts = decodeURIComponent(m[1]).split("/").filter(Boolean); // ["ja","hi"]
  const target = parts[parts.length - 1];
  return target && target !== DEFAULT_LANG ? target : DEFAULT_LANG;
}

/**
 * googtrans cookie を /ja/<code> 形式で書き込み（無印ホスト + ホスト + .ホスト の
 * 3 バリアントに書く＝どの形でセットされていても確実に上書き／削除できるように）。
 * ja のときは全バリアントを失効させて翻訳をオフ（原文）に戻す。
 */
function writeGoogTransCookie(code: string) {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const domains = ["", `domain=${host};`, `domain=.${host};`];
  if (code === DEFAULT_LANG) {
    const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    for (const d of domains) {
      document.cookie = `googtrans=;path=/;${d}${expired}`;
    }
    return;
  }
  const value = `/ja/${code}`;
  for (const d of domains) {
    document.cookie = `googtrans=${value};path=/;${d}`;
  }
}

function applyDirAndLang(code: string) {
  if (typeof document === "undefined") return;
  document.documentElement.dir = RTL_LANGS.has(code) ? "rtl" : "ltr";
  document.documentElement.lang = code;
}

/**
 * スタンドアロン（ホーム画面に追加した PWA）起動かどうか。
 * この環境では webview が Google翻訳の element.js 実行をブロックするため翻訳が
 * 一切機能しない（読込方式 after/before どちらでも不可）。よって言語切替は行わず、
 * LangSwitcher で「ブラウザで開くと使える」案内を出す。
 *
 * 判定方針:
 * - iOS Safari のホーム画面PWA だけが navigator.standalone===true を返す（確実な true）。
 * - iOS の Chrome/Firefox/Edge・一部 in-app ブラウザは、通常タブでも
 *   matchMedia("(display-mode: standalone)") を **true と誤報告** することがある。
 *   これに引っかかると通常タブの iOS Chrome で言語切替が no-op になる（実際の不具合）。
 *   よって iOS では display-mode を一切信用せず、navigator.standalone===true 以外は
 *   standalone ではないと判定する。iOS の UA は WebKit 必須ゆえ必ず iPhone/iPad/iPod を
 *   含むため、navigator.standalone プロパティの有無に依存しない確実な iOS 判定になる。
 * - 非iOS（Android/desktop）では display-mode: standalone が信頼できる。
 */
export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & {
    standalone?: boolean;
    maxTouchPoints?: number;
  };
  // iOS Safari のホーム画面PWA（唯一の確実な true positive）
  if (nav.standalone === true) return true;
  // iOS(WebKit) 判定。iOS では display-mode を信用しないため、ここで true なら
  // 上の navigator.standalone===true 以外は standalone ではない（＝false）とする。
  const ua = nav.userAgent || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (nav.platform === "MacIntel" && (nav.maxTouchPoints ?? 0) > 1); // iPadOS 13+
  if (isIOS) return false;
  // 非iOS（Android/desktop）: display-mode: standalone が信頼できる
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(display-mode: standalone)").matches
  );
}

export default function LangProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<string>(DEFAULT_LANG);

  // 初期化: cookie（=Google が実際に翻訳する言語）を真実として state/dir/lang を同期。
  // これでヘッダーのボタン表示と実際の表示言語が必ず一致する。
  // localStorage は cookie が無いときの保険としてのみ参照。
  // ※スタンドアロン(PWA)では Google翻訳が一切機能しない（webview が element.js を
  //   ブロック）ため、state を復元すると「ボタンEN・中身は日本語」という嘘の表示に
  //   なる。よってスタンドアロンでは復元せず ja のまま据え置く。
  useEffect(() => {
    if (isStandalone()) return;

    let resolved = readGoogTransLang();
    if (resolved === DEFAULT_LANG) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && stored !== DEFAULT_LANG) resolved = stored;
      } catch {
        /* localStorage 不可環境は無視 */
      }
    }
    if (resolved !== DEFAULT_LANG) {
      setLangState(resolved);
      applyDirAndLang(resolved);
    }
  }, []);

  // リロード後の翻訳適用を保証する（モバイル対策）。
  // デスクトップは googtrans cookie で Google翻訳が自動翻訳するが、iOS Safari 等の
  // モバイルでは cookie による自動適用が走らず本文が原文(日本語)のまま残ることがある。
  // そこで GT が生成する隠しセレクト .goog-te-combo を能動的に駆動して翻訳を当てる。
  // 既に翻訳済み(html.translated-*)なら何もしない＝デスクトップでの二重適用を防ぐ。
  useEffect(() => {
    if (isStandalone()) return; // スタンドアロンは GT 自体が不可
    const target = readGoogTransLang();
    if (target === DEFAULT_LANG) return; // 原文表示なら何もしない

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const html = document.documentElement;
      // GT が翻訳を適用すると html に translated-ltr / translated-rtl が付く
      if (
        html.classList.contains("translated-ltr") ||
        html.classList.contains("translated-rtl")
      ) {
        window.clearInterval(timer);
        return;
      }
      const combo = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement | null;
      if (combo && combo.value !== target) {
        combo.value = target;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (combo) {
        // 値が既に target でも未翻訳なら change を再発火して適用を促す
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (tries > 40) window.clearInterval(timer); // 約20秒で打ち切り
    }, 500);

    return () => window.clearInterval(timer);
  }, []);

  // 言語変更（通常ブラウザ・アプリ内ブラウザ）: cookie を書き換えてフルリロード。
  // リロード後に Google が cookie を読んで決定的に翻訳する（ボタン表示と実際の表示
  // 言語が必ず一致・検証済み）。
  // ※スタンドアロン(PWA)では Google翻訳が機能しないため切替を行わない（no-op）。
  //   ボタンが「嘘のEN表示」にならないよう state も変えない。代わりに LangSwitcher が
  //   「ブラウザで開くと使える」案内を表示する。
  const setLang = useCallback(
    (code: string) => {
      if (isStandalone()) return; // 翻訳不可。UI 側で案内する。
      if (code === lang) return; // 同じ言語なら何もしない（無駄なリロード防止）
      try {
        if (code === DEFAULT_LANG) localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* localStorage 不可環境は無視 */
      }
      writeGoogTransCookie(code);
      applyDirAndLang(code);
      // cookie を確実に反映させるためフルリロード（言語切替＝唯一の真実は cookie）。
      window.location.reload();
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
