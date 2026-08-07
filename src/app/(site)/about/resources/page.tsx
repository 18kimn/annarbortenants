import PageView, {pageMetadata} from '@/components/content/PageView'

const slug = 'about/resources'

export const generateMetadata = () => pageMetadata(slug)

export default function Page() {
  return <PageView slug={slug} />
}
