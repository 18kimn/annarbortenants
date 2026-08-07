import styles from '../Content.module.css'

export default function Testimonial({
  quote,
  attribution,
}: {
  quote: string
  attribution?: string
}) {
  return (
    <figure className={styles.testimonial}>
      <p className={styles.testimonialQuote}>{quote}</p>
      <figcaption className={styles.testimonialAttribution}>
        {attribution}
      </figcaption>
    </figure>
  )
}
