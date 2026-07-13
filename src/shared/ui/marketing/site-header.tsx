import Link from "next/link";
import { Logo } from "@/shared/ui/brand/logo";

const navLinks = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Gợi ý kiểu tóc", href: "/goi-y-kieu-toc" },
  { label: "Liên hệ", href: "/lien-he" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-[22px] sm:px-8">
        <Link href="/" aria-label="Tùng Matthew — trang chủ">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-[30px] text-[13px] tracking-[0.06em] text-smoke md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-paper">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/dat-lich"
          className="hidden rounded-[2px] bg-gold px-5 py-[11px] font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-gold-soft md:inline-flex"
        >
          Đặt lịch
        </Link>
      </nav>
    </header>
  );
}
