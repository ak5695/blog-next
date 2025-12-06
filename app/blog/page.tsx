import { BlogPosts } from "app/components/posts";
import { getBlogPosts } from "app/blog/utils";
import { Pagination } from "app/components/pagination";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let allBlogs = getBlogPosts();

  // Sort posts by date
  allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const POSTS_PER_PAGE = 10;
  const totalPosts = allBlogs.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = allBlogs.slice(start, end);

  return (
    <section>
      <BlogPosts posts={currentPosts} />
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
}
