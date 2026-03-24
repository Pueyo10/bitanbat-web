"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LocaleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return <div className="animate-fade-in">{children}</div>;
}
