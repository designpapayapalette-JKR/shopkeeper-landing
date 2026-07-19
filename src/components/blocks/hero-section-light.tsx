"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, Search, IndianRupee } from "lucide-react";
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
  { name: "Download App", href: "#download" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQs", href: "#faq" },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" aria-label="home" className="flex items-center gap-2 text-lg font-black tracking-tight uppercase text-zinc-900 shrink-0">
            <Image src="/logo-icon.png" alt="managemycounter" width={26} height={26} className="shrink-0" />
            managemycounter
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
            className="lg:hidden p-2 -mr-2 text-zinc-700"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-zinc-200 py-5 space-y-5">
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={() => setMenuOpen(false)} className="text-base font-semibold text-zinc-700">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="https://app.managemycounter.com/dashboard" className="text-base font-semibold text-zinc-700">
                  Portal
                </Link>
              </li>
            </ul>
            <div className="flex flex-col gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="https://app.managemycounter.com/dashboard">Log In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="https://app.managemycounter.com/register">Get Invite Access</Link>
              </Button>
            </div>
          </div>
        )}
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
                  <span className="text-[13px] font-black text-blue-600">{p.price}</span>
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
          <button className="mt-3 w-full rounded-lg bg-blue-600 text-white text-xs font-bold py-2.5">
            Charge ₹2,194.50
          </button>
        </div>
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
          <div className="relative pt-16 md:pt-24">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,white_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#pricing"
                    className="hover:bg-white bg-zinc-100 group mx-auto flex w-fit items-center gap-4 rounded-full border border-zinc-200 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300"
                  >
                    <span className="text-zinc-800 text-sm">BETA · Free during beta — no credit card, ever</span>
                    <span className="block h-4 w-0.5 border-l border-zinc-300" />
                    <div className="bg-white group-hover:bg-zinc-100 size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                        <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                      </div>
                    </div>
                  </Link>

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-5xl md:text-6xl lg:mt-12 lg:text-7xl text-zinc-900">
                    GST billing in seconds.
                    <br />
                    Everything else, <span className="font-serif italic font-normal text-blue-600">automatic</span>.
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-zinc-600">
                    Retail, GST, or estimate invoices with custom tax slabs — printed straight to any Bluetooth, USB, or Wi-Fi thermal printer. Stock synced across warehouses, udhar ledgers that update themselves, and live GPS tracking for your field team.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                    ...transitionVariants,
                  }}
                  className="mt-10 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div className="bg-zinc-100 rounded-[14px] border border-zinc-200 p-0.5">
                    <Button asChild size="lg" className="rounded-xl px-5 text-base">
                      <Link href="https://app.managemycounter.com/register">
                        <span className="text-nowrap">Get Invite Access</span>
                      </Link>
                    </Button>
                  </div>
                  <Button asChild size="lg" variant="ghost" className="h-10.5 rounded-xl px-5">
                    <Link href="#features">
                      <span className="text-nowrap">Explore Features ↓</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                ...transitionVariants,
              }}
            >
              <div className="relative mt-10 overflow-hidden px-6 sm:mt-14 md:mt-16">
                <div aria-hidden className="bg-gradient-to-b to-white absolute inset-0 z-10 from-transparent from-70%" />
                <div className="relative mx-auto max-w-4xl">
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
