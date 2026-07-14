import { SectionEyebrow } from "@/shared/ui/marketing/section-eyebrow";
import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function FaceIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01M15 10h.01M9 15c1 1 5 1 6 0" />
    </svg>
  );
}
function ScissorsMini(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.5 15.5M14.5 12.5L20 20M8.5 8.5L12 12" />
    </svg>
  );
}
function CalendarIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 3v3M16 3v3M9 14l2 2 4-4" />
    </svg>
  );
}

const reasons = [
  {
    Icon: FaceIcon,
    title: "Tư vấn theo gương mặt",
    desc: "Lắng nghe dáng mặt, phong cách và công việc của bạn trước khi cầm kéo.",
  },
  {
    Icon: ScissorsMini,
    title: "Fade chuẩn form",
    desc: "Chuyển tông mượt, đường nét sắc sảo. Không chạy số — chăm chút từng chi tiết.",
  },
  {
    Icon: CalendarIcon,
    title: "Đặt lịch 30 giây",
    desc: "Chọn dịch vụ, giờ, xong. Xác nhận nhanh qua Zalo, không phải chờ đợi.",
  },
];

export function WhyChoose() {
  return (
    <section className="border-t border-line bg-ink-2 py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionEyebrow>Vì sao chọn Tùng Matthew</SectionEyebrow>
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
          Cắt tóc để bạn tự tin hơn mỗi ngày
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reasons.map(({ Icon, title, desc }) => (
            <div key={title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line-gold text-gold">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-paper">
                {title}
              </h3>
              <p className="mt-2 leading-relaxed text-smoke">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
