import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, ExternalLink, Home, LayoutGrid, LogOut } from "lucide-react";
import { getAdminUser } from "@/lib/auth";
import { signOut } from "../actions";

const NAV = [
  { href: "/admin", label: "Inicio", icon: Home },
  { href: "/admin/horarios", label: "Horarios", icon: CalendarDays },
  { href: "/admin/clases", label: "Clases", icon: LayoutGrid },
] as const;

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#1c1a17]">
      <header className="sticky top-0 z-30 bg-[#0f0e0c] text-white shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="font-heading text-base font-bold tracking-wide">
            BITAN<span className="text-accent">BAT</span>
            <span className="ml-2 text-xs font-normal text-white/50">panel</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden max-w-[220px] truncate text-xs text-white/50 sm:inline">
              {user.email}
            </span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink size={13} />
              Ver web
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LogOut size={13} />
                Salir
              </button>
            </form>
          </div>
        </div>

        <nav className="border-t border-white/10">
          <ul className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-2">
            {NAV.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 whitespace-nowrap px-3 py-2.5 text-sm text-white/75 transition-colors hover:text-white"
                >
                  <Icon size={16} className="text-accent" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 md:py-10">{children}</main>
    </div>
  );
}
