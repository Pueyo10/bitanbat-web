import { Calendar, FileText, Image, DollarSign } from "lucide-react";

const sections = [
  {
    title: "Horarios",
    description: "Gestiona el calendario semanal de clases",
    href: "/admin/horarios",
    icon: Calendar,
    color: "#FFEB3B",
  },
  {
    title: "Blog",
    description: "Crea y edita artículos del blog",
    href: "/admin/blog",
    icon: FileText,
    color: "#4CAF50",
  },
  {
    title: "Galería",
    description: "Sube y organiza fotos",
    href: "/admin/galeria",
    icon: Image,
    color: "#E91E63",
  },
  {
    title: "Precios",
    description: "Gestiona tarifas y planes",
    href: "/admin/precios",
    icon: DollarSign,
    color: "#C9A96E",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">
        Panel de Administración
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${section.color}20` }}
            >
              <section.icon size={24} style={{ color: section.color }} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              {section.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {section.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
