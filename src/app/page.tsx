'use client'

import {OutboundLink, Email} from '@/components/OutboundLink'
import styles from './page.module.css'
import {useState, useEffect} from 'react'
import HomeCarousel from '@/components/HomeCarousel'
import {Section, Container} from '@/components/Layout'
import {Button} from '@/components/Button'
import Link from 'next/link'

export default function Home() {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetch('/home.json')
      .then((res) => res.json())
      .then((images) => setImages(images))
  }, [])

  return (
    <>
      <Section size="spacious" variant="elevated">
        <Container width="prose" className={styles.hero}>
          <h1 className={styles.heroTitle}>
            The Ann Arbor Tenants Union
          </h1>
          <p className={styles.heroSubtitle}>
            A democratic collective of tenants in Ann Arbor fighting
            for stable, just, and affordable housing through wielding
            our shared burden, and power, as renters.
          </p>
          <div className={styles.heroActions}>
            <Button href="#join" variant="primary" size="large">
              Join the AATU
            </Button>
            <Button
              href="/membership"
              variant="secondary"
              size="large"
            >
              Why join?
            </Button>
          </div>
        </Container>
      </Section>

      <Section size="spacious">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImage}>
            <HomeCarousel images={images} />
          </div>
          <div className={styles.aboutDescription}>
            <p>
              We are the <strong>Ann Arbor Tenants Union</strong>, a
              democratic collective of tenants in Ann Arbor fighting
              for <b>stable, just, and affordable housing</b> through
              wielding our shared burden, and power, as renters. We
              invite you to join hundreds of Ann Arbor renters in the
              AATU today.
            </p>
            <p>
              The housing crisis in Ann Arbor is out of control and
              it&apos;s up to us to organize and stop it. We
              won&apos;t wait for politicians, service providers, or
              landlord parasites to save us — we&apos;re organizing to
              protect ourselves and create better housing for everyone
              in Ann Arbor.
            </p>
            <p>
              We believe we can win lower rent, timely maintenance,
              and stability through the power we hold as renters
              paying for our landlords&apos; mortgages. They depend on
              us, and we can fight and <strong>win</strong> when we
              recognize that as our power and use it as leverage.
              Crucially, we&apos;re <strong>not</strong> a
              service-providing nonprofit, or a legal aid group, or
              even an advocacy organization. We&apos;re tenants like
              you.
            </p>
            <p>
              If you want to talk to a lawyer, you can check out our{' '}
              <OutboundLink href="/about/resources">
                Resources page
              </OutboundLink>
              {'. '}
              We&apos;re only tenants like yourself that know a thing
              or two about the law through our own experience with it.
              If you want to talk to a tenant like yourself and
              strategize around collective action to improve your
              experience as a renter, please become a member of the
              AATU with the form below. We will follow up as
              we&apos;re able to, and you can reach out to us at{' '}
              <Email /> for a faster response.
            </p>
          </div>
        </div>
      </Section>

      <Section size="spacious" variant="muted" id="join">
        <Container width="prose">
          <div style={{textAlign: 'center'}}>
            <h2 style={{marginTop: 0}}>Join your union</h2>
            <p className={styles.joinIntro}>
              Alone we are weak, but together we are strong. Join your
              neighbors in your union <strong>today</strong> to ally
              yourself with other tenants and to build power together.
            </p>
            <p className={styles.joinIntro}>
              Visit our{' '}
              <Link href="/membership">Membership page</Link> to learn
              more about why we think membership is so important.
            </p>
          </div>
          <div className={styles.joinCard}>
            <OutboundLink href="https://bit.ly/JoinAATU">
              <em>Click here to open in another window.</em>
            </OutboundLink>
            <iframe
              className={styles.iframe}
              src="https://bit.ly/JoinAATU"
              title="AATU Membership Form"
            >
              Loading…
            </iframe>
          </div>
        </Container>
      </Section>
    </>
  )
}
