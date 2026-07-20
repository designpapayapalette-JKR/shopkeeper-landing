"use client";

import React from "react";
import Image from "next/image";

export interface AuthFeature {
  label: string;
  desc: string;
}

export interface AuthLayoutProps {
  /** Small text under the logo on the form side, e.g. "Merchant Portal" */
  brandTag: string;
  /** Heading on the decorative left panel, e.g. "managemycounter Admin" */
  panelHeading: string;
  /** Description on the decorative left panel */
  panelDescription: string;
  /** Bulleted feature list on the decorative left panel */
  features: AuthFeature[];
  /** Form heading, e.g. "Sign in" */
  title: string;
  /** Form subheading */
  subtitle: React.ReactNode;
  /** The actual form + any tabs/links — kept scenario-specific */
  children: React.ReactNode;
  /** Optional footer content below the form (e.g. "Back to merchant portal") */
  footer?: React.ReactNode;
  /** Wider form column for screens with more fields (e.g. register) */
  wide?: boolean;
}

// Same shell as shopkeeper-web's AuthLayout (src/components/auth/AuthLayout.tsx)
// — duplicated here since this is a separate Next.js deployment with no
// shared package between them. Keep both in sync if the design changes;
// every login/register screen across the product (this app's + the
// dashboard app's) should stay visually identical, only copy differs.
export function AuthLayout({
  brandTag,
  panelHeading,
  panelDescription,
  features,
  title,
  subtitle,
  children,
  footer,
  wide,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 items-center justify-center p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 text-white max-w-md">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-8 border border-white/10 overflow-hidden">
            <Image src="/logo-icon-white.png" alt="managemycounter" width={40} height={40} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">{panelHeading}</h2>
          <p className="text-emerald-100/80 text-base leading-relaxed mb-8">{panelDescription}</p>
          {features.length > 0 && (
            <div className="space-y-4">
              {features.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5 shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-emerald-100/60">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className={`w-full ${wide ? "max-w-md" : "max-w-sm"}`}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden" style={{ background: "var(--primary)" }}>
              <Image src="/logo-icon-white.png" alt="managemycounter" width={40} height={40} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--text)" }}>managemycounter</div>
              <div className="text-xs font-medium" style={{ color: "var(--text-3)" }}>{brandTag}</div>
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight mb-1" style={{ color: "var(--text)" }}>{title}</h1>
          <p className="text-sm mb-8" style={{ color: "var(--text-3)" }}>{subtitle}</p>

          {children}

          {footer && (
            <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AuthField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-2)" }}>{label}</label>
      {children}
    </div>
  );
}

export const authInputClassName = "k-input";
export const authInputStyle: React.CSSProperties = { padding: "10px 14px", fontSize: "0.9rem" };
