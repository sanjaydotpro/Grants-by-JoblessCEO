"use client";

import React from "react";

// Interactive, mouse-reactive background shared across the whole page
// - Renders a subtle grid + vignette + radial spotlight that follows the cursor
// - Uses CSS variables for GPU-friendly updates
// - Absolutely positioned and pointer-events-none so it never blocks UI

export const InteractiveBackground: React.FC<{ className?: string }> = ({ className }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [holding, setHolding] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      el.style.setProperty("--spot-x", `${x}px`);
      el.style.setProperty("--spot-y", `${y}px`);
    };

    const handleDown = () => {
      setHolding(true);
      el.style.setProperty("--spot-size", "220px");
    };
    const handleUp = () => {
      setHolding(false);
      el.style.setProperty("--spot-size", "140px");
    };

    el.style.setProperty("--spot-size", "140px");
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-hold={holding ? "true" : "false"}
      className={[
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className ?? "",
      ].join(" ")}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(60% 60% at 50% 40%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 40%, black 60%, transparent 100%)",
        }}
      />

      {/* Cursor spotlight (purple/blue) */}
      <div
        className="absolute -inset-1 blur-2xl transition-[background] duration-200 will-change-transform"
        style={{
          background:
            "radial-gradient(var(--spot-size,140px) var(--spot-size,140px) at var(--spot-x, 50%) var(--spot-y, 40%), rgba(139,92,246,0.28), rgba(59,130,246,0.22) 40%, transparent 60%)",
        }}
      />

      {/* Pulse ring when holding mouse */}
      <div
        className="absolute -inset-1 will-change-transform"
        style={{
          background:
            "radial-gradient(220px 220px at var(--spot-x, 50%) var(--spot-y, 40%), rgba(139,92,246,0.18), transparent 60%)",
          opacity: holding ? 1 : 0,
          transition: "opacity 200ms ease-out",
          filter: "blur(12px)",
        }}
      />

      {/* Soft vignette with cool hues */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(139,92,246,0.10),transparent_60%)]" />

      {/* SF Bridge silhouette (subtle) */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-20 mix-blend-screen"
        width="900"
        height="140"
        viewBox="0 0 900 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="url(#g)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 120 H880" />
          <path d="M120 118 L120 20 M780 118 L780 20" />
          <path d="M120 20 C200 60, 300 60, 380 20" />
          <path d="M380 20 C460 60, 560 60, 640 20" />
          <path d="M640 20 C720 60, 820 60, 900 20" />
          <path d="M120 80 L380 80 M640 80 L900 80" opacity="0.6" />
          <path d="M250 118 L250 50 M510 118 L510 50 M770 118 L770 50" opacity="0.6" />
        </g>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(139,92,246,0.6)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.6)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default InteractiveBackground;