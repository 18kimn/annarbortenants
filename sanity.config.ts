import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'
import {
  apiVersion,
  dataset,
  projectId,
  studioBasePath,
} from './src/sanity/env'

const singletons = [
  {id: 'siteSettings', type: 'siteSettings', title: 'Site settings'},
  {id: 'homePage', type: 'homePage', title: 'Home page'},
]

const singletonTypes = new Set(singletons.map((s) => s.type))

const collections = [
  {type: 'page', title: 'Pages'},
  {type: 'campaign', title: 'Campaigns'},
  {type: 'post', title: 'Blog posts'},
  {type: 'pressMention', title: 'Press mentions'},
  {type: 'faqItem', title: 'FAQ entries'},
  {type: 'resourceCategory', title: 'Resource categories'},
  {type: 'resource', title: 'Resources'},
  {type: 'tenantAssociation', title: 'Tenant associations'},
]

export default defineConfig({
  name: 'annarbortenants',
  title: 'Ann Arbor Tenants Union',
  basePath: studioBasePath,
  projectId: projectId || 'missing-project-id',
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (template) => !singletonTypes.has(template.schemaType),
      ),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            ...singletons.map((singleton) =>
              S.listItem()
                .title(singleton.title)
                .id(singleton.id)
                .child(
                  S.document()
                    .schemaType(singleton.type)
                    .documentId(singleton.id)
                    .title(singleton.title),
                ),
            ),
            S.divider(),
            ...collections.map((collection) =>
              S.documentTypeListItem(collection.type).title(
                collection.title,
              ),
            ),
          ]),
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) =>
            ['publish', 'discardChanges', 'restore'].includes(
              action ?? '',
            ),
          )
        : input,
  },
})
