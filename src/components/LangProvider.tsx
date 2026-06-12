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
 * iOS Safari は navigator.standalone、その他は display-mode: standalone。
 * この環境では location.reload() / cookie が通常ブラウザと別挙動になり
 * cookie 書込→reload 方式が効かないため、combo 即時翻訳にフォールバックする。
 */
function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const iosStandalone =
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
    true;
  const displayModeStandalone =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(display-mode: standalone)").matches;
  return iosStandalone || displayModeStandalone;
}

type GoogleTranslateGlobal = {
  google?: { translate?: unknown };
  googleTranslateElementInit?: () => void;
};

// 最後にリクエストされた言語。遅れて combo が現れたときに最新要求だけ適用するための番兵。
let pendingComboLang: string | null = null;

/**
 * goog-te-combo を直接操作してリロードせずに翻訳する（スタンドアロン用フォールバック）。
 * スタンドアロンでは combo が生成されない／init が遅れることがあるため、
 *  - combo が無く Google API があるときは googleTranslateElementInit() で再生成を試みる
 *  - 最大 ~18 秒ポーリング
 *  - change は bubbles:true で発火（Google のハンドラを確実に起動）
 * ja（原文復帰）は Google ネイティブの「原文表示」= 空オプション("")を選択。
 */
function applyComboWhenReady(code: string) {
  if (typeof document === "undefined") return;
  pendingComboLang = code;
  const comboValue = code === DEFAULT_LANG ? "" : code;
  let attempts = 0;
  const MAX_ATTEMPTS = 120; // 120 × 150ms = 18s

  const tryApply = () => {
    // より新しい言語リクエストが来ていたら、この試行は破棄
    if (pendingComboLang !== code) return;

    const combo = document.querySelector(
      "select.goog-te-combo"
    ) as HTMLSelectElement | null;

    // ja（原文復帰）は value="" を直接適用。それ以外は対象 option の生成を待つ。
    const optionReady =
      comboValue === "" || combo?.querySelector(`option[value="${comboValue}"]`);
    if (combo && optionReady) {
      combo.value = comboValue;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      pendingComboLang = null;
      return;
    }

    // combo がまだ無い: Google API が読めていればウィジェットを（再）生成して combo を作る
    const w = window as unknown as GoogleTranslateGlobal;
    const container = document.getElementById("google_translate_element");
    if (
      !combo &&
      w.google &&
      w.google.translate &&
      typeof w.googleTranslateElementInit === "function" &&
      container &&
      container.childElementCount === 0
    ) {
      try {
        w.googleTranslateElementInit();
      } catch {
        /* 再生成失敗は次の試行で再評価 */
      }
    }

    attempts += 1;
    if (attempts < MAX_ATTEMPTS) {
      window.setTimeout(tryApply, 150);
    }
  };

  tryApply();
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
  useEffect(() => {
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
      // スタンドアロンでは Google の cookie 自動翻訳が効かない場合があるため、
      // 再起動後も state と表示を一致させるよう combo で翻訳を強制適用する。
      // 通常ブラウザは Google が cookie を読んで自動翻訳するため何もしない。
      if (isStandalone()) {
        applyComboWhenReady(resolved);
      }
    }
  }, []);

  // 言語変更:
  // - 通常ブラウザ: cookie を書き換えてフルリロード。リロード後に Google が cookie を
  //   読んで決定的に翻訳する（ボタン表示と実際の表示言語が必ず一致・検証済み）。
  // - スタンドアロン(PWA)起動: reload/cookie が別挙動で効かないため、combo を直接
  //   操作してリロードせずに即時翻訳するフォールバックに切替（cookie/localStorage と
  //   React state も更新し、ボタン表示と state を同期させる）。
  const setLang = useCallback(
    (code: string) => {
      if (code === lang) return; // 同じ言語なら何もしない（無駄なリロード/再翻訳防止）
      try {
        if (code === DEFAULT_LANG) localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* localStorage 不可環境は無視 */
      }
      writeGoogTransCookie(code);
      applyDirAndLang(code);

      if (isStandalone()) {
        // reload に頼らずその場で翻訳。React state も更新してボタン表示を一致させる。
        setLangState(code);
        applyComboWhenReady(code);
        return;
      }

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
