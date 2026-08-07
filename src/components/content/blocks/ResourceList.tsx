import styles from '../Content.module.css'
import {OutboundLink} from '@/components/OutboundLink'
import type {ResourceCategory} from '@/sanity/types'

export default function ResourceList({
  categories,
  showTableOfContents,
}: {
  categories: ResourceCategory[]
  showTableOfContents?: boolean
}) {
  const populated = categories.filter(
    (category) => category.resources.length,
  )

  return (
    <>
      {showTableOfContents && (
        <nav className={styles.toc} aria-label="On this page">
          <ol className={styles.tocOrdered}>
            {populated.map((category) => (
              <li key={category._id}>
                <a href={`#${category.slug}`}>{category.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {populated.map((category) => (
        <section
          key={category._id}
          className={styles.resourceSection}
        >
          <h2 id={category.slug}>{category.title}</h2>
          <div className={styles.resourceList}>
            {category.resources.map((resource) => (
              <div key={resource._id} className={styles.resource}>
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
}
