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
    default: "Seek Freedom",
    template: "",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My Portfolio",
    description: "I'm Dufran,This is my portfolio.",
    url: baseUrl,
    siteName: "I'm Dufran",
    locale: "en_US",
    type: "website",
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
