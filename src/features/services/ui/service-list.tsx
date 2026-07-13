import Link from "next/link";
import { formatVnd, formatDuration } from "@/shared/lib/utils";
import { CATEGORY_ORDER, categoryLabel } from "@/features/services/domain/category";
import type { ServiceListItem } from "@/features/services/application/get-services";

export function ServiceList({ services }: { services: ServiceListItem[] }) {
  const groups = CATEGORY_ORDER.map((cat) => ({
    category: cat as string,
    items: services.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-14">
      {groups.map((group) => (
        <section key={group.category}>
          <h2 className="mb-6 flex items-center gap-3.5 font-display text-sm uppercase tracking-[0.24em] text-gold">
            <span className="inline-block h-px w-8 bg-gold" />
            {categoryLabel(group.category)}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {group.items.map((s) => (
              <article
                key={s.id}
                className={`flex flex-col justify-between rounded-xl border p-5 transition-colors ${
                  s.isFeatured
                    ? "border-gold bg-panel"
                    : "border-line bg-ink-2 hover:border-line-gold"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
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
                  <div>
                    <div className="font-display text-xl font-bold tabular-nums text-paper">
                      {s.priceMax
                        ? `${formatVnd(s.price)} – ${formatVnd(s.priceMax)}`
                        : formatVnd(s.price)}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-smoke-2">
                      {formatDuration(s.durationMin)}
                    </div>
                  </div>
                  <Link
                    href="/dat-lich"
                    className="rounded-[2px] border border-line-gold px-4 py-2 text-sm font-semibold text-paper transition-colors hover:border-gold hover:text-gold"
                  >
                    Đặt lịch
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
