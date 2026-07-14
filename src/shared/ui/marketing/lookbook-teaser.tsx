import Link from "next/link";
import { SectionEyebrow } from "@/shared/ui/marketing/section-eyebrow";
import { ArrowRightIcon } from "@/shared/ui/icons";
import type { GalleryItemDTO } from "@/features/lookbook/application/get-gallery";

export function LookbookTeaser({ items }: { items: GalleryItemDTO[] }) {
  const preview = items.slice(0, 6);
  if (preview.length === 0) return null;

  return (
    <section className="border-t border-line bg-ink py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionEyebrow>Lookbook</SectionEyebrow>
            <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Kết quả thật, trên chính khách hàng
            </h2>
          </div>
          <Link
            href="/lookbook"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            Xem toàn bộ Lookbook
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {preview.map((item) => (
            <Link
              key={item.id}
              href="/lookbook"
              className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-line"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.afterUrl}
                alt={item.title ?? "Kiểu tóc tại Tùng Matthew"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
