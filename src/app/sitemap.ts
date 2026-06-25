import type { MetadataRoute } from "next";

const BASE_URL = "https://f-labo.vercel.app";

// 主要ページのサイトマップ。更新頻度の高いページほど changeFrequency を短く、
// priority を高く設定して、クローラーの巡回優先度を伝える。
const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/news", changeFrequency: "daily", priority: 0.9 },
  { path: "/schedule", changeFrequency: "daily", priority: 0.8 },
  { path: "/results", changeFrequency: "weekly", priority: 0.8 },
  { path: "/standings", changeFrequency: "weekly", priority: 0.8 },
  { path: "/review", changeFrequency: "weekly", priority: 0.7 },
  { path: "/quiz", changeFrequency: "weekly", priority: 0.6 },
  { path: "/vote", changeFrequency: "weekly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
