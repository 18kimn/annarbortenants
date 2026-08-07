'use client'

import Script from 'next/script'
import styles from './Content.module.css'

type PayPalDonation = {
  Donation: {
    Button: (options: unknown) => {render: (selector: string) => void}
  }
}

export default function DonateButton({
  hostedButtonId,
  imageSrc,
  imageAlt,
  imageTitle,
}: {
  hostedButtonId: string
  imageSrc?: string
  imageAlt?: string
  imageTitle?: string
}) {
  return (
    <div className={styles.donateButton}>
      <div id="donate-button" />
      <Script
        src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
        strategy="afterInteractive"
        onLoad={() => {
          const paypal = (
            window as unknown as {PayPal?: PayPalDonation}
          ).PayPal
          if (!paypal) return
          paypal.Donation.Button({
            env: 'production',
            hosted_button_id: hostedButtonId,
            image: {src: imageSrc, alt: imageAlt, title: imageTitle},
          }).render('#donate-button')
        }}
      />
    </div>
  )
}
