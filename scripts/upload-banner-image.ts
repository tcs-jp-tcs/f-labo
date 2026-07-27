/**
 * バナー画像を Supabase Storage（banner-images バケット）へアップロードするスクリプト。
 *
 * 目的: バナー画像の差し替えを Git commit / Vercel デプロイなしで完結させる。
 *   アップロード後は affiliate_banners.image_url を公開URLに更新するだけで本番に反映される
 *   （画像は public/images/ に置かない。過去バナーの相対パスはそのまま動く）。
 *
 * 実行方法:
 *   cd ~/Desktop/FLabo/f-labo
 *   npx tsx scripts/upload-banner-image.ts <画像パス>                        # ドライラン（確認のみ）
 *   npx tsx scripts/upload-banner-image.ts <画像パス> --execute              # アップロード実行
 *   npx tsx scripts/upload-banner-image.ts <画像パス> --as 2026/xxx.jpg --execute
 *   npx tsx scripts/upload-banner-image.ts <画像パス> --banner <id> --execute # image_url も更新
 *
 * 例:
 *   npx tsx scripts/upload-banner-image.ts \
 *     "../Amazon/Summer break special.png" --as summer-break-2026.jpg \
 *     --banner summer-break-2026-goods --execute
 *
 * 必要な環境変数（.env.local）:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   ← 必須。banner-images は public read のみで、
 *                                 書き込みポリシーを持たないため anon キーでは拒否される。
 *                                 （Supabase ダッシュボード > Project Settings > API > service_role）
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";

config({ path: resolve(__dirname, "../.env.local") });

const BUCKET = "banner-images";

/** 拡張子 → Content-Type（バケットの allowed_mime_types に対応する形式のみ） */
const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

function parseArgs(argv: string[]) {
  const positional: string[] = [];
  const flags: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const name = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[name] = next;
        i++;
      } else {
        flags[name] = true;
      }
    } else {
      positional.push(a);
    }
  }
  return { positional, flags };
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const sourcePath = positional[0];

  if (!sourcePath) {
    console.error(
      "使い方: npx tsx scripts/upload-banner-image.ts <画像パス> [--as <バケット内パス>] [--banner <banner_id>] [--execute]",
    );
    process.exit(1);
  }

  const absSource = resolve(process.cwd(), sourcePath);
  const ext = extname(absSource).toLowerCase();
  const contentType = MIME_BY_EXT[ext];
  if (!contentType) {
    console.error(
      `対応していない拡張子です: ${ext}（対応: ${Object.keys(MIME_BY_EXT).join(", ")}）`,
    );
    process.exit(1);
  }

  // バケット内パス。--as 未指定ならファイル名をそのまま使う（空白は - に置換）
  const objectPath =
    typeof flags.as === "string"
      ? flags.as
      : basename(absSource).replace(/\s+/g, "-");
  const bannerId = typeof flags.banner === "string" ? flags.banner : null;
  const execute = flags.execute === true;

  let file: Buffer;
  try {
    file = readFileSync(absSource);
  } catch {
    console.error(`画像を読み込めません: ${absSource}`);
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) {
    console.error("NEXT_PUBLIC_SUPABASE_URL が未設定です（.env.local）。");
    process.exit(1);
  }

  const publicUrl = `${url}/storage/v1/object/public/${BUCKET}/${objectPath}`;

  console.log(`元ファイル : ${absSource}`);
  console.log(`サイズ     : ${(file.byteLength / 1024).toFixed(1)} KB`);
  console.log(`アップ先   : ${BUCKET}/${objectPath} (${contentType})`);
  console.log(`公開URL    : ${publicUrl}`);
  console.log(
    `image_url  : ${bannerId ? `affiliate_banners.id='${bannerId}' を更新` : "更新しない（--banner 未指定）"}`,
  );

  if (!execute) {
    console.log("\n[ドライラン] --execute を付けると実行します。");
    return;
  }

  // 書き込みは service_role のみ（banner-images は public read のみで書き込みポリシーを持たない）
  if (!serviceKey) {
    console.error(
      "\nSUPABASE_SERVICE_ROLE_KEY が未設定です（.env.local）。\n" +
        "Supabase ダッシュボード > Project Settings > API > service_role key を設定してください。",
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(objectPath, file, { contentType, upsert: true });

  if (uploadError) {
    console.error(`アップロード失敗: ${uploadError.message}`);
    process.exit(1);
  }
  console.log("\nアップロード完了。");

  // 公開URLが実際に取得できるか確認（public バケットなので認証不要で 200 になるはず）
  const check = await fetch(publicUrl, { method: "HEAD" });
  console.log(`公開URL確認: HTTP ${check.status}`);
  if (!check.ok) {
    console.error("公開URLが取得できませんでした。バケットの public 設定を確認してください。");
    process.exit(1);
  }

  if (!bannerId) return;

  const { data, error: updateError } = await supabase
    .from("affiliate_banners")
    .update({ image_url: publicUrl })
    .eq("id", bannerId)
    .select("id, title, image_url");

  if (updateError) {
    console.error(`image_url の更新に失敗: ${updateError.message}`);
    process.exit(1);
  }
  if (!data || data.length === 0) {
    console.error(`該当バナーが見つかりません: id='${bannerId}'`);
    process.exit(1);
  }
  console.log(`image_url 更新完了: ${data[0].title} → ${data[0].image_url}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
