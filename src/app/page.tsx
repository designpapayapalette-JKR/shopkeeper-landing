"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BentoGridShowcase } from "@/components/ui/bento-product-features";
import { APP_DOWNLOAD_URL, AGENT_APP_DOWNLOAD_URL } from "@/lib/config";
import {
  Settings2,
  Plus,
  Store,
  Receipt,
  Package,
  Users,
  MapPin,
  Warehouse,
  MessageCircle,
  UserCog,
  BarChart3,
  ShieldCheck,
  Smartphone,
  IndianRupee,
  Check,
  Download as DownloadIcon,
} from "lucide-react";


const FEATURES = [
  {
    title: "POS Billing & Estimations",
    description: "Issue GST Invoices, Retail Bills, or Estimates in seconds. Fast counter checkout with quick-keys.",
    icon: Receipt,
  },
  {
    title: "Auto-Calculated GST Splits",
    description: "Automatically split tax into CGST/SGST/IGST based on client location. GST filings are audit-ready without manual split calculations.",
    icon: IndianRupee,
  },
  {
    title: "Inventory Management",
    description: "Live inventory count with automated low-stock warnings. Alerts trigger when items fall below safety limits, preventing stock-outs.",
    icon: Package,
  },
  {
    title: "Multi-Warehouse Stock Sync",
    description: "Manage and track inventory across multiple physical locations. Instantly check if an out-of-stock item is available in another branch.",
    icon: Warehouse,
  },
  {
    title: "Digital Credit Ledger (Udhar)",
    description: "Log debit/credit balances for customers and suppliers. Tap to send outstanding payment reminders directly on WhatsApp.",
    icon: Users,
  },
  {
    title: "Field Employee Companion App",
    description: "Staff download the Android app to register check-ins and log shift timings. Prevent timesheet fraud with location-verified clock-ins.",
    icon: Smartphone,
  },
  {
    title: "GPS Field Agent Tracking",
    description: "Real-time location check-ins and travel paths for delivery staff. Verify agent delivery check-ins on live supervisor maps.",
    icon: MapPin,
  },
  {
    title: "Expense Uploads & Approvals",
    description: "Staff capture receipt photos and file expense claims. Supervisors approve travel/food expenses directly from the web panel.",
    icon: UserCog,
  },
  {
    title: "Delivery Challans",
    description: "GST Rule 55-compliant challans with reason for movement, place of supply, and per-item HSN/taxable value — not just a vehicle/driver note.",
    icon: BarChart3,
  },
  {
    title: "Credit & Debit Notes",
    description: "Issue GST-compliant credit and debit notes against any invoice for returns, price corrections, and post-sale adjustments.",
    icon: Receipt,
  },
  {
    title: "Bank Reconciliation",
    description: "Import bank statements and match them against recorded payments — spot missing or mismatched entries before they become a problem.",
    icon: IndianRupee,
  },
  {
    title: "Recurring Invoices",
    description: "Set up subscription or contract billing once — invoices generate and send automatically on schedule.",
    icon: Receipt,
  },
  {
    title: "Financial Reports",
    description: "Balance Sheet, Stock Valuation, Trial Balance, and Aging reports — the numbers your CA actually asks for, generated from your live data.",
    icon: BarChart3,
  },
  {
    title: "Export & Print, Everywhere",
    description: "Every module with data — ledgers, reports, inventory, invoices — exports to Excel or prints cleanly, in one click.",
    icon: DownloadIcon,
  },
  {
    title: "Direct Invoice Sharing",
    description: "Share clean digital copies of invoices or reports. Send invoice PDFs directly via WhatsApp or email to clients.",
    icon: MessageCircle,
  },
];

const TRUST_POINTS = [
  {
    icon: IndianRupee,
    title: "Built for Indian retail",
    description: "GST-ready invoicing, rupee-first workflows, and udhar ledgers designed around how Indian shopkeepers actually run their business.",
  },
  {
    icon: ShieldCheck,
    title: "Your data, secured",
    description: "Passwords are hashed, traffic is encrypted end-to-end, and every company's data is isolated at the database level — role-based access means staff and field agents only see what they need to.",
  },
  {
    icon: Smartphone,
    title: "Works where you work",
    description: "A responsive web dashboard for the shop counter and back office, plus a companion mobile app for staff and field teams.",
  },
];

/* ── Bento Grid Showcase helper cards ────────────────────────── */

const IntegrationCard = () => {
  const [autoSend, setAutoSend] = React.useState(true);
  const [printerConnected, setPrinterConnected] = React.useState(true);

  return (
    <Card className="flex h-full flex-col border-border/60 shadow-sm bg-card hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
          <MessageCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">WhatsApp & Printing</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
          Unlock instant checkout automation. Connect your thermal receipt printer and automatically dispatch GST invoice PDFs directly to customer WhatsApp threads.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 mt-2">
        <div className="flex items-center justify-between border-t border-border/40 pt-4">
          <span className="text-xs font-semibold text-foreground">Auto-Send WhatsApp Invoice</span>
          <Switch
            checked={autoSend}
            onCheckedChange={setAutoSend}
            className="data-[state=checked]:bg-primary"
            aria-label="Toggle auto-send WhatsApp"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Printer Status</span>
          <span className={cn("text-xs font-bold", printerConnected ? "text-emerald-600" : "text-amber-500")}>
            {printerConnected ? "● Connected (80mm)" : "○ Offline"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4 flex items-center justify-between border-t border-border/40">
        <Button variant="outline" size="sm" onClick={() => setPrinterConnected(!printerConnected)} className="text-xs font-bold">
          <Settings2 className="mr-1.5 h-3.5 w-3.5" />
          Test Print
        </Button>
        <Badge variant={printerConnected ? "secondary" : "outline"} className="text-[10px] font-bold">
          {printerConnected ? "Active" : "Configure"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

const TrackersCard = () => (
  <Card className="h-full border-border/60 shadow-sm bg-card hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6">
    <div>
      <CardTitle className="text-sm font-bold tracking-tight text-foreground">
        Active Field Forces
      </CardTitle>
      <CardDescription className="text-xs text-muted-foreground mt-1">
        03 Agents Live Tracking
      </CardDescription>
    </div>
    <div className="space-y-2.5 my-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              className="h-7 w-7 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
              alt="Rahul"
            />
            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>
          <div>
            <span className="font-semibold block text-foreground leading-none">Rahul Sharma</span>
            <span className="text-[10px] text-muted-foreground leading-none">Delhi Central Route</span>
          </div>
        </div>
        <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">On Route</Badge>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              className="h-7 w-7 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
              alt="Amit"
            />
            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>
          <div>
            <span className="font-semibold block text-foreground leading-none">Amit Patel</span>
            <span className="text-[10px] text-muted-foreground leading-none">Godown Transfer</span>
          </div>
        </div>
        <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400">Intake</Badge>
      </div>
    </div>
  </Card>
);

const FocusCard = () => (
  <Card className="h-full border-border/60 shadow-sm bg-card hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6">
    <div className="flex items-start justify-between">
      <div>
        <CardTitle className="text-sm font-bold tracking-tight text-foreground">GST Sync</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">Automated Splits</CardDescription>
      </div>
      <Badge variant="outline" className="border-emerald-300 text-emerald-600 bg-emerald-50/20 text-[10px] font-bold">
        Day Book Sync
      </Badge>
    </div>
    <div className="my-2">
      <span className="text-5xl font-black tracking-tight text-primary">100%</span>
    </div>
    <div className="flex justify-between text-[10px] text-muted-foreground border-t border-border/30 pt-2">
      <span>Auto GST split audit logs</span>
      <span className="font-bold text-foreground">Compliant</span>
    </div>
  </Card>
);

const StatisticCard = () => (
  <Card className="relative h-full w-full overflow-hidden border-border/60 shadow-sm bg-card hover:shadow-md transition-all duration-300 flex items-center justify-center p-6">
    {/* Dotted background */}
    <div
      className="absolute inset-0 opacity-15"
      style={{
        backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    />
    <div className="relative z-10 text-center">
      <div className="text-6xl font-black text-primary leading-none">10X</div>
      <div className="text-xs font-semibold text-muted-foreground mt-2 tracking-wide uppercase">Billing Speedup</div>
    </div>
  </Card>
);

const ProductivityCard = () => (
  <Card className="h-full border-border/60 shadow-sm bg-card hover:shadow-md transition-all duration-300 flex flex-col justify-end p-6">
    <CardTitle className="text-sm font-bold tracking-tight text-foreground">
      Multi-Store Stock
    </CardTitle>
    <CardDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
      Aggregated and warehouse-level inventory syncs automatically on checkout. Know what stock is where in real time.
    </CardDescription>
  </Card>
);

const ShortcutsCard = () => (
  <Card className="h-full border-border/60 shadow-sm bg-card hover:shadow-md transition-all duration-300 flex flex-wrap items-center justify-between gap-4 p-6">
    <div>
      <CardTitle className="text-sm font-bold tracking-tight text-foreground">Cash Counter Shortcuts</CardTitle>
      <CardDescription className="text-xs text-muted-foreground mt-0.5">
        Keyboard controls for rapid billing.
      </CardDescription>
    </div>
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 px-2 items-center justify-center rounded-md border bg-muted/30 font-mono text-xs font-bold text-muted-foreground shadow-sm">
        F2
      </div>
      <span className="text-xs text-muted-foreground font-bold">New Bill</span>
      <div className="flex h-7 px-2 items-center justify-center rounded-md border bg-muted/30 font-mono text-xs font-bold text-muted-foreground shadow-sm">
        Ctrl
      </div>
      <Plus className="h-3 w-3 text-muted-foreground" />
      <div className="flex h-7 px-2 items-center justify-center rounded-md border bg-muted/30 font-mono text-xs font-bold text-muted-foreground shadow-sm">
        P
      </div>
      <span className="text-xs text-muted-foreground font-bold">Print</span>
    </div>
  </Card>
);


export default function LandingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const starterMonthly = 499;
  const starterYearly = 4990;
  const starterSavings = (starterMonthly * 12) - starterYearly;

  const proMonthly = 1499;
  const proYearly = 14999;
  const proSavings = (proMonthly * 12) - proYearly;

  const enterpriseMonthly = 4999;
  const enterpriseYearly = 49990;
  const enterpriseSavings = (enterpriseMonthly * 12) - enterpriseYearly;

  const faqs = [
    {
      question: "Do I need a credit card to sign up for the trial?",
      answer: "No, you can sign up and use all features of the platform for 14 days completely card-free. We only ask for billing details once you choose to subscribe."
    },
    {
      question: "Can I manage multiple shops or brands?",
      answer: "Yes! The core dashboard includes an active brand and company switcher, allowing you to run operations for different lines of business from a single owner account."
    },
    {
      question: "How do field agents log their location and expenses?",
      answer: "Agents use the companion managemycounter staff app. It registers remote check-ins, streams location coordinates securely during active duty, and supports camera uploads for expense receipts."
    },
    {
      question: "What hardware is compatible with receipt printing?",
      answer: "Our web dashboard supports connection to standard Bluetooth, network, and USB thermal receipt printers (both 58mm and 80mm layouts)."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can switch between monthly and yearly billing at any time from your dashboard, or reach out and we'll adjust it for you directly."
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200 antialiased selection:bg-primary/20">

      <HeroSection />

      {/* How It Works — reduces signup hesitation by showing exactly how
          little friction there is (real flow: invite code → instant
          account, no approval wait, no card). */}
      <section className="py-20 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Getting Started</span>
            <h2 className="text-3xl tracking-tight text-foreground font-light">Up and billing in under 5 minutes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Get your invite code",
                description: "Ask whoever invited you, or request access — we're onboarding shops directly during the beta.",
              },
              {
                step: "02",
                title: "Set up your shop",
                description: "Enter your code and business details. Your account is live instantly — no approval wait, no card required.",
              },
              {
                step: "03",
                title: "Start billing",
                description: "Your dashboard is ready the moment you sign in. Issue your first GST invoice in under a minute.",
              },
            ].map((s, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="bg-card border border-border rounded-radius p-6 h-full">
                  <span className="text-3xl font-black text-primary/25 tracking-tight">{s.step}</span>
                  <h3 className="text-sm font-extrabold text-foreground mt-3 mb-2">{s.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Featured Showcase */}
      <section id="features" className="py-24 bg-secondary/40 border-b border-border transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Interactive Experience</span>
            <h2 className="text-4xl tracking-tight text-foreground font-light">Experience the future of store management</h2>
            <p className="text-sm text-muted-foreground">
              A premium, animated bento dashboard showcasing active widgets, automated triggers, and rapid POS flows.
            </p>
          </div>

          <BentoGridShowcase
            integration={<IntegrationCard />}
            trackers={<TrackersCard />}
            statistic={<StatisticCard />}
            focus={<FocusCard />}
            productivity={<ProductivityCard />}
            shortcuts={<ShortcutsCard />}
          />
        </div>
      </section>

      {/* Download App Section */}
      <section id="download" className="py-24 bg-background border-b border-border transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest font-mono">Mobile App</span>
            <h2 className="text-3xl tracking-tight text-foreground font-light mt-2">Download the managemycounter App</h2>
            <p className="mt-2 text-sm text-text-secondary font-medium">
              Download the companion Android app for your staff and field agents. Links always point to the latest build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border p-6 rounded-radius hover:border-primary/50 hover:shadow-md transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-radius bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Smartphone size={22} className="text-primary" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-foreground mb-1">managemycounter App</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-medium mb-2">
                  For owners, managers, and staff — POS billing, inventory, ledger, expenses, attendance, and more.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                  <DownloadIcon size={14} />
                  Download APK
                </span>
              </div>
            </a>

            <a
              href={AGENT_APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border p-6 rounded-radius hover:border-primary/50 hover:shadow-md transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-radius bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <UserCog size={22} className="text-primary" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-foreground mb-1">Agent App</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-medium mb-2">
                  For field agents — attendance check-in, expense logging, task management, and live GPS tracking.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                  <DownloadIcon size={14} />
                  Download APK
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="py-24 bg-background border-b border-border transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest font-mono">Core Capabilities</span>
            <h2 className="text-3xl tracking-tight text-foreground font-light mt-2">Built for growth & precision</h2>
            <p className="mt-2 text-sm text-text-secondary font-medium">
              Everything you need to orchestrate physical stock, back-office bookkeeping, and physical field forces.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Reveal key={idx} delay={(idx % 3) * 0.05}>
                  <TiltCard maxTilt={3} className="h-full rounded-radius">
                    <div className="bg-card border border-border p-6 rounded-radius flex flex-col h-full hover:border-primary/45 hover:shadow-sm transition-all duration-300">
                      <div className="w-10 h-10 rounded-radius bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                        <Icon size={18} className="text-primary" strokeWidth={2} />
                      </div>
                      <h3 className="text-sm font-extrabold text-foreground mb-2">{feat.title}</h3>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">{feat.description}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* Trust / value section — generic value props, not fabricated testimonials */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Why managemycounter</span>
            <h2 className="text-3xl tracking-tight font-light">Built for Bharat&apos;s shopkeepers</h2>
            <p className="text-sm text-text-secondary font-medium">Designed from the ground up for how retail actually works in Indian towns and cities.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TRUST_POINTS.map((t, idx) => {
              const Icon = t.icon;
              return (
                <Reveal key={idx} delay={idx * 0.08}>
                  <div className="bg-surface border border-border rounded-radius p-6 text-center flex flex-col items-center h-full hover:border-primary/40 transition-colors duration-300">
                    <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-primary" strokeWidth={2} />
                    </div>
                    <h3 className="text-sm font-extrabold text-foreground mb-2">{t.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">{t.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-secondary/40 border-y border-border transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest font-mono">Pricing Plans</span>
            <h2 className="text-4xl tracking-tight font-light text-foreground">Simple, transparent pricing</h2>
            <p className="text-sm text-muted-foreground">
              We are in private beta — every invited shop gets full access at no cost today. This is what plans will look like once beta ends.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-1 bg-surface border border-border p-1 rounded-radius shadow-sm mt-4">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-radius text-xs font-bold transition-all uppercase tracking-wider ${
                  billingPeriod === "monthly"
                    ? "bg-primary text-white dark:text-background"
                    : "text-text-secondary hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-2 rounded-radius text-xs font-bold transition-all flex items-center gap-1.5 uppercase tracking-wider ${
                  billingPeriod === "yearly"
                    ? "bg-primary text-white dark:text-background"
                    : "text-text-secondary hover:text-foreground"
                }`}
              >
                Yearly
                <span className="bg-primary/20 text-primary dark:text-foreground text-[8px] px-1.5 py-0.5 rounded font-black tracking-widest">SAVE 16%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Starter Plan */}
            <Reveal delay={0}>
              <TiltCard maxTilt={3} className="h-full rounded-radius">
                <div className="bg-card border border-border rounded-radius p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted border border-border px-2 py-0.5 rounded">Counter Only</span>
                    <h3 className="text-xl font-bold mt-2 text-foreground">Starter Shop</h3>
                    <p className="text-xs text-muted-foreground mt-1">Perfect for single retail counters and local shopkeepers.</p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black tracking-tight text-foreground line-through decoration-2 decoration-muted-foreground/40">
                      ₹{billingPeriod === "monthly" ? starterMonthly.toLocaleString() : starterYearly.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-xs font-bold">
                      /{billingPeriod === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-6">₹0 during beta — free, full access</p>

                  {billingPeriod === "yearly" && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-radius p-2.5 mb-6">
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold text-center">
                        Save ₹{starterSavings.toLocaleString()} annually once billing starts
                      </p>
                    </div>
                  )}

                  <Link
                    href="https://app.papayapalette.online/register"
                    className="w-full bg-secondary hover:bg-muted text-foreground py-3 rounded-radius text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center mb-8 border border-border"
                  >
                    Start Free — No Card
                  </Link>

                  <div className="border-t border-border/40 pt-6 mt-auto">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Included Features:</h4>
                    <ul className="space-y-3">
                      {[
                        "Unlimited POS Transactions",
                        "GST Invoicing & Calculations",
                        "1 Warehouse Stock Tracking",
                        "Direct WhatsApp PDF share",
                        "Bluetooth Receipt Printing",
                        "Overview Reports Portal",
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-center text-xs font-medium">
                          <Check size={14} className="text-emerald-500 shrink-0" strokeWidth={3} />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Pro Plan (Recommended) */}
            <Reveal delay={0.05}>
              <TiltCard maxTilt={3} className="h-full rounded-radius">
                <div className="bg-card border-2 border-primary rounded-radius p-8 shadow-md flex flex-col h-full relative hover:shadow-lg transition-all duration-300">
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white dark:text-background text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Recommended Plan
                  </span>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">Counter + Field</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2 text-foreground font-serif italic">Pro ERP</h3>
                    <p className="text-xs text-muted-foreground mt-1">For shops with warehouse networks, employees, and delivery agents.</p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black tracking-tight text-foreground line-through decoration-2 decoration-muted-foreground/40">
                      ₹{billingPeriod === "monthly" ? proMonthly.toLocaleString() : proYearly.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-xs font-bold">
                      /{billingPeriod === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-primary mb-6">₹0 during beta — free, full access</p>

                  {billingPeriod === "yearly" && (
                    <div className="bg-primary/10 border border-primary/20 rounded-radius p-2.5 mb-6">
                      <p className="text-primary dark:text-primary-foreground text-xs font-semibold text-center">
                        Save ₹{proSavings.toLocaleString()} annually once billing starts
                      </p>
                    </div>
                  )}

                  <Link
                    href="https://app.papayapalette.online/register"
                    className="w-full bg-primary hover:opacity-90 text-white dark:text-background py-3 rounded-radius text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center mb-8 shadow-sm"
                  >
                    Start Free — No Card
                  </Link>

                  <div className="border-t border-border/40 pt-6 mt-auto">
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Everything in Starter, plus:</h4>
                    <ul className="space-y-3">
                      {[
                        "Multi-Warehouse Inventory Sync",
                        "Digital Credit Ledger (Udhar)",
                        "Up to 5 Staff/Agent accounts",
                        "Live GPS Field Tracking & Maps",
                        "Expense upload & supervisor approval",
                        "GST-compliant Delivery Challans",
                        "Credit/Debit Notes & Bank Reconciliation",
                        "Balance Sheet, Trial Balance & Aging reports",
                        "Excel export & print on every module",
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-center text-xs font-medium">
                          <Check size={14} className="text-primary shrink-0" strokeWidth={3} />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Enterprise Plan */}
            <Reveal delay={0.1}>
              <TiltCard maxTilt={3} className="h-full rounded-radius">
                <div className="bg-card border border-border rounded-radius p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted border border-border px-2 py-0.5 rounded">Custom ERP</span>
                    <h3 className="text-xl font-bold mt-2 text-foreground">Enterprise Group</h3>
                    <p className="text-xs text-muted-foreground mt-1">For wholesale distribution chains and large business houses.</p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black tracking-tight text-foreground line-through decoration-2 decoration-muted-foreground/40">
                      ₹{billingPeriod === "monthly" ? enterpriseMonthly.toLocaleString() : enterpriseYearly.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-xs font-bold">
                      /{billingPeriod === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-6">₹0 during beta — free, full access</p>

                  {billingPeriod === "yearly" && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-radius p-2.5 mb-6">
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold text-center">
                        Save ₹{enterpriseSavings.toLocaleString()} annually once billing starts
                      </p>
                    </div>
                  )}

                  <Link
                    href="https://app.papayapalette.online/register"
                    className="w-full bg-secondary hover:bg-muted text-foreground py-3 rounded-radius text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center mb-8 border border-border"
                  >
                    Start Free — No Card
                  </Link>

                  <div className="border-t border-border/40 pt-6 mt-auto">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Everything in Pro, plus:</h4>
                    <ul className="space-y-3">
                      {[
                        "Unlimited Warehouses & Stores",
                        "Unlimited Staff & Agents",
                        "Custom Role & Access Policies",
                        "Dedicated high-perf cloud hosting",
                        "Priority WhatsApp & phone SLA",
                        "Direct API integrations & logs",
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-center text-xs font-medium">
                          <Check size={14} className="text-emerald-500 shrink-0" strokeWidth={3} />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Support</span>
            <h2 className="text-3xl tracking-tight font-light">Frequently asked questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.04}>
                <div className="bg-surface border border-border rounded-radius overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-secondary/40 transition-colors"
                  >
                    <span className="font-extrabold text-sm text-foreground pr-4">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: openFaq === idx ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary font-black text-base leading-none"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 border-t border-border pt-3 bg-secondary/10">
                          <p className="text-xs text-text-secondary leading-relaxed font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-border bg-secondary/40">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl tracking-tight font-light">Ready to digitize your shop?</h2>
          <p className="text-sm text-text-secondary font-medium">We're inviting shops into our private beta — free for 30 days, no credit card required.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="https://app.papayapalette.online/register"
              className="bg-primary hover:opacity-95 text-white dark:text-background font-bold text-xs px-6 py-3 rounded-radius transition-all shadow-sm uppercase tracking-wider"
            >
              Get Invite Access
            </Link>
            <a
              href="#pricing"
              className="bg-surface border border-border hover:border-primary text-foreground font-bold text-xs px-6 py-3 rounded-radius transition-all uppercase tracking-wider"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 border-t border-border bg-surface transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-tight uppercase text-foreground">
            <Store size={16} className="text-primary" strokeWidth={2.5} />
            managemycounter
          </span>
          <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} managemycounter. All rights reserved. Built for retail growth.
          </p>
        </div>
      </footer>

    </div>
  );
}
