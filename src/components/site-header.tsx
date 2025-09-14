"use client";

import Link from "next/link";
import * as React from "react";
import { Sparkles } from "lucide-react";

export interface SiteHeaderProps {
  className?: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ className }) => {
  return (
    <header className={`${className ?? ""} relative z-50 mt-4 sm:mt-6`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative mx-auto flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3.5 shadow-[0_14px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/10 supports-[backdrop-filter]:bg-white/5 sm:px-8 sm:py-4">
          {/* Brand */}
          <Link href="#hero" className="group inline-flex items-center gap-2">
            <span className="relative grid h-6 w-6 place-items-center">
              <span className="absolute inset-0 rounded-md bg-primary/30 blur-md" aria-hidden="true" />
              <span className="h-3 w-3 rounded-sm bg-primary shadow-[0_0_24px_rgba(139,92,246,0.65)]" />
            </span>
            <span className="select-none text-sm font-semibold tracking-wide text-foreground/90 transition-colors group-hover:text-foreground sm:text-base">
              Jobless CEO
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden items-center gap-1 sm:flex sm:gap-2 md:gap-4">
            <a
              href="#hero"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-white/10 hover:ring-1 hover:ring-white/15"
            >
              Home
            </a>
            <a
              href="#apply"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-white/10 hover:ring-1 hover:ring-white/15"
            >
              Grants & Residencies
            </a>
            <a
              href="#community"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-white/10 hover:ring-1 hover:ring-white/15"
            >
              Community
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#apply"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-foreground/90 shadow-sm shadow-black/20 backdrop-blur-2xl hover:bg-white/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;