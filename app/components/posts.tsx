"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "app/blog/date";
import { useLanguage } from "app/context/LanguageContext";

export function BlogPosts({ posts }: { posts: any[] }) {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 10;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = posts.slice(start, end);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setPage((p) => p - 1);
    scrollToTop();
  };

  const handleNext = () => {
    setPage((p) => p + 1);
    scrollToTop();
  };

  return (
    <div>
      {currentPosts.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4 active:scale-[0.99] transition-transform"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full border-0 flex flex-col md:flex-row space-x-0 md:space-x-2 border-b-2 border-transparent hover:border-white ">
            <p className="text-neutral-600 dark:text-neutral-400 w-[150px] tabular-nums shrink-0">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-1">
              {language === "zh" && post.metadata.title_zh
                ? post.metadata.title_zh
                : post.metadata.title}
            </p>
          </div>
        </Link>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8 mb-8">
          {page > 1 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm"
            >
              {language === "zh" ? "← 上一页" : "← Previous"}
            </button>
          ) : (
            <div className="w-24" />
          )}

          <span className="text-sm text-neutral-500 font-mono">
            {page} / {totalPages}
          </span>

          {page < totalPages ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm"
            >
              {language === "zh" ? "下一页 →" : "Next →"}
            </button>
          ) : (
            <div className="w-24" />
          )}
        </div>
      )}
    </div>
  );
}
