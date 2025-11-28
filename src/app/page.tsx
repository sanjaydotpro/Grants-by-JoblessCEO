"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import logo1517 from '../../images/1517.png';
import logo776 from '../../images/776.jpg';
import emergentImg from '../../images/MercatusCenter.jpg';
import nautilusImg from '../../images/Nautilus.jpg';
import foundryImg from '../../images/Foundry.webp';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="max-w-6xl mx-auto px-6 pt-32 md:pt-40 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 text-balance leading-tight max-w-3xl md:max-w-4xl mx-auto">
          <span className="block">Wanna work on your wildest idea to change the world?</span>
          <span className="mt-2 block text-lg md:text-2xl text-gray-700 font-medium">Here’s grants, hacker houses, and labspaces to back you and your vision.</span>
        </h1>
        <div className="mt-8 flex items-center justify-center">
          <Link href="/dashboard" className="inline-flex">
            <Button
              variant="link"
              className="rounded-full h-11 px-8 bg-[#ff205e] text-white hover:bg-[#ff205e]/90 no-underline hover:no-underline"
            >
              Here’s the story behind the JoblessCEO
            </Button>
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

            <Link href="/hacker-houses" className="block">
              <div className="group bg-white rounded-lg border border-black/10 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 overflow-hidden">
                <div className="relative aspect-[4/3] bg-black/5">
                  <Image src={nautilusImg} alt="Nautilus" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
                </div>
                <div className="p-5">
                  <div className="font-semibold text-black">Nautilus</div>
                  <div className="text-sm text-gray-600">Artist/maker house with patron funding</div>
                </div>
              </div>
            </Link>

            <Link href="/labspaces" className="block">
              <div className="group bg-white rounded-lg border border-black/10 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 overflow-hidden">
                <div className="relative aspect-[4/3] bg-black/5">
                  <Image src={foundryImg} alt="Molecular Foundry" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
                </div>
                <div className="p-5">
                  <div className="font-semibold text-black">Molecular Foundry</div>
                  <div className="text-sm text-gray-600">Shared lab access and prototyping</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-20 md:mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Explore 100+ Real world Programs & Builder
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">From Emergent Ventures to 1517 Fund and new initiatives like Localhost, we map every opportunity online. Discover grants, houses, labs, and builders creating cool stuff.​</p>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 pb-4 mt-16">
        <div id="newsletter" className="grid md:grid-cols-2 gap-4">
          <div className="glass-panel rounded-xl p-5 shadow-none">
            <h3 className="text-xl font-semibold text-gray-900">Microgrants in your inbox</h3>
            <p className="text-gray-600 mt-2">Subscribe to receive new funding opportunities and tips directly in your inbox.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const pagePath = window.location.pathname;
              try {
                await fetch('/api/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, page: pagePath }),
                });
                setSubscribed(true);
              } catch (error: any) {
                console.error('Error!', error?.message || error);
              }
            }}
            className="mt-4 flex items-center gap-3"
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/70 backdrop-blur-xl border border-black/10 rounded-xl h-11 focus:ring-0 focus:border-black/20"
            />
              <Button
                type="submit"
                variant="link"
                className="rounded-full h-10 px-5 bg-[#ff205e] text-white hover:bg-[#ff205e]/90 no-underline hover:no-underline border-0 backdrop-blur-0 before:opacity-0 shadow-none"
                disabled={subscribed}
              >
                {subscribed ? 'Sent' : 'Subscribe'}
              </Button>
            </form>
            {subscribed && (
              <p className="text-green-700 mt-3 text-sm">Sent! We'll keep you posted.</p>
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
