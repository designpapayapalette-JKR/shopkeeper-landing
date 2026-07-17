"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const FAQS = [
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
      "Yes, the Pro and Enterprise plans support multi-warehouse stock sync — you can check availability across every location in real time and record transfers between them without manual reconciliation.",
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
    question: "What if I outgrow the Starter plan?",
    answer:
      "You can upgrade to Pro or Enterprise at any time — your invoice numbering, party ledgers, and stock history all carry over, so switching plans doesn't mean starting over.",
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
    <section id="faq" className="py-24 md:py-32 bg-background">
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
              Everything you need to know about billing, security, and how the beta works.
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
