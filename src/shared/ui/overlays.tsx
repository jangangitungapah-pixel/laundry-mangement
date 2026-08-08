import * as RadixDialog from '@radix-ui/react-dialog'
import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, MoreHorizontal, X } from 'lucide-react'
import { type ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'
import { Button, IconButton, type ButtonProps } from '@/shared/ui/primitives'

export interface DropdownMenuItem {
  id: string
  label: string
  icon?: ReactNode
  disabled?: boolean
  danger?: boolean
  inset?: boolean
  onSelect?: () => void
}

export interface DropdownMenuProps {
  label: string
  items: readonly DropdownMenuItem[]
  trigger?: ReactNode
}

export function DropdownMenu({ label, items, trigger }: DropdownMenuProps) {
  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>
        {trigger ?? (
          <IconButton
            label={label}
            icon={<MoreHorizontal className="size-5" />}
            variant="secondary"
          />
        )}
      </RadixDropdown.Trigger>
      <RadixDropdown.Portal>
        <RadixDropdown.Content
          sideOffset={6}
          align="end"
          className="z-[var(--z-dropdown)] min-w-52 rounded-md border border-line bg-panel p-1.5 text-sm text-ink shadow-[var(--shadow-md)] data-[state=closed]:animate-[fadeOut_var(--motion-fast)_ease-out] data-[state=open]:animate-[fadeIn_var(--motion-fast)_ease-out]"
          aria-label={label}
        >
          {items.map((item) => (
            <RadixDropdown.Item
              key={item.id}
              disabled={item.disabled}
              onSelect={item.onSelect}
              className={cn(
                'flex min-h-11 cursor-default items-center gap-2 rounded-sm px-3 outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-panel-subtle',
                item.danger &&
                  'text-critical data-[highlighted]:bg-[var(--color-danger-surface)]',
                item.inset && 'pl-9',
              )}
            >
              {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
              <span className="flex-1">{item.label}</span>
              <ChevronRight
                className="size-3.5 opacity-45"
                aria-hidden="true"
              />
            </RadixDropdown.Item>
          ))}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  )
}

interface OverlaySharedProps {
  trigger: ReactNode
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function OverlayBody({
  children,
  closeLabel,
  description,
  footer,
  title,
}: Omit<OverlaySharedProps, 'trigger' | 'open' | 'onOpenChange'> & {
  closeLabel: string
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <RadixDialog.Title className="m-0 text-lg font-bold tracking-tight text-ink">
            {title}
          </RadixDialog.Title>
          {description ? (
            <RadixDialog.Description className="mt-1 mb-0 text-sm text-ink-muted">
              {description}
            </RadixDialog.Description>
          ) : null}
        </div>
        <RadixDialog.Close asChild>
          <IconButton
            label={closeLabel}
            icon={<X className="size-5" />}
            variant="ghost"
          />
        </RadixDialog.Close>
      </div>
      <div className="ds-scrollbar max-h-[68vh] overflow-y-auto px-5 py-5">
        {children}
      </div>
      {footer ? (
        <div className="flex flex-wrap justify-end gap-3 border-t border-line bg-panel-subtle px-5 py-4">
          {footer}
        </div>
      ) : null}
    </>
  )
}

export function Dialog({
  children,
  description,
  footer,
  onOpenChange,
  open,
  title,
  trigger,
}: OverlaySharedProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--color-overlay)] backdrop-blur-[2px] data-[state=closed]:animate-[fadeOut_var(--motion-normal)_ease-out] data-[state=open]:animate-[fadeIn_var(--motion-normal)_ease-out]" />
        <RadixDialog.Content className="fixed top-1/2 left-1/2 z-[calc(var(--z-overlay)+1)] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line bg-panel shadow-[var(--shadow-lg)] focus:outline-none data-[state=closed]:animate-[dialogOut_var(--motion-fast)_ease-out] data-[state=open]:animate-[dialogIn_var(--motion-normal)_var(--ease-standard)]">
          <OverlayBody
            title={title}
            description={description}
            footer={footer}
            closeLabel={`Tutup ${title}`}
          >
            {children}
          </OverlayBody>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export interface DrawerProps extends OverlaySharedProps {
  side?: 'left' | 'right'
}

export function Drawer({
  children,
  description,
  footer,
  onOpenChange,
  open,
  side = 'right',
  title,
  trigger,
}: DrawerProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--color-overlay)] backdrop-blur-[2px] data-[state=closed]:animate-[fadeOut_var(--motion-normal)_ease-out] data-[state=open]:animate-[fadeIn_var(--motion-normal)_ease-out]" />
        <RadixDialog.Content
          className={cn(
            'fixed inset-y-0 z-[calc(var(--z-overlay)+1)] flex w-[min(30rem,100vw)] flex-col overflow-hidden border-line bg-panel shadow-[var(--shadow-lg)] focus:outline-none',
            side === 'right'
              ? 'right-0 border-l data-[state=closed]:animate-[drawerOutRight_var(--motion-normal)_ease-out] data-[state=open]:animate-[drawerInRight_var(--motion-normal)_var(--ease-standard)]'
              : 'left-0 border-r data-[state=closed]:animate-[drawerOutLeft_var(--motion-normal)_ease-out] data-[state=open]:animate-[drawerInLeft_var(--motion-normal)_var(--ease-standard)]',
          )}
        >
          <OverlayBody
            title={title}
            description={description}
            footer={footer}
            closeLabel={`Tutup ${title}`}
          >
            {children}
          </OverlayBody>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export interface ConfirmationDialogProps {
  trigger: ReactNode
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
  tone?: 'primary' | 'danger'
  loading?: boolean
  onConfirm: () => void
  children?: ReactNode
}

export function ConfirmationDialog({
  cancelLabel = 'Kembali',
  children,
  confirmLabel,
  description,
  loading,
  onConfirm,
  title,
  tone = 'danger',
  trigger,
}: ConfirmationDialogProps) {
  const confirmVariant: ButtonProps['variant'] =
    tone === 'danger' ? 'danger' : 'primary'
  return (
    <Dialog
      trigger={trigger}
      title={title}
      description={description}
      footer={
        <>
          <RadixDialog.Close asChild>
            <Button variant="secondary">{cancelLabel}</Button>
          </RadixDialog.Close>
          <RadixDialog.Close asChild>
            <Button
              variant={confirmVariant}
              loading={loading}
              onClick={onConfirm}
            >
              {tone === 'primary' ? <Check className="size-4" /> : null}
              {confirmLabel}
            </Button>
          </RadixDialog.Close>
        </>
      }
    >
      {children}
    </Dialog>
  )
}
