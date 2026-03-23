import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin - BitanBat",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">
            BITAN<span className="text-accent">bat</span>{" "}
            <span className="text-white/60 font-normal">Admin</span>
          </h1>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin" className="text-white/70 hover:text-white">
              Dashboard
            </Link>
            <Link href="/admin/horarios" className="text-white/70 hover:text-white">
              Horarios
            </Link>
            <Link href="/admin/blog" className="text-white/70 hover:text-white">
              Blog
            </Link>
            <Link href="/admin/galeria" className="text-white/70 hover:text-white">
              Galeria
            </Link>
            <Link href="/admin/precios" className="text-white/70 hover:text-white">
              Precios
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
