import { MetadataRoute } from "next";
import { source } from "@/lib/source";

// @note generateSitemap creates sitemap.xml for search engines with all pages
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gurotopia.yoruakio.xyz";

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // @note add all docs pages to sitemap
  const pages = source.getPages();
  const docsRoutes: MetadataRoute.Sitemap = pages.map((page) => {
    const cleanUrl = page.url.startsWith("/docs") ? page.url : `/docs/${page.url}`;
    return {
      url: `${baseUrl}${cleanUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  return [...routes, ...docsRoutes];
}
