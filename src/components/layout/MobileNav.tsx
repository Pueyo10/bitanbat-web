"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { X } from "lucide-react";
import { isPathActive } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

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
    <>
      <button
        type="button"
        aria-label="Cerrar menu"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in xl:hidden"
      />

      <div
        id={id}
        role="navigation"
        aria-label="Menu movil"
        className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col border-l border-white/10 bg-primary shadow-2xl animate-slide-in-right xl:hidden"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 pb-4 pt-6">
          <span className="font-heading text-lg font-bold text-white">
            BITAN<span className="text-accent">BAT</span>
          </span>
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
            aria-label="Cerrar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
          {items.map((item) => {
            const isActive = isPathActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href as "/"}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold tracking-wide transition-all ${
                  isActive
                    ? "border-l-2 border-accent bg-accent/10 text-accent"
                    : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-white/10 px-6 py-6">
          <a
            href={SITE_CONFIG.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-105"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
