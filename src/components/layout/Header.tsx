"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";

const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/sobre-nosotros", labelKey: "about" },
  { href: "/clases", labelKey: "classes" },
  { href: "/horarios", labelKey: "schedule" },
  { href: "/galeria", labelKey: "gallery" },
  { href: "/precios", labelKey: "prices" },
  { href: "/contacto", labelKey: "contact" },
  { href: "/blog", labelKey: "blog" },
] as const;

export default function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="BitanBat"
              width={48}
              height={48}
              className="rounded-full"
            />
            <span className="text-white font-bold text-lg hidden sm:block">
              BITAN<span className="text-accent">bat</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-accent bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={navItems}
      />
    </header>
  );
}
