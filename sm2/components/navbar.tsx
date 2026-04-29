"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import {
  WashingMachine,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = pathname === "/";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/admin", label: "Admin" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors",
        isLanding
          ? "bg-white/80 dark:bg-gray-950/80 border-transparent"
          : "bg-background/95 border-border"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
            <WashingMachine className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Speedy<span className="text-primary">Mat</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 border-l pl-2">
            <ThemeSwitcher />
          </div>
          <a
            href="https://speedymat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-100 transition-colors"
          >
            Visit Official Site
            <ExternalLink className="h-3 w-3" />
          </a>
          <Link
            href="/dashboard"
            className="ml-1 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <LayoutDashboard className="h-4 w-4" />
            My Laundry
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background px-4 pb-4 pt-2 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              My Laundry
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>
          </div>
          <a
            href="https://speedymat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-amber-400 bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5 text-sm font-semibold text-amber-700 dark:text-amber-400"
          >
            Visit Official Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <div className="mt-3">
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
