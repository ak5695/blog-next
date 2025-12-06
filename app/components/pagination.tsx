"use client";

import Link from "next/link";
import { useLanguage } from "app/context/LanguageContext";

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const { language } = useLanguage();

  return (
    <div className="flex justify-between items-center mt-8 mb-8">
      {page > 1 ? (
        <Link
          href={`/blog?page=${page - 1}`}
          className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm"
        >
          {language === "zh" ? "← 上一页" : "← Previous"}
        </Link>
      ) : (
        <div className="w-24" />
      )}

      <span className="text-sm text-neutral-500 font-mono">
        {language === "zh"
          ? `${page} / ${totalPages}`
          : `${page} / ${totalPages}`}
      </span>

      {page < totalPages ? (
        <Link
          href={`/blog?page=${page + 1}`}
          className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm"
        >
          {language === "zh" ? "下一页 →" : "Next →"}
        </Link>
      ) : (
        <div className="w-24" />
      )}
    </div>
  );
}
