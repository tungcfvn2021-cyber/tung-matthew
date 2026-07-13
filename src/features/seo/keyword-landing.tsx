import Link from "next/link";
import {
  LocalBusinessJsonLd,
  BreadcrumbJsonLd,
} from "@/features/seo/structured-data";
import type { LandingData, FaqItem } from "@/features/seo/local-seo-data";
import { ArrowRightIcon } from "@/shared/ui/icons";

function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function KeywordLanding({
  data,
  slug,
}: {
  data: LandingData;
  slug: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <LocalBusinessJsonLd />
      <FaqJsonLd faqs={data.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: data.keyword, path: `/${slug}` },
        ]}
      />

      <p className="mb-5 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
        <span className="inline-block h-px w-11 bg-gold" />
        {data.keyword}
      </p>
      <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
        {data.h1}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-smoke">{data.intro}</p>

      <ul className="mt-8 flex flex-col gap-3">
        {data.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-paper">
            <span className="mt-1 text-gold">✓</span>
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-9">
        <Link
          href="/dat-lich"
          className="inline-flex items-center gap-2.5 rounded-[2px] bg-gold px-[30px] py-4 font-display text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold-soft"
        >
          Đặt lịch ngay
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 font-display text-2xl font-bold">Câu hỏi thường gặp</h2>
        <div className="flex flex-col gap-4">
          {data.faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-xl border border-line bg-ink-2 p-5"
            >
              <h3 className="font-semibold text-paper">{f.q}</h3>
              <p className="mt-2 leading-relaxed text-smoke">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
