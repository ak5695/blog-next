import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomMDX } from "app/components/mdx";
import { getBlogPosts } from "app/blog/utils";
import { formatDate } from "app/blog/date";
import { baseUrl } from "app/sitemap";
import dynamic from "next/dynamic";
import { BlogTitle, BlogSummary } from "app/components/blog-title";
import { BlogNavigation } from "app/components/blog-navigation";
import { TerminalBlock } from "app/components/ui/TerminalBlock";

export const revalidate = 604800 // Revalidate every week

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);
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

const Comments = dynamic(() => import("app/components/comments").then(mod => mod.Comments), {
  loading: () => <div className="mt-12 pt-8 animate-pulse bg-neutral-900 h-40 rounded-md" />
});

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  let post = posts[currentIndex];

  if (!post) {
    notFound();
  }

  return (
    <section className="py-8 md:py-20 max-w-5xl mx-auto px-0 md:px-8">

      {/* Breadcrumb / CLI Path */}
      <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-500">
        <Link href="/blog" className="hover:text-[rgb(255,82,87)] transition-colors">~/blog</Link>
        <span>/</span>
        <span className="text-neutral-300 break-all">{post.slug}.md</span>
      </div>

      <TerminalBlock
        title={`${post.slug}.md`}
        tabs={[`${post.slug}.md`]}
        activeTab={`${post.slug}.md`}
        className="w-full bg-black/95 backdrop-blur-3xl border-neutral-800 shadow-2xl relative overflow-hidden"
      >
        {/* Reader Content - Ensuring high contrast and readability */}
        {/* ADDED: prose-invert (mandatory for dark mode), prose-lg (larger text), and explicit text colors */}
        <div className="md:p-8">
          <div className="border-b border-neutral-800 pb-8 mb-8">
            <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-white mb-4 break-words">
              {post.metadata.title}
            </h1>

            <div className="flex flex-col md:flex-row justify-between md:items-center text-xs font-mono text-neutral-500 uppercase tracking-widest gap-2">
              <span>AUTHOR: DUFRAN</span>
              <span>PUBLISHED: {formatDate(post.metadata.publishedAt)}</span>
            </div>
          </div>

          <div className="mb-8">
            <BlogSummary
              summary={post.metadata.summary}
              summary_zh={post.metadata.summary_zh} // Dual language support
            />
          </div>

          <article className="prose prose-invert prose-neutral prose-lg md:prose-xl max-w-none text-neutral-300 leading-loose md:leading-[2.8] tracking-wide md:tracking-widest prose-headings:text-white prose-headings:font-bold prose-headings:mb-4 md:prose-headings:mb-10 prose-p:text-neutral-300 prose-p:my-6 md:prose-p:my-12 prose-li:my-4 md:prose-li:my-6 prose-a:text-[rgb(255,82,87)] hover:prose-a:text-[rgb(255,120,120)] prose-code:text-[rgb(255,120,120)] prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 font-sans break-words">
            <CustomMDX source={post.content} />
          </article>
        </div>

        {/* Navigation Footer */}
        <div className="mt-0 p-4 md:p-8 border-t border-dashed border-neutral-800 bg-neutral-900/30">
          <BlogNavigation prevPost={prevPost} nextPost={nextPost} />
          <div className="mt-8">
            <Comments slug={post.slug} />
          </div>
        </div>

      </TerminalBlock>

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
              name: "Dufran",
            },
          }),
        }}
      />
    </section>
  );
}
// Force revalidation for layout changes
