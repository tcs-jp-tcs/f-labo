import { createClient } from "@supabase/supabase-js";

/**
 * Supabase 接続クライアント
 * - プロジェクト: fwlqxrnbcozrtiizhwxb (ap-northeast-1)
 * - 公開用 anon key を使用（クライアント／サーバー両用）
 *
 * 環境変数は .env.local に設定:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase の環境変数が未設定です。.env.local に NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY を設定してください。"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
