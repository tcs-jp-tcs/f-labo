import type { Metadata, Viewport } from "next";
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
  // ルートの /manifest.json は start_url が "/" 固定のため、ホーム画面に追加すると
  // /admin で追加してもトップが開いてしまう。/admin 配下だけ start_url="/admin" の
  // 専用マニフェストで上書きする（マニフェスト自体は認証の外に置く必要があるので
  // /admin 配下ではなく public/ 直下に配置している）。
  manifest: "/admin-manifest.json",
  appleWebApp: {
    capable: true,
    title: "Telemetry",
    statusBarStyle: "black-translucent",
  },
};

/** ホーム画面から起動したときのステータスバーを管理画面の地色に合わせる */
export const viewport: Viewport = {
  themeColor: "#070A0F",
  width: "device-width",
  initialScale: 1,
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
