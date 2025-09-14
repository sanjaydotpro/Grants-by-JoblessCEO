"use client";

import React from "react";
import { Group, Dot, SeparatorHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type Benefit = {
  title: string;
  description?: string;
};

interface CommunitySectionProps {
  className?: string;
  style?: React.CSSProperties;
  discordUrl?: string;
  benefits?: Benefit[];
  heading?: string;
  ctaLabel?: string;
}

const defaultBenefits: Benefit[] = [
  {
    title: "Live updates",
    description: "Get announcements, drops, and event news in real time.",
  },
  {
    title: "Investor connections",
    description: "Meet angels, VCs, and operator-investors who back builders.",
  },
  {
    title: "Collaboration opportunities",
    description: "Find co-founders, teammates, and project collaborators.",
  },
  {
    title: "Free workspace access",
    description: "Join weekly co-working and curated meetups in the city.",
  },
];

export default function CommunitySection({
  className,
  style,
  discordUrl,
  benefits = defaultBenefits,
  heading = "Stay in the loop",
  ctaLabel = "Join Discord",
}: CommunitySectionProps) {
  const hasUrl = typeof discordUrl === "string" && discordUrl.length > 0;

  return (
    <section
      className={`relative w-full max-w-full ${className ?? ""}`}
      style={style}
      aria-label="Community Discord"
    >
      <div className="relative overflow-hidden rounded-2xl bg-surface-1 border border-border">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="relative p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary ring-1 ring-inset ring-border">
              <Group className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl leading-tight tracking-[-0.015em] text-foreground">
                {heading}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                Join operators, investors, and builders shaping what&#39;s next.
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <SeparatorHorizontal className="h-4 w-4 text-border" aria-hidden="true" />
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {benefits.map((b, idx) => (
              <li
                key={`${b.title}-${idx}`}
                className="group flex items-start gap-3 rounded-lg bg-surface-2/50 p-4 ring-1 ring-inset ring-border transition-colors hover:bg-surface-2"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-inset ring-primary/30 transition-transform group-hover:scale-105">
                  <Dot className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-medium text-foreground break-words">
                    {b.title}
                  </p>
                  {b.description ? (
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground break-words">
                      {b.description}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3">
            {hasUrl ? (
              <Button
                asChild
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm shadow-black/20 backdrop-blur ring-1 ring-white/10 transition-all hover:bg-white/20 hover:ring-white/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
                aria-label="Join our Discord server"
              >
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Official Discord logo */}
                  <svg
                    className="h-4 w-4 text-[#5865F2] drop-shadow-sm"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.205.205 0 00-.216.105c-.211.375-.444.864-.608 1.249a18.27 18.27 0 00-5.487 0c-.164-.393-.405-.874-.617-1.249a.206.206 0 00-.216-.105 19.736 19.736 0 00-4.885 1.515.19.19 0 00-.097.082C.533 9.045-.319 13.58.099 18.059a.213.213 0 00.08.147 19.9 19.9 0 005.993 3.03.206.206 0 00.222-.06c.461-.63.873-1.295 1.226-1.993a.205.205 0 00-.115-.287 13.116 13.116 0 01-1.872-.878.206.206 0 01-.02-.342c.125-.094.25-.192.368-.291a.205.205 0 01.214-.03c3.927 1.793 8.18 1.793 12.061 0a.205.205 0 01.215.029c.118.099.242.197.368.291a.206.206 0 01-.019.342c-.6.35-1.218.639-1.873.879a.205.205 0 00-.113.286c.36.698.772 1.363 1.226 1.993a.205.205 0 00.222.06 19.842 19.842 0 005.993-3.03.206.206 0 00.08-.147c.5-5.177-.838-9.674-3.548-13.608a.16.16 0 00-.097-.082zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.175 1.093 2.157 2.419 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.175 1.093 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z" />
                  </svg>
                  <span>{ctaLabel}</span>
                </a>
              </Button>
            ) : (
              <Button
                disabled
                aria-disabled="true"
                className="bg-secondary text-secondary-foreground hover:bg-secondary cursor-not-allowed"
              >
                {ctaLabel}
              </Button>
            )}
            <span className="text-xs sm:text-sm text-muted-foreground">
              It&#39;s free. Be the first to hear about drops and meetups.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}