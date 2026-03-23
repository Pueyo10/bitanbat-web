"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  readonly href: string;
  readonly labelKey: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: readonly NavItem[];
}

export default function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-primary border-t border-white/10 overflow-hidden"
        >
          <nav className="px-4 py-4 space-y-1">
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  onClick={onClose}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
