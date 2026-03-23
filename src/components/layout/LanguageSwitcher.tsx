"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "es" | "eu") {
    router.replace(pathname as "/", { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5" role="group" aria-label="Idioma">
      <button
        onClick={() => switchLocale("es")}
        aria-pressed={locale === "es"}
        className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
          locale === "es"
            ? "bg-accent text-primary"
            : "text-white/70 hover:text-white"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale("eu")}
        aria-pressed={locale === "eu"}
        className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
          locale === "eu"
            ? "bg-accent text-primary"
            : "text-white/70 hover:text-white"
        }`}
      >
        EU
      </button>
    </div>
  );
}
