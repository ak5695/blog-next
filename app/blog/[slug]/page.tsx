import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
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
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      {/* 上一篇/下一篇导航 */}
      <div className="flex justify-between items-center my-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
        {prevPost ? (
          <Link href={`/blog/${prevPost.slug}`} className=" underline">
            ← Prev：{prevPost.metadata.title}
          </Link>
        ) : (
          <span />
        )}
        {nextPost ? (
          <Link href={`/blog/${nextPost.slug}`} className="underline ">
            Next：{nextPost.metadata.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
      {/* 面包屑导航 */}
      {/* <nav className="mt-8 text-sm text-neutral-500 dark:text-neutral-400 flex items-center space-x-2">
        <Link href="/" className="hover:underline">
          home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline appearance-none">
          blog
        </Link>
        <span>/</span>
        <span className="font-medium text-neutral-700 dark:text-neutral-200">
          {post.metadata.title}
        </span>
      </nav> */}
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
