"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { FAQSection } from "@/components/blocks/faq-section";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Check, BarChart3, Smartphone, ShieldCheck, Mail, Phone, MapPin, Globe, ChevronRight, ChevronLeft, Star, Users, Zap, Lock, Send, TrendingUp, Target, Database, Cloud, Cpu, Layers, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const FOOTER_MENU = {
  Product: [
    { href: "#features", label: "Features" },
    { href: "#integrations", label: "Integrations" },
    { href: "#pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ],
  Company: [
    { href: "/about", label: "About us" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact us" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/integration", label: "Integrations" },
    { href: "/docs", label: "Documentation" },
    { href: "/changelog", label: "Changelog" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/security", label: "Security" },
  ],
};

const STATS = [
  { value: "10X", label: "Faster Billing" },
  { value: "50K+", label: "Invoices Daily" },
  { value: "99.9%", label: "Uptime" },
  { value: "5000+", label: "Active Shops" },
];

const FEATURES = [
  {
    icon: BarChart3,
    title: "Real-Time Reporting",
    description: "Stay informed with up-to-the-minute reports that provide instant visibility into your sales, stock, and cash flow.",
    badge: "Analytics",
  },
  {
    icon: Smartphone,
    title: "Mobile App Analytics",
    description: "Dive deep into the performance and usage patterns of your field team with live GPS tracking and attendance.",
    badge: "Mobile",
  },
  {
    icon: Database,
    title: "Multi-Warehouse Stock Sync",
    description: "Manage and track inventory across multiple physical locations. Instantly check stock availability across branches.",
    badge: "Inventory",
  },
  {
    icon: Lock,
    title: "Data Security",
    description: "Rest assured knowing that your data is protected with enterprise-grade encryption and role-based access control.",
    badge: "Security",
  },
  {
    icon: Send,
    title: "Direct Invoice Sharing",
    description: "Share clean digital copies of invoices or reports. Send invoice PDFs directly via WhatsApp or email to clients.",
    badge: "Sharing",
  },
  {
    icon: TrendingUp,
    title: "GST Compliance Automation",
    description: "Automatically split tax into CGST/SGST/IGST based on client location. GST filings are audit-ready without manual work.",
    badge: "GST",
  },
  {
    icon: Users,
    title: "Digital Credit Ledger (Udhar)",
    description: "Log debit/credit balances for customers and suppliers. Tap to send outstanding payment reminders directly on WhatsApp.",
    badge: "Ledger",
  },
  {
    icon: Target,
    title: "Field Agent Tracking",
    description: "Real-time location check-ins and travel paths for delivery staff. Verify agent delivery check-ins on live supervisor maps.",
    badge: "Field Ops",
  },
  {
    icon: Layers,
    title: "Expense Uploads & Approvals",
    description: "Staff capture receipt photos and file expense claims. Supervisors approve travel/food expenses directly from the web panel.",
    badge: "Expenses",
  },
];

const INTEGRATIONS = [
  { name: "WhatsApp Business", logo: "💬", category: "Communication" },
  { name: "Tally", logo: "📊", category: "Accounting" },
  { name: "Razorpay", logo: "💳", category: "Payments" },
  { name: "Shiprocket", logo: "📦", category: "Logistics" },
  { name: "Google Sheets", logo: "📈", category: "Productivity" },
  { name: "Zoho CRM", logo: "🎯", category: "CRM" },
  { name: "India Post", logo: "📮", category: "Logistics" },
  { name: "GST Portal", logo: "🏛️", category: "Compliance" },
];

const TESTIMONIALS = [
  {
    quote: "managemycounter transformed how we run our wholesale business. GST billing that used to take hours now happens in minutes. The field agent tracking alone saved us 20% on delivery disputes.",
    author: "Rajesh Kumar",
    role: "Owner, Kumar Trading Co.",
    company: "🏪",
    avatar: "RK",
  },
  {
    quote: "The multi-warehouse sync is a game-changer. We manage 3 godowns across Delhi NCR and stock levels update in real-time. No more manual stock transfers or phone calls to check availability.",
    author: "Priya Sharma",
    role: "Operations Head, PharmaPlus",
    company: "💊",
    avatar: "PS",
  },
  {
    quote: "Finally a POS that understands Indian retail. The udhar ledger with WhatsApp reminders cut our collection time in half. Our field agents love the attendance check-in — no more timesheet fraud.",
    author: "Amit Patel",
    role: "Director, Patel Electronics",
    company: "📱",
    avatar: "AP",
  },
];

const BLOG_POSTS = [
  {
    title: "GST Rule 55: Complete Guide to Delivery Challans",
    excerpt: "Understand the mandatory fields, format requirements, and compliance checklist for GST-compliant delivery challans in 2024.",
    category: "Compliance",
    image: "/blog-challan.jpg",
  },
  {
    title: "How to Automate GST Reconciliation and Save 10 Hours/Week",
    excerpt: "Step-by-step guide to setting up automated GST return filing, invoice matching, and error detection using managemycounter.",
    category: "Automation",
    image: "/blog-gst.jpg",
  },
  {
    title: "Multi-Warehouse Inventory: Best Practices for Growing Retailers",
    excerpt: "Learn how successful retailers structure their warehouse operations, stock transfers, and reorder workflows across locations.",
    category: "Inventory",
    image: "/blog-warehouse.jpg",
  },
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
      "Direct API Integrations & Logs",
      "Custom Invoice Templates",
      "On-premise Deployment Option",
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

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-500">
      <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
        {feature.badge}
      </div>
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <feature.icon size={28} className="text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{feature.title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
    </div>
  );
}

function TestimonialCard({ testimonial, index, isActive }: { testimonial: typeof TESTIMONIALS[0]; index: number; isActive: boolean }) {
  return (
    <div className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 ${isActive ? "opacity-100" : "opacity-60"}`}>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 h-full">
        <div className="flex items-center gap-2 mb-4">
          <Star size={18} className="text-amber-400 fill-amber-400" />
          <Star size={18} className="text-amber-400 fill-amber-400" />
          <Star size={18} className="text-amber-400 fill-amber-400" />
          <Star size={18} className="text-amber-400 fill-amber-400" />
          <Star size={18} className="text-amber-400 fill-amber-400" />
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-base">"{testimonial.quote}"</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {testimonial.avatar}
          </div>
          <div>
            <p className="font-bold text-zinc-900 dark:text-white">{testimonial.author}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.role}</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              <span className="text-lg">{testimonial.company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ plan, billingPeriod, index }: { plan: typeof PRICING_PLANS[0]; billingPeriod: "monthly" | "yearly"; index: number }) {
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
        href="https://app.papayapalette.online/register"
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

function BlogCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <Link
      href="/blog"
      className="group block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-500"
    >
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BarChart3 size={48} className="text-primary/30 group-hover:text-primary/50 transition-colors" />
        </div>
      </div>
      <div className="p-6">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-2 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export default function LandingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans antialiased">
      {/* Hero */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
                <div className="text-zinc-600 dark:text-zinc-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={14} />
              Core Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              Built for growth & precision
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Everything you need to orchestrate physical stock, back-office bookkeeping, and physical field forces.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
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
                <Link href={"/download"} className="group flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Smartphone size={28} className="text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">managemycounter App</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">For owners, managers & staff — POS, inventory, ledger, expenses</p>
                  </div>
                </Link>
                <Link href={"/download"} className="group flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Users size={28} className="text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Agent App</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">For field agents — attendance, expenses, tasks, GPS tracking</p>
                  </div>
                </Link>
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

      {/* Integrations */}
      <section id="integrations" className="py-24 md:py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Layers size={14} />
              Integrations
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              Seamlessly connect your tools
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Unlock the full potential by integrating with the apps you already use.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATIONS.map((integration, i) => (
              <div key={i} className="group flex items-center gap-4 p-5 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  {integration.logo}
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">{integration.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{integration.category}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/integrations">
              <Button variant="outline" size="lg">View All Integrations <ChevronRight size={18} /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Users size={14} />
              Customers
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              Hear from shopkeepers like you
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Thousands of Indian retailers trust managemycounter to run their business.
            </p>
          </div>
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
              {TESTIMONIALS.map((testimonial, i) => (
                <TestimonialCard key={i} testimonial={testimonial} index={i} isActive={i === testimonialIndex} />
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-zinc-600 dark:text-zinc-400" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === testimonialIndex
                        ? "bg-primary w-8"
                        : "bg-zinc-300 dark:bg-zinc-600 hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 md:py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Globe size={14} />
                Recent News
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                Latest from our blog
              </h2>
            </div>

            <Link href="/blog" className="self-center">
              <Button variant="outline" size="default">
                View All Posts <ChevronRight size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={i} post={post} />
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
              <PricingCard key={i} plan={plan} billingPeriod={billingPeriod} index={i} />
            ))}
          </div>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-12">
            All plans include 14-day free trial. No credit card required. Cancel anytime.
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
            Supercharge your business today
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            Elevate your online presence, streamline operations, and exceed customer expectations with managemycounter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
<Link href="https://app.papayapalette.online/register">
  <Button variant="default" size="lg" className="w-full sm:w-auto">
                Try for Free <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto border-zinc-700 text-zinc-200 hover:bg-zinc-800">
                Let's talk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 dark:bg-black border-t border-zinc-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
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

