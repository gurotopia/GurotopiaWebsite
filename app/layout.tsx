import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import {
  WebsiteStructuredData,
  OrganizationStructuredData,
  SoftwareApplicationStructuredData,
} from "@/components/seo/structured-data";
import "fumadocs-ui/style.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gurotopia - Open Source Growtopia Private Server",
    template: "%s | Gurotopia",
  },
  description:
    "A lightweight, flexible Growtopia private server built from scratch with modern C++. Clean code, unique compiler, and maintained by a dedicated community. No bloated dependencies, truly open-source.",
  keywords: [
    "Growtopia",
    "private server",
    "open source",
    "C++",
    "Gurotopia",
    "game server",
    "growtopia ps",
    "growtopia private server source",
    "growtopia server",
    "gtps",
    "modern C++",
    "lightweight server",
    "from scratch",
    "growtopia source code",
  ],
  authors: [
    {
      name: "YoruAkio",
      url: "https://github.com/YoruAkio",
    },
  ],
  creator: "YoruAkio",
  publisher: "Gurotopia Community",
  metadataBase: new URL("https://gurotopia.yoruakio.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gurotopia.yoruakio.xyz",
    title: "Gurotopia - Open Source Growtopia Private Server",
    description:
      "A lightweight, flexible Growtopia private server built from scratch with modern C++. Clean code, unique compiler, and maintained by a dedicated community.",
    siteName: "Gurotopia",
    images: [
      {
        url: "https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/guro/og_image.png",
        width: 1200,
        height: 630,
        alt: "Gurotopia - Open Source Growtopia Private Server",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurotopia - Open Source Growtopia Private Server",
    description:
      "A lightweight, flexible Growtopia private server built from scratch with modern C++. Clean code, unique compiler, and maintained by a dedicated community.",
    images: [
      "https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/guro/og_image.png",
    ],
  },
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
  verification: {
    google: "",
    yandex: "",
    yahoo: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebsiteStructuredData />
        <OrganizationStructuredData />
        <SoftwareApplicationStructuredData />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="theme"
          enableSystem={false}
        >
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
