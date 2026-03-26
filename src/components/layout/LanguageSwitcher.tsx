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
    <div
      className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 shadow-inner shadow-black/10"
      role="group"
      aria-label="Idioma"
    >
      <button
        onClick={() => switchLocale("es")}
        aria-pressed={locale === "es"}
        className={`min-w-[2.5rem] rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all ${
          locale === "es"
            ? "bg-accent text-primary shadow-[0_10px_25px_rgba(201,169,110,0.28)]"
            : "text-white/72 hover:bg-white/[0.05] hover:text-white"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale("eu")}
        aria-pressed={locale === "eu"}
        className={`min-w-[2.5rem] rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all ${
          locale === "eu"
            ? "bg-accent text-primary shadow-[0_10px_25px_rgba(201,169,110,0.28)]"
            : "text-white/72 hover:bg-white/[0.05] hover:text-white"
        }`}
      >
        EU
      </button>
    </div>
  );
}
