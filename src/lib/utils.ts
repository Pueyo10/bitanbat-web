import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getLocalizedField(
  item: object,
  field: string,
  locale: string
): string {
  const record = item as Record<string, string>;
  return record[`${field}_${locale}`] ?? record[`${field}_es`] ?? "";
}

export function isPathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
