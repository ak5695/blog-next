import { getBlogPostsMetadata } from "app/blog/utils";
import { BlogTerminal } from "./components/BlogTerminal";

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

  return <BlogTerminal posts={allBlogs} />;
}
