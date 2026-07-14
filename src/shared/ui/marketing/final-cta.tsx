import Link from "next/link";
import { site } from "@/shared/config/site";
import { ArrowRightIcon } from "@/shared/ui/icons";

export function FinalCta() {
  return (
    <section className="border-t border-line bg-ink py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div
          className="relative overflow-hidden rounded-2xl border border-line-gold px-6 py-14 text-center sm:px-12"
          style={{
            background:
              "radial-gradient(90% 120% at 50% 0%, rgba(201,162,39,.12), transparent 60%), linear-gradient(160deg,#191612,#0b0a08 80%)",
          }}
        >
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
            Sẵn sàng đổi diện mạo?
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-smoke">
            Đặt lịch trong 30 giây. Cuối tuần thường kín — giữ chỗ sớm để có
            khung giờ đẹp.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/dat-lich"
              className="inline-flex items-center gap-2.5 rounded-[2px] bg-gold px-8 py-4 font-display text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold-soft"
            >
              Đặt lịch ngay
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            {site.phone && (
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center rounded-[2px] border border-line-gold px-8 py-4 font-display text-sm font-semibold tracking-wide text-paper transition-colors hover:border-gold hover:text-gold"
              >
                Gọi {site.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
