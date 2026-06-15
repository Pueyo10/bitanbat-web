"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import { isPathActive } from "@/lib/utils";
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
  { href: "/tienda", labelKey: "shop" },
] as const;

export default function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    function update() {
      tickingRef.current = false;
      const y = window.scrollY;
      const last = lastYRef.current;
      setScrolled(y > 50);
      if (y < 80) {
        setHidden(false); // siempre visible arriba del todo
      } else if (Math.abs(y - last) > 6) {
        setHidden(y > last); // baja -> ocultar, sube -> mostrar
      }
      lastYRef.current = y;
    }
    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    }
    lastYRef.current = window.scrollY;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((open) => !open);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Hairline editorial bar — auto-hide on scroll down, reveal on scroll up */}
      <div
        className={`border-b transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || mobileOpen
            ? "border-accent/25 bg-primary/65 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-gradient-to-b from-primary/55 to-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
            scrolled || mobileOpen ? "py-2.5" : "py-4"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 pr-2">
            <Image
              src="/images/logo.jpg"
              alt="BitanBat"
              width={46}
              height={46}
              priority
              className="rounded-full ring-1 ring-white/10"
            />
            <span className="hidden font-heading text-base font-bold tracking-[0.16em] text-white sm:block">
              BITAN<span className="text-accent">BAT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 xl:flex xl:gap-7">
            {navItems.map((item) => {
              const isActive = isPathActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex min-h-11 items-center py-2 text-[10px] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-white/60 hover:text-white"
                  }`}
                >
                  {t(item.labelKey)}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1.5 left-0 right-0 h-px origin-left bg-accent transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={toggleMobile}
              className="group flex min-h-11 items-center gap-2.5 text-white transition-colors hover:text-accent xl:hidden"
              aria-label="Menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <span className="hidden font-heading text-[10px] font-semibold uppercase tracking-[0.28em] sm:block">
                Menu
              </span>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav
        id="mobile-nav"
        isOpen={mobileOpen}
        onClose={closeMobile}
        items={navItems}
      />
    </header>
  );
}
