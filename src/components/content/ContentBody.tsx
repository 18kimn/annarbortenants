import Image from 'next/image'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'
import type {
  PortableTextBlock,
  PortableTextComponents,
} from '@portabletext/react'
import styles from './Content.module.css'
import {Button} from '@/components/Button'
import {OutboundLink} from '@/components/OutboundLink'
import LeaseCalculator from './LeaseCalculator'
import DonateButton from './DonateButton'
import {imageSrc} from '@/sanity/image'
import {headingAnchor} from '@/sanity/headings'
import {formatPostDate, formatPressDate} from '@/utils/date'
import type {ContentImage, ListData} from '@/sanity/types'

function blockText(block: unknown): string {
  const children =
    (block as {children?: {text?: string}[]})?.children ?? []
  return children.map((child) => child.text ?? '').join('')
}

function ContentPicture({
  image,
  className,
}: {
  image: ContentImage
  className?: string
}) {
  const src = imageSrc(image, image.width)
  if (!src) return null
  return (
    <Image
      className={className}
      src={src}
      alt={image.alt ?? ''}
      width={image.width ?? 1200}
      height={image.height ?? 800}
    />
  )
}

function TableOfContents({
  title,
  body,
}: {
  title?: string
  body: PortableTextBlock[]
}) {
  const headings = body
    .filter(
      (block) => block._type === 'block' && block.style === 'h2',
    )
    .map((block) => blockText(block))
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

export function buildContentComponents(
  body: PortableTextBlock[],
  listData: ListData,
): PortableTextComponents {
  const heading = (Tag: 'h2' | 'h3' | 'h4') =>
    function Heading({
      children,
      value,
    }: {
      children?: React.ReactNode
      value: unknown
    }) {
      return (
        <Tag id={headingAnchor(blockText(value))}>{children}</Tag>
      )
    }

  return {
    block: {
      h2: heading('h2'),
      h3: heading('h3'),
      h4: heading('h4'),
      blockquote: ({children}) => <blockquote>{children}</blockquote>,
    },
    marks: {
      underline: ({children}) => <u>{children}</u>,
      sup: ({children}) => <sup>{children}</sup>,
      link: ({value, children}) => {
        const href = value?.href ?? ''
        if (value?.external) {
          return <OutboundLink href={href}>{children}</OutboundLink>
        }
        if (href.startsWith('/')) {
          return <Link href={href}>{children}</Link>
        }
        return <a href={href}>{children}</a>
      },
    },
    types: {
      contentImage: ({value}) =>
        value.variant === 'framed' ? (
          <div className={styles.imageFramed}>
            <ContentPicture image={value} />
          </div>
        ) : (
          <ContentPicture image={value} className={styles.image} />
        ),

      logoRow: ({value}) => (
        <div className={styles.logos}>
          {(value.logos ?? []).map(
            (logo: ContentImage, index: number) => (
              <ContentPicture
                key={logo.legacyPath ?? index}
                image={logo}
              />
            ),
          )}
        </div>
      ),

      callToAction: ({value}) => (
        <div className={styles.cta}>
          {value.title && (
            <p className={styles.ctaTitle}>{value.title}</p>
          )}
          <Button
            href={value.href}
            external={value.external}
            variant={value.variant ?? 'primary'}
            size={value.size ?? 'default'}
          >
            {value.label}
          </Button>
        </div>
      ),

      testimonial: ({value}) => (
        <figure className={styles.testimonial}>
          <p className={styles.testimonialQuote}>{value.quote}</p>
          <figcaption className={styles.testimonialAttribution}>
            {value.attribution}
          </figcaption>
        </figure>
      ),

      embed: ({value}) => (
        <div
          className={`${styles.frame} ${
            value.width === 'wide' ? styles.frameWide : ''
          }`}
        >
          <iframe src={value.url} title={value.title} />
        </div>
      ),

      donateButton: ({value}) => (
        <DonateButton
          hostedButtonId={value.hostedButtonId}
          imageSrc={value.imageSrc}
          imageAlt={value.imageAlt}
          imageTitle={value.imageTitle}
        />
      ),

      leaseCalculator: ({value}) => (
        <LeaseCalculator
          heading={value.heading}
          intro={value.intro}
          fieldLabel={value.fieldLabel}
          amendmentDate={value.amendmentDate}
          effectiveOffsetDays={value.effectiveOffsetDays}
          milestones={value.milestones ?? []}
        />
      ),

      tableOfContents: ({value}) => (
        <TableOfContents title={value.title} body={body} />
      ),

      divider: () => <hr />,

      associationList: ({value}) => {
        const associations = (listData.associations ?? []).filter(
          (association) => association.status === value.status,
        )
        if (!associations.length) return null
        if (value.layout === 'list') {
          return (
            <ul>
              {associations.map((association) => (
                <li key={association._id}>{association.name}</li>
              ))}
            </ul>
          )
        }
        return (
          <>
            {associations.map((association) => (
              <div key={association._id}>
                <h3 className={styles.associationName}>
                  {association.name}
                </h3>
                {association.contactName && (
                  <p>
                    Contact: {association.contactName}
                    {association.contactEmail && (
                      <>
                        {' — '}
                        <a
                          href={`mailto:${association.contactEmail}`}
                        >
                          {association.contactEmail}
                        </a>
                      </>
                    )}
                  </p>
                )}
              </div>
            ))}
          </>
        )
      },

      resourceList: ({value}) => {
        const categories = (listData.resourceCategories ?? []).filter(
          (category) => category.resources.length,
        )
        return (
          <>
            {value.showTableOfContents && (
              <nav className={styles.toc} aria-label="On this page">
                <ol className={styles.tocOrdered}>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <a href={`#${category.slug}`}>
                        {category.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {categories.map((category) => (
              <section
                key={category._id}
                className={styles.resourceSection}
              >
                <h2 id={category.slug}>{category.title}</h2>
                <div className={styles.resourceList}>
                  {category.resources.map((resource) => (
                    <div
                      key={resource._id}
                      className={styles.resource}
                    >
                      <h3 className={styles.resourceTitle}>
                        <OutboundLink href={resource.href}>
                          {resource.title}
                        </OutboundLink>
                      </h3>
                      {resource.description && (
                        <p className={styles.resourceDescription}>
                          {resource.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </>
        )
      },

      pressMentionList: () => (
        <div className={styles.cardList}>
          {(listData.pressMentions ?? []).map((mention) => (
            <article key={mention._id} className={styles.card}>
              <h2 className={styles.articleTitle}>
                <OutboundLink href={mention.link}>
                  {mention.title}
                </OutboundLink>
              </h2>
              <div className={styles.meta}>
                {[
                  mention.author,
                  mention.publication,
                  formatPressDate(mention.date),
                ]
                  .filter(Boolean)
                  .join('  ·  ')}
              </div>
            </article>
          ))}
        </div>
      ),

      postList: () => (
        <div className={styles.cardList}>
          {(listData.posts ?? []).map((post) => (
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
      ),

      footnoteList: ({value}) => (
        <section className={styles.footnotes}>
          {value.title && <h2>{value.title}</h2>}
          <ol>
            {(value.footnotes ?? []).map(
              (note: {
                _key: string
                number: number
                body: PortableTextBlock[]
              }) => (
                <li key={note._key} id={`fn${note.number}`}>
                  <PortableText
                    value={note.body}
                    components={buildContentComponents(
                      note.body,
                      listData,
                    )}
                  />
                </li>
              ),
            )}
          </ol>
        </section>
      ),
    },
  }
}

export default function ContentBody({
  value,
  listData = {},
}: {
  value?: PortableTextBlock[]
  listData?: ListData
}) {
  if (!value?.length) return null
  return (
    <PortableText
      value={value}
      components={buildContentComponents(value, listData)}
    />
  )
}
