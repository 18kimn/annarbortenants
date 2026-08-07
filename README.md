# AATU website

Next.js app router site for the Ann Arbor Tenants Union. All page
copy, navigation, campaigns, blog posts, press mentions, resources,
FAQ entries, and tenant associations live in Sanity as structured
content; the React components only render query results.

## Running the site

```sh
pnpm install
pnpm dev
```

Sanity is the only source of content, so the site needs credentials to
render anything:

```sh
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

`/studio` serves the embedded Sanity Studio against the same dataset.

## Typed queries

Queries are wrapped in `defineQuery` in `src/sanity/queries.ts`, and

```sh
pnpm typegen
```

extracts the schema to `schema.json` and regenerates
`src/sanity/sanity.types.ts`. That file exports a result type per
query and augments `@sanity/client`, so
`client.fetch(pageBySlugQuery)` returns the exact projected shape with
no generic. Re-run it after changing a schema type or a query;
`pnpm typecheck` then catches components reading fields the query
never asked for.

`src/sanity/types.ts` is the surface components import. Every type in
it is derived from a generated query result rather than written by
hand, so it cannot drift from the schema.
