import "./global.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, DotGothic16 } from "next/font/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { LanguageProvider } from "./context/LanguageContext";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";
import InkCursor from "./components/ui/InkCursor";
import { MatrixRain } from "./components/ui/MatrixRain";
import { InkSplash } from "./components/ui/InkSplash";

// Design-focused fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Pixel-style font for cyberpunk aesthetic - supports Chinese/Japanese/Latin
const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-pixel",
  display: "swap",
});

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
        spaceGrotesk.variable,
        jetbrainsMono.variable,
        dotGothic.variable
      )}
    >
      <head>
        <link rel="icon" href="/freedom.png" sizes="32x32" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        {/* Pixel font from Google Fonts CDN - DotGothic16 supports CJK */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative overflow-x-hidden selection:bg-neutral-800 selection:text-white">

        {/* === GLOBAL EFFECTS (DISABLED FOR PERFORMANCE) === */}
        {/* <InkCursor /> */}
        {/* <MatrixRain className="opacity-[0.03] dark:opacity-[0.05] fixed inset-0 z-[-1]" /> */}
        {/* 
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
          <InkSplash className="top-[-20%] left-[-20%] w-[80vw] h-[80vw]" delay={0} rotate={45} />
          <InkSplash className="bottom-[-20%] right-[-20%] w-[70vw] h-[70vw]" delay={1} rotate={-15} />
        </div>
        */}

        <NextTopLoader
          color="#333"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #333,0 0 5px #333"
        />
        <Providers>
          <LanguageProvider>
            <main className="flex-1 max-w-4xl mx-auto mt-14 md:mt-20 flex flex-col px-4 w-full z-10 relative min-w-0">
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
