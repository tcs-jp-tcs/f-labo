import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** ?from= はオープンリダイレクト防止のため /admin 配下のみ許可する */
function safeRedirectTarget(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return "/admin";
  if (!raw.startsWith("/admin") || raw.startsWith("//")) return "/admin";
  return raw;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const redirectTo = safeRedirectTarget(params.from);

  // すでにログイン済みならダッシュボードへ
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (await verifySessionToken(token)) {
    redirect(redirectTo);
  }

  return (
    <div className="wrap">
      <div className="login">
        <div className="login-box">
          <div className="eyebrow">F-Labo / Admin</div>
          <h1>SNS TELEMETRY</h1>
          <p className="lead">管理人専用ページです。パスワードを入力してください。</p>
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}
