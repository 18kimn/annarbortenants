import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type {Metadata} from 'next'
import {defineQuery} from 'next-sanity'
import {client} from '@/sanity/client'

const siteSettingsQuery =
  defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  title,
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
}`)

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery)
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
  const settings = await client.fetch(siteSettingsQuery)
  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
