import type { Metadata } from "next";
import {
  getServicesForBooking,
  getWorkingHours,
} from "@/features/services/application/get-services";
import { BookingForm } from "@/features/booking/ui/booking-form";
import { site } from "@/shared/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đặt lịch cắt tóc",
  description:
    "Đặt lịch cắt tóc nam với Tùng Matthew tại Vũng Tàu — chọn dịch vụ, ngày giờ và xác nhận qua Zalo.",
  alternates: { canonical: "/dat-lich" },
};

export default async function BookingPage() {
  const [services, workingHours] = await Promise.all([
    getServicesForBooking(),
    getWorkingHours(),
  ]);

  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8">
      <header className="mx-auto mb-10 max-w-xl text-center">
        <p className="mb-5 flex items-center justify-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
          <span className="inline-block h-px w-11 bg-gold" />
          Đặt lịch
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance">
          Đặt lịch trong 3 bước.
        </h1>
        <p className="mt-3 text-sm text-gold">🔥 Cuối tuần thường kín — đặt sớm để giữ chỗ</p>
      </header>

      {services.length === 0 ? (
        <p className="text-center text-smoke">
          Chưa có dịch vụ để đặt lịch. Vui lòng quay lại sau hoặc nhắn Zalo.
        </p>
      ) : (
        <BookingForm
          services={services}
          workingHours={workingHours}
          zaloUrl={site.socials.zalo || undefined}
        />
      )}
    </section>
  );
}
