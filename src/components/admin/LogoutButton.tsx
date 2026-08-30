"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** セッション Cookie を破棄してログイン画面へ戻す */
export default function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button type="button" className="btn" onClick={handleClick} disabled={pending}>
      {pending ? "Logging out…" : "Logout"}
    </button>
  );
}
