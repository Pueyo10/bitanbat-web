"use client";

import { useTranslations } from "next-intl";

interface LocationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function LocationTabs({
  activeTab,
  onTabChange,
}: LocationTabsProps) {
  const t = useTranslations("Schedule");

  const tabs = [
    { id: "11111111-1111-1111-1111-111111111111", label: t("local1") },
    { id: "22222222-2222-2222-2222-222222222222", label: t("local2") },
  ];

  return (
    <div role="tablist" className="flex gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`min-h-11 px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:bg-border"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
