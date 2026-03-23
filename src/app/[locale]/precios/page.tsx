"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Price } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";

export default function PreciosPage() {
  const t = useTranslations("Prices");
  const locale = useLocale();
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      const supabase = createClient();
      const { data } = await supabase
        .from("prices")
        .select("*")
        .order("order");
      if (data) setPrices(data as Price[]);
      setLoading(false);
    }
    fetchPrices();
  }, []);

  const getPeriodLabel = (period: string) => {
    const map: Record<string, string> = {
      mes: t("perMonth"),
      trimestre: t("perQuarter"),
      clase: t("perClass"),
    };
    return map[period] || `/${period}`;
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map((price, i) => (
              <motion.div
                key={price.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-2xl p-6 shadow-sm border ${
                  price.highlighted
                    ? "border-accent shadow-lg ring-2 ring-accent/20"
                    : "border-border"
                }`}
              >
                {price.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star size={12} />
                      {t("featured")}
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {getLocalizedField(price, "name", locale)}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {getLocalizedField(price, "description", locale)}
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">
                    {price.price.toFixed(0)}€
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {getPeriodLabel(price.period)}
                  </span>
                </div>
                <ul className="space-y-2">
                  {(price.features as string[]).map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        size={16}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
