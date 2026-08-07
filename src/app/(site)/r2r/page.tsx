import CampaignView, {
  campaignMetadata,
} from '@/components/content/CampaignView'

const slug = 'r2r'

export const generateMetadata = () => campaignMetadata(slug)

export default function R2RPage() {
  return <CampaignView slug={slug} />
}
