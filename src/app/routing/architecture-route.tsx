import type { PropsWithChildren } from 'react'

import type { AppRouteDefinition } from '@/app/routing/route-registry'
import {
  AdminShell,
  AuthShell,
  OnboardingShell,
  PublicShell,
  TenantShell,
} from '@/app/shells'
import { Alert, Badge, SectionCard } from '@/shared/ui'

function RouteContractPage({ route }: { route: AppRouteDefinition }) {
  return (
    <div data-route-id={route.id} className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge tone="primary">APP SHELL</Badge>
          <Badge>{route.slice}</Badge>
        </div>

        <h1 className="m-0 text-3xl font-black tracking-tight text-ink md:text-4xl">
          {route.title}
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
          {route.description}
        </p>
      </div>

      <SectionCard
        title="Kontrak route sudah aktif"
        description="Shell, routing, error boundary, theme, dan metadata vertical slice sudah tersedia."
      >
        <Alert tone="info" title="Implementasi fitur dilakukan bertahap">
          <p>
            Halaman ini sengaja belum memuat data atau business behavior. Konten
            final akan dibangun pada vertical slice terkait melalui service
            contract dan mock adapter, tanpa request backend langsung dari
            komponen.
          </p>
        </Alert>
      </SectionCard>
    </div>
  )
}

function ShellForRoute({
  children,
  route,
}: PropsWithChildren<{ route: AppRouteDefinition }>) {
  switch (route.shell) {
    case 'public':
      return <PublicShell>{children}</PublicShell>
    case 'auth':
      return <AuthShell>{children}</AuthShell>
    case 'onboarding':
      return <OnboardingShell>{children}</OnboardingShell>
    case 'tenant':
      return <TenantShell>{children}</TenantShell>
    case 'admin':
      return <AdminShell>{children}</AdminShell>
  }
}

export function ArchitectureRoute({ route }: { route: AppRouteDefinition }) {
  return (
    <ShellForRoute route={route}>
      <RouteContractPage route={route} />
    </ShellForRoute>
  )
}
