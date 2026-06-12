import type { Metadata, Viewport } from "next";
import { Orbitron, Noto_Sans_JP, M_PLUS_1p, Chakra_Petch } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestBanner from "@/components/TestBanner";
import LangProvider from "@/components/LangProvider";
import "./globals.css";

const GA_ID = "G-WVP9R50FW5";
const ADSENSE_CLIENT = "ca-pub-3569776484788072";

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

const mPlus1p = M_PLUS_1p({
  variable: "--font-mplus-1p",
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

// カードヘッダーのカテゴリーラベル（ワードマーク）専用
const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["700"],
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Fラボ",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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

export const viewport: Viewport = {
  themeColor: "#E10600",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${orbitron.variable} ${notoSansJp.variable} ${mPlus1p.variable} ${chakraPetch.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* React安定化パッチ: Google翻訳×React の removeChild/insertBefore クラッシュを
            ハイドレーション前にガード（子でないノード操作を no-op 化） */}
        <Script id="gt-removechild-guard" strategy="beforeInteractive">
          {`
            if (typeof Node === 'function' && Node.prototype) {
              const _r = Node.prototype.removeChild;
              Node.prototype.removeChild = function(c){ if(c && c.parentNode !== this){ return c; } return _r.apply(this, arguments); };
              const _i = Node.prototype.insertBefore;
              Node.prototype.insertBefore = function(n, ref){ if(ref && ref.parentNode !== this){ return n; } return _i.apply(this, arguments); };
            }
          `}
        </Script>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* Google翻訳ウィジェット（非表示コンテナ）。combo は LangSwitcher 経由で操作 */}
        <div id="google_translate_element" className="hidden" />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement({ pageLanguage: 'ja', autoDisplay: false }, 'google_translate_element');
            };
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <LangProvider>
          <TestBanner />
          <div className="kerb-stripe relative z-[101]" aria-hidden />
          <Header />
          <main className="flex-1 relative z-[1]">{children}</main>
          <Footer />
          <div className="kerb-stripe" aria-hidden />
        </LangProvider>
      </body>
    </html>
  );
}
