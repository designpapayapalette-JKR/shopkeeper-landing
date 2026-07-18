import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — managemycounter",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-black tracking-tight uppercase mb-8 text-zinc-900 dark:text-white">
          <Image src="/logo-icon.png" alt="managemycounter" width={22} height={22} className="shrink-0" />
          managemycounter
        </Link>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white mb-3">Privacy Policy</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          We're finalizing our full privacy policy documentation. In the meantime, if you have
          any questions about what data we collect or how it's used, email us directly and
          we'll answer within 4 hours.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <a href="mailto:hello@shopkeeper.app" className="text-sm font-bold text-primary hover:underline">
            hello@shopkeeper.app
          </a>
        </div>
      </div>
    </div>
  );
}
