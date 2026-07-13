import Link from "next/link";
import { requireAdmin } from "@/shared/lib/auth-guard";
import { SignOutButton } from "@/features/admin/ui/sign-out-button";
import { Logo } from "@/shared/ui/brand/logo";

const nav = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/bookings", label: "Booking" },
  { href: "/admin/khach-hang", label: "Khách hàng" },
  { href: "/admin/lookbook", label: "Lookbook" },
] as const;

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col md:flex-row">
        <aside className="flex flex-col gap-6 border-b border-line px-5 py-6 md:w-60 md:border-b-0 md:border-r">
          <Link href="/admin">
            <Logo />
          </Link>
          <nav className="flex flex-row gap-1 md:flex-col">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-2 text-sm text-smoke transition-colors hover:bg-ink-2 hover:text-paper"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto hidden flex-col gap-2 border-t border-line pt-4 md:flex">
            <span className="truncate text-xs text-smoke-2">
              {session.user.email}
            </span>
            <SignOutButton />
          </div>
        </aside>

        <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
