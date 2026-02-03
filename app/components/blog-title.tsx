"use client";

import { useLanguage } from "app/context/LanguageContext";

export function BlogTitle({
  title,
  title_zh,
}: {
  title: string;
  title_zh?: string;
}) {
  const { language } = useLanguage();

  return (
    <h1 className="title font-semibold text-2xl tracking-tighter">
      {language === "zh" && title_zh ? title_zh : title}
    </h1>
  );
}

export function BlogSummary({
  summary,
  summary_zh,
}: {
  summary: string;
  summary_zh?: string;
}) {
  const { language } = useLanguage();
  const content = language === "zh" && summary_zh ? summary_zh : summary;

  if (!content) return null;

  return (
    <div className="mb-8 p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md text-neutral-600 dark:text-neutral-400 italic">
      {content}
    </div>
  );
}
