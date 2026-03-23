import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "eu"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/sobre-nosotros": {
      es: "/sobre-nosotros",
      eu: "/guri-buruz",
    },
    "/clases": {
      es: "/clases",
      eu: "/klaseak",
    },
    "/horarios": {
      es: "/horarios",
      eu: "/ordutegiak",
    },
    "/galeria": {
      es: "/galeria",
      eu: "/galeria",
    },
    "/precios": {
      es: "/precios",
      eu: "/prezioak",
    },
    "/contacto": {
      es: "/contacto",
      eu: "/kontaktua",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});
