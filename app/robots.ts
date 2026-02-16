// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/panel", "/not-found", "/privacy"],
    },
    sitemap: "https://hataymobilyam.com/sitemap.xml",
  };
}
