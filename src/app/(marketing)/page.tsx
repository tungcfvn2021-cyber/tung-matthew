import { Hero } from "@/shared/ui/marketing/hero";
import { LocalBusinessJsonLd } from "@/features/seo/structured-data";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
    </>
  );
}
