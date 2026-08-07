import styles from '../Content.module.css'
import {Button} from '@/components/Button'
import type {CtaAction} from '@/sanity/types'

export default function CallToAction({
  title,
  action,
}: {
  title?: string
  action: CtaAction
}) {
  return (
    <div className={styles.cta}>
      {title && <p className={styles.ctaTitle}>{title}</p>}
      <Button
        href={action.href}
        external={action.external}
        variant={action.variant ?? 'primary'}
        size={action.size ?? 'default'}
      >
        {action.label}
      </Button>
    </div>
  )
}
