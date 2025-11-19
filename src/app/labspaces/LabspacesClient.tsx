"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

type Labspace = {
  id: string;
  name: string;
  operator: string;
  access: string;
  location: string;
  tags: string[];
  link: string;
};

export default function LabspacesClient({ initialLabs }: { initialLabs: Labspace[] }) {
  const [labs] = useState<Labspace[]>(initialLabs);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const tagSet = new Set<string>();
    labs.forEach((l) => l.tags.forEach((t) => tagSet.add(t)));
    const cats = ["all", ...Array.from(tagSet)];
    const list = labs.filter((l) => {
      const matchesCat = categoryFilter === "all" || l.tags.map((t) => t.toLowerCase()).includes(categoryFilter.toLowerCase());
      if (!q) return matchesCat;
      const inName = l.name.toLowerCase().includes(q);
      const inOp = l.operator.toLowerCase().includes(q);
      const inLoc = l.location.toLowerCase().includes(q);
      const inAccess = l.access.toLowerCase().includes(q);
      const inTags = l.tags.join(" ").toLowerCase().includes(q);
      return matchesCat && (inName || inOp || inLoc || inAccess || inTags);
    });
    list.sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : a.location.localeCompare(b.location)));
    return { list, cats };
  }, [labs, searchQuery, categoryFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 pb-8 mt-16 md:mt-20">
        <div className="text-left space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Labspaces</h2>
          <p className="text-sm md:text-base text-gray-600">Shared labs and prototyping spaces. Browse access, focus areas, and locations.</p>
        </div>
      </div>

      <main className="relative max-w-7xl mx-auto px-6 pb-4">
        <div className="mb-8">
          <div className="glass rounded-full border border-black/10 px-3 py-2 flex items-center gap-2 flex-wrap md:flex-nowrap">
            <Search className="text-gray-500 w-5 h-5 ml-1" />
            <Input
              type="text"
              placeholder="Search labspaces, operators, or locations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[160px] bg-transparent border-0 focus:ring-0 px-2 h-10 text-sm md:text-base"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="rounded-full h-9 px-3 bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-black/10 text-sm focus-visible:ring-0 min-w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/50 z-[60]">
                {filtered.cats.map((cat) => (
                  <SelectItem key={cat} value={cat} className="cursor-pointer">
                    {cat === "all" ? "All" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-full h-9 px-3 bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-black/10 text-sm focus-visible:ring-0 min-w-[140px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/50 z-[60]">
                <SelectItem value="name">Name (A–Z)</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.list.length > 0 ? (
          <>
            <div className="hidden md:block bg-white/90 backdrop-blur-xl rounded-3xl border border-black/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-[hsl(0_0%_97%)] [&_tr]:border-black/10 [&_th]:text-black">
                  <TableRow>
                    <TableHead className="w-[40%]">Labspace</TableHead>
                    <TableHead className="w-[20%]">Access</TableHead>
                    <TableHead className="w-[25%]">Focus</TableHead>
                    <TableHead className="w-[15%]">Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.list.map((l) => (
                    <TableRow
                      key={l.id}
                      onClick={() => {
                        const slug = encodeURIComponent(l.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
                        window.location.href = `/labspaces/${slug}`;
                      }}
                      className="cursor-pointer"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-md bg-black flex items-center justify-center text-white font-bold">{l.name.slice(0, 1)}</div>
                          <div>
                            <div className="font-semibold text-gray-900">{l.name}</div>
                            <div className="text-xs text-gray-600">{l.operator}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900 font-semibold">{l.access}</div>
                        <div className="text-xs text-gray-500 mt-1">Open details →</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {l.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} className="bg-black/5 text-black border border-black/10">{tag}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-800">{l.location}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="md:hidden space-y-3">
              {filtered.list.map((l) => (
                <Link key={l.id} href={`/labspaces/${encodeURIComponent(l.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""))}`} className="block w-full text-left bg-white/90 backdrop-blur-xl rounded-2xl border border-black/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-black flex items-center justify-center text-white font-bold">{l.name.slice(0, 1)}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{l.name}</div>
                      <div className="text-xs text-gray-600">{l.operator}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-900 font-semibold">{l.access}</div>
                  <div className="mt-1 text-sm text-gray-700">{l.location}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {l.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} className="bg-black/5 text-black border border-black/10">{tag}</Badge>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 p-20 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-black/5 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-black/70" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">No labspaces found</h3>
              <p className="text-gray-600 max-w-md mx-auto">Try adjusting your search or filters to discover more shared labs.</p>
            </div>
          </div>
        )}

        <section id="newsletter" className="grid md:grid-cols-2 gap-4 mt-8">
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
        </section>
      </main>
    </div>
  );
}