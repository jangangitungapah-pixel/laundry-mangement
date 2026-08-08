import { describe, expect, it } from 'vitest'

import {
  evaluateRouteAccess,
  type AccessSnapshot,
} from '@/app/access/access-policy'

const activeOwner: AccessSnapshot = {
  authenticated: true,
  platformAdmin: false,
  membershipState: 'active',
  tenantSlug: 'demo-laundry',
  assignedOutletIds: ['outlet-utama'],
  capabilities: ['orders.read', 'orders.create'],
  subscriptionMode: 'active',
}

describe('evaluateRouteAccess', () => {
  it('mengizinkan route publik tanpa session', () => {
    expect(
      evaluateRouteAccess(
        { ...activeOwner, authenticated: false },
        { authentication: 'public' },
      ),
    ).toEqual({ mode: 'allow', reason: 'public' })
  })

  it('menolak route tenant ketika session tidak tersedia', () => {
    expect(
      evaluateRouteAccess(
        { ...activeOwner, authenticated: false },
        { authentication: 'session' },
      ),
    ).toEqual({ mode: 'deny', reason: 'authentication_required' })
  })

  it('tidak menganggap route parameter sebagai bukti tenant access', () => {
    expect(
      evaluateRouteAccess(activeOwner, {
        authentication: 'session',
        tenantSlug: 'tenant-lain',
      }),
    ).toEqual({ mode: 'deny', reason: 'tenant_scope_mismatch' })
  })

  it('memeriksa outlet assignment dan capability secara terpisah', () => {
    expect(
      evaluateRouteAccess(activeOwner, {
        authentication: 'session',
        tenantSlug: 'demo-laundry',
        outletId: 'outlet-lain',
        capability: 'orders.read',
      }),
    ).toEqual({ mode: 'deny', reason: 'outlet_scope_mismatch' })

    expect(
      evaluateRouteAccess(activeOwner, {
        authentication: 'session',
        tenantSlug: 'demo-laundry',
        capability: 'billing.manage',
      }),
    ).toEqual({ mode: 'deny', reason: 'capability_missing' })
  })

  it('mengubah mutation menjadi read-only tanpa menutup data yang sah', () => {
    expect(
      evaluateRouteAccess(
        { ...activeOwner, subscriptionMode: 'read-only' },
        {
          authentication: 'session',
          tenantSlug: 'demo-laundry',
          capability: 'orders.create',
          mutation: true,
        },
      ),
    ).toEqual({ mode: 'read-only', reason: 'subscription_read_only' })
  })

  it('memisahkan akses platform dari membership tenant', () => {
    expect(
      evaluateRouteAccess(activeOwner, {
        authentication: 'platform-admin',
      }),
    ).toEqual({ mode: 'deny', reason: 'platform_admin_required' })
  })
})
