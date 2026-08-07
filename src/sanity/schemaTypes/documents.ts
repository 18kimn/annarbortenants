export const siteSettings = {
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    {name: 'title', title: 'Site title', type: 'string'},
    {name: 'shortName', title: 'Short name', type: 'string'},
    {
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
    },
    {name: 'tagline', title: 'Footer tagline', type: 'text', rows: 3},
    {name: 'email', title: 'Contact email', type: 'string'},
    {
      name: 'emailDisplay',
      title: 'Contact email, as displayed',
      type: 'string',
    },
    {name: 'logo', title: 'Logo', type: 'contentImage'},
    {
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [{type: 'socialLink'}],
    },
    {
      name: 'primaryNav',
      title: 'Header navigation',
      type: 'array',
      of: [{type: 'navGroup'}],
    },
    {
      name: 'mobileNav',
      title: 'Mobile navigation',
      type: 'array',
      of: [{type: 'navGroup'}],
    },
    {
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      of: [{type: 'navColumn'}],
    },
    {
      name: 'legalLinks',
      title: 'Footer legal links',
      type: 'array',
      of: [{type: 'navLink'}],
    },
  ],
  preview: {select: {title: 'title'}},
}

export const homePage = {
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    {name: 'heroTitle', title: 'Hero title', type: 'string'},
    {
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 4,
    },
    {
      name: 'heroActions',
      title: 'Hero buttons',
      type: 'array',
      of: [{type: 'ctaAction'}],
    },
    {name: 'aboutBody', title: 'Introduction', type: 'blockContent'},
    {
      name: 'carousel',
      title: 'Photo carousel',
      type: 'array',
      of: [{type: 'carouselSlide'}],
    },
    {
      name: 'joinHeading',
      title: 'Join section heading',
      type: 'string',
    },
    {
      name: 'joinBody',
      title: 'Join section text',
      type: 'blockContent',
    },
    {name: 'joinFormUrl', title: 'Membership form URL', type: 'url'},
    {
      name: 'joinFormTitle',
      title: 'Membership form frame title',
      type: 'string',
    },
    {
      name: 'joinFormLinkLabel',
      title: 'Membership form link label',
      type: 'string',
    },
  ],
  preview: {select: {title: 'heroTitle'}},
}

export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
    },
    {name: 'subtitle', title: 'Subtitle', type: 'string'},
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Prose', value: 'prose'},
          {title: 'Container', value: 'container'},
        ],
      },
    },
    {name: 'body', title: 'Body', type: 'blockContent'},
    {
      name: 'seoDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
}

export const campaign = {
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
    },
    {name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3},
    {name: 'updatedAt', title: 'Last updated', type: 'date'},
    {
      name: 'updatedLabel',
      title: 'Last updated, as displayed',
      type: 'string',
    },
    {name: 'lede', title: 'Lede', type: 'simpleBlockContent'},
    {name: 'body', title: 'Body', type: 'blockContent'},
    {name: 'order', title: 'Order', type: 'number'},
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
}

export const post = {
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
    },
    {name: 'date', title: 'Publication date', type: 'date'},
    {name: 'body', title: 'Body', type: 'blockContent'},
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {select: {title: 'title', subtitle: 'date'}},
}

export const pressMention = {
  name: 'pressMention',
  title: 'Press mention',
  type: 'document',
  fields: [
    {name: 'title', title: 'Headline', type: 'string'},
    {name: 'publication', title: 'Publication', type: 'string'},
    {name: 'author', title: 'Author', type: 'string'},
    {name: 'date', title: 'Date', type: 'date'},
    {name: 'link', title: 'Link', type: 'url'},
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {select: {title: 'title', subtitle: 'publication'}},
}

export const resourceCategory = {
  name: 'resourceCategory',
  title: 'Resource category',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
    },
    {name: 'order', title: 'Order', type: 'number'},
  ],
  preview: {select: {title: 'title', subtitle: 'order'}},
}

export const resource = {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'href', title: 'Link', type: 'url'},
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'resourceCategory'}],
    },
    {
      name: 'order',
      title: 'Order within the category',
      type: 'number',
    },
  ],
  preview: {select: {title: 'title', subtitle: 'href'}},
}

export const tenantAssociation = {
  name: 'tenantAssociation',
  title: 'Tenant association',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'contactName', title: 'Contact name', type: 'string'},
    {name: 'contactEmail', title: 'Contact email', type: 'string'},
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
    {name: 'order', title: 'Order', type: 'number'},
  ],
  preview: {select: {title: 'name', subtitle: 'status'}},
}

export const faqItem = {
  name: 'faqItem',
  title: 'FAQ entry',
  type: 'document',
  fields: [
    {name: 'question', title: 'Question', type: 'string'},
    {name: 'answer', title: 'Answer', type: 'blockContent'},
    {name: 'order', title: 'Order', type: 'number'},
  ],
  preview: {select: {title: 'question', subtitle: 'order'}},
}
