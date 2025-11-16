"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { grantsData } from '@/lib/grants-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ExternalLink, Trash2 } from 'lucide-react';
import Image from 'next/image';
import awesomeImg from '../../../images/Awesome Foundation .png';
import activateImg from '../../../images/activate.png';
import antikytheraImg from '../../../images/Antikythera Studio.png';
import brainsImg from '../../../images/Brains.png';
import civicInnovatorsImg from '../../../images/The Civic Innovators Fellowship .webp';
import cosmosImg from '../../../images/Cosmos.avif';
import dojoImg from '../../../images/DojoGrants.jpg';
import eaAnimalImg from '../../../images/EA Animal Welfare Fund.avif';
import eaInfraImg from '../../../images/EA Infrastructure Funds.avif';
import edgeCityImg from '../../../images/Edge City Fellowship.svg';
import emergentEvImg from '../../../images/Emergent Ventures .jpg';
import emergentEvIndiaImg from '../../../images/Emergent Ventures India.jpg';
import foresightImg from '../../../images/Foresight Fellowship.png';
import gitcoinImg from '../../../images/Gitcoin Grants.svg';
import henryArnholdImg from '../../../images/Henry Arnhold Fellowship.svg';
import inflectionImg from '../../../images/Inflection Grants.jpeg';
import longevityImg from '../../../images/Longevity Fellowship.jpeg';
import magnificentImg from '../../../images/Magnificent Grants.png';
import newScienceImg from '../../../images/New Science.jpg';
import ngioImg from '../../../images/Next Generation Internet 0.png';
import nonTrivialImg from '../../../images/Non Trivial.png';
import oshaughnessyImg from '../../../images/O’Shaughnessy Fellowship.jpeg';
import promisePrizeImg from '../../../images/Promise Prize.png';
import protostarsImg from '../../../images/Protostars.jpg';
import rainerArnholdImg from '../../../images/Rainer Arnhold Fellowship.svg';
import riseProgramImg from '../../../images/Rise Program.png';
import schmidtFuturesImg from '../../../images/Schmidt Futures.jpeg';
import wtfFundImg from '../../../images/wtf fund.png';
import liftoffImg from '../../../images/lift off grant.jpeg';
import localhostImg from '../../../images/localhost.jpeg';
import mergeClubImg from '../../../images/mergeclub.jpg';
import vibefundImg from '../../../images/vibe fund.png';
import zFellowsImg from '../../../images/zfellows_logo.jpeg';
import flightSchoolImg from '../../../images/the flight school.avif';
import siliconValleyFellowshipImg from '../../../images/siliconvalley fellowship.avif';
import teloraImg from '../../../images/Telora.webp';
import formidableFundImg from '../../../images/The Formidable Fund .webp';
import thielImg from '../../../images/thiel.png';
import asteraImg from '../../../images/Astera Residency Program.jpg';
import bagelFundImg from '../../../images/Bagel Fund.png';
import breakthroughEnergyImg from '../../../images/Breakthrough Energy Fellows.jpeg';
import cactusCapitalImg from '../../../images/Cactus Capital.jpeg';
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
import Link from 'next/link';

export default function MyGrantsPage() {
  const { savedGrants, removeSavedGrant } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const mySavedGrants = grantsData.filter(grant => savedGrants.includes(grant.id));

  const grantImages: Record<string, any> = {
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
    'henry arnhold fellowship': henryArnholdImg,
    'inflection grants': inflectionImg,
    'longevity fellowship': longevityImg,
    'magnificent grants': magnificentImg,
    'new science': newScienceImg,
    'next generation internet 0': ngioImg,
    'non trivial': nonTrivialImg,
    'o’shaughnessy fellowship': oshaughnessyImg,
    "o'shaughnessy fellowship": oshaughnessyImg,
    'promise prize': promisePrizeImg,
    'protostars': protostarsImg,
    'rainer arnhold fellowship': rainerArnholdImg,
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
  };

  const containLogoNames = [
    'emergent ventures',
    '1517',
    '776',
    'gitcoin grants',
    'edge city fellowship',
    'foresight fellowship',
    'ea infrastructure funds',
    'ea animal welfare fund',
  ];

  return (
    <div className="min-h-screen bg-background">
      
      <header className="glass-panel border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-6 mt-20 md:mt-24">
          <Button
            variant="glass"
            onClick={() => router.push('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">All Saved Grants</h1>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        {mySavedGrants.length === 0 ? (
          <div className="glass-panel rounded-2xl p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No saved grants yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring grants and save the ones you're interested in!
            </p>
            <Button
              onClick={() => router.push('/dashboard')}
              variant="glass"
              className="font-semibold px-8 py-6 rounded-xl"
            >
              Browse Grants
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {mySavedGrants.map(grant => (
              <div
                key={grant.id}
                className="glass-card rounded-lg overflow-hidden flex flex-col md:flex-row border border-black/10 transition-all duration-300"
              >
                <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0">
                  {(() => {
                    const key = grant.name.trim().toLowerCase();
                    const matched = grantImages[key];
                    const isContain = ['inflection grants'].some((s) => key.includes(s));
                    const className = isContain ? 'object-contain object-center' : 'object-cover object-center';
                    if (matched) {
                      return (
                        <Image
                          src={matched}
                          alt={grant.name}
                          fill
                          className={className}
                        />
                      );
                    }
                    return (
                      <Image
                        src={grant.image}
                        alt={grant.name}
                        fill
                        className={className}
                      />
                    );
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                </div>

                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{grant.name}</h2>
                        <p className="text-gray-600">{grant.provider}</p>
                      </div>
                      <Badge className="bg-black text-white hover:bg-black/90">
                        {grant.category}
                      </Badge>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{grant.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Amount</p>
                        <p className="text-sm font-bold text-black">{grant.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Deadline</p>
                        <p className="text-sm font-bold text-gray-900">{grant.deadline}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="text-sm font-bold text-gray-900">{grant.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/grants/${grant.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-gray-200 hover:border-black hover:text-black rounded-xl"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => window.open(grant.applicationLink, '_blank')}
                      variant="glass"
                      className="flex-1 rounded-xl"
                    >
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => removeSavedGrant(grant.id)}
                      className="hover:bg-black/5 hover:text-black rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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