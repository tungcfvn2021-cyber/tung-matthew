import Link from "next/link";
import { Logo } from "@/shared/ui/brand/logo";
import { QuickContacts } from "@/shared/ui/marketing/quick-contacts";
import { site } from "@/shared/config/site";

const footerLinks = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Đặt lịch", href: "/dat-lich" },
  { label: "Liên hệ", href: "/lien-he" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-smoke">
            Barber nam cao cấp tại {site.city}. Fade · Undercut · Mohican chuẩn
            form.
          </p>
          <QuickContacts className="mt-6" />
        </div>

        <nav aria-label="Liên kết" className="flex flex-col gap-3 text-sm text-smoke">
          <span className="text-[11px] uppercase tracking-[0.2em] text-smoke-2">
            Khám phá
          </span>
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-paper">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm text-smoke">
          <span className="text-[11px] uppercase tracking-[0.2em] text-smoke-2">
            Liên hệ
          </span>
          <span>{site.phone || "Đang cập nhật SĐT"}</span>
          <span className="max-w-xs leading-relaxed">
            {site.addressLine || "Đang cập nhật địa chỉ"}
            {site.addressLine ? `, ${site.city}` : ""}
          </span>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-2 px-5 py-5 text-[11px] uppercase tracking-[0.14em] text-smoke-2 sm:px-8">
          <span>© {new Date().getFullYear()} {site.legalName}</span>
          <span>Barber · {site.city}</span>
        </div>
      </div>
    </footer>
  );
}
