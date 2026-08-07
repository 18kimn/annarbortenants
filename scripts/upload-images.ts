import fs from 'node:fs'
import path from 'node:path'
import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error(
    'Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before running this script.',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-10-01',
  useCdn: false,
})

const publicDir = path.join(process.cwd(), 'public')
const uploadedAssets = new Map<string, string>()

async function assetIdFor(legacyPath: string) {
  const cached = uploadedAssets.get(legacyPath)
  if (cached) return cached

  const filePath = path.join(publicDir, legacyPath.replace(/^\//, ''))
  if (!fs.existsSync(filePath)) {
    console.warn(`  missing file, skipping: ${legacyPath}`)
    return null
  }

  const asset = await client.assets.upload(
    'image',
    fs.createReadStream(filePath),
    {
      filename: path.basename(filePath),
    },
  )
  uploadedAssets.set(legacyPath, asset._id)
  console.log(`  uploaded ${legacyPath} -> ${asset._id}`)
  return asset._id
}

async function attachAssets(value: unknown): Promise<boolean> {
  if (Array.isArray(value)) {
    const results = await Promise.all(value.map(attachAssets))
    return results.some(Boolean)
  }

  if (!value || typeof value !== 'object') return false

  const record = value as Record<string, unknown>
  let changed = false

  if (
    record._type === 'contentImage' &&
    typeof record.legacyPath === 'string' &&
    !record.asset
  ) {
    const assetId = await assetIdFor(record.legacyPath)
    if (assetId) {
      record.asset = {_type: 'reference', _ref: assetId}
      changed = true
    }
  }

  for (const nested of Object.values(record)) {
    if (await attachAssets(nested)) changed = true
  }

  return changed
}

async function uploadAll() {
  const documents = await client.fetch<Record<string, unknown>[]>(
    '*[!(_id in path("drafts.**"))]',
  )

  for (const document of documents) {
    if (await attachAssets(document)) {
      await client.createOrReplace(document as never)
      console.log(`patched ${document._id}`)
    }
  }

  console.log(`Uploaded ${uploadedAssets.size} images.`)
}

uploadAll().catch((error) => {
  console.error(error)
  process.exit(1)
})
