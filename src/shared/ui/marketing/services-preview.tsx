import Link from "next/link";
import { formatVnd, formatDuration } from "@/shared/lib/utils";
import { SectionEyebrow } from "@/shared/ui/marketing/section-eyebrow";
import { ArrowRightIcon } from "@/shared/ui/icons";
import type { ServiceListItem } from "@/features/services/application/get-services";

export function ServicesPreview({ services }: { services: ServiceListItem[] }) {
  const items = services.slice(0, 6);

  return (
    <section className="border-t border-line bg-ink py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionEyebrow>Dịch vụ</SectionEyebrow>
            <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Bảng giá minh bạch, chuẩn form
            </h2>
          </div>
          <Link
            href="/dich-vu"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            Xem tất cả dịch vụ
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Link
              key={s.id}
              href="/dat-lich"
              className={`group flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 hover:-translate-y-1 ${
                s.isFeatured
                  ? "border-gold bg-panel"
                  : "border-line bg-ink-2 hover:border-line-gold"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-paper">
                    {s.name}
                  </h3>
                  {s.isFeatured && (
                    <span className="shrink-0 rounded-[2px] bg-gold px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
                      Nổi bật
                    </span>
                  )}
                </div>
                {s.suitableFor && (
                  <p className="mt-2 text-sm leading-relaxed text-smoke">
                    {s.suitableFor}
                  </p>
                )}
              </div>
              <div className="mt-5 flex items-end justify-between">
                <span className="font-display text-xl font-bold tabular-nums text-paper">
                  {s.priceMax
                    ? `${formatVnd(s.price)}+`
                    : formatVnd(s.price)}
                </span>
                <span className="text-xs uppercase tracking-wider text-smoke-2">
                  {formatDuration(s.durationMin)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
