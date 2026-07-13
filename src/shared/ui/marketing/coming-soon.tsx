import Link from "next/link";
import { ArrowRightIcon } from "@/shared/ui/icons";

/** Trang placeholder on-brand cho các route sẽ hoàn thiện ở sprint sau. */
export function ComingSoon({
  eyebrow,
  title,
  sprint,
}: {
  eyebrow: string;
  title: string;
  sprint: string;
}) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1320px] flex-col justify-center px-5 py-20 sm:px-8">
      <p className="mb-6 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
        <span className="inline-block h-px w-11 bg-gold" />
        {eyebrow}
      </p>
      <h1 className="max-w-[18ch] font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-md leading-relaxed text-smoke">
        Trang này đang được hoàn thiện ({sprint}). Trong lúc chờ, bạn có thể đặt
        lịch trực tiếp.
      </p>
      <div className="mt-9">
        <Link
          href="/dat-lich"
          className="inline-flex items-center gap-2.5 rounded-[2px] bg-gold px-[30px] py-4 font-display text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold-soft"
        >
          Đặt lịch ngay
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
