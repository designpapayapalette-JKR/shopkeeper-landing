import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://managemycounter.com";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | managemycounter Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | managemycounter Blog`,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
  };
}

// Converts inline **bold** spans to <strong> — used on every line type below,
// since most list items/paragraphs in blog-posts.ts bold a key term mid-sentence
// rather than wrapping the whole line (e.g. "- **Tax Invoice** — used for...").
function inlineBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function formatContent(content: string): string {
  const lines = content.split("\n");
  const html: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const line of lines) {
    const isOrdered = /^[1-4]\. /.test(line);
    const isUnordered = line.startsWith("- ");

    if (isOrdered || isUnordered) {
      const wantType = isOrdered ? "ol" : "ul";
      if (listType !== wantType) {
        closeList();
        html.push(wantType === "ol" ? '<ol class="mb-4 space-y-1">' : '<ul class="mb-4 space-y-1">');
        listType = wantType;
      }
      const text = isOrdered ? line.slice(3) : line.slice(2);
      const listClass = isOrdered ? "list-decimal" : "list-disc";
      html.push(`<li class="ml-6 ${listClass} text-zinc-700 leading-relaxed">${inlineBold(text)}</li>`);
      continue;
    }

    closeList();
    if (line.startsWith("## ")) { html.push(`<h2 class="text-2xl font-bold text-zinc-900 mt-10 mb-4">${inlineBold(line.slice(3))}</h2>`); continue; }
    if (line.startsWith("### ")) { html.push(`<h3 class="text-xl font-bold text-zinc-900 mt-8 mb-3">${inlineBold(line.slice(4))}</h3>`); continue; }
    if (line.trim() === "") continue;
    // A line entirely wrapped in ** (e.g. an FAQ-style question) gets its own
    // emphasized paragraph instead of being treated as inline bold.
    if (line.startsWith("**") && line.endsWith("**") && line.slice(2, -2).indexOf("**") === -1) {
      html.push(`<p class="font-bold text-zinc-900 mt-6 mb-2">${line.slice(2, -2)}</p>`);
      continue;
    }
    html.push(`<p class="text-zinc-700 leading-relaxed mb-4">${inlineBold(line)}</p>`);
  }
  closeList();
  return html.join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const htmlContent = formatContent(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "managemycounter",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Nav */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-lg font-black uppercase tracking-tight text-zinc-900 shrink-0">
              <Image src="/logo-icon.png" alt="managemycounter" width={26} height={26} className="shrink-0" />
              managemycounter
            </Link>
            <Link
              href="/blog"
              className="text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-zinc-900 transition-colors"
            >
              ← All Articles
            </Link>
          </div>
        </div>
      </header>

      <main>
        <article className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-zinc-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-zinc-600 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-zinc-600 truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-zinc-400">{post.readingTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span>{post.author}</span>
                <span>·</span>
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </header>

            {/* Content */}
            <div
              className="max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </article>
      </main>

      {/* Blog Footer */}
      <section className="bg-zinc-50 border-t border-zinc-200 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-zinc-900 mb-4">Ready to try managemycounter?</h2>
          <p className="text-zinc-600 mb-8">
            GST billing, udhaar khata, stock management — all in one app. Free during beta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://app.managemycounter.com/register"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
            >
              Try for Free
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-600 text-sm font-bold hover:text-zinc-900 transition-colors"
            >
              ← More Articles
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} managemycounter. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 transition-colors">Terms of Service</Link>
              <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
