import Image from 'next/image'
import styles from '../Content.module.css'
import {imageSrc} from '@/sanity/image'
import type {ContentImage} from '@/sanity/types'

export function Picture({
  image,
  className,
}: {
  image: ContentImage
  className?: string
}) {
  const src = imageSrc(image, image.width)
  if (!src) return null

  const picture = (
    <Image
      className={className}
      src={src}
      alt={image.alt ?? ''}
      width={image.width ?? 1200}
      height={image.height ?? 800}
    />
  )

  if (!image.caption) return picture

  return (
    <figure className={styles.figure}>
      {picture}
      <figcaption className={styles.caption}>
        {image.caption}
      </figcaption>
    </figure>
  )
}

export default function PictureBlock({image}: {image: ContentImage}) {
  if (image.variant === 'framed') {
    return (
      <div className={styles.imageFramed}>
        <Picture image={image} />
      </div>
    )
  }
  return <Picture image={image} className={styles.image} />
}
