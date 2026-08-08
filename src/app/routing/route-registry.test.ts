import { describe, expect, it } from 'vitest'

import { appRouteRegistry } from '@/app/routing/route-registry'

describe('appRouteRegistry', () => {
  it('mendaftarkan tepat 41 route kanonis Screen Map', () => {
    expect(appRouteRegistry).toHaveLength(41)
  })

  it('memiliki id dan path unik', () => {
    const ids = appRouteRegistry.map((route) => route.id)
    const paths = appRouteRegistry.map((route) => route.path)

    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('mendaftarkan route kritis dengan parameter router yang aman', () => {
    const paths = appRouteRegistry.map((route) => route.path)

    expect(paths).toContain('/app/:tenantSlug/orders/:orderId')
    expect(paths).toContain('/app/:tenantSlug/orders/:orderId/receipt')
    expect(paths).toContain('/admin/tenants/:tenantId')
  })

  it('memberi shell dan vertical slice untuk setiap route', () => {
    for (const route of appRouteRegistry) {
      expect(route.path.startsWith('/')).toBe(true)
      expect(route.shell.length).toBeGreaterThan(0)
      expect(route.slice.length).toBeGreaterThan(0)
    }
  })
})
