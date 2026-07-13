import type { Metadata } from "next";
import { getFaceShapeGuides } from "@/features/face-shape/application/get-face-shapes";
import { FaceShapePicker } from "@/features/face-shape/ui/face-shape-picker";
import { BreadcrumbJsonLd } from "@/features/seo/structured-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gợi ý kiểu tóc theo dáng mặt",
  description:
    "Chọn dáng mặt của bạn để xem những kiểu tóc nam phù hợp nhất. Gợi ý bởi barber Tùng Matthew, Vũng Tàu.",
  alternates: { canonical: "/goi-y-kieu-toc" },
};

export default async function FaceShapePage() {
  const guides = await getFaceShapeGuides();

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Gợi ý kiểu tóc", path: "/goi-y-kieu-toc" },
        ]}
      />
      <header className="mb-10">
        <p className="mb-5 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
          <span className="inline-block h-px w-11 bg-gold" />
          Gợi ý kiểu tóc
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          Kiểu tóc nào hợp gương mặt bạn?
        </h1>
        <p className="mt-4 leading-relaxed text-smoke">
          Chọn dáng mặt gần nhất với bạn để xem những kiểu tóc phù hợp — và
          những kiểu nên tránh.
        </p>
      </header>

      <FaceShapePicker guides={guides} />
    </section>
  );
}
