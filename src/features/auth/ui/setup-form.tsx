"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFirstAdmin } from "@/features/auth/ui/setup-actions";
import { Logo } from "@/shared/ui/brand/logo";

export function SetupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await createFirstAdmin({ email, password, name });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(res.error.message);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-paper">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Logo />
          <p className="mt-3 text-sm text-smoke-2">Thiết lập tài khoản quản trị</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-xl border border-line bg-ink-2 p-6"
        >
          <p className="text-sm text-smoke">
            Tạo tài khoản chủ tiệm (chỉ làm 1 lần). Dùng để đăng nhập quản lý
            booking.
          </p>
          <label className="block">
            <span className="mb-1.5 block text-sm text-smoke">Tên</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tùng Matthew"
              className="w-full rounded-md border border-line bg-ink px-3 py-3 text-paper outline-none focus:border-gold"
            />
          </label>
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
            <span className="mb-1.5 block text-sm text-smoke">
              Mật khẩu (≥ 8 ký tự)
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-md border border-line bg-ink px-3 py-3 text-paper outline-none focus:border-gold"
            />
          </label>
          {error && <p className="text-sm text-gold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-[2px] bg-gold px-6 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            {loading ? "Đang tạo…" : "Tạo tài khoản & vào quản trị"}
          </button>
        </form>
      </div>
    </main>
  );
}
