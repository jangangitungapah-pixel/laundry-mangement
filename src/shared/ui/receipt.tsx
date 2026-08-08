import { cn } from '@/shared/lib/cn'

export interface ReceiptLine {
  label: string
  value: string
  emphasized?: boolean
}

export interface ReceiptProps {
  width: 58 | 80
  businessName: string
  outletName: string
  orderCode: string
  lines: readonly ReceiptLine[]
  footer: string
  className?: string
}

export function Receipt({
  businessName,
  className,
  footer,
  lines,
  orderCode,
  outletName,
  width,
}: ReceiptProps) {
  return (
    <article
      className={cn(
        'receipt-foundation mx-auto max-w-full border border-line bg-white p-4 font-receipt text-[11px] leading-[1.45] text-black shadow-sm',
        className,
      )}
      style={{ width: `${width}mm` }}
      data-receipt-width={width}
      aria-label={`Preview nota ${width} milimeter`}
    >
      <header className="border-b border-dashed border-black pb-3 text-center">
        <strong className="block text-[13px]">{businessName}</strong>
        <span>{outletName}</span>
        <span className="block">{orderCode}</span>
      </header>
      <dl className="m-0 py-2">
        {lines.map((line) => (
          <div
            key={`${line.label}-${line.value}`}
            className={cn(
              'grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-dashed border-black/25 py-1.5',
              line.emphasized &&
                'border-y border-black py-2 text-[13px] font-black',
            )}
          >
            <dt>{line.label}</dt>
            <dd className="m-0 text-right">{line.value}</dd>
          </div>
        ))}
      </dl>
      <footer className="pt-3 text-center">{footer}</footer>
    </article>
  )
}
