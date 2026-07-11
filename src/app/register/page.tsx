"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Store, Check, AlertCircle } from "lucide-react";
import { API_BASE } from "@/lib/config";
import { setMerchantSession } from "@/lib/merchantSession";

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

  // A shared invite link can carry the code (?invite=XXXX-XXXX) so the
  // recipient doesn't have to type it in manually.
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
      window.location.href = "https://app.papayapalette.online/dashboard";
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-black tracking-tight uppercase mb-8">
          <Store size={20} className="text-primary" strokeWidth={2.5} />
          Shopkeeper
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight mb-2">Start your free trial</h1>
        <p className="text-sm text-text-secondary font-medium mb-8">
          Shopkeeper is in private beta — you need an invite code to sign up. Ask whoever invited you, or{" "}
          <a href="mailto:hello@shopkeeper.app" className="text-primary font-bold">request access</a>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Invite Code *</label>
            <input
              required
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="XXXX-XXXX"
              className="k-input mt-1.5 font-mono tracking-widest"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Business Name *</label>
            <input required value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="k-input mt-1.5" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">First Name *</label>
              <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="k-input mt-1.5" />
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="k-input mt-1.5" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">State</label>
            <input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Maharashtra" className="k-input mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Email *</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="k-input mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Password *</label>
            <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="k-input mt-1.5" />
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-radius p-3">
              <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:opacity-95 text-white dark:text-background font-bold text-sm py-3.5 rounded-radius transition-all uppercase tracking-wider"
          >
            {loading ? "Creating your account..." : "Start Free Trial"}
          </button>

          <ul className="pt-2 space-y-2">
            {["No credit card required", "Full access to every feature", "Cancel or extend anytime"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                <Check size={13} className="text-primary shrink-0" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </form>

        <p className="text-xs text-text-secondary font-medium text-center mt-8">
          Already have an account?{" "}
          <Link href="https://app.papayapalette.online/dashboard" className="text-primary font-bold">Log in</Link>
        </p>
      </div>
    </div>
  );
}
