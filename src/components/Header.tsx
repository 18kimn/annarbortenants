'use client'
import styles from './Header.module.css'
import {useState} from 'react'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import {Drawer, IconButton} from '@mui/material'
import NavLinks from './NavLinks'
import SocialIcons from './SocialIcons'
import {imageSrc} from '@/sanity/image'
import type {SiteSettings} from '@/sanity/types'

export default function Header({
  settings,
}: {
  settings: SiteSettings | null
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const socials = settings?.socials ?? []
  const primaryNav = settings?.primaryNav ?? []
  const mobileNav = settings?.mobileNav ?? primaryNav
  const logo = imageSrc(settings?.logo, 176)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {logo && (
            <Image
              className={styles.brandLogo}
              alt={settings?.logo?.alt ?? ''}
              src={logo}
              height={88}
              width={88}
            />
          )}
          <span className={styles.brandText}>{settings?.title}</span>
        </Link>

        <NavLinks entries={primaryNav} />

        <div className={styles.socials}>
          <SocialIcons
            socials={socials}
            linkClassName={styles.socialLink}
            iconClassName={styles.socialIcon}
          />
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </div>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{sx: {background: 'var(--red)'}}}
      >
        <div className={styles.mobileDrawer}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              sx={{color: '#fff'}}
            >
              <CloseIcon />
            </IconButton>
          </div>

          {mobileNav.map((entry) =>
            entry.links?.length ? (
              <div key={entry.label} className={styles.mobileSection}>
                <span className={styles.mobileSectionLabel}>
                  {entry.label}
                </span>
                {entry.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.mobileSubLink}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={entry.label}
                href={entry.href}
                className={styles.mobileLink}
                onClick={() => setDrawerOpen(false)}
              >
                {entry.label}
              </Link>
            ),
          )}

          <div className={styles.mobileSocials}>
            <SocialIcons
              socials={socials}
              linkClassName={styles.socialLink}
              iconClassName={styles.socialIcon}
            />
          </div>
        </div>
      </Drawer>
    </header>
  )
}
