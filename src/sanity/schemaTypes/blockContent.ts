const decorators = [
  {title: 'Strong', value: 'strong'},
  {title: 'Emphasis', value: 'em'},
  {title: 'Underline', value: 'underline'},
  {title: 'Code', value: 'code'},
  {title: 'Superscript', value: 'sup'},
]

const styles = [
  {title: 'Normal', value: 'normal'},
  {title: 'Heading 2', value: 'h2'},
  {title: 'Heading 3', value: 'h3'},
  {title: 'Heading 4', value: 'h4'},
  {title: 'Quote', value: 'blockquote'},
]

const richTextBlock = {
  type: 'block',
  styles,
  lists: [
    {title: 'Bulleted', value: 'bullet'},
    {title: 'Numbered', value: 'number'},
  ],
  marks: {
    decorators,
    annotations: [{type: 'link'}],
  },
}

export const simpleBlockContent = {
  name: 'simpleBlockContent',
  title: 'Text',
  type: 'array',
  of: [richTextBlock],
}

export const logoRow = {
  name: 'logoRow',
  title: 'Logo row',
  type: 'object',
  fields: [
    {
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [{type: 'contentImage'}],
    },
  ],
}

export const callToAction = {
  name: 'callToAction',
  title: 'Call to action',
  type: 'object',
  fields: [
    {name: 'title', title: 'Heading', type: 'string'},
    {name: 'label', title: 'Button label', type: 'string'},
    {name: 'href', title: 'Destination', type: 'string'},
    {name: 'external', title: 'Open in a new tab', type: 'boolean'},
    {
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
        ],
      },
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Large', value: 'large'},
        ],
      },
    },
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
}

export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    {name: 'quote', title: 'Quote', type: 'text', rows: 4},
    {name: 'attribution', title: 'Attribution', type: 'string'},
  ],
  preview: {select: {title: 'quote', subtitle: 'attribution'}},
}

export const embed = {
  name: 'embed',
  title: 'Embedded frame',
  type: 'object',
  fields: [
    {name: 'url', title: 'URL', type: 'url'},
    {name: 'title', title: 'Frame title', type: 'string'},
    {
      name: 'width',
      title: 'Width',
      type: 'string',
      options: {
        list: [
          {title: 'Prose', value: 'prose'},
          {title: 'Wide', value: 'wide'},
        ],
      },
    },
  ],
  preview: {select: {title: 'title', subtitle: 'url'}},
}

export const donateButton = {
  name: 'donateButton',
  title: 'PayPal donate button',
  type: 'object',
  fields: [
    {
      name: 'hostedButtonId',
      title: 'Hosted button ID',
      type: 'string',
    },
    {name: 'imageSrc', title: 'Button image URL', type: 'url'},
    {
      name: 'imageAlt',
      title: 'Button image alt text',
      type: 'string',
    },
    {name: 'imageTitle', title: 'Button image title', type: 'string'},
  ],
  preview: {select: {title: 'hostedButtonId'}},
}

export const leaseCalculator = {
  name: 'leaseCalculator',
  title: 'Lease renewal calculator',
  type: 'object',
  fields: [
    {name: 'heading', title: 'Heading', type: 'string'},
    {name: 'intro', title: 'Intro', type: 'text', rows: 3},
    {name: 'fieldLabel', title: 'Date field label', type: 'string'},
    {
      name: 'amendmentDate',
      title: 'Ordinance amendment date',
      type: 'date',
    },
    {
      name: 'effectiveOffsetDays',
      title: 'Days until the amendment took effect',
      type: 'number',
    },
    {
      name: 'milestones',
      title: 'Milestones',
      type: 'array',
      of: [{type: 'leaseMilestone'}],
    },
  ],
  preview: {select: {title: 'heading'}},
}

export const tableOfContents = {
  name: 'tableOfContents',
  title: 'Table of contents',
  type: 'object',
  fields: [{name: 'title', title: 'Title', type: 'string'}],
  preview: {select: {title: 'title'}},
}

export const associationList = {
  name: 'associationList',
  title: 'Tenant association list',
  type: 'object',
  fields: [
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active or developing', value: 'active'},
          {title: 'Inactive or sunsetted', value: 'inactive'},
        ],
      },
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Detailed', value: 'detailed'},
          {title: 'Compact list', value: 'list'},
        ],
      },
    },
  ],
  preview: {select: {title: 'status'}},
}

export const resourceList = {
  name: 'resourceList',
  title: 'Resource list',
  type: 'object',
  fields: [
    {
      name: 'showTableOfContents',
      title: 'Show a table of contents',
      type: 'boolean',
    },
  ],
}

export const pressMentionList = {
  name: 'pressMentionList',
  title: 'Press mention list',
  type: 'object',
  fields: [{name: 'limit', title: 'Maximum entries', type: 'number'}],
}

export const postList = {
  name: 'postList',
  title: 'Blog post list',
  type: 'object',
  fields: [{name: 'limit', title: 'Maximum entries', type: 'number'}],
}

export const footnoteList = {
  name: 'footnoteList',
  title: 'Footnotes',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {
      name: 'footnotes',
      title: 'Footnotes',
      type: 'array',
      of: [{type: 'footnote'}],
    },
  ],
  preview: {select: {title: 'title'}},
}

export const divider = {
  name: 'divider',
  title: 'Divider',
  type: 'object',
  fields: [{name: 'label', title: 'Editor label', type: 'string'}],
}

export const blockContent = {
  name: 'blockContent',
  title: 'Content',
  type: 'array',
  of: [
    richTextBlock,
    {type: 'contentImage'},
    {type: 'logoRow'},
    {type: 'callToAction'},
    {type: 'testimonial'},
    {type: 'embed'},
    {type: 'donateButton'},
    {type: 'leaseCalculator'},
    {type: 'tableOfContents'},
    {type: 'associationList'},
    {type: 'resourceList'},
    {type: 'pressMentionList'},
    {type: 'postList'},
    {type: 'footnoteList'},
    {type: 'divider'},
  ],
}
