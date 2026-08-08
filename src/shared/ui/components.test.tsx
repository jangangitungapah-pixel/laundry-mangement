import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'

import {
  Button,
  ConfirmationDialog,
  Dialog,
  Drawer,
  DropdownMenu,
  Field,
  FieldError,
  IconButton,
  Input,
  Label,
  Pagination,
  Receipt,
  StatusBadge,
  Switch,
  Tabs,
} from '@/shared/ui'

describe('design system components', () => {
  it('exposes loading and accessible icon button states', () => {
    render(
      <>
        <Button loading loadingLabel="Menyimpan" />
        <IconButton label="Cari" icon={<Search />} />
      </>,
    )

    expect(screen.getByRole('button', { name: 'Menyimpan' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Menyimpan' })).toHaveAttribute(
      'aria-busy',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Cari' })).toBeEnabled()
  })

  it('connects form labels and errors and toggles the switch', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Field>
          <Label htmlFor="amount">Nominal</Label>
          <Input id="amount" invalid aria-describedby="amount-error" />
          <FieldError id="amount-error">Nominal tidak valid</FieldError>
        </Field>
        <Switch label="Aktifkan express" />
      </>,
    )

    const input = screen.getByLabelText('Nominal')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Nominal tidak valid')

    const toggle = screen.getByRole('switch', { name: 'Aktifkan express' })
    expect(toggle).toHaveAttribute('data-state', 'unchecked')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('data-state', 'checked')
  })

  it('supports tabs keyboard navigation', async () => {
    const user = userEvent.setup()
    render(
      <Tabs
        ariaLabel="Contoh tab"
        defaultValue="first"
        items={[
          { value: 'first', label: 'Pertama', content: 'Konten pertama' },
          { value: 'second', label: 'Kedua', content: 'Konten kedua' },
        ]}
      />,
    )

    const first = screen.getByRole('tab', { name: 'Pertama' })
    first.focus()
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('tab', { name: 'Kedua' })).toHaveFocus()
    expect(screen.getByText('Konten kedua')).toBeVisible()
  })

  it('opens dropdown items with an accessible menu name', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu
        label="Aksi demo"
        items={[{ id: 'view', label: 'Lihat detail' }]}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Aksi demo' }))

    const menu = await screen.findByRole('menu', { name: 'Aksi demo' })
    expect(
      within(menu).getByRole('menuitem', { name: /Lihat detail/ }),
    ).toBeVisible()
  })

  it('traps dialog focus, closes with Escape, and returns focus', async () => {
    const user = userEvent.setup()
    render(
      <Dialog
        trigger={<Button>Buka dialog</Button>}
        title="Dialog demo"
        description="Keterangan dialog"
      >
        <Input aria-label="Field dialog" />
      </Dialog>,
    )

    const trigger = screen.getByRole('button', { name: 'Buka dialog' })
    await user.click(trigger)
    const dialog = await screen.findByRole('dialog', { name: 'Dialog demo' })

    expect(dialog).toContainElement(document.activeElement as HTMLElement)
    await user.keyboard('{Escape}')
    expect(
      screen.queryByRole('dialog', { name: 'Dialog demo' }),
    ).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('opens a drawer and executes explicit confirmation', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(
      <>
        <Drawer trigger={<Button>Buka drawer</Button>} title="Drawer demo">
          Isi drawer
        </Drawer>
        <ConfirmationDialog
          trigger={<Button>Mulai konfirmasi</Button>}
          title="Konfirmasi demo"
          description="Periksa dampak"
          confirmLabel="Setujui demo"
          onConfirm={onConfirm}
        />
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Buka drawer' }))
    expect(
      await screen.findByRole('dialog', { name: 'Drawer demo' }),
    ).toBeVisible()
    await user.keyboard('{Escape}')

    await user.click(screen.getByRole('button', { name: 'Mulai konfirmasi' }))
    await user.click(screen.getByRole('button', { name: 'Setujui demo' }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('paginates, labels status, and fixes receipt width', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(
      <>
        <Pagination page={2} totalPages={5} onPageChange={onPageChange} />
        <StatusBadge label="READY" tone="success" />
        <Receipt
          width={58}
          businessName="Demo Laundry"
          outletName="Outlet Demo"
          orderCode="DMO-260808-0001"
          lines={[{ label: 'Total', value: 'Rp10.000' }]}
          footer="Data demo"
        />
      </>,
    )

    await user.click(screen.getByRole('button', { name: /Berikutnya/ }))
    expect(onPageChange).toHaveBeenCalledWith(3)
    expect(screen.getByText('READY')).toBeVisible()
    expect(screen.getByLabelText('Preview nota 58 milimeter')).toHaveAttribute(
      'data-receipt-width',
      '58',
    )
  })
})
