import { BlogPosts } from "app/components/posts";
import { getBlogPosts } from "app/blog/utils";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  let allBlogs = getBlogPosts();

  // Sort posts by date
  allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  // Remove content to reduce payload size
  const postsWithoutContent = allBlogs.map((post) => ({
    ...post,
    content: "",
  }));

  return (
    <section>
      <BlogPosts posts={postsWithoutContent} />
    </section>
  );
}
