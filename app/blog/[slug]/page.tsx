import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomMDX } from "app/components/mdx";
import { getBlogPosts } from "app/blog/utils";
import { formatDate } from "app/blog/date";
import { baseUrl } from "app/sitemap";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

import { BlogTitle, BlogSummary } from "app/components/blog-title";
import { BlogNavigation } from "app/components/blog-navigation";
import { Comments } from "app/components/comments";

export default function Blog({ params }) {
  const posts = getBlogPosts();
  const currentIndex = posts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  let post = posts[currentIndex];

  if (!post) {
    notFound();
  }

  return (
    <section>
      <BlogTitle
        title={post.metadata.title}
        title_zh={post.metadata.title_zh}
      />
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <BlogSummary
        summary={post.metadata.summary}
        summary_zh={post.metadata.summary_zh}
      />
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      {/* 上一篇/下一篇导航 */}
      <BlogNavigation prevPost={prevPost} nextPost={nextPost} />
      <Comments slug={post.slug} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
    </section>
  );
}
