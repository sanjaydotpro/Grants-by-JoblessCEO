"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  className?: string;
}

const eyebrow = "Grants, Residencies & Labs • All-in-One Platform";

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 ${className || ""}`}>
      <div className="mx-auto max-w-4xl text-center">

        {/* Eyebrow with enhanced glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-medium text-white shadow-2xl backdrop-blur-xl backdrop-saturate-200 ring-1 ring-white/20 ring-inset before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-50 relative overflow-hidden"
        >
          {eyebrow}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          A Club for Ideas
          <br />
          <span className="bg-gradient-to-r from-[#fc1e67] to-[#e91e63] bg-clip-text text-transparent">
            and Founders
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 sm:text-xl"
        >
          Discover grants for builders in Bangalore and find the perfect credit cards for your financial needs - all in one comprehensive platform.
        </motion.p>

        {/* CTA Buttons with enhanced glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/discover"
            className="group relative inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white shadow-2xl backdrop-blur-xl backdrop-saturate-200 ring-1 ring-white/20 ring-inset transition-all duration-300 hover:bg-white/15 hover:shadow-3xl hover:ring-white/30 hover:scale-105 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-50 overflow-hidden"
          >
            <span className="relative z-10">Apply for Grants</span>
          </Link>
          
          <a
            href="https://discord.gg/your-discord-invite"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white shadow-2xl backdrop-blur-xl backdrop-saturate-200 ring-1 ring-white/20 ring-inset transition-all duration-300 hover:bg-white/15 hover:shadow-3xl hover:ring-white/30 hover:scale-105 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-50 overflow-hidden"
          >
            <svg 
              className="relative z-10 w-5 h-5 fill-current text-[#fc1e67] group-hover:text-[#e91e63] transition-colors duration-300" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="relative z-10">Join Discord</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}