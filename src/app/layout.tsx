import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import favicon from "../../images/favicon.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "JoblessCEO",
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
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-6">
          <nav className="bg-white rounded-full border border-black/10 max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative rounded-xl p-2 bg-transparent">
                  <Image src={favicon} alt="Logo" width={36} height={36} className="rounded" />
                </div>
                <span className="text-base md:text-lg font-semibold text-black">JoblessCEO</span>
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
                <Link href="https://whop.com/jobless-ceo/" target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Button variant="link" className="rounded-full h-9 px-4 bg-[#ff205e] text-white hover:bg-[#ff205e]/90 no-underline hover:no-underline">Join Community</Button>
                </Link>
              </div>
              <div className="md:hidden">
                <details className="relative">
                  <summary className="list-none">
                    <Button variant="link" className="rounded-full h-9 px-3 text-black">
                      <Menu className="w-5 h-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </summary>
                  <div className="absolute right-0 mt-2 bg-white rounded-2xl border border-black/10 shadow-sm p-2 min-w-[200px] z-50">
                    <Link href="/" className="block text-sm text-black px-3 py-2 rounded-md hover:bg-black/5">Home</Link>
                    <Link href="/dashboard" className="block text-sm text-black px-3 py-2 rounded-md hover:bg-black/5">Grants</Link>
                    <Link href="/hacker-houses" className="block text-sm text-black px-3 py-2 rounded-md hover:bg-black/5">Hacker Houses</Link>
                    <Link href="/labspaces" className="block text-sm text-black px-3 py-2 rounded-md hover:bg-black/5">Labspaces</Link>
                    <Link href="https://whop.com/jobless-ceo/" target="_blank" rel="noopener noreferrer" className="block mt-1">
                      <Button variant="link" className="w-full rounded-full h-9 px-4 bg-[#ff205e] text-white hover:bg-[#ff205e]/90 no-underline hover:no-underline">Join Community</Button>
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
              <span className="text-base md:text-lg font-semibold text-black">JoblessCEO</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-4">Microgrants</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/grants/1" className="block hover:text-black">1517's Medici Grant</Link>
                  <Link href="/dashboard" className="block hover:text-black">Emergent Ventures</Link>
                  <Link href="/dashboard" className="block hover:text-black">Merge Grant</Link>
                  <Link href="/grants/25" className="block hover:text-black">OSV Fellowship</Link>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-4">Community</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/dashboard" className="block hover:text-black">ODF</Link>
                  <Link href="/dashboard" className="block hover:text-black">Solo Founders</Link>
                  <Link href="/dashboard" className="block hover:text-black">Builders Who Run</Link>
                  <Link href="/dashboard" className="block hover:text-black">Landing Club</Link>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-4">Resources</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/dashboard" className="block hover:text-black">Microgrant Guide</Link>
                  <Link href="/dashboard" className="block hover:text-black">Podcast</Link>
                  <Link href="/dashboard#newsletter" className="block hover:text-black">Newsletter</Link>
                  <Link href="/dashboard" className="block hover:text-black">Looking For Grants</Link>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-4">Get Involved</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/dashboard" className="block hover:text-black">Apply to Merge</Link>
                  <Link href="/dashboard" className="block hover:text-black">Start your own microgrant</Link>
                  <Link href="/dashboard" className="block hover:text-black">Looking for Grants</Link>
                </div>
              </div>
            </div>
            <div className="border-t border-black/10 mt-10 pt-6 flex items-center justify-between">
              <div className="text-gray-600 text-sm">
                © 2025 · JoblessCEO · All rights reserved · Privacy Policy · San Francisco, CA · Admin Portal
              </div>
              <div className="flex items-center gap-4 text-gray-600 text-sm">
                <Link href="/dashboard" className="hover:text-black">X</Link>
                <Link href="/dashboard" className="hover:text-black">LinkedIn</Link>
                <Link href="/dashboard" className="hover:text-black">YouTube</Link>
                <Link href="/dashboard" className="hover:text-black">Spotify</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}