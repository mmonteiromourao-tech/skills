"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/orders", label: "Pedidos", icon: ShoppingCart },
  { href: "/dashboard/products", label: "Produtos", icon: Package },
  { href: "/dashboard/customers", label: "Clientes", icon: Users },
];

const bottomItems = [
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-card shrink-0">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2 px-4 border-b">
        <BarChart3 className="size-5 text-primary" />
        <span className="font-semibold text-sm">AdminPanel</span>
      </div>

      {/* Main nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive(href, exact)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <Separator />

      {/* Bottom nav */}
      <nav className="flex flex-col gap-1 p-3">
        {bottomItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive(href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
