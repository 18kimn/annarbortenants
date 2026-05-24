'use client'
import DropdownNav from './DropdownNav'
import Link from 'next/link'
import classes from './Header.module.css'
import {usePathname} from 'next/navigation'

export const aboutLinks = [
  {href: '/about', display: 'History'},
  {href: '/about/resources', display: 'Resources'},
  {href: '/donations', display: 'Donations'},
  {href: '/about/faq', display: 'Frequently Asked Questions'},
  {
    href: '/about/directory',
    display: 'Directory of tenant associations',
  },
  {href: '/about/calendar', display: 'Upcoming Meetings and Events'},
  {href: '/about/terms', display: 'Terms and Conditions'},
  {href: '/about/privacy', display: 'Privacy Policy'},
]

export const campaignLinks = [
  {
    href: '/campaigns/tenant-bill-of-rights',
    display: 'The Ann Arbor Tenant Bill of Rights',
  },
  {href: '/campaigns/junk-fees', display: 'Trash the Junk Fees!'},
  {
    href: '/campaigns/r2r',
    display: 'The Early Leasing Ordinance and the Right to Renew',
  },
  {href: '/summit', display: 'The Michigan Tenants Union Summit'},
]

export default function NavLinks() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <nav className={classes.navDesktop} aria-label="Primary">
      <DropdownNav name="About" links={aboutLinks} />
      <Link
        href="/membership"
        className={classes.navLink}
        data-active={isActive('/membership')}
      >
        Membership
      </Link>
      <Link
        href="/news"
        className={classes.navLink}
        data-active={isActive('/news')}
      >
        News
      </Link>
      <Link
        href="/blog"
        className={classes.navLink}
        data-active={isActive('/blog')}
      >
        Blog
      </Link>
      <DropdownNav name="Campaigns" links={campaignLinks} />
    </nav>
  )
}
