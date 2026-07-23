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
  "Indian ERP for dukaandars — GST billing, udhaar khata, inventory, and live field agent GPS tracking in one app. Built for kirana stores, wholesale shops, and retail chains. Free during beta.";
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
    "field agent tracking software India",
    "delivery boy GPS tracking app",
    "sales team tracking for retail business",
    "field force automation for kirana store",
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
      name: "PAPAYA PALETTE SOLUTIONS (OPC) PRIVATE LIMITED",
      legalName: "PAPAYA PALETTE SOLUTIONS (OPC) PRIVATE LIMITED",
      url: BASE_URL,
      logo: `${BASE_URL}/logo-icon.png`,
      description: DESCRIPTION,
      foundingDate: "2025",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91 8287973084",
        email: "hello@managemycounter.com",
        contactType: "customer support",
        availableLanguage: ["English", "Hindi"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "H-213, Sector 63 Rd, Electronic City",
        addressLocality: "Noida",
        addressRegion: "UP",
        postalCode: "201309",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: ["en", "hi"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#software`,
      name: "managemycounter - GST Billing & Inventory ERP",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, Web",
      description: DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        description: "Free during beta — full feature access, no credit card required",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need to know accounting to use this?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. If you can use WhatsApp, you can use managemycounter. There's no accounting jargon on screen — just billing, udhaar ka hisab, and stock, in the same language you already use at your counter. Your CA still gets proper GSTR-ready reports at month-end.",
          },
        },
        {
          "@type": "Question",
          name: "Is managemycounter really free during the beta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — every invited shop gets full access to all modules (POS, GST invoicing, multi-warehouse inventory, field-agent tracking, and reporting) at no cost while we're in private beta. No card required to sign up.",
          },
        },
        {
          "@type": "Question",
          name: "Does it handle CGST/SGST/IGST automatically?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tax is split automatically based on the customer's billing state versus your registered state, and every GST invoice is generated audit-ready — no manual CGST/SGST/IGST calculation needed.",
          },
        },
        {
          "@type": "Question",
          name: "Can I manage stock across more than one warehouse or store?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — multi-warehouse stock sync is included for every invited shop during the beta, no upgrade needed. Check availability across every location in real time and record transfers between them without manual reconciliation.",
          },
        },
        {
          "@type": "Question",
          name: "What happens to my data if I lose internet connectivity?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Android apps are built offline-first for Indian network conditions — staff can keep billing and recording attendance without a live connection, and everything syncs automatically once you're back online.",
          },
        },
      ],
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
