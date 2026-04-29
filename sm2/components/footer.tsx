import Link from "next/link";
import { WashingMachine, Mail, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <WashingMachine className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">
                Speedy<span className="text-primary">Mat</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transforming the essential laundry chore into a productive &
              best-in-class experience. Your Neighborhood Laundromat.
            </p>
            <a
              href="https://speedymat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
            >
              Visit Official Site
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/schedule"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Schedule Drop-off
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:invest@speedymat.com" className="hover:text-foreground transition-colors">
                  invest@speedymat.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>PO Box 15208, Phoenix, Arizona 85060</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border-2 border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20 p-4 text-center">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            THIS IS A DEMO SITE MADE BY{" "}
            <a
              href="https://mattyjacks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-red-900 dark:hover:text-red-300"
            >
              MATTYJACKS.COM
            </a>
            {" "}AND IS NOT AUTHORIZED BY SPEEDYMAT
          </p>
          <a
            href="https://speedymat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-red-600 dark:text-red-400 underline underline-offset-2 hover:text-red-800"
          >
            Visit the Official SpeedyMat Website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-6 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>
            Copyright &copy; {new Date().getFullYear()} SpeedyMat Management,
            LLC. All rights reserved. Keeping It Clean&#8480; &middot; Speedy 4
            Charity&#8480;
          </p>
        </div>
      </div>
    </footer>
  );
}
