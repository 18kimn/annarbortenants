'use client'
// overcomplicated as fuck for some reason
import styles from './Header.module.css'
import {useState} from 'react'

import {OutboundLink} from './OutboundLink'
import Link from 'next/link'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import Image from 'next/image'

import {IconButton, Collapse, useMediaQuery} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NavLinks from './NavLinks'

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
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width:1000px)')
  return (
    <header className={styles.container}>
      <div>
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
      {isDesktop ? (
        <NavLinks />
      ) : (
        <IconButton
          onClick={() => setOpen((prev: any) => !prev)}
          edge="end"
        >
          <MenuIcon style={{fill: '#ffffff'}} />
        </IconButton>
      )}

      {!isDesktop && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <NavLinks />
        </Collapse>
      )}

      <div className={styles.socials}>
        {socials.map(({href, Icon}, i) => (
          <OutboundLink key={i} href={href}>
            <Icon className={styles.icon} />
          </OutboundLink>
        ))}
      </div>
    </header>
  )
}
