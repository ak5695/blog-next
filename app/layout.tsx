import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

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
      <body className="antialiased h-screen flex flex-col max-w-xl lg:mx-auto">
        <main className="flex-1 min-w-0 flex flex-col justify-start mt-[4rem] px-2 md:px-0">
          <Navbar />
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
