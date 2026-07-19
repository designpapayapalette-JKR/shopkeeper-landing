import type { MetadataRoute } from "next";

const BASE_URL = "https://managemycounter.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/delete-account", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
