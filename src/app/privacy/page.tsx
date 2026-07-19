import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — managemycounter",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white mb-3">{title}</h2>
      <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-black tracking-tight uppercase mb-8 text-zinc-900 dark:text-white">
          <Image src="/logo-icon.png" alt="managemycounter" width={22} height={22} className="shrink-0" />
          managemycounter
        </Link>

        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-10">Last updated: 19 July 2026</p>

        <Section title="Overview">
          <p>
            managemycounter (&quot;we&quot;, &quot;us&quot;) provides GST billing, inventory, and
            staff-management software for Indian retail and wholesale shops, delivered through our
            web dashboard (app.managemycounter.com) and our mobile apps — managemycounter (for
            owners, managers, and billing staff) and managemycounter Agent (for field/delivery
            staff). This policy explains what data we collect, why, and how you can control it.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p><strong className="text-zinc-800 dark:text-zinc-200">Account &amp; business information:</strong> name, email, phone number, password (stored hashed, never in plain text), role, and — for the business owner — company name, GSTIN, address, and bank/UPI details used to generate invoices.</p>
          <p><strong className="text-zinc-800 dark:text-zinc-200">Business records you create:</strong> invoices, purchases, products, stock levels, customer/supplier (party) records, and ledger entries. This data belongs to your business; we process it to provide the service.</p>
          <p><strong className="text-zinc-800 dark:text-zinc-200">Location data:</strong> the main managemycounter app uses your device&apos;s location, while the app is open, to verify checkout details. The managemycounter Agent app — used by field/delivery staff — additionally collects location <em>in the background</em>, including when the app is closed, to track delivery progress, coordinate field operations, and verify attendance check-ins. Background location is only requested from field-agent accounts and only while a company enables field tracking for that role.</p>
          <p><strong className="text-zinc-800 dark:text-zinc-200">Camera:</strong> used only when you choose to scan a product barcode or photograph a document/receipt (e.g. for an expense claim). We don&apos;t access the camera in the background.</p>
          <p><strong className="text-zinc-800 dark:text-zinc-200">Bluetooth:</strong> used to discover and connect to thermal receipt printers you pair with the app. We don&apos;t use Bluetooth for any other purpose.</p>
          <p><strong className="text-zinc-800 dark:text-zinc-200">Device &amp; usage data:</strong> a push-notification token (to deliver alerts like low-stock or payment reminders) and standard technical data (app version, device type, crash logs) used to keep the service reliable.</p>
        </Section>

        <Section title="How We Use Your Information">
          <p>To provide the core service — billing, inventory, GST-compliant reporting, staff attendance/payroll, and field-team coordination. To send transactional notifications (OTPs, password resets, invoice copies, low-stock and payment alerts). To provide customer support. To maintain the security of your account, including detecting fraudulent logins.</p>
          <p>We do not sell your data, and we do not use your business or customer data to serve third-party advertising.</p>
        </Section>

        <Section title="Who We Share Data With">
          <p>We share data only with service providers who help us run the platform, under contracts that limit their use of it to that purpose: our database and application hosting providers, our transactional email provider (for OTPs, receipts, and notifications), and — if your company uses e-invoicing/e-way bill features — the government GST/e-invoice systems those features are required to interact with.</p>
          <p>We may disclose data if required by law, or to protect the rights, property, or safety of managemycounter, our users, or the public.</p>
        </Section>

        <Section title="Data Retention">
          <p>We retain your account data for as long as your account is active. Financial records such as invoices are retained for the period required under Indian tax law (GST records must generally be retained for a minimum statutory period), even after an account deletion request, unless deletion is legally permitted sooner.</p>
        </Section>

        <Section title="Your Rights — Access, Correction &amp; Deletion">
          <p>You can review and correct most of your account and business data directly from the app or web dashboard. To request deletion of your personal account or your company&apos;s data, use the in-app &quot;Delete My Account&quot; option (Settings) or our{" "}
            <Link href="/delete-account" className="text-primary font-semibold hover:underline">web deletion request form</Link> — no login required. We process deletion requests within 30 days, subject to the statutory retention noted above.
          </p>
        </Section>

        <Section title="Security">
          <p>Passwords are hashed, not stored in plain text. Data in transit is encrypted (HTTPS/TLS). Access to your company&apos;s data is scoped by role and outlet, so staff only see what their role requires.</p>
        </Section>

        <Section title="Children's Privacy">
          <p>managemycounter is a business tool intended for shop owners and their staff. It is not directed at, and we do not knowingly collect data from, children under 18.</p>
        </Section>

        <Section title="Changes to This Policy">
          <p>We may update this policy as the product evolves. Material changes will be reflected here with an updated &quot;Last updated&quot; date.</p>
        </Section>

        <Section title="Contact Us">
          <p>Questions about this policy or your data? Email us at{" "}
            <a href="mailto:hello@managemycounter.com" className="text-primary font-semibold hover:underline">hello@managemycounter.com</a> and we&apos;ll respond within 4 hours.
          </p>
        </Section>

        <div className="mt-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
