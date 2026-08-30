"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** 管理画面ログインフォーム（パスワード1つ） */
export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(redirectTo);
        router.refresh();
        return;
      }
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "ログインに失敗しました");
    } catch {
      setError("通信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="admin-password">Password</label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={pending}
        autoFocus
      />
      <button type="submit" disabled={pending || password.length === 0}>
        {pending ? "認証中…" : "Enter"}
      </button>
      {error && (
        <p className="login-err" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
