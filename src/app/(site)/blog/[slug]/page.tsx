import {notFound} from 'next/navigation'
import {Section, Container} from '@/components/Layout'
import ContentBody from '@/components/content/ContentBody'
import styles from '@/components/content/Content.module.css'
import {sanityFetch} from '@/sanity/fetch'
import {postBySlugQuery, postSlugsQuery} from '@/sanity/queries'
import {formatPostDate} from '@/utils/date'
import type {Post} from '@/sanity/types'

type PageProps = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(postSlugsQuery)
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const post = await sanityFetch<Post | null>(postBySlugQuery, {slug})
  return post ? {title: post.title} : {}
}

export default async function BlogPostPage({params}: PageProps) {
  const {slug} = await params
  const post = await sanityFetch<Post | null>(postBySlugQuery, {slug})
  if (!post) notFound()

  return (
    <Section size="spacious">
      <Container width="prose">
        <article>
          <header>
            <h1>{post.title}</h1>
            <div className={styles.timestamp}>
              {formatPostDate(post.date)}
            </div>
          </header>
          <ContentBody value={post.body} listData={post} />
        </article>
      </Container>
    </Section>
  )
}
