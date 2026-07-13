import type { Metadata } from "next";
import { getServices } from "@/features/services/application/get-services";
import { ServiceList } from "@/features/services/ui/service-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dịch vụ & bảng giá",
  description:
    "Bảng giá dịch vụ cắt tóc nam tại Tùng Matthew Vũng Tàu: Fade, Undercut, Mohican, uốn, nhuộm, combo VIP.",
  alternates: { canonical: "/dich-vu" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8">
      <header className="mb-12 max-w-2xl">
        <p className="mb-5 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
          <span className="inline-block h-px w-11 bg-gold" />
          Dịch vụ
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          Bảng giá minh bạch, chuẩn form.
        </h1>
        <p className="mt-4 leading-relaxed text-smoke">
          Mỗi dịch vụ đều có thời lượng và mức giá rõ ràng. Chọn dịch vụ và đặt
          lịch trong vài giây.
        </p>
      </header>

      {services.length === 0 ? (
        <p className="text-smoke">
          Chưa có dịch vụ nào. Vui lòng quay lại sau.
        </p>
      ) : (
        <ServiceList services={services} />
      )}
    </section>
  );
}
