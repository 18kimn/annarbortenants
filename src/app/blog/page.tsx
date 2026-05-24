import Link from "next/link";
import styles from "./page.module.css";
import { Section, Container } from "@/components/Layout";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <Section size="spacious">
      <Container width="prose">
        <h1>Press releases and blog posts</h1>
        <div className={styles.cardList}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.card}>
              <h2 className={styles.articleTitle}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <div className={styles.meta}>{formatPostDate(post.date)}</div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
