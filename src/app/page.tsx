"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { FAQSection } from "@/components/blocks/faq-section";
import {
  ArrowRight, Check, Smartphone, Send, Users, Tag, Receipt, Package, Landmark,
  Contact, Truck, Scale, KeyboardIcon, MessageCircle, Printer, FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_DOWNLOAD_URL, AGENT_APP_DOWNLOAD_URL } from "@/lib/config";

const FOOTER_MENU = {
  Product: [
    { href: "#features", label: "Features" },
    { href: "#works-with", label: "Works With" },
    { href: "#pricing", label: "Pricing" },
  ],
  Company: [
    { href: "mailto:hello@shopkeeper.app", label: "Contact us" },
    { href: "/blog", label: "Blog" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/security", label: "Security" },
  ],
};

// Every feature listed here is something actually built and shipped in the
// product today — grouped the same way the app's own dashboard groups
// them (Billing & Sales / Inventory & Products / Accounting & Finance /
// Staff & HR / Operations & Logistics), not generic SaaS marketing copy.
const FEATURE_CATEGORIES = [
  {
    id: "billing",
    label: "Billing & Sales",
    icon: Receipt,
    intro: "A counter workflow built for speed — keyboard-driven search, one-tap quick-add, and billing for both packaged and loose/weighed goods.",
    items: [
      { title: "POS & B2B billing", desc: "Retail, GST, or estimate invoices — with Bill of Supply for composition-scheme sellers — from the same counter screen." },
      { title: "Weighing-scale & loose-item billing", desc: "Sell by weight (kg/g/ml/l) alongside fixed-unit packets, with a dual-pricing toggle for products sold both ways." },
      { title: "Keyboard-driven checkout", desc: "Arrow keys to pick a search match, Enter to add it, Ctrl+A to charge — a cashier never has to reach for the mouse." },
      { title: "Split payments & cash change", desc: "Cash, UPI, card, or credit in any combination on one bill, with a live Cash Received / Change Due calculator." },
      { title: "Sales Orders & Price Lists", desc: "Track customer commitments before delivery, and set tiered/wholesale pricing by customer group." },
      { title: "One-tap WhatsApp receipts", desc: "Share a PDF invoice straight to the customer's phone the moment a sale closes." },
    ],
  },
  {
    id: "inventory",
    label: "Inventory & Products",
    icon: Package,
    intro: "Stock that stays accurate across every warehouse, with the specific fields Indian retail actually needs — not a generic SKU list.",
    items: [
      { title: "Multi-warehouse stock sync", desc: "Real-time quantity across every location, with transfer requests and approvals between them." },
      { title: "Custom product fields", desc: "Company-defined attributes — colour, flavour, dimensions — that show up on the product form and, if you choose, the printed invoice." },
      { title: "Rack/shelf & quick-add", desc: "Tag a product's physical location for faster picking, and pin your actual best-sellers to a one-tap grid at the counter." },
      { title: "Container/crate deposit tracking", desc: "Returnable-container deposits (crates, jars) tracked per party, with recovery and aging reports." },
      { title: "Batch, expiry & serial tracking", desc: "FEFO-aware batch/expiry for perishables, and unit-level serial/IMEI tracking for electronics — printed on the invoice for warranty proof." },
      { title: "Barcode generation & GST rate tools", desc: "Print barcode labels in bulk, and catch HSN/GST-rate mismatches across your whole catalogue in one pass." },
    ],
  },
  {
    id: "accounting",
    label: "Accounting & Finance",
    icon: Landmark,
    intro: "The reports and ledger behaviour a shop's accountant actually asks for, not just a sales total.",
    items: [
      { title: "Party ledger with udhar reminders", desc: "Running balance per customer/supplier, with one-tap WhatsApp reminders for anything overdue." },
      { title: "Credit/debit notes & bank reconciliation", desc: "Proper adjustment documents, and confidence-scored matching against your bank statement." },
      { title: "P&L, Balance Sheet, Trial Balance", desc: "Plus Aging, Stock Valuation, and HSN-wise summary — the standard set your CA expects to see." },
      { title: "GSTR-ready exports", desc: "B2B/B2C sales and purchase registers formatted for GSTR-1/3B filing, plus TDS/TCS and RCM handling on purchases." },
      { title: "Expense tracking with approvals", desc: "Staff capture a receipt photo and file a claim; a supervisor approves it from the web panel." },
    ],
  },
  {
    id: "staff",
    label: "Staff & HR",
    icon: Contact,
    intro: "Role-based access for everyone who touches the counter or the stockroom, plus the day-to-day HR a small team needs.",
    items: [
      { title: "Five distinct roles", desc: "Owner, Manager, Staff, Warehouse Manager, and Field Agent — each sees only what their role needs." },
      { title: "Attendance & payroll", desc: "Daily check-in/out, with wage calculation that reads directly from attendance records." },
      { title: "Leave & holiday calendar", desc: "Leave requests and balances, plus a company holiday calendar that's automatically excluded from attendance tracking." },
    ],
  },
  {
    id: "operations",
    label: "Operations & Logistics",
    icon: Truck,
    intro: "For the part of the business that happens outside the shop — deliveries, field visits, and supplier orders.",
    items: [
      { title: "Live field-agent GPS tracking", desc: "See where your delivery/sales agents are and what they've completed, from the owner's dashboard." },
      { title: "Delivery challans", desc: "GST Rule 55-compliant challans linked to the originating invoice, with driver and vehicle details." },
      { title: "Purchase Orders & reorder suggestions", desc: "Raise a PO against a supplier, receive it partially or in full, and get low-stock reorder suggestions automatically." },
    ],
  },
] as const;

// Only real, verified capabilities — no fabricated third-party API
// integrations. WhatsApp sharing, thermal printing, and Excel export are
// all genuinely built; there is no live Tally/Razorpay/CRM sync today.
const WORKS_WITH = [
  { icon: MessageCircle, name: "WhatsApp", desc: "Share PDF invoices and send udhar payment reminders directly." },
  { icon: Printer, name: "Thermal & A4 printers", desc: "Bluetooth, USB, or Wi-Fi thermal receipt printers, plus full A4 tax invoices." },
  { icon: FileSpreadsheet, name: "Excel / CSV export", desc: "Every report and register exports cleanly for your accountant or a spreadsheet." },
  { icon: Scale, name: "Weighing scales", desc: "Loose-goods billing by weight, ready for scale-hardware integration as it rolls out." },
];

// Named plainly, in the cashier/owner's own language — the specific daily
// friction this replaces, not abstract "inefficiency."
const PAIN_POINTS = [
  { before: "Weighing rice or dal, then typing the price into a calculator by hand", after: "Scale-ready weight billing — the price computes itself" },
  { before: "A notebook full of udhaar you have to chase down by phone", after: "A live ledger with one-tap WhatsApp payment reminders" },
  { before: "Checking three different registers to see what's actually in stock", after: "One number, synced live across every warehouse" },
  { before: "Retyping the same bill into Tally at the end of the day", after: "GST-ready reports and exports, generated as you sell" },
];

const DIFFERENTIATORS = [
  { icon: Scale, title: "Actually built for kirana counters", desc: "Weighing-scale billing, loose-goods pricing, and container deposits — not a generic retail POS with GST bolted on." },
  { icon: KeyboardIcon, title: "Keyboard-first, like the desktop software you already know", desc: "Search, arrow keys, Enter to add, Ctrl+A to charge. Built for a cashier who never wants to touch the mouse." },
  { icon: Smartphone, title: "Offline-first mobile apps", desc: "Built for Indian network conditions — billing and attendance keep working without a live connection, and sync once you're back online." },
  { icon: Send, title: "Free during beta, no catch", desc: "Every invited shop gets full access to every module today. No credit card, no feature gate." },
];

const PRICING_PLANS = [
  {
    name: "Starter Shop",
    tagline: "Perfect for single retail counters",
    monthly: 499,
    yearly: 4990,
    features: [
      "Unlimited POS Transactions",
      "GST Invoicing & Calculations",
      "1 Warehouse Stock Tracking",
      "Direct WhatsApp PDF Share",
      "Bluetooth Receipt Printing",
      "Overview Reports Portal",
    ],
    cta: "Start Free — No Card",
    popular: false,
  },
  {
    name: "Pro ERP",
    tagline: "For shops with warehouses & field teams",
    monthly: 1499,
    yearly: 14999,
    features: [
      "Everything in Starter, plus:",
      "Multi-Warehouse Inventory Sync",
      "Digital Credit Ledger (Udhar)",
      "Up to 5 Staff/Agent Accounts",
      "Live GPS Field Tracking & Maps",
      "Expense Upload & Supervisor Approval",
      "GST-Compliant Delivery Challans",
      "Credit/Debit Notes & Bank Reconciliation",
      "Balance Sheet, Trial Balance & Aging Reports",
      "Excel Export on Every Module",
    ],
    cta: "Start Free — No Card",
    popular: true,
  },
  {
    name: "Enterprise Group",
    tagline: "For wholesale chains & large businesses",
    monthly: 4999,
    yearly: 49990,
    features: [
      "Everything in Pro, plus:",
      "Unlimited Warehouses & Stores",
      "Unlimited Staff & Agents",
      "Custom Role & Access Policies",
      "Dedicated High-Perf Cloud Hosting",
      "Priority WhatsApp & Phone SLA",
      "Custom Invoice Templates",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

function Logo({ width = 140, height = 36, className = "" }) {
  return (
    <Image
      src="/ManageMyCounter Rectangle-01.png"
      alt="managemycounter"
      width={width}
      height={height}
      className={`shrink-0 ${className}`}
    />
  );
}

function NavLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

function PricingCard({ plan, billingPeriod }: { plan: typeof PRICING_PLANS[0]; billingPeriod: "monthly" | "yearly" }) {
  const price = billingPeriod === "monthly" ? plan.monthly : plan.yearly;
  const period = billingPeriod === "monthly" ? "month" : "year";
  const savings = billingPeriod === "yearly" ? Math.round((plan.monthly * 12 - plan.yearly) / (plan.monthly * 12) * 100) : 0;

  return (
    <div className={`relative flex flex-col h-full rounded-2xl border-2 p-8 transition-all duration-300 ${
      plan.popular
        ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
        : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-primary/50"
    }`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{plan.name}</h3>
        <p className="text-zinc-500 dark:text-zinc-400">{plan.tagline}</p>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-zinc-900 dark:text-white">₹{price.toLocaleString()}</span>
          <span className="text-zinc-500 dark:text-zinc-400 mb-2">/{period}</span>
        </div>
        {billingPeriod === "yearly" && savings > 0 && (
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-2">
            Save {savings}% annually
          </p>
        )}
        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">₹0 during beta — free, full access</p>
      </div>
      <Link
        href="https://app.managemycounter.com/register"
        className={`w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center mb-8 ${
          plan.popular
            ? "bg-primary text-white hover:opacity-90 shadow-lg"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
        }`}
      >
        {plan.cta}
      </Link>

      <ul className="space-y-4 mt-auto flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
            <Check size={14} className={plan.popular ? "text-primary shrink-0" : "text-emerald-500 shrink-0"} strokeWidth={3} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureExplorer() {
  const [activeId, setActiveId] = useState<typeof FEATURE_CATEGORIES[number]["id"]>("billing");
  const active = FEATURE_CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <div>
      {/* Category tabs — deliberately mirrors the same 5-category grouping
          the actual app's own sidebar uses, so this section teaches the
          real product's information architecture, not a marketing fiction. */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {FEATURE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              <Icon size={16} />
              {cat.label}
            </button>
          );
        })}
      </div>

      <p className="text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">{active.intro}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {active.items.map((item, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans antialiased">
      {/* Hero */}
      <HeroSection />

      {/* Pain points — names the specific daily friction before the feature
          list, so a visitor recognizes their own counter before being sold
          to. */}
      <section className="py-20 md:py-28 bg-white dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              If this sounds like your counter, it's built for you
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="p-5 bg-zinc-50 dark:bg-zinc-900">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5">Today</p>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{p.before}</p>
                </div>
                <div className="p-5 bg-primary/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">With managemycounter</p>
                  <p className="text-zinc-900 dark:text-white font-semibold leading-relaxed">{p.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section — interactive explorer across the 5 real module
          categories, replacing a flat generic 9-card grid. */}
      <section id="features" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Tag size={14} />
              Every Module
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              One dashboard, five job-to-be-done categories
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              The same grouping you'll see the moment you log in — pick a category to see what's actually built.
            </p>
          </div>
          <FeatureExplorer />
        </div>
      </section>

      {/* Why managemycounter — honest differentiators, no fabricated
          customer testimonials (there's no installed base to quote yet
          during beta). */}
      <section className="py-24 md:py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Users size={14} />
              Why managemycounter
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              Built for how a kirana counter actually runs
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {DIFFERENTIATORS.map((d, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <d.icon size={22} className="text-primary" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1.5">{d.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section id="download" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Smartphone size={14} />
                Mobile Apps
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
                Companion apps for your team
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Download the Android apps for your staff and field agents. Native performance, offline-first, built for Indian networks.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <a href={APP_DOWNLOAD_URL} className="group flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Smartphone size={28} className="text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">managemycounter App</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">For owners, managers & staff — POS, inventory, ledger, expenses</p>
                  </div>
                </a>
                <a href={AGENT_APP_DOWNLOAD_URL} className="group flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Users size={28} className="text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Agent App</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">For field agents — attendance, expenses, tasks, GPS tracking</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl blur-3xl" />
                <Image
                  src="/phone-mockup.jpg"
                  alt="Mobile app screenshots"
                  width={600}
                  height={600}
                  className="relative w-full h-full object-cover rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works With — only real, verified capabilities. No fabricated
          third-party API integrations (there is no live Tally/Razorpay/CRM
          sync today, however aspirational). */}
      <section id="works-with" className="py-24 md:py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Tag size={14} />
              Works With
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              Fits into what you already use
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              No lock-in, no separate export tool — every report leaves in a format your accountant already works with.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKS_WITH.map((w, i) => (
              <div key={i} className="p-5 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <w.icon size={22} className="text-primary" strokeWidth={1.75} />
                </div>
                <p className="font-semibold text-zinc-900 dark:text-white mb-1">{w.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Tag size={14} />
              Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              We are in private beta — every invited shop gets full access at no cost today.
            </p>
            <div className="inline-flex items-center gap-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-1 rounded-xl shadow-sm">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-primary text-white shadow"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${
                  billingPeriod === "yearly"
                    ? "bg-primary text-white shadow"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Yearly
                <span className="bg-primary/20 text-primary dark:text-white text-xs px-2 py-0.5 rounded font-bold">SAVE 16%</span>
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan, i) => (
              <PricingCard key={i} plan={plan} billingPeriod={billingPeriod} />
            ))}
          </div>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-12">
            Free during private beta. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-zinc-900 dark:bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-8">
            Run your counter without the notebook
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            GST billing, stock, udhar ledger, and field-team tracking — one app, free during beta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://app.managemycounter.com/register">
              <Button variant="default" size="lg" className="w-full sm:w-auto">
                Try for Free <ArrowRight size={20} />
              </Button>
            </Link>
            <a href="mailto:hello@shopkeeper.app">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto border-zinc-700 text-zinc-200 hover:bg-zinc-800">
                Let's talk
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 dark:bg-black border-t border-zinc-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Logo width={140} height={36} className="mb-4" />
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                GST billing, inventory, and field-team ERP built for Indian retail and wholesale shops.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            {Object.entries(FOOTER_MENU).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-white mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <NavLink href={link.href}>{link.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-zinc-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-zinc-500 text-sm">
                © {new Date().getFullYear()} managemycounter. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <NavLink href="/privacy">Privacy Policy</NavLink>
                <NavLink href="/terms">Terms of Service</NavLink>
                <NavLink href="/security">Security</NavLink>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
