import imageUrlBuilder from '@sanity/image-url'
import {dataset, isSanityConfigured, projectId} from './env'
import type {ContentImage} from './types'

const builder =
  isSanityConfigured && imageUrlBuilder({projectId, dataset})

export function imageSrc(
  image: ContentImage | undefined,
  width?: number,
): string {
  if (!image) return ''
  if (builder && image.asset?._ref) {
    const url = builder.image(image)
    return (width ? url.width(width) : url).auto('format').url()
  }
  return image.legacyPath ?? ''
}

export function imageAlt(image: ContentImage | undefined): string {
  return image?.alt ?? ''
}
