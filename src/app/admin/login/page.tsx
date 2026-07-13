"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/shared/lib/auth-client";
import { Logo } from "@/shared/ui/brand/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn.email({ email, password });
    setLoading(false);
    if (res.error) {
      setError("Email hoặc mật khẩu không đúng.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-paper">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Logo />
          <p className="mt-3 text-sm text-smoke-2">Khu quản trị</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-xl border border-line bg-ink-2 p-6"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm text-smoke">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-line bg-ink px-3 py-3 text-paper outline-none focus:border-gold"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-smoke">Mật khẩu</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-line bg-ink px-3 py-3 text-paper outline-none focus:border-gold"
            />
          </label>
          {error && <p className="text-sm text-gold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-[2px] bg-gold px-6 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
      </div>
    </main>
  );
}
