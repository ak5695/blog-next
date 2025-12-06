import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  title_zh?: string;
  publishedAt: string;
  summary: string;
  summary_zh?: string;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function readMDXMetadata(filePath) {
  const fd = fs.openSync(filePath, "r");
  try {
    const buffer = Buffer.alloc(2048); // Read 2KB
    const bytesRead = fs.readSync(fd, buffer, 0, 2048, 0);
    const content = buffer.toString("utf-8", 0, bytesRead);
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(content);
    if (match) {
      const frontMatterBlock = match[1];
      const frontMatterLines = frontMatterBlock.trim().split("\n");
      const metadata: Partial<Metadata> = {};
      frontMatterLines.forEach((line) => {
        const [key, ...valueArr] = line.split(": ");
        let value = valueArr.join(": ").trim();
        value = value.replace(/^['"](.*)['"]$/, "$1");
        metadata[key.trim() as keyof Metadata] = value;
      });
      return metadata as Metadata;
    }
    return {} as Metadata;
  } finally {
    fs.closeSync(fd);
  }
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    // Remove date prefix from slug (e.g. 2024-05-12-my-post -> my-post)
    slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, "");

    return {
      metadata,
      slug,
      content,
    };
  });
}

function getMDXMetadata(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let metadata = readMDXMetadata(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    // Remove date prefix from slug (e.g. 2024-05-12-my-post -> my-post)
    slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, "");

    return {
      metadata,
      slug,
      content: "",
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function getBlogPostsMetadata() {
  return getMDXMetadata(path.join(process.cwd(), "app", "blog", "posts"));
}
