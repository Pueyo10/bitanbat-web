"use client";

import { useRef, useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowUpRight,
  ShoppingBag,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SIZES = ["S", "M", "L", "XL"] as const;

interface Product {
  id: string;
  nameEs: string;
  nameEu: string;
  price: number;
  sized: boolean;
  dark: boolean;
}

const PRODUCTS: Product[] = [
  { id: "camiseta-negra", nameEs: "Camiseta BitanBat negra", nameEu: "BitanBat kamiseta beltza", price: 18, sized: true, dark: true },
  { id: "camiseta-crema", nameEs: "Camiseta BitanBat crema", nameEu: "BitanBat kamiseta krema", price: 18, sized: true, dark: false },
  { id: "sudadera", nameEs: "Sudadera con capucha", nameEu: "Txanodun jertsea", price: 35, sized: true, dark: true },
  { id: "top", nameEs: "Top deportivo", nameEu: "Kirol topa", price: 22, sized: true, dark: false },
  { id: "leggings", nameEs: "Leggings entreno", nameEu: "Entrenamendu leggingsak", price: 28, sized: true, dark: true },
  { id: "calcetines", nameEs: "Calcetines BitanBat", nameEu: "BitanBat galtzerdiak", price: 8, sized: false, dark: false },
  { id: "tote", nameEs: "Bolsa tote", nameEu: "Tote poltsa", price: 12, sized: false, dark: true },
  { id: "botella", nameEs: "Botella BitanBat", nameEu: "BitanBat botila", price: 12, sized: false, dark: false },
];

interface CartItem {
  key: string;
  productId: string;
  name: string;
  size?: string;
  qty: number;
  price: number;
}

function ProductCard({
  product,
  index,
  locale,
  onAdd,
}: {
  product: Product;
  index: number;
  locale: string;
  onAdd: (product: Product, size?: string) => void;
}) {
  const t = useTranslations("Shop");
  const [size, setSize] = useState<string>("M");
  const [justAdded, setJustAdded] = useState(false);
  const name = locale === "eu" ? product.nameEu : product.nameEs;

  function handleAdd() {
    onAdd(product, product.sized ? size : undefined);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <ScrollReveal delay={(index % 4) * 0.08}>
      <div
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
          product.dark
            ? "lux-card-dark border-accent/15 text-white"
            : "lux-card border-accent/20 text-foreground"
        }`}
      >
        {/* Typographic visual — placeholder until product photos exist */}
        <div
          className={`relative flex aspect-square items-center justify-center overflow-hidden border-b ${
            product.dark ? "border-white/10" : "border-accent/15"
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none select-none font-heading text-6xl font-bold uppercase tracking-tight transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
              product.dark ? "text-outline" : "text-outline-dark"
            }`}
          >
            BB
          </span>
          <span className="absolute bottom-4 left-4 font-heading text-[10px] font-medium uppercase tracking-[0.28em] opacity-50">
            {t("photosSoon")}
          </span>
          <span
            className={`absolute right-4 top-4 font-heading text-xs font-semibold tracking-[0.2em] ${
              product.dark ? "text-white/40" : "text-foreground/40"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-heading text-lg font-bold leading-tight">
              {name}
            </h3>
            <span className="font-serif-display text-2xl italic text-accent">
              {product.price}€
            </span>
          </div>

          {product.sized ? (
            <div
              role="group"
              aria-label={t("size")}
              className="flex flex-wrap gap-2"
            >
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-h-10 min-w-10 rounded-full border text-sm font-medium transition-colors duration-300 ${
                    size === s
                      ? "border-accent bg-accent text-primary"
                      : product.dark
                        ? "border-white/20 text-white/70 hover:border-accent/60"
                        : "border-border text-muted-foreground hover:border-accent/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <p
              className={`text-xs uppercase tracking-[0.2em] ${
                product.dark ? "text-white/50" : "text-muted-foreground"
              }`}
            >
              {t("oneSize")}
            </p>
          )}

          <button
            type="button"
            onClick={handleAdd}
            className={`group/btn mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-heading text-sm font-semibold transition-all duration-300 ${
              justAdded
                ? "bg-white text-primary"
                : "bg-accent text-primary hover:bg-white"
            }`}
          >
            {justAdded ? (
              <>
                <CheckCircle size={16} />
                {t("added")}
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                {t("addToOrder")}
              </>
            )}
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function TiendaPage() {
  const t = useTranslations("Shop");
  const tContact = useTranslations("Contact");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);

  const total = cart.reduce((sum, it) => sum + it.price * it.qty, 0);
  const count = cart.reduce((sum, it) => sum + it.qty, 0);

  function addToCart(product: Product, size?: string) {
    const key = `${product.id}${size ? `-${size}` : ""}`;
    const name = locale === "eu" ? product.nameEu : product.nameEs;
    setCart((prev) => {
      const existing = prev.find((it) => it.key === key);
      if (existing) {
        return prev.map((it) =>
          it.key === key ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [...prev, { key, productId: product.id, name, size, qty: 1, price: product.price }];
    });
    setStatus("idle");
  }

  function removeFromCart(key: string) {
    setCart((prev) => prev.filter((it) => it.key !== key));
  }

  function changeQty(key: string, delta: number) {
    setCart((prev) =>
      prev
        .map((it) => (it.key === key ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0)
    );
  }

  const whatsappText = encodeURIComponent(
    `${t("orderMessage")}\n${cart
      .map(
        (it) =>
          `- ${it.name}${it.size ? ` (${t("size")} ${it.size})` : ""} x${it.qty} — ${it.price * it.qty}€`
      )
      .join("\n")}\n${t("total")}: ${total}€`
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          note: form.note || undefined,
          items: cart.map(({ name, size, qty, price }) => ({
            name,
            size,
            qty,
            price,
          })),
        }),
      });
      if (res.ok) {
        setStatus("success");
        setCart([]);
        setForm({ name: "", phone: "", email: "", note: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        label={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                locale={locale}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====== Order section ====== */}
      <section ref={orderRef} className="scroll-mt-24 bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            {/* Cart summary */}
            <div className="md:col-span-5">
              <p className="mb-6 text-sm font-medium uppercase tracking-[0.32em] text-accent">
                {t("yourOrder")}
              </p>
              <h2 className="font-heading font-bold text-white text-display-md">
                <span className="uppercase">{t("total")}</span>{" "}
                <span className="font-serif-display italic font-normal lowercase text-accent">
                  {total}€
                </span>
              </h2>

              {cart.length === 0 ? (
                <p className="mt-8 font-serif-display text-lg italic lowercase text-white/50">
                  {t("empty")}
                </p>
              ) : (
                <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {cart.map((it) => (
                    <li
                      key={it.key}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm font-semibold text-white">
                          {it.name}
                          {it.size && (
                            <span className="ml-2 text-white/50">
                              {it.size}
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-xs text-white/50">
                          {it.price}€ x {it.qty}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => changeQty(it.key, -1)}
                          aria-label={`${t("remove")} 1 ${it.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-accent hover:text-accent"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center font-heading text-sm font-semibold text-white tabular-nums">
                          {it.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQty(it.key, 1)}
                          aria-label={`+1 ${it.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-accent hover:text-accent"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(it.key)}
                          aria-label={`${t("remove")} ${it.name}`}
                          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-destructive"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
                {t("payAtPickup")} — {t("pickupNote")}
              </p>
            </div>

            {/* Order form */}
            <div className="md:col-span-6 md:col-start-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="order-name"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-white/60"
                  >
                    {tContact("name")}
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    required
                    aria-required="true"
                    value={form.name}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full border-0 border-b-2 border-white/25 bg-transparent px-0 py-3 text-lg text-white outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="order-phone"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-white/60"
                    >
                      {tContact("phone")}
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      required
                      aria-required="true"
                      pattern="[0-9+\s()-]{7,15}"
                      maxLength={20}
                      value={form.phone}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, phone: e.target.value }))
                      }
                      className="w-full border-0 border-b-2 border-white/25 bg-transparent px-0 py-3 text-lg text-white outline-none transition-colors focus:border-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="order-email"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-white/60"
                    >
                      {tContact("email")}
                    </label>
                    <input
                      id="order-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full border-0 border-b-2 border-white/25 bg-transparent px-0 py-3 text-lg text-white outline-none transition-colors focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="order-note"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-white/60"
                  >
                    {t("noteLabel")}
                  </label>
                  <textarea
                    id="order-note"
                    rows={2}
                    value={form.note}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, note: e.target.value }))
                    }
                    className="w-full resize-none border-0 border-b-2 border-white/25 bg-transparent px-0 py-3 text-lg text-white outline-none transition-colors focus:border-accent"
                  />
                </div>

                {status === "success" && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="flex items-center gap-2 rounded-xl border border-accent/50 bg-accent/10 p-4 text-sm text-accent"
                  >
                    <CheckCircle size={18} className="shrink-0" />
                    {t("orderSuccess")}
                  </p>
                )}
                {status === "error" && (
                  <p
                    id="order-error"
                    role="alert"
                    aria-live="assertive"
                    className="flex items-center gap-2 rounded-xl border border-red-400/50 bg-red-500/10 p-4 text-sm text-red-300"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    {t("orderError")}
                  </p>
                )}

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={submitting || cart.length === 0}
                    aria-describedby={
                      status === "error" ? "order-error" : undefined
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-10 py-3.5 font-heading text-lg font-semibold text-primary transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {tCommon("sending")}
                      </>
                    ) : (
                      t("sendOrder")
                    )}
                  </button>
                  {cart.length > 0 && (
                    <a
                      href={`${SITE_CONFIG.whatsapp}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border-b border-accent/50 pb-1 font-heading text-sm uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-accent"
                    >
                      {t("orWhatsApp")}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky cart bar */}
      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-accent/30 bg-primary/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <p className="font-heading text-sm font-semibold text-white">
              <span className="text-accent">{count}</span>{" "}
              <ShoppingBag size={14} className="mb-0.5 inline" />{" "}
              <span className="ml-2 font-serif-display text-lg italic text-accent">
                {total}€
              </span>
            </p>
            <button
              type="button"
              onClick={() =>
                orderRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-accent px-6 py-2 font-heading text-sm font-semibold text-primary transition-colors hover:bg-white"
            >
              {t("viewOrder")}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
