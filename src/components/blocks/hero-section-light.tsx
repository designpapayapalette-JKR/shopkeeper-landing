"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroSectionGrid } from "@/components/ui/hero-section-grid";
import { FeaturesSectionWithCardGradient } from "@/components/ui/feature-section-with-card-gradient";

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring" as const, bounce: 0.3, duration: 1.5 },
    },
  },
};

const NAV_ITEMS = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "#about" },
  { name: "FAQs", href: "#faq" },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  // Close the mobile overlay on Escape or a click outside it, and lock
  // background scroll while it's open — the plain toggle this replaced had
  // none of these, so it stayed open under a scrolled-away page and never
  // caught a stray outside tap.
  React.useEffect(() => {
    if (!menuOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current?.contains(e.target as Node)) return;
      setMenuOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClickOutside);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" aria-label="home" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="managemycounter"
              width={5079}
              height={684}
              priority
              className="h-8 lg:h-9 w-auto object-contain shrink-0"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-xs font-bold text-zinc-500 uppercase tracking-wider">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="https://app.managemycounter.com/dashboard" className="hover:text-foreground transition-colors">
                Portal
              </Link>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button asChild variant="outline" size="sm">
              <Link href="https://app.managemycounter.com/dashboard">Log In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="https://app.managemycounter.com/register">Get Invite Access</Link>
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden p-2 -mr-2 text-zinc-700"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        ref={menuRef}
        aria-hidden={!menuOpen}
        className={`lg:hidden fixed inset-x-0 top-16 h-[calc(100vh-4rem)] bg-white overflow-y-auto transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 space-y-8">
          <ul className="space-y-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.href} onClick={() => setMenuOpen(false)} className="text-lg font-bold text-zinc-800">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="https://app.managemycounter.com/dashboard" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-zinc-800">
                Portal
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-3 pt-2 border-t border-zinc-200">
            <Button asChild variant="outline" size="sm">
              <Link href="https://app.managemycounter.com/dashboard">Log In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="https://app.managemycounter.com/register">Get Invite Access</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// The real web dashboard, wrapped in browser-style chrome so it reads
// clearly as "the app" rather than a floating screenshot. Swap the file at
// public/mockups/web-dashboard.jpg to update — no layout changes needed as
// long as the replacement is roughly the same aspect ratio (3016×1756).
function ProductPreview() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10 overflow-hidden text-left">
      <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-50 border-b border-zinc-200">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <span className="ml-3 text-[11px] font-mono text-zinc-400">app.managemycounter.com/dashboard</span>
      </div>

      <div className="relative w-full" style={{ aspectRatio: "3016 / 1756" }}>
        <Image
          src="/mockups/web-dashboard.jpg"
          alt="managemycounter web dashboard — sales, cash flow, low stock alerts, and recent activity at a glance"
          fill
          priority
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-white">
        <section>
          <div className="relative px-4 pt-8 md:px-6 md:pt-12">
            <div className="relative isolate mx-auto max-w-7xl">
              <HeroSectionGrid />
            </div>

            <AnimatedGroup
              variants={{
                container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                ...transitionVariants,
              }}
            >
              <div className="relative mt-4 overflow-hidden px-2 sm:px-6">
                <div aria-hidden className="bg-gradient-to-b to-white absolute inset-0 z-10 from-transparent from-60%" />
                <div className="ring-1 ring-zinc-950/10 shadow-xl shadow-zinc-950/10 relative mx-auto max-w-4xl rounded-2xl border border-zinc-200 border-b-0 bg-white p-3">
                  <ProductPreview />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        {/* Segment strip — business categories the product is built for,
            not fabricated "trusted by" customer logos. */}
        <section className="bg-white">
          <FeaturesSectionWithCardGradient />
        </section>
      </main>
    </>
  );
}
