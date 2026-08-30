/**
 * 管理画面（/admin）のセッション認証ユーティリティ。
 *
 * Cookie に入れるのは「有効期限 + それを ADMIN_SESSION_SECRET で HMAC-SHA256 署名した値」
 * だけで、パスワードそのものは一切保存しない。署名検証は Web Crypto (crypto.subtle) を使う
 * ため、Edge ランタイムの middleware からも Node ランタイムの Route Handler からも同じ
 * コードで呼べる。
 *
 * トークン形式:  v1.<有効期限(ms)>.<base64url(HMAC-SHA256)>
 */

/** セッション Cookie 名 */
export const ADMIN_COOKIE_NAME = "admin_session";

/** セッション有効期限（30日・秒） */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const TOKEN_VERSION = "v1";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET が未設定です");
  }
  return secret;
}

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** payload を HMAC-SHA256 で署名して base64url 文字列にする */
async function sign(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(signature);
}

/** 長さ・内容の両方を一定時間で比較する（タイミング攻撃対策） */
function timingSafeStringEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i += 1) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/** 30日後に失効する署名済みセッショントークンを発行する */
export async function createSessionToken(now: number = Date.now()): Promise<string> {
  const expiresAt = now + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = `${TOKEN_VERSION}.${expiresAt}`;
  return `${payload}.${await sign(payload)}`;
}

/**
 * トークンの署名と有効期限を検証する。
 * 署名不一致・期限切れ・形式不正・SECRET 未設定はすべて false（＝未ログイン扱い）。
 */
export async function verifySessionToken(
  token: string | undefined | null,
  now: number = Date.now(),
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [version, expiresAtRaw, signature] = parts;
  if (version !== TOKEN_VERSION) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= now) return false;

  try {
    const expected = await sign(`${version}.${expiresAtRaw}`);
    return timingSafeStringEqual(signature, expected);
  } catch {
    // SECRET 未設定など。安全側に倒して未ログイン扱いにする。
    return false;
  }
}
