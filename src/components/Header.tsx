'use client'
import styles from './Header.module.css'
import {useState, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  Drawer,
  IconButton,
  Popper,
  ClickAwayListener,
  Grow,
} from '@mui/material'
import {SocialIcons} from './SocialIcons'
import {imageSrc} from '@/sanity/image'
import type {NavGroup, NavLink, SiteSettings} from '@/sanity/types'

function NavDropdown({
  name,
  links,
}: {
  name: string
  links: NavLink[]
}) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const closeOnClickAway = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current?.contains(event.target as Node)) return
    setOpen(false)
  }

  return (
    <>
      <button
        ref={anchorRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={styles.navButton}
      >
        {name}
        <ArrowDropDownIcon fontSize="small" />
      </button>
      <Popper
        sx={{zIndex: 60}}
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({TransitionProps}) => (
          <Grow
            {...TransitionProps}
            style={{transformOrigin: 'top left'}}
          >
            <div className={styles.dropdownPaper}>
              <ClickAwayListener onClickAway={closeOnClickAway}>
                <div role="menu">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className={styles.dropdownItem}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  )
}

function DesktopNav({entries}: {entries: NavGroup[]}) {
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <nav className={styles.navDesktop} aria-label="Primary">
      {entries.map((entry) =>
        entry.links?.length ? (
          <NavDropdown
            key={entry.label}
            name={entry.label}
            links={entry.links}
          />
        ) : (
          <Link
            key={entry.label}
            href={entry.href}
            className={styles.navLink}
            data-active={isActive(entry.href)}
          >
            {entry.label}
          </Link>
        ),
      )}
    </nav>
  )
}

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

        <DesktopNav entries={primaryNav} />

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
