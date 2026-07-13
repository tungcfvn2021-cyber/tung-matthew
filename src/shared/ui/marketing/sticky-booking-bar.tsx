import Link from "next/link";
import { site } from "@/shared/config/site";

/** Thanh đặt lịch dính đáy — chỉ hiện trên mobile (Bước 7). */
export function StickyBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line-gold bg-ink-2/95 px-4 py-3 backdrop-blur-md md:hidden">
      <a
        href={site.socials.zalo || "#"}
        className="inline-flex flex-1 items-center justify-center rounded-[2px] border border-line-gold px-4 py-[15px] font-display text-sm font-semibold tracking-wide text-paper"
      >
        Zalo
      </a>
      <Link
        href="/dat-lich"
        className="inline-flex flex-[2] items-center justify-center rounded-[2px] bg-gold px-4 py-[15px] font-display text-sm font-semibold tracking-wide text-ink"
      >
        Đặt lịch ngay
      </Link>
    </div>
  );
}
