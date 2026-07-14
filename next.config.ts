import type { NextConfig } from "next";

const API_UPSTREAM = process.env.NEXT_PUBLIC_API_URL || "https://api.papayapalette.online";
const SELF = "'self'";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), fullscreen=(self)" },
          {
            key: "Content-Security-Policy",
            value: [
              `default-src ${SELF}`,
              `script-src ${SELF} 'unsafe-inline' 'unsafe-eval'`,
              `style-src ${SELF} 'unsafe-inline' https://fonts.googleapis.com`,
              `font-src ${SELF} https://fonts.gstatic.com`,
              `img-src ${SELF} data: blob:`,
              `connect-src ${SELF} https://api.papayapalette.online ${API_UPSTREAM}`,
              `frame-ancestors ${SELF}`,
              `base-uri ${SELF}`,
              `form-action ${SELF}`,
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;