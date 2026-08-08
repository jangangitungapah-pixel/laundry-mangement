import { describe, expect, it } from 'vitest'

import { createFormatters } from '@/shared/lib/formatters'

describe('createFormatters', () => {
  const formatters = createFormatters({
    locale: 'id-ID',
    currency: 'IDR',
    timeZone: 'Asia/Jakarta',
  })

  it('memformat rupiah tanpa pecahan', () => {
    expect(formatters.money(57375)).toMatch(/Rp\s?57\.375/)
  })

  it('menggunakan timezone tenant yang diberikan', () => {
    expect(formatters.dateTime('2026-08-08T08:00:00.000Z')).toContain('15.00')
  })
})
