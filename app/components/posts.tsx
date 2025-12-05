"use client";

import Link from "next/link";
import { formatDate } from "app/blog/date";
import { useLanguage } from "app/context/LanguageContext";

export function BlogPosts({ posts }: { posts: any[] }) {
  const { language } = useLanguage();

  return (
    <div>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
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
    </div>
  );
}
