"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const FAQS = [
  {
    question: "Do I need to know accounting to use this?",
    answer:
      "No. If you can use WhatsApp, you can use managemycounter. There's no accounting jargon on screen — just billing, udhaar ka hisab, and stock, in the same language you already use at your counter. Your CA still gets proper GSTR-ready reports at month-end.",
  },
  {
    question: "Is managemycounter really free during the beta?",
    answer:
      "Yes — every invited shop gets full access to all modules (POS, GST invoicing, multi-warehouse inventory, field-agent tracking, and reporting) at no cost while we're in private beta. No card required to sign up.",
  },
  {
    question: "Does it handle CGST/SGST/IGST automatically?",
    answer:
      "Yes. Tax is split automatically based on the customer's billing state versus your registered state, and every GST invoice is generated audit-ready — no manual CGST/SGST/IGST calculation needed.",
  },
  {
    question: "Can I manage stock across more than one warehouse or store?",
    answer:
      "Yes — multi-warehouse stock sync is included for every invited shop during the beta, no upgrade needed. Check availability across every location in real time and record transfers between them without manual reconciliation.",
  },
  {
    question: "What happens to my data if I lose internet connectivity?",
    answer:
      "The Android apps are built offline-first for Indian network conditions — staff can keep billing and recording attendance without a live connection, and everything syncs automatically once you're back online.",
  },
  {
    question: "How is my business data kept secure?",
    answer:
      "All data is encrypted in transit and at rest, with role-based access control so staff only see what their role needs — an owner's financial reports aren't visible to a field agent's login, for example.",
  },
  {
    question: "Can customers get their invoice without installing anything?",
    answer:
      "Yes — invoices and reports can be shared as a direct link over WhatsApp or email. Customers open it in their browser to view or download the PDF; no app or login required on their end.",
  },
  {
    question: "Do you support Tally-style A4 invoices as well as thermal receipts?",
    answer:
      "Both. You can configure separate templates for thermal receipt printers and full A4 tax invoices, including which fields (logo, HSN codes, bank details, signature) appear on each.",
  },
  {
    question: "What happens when the beta ends?",
    answer:
      "Paid plans will follow once the beta wraps up, but nothing changes overnight — we'll give every invited shop advance notice before any billing starts. Your invoice numbering, party ledgers, and stock history stay exactly as they are; nothing gets reset or locked.",
  },
  {
    question: "Can I track my delivery and sales agents on a live map?",
    answer:
      "Yes. The owner and manager dashboard shows every field agent's live GPS location, their active/idle/offline status, route history, and what tasks they've completed. Agents use a dedicated Android app with GPS-based attendance, task check-in at customer locations, and offline-first sync.",
  },
  {
    question: "What can field agents do from their phone?",
    answer:
      "Field agents get a dedicated Android app with GPS attendance check-in/out, task dispatch with 7 visit outcomes (Collected Order, Delivered, Payment Collected, Issue Logged, and more), expense claims with photo receipts, and live location pings. Everything works offline and syncs when connectivity returns.",
  },
];

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-base md:text-lg font-bold text-foreground">{question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-muted-foreground leading-relaxed pb-6 pr-8">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about billing, field agent tracking, security, and how the beta works.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
