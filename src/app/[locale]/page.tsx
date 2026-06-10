import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedClasses />
      <StatsSection />
      <CTASection />
    </>
  );
}
