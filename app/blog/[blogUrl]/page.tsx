import { Metadata } from "next";
import { getAllBlogs, getBlogBySlug } from "@/helpers/blogs";
import { notFound } from "next/navigation";
import BlogPage from "./BlogPage";

type Props = {
  params: Promise<{ blogUrl: string }>;
};

export async function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ blogUrl: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogUrl } = await params;
  const blog = await getBlogBySlug(blogUrl);
  if (!blog) return notFound();

  const thumbnailUrl = blog.metadata.image || "/thumbnail.webp";
  return {
    title: blog.metadata.title,
    description: blog.metadata.description,
    keywords: blog.metadata.keywords,
    openGraph: {
      title: blog.metadata.title,
      description: blog.metadata.description,
      url: `/blog/${blogUrl}`,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: blog.metadata.title,
        },
      ],
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { blogUrl } = await params;
  const blog = await getBlogBySlug(blogUrl);
  if (!blog) return notFound();

  return <BlogPage metadata={blog.metadata} content={blog.content} />;
}
