import HeroSection from "@/components/hero-section";
import GrantsApplicationSection from "@/components/grants-application-section";
import CommunitySection from "@/components/community-section";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import { SectionReveal } from "@/components/section-reveal";
import InteractiveBackground from "@/components/interactive-background";

export default function Page() {
  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      {/* Page-level interactive background (unified for nav + page) */}
      <InteractiveBackground />

      {/* Top navigation */}
      <SiteHeader />

      {/* Hero */}
      <div id="hero" className="relative">
        <HeroSection />
      </div>

      {/* Grants / Application */}
      <section id="apply" className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="sr-only">Grants and Application</h2>
          <SectionReveal>
            <GrantsApplicationSection className="rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/10 hover:ring-white/20 hover:shadow-[0_12px_50px_rgba(0,0,0,0.35)]" />
          </SectionReveal>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <CommunitySection
              className="rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/10 hover:ring-white/20 hover:shadow-[0_12px_50px_rgba(0,0,0,0.35)]"
              discordUrl="https://discord.gg/uEWYj2Jmku"
              heading="Stay in the loop"
              ctaLabel="Join Discord"
            />
          </SectionReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-10 sm:px-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jobless CEO. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#apply"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Apply
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}