import { BeforeAfter } from "@/features/lookbook/ui/before-after";
import { categoryLabel } from "@/features/services/domain/category";
import type { GalleryItemDTO } from "@/features/lookbook/application/get-gallery";

export function GalleryGrid({ items }: { items: GalleryItemDTO[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <figure key={item.id} className="flex flex-col gap-2">
          {item.beforeUrl ? (
            <BeforeAfter
              before={item.beforeUrl}
              after={item.afterUrl}
              alt={item.title ?? "Kiểu tóc tại Tùng Matthew"}
            />
          ) : (
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.afterUrl}
                alt={item.title ?? "Kiểu tóc tại Tùng Matthew"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <figcaption className="flex items-center justify-between text-sm">
            <span className="text-paper">{item.title}</span>
            {item.category && (
              <span className="text-xs uppercase tracking-wider text-gold">
                {categoryLabel(item.category)}
              </span>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
