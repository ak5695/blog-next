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
    <div className="mb-8 p-4 bg-[var(--surface-muted)] border border-[var(--border)] rounded-md text-[var(--ink-medium)] italic">
      {content}
    </div>
  );
}
