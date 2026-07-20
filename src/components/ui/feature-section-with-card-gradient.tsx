import React, { useId } from "react";

// Segment cards — real per-business-type capabilities (batch/expiry
// tracking, serial/IMEI capture, etc. are actual built features, not
// marketing filler), replacing the earlier plain text-only segment strip.
const grid = [
  {
    title: "Kirana & General Stores",
    description:
      "Fast counter billing with barcode scanning, weight-billing off the kaanta for loose items, and crate/bottle deposit tracking built in.",
  },
  {
    title: "Wholesale & Distribution",
    description:
      "B2B invoicing with a live credit ledger for bulk buyers, and stock tracked accurately across every warehouse you operate.",
  },
  {
    title: "Pharmacies",
    description:
      "Batch number and expiry date captured on every purchase, with FEFO stock deduction so older stock sells first automatically.",
  },
  {
    title: "Apparel & Fashion",
    description:
      "Custom product attributes for size, color, and variant, plus barcode label printing for every SKU you stock.",
  },
  {
    title: "Electronics Retail",
    description:
      "Serial and IMEI number capture per unit sold, so every high-value item stays traceable from stock-in to the final bill.",
  },
  {
    title: "Multi-branch Chains",
    description:
      "Multiple counters and outlets under one account, role-based staff access, and live field-agent location tracking for deliveries.",
  },
];

// Deterministic PRNG (mulberry32) seeded per-card, instead of the reference
// component's raw Math.random() — that produced a different pattern on the
// server render vs. the client hydration pass every single time, which is a
// real hydration-mismatch bug (React logs it and re-renders the mismatched
// subtree), not just a cosmetic quirk. Same seed always yields the same
// squares, so server and client agree.
function seededPattern(seed: number): number[][] {
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  return Array.from({ length: 5 }, () => [Math.floor(rand() * 4) + 7, Math.floor(rand() * 6) + 1]);
}

export function FeaturesSectionWithCardGradient() {
  return (
    <div className="py-16 md:py-20">
      <h2 className="text-center text-4xl md:text-5xl font-black tracking-tight text-foreground mb-12 px-6 max-w-4xl mx-auto">
        Built for every kind of Indian retail business
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 max-w-6xl mx-auto px-6">
        {grid.map((feature, i) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b from-zinc-50 to-white border border-zinc-100 p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} seed={i} />
            <p className="text-base font-bold text-foreground relative z-20">{feature.title}</p>
            <p className="text-zinc-600 mt-3 text-sm leading-relaxed font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Grid = ({ pattern, size, seed = 0 }: { pattern?: number[][]; size?: number; seed?: number }) => {
  const p = pattern ?? seededPattern(seed);
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-zinc-100/30 to-zinc-300/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, i: number) => (
            <rect strokeWidth="0" key={`${x}-${y}-${i}`} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}
