import type { MetadataRoute } from "next";
import { site } from "@/shared/config/site";
import { LANDING_SLUGS } from "@/features/seo/local-seo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/dich-vu", priority: 0.9 },
    { path: "/dat-lich", priority: 0.9 },
    { path: "/lookbook", priority: 0.8 },
    { path: "/goi-y-kieu-toc", priority: 0.7 },
    { path: "/gioi-thieu", priority: 0.7 },
    { path: "/lien-he", priority: 0.7 },
    // Landing Local SEO
    ...LANDING_SLUGS.map((slug) => ({ path: `/${slug}`, priority: 0.85 })),
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
