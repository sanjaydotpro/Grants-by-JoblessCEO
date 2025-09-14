"use client";

import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    y: 120,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 0.8,
    },
  },
};

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ front, back, className = "" }) => {
  return (
    <motion.div
      className={`relative w-full h-[420px] preserve-3d ${className}`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full cursor-pointer group"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-xl bg-surface-1 border border-border overflow-hidden p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 overflow-hidden p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Add a simple reveal wrapper for section entrances
interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({ children, className = "" }) => (
  <motion.div
    className={className}
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.4 }}
  >
    {children}
  </motion.div>
);

export default FlipCard;