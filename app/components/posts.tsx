"use client";

import Link from "next/link";
import { formatDate } from "app/blog/date";
import { useLanguage } from "app/context/LanguageContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";

function BlogPostsContent({ posts }: { posts: any[] }) {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const POSTS_PER_PAGE = 10;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = posts.slice(start, end);

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePrev = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }
    updatePage(page - 1);
  };

  const handleNext = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }
    updatePage(page + 1);
  };

  return (
    <div>
      {currentPosts.map((post) => (
        <Link
          key={post.slug}
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate(15);
            }
          }}
          className="flex flex-col space-y-1 mb-4 active:scale-[0.95] active:bg-neutral-100 dark:active:bg-neutral-900 rounded-md p-2 -mx-2 transition-all"
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
              className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all text-sm active:scale-90 active:bg-neutral-300 dark:active:bg-neutral-600"
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
              className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all text-sm active:scale-90 active:bg-neutral-300 dark:active:bg-neutral-600"
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

export function BlogPosts({ posts }: { posts: any[] }) {
  return (
    <Suspense>
      <BlogPostsContent posts={posts} />
    </Suspense>
  );
}
