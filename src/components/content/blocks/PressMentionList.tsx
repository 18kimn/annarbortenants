import styles from '../Content.module.css'
import {OutboundLink} from '@/components/OutboundLink'
import {formatPressDate} from '@/utils/date'
import type {PressMention} from '@/sanity/types'

export default function PressMentionList({
  mentions,
  limit,
}: {
  mentions: PressMention[]
  limit?: number
}) {
  return (
    <div className={styles.cardList}>
      {mentions.slice(0, limit ?? undefined).map((mention) => (
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
  )
}
