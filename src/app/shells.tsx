import {
  Banknote,
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Menu,
  ScrollText,
  Settings,
  ShieldCheck,
  Shirt,
  Users,
  WalletCards,
} from 'lucide-react'
import { useState, type PropsWithChildren } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  AppShell,
  Badge,
  Button,
  Drawer,
  IconButton,
  type AppShellNavItem,
} from '@/shared/ui'
import { ThemeToggle } from '@/shared/theme'

const publicLinks = [
  { to: '/features', label: 'Fitur' },
  { to: '/pricing', label: 'Harga' },
  { to: '/contact', label: 'Kontak' },
] as const

function MobileNavigation({ items }: { items: readonly AppShellNavItem[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      side="left"
      title="Navigasi"
      description="Pilih area kerja yang ingin dibuka."
      trigger={
        <IconButton
          label="Buka navigasi"
          icon={<Menu className="size-5" />}
          variant="ghost"
        />
      }
    >
      <nav aria-label="Navigasi drawer" className="grid gap-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={item.active ? 'secondary' : 'ghost'}
            className="justify-start"
            disabled={item.disabled}
            onClick={() => {
              item.onSelect?.()
              setOpen(false)
            }}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </nav>
    </Drawer>
  )
}

export function PublicShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="sticky top-0 z-[var(--z-sticky)] border-b border-line bg-panel/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-[var(--layout-content)] items-center justify-between gap-4 px-4 md:px-6">
          <Link
            to="/"
            className="flex items-center gap-3 font-black text-ink no-underline"
          >
            <span className="grid size-10 place-items-center rounded-md bg-brand text-[var(--color-primary-foreground)]">
              LK
            </span>
            LaundryKita
          </Link>

          <nav
            aria-label="Navigasi publik"
            className="hidden items-center gap-5 md:flex"
          >
            {publicLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-semibold text-ink-muted no-underline hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/login"
              className="hidden min-h-11 items-center px-3 text-sm font-semibold text-ink no-underline sm:inline-flex"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="inline-flex min-h-11 items-center rounded-md bg-brand px-4 text-sm font-semibold text-[var(--color-primary-foreground)] no-underline"
            >
              Mulai trial
            </Link>
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto w-full max-w-[var(--layout-content)] flex-1 px-4 py-12 md:px-6 md:py-16"
      >
        {children}
      </main>

      <footer className="border-t border-line bg-panel">
        <div className="mx-auto flex w-full max-w-[var(--layout-content)] flex-col gap-3 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between md:px-6">
          <span>LaundryKita · SaaS operasional laundry Indonesia</span>
          <div className="flex gap-4">
            <Link to="/terms" className="text-inherit">
              Syarat
            </Link>
            <Link to="/privacy" className="text-inherit">
              Privasi
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function AuthShell({ children }: PropsWithChildren) {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas p-4">
      <div className="w-full max-w-lg">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link to="/" className="font-black text-ink no-underline">
            LaundryKita
          </Link>
          <ThemeToggle />
        </div>

        <section className="rounded-xl border border-line bg-panel p-6 shadow-[var(--shadow-md)] md:p-8">
          {children}
        </section>

        <p className="mt-5 text-center text-xs text-ink-muted">
          Data demo app shell · belum terhubung ke autentikasi.
        </p>
      </div>
    </main>
  )
}

export function OnboardingShell({ children }: PropsWithChildren) {
  const { pathname } = useLocation()
  const steps = [
    '/onboarding/business',
    '/onboarding/outlet',
    '/onboarding/services',
    '/onboarding/complete',
  ]
  const step = Math.max(steps.indexOf(pathname) + 1, 1)

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line bg-panel">
        <div className="mx-auto flex min-h-16 max-w-[var(--layout-content)] items-center justify-between px-4 md:px-6">
          <strong>LaundryKita</strong>
          <div className="flex items-center gap-3">
            <Badge tone="primary">Langkah {step} dari 4</Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6">
        {children}
      </main>
    </div>
  )
}

function isTenantNavigationActive(pathname: string, target: string) {
  if (target.endsWith('/dashboard')) {
    return pathname === target
  }

  return pathname === target || pathname.startsWith(target + '/')
}

export function TenantShell({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const tenantSlug = params.tenantSlug ?? 'demo-laundry'
  const base = '/app/' + tenantSlug

  const definitions = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      suffix: '/dashboard',
      icon: <LayoutDashboard className="size-5" />,
    },
    {
      id: 'orders',
      label: 'Pesanan',
      suffix: '/orders',
      icon: <ClipboardList className="size-5" />,
    },
    {
      id: 'production',
      label: 'Produksi',
      suffix: '/production',
      icon: <Shirt className="size-5" />,
    },
    {
      id: 'customers',
      label: 'Pelanggan',
      suffix: '/customers',
      icon: <Users className="size-5" />,
    },
    {
      id: 'payments',
      label: 'Pembayaran',
      suffix: '/payments',
      icon: <WalletCards className="size-5" />,
    },
    {
      id: 'cash',
      label: 'Kas',
      suffix: '/cash-register',
      icon: <Banknote className="size-5" />,
    },
    {
      id: 'reports',
      label: 'Laporan',
      suffix: '/reports',
      icon: <BarChart3 className="size-5" />,
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      suffix: '/settings/business',
      icon: <Settings className="size-5" />,
    },
  ] as const

  const navigation: AppShellNavItem[] = definitions.map((item) => {
    const target = base + item.suffix
    const settingsActive =
      item.id === 'settings' &&
      location.pathname.startsWith(base + '/settings/')

    return {
      id: item.id,
      label: item.label,
      icon: item.icon,
      active:
        settingsActive || isTenantNavigationActive(location.pathname, target),
      onSelect: () => navigate(target),
    }
  })

  return (
    <AppShell
      productName="LaundryKita"
      workspaceLabel="Tenant application"
      className="min-h-screen rounded-none border-0 shadow-none"
      navigation={navigation}
      mobileNavigation={<MobileNavigation items={navigation} />}
      context={
        <div>
          <strong className="block truncate text-sm text-ink">
            LaundryKita Demo
          </strong>
          <span className="block truncate text-xs text-ink-muted">
            {tenantSlug} · Outlet Utama
          </span>
        </div>
      }
      actions={
        <>
          <IconButton
            label="Notifikasi"
            icon={<Bell className="size-5" />}
            variant="ghost"
          />
          <ThemeToggle />
        </>
      }
    >
      {children}
    </AppShell>
  )
}

export function AdminShell({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()

  const definitions = [
    {
      id: 'overview',
      label: 'Overview',
      path: '/admin',
      icon: <ShieldCheck className="size-5" />,
    },
    {
      id: 'tenants',
      label: 'Tenant',
      path: '/admin/tenants',
      icon: <Building2 className="size-5" />,
    },
    {
      id: 'plans',
      label: 'Plan',
      path: '/admin/plans',
      icon: <CreditCard className="size-5" />,
    },
    {
      id: 'subscriptions',
      label: 'Subscription',
      path: '/admin/subscriptions',
      icon: <WalletCards className="size-5" />,
    },
    {
      id: 'audit',
      label: 'Audit log',
      path: '/admin/audit-logs',
      icon: <ScrollText className="size-5" />,
    },
  ] as const

  const navigation: AppShellNavItem[] = definitions.map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    active:
      item.path === '/admin'
        ? location.pathname === item.path
        : location.pathname === item.path ||
          location.pathname.startsWith(item.path + '/'),
    onSelect: () => navigate(item.path),
  }))

  return (
    <AppShell
      productName="LaundryKita"
      workspaceLabel="Platform administration"
      className="min-h-screen rounded-none border-0 shadow-none"
      navigation={navigation}
      mobileNavigation={<MobileNavigation items={navigation} />}
      context={
        <div>
          <strong className="block text-sm text-ink">Platform Admin</strong>
          <span className="block text-xs text-ink-muted">
            Metadata dan subscription tenant
          </span>
        </div>
      }
      actions={<ThemeToggle />}
    >
      {children}
    </AppShell>
  )
}
