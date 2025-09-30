'use client'

import Temp from '@/components/Temp'
import {OutboundLink} from '../components/OutboundLink'
import styles from './page.module.css'
import Image from 'next/image'
import {Email} from '../components/OutboundLink'
import {useState, useEffect} from 'react'
import HomeCarousel from '../components/HomeCarousel'

export default function Home() {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetch('/home.json')
      .then((res) => res.json())
      .then((images) => setImages(images))
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Temp />
      </div>
      <div className={styles.container}>
        <h1>The Ann Arbor Tenants Union</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <HomeCarousel images={images} />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>
            <p>
              We are the <strong>Ann Arbor Tenants Union</strong>, a
              democratic collective of tenants in Ann Arbor fighting
              for <b>stable, just, and affordable housing</b> through
              wielding our shared burden &mdash; and power &mdash; as
              renters. Become a member of your union today with the
              form below.
            </p>
            <p>
              The housing crisis in Ann Arbor is out of control and
              it&apos;s up to us to organize and stop it. We
              won&apos;t wait for politicians, service providers, or
              landlord parasites to save us &mdash; we&apos;re
              organizing to protect ourselves and create better
              housing for everyone in Ann Arbor.
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
              <OutboundLink href="/resources">
                Resources page
              </OutboundLink>{' '}
              -- we&apos;re only tenants like yourself that know a
              thing or two about the law through our own experience
              with it. If you want to talk to a tenant like yourself
              and strategize around collective action to improve your
              experience as a renter, please become a member of the
              AATU with the form below. We will follow up as
              we&apos;re able to -- and you can reach out to us at{' '}
              <Email /> for a faster response.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.joinContainer}>
        <h2 className={styles.join}>Join your union!</h2>
        <p>
          Alone we are weak, but together we are strong. Join your
          neighbors in your union <strong>today</strong> to ally
          yourself with other tenants and to build power together.
        </p>

        <p>
          Fill out the form below or visit{' '}
          <OutboundLink href="https://bit.ly/JoinAATU.">
            bit.ly/JoinAATU
          </OutboundLink>
          .
        </p>
        <div className={styles.iframeContainer}>
          <iframe
            className={styles.iframe}
            src="https://bit.ly/JoinAATU"
            width="640"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </main>
  )
}
