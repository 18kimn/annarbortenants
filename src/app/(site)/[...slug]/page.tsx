import {notFound} from 'next/navigation'
import {defineQuery} from 'next-sanity'
import {Section, Container, Prose} from '@/components/Layout'
import ContentBody from '@/components/content/ContentBody'
import styles from '@/components/content/Content.module.css'
import {client} from '@/sanity/client'
import {listDataProjection} from '@/sanity/listData'

const pageBySlugQuery =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  title,
  subtitle,
  width,
  prose,
  body,
  seoDescription,
  ${listDataProjection}
}`)

const pageSlugsQuery = defineQuery(`*[_type == "page"].slug.current`)

type PageProps = {
  params: Promise<{slug: string[]}>
}

function getPage(slug: string[]) {
  return client.fetch(pageBySlugQuery, {slug: slug.join('/')})
}

export async function generateStaticParams() {
  const slugs = await client.fetch(pageSlugsQuery)
  return slugs.map((slug) => ({slug: slug.split('/')}))
}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const page = await getPage(slug)
  if (!page) return {}
  return {title: page.title, description: page.seoDescription}
}

export default async function ContentPage({params}: PageProps) {
  const {slug} = await params
  const page = await getPage(slug)
  if (!page) notFound()

  const Wrapper = page.prose === false ? Container : Prose

  return (
    <Section size="spacious">
      <Wrapper width={page.width ?? 'prose'}>
        <h1>{page.title}</h1>
        {page.subtitle && (
          <p className={styles.subtitle}>{page.subtitle}</p>
        )}
        <ContentBody value={page.body} listData={page} />
      </Wrapper>
    </Section>
  )
}
