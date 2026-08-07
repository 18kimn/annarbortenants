import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import {Section, Container} from '@/components/Layout'
import ContentBody from './ContentBody'
import styles from './Content.module.css'
import {sanityFetch} from '@/sanity/fetch'
import {campaignBySlugQuery} from '@/sanity/queries'
import type {Campaign} from '@/sanity/types'

export function getCampaign(slug: string) {
  return sanityFetch<Campaign | null>(campaignBySlugQuery, {slug})
}

export async function campaignMetadata(
  slug: string,
): Promise<Metadata> {
  const campaign = await getCampaign(slug)
  return campaign ? {title: campaign.title} : {}
}

export default async function CampaignView({slug}: {slug: string}) {
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
          {campaign.updatedLabel && (
            <p className={styles.timestamp}>
              <em>{campaign.updatedLabel}</em>
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
