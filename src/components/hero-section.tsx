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
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <Link
            href="#apply"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/25"
          >
            {eyebrow}
          </Link>
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            href="#apply"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/15 hover:border-white/30"
          >
            Apply for Grants
          </Link>
        </motion.div>
      </div>
    </section>
  );
}