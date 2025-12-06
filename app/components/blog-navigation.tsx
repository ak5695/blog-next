"use client";

import Link from "next/link";
import { useLanguage } from "app/context/LanguageContext";

interface Post {
  slug: string;
  metadata: {
    title: string;
    title_zh?: string;
  };
}

export function BlogNavigation({
  prevPost,
  nextPost,
}: {
  prevPost: Post | null;
  nextPost: Post | null;
}) {
  const { language } = useLanguage();

  const getTitle = (post: Post) => {
    return language === "zh" && post.metadata.title_zh
      ? post.metadata.title_zh
      : post.metadata.title;
  };

  return (
    <div className="flex justify-between items-center my-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          onClick={() => navigator.vibrate?.(10)}
          className="flex flex-col text-left hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors max-w-[45%] active:scale-90 transform"
        >
          <span className="text-neutral-500 dark:text-neutral-400 text-sm mb-1">
            ← {language === "zh" ? "上一篇" : "Previous"}
          </span>
          <span className="underline truncate">{getTitle(prevPost)}</span>
        </Link>
      ) : (
        <span />
      )}
      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          onClick={() => navigator.vibrate?.(10)}
          className="flex flex-col text-right hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors max-w-[45%] active:scale-90 transform"
        >
          <span className="text-neutral-500 dark:text-neutral-400 text-sm mb-1">
            {language === "zh" ? "下一篇" : "Next"} →
          </span>
          <span className="underline truncate">{getTitle(nextPost)}</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
