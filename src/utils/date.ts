function format(
  isoDate: string | undefined,
  options: Intl.DateTimeFormatOptions,
) {
  if (!isoDate) return ''
  const parsed = new Date(isoDate)
  if (Number.isNaN(parsed.getTime())) return isoDate
  return new Intl.DateTimeFormat('en-US', {
    ...options,
    timeZone: 'UTC',
  }).format(parsed)
}

export function formatPostDate(isoDate: string | undefined) {
  return format(isoDate, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatPressDate(isoDate: string | undefined) {
  return format(isoDate, {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })
}
