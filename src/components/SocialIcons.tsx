'use client'
import MailIcon from '@mui/icons-material/Mail'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import {OutboundLink} from './OutboundLink'
import type {SocialLink} from '@/sanity/types'

const platformIcons: Record<
  NonNullable<SocialLink['platform']>,
  typeof MailIcon
> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  email: MailIcon,
}

export function SocialIcons({
  socials,
  linkClassName,
  iconClassName,
}: {
  socials: SocialLink[]
  linkClassName?: string
  iconClassName?: string
}) {
  return (
    <>
      {socials.map((social) => {
        const Icon = platformIcons[social.platform] ?? MailIcon
        return (
          <OutboundLink
            key={social.href}
            href={social.href}
            className={linkClassName}
            aria-label={social.label}
          >
            <Icon className={iconClassName} />
          </OutboundLink>
        )
      })}
    </>
  )
}
