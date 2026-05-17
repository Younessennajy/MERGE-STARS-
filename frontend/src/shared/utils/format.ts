/** Format a number as USD currency */
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

/** Format a date to a readable string */
export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    ...opts,
  }).format(new Date(date))
}

/** Format grams to human-readable weight */
export function formatWeight(grams: number): string {
  return grams >= 1000
    ? `${(grams / 1000).toFixed(2)} kg`
    : `${grams} g`
}

/** Format a percentage change with sign */
export function formatChange(pct: number): string {
  const sign = pct >= 0 ? '+' : ''
  return `${sign}${pct.toFixed(2)}%`
}

/** Truncate a UUID for display */
export function shortId(id: string): string {
  return id.slice(0, 8).toUpperCase()
}
