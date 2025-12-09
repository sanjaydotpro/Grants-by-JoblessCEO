import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import favicon from "../../images/favicon.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Zero",
  description: "Discover and manage grants with ease",
  icons: {
    icon: [
      { url: favicon.src },
      { url: favicon.src, rel: "shortcut icon" },
      { url: favicon.src, rel: "apple-touch-icon" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Script src="https://rybbit.kapy.in/api/script.js" data-site-id="596f3959f462" strategy="afterInteractive" defer />
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-6">
          <nav className="bg-white rounded-full border border-black/10 max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative rounded-xl p-2 bg-transparent">
                  <Image src={favicon} alt="Logo" width={36} height={36} className="rounded" />
                </div>
                <span className="text-base md:text-lg font-semibold text-black">Zero</span>
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <Link href="/" className="text-sm text-black hover:text-black px-3 py-1.5 rounded-full">
                  Home
                </Link>
                <Link href="/dashboard" className="text-sm text-black hover:text-black px-3 py-1.5 rounded-full">
                  Grants
                </Link>
                <Link href="/hacker-houses" className="text-sm text-black hover:text-black px-3 py-1.5 rounded-full">
                  Hacker Houses
                </Link>
                <Link href="/labspaces" className="text-sm text-black hover:text-black px-3 py-1.5 rounded-full">
                  Labspaces
                </Link>
                <Link href="https://x.com/khushal_davesar/status/1994399333433888913" target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Button variant="link" className="rounded-full h-9 px-4 bg-[#ff205e] text-white hover:bg-[#ff205e]/90 no-underline hover:no-underline">Our Story</Button>
                </Link>
              </div>
              <div className="md:hidden">
                <details className="relative">
                  <Button variant="link" asChild className="rounded-full h-9 px-3 text-black">
                    <summary className="list-none">
                      <Menu className="w-5 h-5" />
                      <span className="sr-only">Open menu</span>
                    </summary>
                  </Button>
                  <div className="absolute right-0 mt-2 bg-white rounded-2xl border border-black/10 shadow-sm p-2 min-w-[220px] z-50">
                    <form action="/dashboard" method="get" className="p-2">
                      <Input
                        name="q"
                        placeholder="Search grants"
                        aria-label="Search grants"
                        className="bg-white border border-black/10 rounded-full h-9 px-3"
                      />
                    </form>
                    <Link href="/" className="block text-sm text-black px-3 py-2 rounded-md hover:bg-black/5">Home</Link>
                    <Link href="/dashboard" className="block text-sm text-black px-3 py-2 rounded-md hover:bg-black/5">Grants</Link>
                    <Link href="/hacker-houses" className="block text-sm text-black px-3 py-2 rounded-md hover:bg-black/5">Hacker Houses</Link>
                    <Link href="/labspaces" className="block text-sm text-black px-3 py-2 rounded-md hover:bg-black/5">Labspaces</Link>
                    <Link href="https://x.com/khushal_davesar/status/1994399333433888913" target="_blank" rel="noopener noreferrer" className="block mt-1">
                      <Button variant="link" className="w-full rounded-full h-9 px-4 bg-[#ff205e] text-white hover:bg-[#ff205e]/90 no-underline hover:no-underline">Our Story</Button>
                    </Link>
                  </div>
                </details>
              </div>
            </div>
          </nav>
        </header>
        <ErrorReporter />
        {children}
        <footer className="bg-white border-t border-black/10 mt-8">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative rounded-xl p-2 bg-transparent">
                <Image src={favicon} alt="Logo" width={36} height={36} className="rounded" />
              </div>
              <span className="text-base md:text-lg font-semibold text-black">Zero</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-4">Microgrants</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/grants/1" className="block hover:text-black">1517's Medici Grant</Link>
                  <Link href="/grants/13" className="block hover:text-black">Emergent Ventures</Link>
                  <Link href="/grants/46" className="block hover:text-black">Merge Grant</Link>
                  <Link href="/grants/25" className="block hover:text-black">OSV Fellowship</Link>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-4">Hacker Houses</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/hacker-houses/hh-nautilus" className="block hover:text-black">Nautilus</Link>
                  <Link href="/hacker-houses/hh-fr8" className="block hover:text-black">FR8</Link>
                  <Link href="/hacker-houses/hh-aevitas" className="block hover:text-black">Aevitas House</Link>
                  <Link href="/hacker-houses/hh-the-bridge" className="block hover:text-black">The Bridge</Link>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-4">Labspaces</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/labspaces/soundbio-lab" className="block hover:text-black">SoundBio Lab</Link>
                  <Link href="/labspaces/stanford-nanofabrication-facility" className="block hover:text-black">Stanford Nanofabrication Facility</Link>
                  <Link href="/labspaces/tinkermill" className="block hover:text-black">TinkerMill</Link>
                  <Link href="/labspaces/velocity" className="block hover:text-black">Velocity</Link>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-4">Add Grants</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="https://forms.gle/4TWgHe9RghVFQnKg8" target="_blank" rel="noopener noreferrer" className="block hover:text-black">Submit a Grant</Link>
                </div>
              </div>
            </div>
            <div className="border-t border-black/10 mt-10 pt-6 flex items-center justify-between">
              <div className="text-gray-600 text-sm">© 2025 · Zero · All rights reserved</div>
              <div className="text-gray-600 text-sm">made with ❤️ by Akul, Sanjay & Khushal</div>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
