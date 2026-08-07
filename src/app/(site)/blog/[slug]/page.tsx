import {Fragment} from 'react'
import type {ComponentType, ReactNode} from 'react'
import {notFound} from 'next/navigation'
import {defineQuery} from 'next-sanity'
import {Section, Container} from '@/components/Layout'
import type {ContainerWidth} from '@/components/Layout'
import ContentBody from '@/components/content/ContentBody'
import styles from '@/components/content/Content.module.css'
import Questionnaire from './Questionnaire'
import {client} from '@/sanity/client'
import {listDataProjection} from '@/sanity/listData'
import {formatPostDate} from '@/utils/date'
import type {PostBySlugQueryResult} from '@/sanity/sanity.types'

const postBySlugQuery =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title,
  date,
  template,
  body,
  ${listDataProjection}
}`)

const postSlugsQuery = defineQuery(`*[_type == "post"].slug.current`)

type PostTemplate = NonNullable<
  NonNullable<PostBySlugQueryResult>['template']
>

const postTemplates: Record<
  PostTemplate,
  {
    component: ComponentType<{children: ReactNode}>
    width: ContainerWidth
  }
> = {
  questionnaire: {component: Questionnaire, width: 'expanded'},
}

type PageProps = {
  params: Promise<{slug: string}>
}

function getPost(slug: string) {
  return client.fetch(postBySlugQuery, {slug})
}

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery)
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const post = await getPost(slug)
  return post ? {title: post.title} : {}
}

export default async function BlogPostPage({params}: PageProps) {
  const {slug} = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const template = post.template
    ? postTemplates[post.template]
    : undefined
  const Body = template?.component ?? Fragment

  return (
    <Section size="spacious">
      <Container width={template?.width ?? 'prose'}>
        <article>
          <header>
            <h1>{post.title}</h1>
            <div className={styles.timestamp}>
              {formatPostDate(post.date)}
            </div>
          </header>
          <Body>
            <ContentBody value={post.body} listData={post} />
          </Body>
        </article>
      </Container>
    </Section>
  )
}
