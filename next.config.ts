import type { NextConfig } from "next";

const API_UPSTREAM = process.env.NEXT_PUBLIC_API_URL || "https://api.managemycounter.com";
const SELF = "'self'";
const SCRIPT_SRC =
  process.env.NODE_ENV === "development"
    ? `${SELF} 'unsafe-inline' 'unsafe-eval'`
    : `${SELF} 'unsafe-inline'`;

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
              `script-src ${SCRIPT_SRC}`,
              `style-src ${SELF} 'unsafe-inline' https://fonts.googleapis.com`,
              `font-src ${SELF} https://fonts.gstatic.com`,
              `img-src ${SELF} data: blob:`,
              `connect-src ${SELF} https://api.managemycounter.com ${API_UPSTREAM}`,
              "frame-ancestors 'none'",
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
