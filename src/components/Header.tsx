'use client'
import styles from './Header.module.css'

import Link from 'next/link'
import {OutboundLink} from './OutboundLink'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import Image from 'next/image'
import DropdownNav from './DropdownNav'

const socials = [
  {
    href: 'https://twitter.com/AATUOfficial',
    Icon: TwitterIcon,
    alt: 'Icon linking to AATU Twitter',
  },
  {
    href: 'https://www.instagram.com/aatenantsunion/',
    Icon: InstagramIcon,
    alt: 'Icon linking to AATU Instagram',
  },
  {
    href: 'https://www.facebook.com/a2tenantsunion',
    Icon: FacebookIcon,
    alt: 'Icon linking to AATU Facebook',
  },
]

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.aatuImage}>
        <Link href="/">
          <Image
            className={styles.aatuImage}
            alt="AATU logo"
            src="/circle_logo.png"
            height={400}
            width={400}
          />
        </Link>
      </div>
      <div>
        <DropdownNav
          name="About"
          links={[
            {
              href: '/about',
              display: 'History',
            },
            {
              href: '/about/faq',
              display: 'Frequently Asked Questions',
            },
            {
              href: '/about/directory',
              display: 'Directory of tenant associations',
            },
          ]}
        />
      </div>
      <div>
        <Link href="/membership">Membership</Link>
      </div>
      <div>
        <Link href="/resources">Resources</Link>
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
      <div className={styles.socials}>
        {socials.map(({href, Icon}, i) => (
          <OutboundLink key={i} href={href}>
            <Icon className={styles.icon} />
          </OutboundLink>
        ))}
      </div>
    </div>
  )
}
