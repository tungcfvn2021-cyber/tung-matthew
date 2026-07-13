import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/features/seo/structured-data";
import { ArrowRightIcon } from "@/shared/ui/icons";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Câu chuyện theo nghề, triết lý và sứ mệnh của barber Tùng Matthew tại Vũng Tàu.",
  alternates: { canonical: "/gioi-thieu" },
};

const reasons = [
  "Tư vấn kiểu tóc hợp gương mặt trước khi cầm kéo",
  "Kỹ thuật fade mượt, đường nét sạch, chuẩn xu hướng",
  "Không gian riêng tư, tỉ mỉ, không chạy số",
  "Đặt lịch nhanh, xác nhận và nhắc lịch qua Zalo",
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Giới thiệu", path: "/gioi-thieu" },
        ]}
      />
      <p className="mb-5 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
        <span className="inline-block h-px w-11 bg-gold" />
        Giới thiệu
      </p>
      <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
        Câu chuyện đằng sau từng đường kéo
      </h1>

      <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-smoke">
        <p>
          Tùng Matthew đến với nghề barber từ niềm tin đơn giản: một mái tóc đẹp
          có thể thay đổi cách một người bước ra đường. Không chỉ là cắt tóc —
          đó là trao cho khách sự tự tin.
        </p>
        <p>
          Sau nhiều năm mài giũa tay nghề, Tùng chọn con đường làm nghề tử tế:
          lắng nghe gương mặt, phong cách và cả công việc của từng khách trước
          khi quyết định đường cắt. Mỗi kiểu tóc là một lời tư vấn, không phải
          một khuôn mẫu.
        </p>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold text-paper">
        Triết lý
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-smoke">
        “Cắt tóc không chỉ để đẹp. Mà để bạn tự tin hơn mỗi ngày.” Đó là kim chỉ
        nam cho mọi việc Tùng làm — từ khâu tư vấn đến đường tông-đơ cuối cùng.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-paper">
        Tại sao chọn Tùng Matthew
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {reasons.map((r) => (
          <li key={r} className="flex items-start gap-3 text-paper">
            <span className="mt-1 text-gold">✓</span>
            {r}
          </li>
        ))}
      </ul>

      <div className="mt-10">
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
