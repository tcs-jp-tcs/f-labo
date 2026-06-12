"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { isStandalone, useLang } from "./LangProvider";

type Language = { code: string; native: string; en: string };

// 主要言語（この順で上部に表示）
const PRIMARY: Language[] = [
  { code: "ja", native: "日本語", en: "Japanese" },
  { code: "en", native: "English", en: "English" },
  { code: "hi", native: "हिन्दी", en: "Hindi" },
  { code: "id", native: "Bahasa Indonesia", en: "Indonesian" },
  { code: "es", native: "Español", en: "Spanish" },
  { code: "ar", native: "العربية", en: "Arabic" },
  { code: "pt", native: "Português", en: "Portuguese" },
  { code: "fr", native: "Français", en: "French" },
  { code: "de", native: "Deutsch", en: "German" },
  { code: "it", native: "Italiano", en: "Italian" },
];

// Google翻訳が対応する言語フルリスト（native名 + 英名）
const ALL: Language[] = [
  { code: "af", native: "Afrikaans", en: "Afrikaans" },
  { code: "sq", native: "Shqip", en: "Albanian" },
  { code: "am", native: "አማርኛ", en: "Amharic" },
  { code: "ar", native: "العربية", en: "Arabic" },
  { code: "hy", native: "Հայերեն", en: "Armenian" },
  { code: "az", native: "Azərbaycan", en: "Azerbaijani" },
  { code: "eu", native: "Euskara", en: "Basque" },
  { code: "be", native: "Беларуская", en: "Belarusian" },
  { code: "bn", native: "বাংলা", en: "Bengali" },
  { code: "bs", native: "Bosanski", en: "Bosnian" },
  { code: "bg", native: "Български", en: "Bulgarian" },
  { code: "ca", native: "Català", en: "Catalan" },
  { code: "ceb", native: "Cebuano", en: "Cebuano" },
  { code: "zh-CN", native: "简体中文", en: "Chinese (Simplified)" },
  { code: "zh-TW", native: "繁體中文", en: "Chinese (Traditional)" },
  { code: "co", native: "Corsu", en: "Corsican" },
  { code: "hr", native: "Hrvatski", en: "Croatian" },
  { code: "cs", native: "Čeština", en: "Czech" },
  { code: "da", native: "Dansk", en: "Danish" },
  { code: "nl", native: "Nederlands", en: "Dutch" },
  { code: "en", native: "English", en: "English" },
  { code: "eo", native: "Esperanto", en: "Esperanto" },
  { code: "et", native: "Eesti", en: "Estonian" },
  { code: "fi", native: "Suomi", en: "Finnish" },
  { code: "fr", native: "Français", en: "French" },
  { code: "fy", native: "Frysk", en: "Frisian" },
  { code: "gl", native: "Galego", en: "Galician" },
  { code: "ka", native: "ქართული", en: "Georgian" },
  { code: "de", native: "Deutsch", en: "German" },
  { code: "el", native: "Ελληνικά", en: "Greek" },
  { code: "gu", native: "ગુજરાતી", en: "Gujarati" },
  { code: "ht", native: "Kreyòl Ayisyen", en: "Haitian Creole" },
  { code: "ha", native: "Hausa", en: "Hausa" },
  { code: "haw", native: "ʻŌlelo Hawaiʻi", en: "Hawaiian" },
  { code: "he", native: "עברית", en: "Hebrew" },
  { code: "hi", native: "हिन्दी", en: "Hindi" },
  { code: "hmn", native: "Hmoob", en: "Hmong" },
  { code: "hu", native: "Magyar", en: "Hungarian" },
  { code: "is", native: "Íslenska", en: "Icelandic" },
  { code: "ig", native: "Igbo", en: "Igbo" },
  { code: "id", native: "Bahasa Indonesia", en: "Indonesian" },
  { code: "ga", native: "Gaeilge", en: "Irish" },
  { code: "it", native: "Italiano", en: "Italian" },
  { code: "ja", native: "日本語", en: "Japanese" },
  { code: "jv", native: "Basa Jawa", en: "Javanese" },
  { code: "kn", native: "ಕನ್ನಡ", en: "Kannada" },
  { code: "kk", native: "Қазақ", en: "Kazakh" },
  { code: "km", native: "ខ្មែរ", en: "Khmer" },
  { code: "rw", native: "Kinyarwanda", en: "Kinyarwanda" },
  { code: "ko", native: "한국어", en: "Korean" },
  { code: "ku", native: "Kurdî", en: "Kurdish" },
  { code: "ky", native: "Кыргызча", en: "Kyrgyz" },
  { code: "lo", native: "ລາວ", en: "Lao" },
  { code: "la", native: "Latina", en: "Latin" },
  { code: "lv", native: "Latviešu", en: "Latvian" },
  { code: "lt", native: "Lietuvių", en: "Lithuanian" },
  { code: "lb", native: "Lëtzebuergesch", en: "Luxembourgish" },
  { code: "mk", native: "Македонски", en: "Macedonian" },
  { code: "mg", native: "Malagasy", en: "Malagasy" },
  { code: "ms", native: "Bahasa Melayu", en: "Malay" },
  { code: "ml", native: "മലയാളം", en: "Malayalam" },
  { code: "mt", native: "Malti", en: "Maltese" },
  { code: "mi", native: "Māori", en: "Maori" },
  { code: "mr", native: "मराठी", en: "Marathi" },
  { code: "mn", native: "Монгол", en: "Mongolian" },
  { code: "my", native: "မြန်မာ", en: "Myanmar (Burmese)" },
  { code: "ne", native: "नेपाली", en: "Nepali" },
  { code: "no", native: "Norsk", en: "Norwegian" },
  { code: "ny", native: "Chichewa", en: "Nyanja (Chichewa)" },
  { code: "or", native: "ଓଡ଼ିଆ", en: "Odia (Oriya)" },
  { code: "ps", native: "پښتو", en: "Pashto" },
  { code: "fa", native: "فارسی", en: "Persian" },
  { code: "pl", native: "Polski", en: "Polish" },
  { code: "pt", native: "Português", en: "Portuguese" },
  { code: "pa", native: "ਪੰਜਾਬੀ", en: "Punjabi" },
  { code: "ro", native: "Română", en: "Romanian" },
  { code: "ru", native: "Русский", en: "Russian" },
  { code: "sm", native: "Gagana Samoa", en: "Samoan" },
  { code: "gd", native: "Gàidhlig", en: "Scots Gaelic" },
  { code: "sr", native: "Српски", en: "Serbian" },
  { code: "st", native: "Sesotho", en: "Sesotho" },
  { code: "sn", native: "Shona", en: "Shona" },
  { code: "sd", native: "سنڌي", en: "Sindhi" },
  { code: "si", native: "සිංහල", en: "Sinhala" },
  { code: "sk", native: "Slovenčina", en: "Slovak" },
  { code: "sl", native: "Slovenščina", en: "Slovenian" },
  { code: "so", native: "Soomaali", en: "Somali" },
  { code: "es", native: "Español", en: "Spanish" },
  { code: "su", native: "Basa Sunda", en: "Sundanese" },
  { code: "sw", native: "Kiswahili", en: "Swahili" },
  { code: "sv", native: "Svenska", en: "Swedish" },
  { code: "tl", native: "Filipino", en: "Tagalog (Filipino)" },
  { code: "tg", native: "Тоҷикӣ", en: "Tajik" },
  { code: "ta", native: "தமிழ்", en: "Tamil" },
  { code: "tt", native: "Татарча", en: "Tatar" },
  { code: "te", native: "తెలుగు", en: "Telugu" },
  { code: "th", native: "ไทย", en: "Thai" },
  { code: "tr", native: "Türkçe", en: "Turkish" },
  { code: "tk", native: "Türkmen", en: "Turkmen" },
  { code: "uk", native: "Українська", en: "Ukrainian" },
  { code: "ur", native: "اردو", en: "Urdu" },
  { code: "ug", native: "ئۇيغۇرچە", en: "Uyghur" },
  { code: "uz", native: "Oʻzbek", en: "Uzbek" },
  { code: "vi", native: "Tiếng Việt", en: "Vietnamese" },
  { code: "cy", native: "Cymraeg", en: "Welsh" },
  { code: "xh", native: "isiXhosa", en: "Xhosa" },
  { code: "yi", native: "ייִדיש", en: "Yiddish" },
  { code: "yo", native: "Yorùbá", en: "Yoruba" },
  { code: "zu", native: "isiZulu", en: "Zulu" },
];

const PRIMARY_CODES = new Set(PRIMARY.map((l) => l.code));
const ALL_BY_CODE = new Map(ALL.map((l) => [l.code, l] as const));

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
    </svg>
  );
}

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  // スタンドアロン(PWA)起動かどうか。SSR とのズレを避けるためマウント後に判定。
  const [standalone, setStandalone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStandalone(isStandalone());
  }, []);

  const current = ALL_BY_CODE.get(lang) ?? PRIMARY[0];

  const others = useMemo(
    () => ALL.filter((l) => !PRIMARY_CODES.has(l.code)),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return ALL.filter(
      (l) =>
        l.native.toLowerCase().includes(q) ||
        l.en.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [query]);

  // 外側クリックで閉じる
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (code: string) => {
    setLang(code);
    setOpen(false);
    setQuery("");
  };

  const renderItem = (l: Language) => {
    const active = l.code === lang;
    return (
      <button
        key={l.code}
        type="button"
        onClick={() => choose(l.code)}
        className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
          active
            ? "bg-flabo-red/15 text-white"
            : "text-flabo-text hover:bg-white/5"
        }`}
      >
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-medium">{l.native}</span>
          <span className="truncate text-[0.65rem] text-flabo-grey">
            {l.en}
          </span>
        </span>
        {active && (
          <span className="shrink-0 text-flabo-red" aria-hidden>
            ✓
          </span>
        )}
      </button>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative notranslate"
      translate="no"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="言語を切り替え / Change language"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-flabo-grey transition-colors hover:border-white/20 hover:text-white"
      >
        <GlobeIcon />
        <span className="font-display text-[0.7rem] font-bold uppercase tracking-[0.12em]">
          {current.code === "ja" ? "JA" : current.code.toUpperCase()}
        </span>
      </button>

      {open && (
        <>
          {/* モバイル用バックドロップ */}
          <div
            className="fixed inset-0 z-[60] md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 z-[70] mt-2 w-[min(92vw,320px)] overflow-hidden rounded-xl border border-white/10 bg-flabo-carbon shadow-2xl shadow-black/60">
            {standalone && (
              <div className="border-b border-flabo-red/30 bg-flabo-red/10 px-3 py-2 text-[0.7rem] leading-relaxed text-flabo-text">
                📱 ホーム画面アプリでは言語切替が使えません。
                <span className="text-flabo-grey">
                  Chrome（動作確認済み）でサイトを開くとご利用いただけます。
                </span>
              </div>
            )}
            <div className="border-b border-white/10 p-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="言語を検索 / Search language"
                className="w-full rounded-md border border-white/10 bg-flabo-dark px-3 py-2 text-sm text-flabo-text placeholder:text-flabo-grey focus:border-flabo-red focus:outline-none"
              />
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered ? (
                filtered.length > 0 ? (
                  <div className="flex flex-col gap-0.5">
                    {filtered.map(renderItem)}
                  </div>
                ) : (
                  <p className="px-3 py-4 text-center text-sm text-flabo-grey">
                    該当なし / No results
                  </p>
                )
              ) : (
                <>
                  <p className="px-3 pb-1 pt-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-flabo-grey">
                    主要言語
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {PRIMARY.map(renderItem)}
                  </div>
                  <p className="px-3 pb-1 pt-3 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-flabo-grey">
                    その他
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {others.map(renderItem)}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
