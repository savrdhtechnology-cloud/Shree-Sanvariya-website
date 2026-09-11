import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.shreesanvariya.co.in";
  const paths = ["/", "/about-us", "/products", "/testimonials", "/contact-us", "/site-map", "/privacy-policy", "/terms-and-conditions"];
  return paths.map((path, index) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: index === 0 ? 1 : 0.7,
  }));
}
