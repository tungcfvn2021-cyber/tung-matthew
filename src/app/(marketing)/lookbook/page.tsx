import type { Metadata } from "next";
import Link from "next/link";
import { getGallery } from "@/features/lookbook/application/get-gallery";
import { GalleryGrid } from "@/features/lookbook/ui/gallery-grid";
import { BreadcrumbJsonLd } from "@/features/seo/structured-data";
import { ArrowRightIcon } from "@/shared/ui/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Bộ sưu tập kiểu tóc nam thực tế của Tùng Matthew — before/after, Fade, Undercut, Mohican tại Vũng Tàu.",
  alternates: { canonical: "/lookbook" },
};

export default async function LookbookPage() {
  const items = await getGallery();

  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Lookbook", path: "/lookbook" },
        ]}
      />
      <header className="mb-12 max-w-2xl">
        <p className="mb-5 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
          <span className="inline-block h-px w-11 bg-gold" />
          Lookbook
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          Kết quả thật, trên chính khách hàng.
        </h1>
        <p className="mt-4 leading-relaxed text-smoke">
          Kéo thanh trượt để xem sự khác biệt trước và sau. Ảnh được đăng khi có
          sự đồng ý của khách.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-smoke">Đang cập nhật bộ sưu tập.</p>
      ) : (
        <GalleryGrid items={items} />
      )}

      <div className="mt-14 text-center">
        <Link
          href="/dat-lich"
          className="inline-flex items-center gap-2.5 rounded-[2px] bg-gold px-[30px] py-4 font-display text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold-soft"
        >
          Đặt lịch để có diện mạo của bạn
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
