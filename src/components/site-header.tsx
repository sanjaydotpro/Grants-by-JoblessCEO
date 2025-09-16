"use client";

import Link from "next/link";
import * as React from "react";
import Image from "next/image";

export interface SiteHeaderProps {
  className?: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ className }) => {
  return (
    <header className={`${className ?? ""} relative z-50 mt-4 sm:mt-6`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative mx-auto flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3.5 shadow-[0_14px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/10 supports-[backdrop-filter]:bg-white/5 sm:px-8 sm:py-4">
          {/* Brand */}
          <Link href="#hero" className="group inline-flex items-center">
            <Image
              src="/images/logo/logo-rect.webp"
              alt="Logo"
              width={120}
              height={32}
              className="h-8 w-auto transition-opacity group-hover:opacity-90"
              priority
            />
          </Link>



          <div className="flex items-center gap-2">
            <a
              href="https://discord.gg/uEWYj2Jmku"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-foreground/90 shadow-sm shadow-black/20 backdrop-blur-2xl hover:bg-white/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-all"
            >
              {/* Discord logo */}
              <svg
                className="h-4 w-4 text-[#fc1e67] drop-shadow-sm"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.205.205 0 00-.216.105c-.211.375-.444.864-.608 1.249a18.27 18.27 0 00-5.487 0c-.164-.393-.405-.874-.617-1.249a.206.206 0 00-.216-.105 19.736 19.736 0 00-4.885 1.515.19.19 0 00-.097.082C.533 9.045-.319 13.58.099 18.059a.213.213 0 00.084.146c1.86 1.366 3.664 2.196 5.435 2.746a.205.205 0 00.223-.076c.487-.666.922-1.367 1.301-2.105a.2.2 0 00-.109-.278c-.593-.224-1.158-.505-1.694-.834a.2.2 0 01-.02-.332c.114-.085.227-.173.336-.262a.197.197 0 01.205-.027c3.554 1.622 7.402 1.622 10.918 0a.197.197 0 01.206.027c.109.089.222.177.336.262a.2.2 0 01-.018.332c-.537.329-1.102.61-1.695.834a.2.2 0 00-.108.278c.383.738.818 1.439 1.301 2.105a.205.205 0 00.223.076c1.775-.55 3.579-1.38 5.435-2.746a.213.213 0 00.084-.146c.5-5.177-.838-9.674-3.549-13.66a.19.19 0 00-.097-.082zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;