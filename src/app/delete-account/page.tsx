"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { API_BASE } from "@/lib/config";

export default function DeleteAccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scope, setScope] = useState<"own_account" | "entire_company">("own_account");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/account/deletion-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          scope,
          reason: reason.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again or email us directly.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-black tracking-tight uppercase mb-8 text-zinc-900 dark:text-white">
          <Image src="/logo-icon.png" alt="managemycounter" width={22} height={22} className="shrink-0" />
          managemycounter
        </Link>

        {submitted ? (
          <div className="text-center">
            <CheckCircle2 size={40} className="mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white mb-3">Request received</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              We&apos;ve emailed you a confirmation at {email}. We process account deletion requests
              within 30 days — a few records (like GST invoices) may be retained longer where the
              law requires it.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              <ArrowLeft size={16} /> Back to home
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white mb-3">Delete your account</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Use this form to request deletion of your managemycounter account and data — no login
              required. You can also do this from inside the app: Settings &gt; Delete My Account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">Your name *</label>
                <input
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">Account email *</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">Phone (optional)</label>
                <input
                  type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">What do you want deleted? *</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setScope("own_account")}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      scope === "own_account" ? "bg-primary border-primary text-white" : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Just my personal account
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope("entire_company")}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      scope === "entire_company" ? "bg-primary border-primary text-white" : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    My entire company&apos;s data
                  </button>
                </div>
                {scope === "entire_company" && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                    Only the account owner can request this. We&apos;ll verify ownership before processing.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">Reason (optional)</label>
                <textarea
                  value={reason} onChange={(e) => setReason(e.target.value)} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
              <button
                type="submit" disabled={submitting}
                className="w-full py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Deletion Request"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                <ArrowLeft size={16} /> Back to home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
