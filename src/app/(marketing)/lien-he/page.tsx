import type { Metadata } from "next";
import { site } from "@/shared/config/site";
import {
  LocalBusinessJsonLd,
  BreadcrumbJsonLd,
} from "@/features/seo/structured-data";
import { QuickContacts } from "@/shared/ui/marketing/quick-contacts";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Địa chỉ, bản đồ và cách liên hệ đặt lịch với barber Tùng Matthew tại Vũng Tàu.",
  alternates: { canonical: "/lien-he" },
};

const mapQuery = encodeURIComponent(
  site.addressLine ? `${site.addressLine}, ${site.city}` : `Barber ${site.city}`,
);

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8">
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Liên hệ", path: "/lien-he" },
        ]}
      />

      <p className="mb-5 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
        <span className="inline-block h-px w-11 bg-gold" />
        Liên hệ
      </p>
      <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
        Ghé tiệm hoặc nhắn Zalo
      </h1>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-smoke-2">
              Địa chỉ
            </h2>
            <p className="mt-1 text-lg text-paper">
              {site.addressLine
                ? `${site.addressLine}, ${site.city}`
                : `Đang cập nhật · ${site.city}`}
            </p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-smoke-2">
              Điện thoại
            </h2>
            <p className="mt-1 text-lg">
              {site.phone ? (
                <a href={`tel:${site.phone}`} className="text-gold">
                  {site.phone}
                </a>
              ) : (
                <span className="text-smoke">Đang cập nhật</span>
              )}
            </p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-smoke-2">
              Giờ mở cửa
            </h2>
            <p className="mt-1 text-lg text-paper">Thứ 2 – Chủ nhật · 09:00 – 21:00</p>
          </div>
          <div>
            <h2 className="mb-2 text-xs uppercase tracking-wider text-smoke-2">
              Kết nối
            </h2>
            <QuickContacts />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <iframe
            title={`Bản đồ ${site.legalName}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
