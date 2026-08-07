import CampaignView, {
  campaignMetadata,
} from '@/components/content/CampaignView'
import {sanityFetch} from '@/sanity/fetch'
import {campaignSlugsQuery} from '@/sanity/queries'

type PageProps = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(campaignSlugsQuery)
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  return campaignMetadata(slug)
}

export default async function CampaignPage({params}: PageProps) {
  const {slug} = await params
  return <CampaignView slug={slug} />
}
