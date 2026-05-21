/** 12×12 mock QR pattern for referral download */
export const REFERRAL_QR_PATTERN = [
  1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1,
  0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1,
  0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
  0, 0, 1, 0, 1,
] as const

export function downloadReferralQrPng(
  pattern: readonly number[],
  options: { color?: string; filename?: string; gridSize?: number } = {},
) {
  const { color = '#1a1a1a', filename = 'merge-stars-referral-qr.png', gridSize = 12 } = options
  const cell = 10
  const pad = 16
  const size = gridSize * cell + pad * 2
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = color

  const cells = pattern.slice(0, gridSize * gridSize)
  cells.forEach((filled, i) => {
    if (!filled) return
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    ctx.fillRect(pad + col * cell, pad + row * cell, cell - 1, cell - 1)
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export async function shareReferralLink(link: string): Promise<'shared' | 'copied'> {
  const payload = {
    title: 'MERGE STARS — Referral',
    text: 'Join MERGE STARS with my referral link',
    url: link,
  }

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share(payload)
      return 'shared'
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') throw err
    }
  }

  await navigator.clipboard.writeText(link)
  return 'copied'
}
