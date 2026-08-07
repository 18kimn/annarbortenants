import {evaluate, parse} from 'groq-js'
import {isSanityConfigured} from './env'

type QueryParams = Record<string, unknown>

let migratedDataset: Record<string, unknown>[] | null = null

async function loadMigratedDataset() {
  if (migratedDataset === null) {
    const {default: documents} =
      await import('../../content/aatu-content.json')
    migratedDataset = documents as Record<string, unknown>[]
  }
  return migratedDataset
}

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
): Promise<T> {
  if (isSanityConfigured) {
    const {client} = await import('./client')
    return client.fetch<T>(query, params)
  }

  const evaluated = await evaluate(parse(query), {
    dataset: await loadMigratedDataset(),
    params,
  })
  return (await evaluated.get()) as T
}
