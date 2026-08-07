import {required} from './validation'

export const contentImage = {
  name: 'contentImage',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    {name: 'alt', title: 'Alternative text', type: 'string'},
    {name: 'caption', title: 'Caption', type: 'string'},
    {name: 'width', title: 'Intrinsic width', type: 'number'},
    {name: 'height', title: 'Intrinsic height', type: 'number'},
    {
      name: 'variant',
      title: 'Display variant',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Framed', value: 'framed'},
        ],
      },
    },
  ],
}

export const navLink = {
  name: 'navLink',
  title: 'Navigation link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: required,
    },
    {
      name: 'href',
      title: 'Destination',
      type: 'string',
      validation: required,
    },
    {name: 'external', title: 'External', type: 'boolean'},
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
}

export const navGroup = {
  name: 'navGroup',
  title: 'Navigation entry',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: required,
    },
    {
      name: 'href',
      title: 'Destination',
      type: 'string',
      validation: required,
    },
    {
      name: 'links',
      title: 'Dropdown links',
      type: 'array',
      of: [{type: 'navLink'}],
    },
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
}

export const navColumn = {
  name: 'navColumn',
  title: 'Footer column',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: required,
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'navLink'}],
      validation: required,
    },
  ],
  preview: {select: {title: 'title'}},
}

export const socialLink = {
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Email', value: 'email'},
        ],
      },
      validation: required,
    },
    {
      name: 'href',
      title: 'Destination',
      type: 'string',
      validation: required,
    },
    {name: 'label', title: 'Accessible label', type: 'string'},
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
}

export const ctaAction = {
  name: 'ctaAction',
  title: 'Action',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: required,
    },
    {
      name: 'href',
      title: 'Destination',
      type: 'string',
      validation: required,
    },
    {
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Ghost', value: 'ghost'},
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
          {title: 'Small', value: 'small'},
        ],
      },
    },
    {name: 'external', title: 'Open in a new tab', type: 'boolean'},
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
}

export const carouselSlide = {
  name: 'carouselSlide',
  title: 'Carousel slide',
  type: 'object',
  fields: [
    {name: 'image', title: 'Image', type: 'contentImage'},
    {name: 'caption', title: 'Caption', type: 'text', rows: 3},
  ],
  preview: {select: {title: 'caption', media: 'image'}},
}

export const leaseMilestone = {
  name: 'leaseMilestone',
  title: 'Lease milestone',
  type: 'object',
  fields: [
    {
      name: 'days',
      title: 'Days after the lease start',
      type: 'number',
      validation: required,
    },
    {
      name: 'text',
      title: 'What happens on this date',
      type: 'text',
      rows: 3,
      validation: required,
    },
  ],
  preview: {select: {title: 'text', subtitle: 'days'}},
}

export const footnote = {
  name: 'footnote',
  title: 'Footnote',
  type: 'object',
  fields: [
    {
      name: 'number',
      title: 'Number',
      type: 'number',
      validation: required,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'simpleBlockContent',
      validation: required,
    },
  ],
  preview: {select: {title: 'number'}},
}
