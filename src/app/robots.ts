import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 管理人専用ページはクロール対象外（サイト内リンクも張っていない）
      disallow: ["/admin", "/api/admin"],
    },
    sitemap: "https://f-labo.vercel.app/sitemap.xml",
  };
}
