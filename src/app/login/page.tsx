"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { merchantLogin } from "@/lib/merchantSession";
import { AuthLayout, AuthField, authInputClassName, authInputStyle } from "@/components/auth/AuthLayout";

// Merchant Portal login — the web version of the app. Uses the exact same
// credentials (email/password) a company's owner/manager/staff already uses
// to sign into the mobile app, via the same /auth/login endpoint. This is a
// completely separate login from the SaaS Super Admin panel (/admin/login).
export default function MerchantLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await merchantLogin(email, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.location.href = "https://app.managemycounter.com/dashboard";
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      brandTag="Merchant Portal"
      panelHeading="managemycounter"
      panelDescription="GST billing, inventory, ledger, and field operations — everything an Indian retail business needs, in one place."
      features={[
        { label: "POS & GST billing", desc: "Retail and wholesale billing with auto HSN/GST" },
        { label: "Inventory & warehouse", desc: "Real-time stock across multiple locations" },
        { label: "Party ledger & credit", desc: "Track every customer and supplier balance" },
      ]}
      title="Log in to your business"
      subtitle="Use the same email and password you use to sign into the managemycounter mobile app."
      footer={
        <p className="text-xs text-center" style={{ color: "var(--text-3)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-bold">Start your free trial</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField label="Email">
          <input required type="email" autoFocus autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={authInputClassName} style={authInputStyle} />
        </AuthField>
        <AuthField label="Password">
          <input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={authInputClassName} style={authInputStyle} />
        </AuthField>

        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: "var(--red-dim)", border: "1px solid color-mix(in srgb, var(--red) 20%, transparent)" }}>
            <AlertCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--red)" }} />
            <p className="text-xs font-semibold" style={{ color: "var(--red)" }}>{error}</p>
          </div>
        )}

        <div className="flex items-center justify-end">
          <Link href="https://app.managemycounter.com/forgot-password" className="text-xs font-semibold text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full" style={{ opacity: loading ? 0.6 : 1 }}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthLayout>
  );
}
