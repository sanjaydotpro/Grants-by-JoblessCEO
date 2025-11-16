"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { grantsData } from '@/lib/grants-data';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import Image from 'next/image';
import logo1517 from '../../../images/1517.png';
import logo776 from '../../../images/776.jpg';
import emergentLogo from '../../../images/MercatusCenter.jpg';
import evmLogo from '../../../images/evm capital.avif';
import antikytheraImg from '../../../images/Antikythera Studio.png';
import awesomeImg from '../../../images/Awesome Foundation .png';
import brainsImg from '../../../images/Brains.png';
import cosmosImg from '../../../images/Cosmos.avif';
import dojoImg from '../../../images/DojoGrants.jpg';
import eaAnimalImg from '../../../images/EA Animal Welfare Fund.avif';
import eaInfraImg from '../../../images/EA Infrastructure Funds.avif';
import edgeCityImg from '../../../images/Edge City Fellowship.svg';
import emergentEvImg from '../../../images/Emergent Ventures .jpg';
import emergentEvIndiaImg from '../../../images/Emergent Ventures India.jpg';
import foresightImg from '../../../images/Foresight Fellowship.png';
import gitcoinImg from '../../../images/Gitcoin Grants.svg';
import longevityImg from '../../../images/Longevity Fellowship.jpeg';
import civicInnovatorsImg from '../../../images/The Civic Innovators Fellowship .webp';
import activateImg from '../../../images/activate.png';
import henryArnholdImg from '../../../images/Henry Arnhold Fellowship.svg';
import rainerArnholdImg from '../../../images/Rainer Arnhold Fellowship.svg';
import inflectionImg from '../../../images/Inflection Grants.jpeg';
import magnificentImg from '../../../images/Magnificent Grants.png';
import newScienceImg from '../../../images/New Science.jpg';
import ngioImg from '../../../images/Next Generation Internet 0.png';
import nonTrivialImg from '../../../images/Non Trivial.png';
import oshaughnessyImg from '../../../images/O’Shaughnessy Fellowship.jpeg';
import promisePrizeImg from '../../../images/Promise Prize.png';
import protostarsImg from '../../../images/Protostars.jpg';
import riseProgramImg from '../../../images/Rise Program.png';
import schmidtFuturesImg from '../../../images/Schmidt Futures.jpeg';
import wtfFundImg from '../../../images/wtf fund.png';
import zFellowsImg from '../../../images/zfellows_logo.jpeg';
import liftoffImg from '../../../images/lift off grant.jpeg';
import localhostImg from '../../../images/localhost.jpeg';
import mergeClubImg from '../../../images/mergeclub.jpg';
import vibefundImg from '../../../images/vibe fund.png';
import flightSchoolImg from '../../../images/the flight school.avif';
import siliconValleyFellowshipImg from '../../../images/siliconvalley fellowship.avif';
import teloraImg from '../../../images/Telora.webp';
import formidableFundImg from '../../../images/The Formidable Fund .webp';
import thielImg from '../../../images/thiel.png';
import asteraImg from '../../../images/Astera Residency Program.jpg';
import bagelFundImg from '../../../images/Bagel Fund.png';
import breakthroughEnergyImg from '../../../images/Breakthrough Energy Fellows.jpeg';
import cactusCapitalImg from '../../../images/Cactus Capital.avif';
import cryoDaoImg from '../../../images/CryoDAO.svg';
import foundryImg from '../../../images/Foundry.webp';
import gcVentureImg from '../../../images/General Catalyst Venture Fellows.jpg';
import goHumanImg from '../../../images/Go Human.jpeg';
import greenhornImg from '../../../images/Greenhorn Microgrants.png';
import manifestImg from '../../../images/Manifest Grants.jpg';
import polarFellowshipImg from '../../../images/Polar Fellowship.png';
import rodCatalystImg from '../../../images/Roddenberry Catalyst.webp';
import sciFounderImg from '../../../images/SciFounder Fellowship.jpg';
import slavinImg from '../../../images/Slavin Foundation.png';
import sffImg from '../../../images/Survival and Flourishing Fund.jpeg';
import stochasticImg from '../../../images/Stochastic Labs Summer Residency.webp';
import techyonImg from '../../../images/Techyon Microgrants.png';
import choppedVCLogo from '../../../images/Chopped VC.png';

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const grantImages: Record<string, any> = {
    '1517 medici project': logo1517,
    '776 fellowship': logo776,
    'activate fellowship': activateImg,
    'antikythera studio': antikytheraImg,
    'awesome foundation': awesomeImg,
    'brains': brainsImg,
    'cosmos': cosmosImg,
    'dojogrants': dojoImg,
    'ea animal welfare fund': eaAnimalImg,
    'ea infrastructure funds': eaInfraImg,
    'edge city fellowship': edgeCityImg,
    'the civic innovators fellowship': civicInnovatorsImg,
    'emergent ventures': emergentEvImg,
    'emergent ventures india': emergentEvIndiaImg,
    'foresight fellowship': foresightImg,
    'gitcoin grants': gitcoinImg,
    'longevity fellowship': longevityImg,
    'henry arnhold fellowship': henryArnholdImg,
    'rainer arnhold fellowship': rainerArnholdImg,
    'inflection grants': inflectionImg,
    'magnificent grants': magnificentImg,
    'new science': newScienceImg,
    'next generation internet 0': ngioImg,
    'non trivial': nonTrivialImg,
    'o’shaughnessy fellowship': oshaughnessyImg,
    "o'shaughnessy fellowship": oshaughnessyImg,
    'promise prize': promisePrizeImg,
    'protostars': protostarsImg,
    'rise program': riseProgramImg,
    'schmidt futures': schmidtFuturesImg,
    'wtfund': wtfFundImg,
    'z fellows': zFellowsImg,
    'lift off grant': liftoffImg,
    'local host': localhostImg,
    'merge grant': mergeClubImg,
    'vibefund': vibefundImg,
    'the flight school': flightSchoolImg,
    'silicon valley fellowship': siliconValleyFellowshipImg,
    'telora': teloraImg,
    'the formidable fund': formidableFundImg,
    'thiel fellowship': thielImg,
    'astera residency program': asteraImg,
    'bagel fund': bagelFundImg,
    'breakthrough energy fellows': breakthroughEnergyImg,
    'cactus capital': cactusCapitalImg,
    'cryodao': cryoDaoImg,
    'molecular foundry (lbnl)': foundryImg,
    'general catalyst venture fellows': gcVentureImg,
    'go human': goHumanImg,
    'greenhorn microgrants': greenhornImg,
    'manifest grants': manifestImg,
    'polar fellowship': polarFellowshipImg,
    'roddenberry catalyst': rodCatalystImg,
    'scifounder fellowship': sciFounderImg,
    'slavin foundation': slavinImg,
    'survival and flourishing fund': sffImg,
    'stochastic labs summer residency': stochasticImg,
    'techyon microgrants': techyonImg,
    'chopped vc': choppedVCLogo,
  };

  const filteredAndSortedGrants = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const normalize = (s: string) => s.toLowerCase();

    let filtered = grantsData.filter((grant) => {
      const matchesCategory = categoryFilter === 'all' || grant.category === categoryFilter;
      if (!q) return matchesCategory;
      const inName = normalize(grant.name).includes(q);
      const inProvider = normalize(grant.provider).includes(q);
      const inCategory = normalize(grant.category).includes(q);
      const inLocation = normalize(grant.location).includes(q);
      const inAmount = normalize(grant.amount).includes(q);
      const inTags = normalize((grant.tags || []).join(' ')).includes(q);
      const inDesc = normalize(grant.description || '').includes(q);
      const matchesSearch = inName || inProvider || inCategory || inLocation || inAmount || inTags || inDesc;
      return matchesSearch && matchesCategory;
    });

    const seen = new Set<string>();
    filtered = filtered.filter((g) => {
      const k = g.name.trim().toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'amount') {
        const toNumber = (val: string) => {
          const nums = val.replace(/[^0-9\-.,]/g, '').split(/\s*[-–]\s*/);
          const parse = (s: string) => Number(s.replace(/[,]/g, '')) || 0;
          if (!nums[0]) return 0;
          if (nums.length > 1) return Math.max(parse(nums[0]), parse(nums[1]));
          return parse(nums[0]);
        };
        return toNumber(b.amount) - toNumber(a.amount);
      }
      if (sortBy === 'deadline') {
        const toTime = (val: string) => {
          const d = Date.parse(val);
          if (!Number.isFinite(d)) return Number.POSITIVE_INFINITY;
          return d;
        };
        return toTime(a.deadline) - toTime(b.deadline);
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, categoryFilter, sortBy]);

  const categories = ['all', ...Array.from(new Set(grantsData.map(g => g.category)))];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 pb-8 mt-16 md:mt-20">
          <div className="text-left space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Complete Microgrant List
            </h2>
            <p className="font-sans text-sm md:text-base text-gray-600 leading-6 whitespace-nowrap max-w-none">
              Browse all grants & funding opportunities, including both highlighted & standard programs
            </p>
          </div>
        </div>
      </div>

      <main className="relative max-w-7xl mx-auto px-6 pb-4 mt-0">
        <div className="mb-8">
          <div className="glass rounded-full border border-black/10 px-3 py-2 flex items-center gap-2 flex-wrap md:flex-nowrap">
            <Search className="text-gray-500 w-5 h-5 ml-1" />
            <Input
              type="text"
              placeholder="Search grants, categories, or locations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[160px] bg-transparent border-0 focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none px-2 h-10 text-sm md:text-base"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="rounded-full h-9 px-3 bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-black/10 text-sm pointer-events-auto focus-visible:ring-0 focus-visible:border-black/10 min-w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/50 z-[60]">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="cursor-pointer">
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-full h-9 px-3 bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-black/10 text-sm pointer-events-auto focus-visible:ring-0 focus-visible:border-black/10 min-w-[140px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/50 z-[60]">
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

          

        {filteredAndSortedGrants.length > 0 ? (
          <>
            <div className="hidden md:block bg-white/90 backdrop-blur-xl rounded-3xl border border-black/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-[hsl(0_0%_97%)] [&_tr]:border-black/10 [&_th]:text-black">
                  <TableRow>
                    <TableHead className="w-[40%]">Program</TableHead>
                    <TableHead className="w-[20%]">Amount</TableHead>
                    <TableHead className="w-[25%]">Focus</TableHead>
                    <TableHead className="w-[15%]">Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedGrants.map((grant) => (
                    <TableRow key={grant.id} onClick={() => router.push(`/grants/${grant.id}`)} className="cursor-pointer">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {(() => {
                          const key = grant.name.trim().toLowerCase();
                          const matched = grantImages[key];
                          const isContain = ['inflection grants'].some((s) => key.includes(s));
                          const className = isContain ? 'object-contain object-center' : 'object-cover object-center';
                          const wrapperClass = isContain ? 'w-9 h-9 rounded-md overflow-hidden bg-white p-0.5' : 'w-9 h-9 rounded-md overflow-hidden bg-transparent';
                          if (matched) {
                            return (
                              <div className={wrapperClass}>
                                <Image src={matched} alt={grant.name} width={36} height={36} className={className} />
                              </div>
                            );
                          }
                          if (
                            grant.provider.toLowerCase().includes('1517') ||
                            grant.name.toLowerCase().includes('1517')
                          ) {
                              return (
                                <div className="w-9 h-9 rounded-md overflow-hidden bg-transparent">
                                  <Image src={logo1517} alt="1517 Fund" width={36} height={36} className="object-cover object-center" />
                                </div>
                              );
                            }
                          if (
                            grant.provider.toLowerCase().includes('776') ||
                            grant.name.toLowerCase().includes('776')
                          ) {
                              return (
                                <div className="w-9 h-9 rounded-md overflow-hidden bg-transparent">
                                  <Image src={logo776} alt="776 Foundation" width={36} height={36} className="object-cover object-center" />
                                </div>
                              );
                            }
                          if (
                            grant.name.toLowerCase().includes('emergent') ||
                            grant.provider.toLowerCase().includes('mercatus')
                          ) {
                            return (
                              <div className="w-9 h-9 rounded-md overflow-hidden bg-transparent">
                                <Image src={emergentLogo} alt="Emergent Ventures" width={36} height={36} className="object-cover object-center" />
                              </div>
                            );
                          }
                          if (
                            grant.provider.toLowerCase().includes('evm') ||
                            grant.name.toLowerCase().includes('evm')
                          ) {
                            return (
                              <div className="w-9 h-9 rounded-md overflow-hidden bg-transparent">
                                <Image src={evmLogo} alt="EVM Capital" width={36} height={36} className="object-cover object-center" />
                              </div>
                            );
                          }
                          if (grant.image) {
                            return (
                              <div className="w-9 h-9 rounded-md overflow-hidden bg-transparent">
                                <Image src={grant.image} alt={grant.name} width={36} height={36} className="object-cover object-center" />
                              </div>
                            );
                          }
                          return (
                            <div className="w-9 h-9 rounded-md bg-black flex items-center justify-center text-white font-bold">
                              {grant.name.slice(0, 1)}
                            </div>
                          );
                        })()}
                          <div>
                            <div className="font-semibold text-gray-900">{grant.name}</div>
                            <div className="text-xs text-gray-600">{grant.provider}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900 font-semibold">{grant.amount}</div>
                        <div className="text-xs text-gray-500 mt-1">Apply Now →</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(grant.tags || []).slice(0, 3).map((tag) => (
                            <Badge key={tag} className="bg-black/5 text-black border border-black/10">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-800">{grant.location}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="md:hidden space-y-3">
              {filteredAndSortedGrants.map((grant) => (
                <button key={grant.id} onClick={() => router.push(`/grants/${grant.id}`)} className="w-full text-left bg-white/90 backdrop-blur-xl rounded-2xl border border-black/10 p-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const key = grant.name.trim().toLowerCase();
                      const matched = grantImages[key];
                      const isContain = ['inflection grants'].some((s) => key.includes(s));
                      const className = isContain ? 'object-contain object-center' : 'object-cover object-center';
                      const wrapperClass = isContain ? 'w-9 h-9 rounded-md overflow-hidden bg-white p-0.5' : 'w-9 h-9 rounded-md overflow-hidden bg-transparent';
                      if (matched) {
                        return (
                          <div className={wrapperClass}>
                            <Image src={matched} alt={grant.name} width={36} height={36} className={className} />
                          </div>
                        );
                      }
                      return (
                        <div className="w-9 h-9 rounded-md bg-black flex items-center justify-center text-white font-bold">
                          {grant.name.slice(0, 1)}
                        </div>
                      );
                    })()}
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{grant.name}</div>
                      <div className="text-xs text-gray-600">{grant.provider}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-900 font-semibold">{grant.amount}</div>
                  <div className="mt-1 text-sm text-gray-700">{grant.location}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(grant.tags || []).slice(0, 3).map((tag) => (
                      <Badge key={tag} className="bg-black/5 text-black border border-black/10">{tag}</Badge>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 p-20 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-black/5 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-black/70" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">No grants found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search or filters to discover more funding opportunities
              </p>
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