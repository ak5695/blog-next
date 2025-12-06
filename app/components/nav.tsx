"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const navItems = {
  "/": {
    name: "nav.home",
  },
  "/blog": {
    name: "nav.blog",
  },
  "/product": {
    name: "nav.product",
  },
  "/guestbook": {
    name: "nav.guestbook",
  },
  "/contact": {
    name: "nav.contact",
  },
};

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm tracking-tight border-b border-neutral-200 dark:border-neutral-800"
      style={{ height: "4rem" }}
    >
      <nav
        className="flex justify-between items-center max-w-2xl h-full fade scroll-pr-6 mx-auto px-4"
        id="nav"
      >
        <Image
          className="inline-block mr-4 cursor-pointer w-auto h-auto flex-shrink-0 invert dark:invert-0"
          src={"/freedom.png"}
          width={30}
          height={30}
          alt="freedom"
          priority
        />
        <div className="relative flex-1 min-w-0 h-full flex items-center mr-2 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
          <div className="flex flex-row items-center space-x-0 overflow-x-auto no-scrollbar w-full px-6">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.vibrate) {
                      navigator.vibrate(10);
                    }
                  }}
                  className="transition-all text-center hover:text-neutral-800 border-2 border-transparent rounded-xl hover:border-white hover:rounded-xl dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-0 active:scale-90 whitespace-nowrap"
                >
                  {t(name)}
                </Link>
              );
            })}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
        </div>
        <button
          onClick={() => {
            setLanguage(language === "zh" ? "en" : "zh");
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate(10);
            }
          }}
          className="flex-shrink-0 px-2 py-1 text-sm font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-90"
        >
          {language === "zh" ? "EN" : "中文"}
        </button>
      </nav>
    </header>
  );
}
