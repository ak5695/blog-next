"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "app/context/LanguageContext";
import { useEffect, useState } from "react";

export function FloatingBackButton() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => {
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
        router.back();
      }}
      className={`fixed bottom-8 left-8 z-50 p-4 rounded-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:scale-110 active:scale-90 active:bg-neutral-100 dark:active:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      title={language === "zh" ? "返回上一页" : "Go Back"}
      aria-label={language === "zh" ? "返回上一页" : "Go Back"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
