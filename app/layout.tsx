import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { LanguageProvider } from "./context/LanguageContext";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Dufran's Blog | Tech, AI & Indie Development",
    template: "%s | Dufran's Blog",
  },
  description: "Exploring the intersection of AI, technology, and indie development. Thoughts on building products, personal growth, and navigating the future of work.",
  keywords: ["AI", "indie developer", "technology", "blog", "personal growth", "productivity", "Dufran"],
  authors: [{ name: "Dufran", url: baseUrl }],
  creator: "Dufran",
  publisher: "Dufran",
  openGraph: {
    title: "Dufran's Blog | Tech, AI & Indie Development",
    description: "Exploring the intersection of AI, technology, and indie development. Thoughts on building products, personal growth, and navigating the future.",
    url: baseUrl,
    siteName: "Dufran's Blog",
    locale: "zh_CN",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dufran's Blog",
    description: "Tech, AI & Indie Development insights",
    creator: "@dufran",
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
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `${baseUrl}/rss`,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <link rel="icon" href="/freedom.png" sizes="32x32" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Providers>
          <LanguageProvider>
            <main className="flex-1 max-w-2xl mx-auto mt-20 flex flex-col px-4 w-full">
              <Navbar />
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </Providers>
        <Analytics debug={false} />
        <SpeedInsights debug={false} />
      </body>
    </html>
  );
}
