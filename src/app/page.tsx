"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import logo1517 from '../../images/1517.png';
import logo776 from '../../images/776.jpg';
import emergentImg from '../../images/MercatusCenter.jpg';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="max-w-6xl mx-auto px-6 pt-32 md:pt-40 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          We're a club for microgrant recipients working on big ideas.
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Meet new technical friends and make progress on your project.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button className="rounded-full h-11 px-6 bg-white text-black border border-black/10 hover:bg-white/90">Get a Microgrant</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full h-11 px-6 border-black/10 text-black hover:bg-black/5">See grants</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-14 md:mt-16">
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <Link href="/dashboard" className="block">
              <div className="group bg-white rounded-lg border border-black/10 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 overflow-hidden">
                <div className="relative aspect-[4/3] bg-black/5">
                  <Image src={emergentImg} alt="Emergent Ventures" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
                </div>
                <div className="p-5">
                  <div className="font-semibold text-black">Emergent Ventures</div>
                  <div className="text-sm text-gray-600">$1k–$50k grants for ambitious builders</div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard" className="block">
              <div className="group bg-white rounded-lg border border-black/10 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 overflow-hidden">
                <div className="relative aspect-[4/3] bg-black/5">
                  <Image src={logo1517} alt="1517 Fund" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
                </div>
                <div className="p-5">
                  <div className="font-semibold text-black">1517 Fund</div>
                  <div className="text-sm text-gray-600">$6k grants through the Medici Project</div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard" className="block">
              <div className="group bg-white rounded-lg border border-black/10 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 overflow-hidden">
                <div className="relative aspect-[4/3] bg-black/5">
                  <Image src={logo776} alt="776 Fellowship" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
                </div>
                <div className="p-5">
                  <div className="font-semibold text-black">776 Fellowship</div>
                  <div className="text-sm text-gray-600">$100k fellowship for climate change solutions</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-20 md:mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Explore 30+ Programs Like These
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
          From established programs like Emergent Ventures and 1517 Fund to newer initiatives like 776 Fellowship,
          we've curated detailed guides for each opportunity. Discover funding amounts, eligibility criteria, and
          application tips from past recipients.
        </p>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 pb-4 mt-16">
        <div id="newsletter" className="grid md:grid-cols-2 gap-4">
          <div className="glass-panel rounded-xl p-5 shadow-none">
            <h3 className="text-xl font-semibold text-gray-900">Microgrants in your inbox</h3>
            <p className="text-gray-600 mt-2">Subscribe to receive new funding opportunities and tips directly in your inbox.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) {
                  setSubscribed(true);
                }
              }}
              className="mt-4 flex items-center gap-3"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/70 backdrop-blur-xl border border-black/10 rounded-xl h-11 focus:ring-0 focus:border-black/20"
              />
              <Button
                type="submit"
                variant="link"
                className="rounded-full h-10 px-5 bg-[#ff205e] text-white hover:bg-[#ff205e]/90 no-underline hover:no-underline border-0 backdrop-blur-0 before:opacity-0 shadow-none"
              >
                Subscribe
              </Button>
            </form>
            {subscribed && (
              <p className="text-green-700 mt-3 text-sm">Subscribed! We'll keep you posted.</p>
            )}
          </div>

          <div className="glass-panel rounded-xl p-5 shadow-none">
            <h3 className="text-xl font-semibold text-gray-900">Never miss a funding opportunity</h3>
            <p className="text-gray-600 mt-2">Subscribe to our newsletter to receive updates when new microgrants and fellowship programs are added. We'll also keep you informed about application deadlines and success stories from previous grantees.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
