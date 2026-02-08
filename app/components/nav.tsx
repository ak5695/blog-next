"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { GlitchText } from "./ui/GlitchText";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Standardized Route Map matches LanguageContext keys
  const navItems = [
    { path: "/", labelKey: "nav.home" },
    { path: "/blog", labelKey: "nav.blog" },
    { path: "/product", labelKey: "nav.product" },
    { path: "/guestbook", labelKey: "nav.guestbook" },
    { path: "/about", labelKey: "nav.about" }, // Ensure key exists or define fallback
    { path: "/contact", labelKey: "nav.contact" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800 group/nav"
      style={{ height: "4rem" }}
    >
      <nav suppressHydrationWarning className="flex justify-between items-center max-w-5xl h-full mx-auto px-4 md:px-6 relative">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="w-8 h-8 relative overflow-hidden bg-white text-black font-black flex items-center justify-center text-xl">
            <span className="group-hover:animate-spin">D</span>
          </div>
          <span className="font-mono text-lg font-bold tracking-tighter text-white hidden sm:block">
            <GlitchText text="DUFRAN.CN" />
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex flex-row items-center space-x-1">
          {navItems.map(({ path, labelKey }) => {
            const isActive = pathname === path || (path !== "/" && pathname.startsWith(path));
            // Allow simple fallback if translation key missing (e.g. nav.about might need adding to context)
            const label = t(labelKey) === labelKey && labelKey === "nav.about" ? "About" : t(labelKey);

            return (
              <Link
                key={path}
                href={path}
                className={`relative px-3 py-2 font-mono font-bold text-xs uppercase tracking-widest transition-colors
                    ${isActive
                    ? "text-white bg-neutral-900/80"
                    : "text-neutral-500 hover:text-white hover:bg-neutral-900/50"
                  }
                  `}
              >
                {/* Corner Targeting Brackets for Active Item */}
                {isActive && (
                  <>
                    <div className="absolute top-0 left-0 w-2 h-2 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                      <div className="absolute top-0 left-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    </div>
                    <div className="absolute top-0 right-0 w-2 h-2 pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                      <div className="absolute top-0 right-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 pointer-events-none">
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                      <div className="absolute bottom-0 left-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 pointer-events-none">
                      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                      <div className="absolute bottom-0 right-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    </div>
                  </>
                )}
                <span suppressHydrationWarning>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4 z-50">
          {/* LANG TOGGLE */}
          <button
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
            className="px-2 py-1 text-[10px] font-mono font-bold text-neutral-400 border border-neutral-800 hover:border-neutral-500 hover:text-white transition-all bg-black uppercase"
          >
            <span suppressHydrationWarning>[ {language === "zh" ? "CN" : "EN"} ]</span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden ml-4">
            <button
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-[4rem] left-0 w-full h-[calc(100vh-4rem)] bg-black/95 border-b border-neutral-800 p-6 flex flex-col gap-4 md:hidden shadow-2xl overflow-y-auto"
          >
            {navItems.map(({ path, labelKey }) => {
              const label = t(labelKey) === labelKey && labelKey === "nav.about" ? (language === "zh" ? "关于" : "About") : t(labelKey);
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 text-xl font-mono text-neutral-300 hover:text-[rgb(255,82,87)] border-l-2 border-transparent hover:border-[rgb(255,82,87)] pl-6 transition-all bg-neutral-900/0 hover:bg-neutral-900/50"
                  suppressHydrationWarning
                >
                  {label}
                </Link>
              )
            })}
          </motion.div>
        )}

      </nav>
    </motion.header>
  );
}
// Force revalidation
