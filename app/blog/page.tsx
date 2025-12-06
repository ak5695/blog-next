import { BlogPosts } from "app/components/posts";
import { getBlogPostsMetadata } from "app/blog/utils";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  let allBlogs = getBlogPostsMetadata();

  // Sort posts by date
  allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section>
      <BlogPosts posts={allBlogs} />
    </section>
  );
}
