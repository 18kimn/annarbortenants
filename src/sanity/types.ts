import type {PortableTextBlock} from '@portabletext/types'

export type ContentImage = {
  _type?: 'contentImage'
  asset?: {_ref?: string}
  legacyPath?: string
  alt?: string
  caption?: string
  width?: number
  height?: number
  variant?: string
}

export type NavLink = {
  _key?: string
  label: string
  href: string
  external?: boolean
}

export type NavGroup = NavLink & {links?: NavLink[]}

export type NavColumn = {
  _key?: string
  title: string
  links: NavLink[]
}

export type SocialLink = {
  _key?: string
  platform: 'instagram' | 'facebook' | 'email'
  href: string
  label: string
}

export type CtaAction = {
  _key?: string
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'default' | 'large'
  external?: boolean
}

export type SiteSettings = {
  title: string
  shortName?: string
  description?: string
  tagline?: string
  email?: string
  emailDisplay?: string
  logo?: ContentImage
  socials?: SocialLink[]
  primaryNav?: NavGroup[]
  mobileNav?: NavGroup[]
  footerColumns?: NavColumn[]
  legalLinks?: NavLink[]
}

export type CarouselSlide = {
  _key?: string
  image?: ContentImage
  caption?: string
}

export type TenantAssociation = {
  _id: string
  name: string
  contactName?: string
  contactEmail?: string
  status: 'active' | 'inactive'
}

export type Resource = {
  _id: string
  title: string
  href: string
  description?: string
}

export type ResourceCategory = {
  _id: string
  title: string
  slug: string
  resources: Resource[]
}

export type PressMention = {
  _id: string
  title: string
  publication?: string
  author?: string
  date?: string
  link: string
}

export type PostSummary = {
  _id: string
  title: string
  slug: string
  date?: string
}

export type ListData = {
  associations?: TenantAssociation[]
  resourceCategories?: ResourceCategory[]
  pressMentions?: PressMention[]
  posts?: PostSummary[]
}

export type Page = ListData & {
  _id: string
  title: string
  slug: string
  subtitle?: string
  layout?: 'prose' | 'container'
  body?: PortableTextBlock[]
  seoDescription?: string
}

export type Campaign = ListData & {
  _id: string
  title: string
  slug: string
  subtitle?: string
  updatedAt?: string
  updatedLabel?: string
  lede?: PortableTextBlock[]
  body?: PortableTextBlock[]
}

export type Post = ListData & {
  _id: string
  title: string
  slug: string
  date?: string
  body?: PortableTextBlock[]
}

export type HomePage = {
  heroTitle: string
  heroSubtitle?: string
  heroActions?: CtaAction[]
  aboutBody?: PortableTextBlock[]
  carousel?: CarouselSlide[]
  joinHeading?: string
  joinBody?: PortableTextBlock[]
  joinFormUrl?: string
  joinFormTitle?: string
  joinFormLinkLabel?: string
}

export type FaqItem = {
  _id: string
  question: string
  answer?: PortableTextBlock[]
  order?: number
}
