import { site } from "@/shared/config/site";

/** JSON-LD LocalBusiness (HairSalon) cho Local SEO. */
export function LocalBusinessJsonLd() {
  const sameAs = Object.values(site.socials).filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    url: site.url,
    description: site.description,
    ...(site.phone ? { telephone: site.phone } : {}),
    priceRange: "₫₫",
    address: {
      "@type": "PostalAddress",
      ...(site.addressLine ? { streetAddress: site.addressLine } : {}),
      addressLocality: site.city,
      addressCountry: "VN",
    },
    areaServed: { "@type": "City", name: site.city },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** JSON-LD BreadcrumbList. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
