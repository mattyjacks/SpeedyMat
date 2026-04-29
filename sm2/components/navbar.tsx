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
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = pathname === "/";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "SpeedyChat", icon: MessageCircle },
    { href: "/customers", label: "For Customers" },
    { href: "/investors", label: "For Investors" },
    { href: "/charity", label: "Speedy 4 Charity" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/admin", label: "Admin" },
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
          <div className="relative h-9 w-9 transition-transform group-hover:scale-110">
            <Image
              src="/speedymat logo speedy.png"
              alt="SpeedyMat Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline">
            Speedy<span className="text-primary">Mat</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = (link as any).icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {link.label}
              </Link>
            );
          })}
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
          {navLinks.map((link) => {
            const Icon = (link as any).icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {link.label}
              </Link>
            );
          })}
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
