"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Grid-pattern hero backdrop, self-hosted via CSS (no external image
// dependency) — thin hairline grid fading toward the edges via a mask so it
// reads as texture, not a hard-edged tile.
export function HeroSectionGrid() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-white pb-20 pt-16 md:pb-28 md:pt-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0000000a 1px, transparent 1px), linear-gradient(to bottom, #0000000a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 10%, #e0f2fe80 0%, transparent 55%), radial-gradient(at 85% 25%, #d8e2ff70 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <Link
          href="#features"
          className="hover:bg-white bg-white/70 group mx-auto flex w-fit items-center gap-4 rounded-full border border-zinc-200 p-1 pl-4 shadow-md shadow-black/5 backdrop-blur-sm transition-all duration-300"
        >
          <span className="text-zinc-800 text-sm">Full ERP, free during beta — no trial, no card</span>
          <span className="block h-4 w-0.5 border-l border-zinc-300" />
          <div className="bg-white group-hover:bg-zinc-100 size-6 overflow-hidden rounded-full duration-500 flex items-center justify-center">
            <ArrowRight className="size-3" />
          </div>
        </Link>

        <h1 className="mt-8 max-w-4xl text-balance text-4xl md:text-6xl lg:text-7xl text-foreground">
          Bill fast. Track udhaar.
          <br />
          Stay <span className="font-serif italic font-normal text-primary">GST-ready</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base md:text-lg text-zinc-600">
          One counter app for Indian shopkeepers — POS billing, a live credit ledger instead of the
          bahi-khata, stock across every warehouse, and GST reports that build themselves as you
          bill. Made by a shopkeeper, for the shopkeeper community.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <Link href="https://app.managemycounter.com/register">Get Invite Access</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-base">
            <Link href="#features">See What&apos;s Inside ↓</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
