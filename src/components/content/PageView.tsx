import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import {Section, Container, Prose} from '@/components/Layout'
import ContentBody from './ContentBody'
import styles from './Content.module.css'
import {sanityFetch} from '@/sanity/fetch'
import {pageBySlugQuery} from '@/sanity/queries'
import type {Page} from '@/sanity/types'

export function getPage(slug: string) {
  return sanityFetch<Page | null>(pageBySlugQuery, {slug})
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug)
  if (!page) return {}
  return {title: page.title, description: page.seoDescription}
}

export default async function PageView({
  slug,
  children,
}: {
  slug: string
  children?: React.ReactNode
}) {
  const page = await getPage(slug)
  if (!page) notFound()

  const Wrapper = page.layout === 'container' ? Container : Prose

  return (
    <Section size="spacious">
      <Wrapper width="prose">
        <h1>{page.title}</h1>
        {page.subtitle && (
          <p className={styles.subtitle}>{page.subtitle}</p>
        )}
        <ContentBody value={page.body} listData={page} />
        {children}
      </Wrapper>
    </Section>
  )
}
