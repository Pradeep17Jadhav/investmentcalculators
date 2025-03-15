import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export type BlogMetadata = {
  title: string;
  description: string;
  date: string;
  keywords?: string[];
  slug: string;
  image?: string;
  author?: string;
  readTime?: number;
};

export const getAllBlogs = (): BlogMetadata[] => {
  const files = fs.readdirSync(BLOGS_DIR);
  return files
    .map((filename) => {
      const filePath = path.join(BLOGS_DIR, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);
      const wordCount = content
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      return {
        title: data.title ?? "Untitled",
        author: data.author ?? "Pradeep Jadhav",
        description: data.description ?? "",
        date: data.date ?? "",
        keywords: data.keywords ?? [],
        slug: data.slug || filename.replace(".mdx", ""),
        image: data.image ?? "/thumbnail.webp",
        readTime: estimateReadingTime(wordCount) ?? 1,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getRecentBlogs = (currentSlug: string, count: number = 5) => {
  return getAllBlogs()
    .slice(0, count)
    .map((blog) => ({
      title: blog.title,
      url: blog.slug,
    }))
    .filter((blog) => blog.url !== currentSlug);
};

export function getBlogBySlug(slug: string) {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const metadata: BlogMetadata = {
    title: data.title ?? "Untitled",
    author: data.author ?? "Pradeep Jadhav",
    description: data.description ?? "",
    date: data.date ?? "",
    keywords: data.keywords ?? [],
    image: data.image ?? null,
    slug: data.slug || slug.replace(".mdx", ""),
    readTime: estimateReadingTime(wordCount) ?? 1,
  };

  return { metadata, content };
}

export const estimateReadingTime = (wordCount: number): number =>
  Math.ceil(wordCount / 200);

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
