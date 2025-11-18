"use client";

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { grantsData } from '@/lib/grants-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import Image from 'next/image';
import logo1517 from '../../../../images/1517.png';
import logo776 from '../../../../images/776.jpg';
import antikytheraImg from '../../../../images/Antikythera Studio.png';
import awesomeImg from '../../../../images/Awesome Foundation .png';
import brainsImg from '../../../../images/Brains.png';
import cosmosImg from '../../../../images/Cosmos.avif';
import dojoImg from '../../../../images/DojoGrants.jpg';
import eaAnimalImg from '../../../../images/EA Animal Welfare Fund.avif';
import eaInfraImg from '../../../../images/EA Infrastructure Funds.avif';
import edgeCityImg from '../../../../images/Edge City Fellowship.svg';
import emergentEvImg from '../../../../images/Emergent Ventures .jpg';
import emergentEvIndiaImg from '../../../../images/Emergent Ventures India.jpg';
import foresightImg from '../../../../images/Foresight Fellowship.png';
import gitcoinImg from '../../../../images/Gitcoin Grants.svg';
import longevityImg from '../../../../images/Longevity Fellowship.jpeg';
import civicInnovatorsImg from '../../../../images/The Civic Innovators Fellowship .webp';
import activateImg from '../../../../images/activate.png';
import henryArnholdImg from '../../../../images/Henry Arnhold Fellowship.svg';
import rainerArnholdImg from '../../../../images/Rainer Arnhold Fellowship.svg';
import inflectionImg from '../../../../images/Inflection Grants.jpeg';
import magnificentImg from '../../../../images/Magnificent Grants.png';
import newScienceImg from '../../../../images/New Science.jpg';
import ngioImg from '../../../../images/Next Generation Internet 0.png';
import nonTrivialImg from '../../../../images/Non Trivial.png';
import oshaughnessyImg from '../../../../images/O’Shaughnessy Fellowship.jpeg';
import promisePrizeImg from '../../../../images/Promise Prize.png';
import protostarsImg from '../../../../images/Protostars.jpg';
import riseProgramImg from '../../../../images/Rise Program.png';
import schmidtFuturesImg from '../../../../images/Schmidt Futures.jpeg';
import wtfFundImg from '../../../../images/wtf fund.png';
import zFellowsImg from '../../../../images/zfellows_logo.jpeg';
import liftoffImg from '../../../../images/lift off grant.jpeg';
import localhostImg from '../../../../images/localhost.jpeg';
import mergeClubImg from '../../../../images/mergeclub.jpg';
import vibefundImg from '../../../../images/vibe fund.png';
import flightSchoolImg from '../../../../images/the flight school.avif';
import siliconValleyFellowshipImg from '../../../../images/siliconvalley fellowship.avif';
import teloraImg from '../../../../images/Telora.webp';
import formidableFundImg from '../../../../images/The Formidable Fund .webp';
import thielImg from '../../../../images/thiel.png';
import asteraImg from '../../../../images/Astera Residency Program.jpg';
import bagelFundImg from '../../../../images/Bagel Fund.png';
import breakthroughEnergyImg from '../../../../images/Breakthrough Energy Fellows.jpeg';
import cactusCapitalImg from '../../../../images/Cactus Capital.avif';
import cryoDaoImg from '../../../../images/CryoDAO.svg';
import foundryImg from '../../../../images/Foundry.webp';
import gcVentureImg from '../../../../images/General Catalyst Venture Fellows.jpg';
import goHumanImg from '../../../../images/Go Human.jpeg';
import greenhornImg from '../../../../images/Greenhorn Microgrants.png';
import manifestImg from '../../../../images/Manifest Grants.jpg';
import polarFellowshipImg from '../../../../images/Polar Fellowship.png';
import rodCatalystImg from '../../../../images/Roddenberry Catalyst.webp';
import sciFounderImg from '../../../../images/SciFounder Fellowship.jpg';
import slavinImg from '../../../../images/Slavin Foundation.png';
import sffImg from '../../../../images/Survival and Flourishing Fund.jpeg';
import stochasticImg from '../../../../images/Stochastic Labs Summer Residency.webp';
import techyonImg from '../../../../images/Techyon Microgrants.png';
import mercatusImg from '../../../../images/MercatusCenter.jpg';
import evmLogo from '../../../../images/evm capital.avif';
import choppedVCLogo from '../../../../images/Chopped VC.png';

export default function GrantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { savedGrants, saveGrant, removeSavedGrant } = useAuth();
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const grant = grantsData.find(g => g.id === params.id);
  const isSaved = savedGrants.includes(params.id as string);

  if (!grant) {
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (isSaved) {
      removeSavedGrant(grant.id);
    } else {
      saveGrant(grant.id);
    }
    setSaving(false);
  };

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
    'emergent ventures': mercatusImg,
    'emergent ventures india': mercatusImg,
    'evm capital': evmLogo,
    'chopped vc': choppedVCLogo,
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
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-28">
        <div className="flex items-center gap-3 mb-6">
          {(() => {
            const key = grant.name.trim().toLowerCase();
            const matched = grantImages[key] || grant.image;
            const isContain = ['inflection grants'].some((s) => key.includes(s));
            const className = isContain ? 'object-contain object-center' : 'object-cover object-center';
            const wrapperClass = isContain ? 'w-12 h-12 rounded-md overflow-hidden bg-white p-1 border border-black/10' : 'w-12 h-12 rounded-md overflow-hidden bg-transparent border border-black/10';
            if (matched) {
              return (
                <div className={wrapperClass}>
                  <Image src={matched} alt={grant.name} width={48} height={48} className={className} />
                </div>
              );
            }
            return (
              <div className="w-12 h-12 rounded-md bg-black flex items-center justify-center text-white font-bold">
                {grant.name.slice(0, 2)}
              </div>
            );
          })()}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{grant.name}</h1>
            <p className="text-sm text-gray-600">{grant.category}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-black/10 p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Funding Amount</span>
                  <span className="font-semibold text-black">{grant.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Deadline</span>
                  <span className="font-semibold text-gray-900">{grant.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="font-semibold text-gray-900">{grant.location}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Focus Areas</span>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {[grant.category, ...(grant.tags || []).slice(0, 2)].map((t, i) => (
                      <Badge key={`${t}-${i}`} className="bg-black/5 text-black border border-black/10">{t}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Eligibility Requirements</span>
                  <ul className="mt-2 space-y-1 list-disc pl-5 text-gray-700">
                    {grant.eligibility.slice(0, 4).map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => window.open(grant.applicationLink, '_blank')}
                  className="w-full rounded-xl h-11 px-5 bg-white text-black border border-black/10 hover:bg-white/90"
                >
                  Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-black/10 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Microgrants in your inbox</h3>
              <p className="text-gray-600 mt-2">Subscribe to receive new funding opportunities and tips.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
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
                <Button type="submit" className="rounded-xl h-11 px-5 bg-white text-black border border-black/10 hover:bg-white/90">Subscribe</Button>
              </form>
              {subscribed && <p className="text-green-700 mt-3 text-sm">Subscribed! We'll keep you posted.</p>}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-black/10 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Program Overview</h2>
              <p className="text-gray-700 mt-2 leading-relaxed">{grant.description}</p>
              <h3 className="mt-6 text-base font-semibold text-gray-900">Eligibility</h3>
              <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-700">
                {grant.eligibility.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-black/10 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Application Guide</h2>
              <ol className="mt-2 space-y-3 list-decimal pl-5 text-gray-700">
                <li>Which best describes you? (student, maker, founder)</li>
                <li>What are you working on? Describe the project and current state.</li>
                <li>Share links to work, prototypes, or documentation.</li>
              </ol>
            </div>
          </div>
        </div>

        <section id="newsletter" className="grid md:grid-cols-2 gap-4 mt-8 pb-4">
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
      </div>
    </div>
  );
}