import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Instagram, Phone, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

const footerLinks = [
  { href: "/sobre-nosotros", labelKey: "about" },
  { href: "/clases", labelKey: "classes" },
  { href: "/horarios", labelKey: "schedule" },
  { href: "/precios", labelKey: "prices" },
  { href: "/galeria", labelKey: "gallery" },
  { href: "/contacto", labelKey: "contact" },
] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="bg-primary text-white">
      {/* Pre-footer CTA */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-accent text-sm tracking-[0.32em] uppercase font-medium mb-6">
            {t("ready")}
          </p>
          <h2 className="font-serif-display italic font-normal text-white mb-10 text-display-md">
            {t("joinFamily")}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contacto" className="w-full sm:w-auto">
              {t("contactCta")}
            </Button>
            <Button
              href={SITE_CONFIG.whatsapp}
              external
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Phone size={18} />
              {SITE_CONFIG.phoneFormatted}
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="BitanBat"
                width={52}
                height={52}
                className="rounded-full"
              />
              <span className="font-heading text-2xl font-bold">
                BITAN<span className="text-accent">BAT</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              {t("tagline")}
            </p>
            <div className="space-y-3 text-white/60 text-sm">
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-accent shrink-0" />
                {t("address")}
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                {t("phone")}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-sm tracking-[0.15em] uppercase text-white/40 mb-6">
              {t("navigate")}
            </h4>
            <nav className="space-y-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  className="block text-white/60 hover:text-white text-sm transition-colors"
                >
                  {tNav(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h4 className="font-heading font-semibold text-sm tracking-[0.15em] uppercase text-white/40 mb-6">
              {t("followUs")}
            </h4>
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
            >
              <span className="p-3 border border-white/20 rounded-full group-hover:border-accent group-hover:text-accent transition-colors">
                <Instagram size={20} />
              </span>
              {SITE_CONFIG.instagramHandle}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-white/30 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.fullName}. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
