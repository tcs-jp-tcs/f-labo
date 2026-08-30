import type { Metadata } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import "./admin.css";

/**
 * 管理画面の共通ラッパー。
 * - #admin-root を付けることで admin.css のスコープとサイト共通ヘッダー/フッターの
 *   非表示（body:has(#admin-root) セレクタ）が有効になる
 * - 見出し用 Chakra Petch と数値用 JetBrains Mono をこの階層だけで読み込む
 */
const chakraPetch = Chakra_Petch({
  variable: "--font-admin-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-admin-mono",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SNS TELEMETRY — F-Labo",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="admin-root" className={`${chakraPetch.variable} ${jetBrainsMono.variable}`}>
      {children}
    </div>
  );
}
