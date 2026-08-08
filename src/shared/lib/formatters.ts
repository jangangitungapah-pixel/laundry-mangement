export interface FormattingContext {
  locale: string
  currency: string
  timeZone: string
}

export function createFormatters(context: FormattingContext) {
  const moneyFormatter = new Intl.NumberFormat(context.locale, {
    style: 'currency',
    currency: context.currency,
    maximumFractionDigits: 0,
  })
  const dateFormatter = new Intl.DateTimeFormat(context.locale, {
    dateStyle: 'medium',
    timeZone: context.timeZone,
  })
  const dateTimeFormatter = new Intl.DateTimeFormat(context.locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: context.timeZone,
  })

  return {
    money: (value: number) => moneyFormatter.format(value),
    date: (value: Date | string | number) =>
      dateFormatter.format(new Date(value)),
    dateTime: (value: Date | string | number) =>
      dateTimeFormatter.format(new Date(value)),
  }
}

export const indonesiaFormatters = createFormatters({
  locale: 'id-ID',
  currency: 'IDR',
  timeZone: 'Asia/Jakarta',
})
