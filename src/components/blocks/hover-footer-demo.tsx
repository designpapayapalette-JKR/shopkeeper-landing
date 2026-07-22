"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ShieldCheck } from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Works With", href: "#works-with" },
      { label: "Blog", href: "/blog" },
      { label: "Mobile Apps", href: "#mobile-apps" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Contact Us", href: "mailto:hello@managemycounter.com" },
      { label: "Security Overview", href: "/security" },
    ],
  },
  {
    title: "Legal & Compliance",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Delete Account", href: "/delete-account" },
    ],
  },
];

const CONTACT_INFO = [
  {
    icon: <Mail size={18} className="text-[#0368FE]" />,
    text: "hello@managemycounter.com",
    href: "mailto:hello@managemycounter.com",
  },
  {
    icon: <Phone size={18} className="text-[#0368FE]" />,
    text: "+91 8287973084",
    href: "tel:+918287973084",
  },
  {
    icon: <MapPin size={18} className="text-[#0368FE]" />,
    text: "H-213, Sector 63 Rd, Electronic City, Noida, UP 201309",
  },
];

export function HoverFooter() {
  return (
    <footer className="bg-zinc-950 dark:bg-black border-t border-zinc-800 relative h-fit overflow-hidden pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12">
          {/* Brand section */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
                manage<span className="text-[#0368FE]">mycounter</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              GST billing, udhaar hisab-kitab, and a complete stock ERP — built for Indian retail counters, wholesale distributors, and field teams.
            </p>
            <div className="pt-2 text-xs text-zinc-500">
              <p>Developed by <span className="font-semibold text-zinc-300">PAPAYA PALETTE SOLUTIONS (OPC) PRIVATE LIMITED</span></p>
            </div>
          </div>

          {/* Link sections */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-base font-bold mb-4 tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 text-sm hover:text-[#0368FE] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 tracking-wide">
              Contact & Location
            </h4>
            <ul className="space-y-3">
              {CONTACT_INFO.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-xs md:text-sm text-zinc-400">
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#0368FE] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-zinc-800 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-zinc-500">
          <p>© {new Date().getFullYear()} managemycounter. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <Link href="/privacy" className="hover:text-[#0368FE]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0368FE]">Terms of Service</Link>
            <Link href="/security" className="hover:text-[#0368FE]">Security</Link>
          </div>
        </div>
      </div>

      {/* SVG Text Hover Effect */}
      <div className="lg:flex hidden h-[22rem] -mt-36 -mb-28 justify-center items-center">
        <TextHoverEffect text="MANAGEMYCOUNTER" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
