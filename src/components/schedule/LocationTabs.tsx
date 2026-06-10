"use client";

import { useLocale, useTranslations } from "next-intl";

interface LocationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function LocationTabs({
  activeTab,
  onTabChange,
}: LocationTabsProps) {
  const t = useTranslations("Schedule");
  const locale = useLocale();

  const tabs = [
    {
      id: "11111111-1111-1111-1111-111111111111",
      number: "01",
      label: t("local1"),
    },
    {
      id: "22222222-2222-2222-2222-222222222222",
      number: "02",
      label: t("local2"),
    },
  ];

  return (
    <div
      role="tablist"
      aria-label={locale === "eu" ? "Aukeratu lokala" : "Elige local"}
      className="flex flex-wrap items-end gap-x-10 gap-y-6 md:gap-x-16"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`group relative min-h-11 pb-3 text-left transition-colors duration-300 ${
              isActive
                ? "text-foreground"
                : "text-foreground/30 hover:text-foreground/60"
            }`}
          >
            <span
              className={`mb-2 block font-heading text-xs font-medium tracking-[0.28em] transition-colors duration-300 ${
                isActive ? "text-accent" : "text-current"
              }`}
            >
              {tab.number}
            </span>
            <span className="block font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-5xl">
              {tab.label}
            </span>
            {/* Animated gold underline */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-[0.35]"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
