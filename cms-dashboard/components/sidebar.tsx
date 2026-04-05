"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Camera,
  BarChart2,
  CalendarDays,
  Users2,
  Newspaper,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Instagram Manager",
    href: "/instagram",
    icon: Camera,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    label: "Calendário de Conteúdo",
    href: "/calendario",
    icon: CalendarDays,
  },
  {
    label: "Rastreador de Concorrentes",
    href: "/concorrentes",
    icon: Users2,
  },
  {
    label: "Consolidador de Notícias",
    href: "/noticias",
    icon: Newspaper,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Logo / Brand */}
      <div className="flex h-16 items-center gap-2 border-b border-zinc-800 px-5">
        <LayoutDashboard className="h-5 w-5 text-indigo-400" />
        <span className="text-base font-semibold tracking-tight text-zinc-100">
          CMS Dashboard
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Menu Principal
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive
                    ? "text-indigo-400"
                    : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-400">
            AD
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-200">Admin</p>
            <p className="truncate text-xs text-zinc-500">admin@cms.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
