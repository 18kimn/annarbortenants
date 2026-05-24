'use client'
import styles from './Header.module.css'
import {useState} from 'react'

import {OutboundLink} from './OutboundLink'
import Link from 'next/link'
import MailIcon from '@mui/icons-material/Mail'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import {Drawer, IconButton} from '@mui/material'
import NavLinks, {aboutLinks, campaignLinks} from './NavLinks'

const socials = [
  {
    href: 'https://www.instagram.com/aatenantsunion/',
    Icon: InstagramIcon,
    alt: 'AATU Instagram',
  },
  {
    href: 'https://www.facebook.com/a2tenantsunion',
    Icon: FacebookIcon,
    alt: 'AATU Facebook',
  },
  {
    href: 'mailto:annarbortenantsunion@gmail.com',
    Icon: MailIcon,
    alt: 'AATU email',
  },
]

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <Image
            className={styles.brandLogo}
            alt="AATU logo"
            src="/circle_logo.png"
            height={88}
            width={88}
          />
          <span className={styles.brandText}>
            Ann Arbor Tenants Union
          </span>
        </Link>

        <NavLinks />

        <div className={styles.socials}>
          {socials.map(({href, Icon, alt}) => (
            <OutboundLink
              key={href}
              href={href}
              className={styles.socialLink}
              aria-label={alt}
            >
              <Icon className={styles.socialIcon} />
            </OutboundLink>
          ))}
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

          <Link
            href="/"
            className={styles.mobileLink}
            onClick={() => setDrawerOpen(false)}
          >
            Home
          </Link>

          <div className={styles.mobileSection}>
            <span className={styles.mobileSectionLabel}>About</span>
            {aboutLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={styles.mobileSubLink}
                onClick={() => setDrawerOpen(false)}
              >
                {l.display}
              </Link>
            ))}
          </div>

          <Link
            href="/membership"
            className={styles.mobileLink}
            onClick={() => setDrawerOpen(false)}
          >
            Membership
          </Link>
          <Link
            href="/news"
            className={styles.mobileLink}
            onClick={() => setDrawerOpen(false)}
          >
            News
          </Link>
          <Link
            href="/blog"
            className={styles.mobileLink}
            onClick={() => setDrawerOpen(false)}
          >
            Blog
          </Link>

          <div className={styles.mobileSection}>
            <span className={styles.mobileSectionLabel}>
              Campaigns
            </span>
            {campaignLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={styles.mobileSubLink}
                onClick={() => setDrawerOpen(false)}
              >
                {l.display}
              </Link>
            ))}
          </div>

          <div className={styles.mobileSocials}>
            {socials.map(({href, Icon, alt}) => (
              <OutboundLink
                key={href}
                href={href}
                className={styles.socialLink}
                aria-label={alt}
              >
                <Icon className={styles.socialIcon} />
              </OutboundLink>
            ))}
          </div>
        </div>
      </Drawer>
    </header>
  )
}
