"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, AlertCircle } from "lucide-react";
import { API_BASE } from "@/lib/config";
import { setMerchantSession } from "@/lib/merchantSession";
import { AuthLayout, AuthField, authInputClassName, authInputStyle } from "@/components/auth/AuthLayout";

// Beta-phase signup: the product isn't charging yet, so a new company can
// only be created with a valid invite code (issued from Super Admin →
// Beta Invites). This is the one place that flow actually exists — the
// landing page's CTAs point here instead of straight into the dashboard.
export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    const fromLink = searchParams.get("invite");
    if (fromLink) setInviteCode(fromLink.toUpperCase());
  }, [searchParams]);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/companies/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          firstName,
          lastName: lastName || undefined,
          email,
          password,
          state: state || undefined,
          inviteCode,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Registration failed. Check your invite code and try again.");
        return;
      }
      setMerchantSession(json.accessToken, json.refreshToken);
      window.location.href = "https://app.managemycounter.com/dashboard";
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      wide
      brandTag="Merchant Portal"
      panelHeading="Start your free trial"
      panelDescription="managemycounter is in private beta — every new business gets full access to every feature, no credit card required."
      features={[
        { label: "No credit card required", desc: "Full access to every feature" },
        { label: "Cancel or extend anytime", desc: "No long-term contracts" },
        { label: "Onboarding in minutes", desc: "Add products, staff, and start billing today" },
      ]}
      title="Start your free trial"
      subtitle={
        <>
          Private beta — you need an invite code to sign up. Ask whoever invited you, or{" "}
          <a href="mailto:hello@shopkeeper.app" className="text-primary font-bold">request access</a>.
        </>
      }
      footer={
        <p className="text-xs text-center" style={{ color: "var(--text-3)" }}>
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold">Log in</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField label="Invite Code *">
          <input required value={inviteCode} onChange={(e) => setInviteCode(e.target.value.toUpperCase())} placeholder="XXXX-XXXX" className={`${authInputClassName} font-mono tracking-widest`} style={authInputStyle} />
        </AuthField>
        <AuthField label="Business Name *">
          <input required value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={authInputClassName} style={authInputStyle} />
        </AuthField>
        <div className="grid grid-cols-2 gap-3">
          <AuthField label="First Name *">
            <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={authInputClassName} style={authInputStyle} />
          </AuthField>
          <AuthField label="Last Name">
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={authInputClassName} style={authInputStyle} />
          </AuthField>
        </div>
        <AuthField label="State">
          <input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Maharashtra" className={authInputClassName} style={authInputStyle} />
        </AuthField>
        <AuthField label="Email *">
          <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={authInputClassName} style={authInputStyle} />
        </AuthField>
        <AuthField label="Password *">
          <input required minLength={6} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={authInputClassName} style={authInputStyle} />
        </AuthField>

        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: "var(--red-dim)", border: "1px solid color-mix(in srgb, var(--red) 20%, transparent)" }}>
            <AlertCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--red)" }} />
            <p className="text-xs font-semibold" style={{ color: "var(--red)" }}>{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary w-full" style={{ opacity: loading ? 0.6 : 1 }}>
          {loading ? "Creating your account..." : "Start Free Trial"}
        </button>

        <ul className="pt-2 space-y-2">
          {["No credit card required", "Full access to every feature", "Cancel or extend anytime"].map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs font-medium" style={{ color: "var(--text-3)" }}>
              <Check size={13} className="text-primary shrink-0" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>
      </form>
    </AuthLayout>
  );
}
