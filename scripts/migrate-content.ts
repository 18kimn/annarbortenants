import fs from 'node:fs'
import path from 'node:path'
import {
  htmlToBlocks,
  type DeserializerRule,
} from '@portabletext/block-tools'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'
import {marked} from 'marked'
import matter from 'gray-matter'
import {schemaTypes} from '../src/sanity/schemaTypes'

const projectRoot = process.cwd()
const legacyDir = path.join(projectRoot, 'content', 'legacy')
const outputDir = path.join(projectRoot, 'content')

const builtInImageTypes = [
  {
    name: 'sanity.imageAsset',
    type: 'document',
    fields: [{name: 'url', type: 'string'}],
  },
  {
    name: 'sanity.imageHotspot',
    type: 'object',
    fields: [
      {name: 'x', type: 'number'},
      {name: 'y', type: 'number'},
      {name: 'height', type: 'number'},
      {name: 'width', type: 'number'},
    ],
  },
  {
    name: 'sanity.imageCrop',
    type: 'object',
    fields: [
      {name: 'top', type: 'number'},
      {name: 'bottom', type: 'number'},
      {name: 'left', type: 'number'},
      {name: 'right', type: 'number'},
    ],
  },
]

const compiledSchema = Schema.compile({
  name: 'aatu',
  types: [...schemaTypes, ...builtInImageTypes],
})

function arrayTypeOf(documentType: string, fieldName: string) {
  const type = compiledSchema.get(documentType)
  const field = type.fields.find(
    (candidate: {name: string}) => candidate.name === fieldName,
  )
  return field.type
}

const richTextType = arrayTypeOf('page', 'body')
const simpleTextType = arrayTypeOf('campaign', 'lede')

const parseHtml = (html: string) => new JSDOM(html).window.document

const attr = (element: Element, name: string) =>
  element.getAttribute(name) ?? undefined

const numericAttr = (element: Element, name: string) => {
  const value = element.getAttribute(name)
  return value === null ? undefined : Number(value)
}

const booleanAttr = (element: Element, name: string) =>
  element.getAttribute(name) === 'true' || element.hasAttribute(name)
    ? true
    : undefined

function imageFromElement(element: Element) {
  return {
    _type: 'contentImage',
    legacyPath: attr(element, 'src'),
    alt: attr(element, 'alt'),
    caption: attr(element, 'caption'),
    width: numericAttr(element, 'width'),
    height: numericAttr(element, 'height'),
    variant: attr(element, 'variant'),
  }
}

function childrenOf(element: Element, tagName: string) {
  return Array.from(element.children).filter(
    (child) => child.tagName.toLowerCase() === tagName,
  )
}

function isExternal(element: Element) {
  return (
    element.getAttribute('data-external') === 'true' ||
    element.getAttribute('target') === '_blank'
  )
}

function makeRules(
  convertNested: (html: string) => unknown[],
): DeserializerRule[] {
  return [
    {
      deserialize(node, next) {
        const element = node as Element
        const tag = element.tagName?.toLowerCase()

        if (tag === 'u') {
          return {
            _type: '__decorator',
            name: 'underline',
            children: next(element.childNodes),
          }
        }

        if (tag === 'sup') {
          return {
            _type: '__decorator',
            name: 'sup',
            children: next(element.childNodes),
          }
        }

        if (tag === 'a') {
          return {
            _type: '__annotation',
            markDef: {
              _key: keyGenerator(),
              _type: 'link',
              href: attr(element, 'href'),
              external: isExternal(element),
            },
            children: next(element.childNodes),
          }
        }

        return undefined
      },
    },
    {
      deserialize(node, _next, block) {
        const element = node as Element
        const tag = element.tagName?.toLowerCase()

        if (tag === 'hr') return block({_type: 'divider'})

        if (tag === 'aatu-image')
          return block(imageFromElement(element))

        if (tag === 'aatu-logos') {
          return block({
            _type: 'logoRow',
            logos: childrenOf(element, 'aatu-image').map(
              imageFromElement,
            ),
          })
        }

        if (tag === 'aatu-cta') {
          return block({
            _type: 'callToAction',
            title: attr(element, 'title'),
            label: attr(element, 'label'),
            href: attr(element, 'href'),
            external: booleanAttr(element, 'external'),
            variant: attr(element, 'variant') ?? 'primary',
            size: attr(element, 'size') ?? 'default',
          })
        }

        if (tag === 'aatu-testimonial') {
          return block({
            _type: 'testimonial',
            quote: element.textContent?.trim().replace(/\s+/g, ' '),
            attribution: attr(element, 'attribution'),
          })
        }

        if (tag === 'aatu-embed') {
          return block({
            _type: 'embed',
            url: attr(element, 'src'),
            title: attr(element, 'title'),
            width: attr(element, 'width') ?? 'prose',
          })
        }

        if (tag === 'aatu-donate-button') {
          return block({
            _type: 'donateButton',
            hostedButtonId: attr(element, 'hosted-button-id'),
            imageSrc: attr(element, 'image-src'),
            imageAlt: attr(element, 'image-alt'),
            imageTitle: attr(element, 'image-title'),
          })
        }

        if (tag === 'aatu-lease-calculator') {
          return block({
            _type: 'leaseCalculator',
            heading: attr(element, 'heading'),
            intro: attr(element, 'intro'),
            fieldLabel: attr(element, 'field-label'),
            amendmentDate: attr(element, 'amendment-date'),
            effectiveOffsetDays: numericAttr(
              element,
              'effective-offset-days',
            ),
            milestones: childrenOf(element, 'aatu-milestone').map(
              (milestone) => ({
                _type: 'leaseMilestone',
                days: numericAttr(milestone, 'days'),
                text: attr(milestone, 'text'),
              }),
            ),
          })
        }

        if (tag === 'aatu-toc') {
          return block({
            _type: 'tableOfContents',
            title: attr(element, 'title'),
          })
        }

        if (tag === 'aatu-associations') {
          return block({
            _type: 'associationList',
            status: attr(element, 'status'),
            layout: attr(element, 'layout') ?? 'detailed',
          })
        }

        if (tag === 'aatu-resources') {
          return block({
            _type: 'resourceList',
            showTableOfContents: booleanAttr(
              element,
              'show-table-of-contents',
            ),
          })
        }

        if (tag === 'aatu-press-mentions') {
          return block({_type: 'pressMentionList'})
        }

        if (tag === 'aatu-post-list') {
          return block({_type: 'postList'})
        }

        if (tag === 'aatu-footnotes') {
          return block({
            _type: 'footnoteList',
            title: attr(element, 'title'),
            footnotes: childrenOf(element, 'aatu-footnote').map(
              (note) => ({
                _type: 'footnote',
                number: numericAttr(note, 'number'),
                body: convertNested(note.innerHTML),
              }),
            ),
          })
        }

        return undefined
      },
    },
  ]
}

let blockKeyCounter = 0
const keyGenerator = () => {
  blockKeyCounter += 1
  return `b${blockKeyCounter.toString(36)}`
}

type PortableTextBlock = {
  _type: string
  children?: {marks?: string[]}[]
  markDefs?: {_key: string}[]
}

function pruneUnusedMarkDefs(blocks: unknown[]) {
  for (const block of blocks as PortableTextBlock[]) {
    if (!Array.isArray(block?.markDefs)) continue
    const usedMarks = new Set(
      (block.children ?? []).flatMap((child) => child.marks ?? []),
    )
    block.markDefs = block.markDefs.filter((markDef) =>
      usedMarks.has(markDef._key),
    )
  }
  return blocks
}

function toSimpleBlocks(html: string) {
  return pruneUnusedMarkDefs(
    htmlToBlocks(html, simpleTextType, {
      parseHtml,
      keyGenerator,
      rules: makeRules(toSimpleBlocks),
    }),
  )
}

function toBlocks(html: string) {
  return pruneUnusedMarkDefs(
    htmlToBlocks(html, richTextType, {
      parseHtml,
      keyGenerator,
      rules: makeRules(toSimpleBlocks),
    }),
  )
}

function readLegacy(...segments: string[]) {
  return fs.readFileSync(path.join(legacyDir, ...segments), 'utf8')
}

function readJson<T>(...segments: string[]): T {
  return JSON.parse(readLegacy(...segments)) as T
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

let keyCounter = 0
function addKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const withKeys = addKeys(item)
      if (
        withKeys &&
        typeof withKeys === 'object' &&
        !Array.isArray(withKeys)
      ) {
        const record = withKeys as Record<string, unknown>
        if (!record._key) {
          keyCounter += 1
          record._key = `k${keyCounter.toString(36)}`
        }
      }
      return withKeys
    }) as unknown as T
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, entryValue]) => entryValue !== undefined)
      .map(([key, entryValue]) => [key, addKeys(entryValue)])
    return Object.fromEntries(entries) as T
  }
  return value
}

function markdownToHtml(markdown: string) {
  const html = marked.parse(markdown, {async: false}) as string
  const withoutLeadingHeading = html.replace(
    /^\s*<h1[^>]*>[\s\S]*?<\/h1>/,
    '',
  )
  return withoutLeadingHeading.replace(/<(\/?)h1>/g, '<$1h2>')
}

type LegacyPage = {
  id: string
  title: string
  slug: string
  htmlFile: string | null
  layout?: string
  subtitle?: string
}

type LegacyCampaign = {
  id: string
  title: string
  slug: string
  subtitle?: string
  updatedAt?: string
  updatedLabel?: string
  lede?: string
  htmlFile: string
  order: number
}

type LegacyResourceFile = {
  categories: {title: string; order: number}[]
  resources: {
    title: string
    href: string
    description: string
    category: string
    order: number
  }[]
}

type LegacyAssociation = {
  name: string
  contactName?: string
  contactEmail?: string
  status: string
  order: number
}

type LegacyPress = {
  Date: string
  Publication: string
  Author: string
  Title: string
  Link: string
}

const documents: Record<string, unknown>[] = []

const settings = readJson<Record<string, unknown>>(
  'data',
  'site-settings.json',
)
documents.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  ...settings,
  logo: {_type: 'contentImage', ...(settings.logo as object)},
  socials: (settings.socials as object[]).map((social) => ({
    _type: 'socialLink',
    ...social,
  })),
  primaryNav: navEntries(settings.primaryNav as NavEntry[]),
  mobileNav: navEntries(settings.mobileNav as NavEntry[]),
  footerColumns: (
    settings.footerColumns as {title: string; links: NavEntry[]}[]
  ).map((column) => ({
    _type: 'navColumn',
    title: column.title,
    links: column.links.map((link) => ({_type: 'navLink', ...link})),
  })),
  legalLinks: (settings.legalLinks as NavEntry[]).map((link) => ({
    _type: 'navLink',
    ...link,
  })),
})

type NavEntry = {label: string; href?: string; links?: NavEntry[]}

function navEntries(entries: NavEntry[]) {
  return entries.map((entry) => ({
    _type: 'navGroup',
    label: entry.label,
    href: entry.href,
    links: entry.links?.map((link) => ({_type: 'navLink', ...link})),
  }))
}

const home = readJson<Record<string, string | object[]>>(
  'data',
  'home.json',
)
const carousel = readJson<{path: string; caption: string}[]>(
  'data',
  'home-carousel.json',
)

documents.push({
  _id: 'homePage',
  _type: 'homePage',
  heroTitle: home.heroTitle,
  heroSubtitle: home.heroSubtitle,
  heroActions: (home.heroActions as object[]).map((action) => ({
    _type: 'ctaAction',
    ...action,
  })),
  aboutBody: toBlocks(
    readLegacy('pages', home.aboutHtmlFile as string),
  ),
  carousel: carousel.map((slide) => ({
    _type: 'carouselSlide',
    caption: slide.caption,
    image: {
      _type: 'contentImage',
      legacyPath: `/home/${slide.path}`,
      alt: slide.caption,
    },
  })),
  joinHeading: home.joinHeading,
  joinBody: toBlocks(
    readLegacy('pages', home.joinHtmlFile as string),
  ),
  joinFormUrl: home.joinFormUrl,
  joinFormTitle: home.joinFormTitle,
  joinFormLinkLabel: home.joinFormLinkLabel,
})

for (const legacyPage of readJson<LegacyPage[]>(
  'data',
  'pages.json',
)) {
  documents.push({
    _id: `page.${legacyPage.id}`,
    _type: 'page',
    title: legacyPage.title,
    slug: {_type: 'slug', current: legacyPage.slug},
    subtitle: legacyPage.subtitle,
    layout: legacyPage.layout ?? 'prose',
    body: legacyPage.htmlFile
      ? toBlocks(readLegacy('pages', legacyPage.htmlFile))
      : [],
  })
}

for (const legacyCampaign of readJson<LegacyCampaign[]>(
  'data',
  'campaigns.json',
)) {
  documents.push({
    _id: `campaign.${legacyCampaign.id}`,
    _type: 'campaign',
    title: legacyCampaign.title,
    slug: {_type: 'slug', current: legacyCampaign.slug},
    subtitle: legacyCampaign.subtitle,
    updatedAt: legacyCampaign.updatedAt,
    updatedLabel: legacyCampaign.updatedLabel,
    lede: legacyCampaign.lede
      ? toSimpleBlocks(legacyCampaign.lede)
      : undefined,
    body: toBlocks(readLegacy('campaigns', legacyCampaign.htmlFile)),
    order: legacyCampaign.order,
  })
}

const postFiles = fs
  .readdirSync(path.join(legacyDir, 'posts'))
  .filter((file) => file.endsWith('.md'))
  .sort()

for (const file of postFiles) {
  const slug = file.replace(/\.md$/, '')
  const {data, content} = matter(readLegacy('posts', file))
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? '')
  documents.push({
    _id: `post.${slug}`,
    _type: 'post',
    title: String(data.title ?? slug)
      .replace(/\s+/g, ' ')
      .trim(),
    slug: {_type: 'slug', current: slug},
    date,
    body: toBlocks(markdownToHtml(content)),
  })
}

const pressMentions = readJson<LegacyPress[]>(
  'data',
  'press-mentions.json',
)
pressMentions.forEach((mention, index) => {
  documents.push({
    _id: `press.${index + 1}`,
    _type: 'pressMention',
    title: mention.Title,
    publication: mention.Publication,
    author: mention.Author,
    date: mention.Date.slice(0, 10),
    link: mention.Link,
  })
})

const resourceFile = readJson<LegacyResourceFile>(
  'data',
  'resources.json',
)
for (const category of resourceFile.categories) {
  documents.push({
    _id: `resourceCategory.${slugify(category.title)}`,
    _type: 'resourceCategory',
    title: category.title,
    slug: {_type: 'slug', current: slugify(category.title)},
    order: category.order,
  })
}
for (const resource of resourceFile.resources) {
  documents.push({
    _id: `resource.${slugify(resource.title)}`,
    _type: 'resource',
    title: resource.title,
    href: resource.href,
    description: resource.description || undefined,
    category: {
      _type: 'reference',
      _ref: `resourceCategory.${slugify(resource.category)}`,
    },
    order: resource.order,
  })
}

for (const association of readJson<LegacyAssociation[]>(
  'data',
  'tenant-associations.json',
)) {
  documents.push({
    _id: `tenantAssociation.${slugify(association.name)}`,
    _type: 'tenantAssociation',
    name: association.name,
    contactName: association.contactName,
    contactEmail: association.contactEmail,
    status: association.status,
    order: association.order,
  })
}

const faqDocument = parseHtml(readLegacy('pages', 'faq.html'))
const faqNodes = Array.from(faqDocument.body.children)
let faqOrder = 0
let currentQuestion: string | null = null
let currentAnswer: string[] = []

function pushFaqItem() {
  if (currentQuestion === null) return
  faqOrder += 1
  documents.push({
    _id: `faqItem.${slugify(currentQuestion).slice(0, 60)}`,
    _type: 'faqItem',
    question: currentQuestion,
    answer: toBlocks(currentAnswer.join('\n')),
    order: faqOrder,
  })
  currentAnswer = []
}

for (const node of faqNodes) {
  if (node.tagName.toLowerCase() === 'h2') {
    pushFaqItem()
    currentQuestion =
      node.textContent?.replace(/\s+/g, ' ').trim() ?? ''
  } else {
    currentAnswer.push(node.outerHTML)
  }
}
pushFaqItem()

const withKeys = documents.map((document) => addKeys(document))

fs.mkdirSync(outputDir, {recursive: true})
fs.writeFileSync(
  path.join(outputDir, 'aatu-content.ndjson'),
  withKeys.map((document) => JSON.stringify(document)).join('\n') +
    '\n',
)
fs.writeFileSync(
  path.join(outputDir, 'aatu-content.json'),
  JSON.stringify(withKeys, null, 2) + '\n',
)

const counts = withKeys.reduce<Record<string, number>>(
  (totals, document) => {
    const type = String(document._type)
    totals[type] = (totals[type] ?? 0) + 1
    return totals
  },
  {},
)

console.log(
  `Wrote ${withKeys.length} documents to content/aatu-content.ndjson`,
)
for (const [type, count] of Object.entries(counts).sort()) {
  console.log(`  ${type}: ${count}`)
}
