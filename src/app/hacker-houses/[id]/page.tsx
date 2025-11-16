"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { houses } from "@/lib/hacker-houses-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HackerHouseDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const house = houses.find((h) => h.id === id);

  if (!house) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold">House not found</h1>
            <Link href="/hacker-houses" className="inline-flex mt-4">
              <Button className="rounded-full h-10 px-4 bg-white text-black border border-black/10">Back to Hacker Houses</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-28 pb-4">
        <div className="flex items-center gap-3 mb-6">
          {houseImages[house.name.toLowerCase()] ? (
            <Image src={houseImages[house.name.toLowerCase()]} alt={house.name} width={48} height={48} className="w-12 h-12 rounded-md object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-md bg-black flex items-center justify-center text-white font-bold">{house.name.slice(0, 2)}</div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{house.name}</h1>
            <p className="text-sm text-gray-600">{house.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-black/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Residence Details</h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-black/5 text-black border border-black/10">{house.housingType}</Badge>
                  {house.tags.slice(0, 3).map((t) => (
                    <Badge key={t} className="bg-black/5 text-black border border-black/10">{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-black/10 p-3">
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-gray-900 font-semibold">{house.duration}</div>
                </div>
                <div className="rounded-lg border border-black/10 p-3">
                  <div className="text-xs text-gray-500">Funding</div>
                  <div className="text-gray-900 font-semibold">{house.funding}</div>
                </div>
                <div className="rounded-lg border border-black/10 p-3">
                  <div className="text-xs text-gray-500">Audience</div>
                  <div className="text-gray-900 font-semibold">{house.audience}</div>
                </div>
                <div className="rounded-lg border border-black/10 p-3">
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="text-gray-900 font-semibold truncate">{house.contact ? house.contact : "—"}</div>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={() => window.open(house.website, "_blank")} className="rounded-xl h-11 px-5 bg-white text-black border border-black/10 hover:bg-white/90">
                  Visit Website <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-black/10 p-5">
              <h3 className="text-lg font-semibold mb-3">Overview</h3>
              <p className="text-gray-700 leading-relaxed">{house.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-black/10 p-5">
              <h3 className="text-lg font-semibold mb-3">Location</h3>
              <p className="text-gray-800">{house.location}</p>
            </div>
            <Link href="/hacker-houses" className="inline-flex">
              <Button variant="link" className="rounded-full h-10 px-4 bg-white text-black border border-black/10"> <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hacker Houses</Button>
            </Link>
          </div>
        </div>

        <section id="newsletter" className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="glass-panel rounded-xl p-5 shadow-none">
            <h3 className="text-xl font-semibold text-gray-900">Microgrants in your inbox</h3>
            <p className="text-gray-600 mt-2">Subscribe to receive new funding opportunities and tips directly in your inbox.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mt-4 flex items-center gap-3"
            >
              <Input
                type="email"
                placeholder="Enter your email"
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
          </div>

          <div className="glass-panel rounded-xl p-5 shadow-none">
            <h3 className="text-xl font-semibold text-gray-900">Never miss a funding opportunity</h3>
            <p className="text-gray-600 mt-2">Subscribe to our newsletter to receive updates when new microgrants and fellowship programs are added. We'll also keep you informed about application deadlines and success stories from previous grantees.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
  const houseImages: Record<string, any> = {
    'aevitas house': require('../../../../images/Aevitas House.png'),
    'nautilus': require('../../../../images/Nautilus.jpg'),
    'fr8': require('../../../../images/FR8.jpeg'),
    'haight st. commons': require('../../../../images/Haight St. Commons.png'),
    'nucleate dojo house': require('../../../../images/Nucleate .jpg'),
    'edge city': require('../../../../images/Edge City.svg'),
    'the bridge': require('../../../../images/The Bridge.webp'),
    'the residency': require('../../../../images/The Residency.png'),
  };