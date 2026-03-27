"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";

const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/masajes", labelKey: "massage" },
  { href: "/clases", labelKey: "classes" },
  { href: "/horarios", labelKey: "schedule" },
  { href: "/precios", labelKey: "prices" },
  { href: "/sobre-nosotros", labelKey: "about" },
  { href: "/contacto", labelKey: "contact" },
  { href: "/galeria", labelKey: "gallery" },
] as const;

export default function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled || mobileOpen ? "pt-3" : "pt-5"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled || mobileOpen
              ? "rounded-[1.5rem] border border-white/10 bg-primary/86 px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl md:px-6"
              : "px-1 py-2"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 pr-2">
            <Image
              src="/images/logo.jpg"
              alt="BitanBat"
              width={46}
              height={46}
              className="rounded-full ring-1 ring-white/10"
            />
            <span className="hidden font-heading text-base font-bold tracking-[0.16em] text-white sm:block">
              BITAN<span className="text-accent">BAT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    isActive ? "text-white" : "text-white/68 hover:text-white"
                  }`}
                >
                  {t(item.labelKey)}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-px origin-left bg-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-white lg:hidden"
              aria-label="Menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav
        id="mobile-nav"
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={navItems}
      />
    </header>
  );
}
