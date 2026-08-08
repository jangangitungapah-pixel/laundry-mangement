import * as RadixSwitch from '@radix-ui/react-switch'
import * as RadixTabs from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Info,
  LoaderCircle,
  LockKeyhole,
  Search,
  TriangleAlert,
  XCircle,
} from 'lucide-react'
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TableHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'

import { cn } from '@/shared/lib/cn'

const buttonStyles = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:translate-y-px',
  {
    variants: {
      variant: {
        primary:
          'border-brand bg-brand text-white shadow-sm hover:border-[var(--color-primary-hover)] hover:bg-[var(--color-primary-hover)]',
        secondary:
          'border-line bg-panel text-ink shadow-sm hover:border-[var(--color-border-strong)] hover:bg-panel-subtle',
        outline:
          'border-[var(--color-border-strong)] bg-transparent text-ink hover:bg-panel-subtle',
        ghost:
          'border-transparent bg-transparent text-ink hover:bg-panel-subtle',
        danger:
          'border-critical bg-critical text-white shadow-sm hover:bg-[var(--color-danger)]/90',
      },
      size: {
        sm: 'min-h-11 px-3 text-xs',
        md: 'min-h-11 px-4 text-sm',
        lg: 'min-h-12 px-5 text-base',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  loading?: boolean
  loadingLabel?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      disabled,
      loading = false,
      loadingLabel = 'Memproses',
      size,
      type = 'button',
      variant,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonStyles({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : null}
      {loading ? loadingLabel : children}
    </button>
  ),
)
Button.displayName = 'Button'

export interface IconButtonProps extends Omit<
  ButtonProps,
  'children' | 'size' | 'aria-label'
> {
  label: string
  icon: ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, ...props }, ref) => (
    <Button ref={ref} size="icon" aria-label={label} title={label} {...props}>
      <span aria-hidden="true">{icon}</span>
    </Button>
  ),
)
IconButton.displayName = 'IconButton'

export interface LinkButtonProps
  extends
    AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonStyles> {
  disabled?: boolean
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { className, children, disabled, onClick, size, variant, ...props },
    ref,
  ) => (
    <a
      ref={ref}
      className={cn(buttonStyles({ variant, size }), className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : props.tabIndex}
      onClick={(event) => {
        if (disabled) event.preventDefault()
        else onClick?.(event)
      }}
      {...props}
    >
      {children}
    </a>
  ),
)
LinkButton.displayName = 'LinkButton'

const controlStyles =
  'min-h-11 w-full rounded-md border border-line bg-panel px-3 text-sm text-ink shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-ink-muted/70 hover:border-[var(--color-border-strong)] focus:border-brand focus:ring-3 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-panel-subtle disabled:text-ink-muted aria-invalid:border-critical aria-invalid:ring-critical/15'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
  leadingIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, leadingIcon, ...props }, ref) => (
    <span className="relative block">
      {leadingIcon ? (
        <span
          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-muted"
          aria-hidden="true"
        >
          {leadingIcon}
        </span>
      ) : null}
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(controlStyles, leadingIcon && 'pl-10', className)}
        {...props}
      />
    </span>
  ),
)
Input.displayName = 'Input'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(controlStyles, 'min-h-24 resize-y py-2.5', className)}
      {...props}
    />
  ),
)
Textarea.displayName = 'Textarea'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...props }, ref) => (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(controlStyles, 'appearance-none pr-9', className)}
      {...props}
    >
      {children}
    </select>
  ),
)
Select.displayName = 'Select'

export const Field = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5', className)} {...props} />
)

export const Label = ({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn('text-sm font-semibold text-ink', className)}
    {...props}
  />
)

export const HelperText = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('m-0 text-xs leading-relaxed text-ink-muted', className)}
    {...props}
  />
)

export const FieldError = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    role="alert"
    className={cn(
      'm-0 flex items-center gap-1.5 text-xs font-medium text-critical',
      className,
    )}
    {...props}
  />
)

interface ChoiceProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label: ReactNode
  description?: ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, ChoiceProps>(
  ({ className, description, label, ...props }, ref) => (
    <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-md py-2 text-sm">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          'mt-0.5 size-5 shrink-0 accent-[var(--color-primary)]',
          className,
        )}
        {...props}
      />
      <span>
        <span className="block font-medium text-ink">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs text-ink-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  ),
)
Checkbox.displayName = 'Checkbox'

export const Radio = forwardRef<HTMLInputElement, ChoiceProps>(
  ({ className, description, label, ...props }, ref) => (
    <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-md py-2 text-sm">
      <input
        ref={ref}
        type="radio"
        className={cn(
          'mt-0.5 size-5 shrink-0 accent-[var(--color-primary)]',
          className,
        )}
        {...props}
      />
      <span>
        <span className="block font-medium text-ink">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs text-ink-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  ),
)
Radio.displayName = 'Radio'

export interface SwitchProps extends Omit<RadixSwitch.SwitchProps, 'asChild'> {
  label: string
  description?: string
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, description, label, ...props }, ref) => (
    <label className="flex min-h-11 items-center justify-between gap-4 py-1">
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {description ? (
          <span className="block text-xs text-ink-muted">{description}</span>
        ) : null}
      </span>
      <RadixSwitch.Root
        ref={ref}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full border border-line bg-[var(--color-border-strong)] p-0.5 transition-colors data-[state=checked]:border-brand data-[state=checked]:bg-brand disabled:opacity-50',
          className,
        )}
        aria-label={label}
        {...props}
      >
        <RadixSwitch.Thumb className="block size-5 rounded-full bg-white shadow-sm transition-transform duration-150 data-[state=checked]:translate-x-5" />
      </RadixSwitch.Root>
    </label>
  ),
)
Switch.displayName = 'Switch'

const badgeStyles = cva(
  'inline-flex min-h-6 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-5',
  {
    variants: {
      tone: {
        neutral: 'border-line bg-panel-subtle text-ink',
        primary:
          'border-brand/30 bg-brand-soft text-[var(--color-primary-active)]',
        success:
          'border-positive/25 bg-[var(--color-success-surface)] text-positive',
        warning:
          'border-caution/25 bg-[var(--color-warning-surface)] text-caution',
        danger:
          'border-critical/25 bg-[var(--color-danger-surface)] text-critical',
        info: 'border-informative/25 bg-[var(--color-info-surface)] text-informative',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeStyles> {}

export const Badge = ({ className, tone, ...props }: BadgeProps) => (
  <span className={cn(badgeStyles({ tone }), className)} {...props} />
)

const statusIcons = {
  neutral: Circle,
  primary: CheckCircle2,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: XCircle,
  info: Info,
} as const

export interface StatusBadgeProps extends Omit<BadgeProps, 'children'> {
  label: string
}

export const StatusBadge = ({
  label,
  tone = 'neutral',
  ...props
}: StatusBadgeProps) => {
  const Icon = statusIcons[tone ?? 'neutral']
  return (
    <Badge tone={tone} {...props}>
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </Badge>
  )
}

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded-lg border border-line bg-panel shadow-[var(--shadow-sm)]',
      className,
    )}
    {...props}
  />
)

export interface SectionCardProps extends HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  action?: ReactNode
}

export const SectionCard = ({
  action,
  children,
  className,
  description,
  title,
  ...props
}: SectionCardProps) => (
  <section
    className={cn(
      'rounded-lg border border-line bg-panel p-5 shadow-sm',
      className,
    )}
    {...props}
  >
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
      <div>
        <h3 className="m-0 text-base font-bold text-ink">{title}</h3>
        {description ? (
          <p className="mt-1 mb-0 text-sm text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
    {children}
  </section>
)

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  hint?: string
  icon?: ReactNode
}

export const MetricCard = ({
  className,
  hint,
  icon,
  label,
  value,
  ...props
}: MetricCardProps) => (
  <Card className={cn('p-4', className)} {...props}>
    <div className="flex items-center justify-between gap-3 text-ink-muted">
      <span className="text-xs font-bold tracking-wide uppercase">{label}</span>
      <span aria-hidden="true">{icon}</span>
    </div>
    <strong className="mt-3 block text-2xl tracking-tight text-ink">
      {value}
    </strong>
    {hint ? (
      <span className="mt-1 block text-xs text-ink-muted">{hint}</span>
    ) : null}
  </Card>
)

const alertStyles = cva(
  'flex gap-3 rounded-md border p-4 text-sm [&_p]:m-0 [&_p]:mt-1',
  {
    variants: {
      tone: {
        info: 'border-informative/25 bg-[var(--color-info-surface)] text-informative',
        success:
          'border-positive/25 bg-[var(--color-success-surface)] text-positive',
        warning:
          'border-caution/25 bg-[var(--color-warning-surface)] text-caution',
        danger:
          'border-critical/25 bg-[var(--color-danger-surface)] text-critical',
      },
    },
    defaultVariants: { tone: 'info' },
  },
)

const alertIcons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} as const

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertStyles> {
  title: string
}

export const Alert = ({
  children,
  className,
  role,
  title,
  tone = 'info',
  ...props
}: AlertProps) => {
  const Icon = alertIcons[tone ?? 'info']
  return (
    <div
      role={role ?? (tone === 'danger' ? 'alert' : 'status')}
      className={cn(alertStyles({ tone }), className)}
      {...props}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        <strong className="block">{title}</strong>
        {children}
      </div>
    </div>
  )
}

export const Banner = ({ className, ...props }: AlertProps) => (
  <Alert className={cn('rounded-none border-x-0 px-5', className)} {...props} />
)

export const ToastPreview = ({ className, ...props }: AlertProps) => (
  <Alert
    className={cn('max-w-sm bg-panel shadow-[var(--shadow-lg)]', className)}
    {...props}
  />
)

export interface TabsProps {
  defaultValue: string
  items: Array<{ value: string; label: string; content: ReactNode }>
  ariaLabel: string
}

export const Tabs = ({ ariaLabel, defaultValue, items }: TabsProps) => (
  <RadixTabs.Root defaultValue={defaultValue}>
    <RadixTabs.List
      aria-label={ariaLabel}
      className="flex gap-1 overflow-x-auto border-b border-line"
    >
      {items.map((item) => (
        <RadixTabs.Trigger
          key={item.value}
          value={item.value}
          className="min-h-11 shrink-0 border-b-2 border-transparent px-3 text-sm font-semibold text-ink-muted transition-colors hover:text-ink data-[state=active]:border-brand data-[state=active]:text-brand"
        >
          {item.label}
        </RadixTabs.Trigger>
      ))}
    </RadixTabs.List>
    {items.map((item) => (
      <RadixTabs.Content
        key={item.value}
        value={item.value}
        className="pt-4 focus-visible:outline-none"
      >
        {item.content}
      </RadixTabs.Content>
    ))}
  </RadixTabs.Root>
)

export const Table = forwardRef<
  HTMLTableElement,
  TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div
    className="ds-scrollbar overflow-x-auto rounded-lg border border-line"
    role="region"
    aria-label={props['aria-label'] ?? 'Tabel data'}
    tabIndex={0}
  >
    <table
      ref={ref}
      className={cn(
        'w-full min-w-[42rem] border-collapse text-left text-sm [&_td]:border-t [&_td]:border-line [&_td]:px-4 [&_td]:py-3 [&_th]:bg-panel-subtle [&_th]:px-4 [&_th]:py-3 [&_th]:text-xs [&_th]:font-bold [&_th]:tracking-wide [&_th]:text-ink-muted [&_th]:uppercase',
        className,
      )}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

export interface ResponsiveCardListProps<T> {
  items: readonly T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  ariaLabel: string
  className?: string
}

export function ResponsiveCardList<T>({
  ariaLabel,
  className,
  getKey,
  items,
  renderItem,
}: ResponsiveCardListProps<T>) {
  return (
    <ul
      aria-label={ariaLabel}
      className={cn('m-0 grid list-none gap-3 p-0', className)}
    >
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  label?: string
}

export const Pagination = ({
  label = 'Paginasi',
  onPageChange,
  page,
  totalPages,
}: PaginationProps) => (
  <nav
    aria-label={label}
    className="grid grid-cols-2 items-center gap-3 sm:flex sm:justify-between"
  >
    <Button
      variant="secondary"
      size="sm"
      className="row-start-2 sm:row-auto"
      disabled={page <= 1}
      onClick={() => onPageChange(page - 1)}
    >
      <ChevronLeft className="size-4" aria-hidden="true" /> Sebelumnya
    </Button>
    <span
      className="col-span-2 row-start-1 text-center text-sm text-ink-muted sm:col-auto sm:row-auto"
      aria-live="polite"
    >
      Halaman <strong className="text-ink">{page}</strong> dari {totalPages}
    </span>
    <Button
      variant="secondary"
      size="sm"
      className="row-start-2 sm:row-auto"
      disabled={page >= totalPages}
      onClick={() => onPageChange(page + 1)}
    >
      Berikutnya <ChevronRight className="size-4" aria-hidden="true" />
    </Button>
  </nav>
)

export const FilterBar = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-wrap items-end gap-3 rounded-lg border border-line bg-panel-subtle p-3',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
}

export const Skeleton = ({
  className,
  label = 'Memuat konten',
  ...props
}: SkeletonProps) => (
  <div
    role="status"
    aria-label={label}
    className={cn(
      'relative h-4 overflow-hidden rounded-sm bg-[var(--color-border)] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent',
      className,
    )}
    {...props}
  />
)

interface StateProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  action?: ReactNode
}

function StateLayout({
  action,
  children,
  className,
  description,
  title,
  ...props
}: StateProps) {
  return (
    <div
      className={cn(
        'grid min-h-56 place-items-center rounded-lg border border-dashed border-[var(--color-border-strong)] bg-panel p-6 text-center',
        className,
      )}
      {...props}
    >
      <div className="max-w-md">
        {children}
        <h3 className="mt-4 mb-1 text-base font-bold text-ink">{title}</h3>
        <p className="m-0 text-sm text-ink-muted">{description}</p>
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  )
}

export const EmptyState = (props: StateProps) => (
  <StateLayout {...props}>
    <Search className="mx-auto size-8 text-ink-muted" aria-hidden="true" />
  </StateLayout>
)

export const ErrorState = (props: StateProps) => (
  <StateLayout role="alert" {...props}>
    <AlertCircle className="mx-auto size-8 text-critical" aria-hidden="true" />
  </StateLayout>
)

export const PermissionDeniedState = (props: StateProps) => (
  <StateLayout {...props}>
    <LockKeyhole className="mx-auto size-8 text-caution" aria-hidden="true" />
  </StateLayout>
)

export const ReadOnlyBanner = ({
  action,
  description,
  title,
}: Pick<StateProps, 'action' | 'description' | 'title'>) => (
  <Alert tone="warning" title={title}>
    <p>{description}</p>
    {action ? <div className="mt-3">{action}</div> : null}
  </Alert>
)

export const SuccessState = (props: StateProps) => (
  <StateLayout role="status" {...props}>
    <CheckCircle2 className="mx-auto size-8 text-positive" aria-hidden="true" />
  </StateLayout>
)

export const LoadingState = ({ label = 'Memuat data' }: { label?: string }) => (
  <div
    role="status"
    aria-label={label}
    className="grid gap-4 rounded-lg border border-line bg-panel p-5"
  >
    <Skeleton className="h-6 w-2/5" />
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-4 w-4/5" />
    <span className="sr-only">{label}</span>
  </div>
)

export const FieldSearchIcon = () => <Search className="size-4" />
export const CompleteIcon = () => <Check className="size-4" />
