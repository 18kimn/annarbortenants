import styles from '../Content.module.css'
import {Picture} from './Picture'
import type {LogoRowLogo} from '@/sanity/types'

export default function LogoRow({logos}: {logos: LogoRowLogo[]}) {
  return (
    <div className={styles.logos}>
      {logos.map((logo) => (
        <Picture key={logo._key} image={logo} />
      ))}
    </div>
  )
}
