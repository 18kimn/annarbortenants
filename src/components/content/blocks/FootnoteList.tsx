import styles from '../Content.module.css'
import ContentBody from '../ContentBody'
import type {FootnoteEntry, ListData} from '@/sanity/types'

export default function FootnoteList({
  title,
  footnotes,
  listData,
}: {
  title?: string
  footnotes: FootnoteEntry[]
  listData?: ListData
}) {
  return (
    <section className={styles.footnotes}>
      {title && <h2>{title}</h2>}
      <ol>
        {footnotes.map((note) => (
          <li key={note._key} id={`fn${note.number}`}>
            <ContentBody value={note.body} listData={listData} />
          </li>
        ))}
      </ol>
    </section>
  )
}
