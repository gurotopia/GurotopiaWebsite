// @note generateStructuredData creates JSON-LD structured data for search engines
export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gurotopia",
    description:
      "A lightweight, flexible Growtopia private server built from scratch with modern C++",
    url: "https://gurotopia.yoruakio.xyz",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://gurotopia.yoruakio.xyz/docs?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// @note generateOrganizationData creates organization structured data
export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gurotopia",
    url: "https://gurotopia.yoruakio.xyz",
    logo: "https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/guro/logo.png",
    sameAs: ["https://github.com/gurotopia", "https://discord.gg/zzWHgzaF7J"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// @note generateBreadcrumbData creates breadcrumb structured data for docs pages
export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// @note generateSoftwareApplicationData creates software application structured data
export function SoftwareApplicationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gurotopia",
    applicationCategory: "GameServer",
    operatingSystem: "Windows, Linux",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A lightweight, flexible Growtopia private server built from scratch with modern C++",
    url: "https://gurotopia.yoruakio.xyz",
    downloadUrl: "https://github.com/gurotopia",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
