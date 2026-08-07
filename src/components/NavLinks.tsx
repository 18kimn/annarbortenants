'use client'
import DropdownNav from './DropdownNav'
import Link from 'next/link'
import classes from './Header.module.css'
import {usePathname} from 'next/navigation'
import type {NavGroup} from '@/sanity/types'

export default function NavLinks({entries}: {entries: NavGroup[]}) {
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <nav className={classes.navDesktop} aria-label="Primary">
      {entries.map((entry) =>
        entry.links?.length ? (
          <DropdownNav
            key={entry.label}
            name={entry.label}
            links={entry.links}
          />
        ) : (
          <Link
            key={entry.label}
            href={entry.href}
            className={classes.navLink}
            data-active={isActive(entry.href)}
          >
            {entry.label}
          </Link>
        ),
      )}
    </nav>
  )
}
