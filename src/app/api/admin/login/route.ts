import crypto from "node:crypto";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  createSessionToken,
} from "@/lib/adminAuth";

/** timingSafeEqual を使うため Node ランタイムを明示する */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 長さの違いで分岐しないよう、両方を SHA-256 で固定長にしてから
 * crypto.timingSafeEqual で比較する（タイミング攻撃対策）。
 */
function isSamePassword(input: string, expected: string): boolean {
  const a = crypto.createHash("sha256").update(input, "utf8").digest();
  const b = crypto.createHash("sha256").update(expected, "utf8").digest();
  return crypto.timingSafeEqual(a, b);
}

async function readPassword(request: Request): Promise<string> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => null)) as unknown;
    if (body && typeof body === "object" && "password" in body) {
      const value = (body as { password: unknown }).password;
      return typeof value === "string" ? value : "";
    }
    return "";
  }
  const form = await request.formData().catch(() => null);
  return form ? String(form.get("password") ?? "") : "";
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!expected || !secret) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "サーバー設定が未完了です（ADMIN_PASSWORD / ADMIN_SESSION_SECRET を設定してください）。",
      },
      { status: 500 },
    );
  }

  const password = await readPassword(request);
  if (!isSamePassword(password, expected)) {
    return NextResponse.json(
      { ok: false, error: "パスワードが違います" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: await createSessionToken(),
    httpOnly: true,
    // ローカル開発（http://localhost）では secure だと Cookie が保存されないため本番のみ付与
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
