import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { MapPin, Phone, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default async function SobreNosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SobreNosotrosContent />;
}

function SobreNosotrosContent() {
  const t = useTranslations("About");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        {/* Hero section with local facade */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/media/instagram/DUYOtf8jMPU.jpg"
              alt="BitanBat Dantza & Fitness - Local Hernani"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              BITAN<span className="text-accent">bat</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Dantza eta Fitness... Somos un centro de danza y fitness en
              Hernani donde la pasion por el movimiento nos une. Ofrecemos una
              amplia variedad de clases para todas las edades y niveles.
            </p>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-accent" />
                {SITE_CONFIG.location}
              </p>
              <p className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-accent" />
                {SITE_CONFIG.phoneFormatted}
              </p>
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
              >
                <Instagram size={18} className="text-accent" />
                {SITE_CONFIG.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Community video */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t("communityTitle")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("communitySubtitle")}
          </p>
          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <video
              src="/media/instagram/DM0z5uHNGa5.mp4"
              poster="/media/instagram/DM0z5uHNGa5.jpg"
              controls
              playsInline
              className="w-full"
            />
          </div>
        </div>

        {/* Testimonials video */}
        <div className="bg-muted rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t("testimonialsTitle")}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t("testimonialsSubtitle")}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-md">
              <video
                src="/media/instagram/DS28hFZDNUA.mp4"
                poster="/media/instagram/DS28hFZDNUA.jpg"
                controls
                playsInline
                className="w-full"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <video
                src="/media/instagram/DSz35eLDIio.mp4"
                poster="/media/instagram/DSz35eLDIio.jpg"
                controls
                playsInline
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
