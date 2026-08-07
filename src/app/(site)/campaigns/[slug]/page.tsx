import {notFound} from 'next/navigation'
import {defineQuery} from 'next-sanity'
import {Section, Container} from '@/components/Layout'
import ContentBody from '@/components/content/ContentBody'
import styles from '@/components/content/Content.module.css'
import {client} from '@/sanity/client'
import {listDataProjection} from '@/sanity/listData'
import {formatPostDate} from '@/utils/date'

const campaignBySlugQuery =
  defineQuery(`*[_type == "campaign" && slug.current == $slug][0]{
  title,
  subtitle,
  updatedAt,
  lede,
  body,
  ${listDataProjection}
}`)

const campaignSlugsQuery = defineQuery(
  `*[_type == "campaign"].slug.current`,
)

type PageProps = {
  params: Promise<{slug: string}>
}

function getCampaign(slug: string) {
  return client.fetch(campaignBySlugQuery, {slug})
}

export async function generateStaticParams() {
  const slugs = await client.fetch(campaignSlugsQuery)
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const campaign = await getCampaign(slug)
  return campaign ? {title: campaign.title} : {}
}

export default async function CampaignPage({params}: PageProps) {
  const {slug} = await params
  const campaign = await getCampaign(slug)
  if (!campaign) notFound()

  return (
    <Section size="spacious">
      <Container width="prose">
        <header>
          <h1>{campaign.title}</h1>
          {campaign.subtitle && (
            <p className={styles.subtitle}>{campaign.subtitle}</p>
          )}
          {campaign.updatedAt && (
            <p className={styles.timestamp}>
              <em>
                Last updated {formatPostDate(campaign.updatedAt)}
              </em>
            </p>
          )}
        </header>
        {campaign.lede && (
          <div className={styles.lede}>
            <ContentBody value={campaign.lede} listData={campaign} />
          </div>
        )}
        <ContentBody value={campaign.body} listData={campaign} />
      </Container>
    </Section>
  )
}
