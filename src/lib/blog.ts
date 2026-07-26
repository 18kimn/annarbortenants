import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  href?: string
}

const standalonePosts: BlogPostMeta[] = [
  {
    slug: 'questionnaire',
    title: '2026 city council candidate questionnaire',
    date: '2026-07-26',
    href: '/blog/questionnaire',
  },
]

export type BlogPost = BlogPostMeta & {
  content: string
}

const blogDirectory = path.join(process.cwd(), 'src/app/blog/content')

function readPost(slug: string): BlogPost {
  const filePath = path.join(blogDirectory, `${slug}.md`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const {data, content} = matter(raw)

  const title = typeof data.title === 'string' ? data.title : slug
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? '')

  return {slug, title, date, content}
}

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

export function getPost(slug: string): BlogPost | null {
  try {
    return readPost(slug)
  } catch {
    return null
  }
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const {content: _content, ...meta} = readPost(slug)
      return meta
    })
    .concat(standalonePosts)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function formatPostDate(isoDate: string): string {
  if (!isoDate) return ''
  const parsed = new Date(isoDate)
  if (Number.isNaN(parsed.getTime())) return isoDate
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
