"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Store, AlertCircle } from "lucide-react";
import { merchantLogin } from "@/lib/merchantSession";

// Merchant Portal login — the web version of the app. Uses the exact same
// credentials (email/password) a company's owner/manager/staff already uses
// to sign into the mobile app, via the same /auth/login endpoint. This is a
// completely separate login from the SaaS Super Admin panel (/admin/login).
export default function MerchantLoginPage() {
  const router = useRouter();
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
      router.push("/dashboard");
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

        <h1 className="text-2xl font-semibold tracking-tight mb-2">Log in to your business</h1>
        <p className="text-sm text-text-secondary font-medium mb-8">
          Use the same email and password you use to sign into the Shopkeeper mobile app.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Email</label>
            <input
              required
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="k-input mt-1.5"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="k-input mt-1.5"
            />
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-xs text-text-secondary font-medium text-center mt-8">
          Don&apos;t have an account?{" "}
          <Link href="https://app.papayapalette.online/register" className="text-primary font-bold">Start your free trial</Link>
        </p>
      </div>
    </div>
  );
}
