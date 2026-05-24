import type { Metadata } from "next";
import { Orbitron, Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "フォーミュラ研究所（Fラボ）| F1・F2・F3・SF・INDYのニュース＆スケジュール",
  description:
    "F1・F2・F3・スーパーフォーミュラ・インディカーの最新ニュース、レーススケジュール、放送予定、チャンピオンシップ順位表をひとつのサイトで。フォーミュラ研究所（Fラボ）",
  keywords: [
    "F1",
    "F2",
    "F3",
    "スーパーフォーミュラ",
    "インディカー",
    "Fラボ",
    "フォーミュラ研究所",
  ],
  metadataBase: new URL("https://f-labo.vercel.app"),
  openGraph: {
    title: "フォーミュラ研究所（Fラボ）",
    description:
      "F1・F2・F3・スーパーフォーミュラ・インディカーの最新ニュース、放送予定、順位表まとめ",
    url: "https://f-labo.vercel.app",
    siteName: "フォーミュラ研究所",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${orbitron.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="kerb-stripe relative z-[101]" aria-hidden />
        <Header />
        <main className="flex-1 relative z-[1]">{children}</main>
        <Footer />
        <div className="kerb-stripe" aria-hidden />
      </body>
    </html>
  );
}
