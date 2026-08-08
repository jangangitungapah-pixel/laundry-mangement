import type { AccessSnapshot } from '@/app/access/access-policy'
import type {
  AppContextGateway,
  ServiceResult,
} from '@/app/contracts/service-contract'

export const mockOwnerAccess: AccessSnapshot = {
  authenticated: true,
  platformAdmin: false,
  membershipState: 'active',
  tenantSlug: 'demo-laundry',
  assignedOutletIds: ['outlet-utama'],
  capabilities: [],
  subscriptionMode: 'active',
}

export function createMockAppContextGateway(
  access: AccessSnapshot = mockOwnerAccess,
): AppContextGateway {
  return {
    readAccessSnapshot(): Promise<ServiceResult<AccessSnapshot>> {
      return Promise.resolve({ ok: true, data: access })
    },
  }
}
