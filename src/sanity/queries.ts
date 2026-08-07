const associationProjection = `
  "associations": *[_type == "tenantAssociation"] | order(order asc) {
    _id, name, contactName, contactEmail, status
  }`

const resourceProjection = `
  "resourceCategories": *[_type == "resourceCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "resources": *[_type == "resource" && category._ref == ^._id] | order(order asc) {
      _id, title, href, description
    }
  }`

const pressMentionProjection = `
  "pressMentions": *[_type == "pressMention"] | order(date desc) {
    _id, title, publication, author, date, link
  }`

const postSummaryProjection = `
  "posts": *[_type == "post"] | order(date desc) {
    _id, title, "slug": slug.current, date
  }`

const listDataProjection = [
  associationProjection,
  resourceProjection,
  pressMentionProjection,
  postSummaryProjection,
].join(',\n')

export const siteSettingsQuery = `*[_id == "siteSettings"][0]{
  title,
  shortName,
  description,
  tagline,
  email,
  emailDisplay,
  logo,
  socials,
  primaryNav,
  mobileNav,
  footerColumns,
  legalLinks
}`

export const homePageQuery = `*[_id == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroActions,
  aboutBody,
  carousel,
  joinHeading,
  joinBody,
  joinFormUrl,
  joinFormTitle,
  joinFormLinkLabel
}`

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subtitle,
  layout,
  body,
  seoDescription,
  ${listDataProjection}
}`

export const campaignBySlugQuery = `*[_type == "campaign" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subtitle,
  updatedAt,
  updatedLabel,
  lede,
  body,
  ${listDataProjection}
}`

export const campaignSlugsQuery = `*[_type == "campaign"].slug.current`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  date,
  body,
  ${listDataProjection}
}`

export const postSlugsQuery = `*[_type == "post"].slug.current`

export const faqItemsQuery = `*[_type == "faqItem"] | order(order asc) {
  _id, question, answer, order
}`
