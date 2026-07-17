"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
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

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden bg-background">
        <section>
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#pricing"
                    className="hover:bg-background bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border border-border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300"
                  >
                    <span className="text-foreground text-sm">BETA · Free during beta — no credit card, ever</span>
                    <span className="block h-4 w-0.5 border-l border-border bg-white"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-5xl md:text-6xl lg:mt-16 lg:text-7xl">
                    GST billing in seconds.
                    <br />
                    Everything else, <span className="font-serif italic font-normal text-primary">automatic</span>.
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                    Retail, GST, or estimate invoices with custom tax slabs — printed straight to any Bluetooth, USB, or Wi-Fi thermal printer. Stock synced across warehouses, udhar ledgers that update themselves, and live GPS tracking for your field team.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div className="bg-foreground/10 rounded-[14px] border border-border p-0.5">
                    <Button asChild size="lg" className="rounded-xl px-5 text-base">
                      <Link href="https://app.papayapalette.online/register">
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
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="ring-border bg-card relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border p-4 shadow-lg shadow-zinc-950/10 ring-1">
                  <InvoicePreview />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        {/* Segment strip — business categories the product is built for,
            not fabricated "trusted by" customer logos. */}
        <section className="bg-background pb-16 pt-16 md:pb-32">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">
              Built for every kind of Indian retail business
            </p>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
              {SEGMENTS.map((s) => (
                <div key={s} className="text-center text-sm font-semibold text-muted-foreground">
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

// A locally-built GST invoice mockup (real product data, no external image
// asset) used as the hero's visual instead of a fabricated app screenshot.
function InvoicePreview() {
  return (
    <div className="bg-background rounded-xl border border-border p-6 md:p-10 text-left">
      <div className="flex items-start justify-between border-b-2 border-foreground pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 font-black text-lg uppercase tracking-tight text-foreground">
            <Image src="/logo-icon.png" alt="" width={20} height={20} className="shrink-0" />
            managemycounter
          </div>
          <p className="text-xs text-muted-foreground mt-1">GSTIN: 09AAAAA0000A1Z5 · Uttar Pradesh</p>
        </div>
        <div className="text-right">
          <h2 className="text-sm font-bold text-primary">TAX INVOICE</h2>
          <p className="text-xs text-muted-foreground mt-1">Invoice #INV-1042</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between font-bold border-b border-border pb-1.5 text-xs uppercase tracking-wider text-muted-foreground">
          <span>Item</span>
          <span>Total</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Apollo Atta 10kg × 2</span>
          <span>₹1,240.00</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Fortune Oil 5L × 1</span>
          <span>₹850.00</span>
        </div>
        <div className="flex justify-between text-muted-foreground text-xs pt-1">
          <span>CGST + SGST (5%)</span>
          <span>₹104.50</span>
        </div>
        <div className="flex justify-between border-t-2 border-foreground pt-2 mt-1 font-black text-base text-foreground">
          <span>Grand Total</span>
          <span>₹2,194.50</span>
        </div>
      </div>
    </div>
  );
}

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Download App", href: "#download" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQs", href: "#faq" },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav data-state={menuState && "active"} className="fixed z-20 w-full px-2 group">
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled && "bg-background/80 backdrop-blur-lg max-w-4xl rounded-2xl border border-border lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center gap-2 text-lg font-black tracking-tight uppercase text-foreground">
                <Image src="/logo-icon.png" alt="managemycounter" width={22} height={22} className="shrink-0" />
                managemycounter
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-foreground block duration-150">
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="https://app.papayapalette.online/dashboard" className="hover:text-foreground block duration-150">
                    <span>Portal</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-muted-foreground hover:text-foreground block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm">
                  <Link href="https://app.papayapalette.online/dashboard">
                    <span>Log In</span>
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="https://app.papayapalette.online/register">
                    <span>Get Invite Access</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
