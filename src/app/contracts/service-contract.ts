import type { AccessSnapshot } from '@/app/access/access-policy'

export interface ServiceFailure {
  code: string
  message: string
  correlationId?: string
  retryable: boolean
}

export type ServiceResult<T> =
  { ok: true; data: T } | { ok: false; error: ServiceFailure }

export interface AppContextGateway {
  readAccessSnapshot(): Promise<ServiceResult<AccessSnapshot>>
}
