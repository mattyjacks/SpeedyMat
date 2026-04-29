import { AlertTriangle, ExternalLink } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="sticky top-0 z-[60] w-full bg-red-600 text-white py-2 px-4 text-center text-xs sm:text-sm font-semibold shadow-md">
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 flex-wrap">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>
          THIS IS A DEMO SITE MADE BY{" "}
          <a
            href="https://mattyjacks.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 font-bold hover:text-red-100 transition-colors"
          >
            MATTYJACKS.COM
          </a>
          {" "}AND IS NOT AUTHORIZED BY SPEEDYMAT
        </span>
        <span className="hidden sm:inline">|</span>
        <a
          href="https://speedymat.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline underline-offset-2 font-bold hover:text-red-100 transition-colors"
        >
          Visit Official Site
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
