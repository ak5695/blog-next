"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "app/context/LanguageContext";

export function BackButton() {
  const router = useRouter();
  const { language } = useLanguage();

  return (
    <button
      onClick={() => {
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
        router.back();
      }}
      className="mb-8 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-all active:scale-90 flex items-center text-sm"
    >
      <span className="mr-1">←</span>
      {language === "zh" ? "返回" : "Back"}
    </button>
  );
}
