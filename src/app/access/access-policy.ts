export type SubscriptionMode = 'active' | 'grace' | 'read-only'
export type MembershipState = 'active' | 'inactive'

export interface AccessSnapshot {
  authenticated: boolean
  platformAdmin: boolean
  membershipState: MembershipState
  tenantSlug?: string
  assignedOutletIds: readonly string[]
  capabilities: readonly string[]
  subscriptionMode: SubscriptionMode
}

export interface RouteAccessRequirement {
  authentication: 'public' | 'session' | 'platform-admin'
  tenantSlug?: string
  outletId?: string
  capability?: string
  mutation?: boolean
}

export type AccessDecision =
  | { mode: 'allow'; reason: 'authorized' | 'public' }
  | { mode: 'read-only'; reason: 'subscription_read_only' }
  | {
      mode: 'deny'
      reason:
        | 'authentication_required'
        | 'membership_inactive'
        | 'platform_admin_required'
        | 'tenant_scope_mismatch'
        | 'outlet_scope_mismatch'
        | 'capability_missing'
    }

export function evaluateRouteAccess(
  snapshot: AccessSnapshot,
  requirement: RouteAccessRequirement,
): AccessDecision {
  if (requirement.authentication === 'public') {
    return { mode: 'allow', reason: 'public' }
  }

  if (!snapshot.authenticated) {
    return { mode: 'deny', reason: 'authentication_required' }
  }

  if (requirement.authentication === 'platform-admin') {
    return snapshot.platformAdmin
      ? { mode: 'allow', reason: 'authorized' }
      : { mode: 'deny', reason: 'platform_admin_required' }
  }

  if (snapshot.membershipState !== 'active') {
    return { mode: 'deny', reason: 'membership_inactive' }
  }

  if (
    requirement.tenantSlug &&
    requirement.tenantSlug !== snapshot.tenantSlug
  ) {
    return { mode: 'deny', reason: 'tenant_scope_mismatch' }
  }

  if (
    requirement.outletId &&
    !snapshot.assignedOutletIds.includes(requirement.outletId)
  ) {
    return { mode: 'deny', reason: 'outlet_scope_mismatch' }
  }

  if (
    requirement.capability &&
    !snapshot.capabilities.includes(requirement.capability)
  ) {
    return { mode: 'deny', reason: 'capability_missing' }
  }

  if (requirement.mutation && snapshot.subscriptionMode === 'read-only') {
    return { mode: 'read-only', reason: 'subscription_read_only' }
  }

  return { mode: 'allow', reason: 'authorized' }
}
