import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'
import {OutboundLink} from './OutboundLink'
import {SocialIcons} from './SocialIcons'
import {imageSrc} from '@/sanity/image'
import type {SiteSettings} from '@/sanity/types'

export default function Footer({
  settings,
}: {
  settings: SiteSettings | null
}) {
  const year = new Date().getFullYear()
  const logo = imageSrc(settings?.logo, 192)

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.brandRow}>
            {logo && (
              <Image
                className={styles.brandLogo}
                alt={settings?.logo?.alt ?? ''}
                src={logo}
                width={96}
                height={96}
              />
            )}
            <span className={styles.brandName}>
              {settings?.title}
            </span>
          </div>
          <p className={styles.tagline}>{settings?.tagline}</p>
          {settings?.email && (
            <p className={styles.tagline}>
              <OutboundLink href={`mailto:${settings.email}`}>
                {settings.emailDisplay ?? settings.email}
              </OutboundLink>
            </p>
          )}
          <div className={styles.socials}>
            <SocialIcons
              socials={settings?.socials ?? []}
              linkClassName={styles.socialLink}
              iconClassName={styles.socialIcon}
            />
          </div>
        </div>

        {(settings?.footerColumns ?? []).map((column) => (
          <div key={column.title}>
            <h3 className={styles.colTitle}>{column.title}</h3>
            <ul className={styles.colList}>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.colLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <div>
          © {year} {settings?.title}
        </div>
        <div style={{display: 'flex', gap: 'var(--space-5)'}}>
          {(settings?.legalLinks ?? []).map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
