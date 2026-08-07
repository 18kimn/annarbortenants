import {toPlainText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/react'
import styles from '../Content.module.css'
import {headingAnchor} from '@/sanity/headings'
import type {ContentValue} from '@/sanity/types'

export default function TableOfContents({
  title,
  body,
}: {
  title?: string
  body: ContentValue
}) {
  const headings = body
    .filter(
      (block) => block._type === 'block' && block.style === 'h2',
    )
    .map((block) => toPlainText(block as PortableTextBlock))
    .filter(Boolean)

  if (!headings.length) return null

  return (
    <nav
      className={styles.toc}
      aria-label={title ?? 'Table of contents'}
    >
      <h2>{title ?? 'Table of contents'}</h2>
      <div className={styles.tocList}>
        {headings.map((heading) => (
          <a
            key={heading}
            className={styles.headingLink}
            href={`#${headingAnchor(heading)}`}
          >
            {heading}
          </a>
        ))}
      </div>
    </nav>
  )
}
