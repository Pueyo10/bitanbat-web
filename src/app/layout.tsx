import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bitanbat.com"),
  title: {
    default: "BitanBat - Dantza & Fitness | Hernani",
    template: "%s | BitanBat",
  },
  description:
    "Centro de danza y fitness en Hernani, Gipuzkoa. Clases de entrenamiento funcional, pilates, barrefit, power jump, zumba, sevillanas, bachata, urbano y más.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "BitanBat - Dantza & Fitness",
    description:
      "Centro de danza y fitness en Hernani, Gipuzkoa. Clases de danza, fitness, yoga, pilates y masajes.",
    url: "https://bitanbat.com",
    siteName: "BitanBat",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/logo.jpg",
        width: 800,
        height: 800,
        alt: "BitanBat - Centro de danza y fitness en Hernani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BitanBat - Dantza & Fitness",
    description:
      "Centro de danza y fitness en Hernani, Gipuzkoa. Clases de danza, fitness, yoga, pilates y masajes.",
    images: ["/images/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "BeTdI32dZTxdJxUB8xsRAX5Chz9aSrheLYR7L07Mo_M",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
