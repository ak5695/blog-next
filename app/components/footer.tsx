"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <aside className="w-full z-50 tracking-tight py-6 mt-8 border-t border-neutral-200 dark:border-neutral-800">
      <footer className="flex justify-start items-center max-w-2xl md:overflow-auto scroll-pr-6 mx-auto px-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          © {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </footer>
    </aside>
  );
}
