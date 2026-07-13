import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/shared/config/site";
import {
  PhoneIcon,
  ZaloIcon,
  MessengerIcon,
  TiktokIcon,
  ArrowRightIcon,
} from "@/shared/ui/icons";

export const metadata: Metadata = {
  title: "Tùng Matthew — Barber Vũng Tàu",
  description: "Đặt lịch cắt tóc với Tùng Matthew — barber tại Vũng Tàu.",
  robots: { index: false, follow: false },
};

const links = [
  { label: "Nhắn Zalo", href: site.socials.zalo || "#", Icon: ZaloIcon },
  {
    label: "Gọi ngay",
    href: site.phone ? `tel:${site.phone}` : "#",
    Icon: PhoneIcon,
  },
  { label: "Messenger", href: site.socials.messenger || "#", Icon: MessengerIcon },
  { label: "Facebook", href: site.socials.facebook || "#", Icon: null },
  { label: "TikTok", href: site.socials.tiktok || "#", Icon: TiktokIcon },
];

export default function BioPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center px-6 py-12">
      <div
        className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-line-gold"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 15%, rgba(201,162,39,.18), transparent 55%)",
        }}
      >
        {site.portraitUrl ? (
          <Image
            src={site.portraitUrl}
            alt="Tùng Matthew"
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <span
            className="font-display text-3xl font-bold text-transparent"
            style={{ WebkitTextStroke: "1.2px rgba(201,162,39,.5)" }}
          >
            TM
          </span>
        )}
      </div>

      <h1 className="mt-5 font-display text-2xl font-bold">Tùng Matthew</h1>
      <p className="mt-1 text-sm text-smoke">Barber · {site.city}</p>
      <p className="mt-3 text-sm text-gold">★★★★★ Đánh giá thật trên Google</p>

      <Link
        href={{ pathname: "/dat-lich", query: { utm_source: "bio" } }}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-[2px] bg-gold px-6 py-4 font-display text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
      >
        Đặt lịch ngay
        <ArrowRightIcon className="h-4 w-4" />
      </Link>

      <div className="mt-4 flex w-full flex-col gap-3">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            className="flex items-center justify-center gap-2 rounded-[2px] border border-line-gold px-6 py-3.5 font-display text-sm font-semibold text-paper transition-colors hover:border-gold hover:text-gold"
          >
            {Icon && <Icon className="h-[18px] w-[18px]" />}
            {label}
          </a>
        ))}
      </div>

      <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-smoke-2">
        📍 {site.city}
      </p>
    </main>
  );
}
