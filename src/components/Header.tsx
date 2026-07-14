"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import LangSwitcher from "./LangSwitcher";
import TzSwitcher from "./TzSwitcher";
import { useLang } from "./LangProvider";

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/news", label: "ニュース" },
  { href: "/schedule", label: "スケジュール" },
  { href: "/results", label: "結果" },
  { href: "/standings", label: "順位表" },
  { href: "/review", label: "レビュー" },
  // サーキット図鑑タブ。EN切替時は確実に "Circuit Guide" を出すため lang で出し分け＋
  // その要素だけ translate="no" にして Google翻訳の再翻訳を止める（他タブはGT任せ）。
  { href: "/circuits", label: "サーキット図鑑" },
  { href: "/quiz", label: "検定" },
  { href: "/vote", label: "投票" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // /circuits は日本語=サーキット図鑑 / 英語(他言語含む)=Circuit Guide を固定表示する。
  const isCircuits = (href: string) => href === "/circuits";
  const labelOf = (item: { href: string; label: string }) =>
    isCircuits(item.href) && lang !== "ja" ? "Circuit Guide" : item.label;

  return (
    <header className="sticky top-0 z-50 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[60px]">
        <Link href="/" aria-label="Fラボ ホーム" onClick={() => setOpen(false)}>
          <HeaderLogo height={50} />
        </Link>
        <div className="flex items-center gap-1.5">
          <nav className="hidden md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                translate={isCircuits(item.href) ? "no" : undefined}
                className={`relative px-3.5 py-5 font-display font-bold uppercase tracking-[0.18em] text-[0.7rem] transition-colors ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-flabo-grey hover:text-white"
                }`}
              >
                {labelOf(item)}
                {isActive(item.href) && (
                  <span className="absolute left-3.5 right-3.5 bottom-0 h-[2px] bg-flabo-red" />
                )}
              </Link>
            ))}
          </nav>
          <LangSwitcher />
          <TzSwitcher />
          <button
            type="button"
            className="md:hidden text-white text-2xl px-2 py-1"
            aria-label="メニュー"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-flabo-dark border-b border-white/5 flex flex-col">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              translate={isCircuits(item.href) ? "no" : undefined}
              onClick={() => setOpen(false)}
              className={`px-6 py-3.5 text-sm border-b border-white/5 transition-colors ${
                isActive(item.href)
                  ? "text-white bg-white/5"
                  : "text-flabo-grey hover:text-white hover:bg-white/5"
              }`}
            >
              {labelOf(item)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
