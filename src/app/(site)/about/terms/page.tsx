import PageView, {pageMetadata} from '@/components/content/PageView'

const slug = 'about/terms'

export const generateMetadata = () => pageMetadata(slug)

export default function Page() {
  return <PageView slug={slug} />
}
