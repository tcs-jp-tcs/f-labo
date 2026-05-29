/**
 * data.ts の既存ニュースデータを Supabase の news テーブルへ投入するシードスクリプト。
 *
 * 実行方法（※ まだ実行しない。和博さんの確認後に実行）:
 *   cd ~/Desktop/FLabo/f-labo
 *   npx tsx scripts/seed-news.ts            # 確認のみ（ドライラン）
 *   npx tsx scripts/seed-news.ts --execute  # 実際に投入
 *
 * 必要な環境変数（.env.local）:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_ROLE_KEY   ← 任意。RLS で anon の INSERT が拒否される場合に使用。
 *                                 設定があればこちらを優先（.env.local には公開しないこと）。
 *
 * テーブル news のカラム:
 *   id, category, title, summary, source_name, source_url,
 *   thumbnail_url, published_at, archived, created_at
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "node:path";

import { news, type NewsItem } from "../src/lib/data";

// .env.local を読み込み
config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const key = serviceRoleKey ?? anonKey;

if (!supabaseUrl || !key) {
  console.error(
    "環境変数が不足しています。.env.local に NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY（必要なら SUPABASE_SERVICE_ROLE_KEY）を設定してください。"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, key);

/**
 * 日本語日付「2026年5月26日」→ ISO 文字列（UTC 0:00）に変換。
 * パースできない場合は null を返す。
 */
function parseJapaneseDate(jp: string): string | null {
  const m = jp.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!m) return null;
  const [, y, mo, d] = m;
  // 日付のみの情報なので JST 正午相当（UTC 03:00）で保存し、日付ズレを防ぐ
  const iso = new Date(
    Date.UTC(Number(y), Number(mo) - 1, Number(d), 3, 0, 0)
  ).toISOString();
  return iso;
}

type NewsRow = {
  category: string;
  title: string;
  summary: string;
  source_name: string;
  source_url: string;
  thumbnail_url: string | null;
  published_at: string | null;
  archived: boolean;
};

function toRow(item: NewsItem): NewsRow {
  return {
    category: item.category,
    title: item.title,
    summary: item.summary,
    source_name: item.source,
    source_url: item.url,
    thumbnail_url: item.imageUrl ?? null,
    published_at: parseJapaneseDate(item.date),
    archived: false,
  };
}

async function main() {
  const execute = process.argv.includes("--execute");

  const rows = news.map(toRow);

  // 日付パース失敗を警告
  const unparsed = news.filter((n) => parseJapaneseDate(n.date) === null);
  if (unparsed.length > 0) {
    console.warn(`⚠️ 日付をパースできなかった記事が ${unparsed.length} 件あります:`);
    unparsed.forEach((n) => console.warn(`   - "${n.date}" : ${n.title}`));
  }

  // 既存 source_url を取得して重複をスキップ（再実行安全）
  const { data: existing, error: selErr } = await supabase
    .from("news")
    .select("source_url");

  if (selErr) {
    console.error("既存データの取得に失敗:", selErr.message);
    process.exit(1);
  }

  const existingUrls = new Set((existing ?? []).map((r) => r.source_url));
  const toInsert = rows.filter((r) => !existingUrls.has(r.source_url));
  const skipped = rows.length - toInsert.length;

  console.log(`使用キー: ${serviceRoleKey ? "service_role" : "anon"}`);
  console.log(`data.ts のニュース総数: ${rows.length} 件`);
  console.log(`既存（DB）でスキップ: ${skipped} 件`);
  console.log(`投入対象: ${toInsert.length} 件`);

  if (!execute) {
    console.log("\n--- ドライラン（投入しません）---");
    console.log("投入予定の先頭3件:");
    console.log(JSON.stringify(toInsert.slice(0, 3), null, 2));
    console.log(
      "\n実際に投入するには `npx tsx scripts/seed-news.ts --execute` を実行してください。"
    );
    return;
  }

  if (toInsert.length === 0) {
    console.log("投入対象がありません。終了します。");
    return;
  }

  const { data, error } = await supabase
    .from("news")
    .insert(toInsert)
    .select("id");

  if (error) {
    console.error("投入に失敗:", error.message);
    process.exit(1);
  }

  console.log(`✅ ${data?.length ?? 0} 件を投入しました。`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
