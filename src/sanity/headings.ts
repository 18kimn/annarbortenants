export function headingAnchor(text: string): string {
  return text
    .trim()
    .replace(/^\d+[.)]\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
