import Link from 'next/link'
import styles from '../Content.module.css'
import {formatPostDate} from '@/utils/date'
import type {PostSummary} from '@/sanity/types'

export default function PostList({
  posts,
  limit,
}: {
  posts: PostSummary[]
  limit?: number
}) {
  return (
    <div className={styles.cardList}>
      {posts.slice(0, limit ?? undefined).map((post) => (
        <article key={post._id} className={styles.card}>
          <h2 className={styles.articleTitle}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <div className={styles.meta}>
            {formatPostDate(post.date)}
          </div>
        </article>
      ))}
    </div>
  )
}
