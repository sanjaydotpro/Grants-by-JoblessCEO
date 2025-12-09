import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import localhostImg from "../../../../images/localhost-logo.png";

type Lab = {
  name: string;
  location: string;
  country: string;
  website: string;
  specialty: string[];
  type: string[];
};

function toSlug(s: string) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export const revalidate = 3600;

export default async function LabspaceDetailPage({ params }: any) {
  const url = "https://docs.google.com/spreadsheets/d/1mK5h3-TOgt6wL2Wx-Tf3nkL7F_EpJSfhcUjTlT647jQ/export?format=csv";
  const res = await fetch(url, { next: { revalidate } });
  const text = await res.text();
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else { field += c; }
    } else {
      if (c === '"') { inQuotes = true; }
      else if (c === ',') { row.push(field); field = ""; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === '\r') { }
      else { field += c; }
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  if (!rows.length) {
    return (
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Lab not found</h1>
            <Link href="/labspaces" className="inline-flex mt-4">
              <Button className="rounded-full h-10 px-4 bg-white text-black border border-black/10">Back to Labspaces</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (k: string) => header.indexOf(k);
  const iName = idx("lab name");
  const iLocation = idx("city/state");
  const iCountry = idx("country");
  const iWebsite = idx("website");
  const iSpecialty = idx("lab speciality");
  const iType = idx("lab type");
  const found = rows.slice(1).find((r) => toSlug(r[iName] || "") === params.slug);
  if (!found) {
    if (params.slug === 'localhost') {
      const lab: Lab = {
        name: 'Localhost',
        location: 'Bangalore, Karnataka',
        country: 'India',
        website: '',
        specialty: ['Community', 'Prototyping'],
        type: ['Coming Soon'],
      };
      return (
        <div className="bg-background">
          <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-28 pb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-transparent border border-black/10 flex items-center justify-center">
                <Image src={localhostImg} alt={lab.name} width={48} height={48} className="object-cover object-center" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{lab.name}</h1>
                <p className="text-sm text-gray-600">{lab.location} · {lab.country}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-black/10 p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Details</h2>
                    <div className="flex items-center gap-2">
                      {lab.specialty.slice(0, 3).map((t) => (
                        <Badge key={t} className="bg-black/5 text-black border border-black/10">{t}</Badge>
                      ))}
                      {lab.type.slice(0, 2).map((t) => (
                        <Badge key={t} className="bg-black/5 text-black border border-black/10">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-black/10 p-3">
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="text-gray-900 font-semibold">{lab.location}</div>
                    </div>
                    <div className="rounded-lg border border-black/10 p-3">
                      <div className="text-xs text-gray-500">Country</div>
                      <div className="text-gray-900 font-semibold">{lab.country}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <Link href="/labspaces" className="inline-flex">
                  <Button variant="link" className="rounded-full h-10 px-4 bg-white text-black border border-black/10"> <ArrowLeft className="w-4 h-4 mr-2" /> Back to Labspaces</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Lab not found</h1>
            <Link href="/labspaces" className="inline-flex mt-4">
              <Button className="rounded-full h-10 px-4 bg-white text-black border border-black/10">Back to Labspaces</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const specialty = (found[iSpecialty] || "").split(/[,;|]/).map((t) => t.trim()).filter(Boolean);
  const type = (found[iType] || "").split(/[,;|]/).map((t) => t.trim()).filter(Boolean);
  const lab: Lab = {
    name: found[iName] || "",
    location: found[iLocation] || "",
    country: found[iCountry] || "",
    website: found[iWebsite] || "",
    specialty,
    type,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-28 pb-0">
        <div className="flex items-center gap-3 mb-6">
          {(() => {
            const key = lab.name.trim().toLowerCase();
            if (key.includes('local host') || key === 'localhost') {
              return (
                <div className="w-12 h-12 rounded-md overflow-hidden bg-transparent border border-black/10 flex items-center justify-center">
                  <Image src={localhostImg} alt={lab.name} width={48} height={48} className="object-cover object-center" />
                </div>
              );
            }
            return (
              <div className="w-12 h-12 rounded-md bg-black flex items-center justify-center text-white font-bold">{lab.name.slice(0, 2)}</div>
            );
          })()}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{lab.name}</h1>
            <p className="text-sm text-gray-600">{lab.location} · {lab.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-black/10 p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Details</h2>
                <div className="flex items-center gap-2">
                  {lab.specialty.slice(0, 3).map((t) => (
                    <Badge key={t} className="bg-black/5 text-black border border-black/10">{t}</Badge>
                  ))}
                  {lab.type.slice(0, 2).map((t) => (
                    <Badge key={t} className="bg-black/5 text-black border border-black/10">{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-black/10 p-3">
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="text-gray-900 font-semibold">{lab.location}</div>
                </div>
                <div className="rounded-lg border border-black/10 p-3">
                  <div className="text-xs text-gray-500">Country</div>
                  <div className="text-gray-900 font-semibold">{lab.country}</div>
                </div>
              </div>
              <div className="mt-4">
                <Button asChild className="rounded-xl h-11 px-5 bg-white text-black border border-black/10 hover:bg-white/90">
                  <Link href={lab.website} target="_blank" rel="noopener noreferrer">
                    Visit Website <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Link href="/labspaces" className="inline-flex">
              <Button variant="link" className="rounded-full h-10 px-4 bg-white text-black border border-black/10"> <ArrowLeft className="w-4 h-4 mr-2" /> Back to Labspaces</Button>
            </Link>
          </div>
        </div>

        <section id="newsletter" className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="glass-panel rounded-xl p-5 shadow-none">
            <h3 className="text-xl font-semibold text-gray-900">Microgrants in your inbox</h3>
            <p className="text-gray-600 mt-2">Subscribe to receive new funding opportunities and tips directly in your inbox.</p>
            <form action="/api/subscribe" method="POST" encType="multipart/form-data" className="mt-4 flex items-center gap-3">
              <input type="hidden" name="page" value="/labspaces" />
              <Input
                type="email"
                name="email"
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
