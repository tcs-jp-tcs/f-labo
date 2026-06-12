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

// googtrans cookie を /ja/<code> 形式で書き込み（無印ホスト + .ホスト 両方に永続化）。
// ja のときは削除して翻訳をオフに戻す。
function writeGoogTransCookie(code: string) {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  if (code === DEFAULT_LANG) {
    const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `googtrans=;path=/;${expired}`;
    document.cookie = `googtrans=;path=/;domain=${host};${expired}`;
    document.cookie = `googtrans=;path=/;domain=.${host};${expired}`;
    return;
  }
  const value = `/ja/${code}`;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${host}`;
  document.cookie = `googtrans=${value};path=/;domain=.${host}`;
}

// goog-te-combo がまだ無い場合に備え、短時間ポーリングして value をセット→change で即時翻訳。
// ja（原文復帰）は combo の空オプション("")を選択することで原文へ戻す。
function applyComboWhenReady(code: string) {
  if (typeof document === "undefined") return;
  const comboValue = code === DEFAULT_LANG ? "" : code;
  let attempts = 0;
  const tryApply = () => {
    const combo = document.querySelector(
      "select.goog-te-combo"
    ) as HTMLSelectElement | null;
    if (combo) {
      combo.value = comboValue;
      combo.dispatchEvent(new Event("change"));
      return;
    }
    attempts += 1;
    if (attempts < 40) {
      window.setTimeout(tryApply, 150);
    }
  };
  tryApply();
}

function applyDirAndLang(code: string) {
  if (typeof document === "undefined") return;
  document.documentElement.dir = RTL_LANGS.has(code) ? "rtl" : "ltr";
  document.documentElement.lang = code;
}

export default function LangProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<string>(DEFAULT_LANG);

  // 初期化: localStorage に保存された言語を復帰。
  // ja デフォルトのときは何も触らない（画素変化ゼロを保証）。
  // 翻訳自体は googtrans cookie を Google が読み込み自動適用するため、
  // ここでは状態/dir/lang の同期と combo の念のための再適用を行う。
  useEffect(() => {
    let stored = DEFAULT_LANG;
    try {
      stored = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch {
      stored = DEFAULT_LANG;
    }
    if (stored !== DEFAULT_LANG) {
      setLangState(stored);
      applyDirAndLang(stored);
      applyComboWhenReady(stored);
    }
  }, []);

  const setLang = useCallback((code: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* localStorage 不可環境は無視 */
    }
    writeGoogTransCookie(code);
    applyComboWhenReady(code);
    applyDirAndLang(code);
    setLangState(code);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
