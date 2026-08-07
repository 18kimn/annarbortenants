import PageView, {pageMetadata} from '@/components/content/PageView'
import ContentBody from '@/components/content/ContentBody'
import {sanityFetch} from '@/sanity/fetch'
import {faqItemsQuery} from '@/sanity/queries'
import {headingAnchor} from '@/sanity/headings'
import type {FaqItem} from '@/sanity/types'

const slug = 'about/faq'

export const generateMetadata = () => pageMetadata(slug)

export default async function FaqPage() {
  const items = await sanityFetch<FaqItem[]>(faqItemsQuery)

  return (
    <PageView slug={slug}>
      {items.map((item) => (
        <section key={item._id}>
          <h2 id={headingAnchor(item.question)}>{item.question}</h2>
          <ContentBody value={item.answer} />
        </section>
      ))}
    </PageView>
  )
}
