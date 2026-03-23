import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BitanBat - Dantza & Fitness | Hernani",
  description:
    "Centro de danza y fitness en Hernani, Gipuzkoa. Clases de entrenamiento funcional, pilates, barrefit, boxeo, zumba, sevillanas, bachata, urbano y más.",
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
