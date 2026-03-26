"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          role="navigation"
          aria-label="Menu móvil"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-primary/95 shadow-[0_24px_70px_rgba(0,0,0,0.35)] lg:hidden"
        >
          <nav className="grid gap-1 px-3 py-3">
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all ${
                    isActive
                      ? "border-accent/30 bg-white/[0.08] text-white"
                      : "border-transparent bg-white/[0.02] text-white/78 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
