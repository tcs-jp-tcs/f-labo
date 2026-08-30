import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * service_role キーを使う Supabase クライアント（サーバー専用）。
 *
 * sns_posts / ga4_daily / ga4_channels / sns_followers は RLS 有効・ポリシー無しのため
 * anon キーでは読めない。管理画面のサーバー側からのみこのクライアントで読む。
 *
 * ※ SUPABASE_SERVICE_ROLE_KEY は NEXT_PUBLIC_ を付けない。クライアントへ渡さないこと。
 *   このモジュールは "use client" を持つファイルから import してはいけない。
 */
let cached: SupabaseClient | null = null;

/** キー未設定なら null を返す（ビルドや他ページを落とさないため） */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  if (!cached) {
    cached = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}
