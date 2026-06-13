"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * 訪問者の表示タイムゾーンの単一ソース（フェーズ2-2 地域時間設定）。
 * 既定は端末の自動判定（Intl）。歯車設定で手動上書きでき、localStorage に永続化する。
 * スケジュールの「訪問者時刻列」(ScheduleList) がこの tz を参照する。
 * SSR/初回描画では tz=null（ScheduleList は右列をプレースホルダ表示）→ mount後に確定。
 */

const STORAGE_KEY = "flabo_tz";

type TzMode = "auto" | "manual";

type TzContextValue = {
  /** 解決済みTZ（手動 > 自動）。SSR/mount前は null。 */
  tz: string | null;
  mode: TzMode;
  /** iana を渡すと手動設定、null で自動（端末）に戻す。 */
  setTz: (iana: string | null) => void;
};

const TzContext = createContext<TzContextValue>({
  tz: null,
  mode: "auto",
  setTz: () => {},
});

export function useTz() {
  return useContext(TzContext);
}

function detectAutoTz(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tokyo";
  } catch {
    return "Asia/Tokyo";
  }
}

export default function TzProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tz, setTzState] = useState<string | null>(null);
  const [mode, setMode] = useState<TzMode>("auto");

  // mount後に localStorage の手動設定を復元。無ければ端末の自動判定。
  useEffect(() => {
    let manual: string | null = null;
    try {
      manual = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage 不可環境は無視 */
    }
    if (manual) {
      setTzState(manual);
      setMode("manual");
    } else {
      setTzState(detectAutoTz());
      setMode("auto");
    }
  }, []);

  const setTz = useCallback((iana: string | null) => {
    try {
      if (iana) localStorage.setItem(STORAGE_KEY, iana);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* localStorage 不可環境は無視 */
    }
    if (iana) {
      setTzState(iana);
      setMode("manual");
    } else {
      setTzState(detectAutoTz());
      setMode("auto");
    }
  }, []);

  return (
    <TzContext.Provider value={{ tz, mode, setTz }}>
      {children}
    </TzContext.Provider>
  );
}
