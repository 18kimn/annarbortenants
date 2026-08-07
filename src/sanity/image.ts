import imageUrlBuilder from '@sanity/image-url'
import {dataset, isSanityConfigured, projectId} from './env'
import type {ContentImage} from './types'

const builder =
  isSanityConfigured && imageUrlBuilder({projectId, dataset})

export function imageSrc(
  image: ContentImage | null | undefined,
  width?: number,
): string {
  if (!builder || !image?.asset?._ref) return ''
  const url = builder.image(image)
  return (width ? url.width(width) : url).auto('format').url()
}
