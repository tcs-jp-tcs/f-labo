"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HeaderLogo from "./HeaderLogo";

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/news", label: "ニュース" },
  { href: "/schedule", label: "スケジュール" },
  { href: "/results", label: "結果" },
  { href: "/standings", label: "順位表" },
  { href: "/review", label: "レビュー" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[60px]">
        <Link href="/" aria-label="Fラボ ホーム" onClick={() => setOpen(false)}>
          <HeaderLogo width={96} />
        </Link>
        <nav className="hidden md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3.5 py-5 font-display font-bold uppercase tracking-[0.18em] text-[0.7rem] transition-colors ${
                isActive(item.href)
                  ? "text-white"
                  : "text-flabo-grey hover:text-white"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute left-3.5 right-3.5 bottom-0 h-[2px] bg-flabo-red" />
              )}
            </Link>
          ))}
        </nav>
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
      {open && (
        <div className="md:hidden bg-flabo-dark border-b border-white/5 flex flex-col">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-6 py-3.5 text-sm border-b border-white/5 transition-colors ${
                isActive(item.href)
                  ? "text-white bg-white/5"
                  : "text-flabo-grey hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
