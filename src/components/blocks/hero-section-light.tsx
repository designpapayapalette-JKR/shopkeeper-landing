"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, Search, IndianRupee } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";

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

// Business segments the product is built for — not customer logos, so we
// never fabricate a "trusted by" claim we can't back up.
const SEGMENTS = [
  "Kirana & General Stores",
  "Wholesale & Distribution",
  "Pharmacies",
  "Apparel & Fashion",
  "Electronics Retail",
  "Multi-branch Chains",
];

const NAV_ITEMS = [
  { name: "Features", href: "#features" },
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
              width={8000}
              height={4500}
              priority
              className="h-9 w-auto object-contain shrink-0"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-xs font-bold text-zinc-500 uppercase tracking-wider">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-zinc-900 transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="https://app.managemycounter.com/dashboard" className="hover:text-zinc-900 transition-colors">
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

// A faithful recreation of the actual POS billing screen's search-and-cart
// layout (real field labels, real GST split math) as the hero visual —
// not a generic stock photo, and not passed off as a literal screenshot.
function ProductPreview() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10 overflow-hidden text-left">
      {/* Browser-style chrome to read clearly as "the app", not a random card */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-50 border-b border-zinc-200">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <span className="ml-3 text-[11px] font-mono text-zinc-400">app.managemycounter.com/dashboard/pos</span>
      </div>

      <div className="p-5 grid sm:grid-cols-5 gap-4">
        {/* Search + product cards */}
        <div className="sm:col-span-3 space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-400">
            <Search size={15} />
            Search by name or SKU...
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { name: "Apollo Atta 10kg", price: "₹620.00", tag: "GST 5%" },
              { name: "Fortune Oil 5L", price: "₹850.00", tag: "GST 5%" },
              { name: "Tata Salt 1kg", price: "₹28.00", tag: "GST 5%" },
              { name: "Amul Ghee 1L", price: "₹590.00", tag: "GST 12%" },
            ].map((p) => (
              <div key={p.name} className="rounded-lg border border-zinc-200 p-2.5">
                <p className="text-[12px] font-bold text-zinc-800 leading-snug">{p.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[13px] font-black text-primary">{p.price}</span>
                  <span className="text-[9px] font-bold text-zinc-400">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart summary */}
        <div className="sm:col-span-2 rounded-xl bg-zinc-50 border border-zinc-200 p-4 flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Current Bill</p>
          <div className="space-y-2 text-[12px] flex-1">
            <div className="flex justify-between text-zinc-700">
              <span>Apollo Atta 10kg × 2</span>
              <span className="font-semibold">₹1,240.00</span>
            </div>
            <div className="flex justify-between text-zinc-700">
              <span>Fortune Oil 5L × 1</span>
              <span className="font-semibold">₹850.00</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-[11px] pt-1 border-t border-zinc-200">
              <span>CGST + SGST (5%)</span>
              <span>₹104.50</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 mt-3 border-t-2 border-zinc-800">
            <span className="text-xs font-black text-zinc-800">Grand Total</span>
            <span className="text-base font-black text-zinc-900 flex items-center">
              <IndianRupee size={14} className="inline" strokeWidth={3} />2,194.50
            </span>
          </div>
          <button className="mt-3 w-full rounded-lg bg-primary text-white text-xs font-bold py-2.5">
            Charge ₹2,194.50
          </button>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const gradientInView = useInView(gradientRef, { once: true });

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-white">
        <section>
          <div className="relative px-4 pt-8 md:px-6 md:pt-12">
            {/* Warm gradient backdrop behind the announcement pill, headline
                and subhead — fades to white before the product preview so
                the rest of the page stays on the site's plain-white system. */}
            <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl">
              <motion.div
                ref={gradientRef}
                initial={{ opacity: 0, y: -30 }}
                animate={gradientInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.6, ease: "easeOut" }}
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  backgroundImage: `
                    linear-gradient(180deg, #ffffff 0%, #FFF3E0 25%, #FFE0D6 50%, #FDE2E9 72%, #ECE0F7 88%, #ffffff 100%),
                    radial-gradient(at 15% 20%, #ffffff66 0%, transparent 55%),
                    radial-gradient(at 85% 75%, #ede4fb66 0%, transparent 60%)
                  `,
                  backgroundBlendMode: "overlay, screen",
                }}
              />
              {/* Subtle dot-grid texture over the gradient — self-contained CSS,
                  no external image, faded out toward the edges via a mask so it
                  reads as texture rather than a hard-edged tile. */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-[0.4]"
                style={{
                  backgroundImage: "radial-gradient(circle, #05004022 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
                }}
              />

              <div className="mx-auto max-w-7xl px-6 pt-10 pb-16 md:pt-16 md:pb-20">
                <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                  <AnimatedGroup variants={transitionVariants}>
                    <Link
                      href="#features"
                      className="hover:bg-white bg-white/70 group mx-auto flex w-fit items-center gap-4 rounded-full border border-zinc-200 p-1 pl-4 shadow-md shadow-black/5 backdrop-blur-sm transition-all duration-300"
                    >
                      <span className="text-zinc-800 text-sm">Full ERP, free during beta — no trial, no card</span>
                      <span className="block h-4 w-0.5 border-l border-zinc-300" />
                      <div className="bg-white group-hover:bg-zinc-100 size-6 overflow-hidden rounded-full duration-500">
                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                          <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                          <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                        </div>
                      </div>
                    </Link>

                    <h1 className="mt-8 max-w-4xl mx-auto text-balance text-5xl md:text-6xl lg:mt-12 lg:text-7xl text-zinc-900">
                      Bill fast. Track udhaar.
                      <br />
                      Stay <span className="font-serif italic font-normal text-primary">GST-ready</span>.
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-zinc-600">
                      One counter app for Indian shopkeepers — POS billing, a live credit ledger instead of the bahi-khata, stock across every warehouse, and GST reports that build themselves as you bill. Made by a shopkeeper, for the shopkeeper community.
                    </p>
                  </AnimatedGroup>

                  <AnimatedGroup
                    variants={{
                      container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                      ...transitionVariants,
                    }}
                    className="mt-10 flex flex-col items-center justify-center gap-2 md:flex-row"
                  >
                    <div className="bg-white/70 rounded-[14px] border border-zinc-200 p-0.5 backdrop-blur-sm">
                      <Button asChild size="lg" className="rounded-xl px-5 text-base">
                        <Link href="https://app.managemycounter.com/register">
                          <span className="text-nowrap">Get Invite Access</span>
                        </Link>
                      </Button>
                    </div>
                    <Button asChild size="lg" variant="ghost" className="h-10.5 rounded-xl px-5">
                      <Link href="#features">
                        <span className="text-nowrap">See What&apos;s Inside ↓</span>
                      </Link>
                    </Button>
                  </AnimatedGroup>
                </div>
              </div>
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
        <section className="bg-white pb-16 pt-16 md:pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">
              Built for every kind of Indian retail business
            </p>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
              {SEGMENTS.map((s) => (
                <div key={s} className="text-center text-sm font-semibold text-zinc-500">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
