import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'
import {OutboundLink, Email} from './OutboundLink'
import MailIcon from '@mui/icons-material/Mail'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'

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

const aboutLinks = [
  {href: '/about', display: 'Our History'},
  {href: '/about/faq', display: 'FAQ'},
  {href: '/about/resources', display: 'Resources'},
  {href: '/about/directory', display: 'Tenant Associations'},
  {href: '/about/calendar', display: 'Calendar'},
]

const getInvolvedLinks = [
  {href: '/membership', display: 'Become a Member'},
  {href: '/donations', display: 'Donate'},
  {href: '/blog', display: 'Blog'},
  {href: '/news', display: 'News'},
]

const campaignLinks = [
  {
    href: '/campaigns/tenant-bill-of-rights',
    display: 'Tenant Bill of Rights',
  },
  {href: '/campaigns/junk-fees', display: 'Trash the Junk Fees'},
  {href: '/campaigns/r2r', display: 'Early Leasing & Right to Renew'},
  {href: '/summit', display: 'MI Tenants Union Summit'},
  {
    href: '/blog/questionnaire',
    display: '2026 Candidate Questionnaire',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.brandRow}>
            <Image
              className={styles.brandLogo}
              alt="AATU logo"
              src="/circle_logo.png"
              width={96}
              height={96}
            />
            <span className={styles.brandName}>
              Ann Arbor
              <br />
              Tenants Union
            </span>
          </div>
          <p className={styles.tagline}>
            A democratic collective of tenants fighting for stable,
            just, and affordable housing in Ann Arbor.
          </p>
          <p className={styles.tagline}>
            <Email />
          </p>
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
        </div>

        <div>
          <h3 className={styles.colTitle}>About</h3>
          <ul className={styles.colList}>
            {aboutLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.colLink}>
                  {l.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.colTitle}>Get Involved</h3>
          <ul className={styles.colList}>
            {getInvolvedLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.colLink}>
                  {l.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.colTitle}>Campaigns</h3>
          <ul className={styles.colList}>
            {campaignLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.colLink}>
                  {l.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div>© {year} Ann Arbor Tenants Union</div>
        <div style={{display: 'flex', gap: 'var(--space-5)'}}>
          <Link href="/about/privacy">Privacy</Link>
          <Link href="/about/terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
