import type {
  BlockContent,
  FootnoteList,
  HomePageQueryResult,
  LogoRow,
  PageBySlugQueryResult,
  SimpleBlockContent,
  SiteSettingsQueryResult,
} from './sanity.types'

export type {
  BlockContent,
  ContentImage,
  CtaAction,
  SimpleBlockContent,
} from './sanity.types'

type HomePage = NonNullable<HomePageQueryResult>
type Page = NonNullable<PageBySlugQueryResult>

export type ContentValue = BlockContent | SimpleBlockContent

export type SiteSettings = NonNullable<SiteSettingsQueryResult>
export type NavGroup = NonNullable<SiteSettings['primaryNav']>[number]
export type NavLink = NonNullable<NavGroup['links']>[number]
export type SocialLink = NonNullable<SiteSettings['socials']>[number]
export type CarouselSlide = NonNullable<HomePage['carousel']>[number]

export type ListData = Pick<
  Page,
  | 'associations'
  | 'resourceCategories'
  | 'pressMentions'
  | 'posts'
  | 'faqItems'
>

export type Association = ListData['associations'][number]
export type ResourceCategory = ListData['resourceCategories'][number]
export type PressMention = ListData['pressMentions'][number]
export type PostSummary = ListData['posts'][number]
export type FaqItem = ListData['faqItems'][number]

export type FootnoteEntry = NonNullable<
  FootnoteList['footnotes']
>[number]
export type LogoRowLogo = NonNullable<LogoRow['logos']>[number]
