import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Instagram, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="BitanBat"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg">
                  BITAN<span className="text-accent">bat</span>
                </h3>
                <p className="text-white/60 text-sm">Dantza & Fitness</p>
              </div>
            </div>
            <div className="space-y-2 text-white/70 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {t("address")}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} />
                {t("phone")}
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">
              {tNav("home")}
            </h4>
            <nav className="space-y-2">
              <Link href="/sobre-nosotros" className="block text-white/70 hover:text-white text-sm transition-colors">
                {tNav("about")}
              </Link>
              <Link href="/clases" className="block text-white/70 hover:text-white text-sm transition-colors">
                {tNav("classes")}
              </Link>
              <Link href="/horarios" className="block text-white/70 hover:text-white text-sm transition-colors">
                {tNav("schedule")}
              </Link>
              <Link href="/precios" className="block text-white/70 hover:text-white text-sm transition-colors">
                {tNav("prices")}
              </Link>
              <Link href="/contacto" className="block text-white/70 hover:text-white text-sm transition-colors">
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">
              {t("followUs")}
            </h4>
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Instagram size={20} />
              {SITE_CONFIG.instagramHandle}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.fullName}.{" "}
            {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
