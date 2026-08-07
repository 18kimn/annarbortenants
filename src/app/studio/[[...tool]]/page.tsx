import {isSanityConfigured} from '@/sanity/env'
import StudioSetupNotice from './StudioSetupNotice'
import Studio from './Studio'

export const dynamic = 'force-static'

export {metadata, viewport} from 'next-sanity/studio'

export default function StudioPage() {
  if (!isSanityConfigured) return <StudioSetupNotice />
  return <Studio />
}
