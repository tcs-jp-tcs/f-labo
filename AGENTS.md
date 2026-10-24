<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Fラボ（フォーミュラ研究所）プロジェクト概要

## このサイトについて
- F1 を中心としたフォーミュラカーレースのメディアサイト（正式名「フォーミュラ研究所」、略称「Fラボ」）。
- 本番 URL: https://f-labo.vercel.app
- ニュース、スケジュール、放送予定、レース結果、順位表、レースレビュー、サーキット図鑑、検定（F1 トリビアクイズ）を掲載している。
- データ上は F1 / F2 / F3 / SF（スーパーフォーミュラ）/ INDY を扱えるが、現在の表示は `src/lib/displayConfig.ts` で絞っている（結果・スケジュール・順位表・放送予定は F1 のみ、ニュースは INDY を非表示）。DB のデータは消さず、表示だけを止める方針。
- 日本語サイト（`lang="ja"`）。他言語は Google 翻訳ウィジェット（`LangSwitcher`）で切り替える。

## 使っている技術
- Next.js 16.2.6（App Router、`src/app`）/ React 19.2.4 / TypeScript 5
- Tailwind CSS v4（`@tailwindcss/postcss`）
- Supabase（`@supabase/supabase-js`）: 記事・日程・結果などのデータ、バナー画像の Storage（`banner-images` バケット）
- Vercel: ホスティング（このディレクトリは Vercel プロジェクト `f-labo` にリンク済み）
- Google Analytics 4（`src/app/layout.tsx` で読み込み）
- フォント: `next/font/google`（Orbitron、Noto Sans JP など）
- スクリプト実行用: `tsx`、`dotenv`

## フォルダ構成
```
src/
  app/            ページ（App Router）
  components/     共通コンポーネント
    admin/        管理画面用コンポーネント
  lib/            データ取得層（Supabase）・設定・型（data.ts）
  proxy.ts        /admin 配下の認証（Next.js 16 で middleware.ts から改称）
public/
  circuit-maps/   サーキット図鑑の「動くコースマップ」HTML（{map_embed_key}.html）
  images/ icons/ flabo-icons/   画像・アイコン
  manifest.json / admin-manifest.json   PWA マニフェスト（サイト用 / 管理画面用）
scripts/          ニュース投入・バナー画像アップロードなどの手動実行スクリプト
```

## 主なページ
| パス | 内容 |
|---|---|
| `/` | ホーム（ヒーローニュース、次戦、結果、順位、バナーなど） |
| `/news`、`/news/[id]`、`/news/archive` | ニュース一覧・記事・アーカイブ |
| `/schedule` | スケジュール |
| `/results` | レース結果 |
| `/standings` | 順位表 |
| `/review`、`/review/[slug]` | レースレビュー |
| `/circuits`、`/circuits/[slug]` | サーキット図鑑 |
| `/quiz`、`/quiz/[id]` | Fラボ検定（F1 トリビア） |
| `/about`、`/contact`、`/privacy` | 運営者情報・お問い合わせ・プライバシーポリシー |
| `/admin`、`/admin/plan`、`/admin/report`、`/admin/login` | 管理画面（SNS/GA4 の数値、コンテンツプラン、分析レポート、ログイン） |
| `/api/admin/login`、`/api/admin/logout` | 管理画面のログイン・ログアウト API |

- 公開ページの多くは `export const revalidate = 0`、管理画面は `dynamic = "force-dynamic"` で、Supabase の最新状態を毎回表示する。
- `robots.ts` で `/admin` と `/api/admin` はクロール対象外。

## データ（Supabase）
- 公開ページは `src/lib/supabase.ts`（anon キー）で読み取る。
- 管理画面のみ `src/lib/supabaseAdmin.ts`（service_role キー、サーバー専用）で、RLS で anon から読めない `sns_posts` / `ga4_daily` / `ga4_channels` / `sns_followers` などを読む。
- コードから参照している主なテーブル: `news`, `schedules`, `race_results`, `standings`, `reviews`, `circuits`, `circuit_winners`, `quizzes`, `embeds`, `affiliate_banners`, `site_settings`, `content_plan`, `insights`, `audience_countries`, `audience_agegender`, `sync_runs` など。
- `news` テーブルは anon では書き込めない（SELECT のみ）。書き込みは service_role キーか、同梱の `.sql` を管理権限で実行する。

## 環境変数（`.env.local`、Git 管理外）
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 必須（未設定だと `supabase.ts` がエラーを投げる）
- `SUPABASE_SERVICE_ROLE_KEY`: 管理画面・書き込み系スクリプト用
- `ADMIN_PASSWORD`: 管理画面のログインパスワード
- `ADMIN_SESSION_SECRET`: 管理画面セッション Cookie の HMAC 署名鍵
- Vercel 側の環境変数にも同じ値を登録する。

## コマンド
```bash
npm run dev     # 開発サーバー（http://localhost:3000）
npm run build   # 本番ビルド（公開前の確認に使う）
npm run start   # ビルド結果をローカルで起動して確認

# スクリプト（.env.local を読み込む）
npx tsx scripts/insert-news.ts                          # ニュース追加＋古い記事のアーカイブ
npx tsx scripts/seed-news.ts [--execute]                # data.ts のニュースを投入（既定はドライラン）
npx tsx scripts/upload-banner-image.ts <画像> [--as <名前>] [--banner <id>] [--execute]
                                                        # バナー画像を Storage へ（既定はドライラン）
```
- `package.json` に lint / test のスクリプトは無い。
- 公開手順: GitHub リポジトリ `tcs-jp-tcs/f-labo` の `main` ブランチに push すると、Vercel が自動で本番に公開する。
  ```bash
  npm run build          # 先にローカルでビルドが通ることを確認
  git push origin main   # push すると Vercel が本番に自動デプロイ
  ```
  `main` への push はそのまま本番に出るので、push する前にビルドが通ることを確認する。

## 作業するときの注意点
- Next.js 16 は従来と仕様が違う。コードを書く前に `node_modules/next/dist/docs/` を確認する（上記の注意書きを参照）。例: ミドルウェアは `src/proxy.ts`。
- `SUPABASE_SERVICE_ROLE_KEY` などの秘密値に `NEXT_PUBLIC_` を付けない。`supabaseAdmin.ts` を `"use client"` のファイルから import しない。
- `.env*` と `.vercel` は `.gitignore` 済み。コミットしない。
- 表示するシリーズ・ニュースカテゴリは `src/lib/displayConfig.ts` で切り替える。ニュースの INDY を戻すときは `HIDDEN_NEWS_CATEGORIES` を空にし、`NewsList` / `NewsArchive` の `TABS` にも `"INDY"` を戻す。
- 動くコースマップを追加するときは `public/circuit-maps/{key}.html` を置き、`circuits.map_embed_key` にそのキーを設定する。HTML の実在チェックをサーバー側の `fs.existsSync` で行うため、`next.config.ts` の `outputFileTracingIncludes` で `public/circuit-maps/**` を含めている（消さない）。
- バナー画像は `public/images/` に置かず、`scripts/upload-banner-image.ts` で Supabase Storage に上げて `affiliate_banners.image_url` を更新する（デプロイ不要で反映される）。
- スクリプトは既定でドライランのものがある。実際に書き込むときだけ `--execute` を付ける。
