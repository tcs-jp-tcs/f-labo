import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // サーキット図鑑の詳細ルートは、コースマップHTMLの実在チェック（fs.existsSync）を
  // サーバー側で行う。既定では public/ はサーバーレス関数のファイルシステムに含まれず
  // 実在判定が常に false になってしまうため、当該ルートのトレースに明示的に含める。
  outputFileTracingIncludes: {
    "/circuits/[slug]": ["./public/circuit-maps/**"],
  },
};

export default nextConfig;
