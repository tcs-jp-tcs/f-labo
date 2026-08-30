import Link from "next/link";

/** 管理画面3ページ共通のナビゲーション（サイトのヘッダーには出さない） */
const LINKS: { href: string; label: string }[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/report", label: "Report" },
  { href: "/admin/plan", label: "Plan" },
];

export default function AdminNav({ current }: { current: string }) {
  return (
    <nav className="nav" aria-label="管理画面ナビゲーション">
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className={link.href === current ? "on" : ""}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
