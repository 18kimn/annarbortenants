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

The site works with no Sanity credentials. When
`NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, `sanityFetch` evaluates the
same GROQ queries against `content/aatu-content.json` locally with
`groq-js`, so every page renders the migrated content exactly as it
would from the hosted dataset.

## Connecting a Sanity project

1. Create a project at https://sanity.io/manage.
2. Add the environment variables:

   ```sh
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. Import the migrated content:

   ```sh
   pnpm content:import
   ```

4. Upload the images that still live in `public/` and attach them to
   their documents (needs a write token):

   ```sh
   SANITY_API_WRITE_TOKEN=... pnpm content:upload-images
   ```

Once the project id is set, `/studio` serves the embedded Sanity
Studio and all queries hit the hosted dataset instead of the local
file.

## Content model

| Type                            | Purpose                                                      |
| ------------------------------- | ------------------------------------------------------------ |
| `siteSettings`                  | Site title, contact email, socials, header/footer navigation |
| `homePage`                      | Hero, intro copy, photo carousel, membership form embed      |
| `page`                          | Every standard route, addressed by slug                      |
| `campaign`                      | Campaign pages under `/campaigns/[slug]`                     |
| `post`                          | Blog posts and press releases                                |
| `pressMention`                  | Entries on `/news`                                           |
| `resource` / `resourceCategory` | Entries on `/about/resources`                                |
| `tenantAssociation`             | Entries on `/about/directory`                                |
| `faqItem`                       | Entries on `/about/faq`                                      |

Page and campaign bodies are Portable Text. Alongside normal rich text
they can contain purpose-built blocks: `callToAction`, `testimonial`,
`contentImage`, `logoRow`, `embed`, `donateButton`, `leaseCalculator`,
`tableOfContents`, `footnoteList`, `divider`, and four list blocks
(`associationList`, `resourceList`, `pressMentionList`, `postList`)
that pull in the collections above. That is how interactive pieces
like the Right to Renew date calculator and the PayPal donate button
stay editable rather than hard-coded.

## Re-running the migration

`content/legacy/` holds the pre-Sanity source of truth: the original
blog markdown, the Tenant Bill of Rights HTML, the carousel and press
JSON, and the prose of every page that used to be written directly in
JSX. Custom `aatu-*` elements in those HTML files mark where the
non-prose blocks belong.

```sh
pnpm content:migrate
```

regenerates `content/aatu-content.ndjson` (for
`sanity dataset import`) and `content/aatu-content.json` (used by the
offline query path). The conversion is deterministic — the same input
produces the same `_key`s.

Known differences from the pre-Sanity site:

- The `↩︎` back-links from each Tenant Bill of Rights footnote to its
  reference are gone; the forward `#fn1` links still resolve.
- Heading anchors are derived from the heading text (`headingAnchor`)
  rather than stored. This reproduces every anchor the Bill of Rights
  page used to emit, but an anchor changes if its heading is retitled.
- Blog posts render their title as the page heading. Three posts
  repeated that title as a markdown `# ` heading and the duplicate was
  dropped. For `ten-reasons` the frontmatter title ("Ten reasons to
  start a tenants association") differed from the heading the page used
  to show ("10 Reasons to Start a Tenant Association"), so the wording
  of that page's visible heading changed.
