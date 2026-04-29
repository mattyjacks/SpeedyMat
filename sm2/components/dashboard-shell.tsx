"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import {
  WashingMachine,
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  ShieldCheck,
  BarChart3,
  Package,
  Home,
  ChevronLeft,
  ChevronRight,
  Zap,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/schedule", label: "Schedule Drop-off", icon: CalendarPlus },
  { href: "/dashboard/orders", label: "My Orders", icon: ClipboardList },
];

const adminLinks = [
  { href: "/admin", label: "Admin Overview", icon: ShieldCheck },
  { href: "/admin/orders", label: "Manage Orders", icon: Package },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "sticky top-0 z-40 flex h-screen flex-col border-r bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <WashingMachine className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">
                Speedy<span className="text-primary">Mat</span>
              </span>
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <WashingMachine className="h-4 w-4" />
            </Link>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
          <div className={cn("mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", collapsed && "text-center")}>
            {collapsed ? <Zap className="h-3 w-3 mx-auto" /> : "Customer"}
          </div>
          {userLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}

          <div className="my-4 border-t" />

          <div className={cn("mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", collapsed && "text-center")}>
            {collapsed ? <ShieldCheck className="h-3 w-3 mx-auto" /> : "Admin"}
          </div>
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-2">
          <a
            href="https://speedymat.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Official Site"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors",
              collapsed && "justify-center px-2"
            )}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Visit Official Site</span>}
          </a>
          <Link
            href="/"
            title="Back to Home"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
              collapsed && "justify-center px-2"
            )}
          >
            <Home className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Back to Home</span>}
          </Link>
          <div className={cn("flex items-center px-3 py-2", collapsed && "justify-center px-0")}>
            <ThemeSwitcher />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
              collapsed && "justify-center px-2"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
