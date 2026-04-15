import type { MetadataRoute } from "next";
import { houses } from "@/data/houses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://unitbud.com";

  const housePages = houses.map((h) => ({
    url: `${baseUrl}/house/${h.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...housePages,
  ];
}
