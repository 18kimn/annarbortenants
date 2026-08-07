import styles from './page.module.css'
import HomeCarousel from './HomeCarousel'
import {Section, Container} from '@/components/Layout'
import {Button} from '@/components/Button'
import ContentBody from '@/components/content/ContentBody'
import {OutboundLink} from '@/components/OutboundLink'
import {defineQuery} from 'next-sanity'
import {client} from '@/sanity/client'

const homePageQuery =
  defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{
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
}`)

export default async function Home() {
  const home = await client.fetch(homePageQuery)
  if (!home) return null

  return (
    <>
      <Section size="spacious" variant="elevated">
        <Container width="prose" className={styles.hero}>
          <h1 className={styles.heroTitle}>{home.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{home.heroSubtitle}</p>
          <div className={styles.heroActions}>
            {(home.heroActions ?? []).map((action) => (
              <Button
                key={action.href}
                href={action.href}
                variant={action.variant ?? 'primary'}
                size={action.size ?? 'default'}
                external={action.external}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="spacious">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImage}>
            <HomeCarousel slides={home.carousel ?? []} />
          </div>
          <div className={styles.aboutDescription}>
            <ContentBody value={home.aboutBody} />
          </div>
        </div>
      </Section>

      <Section size="spacious" variant="muted" id="join">
        <Container width="prose">
          <div style={{textAlign: 'center'}}>
            <h2 style={{marginTop: 0}}>{home.joinHeading}</h2>
            <div className={styles.joinIntro}>
              <ContentBody value={home.joinBody} />
            </div>
          </div>
          {home.joinFormUrl && (
            <div className={styles.joinCard}>
              <OutboundLink href={home.joinFormUrl}>
                <em>{home.joinFormLinkLabel}</em>
              </OutboundLink>
              <iframe
                className={styles.iframe}
                src={home.joinFormUrl}
                title={home.joinFormTitle ?? undefined}
              >
                Loading…
              </iframe>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
