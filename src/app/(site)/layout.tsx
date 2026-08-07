import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/fetch'
import {siteSettingsQuery} from '@/sanity/queries'
import type {SiteSettings} from '@/sanity/types'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings | null>(
    siteSettingsQuery,
  )
  return {
    title: settings?.title ?? 'Ann Arbor Tenants Union',
    description: settings?.description ?? undefined,
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await sanityFetch<SiteSettings | null>(
    siteSettingsQuery,
  )
  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
