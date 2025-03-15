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
};

export const getAllBlogs = (): BlogMetadata[] => {
  const files = fs.readdirSync(BLOGS_DIR);
  return files.map((filename) => {
    const filePath = path.join(BLOGS_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      title: data.title ?? "Untitled",
      author: data.author ?? "Pradeep Jadhav",
      description: data.description ?? "",
      date: data.date ?? "",
      keywords: data.keywords ?? [],
      slug: data.slug || filename.replace(".mdx", ""),
      image: data.image ?? null,
    };
  });
};

export function getBlogBySlug(slug: string) {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  const metadata: BlogMetadata = {
    title: data.title ?? "Untitled",
    author: data.author ?? "Pradeep Jadhav",
    description: data.description ?? "",
    date: data.date ?? "",
    keywords: data.keywords ?? [],
    image: data.image ?? null,
    slug: data.slug || slug.replace(".mdx", ""),
  };

  return { metadata, content };
}
