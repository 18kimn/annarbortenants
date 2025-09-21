import DropdownNav from './DropdownNav'
import Link from 'next/link'
import classes from './Header.module.css'
import {useMediaQuery} from '@mui/material'
export default function NavLinks() {
  const isDesktop = useMediaQuery('(min-width:1000px)')
  return (
    <nav
      style={{
        flexDirection: isDesktop ? 'row' : 'column',
      }}
      className={classes.navbar}
    >
      <div>
        <DropdownNav
          name="About"
          links={[
            {
              href: '/about',
              display: 'History',
            },
            {
              href: '/about/resources',
              display: 'Resources',
            },
            {
              href: '/about/faq',
              display: 'Frequently Asked Questions',
            },
            {
              href: '/about/directory',
              display: 'Directory of tenant associations',
            },
            {
              href: '/about/calendar',
              display: 'Upcoming Meetings and Events',
            },
          ]}
        />
      </div>
      <div>
        <Link href="/membership">Membership</Link>
      </div>
      <div>
        <Link href="/summit">Tenant Union Summit</Link>
      </div>
      <div>
        <Link href="/news">News</Link>
      </div>
      <DropdownNav
        name="Campaigns"
        links={[
          {
            href: '/campaigns/tenant-bill-of-rights',
            display: 'The Ann Arbor Tenant Bill of Rights',
          },
          {
            href: '/campaigns/junk-fees',
            display: 'Trash the Junk Fees!',
          },
          {
            href: '/campaigns/r2r',
            display:
              'The Early Leasing Ordinance and the Right to Renew',
          },
        ]}
      />
    </nav>
  )
}
