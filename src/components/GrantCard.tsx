"use client";

import React from 'react';
import { Grant } from '@/lib/grants-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MapPin, Calendar, DollarSign, ExternalLink, ArrowRight } from 'lucide-react';

interface GrantCardProps {
  grant: Grant;
}

export default function GrantCard({ grant }: GrantCardProps) {
  return (
    <div className="group relative bg-white/70 backdrop-blur-2xl rounded-lg border border-black/10 transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:-translate-y-1">
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/10" />
      
      
      <div className="p-6 space-y-4">
        
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
                {grant.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 font-medium">{grant.provider}</p>
            </div>
            <Badge className="bg-black/5 text-black border border-black/10 font-semibold whitespace-nowrap">
              {grant.category}
            </Badge>
          </div>
        </div>

        
        <div className="space-y-2.5 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-black/10">
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-4 h-4 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium">Amount</p>
              <p className="font-bold text-gray-900 truncate">{grant.amount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium">Deadline</p>
              <p className="font-semibold text-gray-900 truncate">{grant.deadline}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium">Location</p>
              <p className="font-semibold text-gray-900 truncate">{grant.location}</p>
            </div>
          </div>
        </div>

        
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {grant.description}
        </p>

        
        <Link href={`/grants/${grant.id}`} className="block">
          <Button variant="glass" className="w-full font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group/btn">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      
      <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/5 transition-all duration-500 pointer-events-none" />
    </div>
  );
}