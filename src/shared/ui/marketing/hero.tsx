import Link from "next/link";
import { QuickContacts } from "@/shared/ui/marketing/quick-contacts";
import { ArrowRightIcon, ScissorsIcon } from "@/shared/ui/icons";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 30%, rgba(201,162,39,.10), transparent 60%), radial-gradient(120% 100% at 50% 120%, rgba(8,7,6,.72), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1.15fr_.85fr] md:gap-[72px] md:py-20">
        {/* left column */}
        <div>
          <p className="tm-reveal tm-d1 mb-6 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
            <span className="inline-block h-px w-11 bg-gold" />
            Barber · Vũng Tàu
          </p>

          <h1 className="tm-reveal tm-d2 max-w-[16ch] font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-[3.4rem] lg:text-[5.1rem]">
            Cắt tóc không chỉ để đẹp.{" "}
            <span className="italic text-gold">Mà để bạn tự tin</span> hơn mỗi
            ngày.
          </h1>

          <p className="tm-reveal tm-d3 mt-6 max-w-[44ch] leading-relaxed text-smoke sm:text-lg">
            Mỗi đường kéo là một tuyên ngôn phong cách. Đặt lịch với Tùng
            Matthew — nơi từng chi tiết được chăm chút cho riêng gương mặt bạn.
          </p>

          <div className="tm-reveal tm-d4 mt-9 flex flex-wrap gap-3.5">
            <Link
              href="/dat-lich"
              className="inline-flex items-center gap-2.5 rounded-[2px] bg-gold px-[30px] py-4 font-display text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold-soft"
            >
              Đặt lịch ngay
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/lookbook"
              className="inline-flex items-center rounded-[2px] border border-line-gold px-[30px] py-4 font-display text-sm font-semibold tracking-wide text-paper transition-colors hover:border-gold hover:text-gold"
            >
              Xem Lookbook
            </Link>
          </div>

          {/* social proof — thật, không con số bịa */}
          <div className="tm-reveal tm-d5 mt-11 flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-9">
            <div className="flex flex-col gap-1">
              <span className="text-[1.05rem] tracking-[2px] text-gold" aria-hidden>
                ★★★★★
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-smoke-2">
                Đánh giá thật · Google
              </span>
            </div>
            <span className="h-[38px] w-px bg-line" aria-hidden />
            <div className="flex flex-col gap-1">
              <b className="font-display text-2xl font-bold tabular-nums">5 năm</b>
              <span className="text-[11px] uppercase tracking-[0.14em] text-smoke-2">
                Theo nghề barber
              </span>
            </div>
            <span className="h-[38px] w-px bg-line" aria-hidden />
            <div className="flex flex-col gap-1">
              <b className="font-display text-2xl font-bold">Kín lịch</b>
              <span className="text-[11px] uppercase tracking-[0.14em] text-smoke-2">
                Mỗi cuối tuần
              </span>
            </div>
          </div>
        </div>

        {/* portrait frame — thay ảnh thật sau */}
        <div className="tm-reveal tm-d3 relative order-first flex aspect-[16/12] items-center justify-center overflow-hidden rounded-[3px] border border-line-gold md:order-none md:aspect-[4/5]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 15%, rgba(201,162,39,.14), transparent 55%), linear-gradient(160deg,#1c1813,#0b0a08 70%)",
          }}
        >
          <ScissorsIcon
            aria-hidden
            className="absolute -right-10 -top-10 h-[220px] w-[220px] rotate-12 text-gold opacity-10"
          />
          <Corner className="left-3 top-3 border-b-0 border-r-0" />
          <Corner className="right-3 top-3 border-b-0 border-l-0" />
          <Corner className="bottom-3 left-3 border-r-0 border-t-0" />
          <Corner className="bottom-3 right-3 border-l-0 border-t-0" />
          <span
            className="select-none font-display text-[5rem] font-bold leading-[0.9] tracking-tight text-transparent sm:text-[7rem]"
            style={{ WebkitTextStroke: "1.5px rgba(201,162,39,.35)" }}
          >
            TM
          </span>
          <span className="absolute bottom-4 left-0 right-0 text-center text-[11px] uppercase tracking-[0.18em] text-smoke-2">
            Ảnh chân dung của bạn
          </span>
        </div>
      </div>

      {/* quick contacts + scroll cue */}
      <div className="relative mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 pb-8 sm:px-8">
        <QuickContacts className="tm-reveal tm-d5" />
        <div className="tm-reveal tm-d6 hidden items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-smoke-2 md:flex">
          Cuộn xuống
          <span className="tm-scroll-tick inline-block h-[26px] w-px bg-gold" />
        </div>
      </div>
    </section>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-[26px] w-[26px] border border-gold opacity-70 ${className ?? ""}`}
    />
  );
}
