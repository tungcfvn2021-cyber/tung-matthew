import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LANDINGS,
  LANDING_SLUGS,
} from "@/features/seo/local-seo-data";
import { KeywordLanding } from "@/features/seo/keyword-landing";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_SLUGS.map((keyword) => ({ keyword }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ keyword: string }>;
}): Promise<Metadata> {
  const { keyword } = await params;
  const data = LANDINGS[keyword];
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/${keyword}` },
  };
}

export default async function KeywordLandingPage({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword } = await params;
  const data = LANDINGS[keyword];
  if (!data) notFound();
  return <KeywordLanding data={data} slug={keyword} />;
}
