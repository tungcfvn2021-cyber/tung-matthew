import { Hero } from "@/shared/ui/marketing/hero";
import { ServicesPreview } from "@/shared/ui/marketing/services-preview";
import { WhyChoose } from "@/shared/ui/marketing/why-choose";
import { LookbookTeaser } from "@/shared/ui/marketing/lookbook-teaser";
import { FinalCta } from "@/shared/ui/marketing/final-cta";
import { LocalBusinessJsonLd } from "@/features/seo/structured-data";
import { getServices } from "@/features/services/application/get-services";
import { getGallery } from "@/features/lookbook/application/get-gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, gallery] = await Promise.all([getServices(), getGallery()]);

  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <ServicesPreview services={services} />
      <WhyChoose />
      <LookbookTeaser items={gallery} />
      <FinalCta />
    </>
  );
}
