import { BlogPosts } from "app/components/posts";
import { getBlogPosts } from "app/blog/utils";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <BlogPosts posts={allBlogs} />
    </section>
  );
}
