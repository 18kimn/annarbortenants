import styles from '../Content.module.css'
import {cx} from '@/utils/cx'

export default function Embed({
  url,
  title,
  width,
}: {
  url: string
  title?: string
  width?: 'prose' | 'wide'
}) {
  return (
    <div
      className={cx(
        styles.frame,
        width === 'wide' && styles.frameWide,
      )}
    >
      <iframe src={url} title={title} />
    </div>
  )
}
