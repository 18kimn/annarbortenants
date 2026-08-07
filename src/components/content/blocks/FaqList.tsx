import ContentBody from '../ContentBody'
import {headingAnchor} from '@/sanity/headings'
import type {FaqItem} from '@/sanity/types'

export default function FaqList({
  title,
  items,
}: {
  title?: string
  items: FaqItem[]
}) {
  return (
    <>
      {title && <h2>{title}</h2>}
      {items.map((item) => (
        <section key={item._id}>
          <h2 id={headingAnchor(item.question)}>{item.question}</h2>
          <ContentBody value={item.answer} />
        </section>
      ))}
    </>
  )
}
