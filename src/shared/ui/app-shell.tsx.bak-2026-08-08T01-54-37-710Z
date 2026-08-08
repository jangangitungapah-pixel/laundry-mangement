import { Menu } from 'lucide-react'
import { type ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'
import { IconButton } from '@/shared/ui/primitives'

export interface AppShellNavItem {
  id: string
  label: string
  icon: ReactNode
  active?: boolean
  disabled?: boolean
}

export interface AppShellProps {
  productName: string
  workspaceLabel: string
  context: ReactNode
  navigation: readonly AppShellNavItem[]
  children: ReactNode
  actions?: ReactNode
  readOnlyBanner?: ReactNode
  className?: string
  workspaceLandmark?: boolean
}

export function AppShell({
  actions,
  children,
  className,
  context,
  navigation,
  productName,
  readOnlyBanner,
  workspaceLandmark = true,
  workspaceLabel,
}: AppShellProps) {
  const mobileItems = navigation.filter((item) => !item.disabled).slice(0, 4)
  const Workspace = workspaceLandmark ? 'main' : 'div'
  return (
    <div
      className={cn(
        'relative grid min-h-[42rem] overflow-hidden rounded-xl border border-line bg-panel shadow-[var(--shadow-md)] lg:grid-cols-[15rem_minmax(0,1fr)]',
        className,
      )}
    >
      <aside className="hidden border-r border-line bg-[var(--color-text)] p-4 text-white lg:block">
        <div className="flex items-center gap-3 border-b border-white/15 pb-4">
          <span className="grid size-10 place-items-center rounded-md bg-accent font-black text-[var(--color-primary-active)]">
            LK
          </span>
          <div>
            <strong className="block text-sm">{productName}</strong>
            <span className="text-xs text-white/65">{workspaceLabel}</span>
          </div>
        </div>
        <nav
          aria-label={`Navigasi ${workspaceLabel}`}
          className="mt-4 grid gap-1"
        >
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-white/72 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-35',
                item.active && 'bg-white text-ink hover:bg-white',
              )}
              aria-current={item.active ? 'page' : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 pb-16 lg:pb-0">
        <header className="sticky top-0 z-[var(--z-sticky)] flex min-h-16 items-center justify-between gap-3 border-b border-line bg-panel/95 px-4 backdrop-blur md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="lg:hidden">
              <IconButton
                label="Buka navigasi demo"
                icon={<Menu className="size-5" />}
                variant="ghost"
              />
            </span>
            <div className="min-w-0">{context}</div>
          </div>
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        </header>
        {readOnlyBanner}
        <Workspace className="p-4 md:p-6">{children}</Workspace>
      </div>

      <nav
        aria-label={`Navigasi mobile ${workspaceLabel}`}
        className="absolute inset-x-0 bottom-0 z-[var(--z-sticky)] grid min-h-16 border-t border-line bg-panel lg:hidden"
        style={{
          gridTemplateColumns: `repeat(${Math.max(mobileItems.length, 1)}, minmax(0, 1fr))`,
        }}
      >
        {mobileItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              'flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[0.67rem] font-semibold text-ink-muted',
              item.active && 'text-brand',
            )}
            aria-current={item.active ? 'page' : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span className="max-w-full truncate">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
