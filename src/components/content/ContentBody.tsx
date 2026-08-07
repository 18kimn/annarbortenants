import Link from 'next/link'
import {PortableText, toPlainText} from '@portabletext/react'
import type {
  PortableTextComponents,
  PortableTextBlock,
} from '@portabletext/react'
import {OutboundLink} from '@/components/OutboundLink'
import LeaseCalculator from './LeaseCalculator'
import DonateButton from './DonateButton'
import PictureBlock from './blocks/Picture'
import LogoRow from './blocks/LogoRow'
import CallToAction from './blocks/CallToAction'
import Testimonial from './blocks/Testimonial'
import Embed from './blocks/Embed'
import TableOfContents from './blocks/TableOfContents'
import AssociationList from './blocks/AssociationList'
import ResourceList from './blocks/ResourceList'
import PressMentionList from './blocks/PressMentionList'
import PostList from './blocks/PostList'
import FaqList from './blocks/FaqList'
import FootnoteList from './blocks/FootnoteList'
import {headingAnchor} from '@/sanity/headings'
import type {ContentValue, ListData} from '@/sanity/types'

function buildContentComponents(
  body: ContentValue,
  listData?: ListData,
): PortableTextComponents {
  const heading = (Tag: 'h2' | 'h3' | 'h4') =>
    function Heading({
      children,
      value,
    }: {
      children?: React.ReactNode
      value: PortableTextBlock
    }) {
      return (
        <Tag id={headingAnchor(toPlainText(value))}>{children}</Tag>
      )
    }

  return {
    block: {
      h2: heading('h2'),
      h3: heading('h3'),
      h4: heading('h4'),
      blockquote: ({children}) => <blockquote>{children}</blockquote>,
    },
    marks: {
      underline: ({children}) => <u>{children}</u>,
      sup: ({children}) => <sup>{children}</sup>,
      link: ({value, children}) => {
        const href = value?.href ?? ''
        if (value?.external) {
          return <OutboundLink href={href}>{children}</OutboundLink>
        }
        if (href.startsWith('/')) {
          return <Link href={href}>{children}</Link>
        }
        return <a href={href}>{children}</a>
      },
    },
    types: {
      contentImage: ({value}) => <PictureBlock image={value} />,

      logoRow: ({value}) => <LogoRow logos={value.logos ?? []} />,

      callToAction: ({value}) => (
        <CallToAction title={value.title} action={value.action} />
      ),

      testimonial: ({value}) => (
        <Testimonial
          quote={value.quote}
          attribution={value.attribution}
        />
      ),

      embed: ({value}) => (
        <Embed
          url={value.url}
          title={value.title}
          width={value.width}
        />
      ),

      donateButton: ({value}) => (
        <DonateButton
          hostedButtonId={value.hostedButtonId}
          imageSrc={value.imageSrc}
          imageAlt={value.imageAlt}
          imageTitle={value.imageTitle}
        />
      ),

      leaseCalculator: ({value}) => (
        <LeaseCalculator
          heading={value.heading}
          intro={value.intro}
          fieldLabel={value.fieldLabel}
          amendmentDate={value.amendmentDate}
          effectiveOffsetDays={value.effectiveOffsetDays}
          milestones={value.milestones ?? []}
        />
      ),

      tableOfContents: ({value}) => (
        <TableOfContents title={value.title} body={body} />
      ),

      divider: () => <hr />,

      associationList: ({value}) => (
        <AssociationList
          associations={listData?.associations ?? []}
          status={value.status}
          layout={value.layout}
        />
      ),

      resourceList: ({value}) => (
        <ResourceList
          categories={listData?.resourceCategories ?? []}
          showTableOfContents={value.showTableOfContents}
        />
      ),

      pressMentionList: ({value}) => (
        <PressMentionList
          mentions={listData?.pressMentions ?? []}
          limit={value.limit}
        />
      ),

      postList: ({value}) => (
        <PostList posts={listData?.posts ?? []} limit={value.limit} />
      ),

      faqList: ({value}) => (
        <FaqList
          title={value.title}
          items={listData?.faqItems ?? []}
        />
      ),

      footnoteList: ({value}) => (
        <FootnoteList
          title={value.title}
          footnotes={value.footnotes ?? []}
          listData={listData}
        />
      ),
    },
  }
}

export default function ContentBody({
  value,
  listData,
}: {
  value?: ContentValue | null
  listData?: ListData
}) {
  if (!value?.length) return null
  return (
    <PortableText
      value={value}
      components={buildContentComponents(value, listData)}
    />
  )
}
