"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { X, ArrowUpRight } from "lucide-react";
import { isPathActive } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavItem {
  readonly href: string;
  readonly labelKey: string;
}

interface MobileNavProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  items: readonly NavItem[];
}

export default function MobileNav({ id, isOpen, onClose, items }: MobileNavProps) {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id={id}
      role="navigation"
      aria-label="Menu movil"
      className="fixed inset-0 z-50 flex flex-col bg-primary animate-fade-in xl:hidden"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_42%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -right-2 select-none font-heading font-bold uppercase text-display-xl text-outline opacity-30"
      >
        Bitan
      </div>

      {/* Top bar */}
      <div className="relative flex items-center justify-between border-b border-white/10 px-5 pb-4 pt-5 sm:px-6">
        <span className="font-heading text-lg font-bold tracking-[0.16em] text-white">
          BITAN<span className="text-accent">BAT</span>
        </span>
        <button
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent/60 hover:text-accent"
          aria-label="Cerrar menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Links — monumental, staggered */}
      <nav className="relative flex flex-1 flex-col overflow-y-auto px-5 py-8 sm:px-6">
        <div className="my-auto w-full">
          {items.map((item, i) => {
            const isActive = isPathActive(pathname, item.href);
            return (
              <div key={item.href} className="hero-line">
                <span
                  style={
                    { "--line-delay": `${0.08 + i * 0.055}s` } as React.CSSProperties
                  }
                >
                  <Link
                    href={item.href as "/"}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className="group flex items-baseline gap-4 py-1.5 sm:gap-6"
                  >
                    <span className="w-8 shrink-0 text-xs font-medium tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-heading font-bold uppercase leading-none text-display-md transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 ${
                        isActive
                          ? "text-accent"
                          : "text-white/85 group-hover:text-white"
                      }`}
                    >
                      {t(item.labelKey)}
                    </span>
                  </Link>
                </span>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Bottom — language & social */}
      <div className="relative border-t border-white/10 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <LanguageSwitcher />
          <div className="flex items-center gap-6">
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group inline-flex min-h-11 items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-accent"
            >
              Instagram
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group inline-flex min-h-11 items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-accent"
            >
              WhatsApp
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
