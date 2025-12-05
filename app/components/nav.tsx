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
        className="flex justify-between items-center max-w-2xl h-full fade md:overflow-auto scroll-pr-6 mx-auto px-4"
        id="nav"
      >
        <div className="flex flex-row items-center space-x-0">
          <Image
            className="inline-block mr-4 cursor-pointer w-auto h-auto"
            src={"/freedom.png"}
            width={30}
            height={30}
            alt="freedom"
            priority
          ></Image>
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="transition-all text-center hover:text-neutral-800 border-2 border-transparent rounded-xl hover:border-white hover:rounded-xl dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-0 "
              >
                {t(name)}
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
          className="px-2 py-1 text-sm font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {language === "zh" ? "EN" : "中文"}
        </button>
      </nav>
    </header>
  );
}
