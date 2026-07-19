import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_NAME = "managemycounter";
const TITLE = "managemycounter - GST Billing, Khata & Stock ERP App for Indian Shopkeepers";
const DESCRIPTION =
  "Indian ERP for dukaandars — GST billing, udhaar khata, inventory, and field team tracking in one app. Built for kirana stores, wholesale shops, and retail chains. Free during beta.";
const BASE_URL = "https://managemycounter.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "GST billing software India",
    "khata app for shopkeepers",
    "udhaar ledger app",
    "inventory management software India",
    "kirana store billing app",
    "Indian ERP for small business",
    "POS billing system India",
    "barcode billing software",
    "multi-warehouse inventory",
    "field agent tracking",
    "GST invoice generator",
    "retail billing software",
    "wholesale billing app",
    "managemycounter",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    alternateLocale: "hi_IN",
    url: BASE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      logo: `${BASE_URL}/logo-icon.png`,
      description: DESCRIPTION,
      foundingDate: "2025",
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@managemycounter.com",
        contactType: "customer support",
        availableLanguage: ["English", "Hindi"],
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      // `sameAs` deliberately omitted — no verified social profiles exist yet.
      // Add real URLs here once the accounts are actually created; a wrong or
      // invented profile in schema.org markup is worse than no entry at all.
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: ["en", "hi"],
      // No SearchAction — there's no on-site search endpoint to point it at.
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#software`,
      name: "managemycounter - GST Billing & Inventory ERP",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, Web",
      description: DESCRIPTION,
      // The page currently has no pricing tiers — every invited shop gets the
      // full ERP free during beta (see the "About" section). Claiming paid
      // tiers here that don't exist on the page would be exactly the kind of
      // structured-data/page mismatch Google's rich-result guidelines penalize.
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        description: "Free during beta — full feature access, no credit card required",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-bg text-text font-sans">
        {children}
      </body>
    </html>
  );
}
