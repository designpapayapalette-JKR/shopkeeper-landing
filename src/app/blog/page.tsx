import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — GST Billing, Inventory & ERP Tips for Indian Shopkeepers",
  description:
    "Practical guides on GST invoicing, udhaar management, inventory tracking, and digital billing for Indian retail and wholesale businesses. Written for the dukaandar, not the accountant.",
  openGraph: {
    title: "managemycounter Blog — Tips for Indian Shopkeepers",
    description:
      "Practical guides on GST, inventory, udhaar management, and going digital for Indian retail and wholesale shops.",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-black uppercase tracking-tight text-zinc-900 shrink-0"
            >
              <Image src="/logo-icon.png" alt="managemycounter" width={26} height={26} className="shrink-0" />
              managemycounter
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-zinc-900 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-zinc-50 border-b border-zinc-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-6">
              Guides for the Indian Shopkeeper
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              No accounting jargon. Just practical, actionable advice on GST billing, inventory management,
              udhaar tracking, and running a smoother shop — in the language you already use at your counter.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-zinc-200 p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-zinc-400">{post.readingTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 group-hover:text-primary transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">{post.date}</span>
                    <span className="text-xs font-bold text-zinc-900 group-hover:text-primary transition-colors">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} managemycounter. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
