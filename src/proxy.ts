import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

/**
 * /admin 配下を署名済み Cookie で保護する。
 * - /admin/login だけは素通し（ここで認証するため）
 * - Cookie が無い/壊れている/期限切れなら /admin/login へリダイレクト
 *
 * ※ Next.js 16 で middleware.ts は proxy.ts に改称された。src/app 構成なので src/ 直下に置く。
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (await verifySessionToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  if (pathname !== "/admin") {
    loginUrl.searchParams.set("from", `${pathname}${search}`);
  }

  const response = NextResponse.redirect(loginUrl);
  if (token) {
    // 無効なトークンは残さず捨てる
    response.cookies.delete(ADMIN_COOKIE_NAME);
  }
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
