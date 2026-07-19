"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/blocks/hero-section-light";
import { FAQSection } from "@/components/blocks/faq-section";
import {
  ArrowRight, Check, Smartphone, Send, Users, Tag, Receipt, Package, Landmark,
  Contact, Truck, Scale, KeyboardIcon, MessageCircle, Printer, FileSpreadsheet,
  ArrowDownCircle, ArrowUpCircle, FileText, TrendingUp, ChevronDown, Barcode,
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
    { href: "mailto:hello@managemycounter.com", label: "Contact us" },
    { href: "/blog", label: "Blog" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/security", label: "Security" },
  ],
};

const FEATURE_CATEGORIES = [
  {
    id: "billing",
    label: "Billing & Sales",
    icon: Receipt,
    intro: "Bill in seconds at the counter — keyboard-driven search, one-tap quick-add, and billing for both packed and loose/weighed items in one place.",
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
    intro: "Godown or shop floor, stock stays accurate — the fields Indian retail actually needs, not a generic SKU list.",
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
    intro: "The hisab-kitab your CA actually asks for — not just total sales, the full ledger.",
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
    intro: "At the counter or in the godown, each staff member sees only what they need — plus the everyday HR a small team actually uses.",
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
    intro: "For everything that happens outside the shop — delivery, field visits, and orders placed with suppliers.",
    items: [
      { title: "Live field-agent GPS tracking", desc: "See where your delivery/sales agents are and what they've completed, from the owner's dashboard." },
      { title: "Delivery challans", desc: "GST Rule 55-compliant challans linked to the originating invoice, with driver and vehicle details." },
      { title: "Purchase Orders & reorder suggestions", desc: "Raise a PO against a supplier, receive it partially or in full, and get low-stock reorder suggestions automatically." },
    ],
  },
] as const;

const WORKS_WITH = [
  { icon: MessageCircle, name: "WhatsApp", desc: "Send a PDF invoice straight to WhatsApp, plus udhaar reminders when a payment is overdue." },
  { icon: Printer, name: "Thermal & A4 printers", desc: "Bluetooth, USB, or Wi-Fi thermal receipt printer, plus a full A4 tax invoice." },
  { icon: FileSpreadsheet, name: "Excel / CSV export", desc: "Every report and register exports cleanly — ready for your CA or a spreadsheet." },
  { icon: Scale, name: "Weighing scales", desc: "Weight-billing for loose items, with scale-hardware integration." },
];

const PAIN_POINTS = [
  { before: "Weighing on the kaanta, then reaching for a calculator to work out the rate — for every single customer", after: "Enter the weight, the rate calculates itself — scale-ready billing" },
  { before: "Writing udhaar in the bahi-khata, then calling customers at month-end to remind them", after: "One live ledger, with udhaar reminders sent over WhatsApp in a tap" },
  { before: "Flipping through three different registers just to check what's left in the godown", after: "One number — stock across every warehouse, live" },
  { before: "Re-typing the day's sales into Tally or Excel every night after closing", after: "GST-ready reports build themselves as each bill is made" },
];

const DIFFERENTIATORS = [
  { icon: Scale, title: "Built for the kirana counter", desc: "Weight-billing off the kaanta, loose-item pricing, and crate/bottle deposit tracking — not a generic POS with GST bolted on afterward." },
  { icon: KeyboardIcon, title: "Keyboard-first, like the old Tally workflow", desc: "Search, arrow keys to select, Enter to add, Ctrl+A to close the bill — a cashier never needs to touch the mouse." },
  { icon: Smartphone, title: "Offline-first mobile apps", desc: "Built for Indian network conditions — billing and attendance keep working when the connection drops, and sync the moment it's back." },
  { icon: Send, title: "Free during beta, no catch", desc: "Every invited shop gets full access to every module today. No credit card, no feature lock." },
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

// White-text wordmark (for the dark footer) — cropped from the canonical
// brand source with sharp, same as logo.png/logo-icon.png. The old version
// pointed straight at the raw, uncropped "ManageMyCounter Rectangle-01.png"
// (8000x4500 with ~40% empty padding, spaces in the filename) and rendered
// via fixed width/height props with no object-fit, so the browser silently
// squished it to fit — never actually broken, just never fixed to look right.
function Logo({ width = 140, height, className = "" }: { width?: number; height?: number; className?: string }) {
  const resolvedHeight = height ?? Math.round((width / 900) * 290);
  return (
    <Image
      src="/logo-white.png"
      alt="managemycounter"
      width={width}
      height={resolvedHeight}
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

// A phone-frame recreation of the actual app's real home screen ("Today's
// Snapshot" stat cards — same labels, colours, and layout as
// shopkeeper-app/app/(tabs)/index.tsx) instead of a generic stock photo.
function MobileAppPreview() {
  return (
    <div className="relative mx-auto" style={{ width: 300 }}>
      <div className="rounded-[2.5rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-2xl overflow-hidden">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          {/* Notch */}
          <div className="flex justify-center bg-white pt-2 pb-1">
            <div className="w-24 h-5 bg-zinc-900 rounded-full" />
          </div>

          {/* App header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="" width={28} height={28} />
              <div>
                <p className="text-sm font-black text-blue-600 leading-tight">Sharma General Store</p>
                <p className="text-[10px] text-zinc-400 leading-tight flex items-center gap-0.5">Main Branch <ChevronDown size={10} /></p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Barcode size={16} className="text-blue-600" />
              <div className="w-7 h-7 rounded-full bg-blue-50 border border-zinc-200 flex items-center justify-center">
                <span className="text-[10px] font-bold text-blue-600">RS</span>
              </div>
            </div>
          </div>

          {/* Today's Snapshot */}
          <div className="px-4 pt-4 pb-5">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[13px] font-bold text-zinc-800">Today&apos;s Snapshot</p>
              <p className="text-[10px] font-semibold text-blue-600">View Analytics</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl p-2.5" style={{ background: "#E4F6DC" }}>
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#3E8E2F" }}>Receivables</p>
                  <ArrowDownCircle size={12} style={{ color: "#3E8E2F" }} />
                </div>
                <p className="text-[15px] font-black mt-1" style={{ color: "#1F5A19" }}>₹18,240</p>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: "#FBE1E6" }}>
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#B0345C" }}>Payables</p>
                  <ArrowUpCircle size={12} style={{ color: "#B0345C" }} />
                </div>
                <p className="text-[15px] font-black mt-1" style={{ color: "#7A1F3D" }}>₹6,500</p>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: "#F5F0E1" }}>
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#8B6914" }}>Invoices</p>
                  <FileText size={12} style={{ color: "#8B6914" }} />
                </div>
                <p className="text-[15px] font-black mt-1" style={{ color: "#5C4510" }}>23</p>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: "#E1F0FB" }}>
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#1E6FA6" }}>Sales</p>
                  <TrendingUp size={12} style={{ color: "#1E6FA6" }} />
                </div>
                <p className="text-[15px] font-black mt-1" style={{ color: "#0E3E5C" }}>₹24,580</p>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13px] font-bold text-zinc-800">Low Stock Alerts</p>
                <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">3</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { name: "Tata Salt 1kg", qty: "4 left" },
                  { name: "Amul Butter 500g", qty: "2 left" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between bg-zinc-50 rounded-lg px-2.5 py-2">
                    <p className="text-[11px] font-semibold text-zinc-700">{item.name}</p>
                    <p className="text-[10px] font-bold text-red-500">{item.qty}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      {/* Hero with Google Gemini Effect */}
      <HeroSection />

      {/* Pain points */}
      <section className="py-20 md:py-28 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
                Does this feel like your daily routine?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-5">
                Every shopkeeper has tried one of these at some point — the bahi-khata, an Excel sheet, or another app that turned out way too complicated.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                If your hisab-kitab is still done by hand every night after closing, this app was built for you. Here's what changes:
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 shadow-lg aspect-[4/3] max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <Image
                  src="/images/kirana-ledger-writing.jpg"
                  alt="A shopkeeper doing hisab-kitab by hand in a paper register"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
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

      {/* Features */}
      <section id="features" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Tag size={14} />
              Every Module
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              One dashboard, your whole shop's operations
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              The same grouping you'll see the moment you log in — pick a category, see exactly what's built.
            </p>
          </div>
          <FeatureExplorer />
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 md:py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Users size={14} />
                Why managemycounter
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
                An Indian ERP, built for Indian shopkeepers
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Not a global POS with GST bolted on afterward. Every screen — the udhaar khata, weight-billing, GST returns — is designed around how Indian retail actually runs.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 shadow-lg aspect-[4/3]">
              <Image
                src="/images/kirana-storefront.jpg"
                alt="A typical Indian kirana store counter"
                fill
                className="object-cover"
              />
            </div>
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

      {/* Mobile Apps */}
      <section id="download" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Smartphone size={14} />
                Mobile Apps
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
                For your staff and field team too
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Android apps for your staff and field agents. Native performance, offline-first, built for Indian network conditions.
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
            <div className="relative py-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative">
                <MobileAppPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works With */}
      <section id="works-with" className="py-24 md:py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Tag size={14} />
              Works With
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              Works with what you already use
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              No lock-in, no separate export tool needed — every report comes out exactly the way your CA expects it.
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
              Simple, straightforward pricing
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              We're in private beta right now — every invited shop gets full access, completely free.
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
      {/* Extra bottom padding (vs. top) is deliberate: the fixed nav overlays
          whatever's at the top of the viewport, and this is the last section
          before a fairly short footer — without this, scrolling to the very
          bottom of the page pins this heading behind the nav with nowhere
          left to scroll clear of it. */}
      <section className="pt-24 pb-40 md:pt-32 md:pb-56 bg-zinc-900 dark:bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-8">
            Put down the bahi-khata, go digital
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            GST billing, stock, the udhaar khata, and field-team tracking — all in one app, free during beta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://app.managemycounter.com/register">
              <Button variant="default" size="lg" className="w-full sm:w-auto">
                Try for Free <ArrowRight size={20} />
              </Button>
            </Link>
            <a href="mailto:hello@managemycounter.com">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-transparent border border-zinc-700 text-white hover:bg-zinc-800">
                Let's talk
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 dark:bg-black border-t border-zinc-800 pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Logo width={140} className="mb-4" />
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                GST billing, hisab-kitab, and a complete stock ERP — built for Indian retail and wholesale shops.
              </p>
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
