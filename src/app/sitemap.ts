import type { MetadataRoute } from "next";

export const revalidate = 86400;

const BASE_URL = "https://bitanbat.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/masajes", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/clases", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/horarios", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/precios", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sobre-nosotros", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/contacto", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/galeria", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const euPaths: Record<string, string> = {
    "": "",
    "/masajes": "/masajeak",
    "/clases": "/klaseak",
    "/horarios": "/ordutegiak",
    "/precios": "/prezioak",
    "/sobre-nosotros": "/guri-buruz",
    "/contacto": "/kontaktua",
    "/galeria": "/galeria",
  };

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    entries.push({
      url: `${BASE_URL}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          es: `${BASE_URL}${route.path}`,
          eu: `${BASE_URL}/eu${euPaths[route.path]}`,
        },
      },
    });
  }

  return entries;
}
