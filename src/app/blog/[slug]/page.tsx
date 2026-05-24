import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  formatPostDate,
  getAllPostSlugs,
  getPost,
} from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <header>
        <div style={{ color: "var(--ink-muted)" }}>
          {formatPostDate(post.date)}
        </div>
      </header>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
    </article>
  );
}
