import {
  Activity,
  AlertCircle,
  Banknote,
  Bell,
  BookOpen,
  Box,
  ChevronDown,
  ClipboardList,
  Ellipsis,
  FileText,
  LayoutDashboard,
  Menu,
  PackageCheck,
  Plus,
  Search,
  Settings,
  Shirt,
  Sparkles,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import { useState } from 'react'

import {
  Alert,
  AppShell,
  Badge,
  Banner,
  Button,
  Card,
  Checkbox,
  ConfirmationDialog,
  Dialog,
  Drawer,
  DropdownMenu,
  EmptyState,
  ErrorState,
  Field,
  FieldError,
  FieldSearchIcon,
  FilterBar,
  HelperText,
  IconButton,
  Input,
  Label,
  LinkButton,
  LoadingState,
  MetricCard,
  Pagination,
  PermissionDeniedState,
  Radio,
  ReadOnlyBanner,
  Receipt,
  ResponsiveCardList,
  SectionCard,
  Select,
  StatusBadge,
  SuccessState,
  Switch,
  Table,
  Tabs,
  Textarea,
  ToastPreview,
} from '@/shared/ui'
import '@/styles/preview.css'

const sectionLinks = [
  ['overview', 'Arah'],
  ['tokens', 'Token'],
  ['actions', 'Action'],
  ['forms', 'Form'],
  ['feedback', 'Feedback'],
  ['data', 'Data'],
  ['overlays', 'Overlay'],
  ['shell', 'Shell'],
  ['patterns', 'Pola'],
  ['states', 'State'],
  ['receipt', 'Nota'],
] as const

const colorTokens = [
  ['Background', 'var(--color-background)', '#F4F8F7'],
  ['Surface', 'var(--color-surface)', '#FFFFFF'],
  ['Subtle', 'var(--color-surface-subtle)', '#EDF4F2'],
  ['Text', 'var(--color-text)', '#132522'],
  ['Muted', 'var(--color-text-muted)', '#5C6E69'],
  ['Border', 'var(--color-border)', '#CBD9D5'],
  ['Primary', 'var(--color-primary)', '#0F766E'],
  ['Accent', 'var(--color-accent)', '#CCFBF1'],
  ['Success', 'var(--color-success)', '#18794E'],
  ['Warning', 'var(--color-warning)', '#9A5807'],
  ['Danger', 'var(--color-danger)', '#B4232E'],
  ['Info', 'var(--color-info)', '#1E5F91'],
] as const

const demoRows = [
  {
    code: 'SDR-260808-0042',
    customer: 'Budi Santoso',
    status: 'READY',
    payment: 'PARTIAL',
    amount: 'Rp57.375',
  },
  {
    code: 'SDR-260808-0041',
    customer: 'Siti Rahayu',
    status: 'IRONING',
    payment: 'PAID',
    amount: 'Rp86.000',
  },
  {
    code: 'SDR-260808-0040',
    customer: 'Andi Wijaya',
    status: 'WASHING',
    payment: 'UNPAID',
    amount: 'Rp35.000',
  },
] as const

const receiptLines = [
  { label: 'Pelanggan', value: 'Budi Santoso' },
  { label: 'Cuci Kering', value: '3 kg × Rp7.000' },
  { label: 'Bedcover', value: '2 × Rp15.000' },
  { label: 'Express', value: 'Rp12.750' },
  { label: 'Diskon', value: '-Rp6.375' },
  { label: 'TOTAL', value: 'Rp57.375', emphasized: true },
  { label: 'Dibayar', value: 'Rp10.000' },
  { label: 'Sisa', value: 'Rp47.375' },
  { label: 'Pesanan / Pembayaran', value: 'READY / PARTIAL' },
] as const

function PreviewSection({
  children,
  description,
  eyebrow,
  id,
  title,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="ds-preview-section">
      <div className="mb-8 max-w-3xl">
        <span className="text-xs font-black tracking-[0.16em] text-brand uppercase">
          {eyebrow}
        </span>
        <h2 className="mt-2 mb-2 text-2xl font-black tracking-tight text-ink md:text-3xl">
          {title}
        </h2>
        <p className="m-0 text-base leading-relaxed text-ink-muted">
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}

function DemoLabel() {
  return <Badge tone="primary">DEMO DESIGN SYSTEM · NON-PRODUCTION</Badge>
}

function MobileShellPreview() {
  return (
    <div
      className="ds-mobile-shell"
      aria-label="Contoh visual app shell mobile"
    >
      <header className="flex min-h-16 items-center justify-between border-b border-line px-3 pt-2">
        <IconButton
          label="Buka menu demo"
          icon={<Menu className="size-5" />}
          variant="ghost"
        />
        <div className="min-w-0 flex-1 px-2">
          <strong className="block truncate text-sm">
            Laundry Bersih Jaya
          </strong>
          <span className="block truncate text-xs text-ink-muted">
            Outlet Sudirman · WIB
          </span>
        </div>
        <IconButton
          label="Notifikasi demo"
          icon={<Bell className="size-5" />}
          variant="ghost"
        />
      </header>
      <div className="p-4 pb-24">
        <DemoLabel />
        <h3 className="mt-4 mb-1 text-xl font-black">Ringkasan outlet</h3>
        <p className="mt-0 text-sm text-ink-muted">Hari ini, 8 Agustus 2026</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MetricCard label="Aktif" value="18" hint="pesanan" />
          <MetricCard label="Siap" value="6" hint="diambil" />
        </div>
        <div className="mt-4 grid gap-2">
          {demoRows.slice(0, 2).map((row) => (
            <Card key={row.code} className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <strong className="block text-sm">{row.code}</strong>
                  <span className="text-xs text-ink-muted">{row.customer}</span>
                </div>
                <StatusBadge
                  label={row.status}
                  tone={row.status === 'READY' ? 'success' : 'info'}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
      <nav
        className="absolute inset-x-0 bottom-0 grid grid-cols-4 border-t border-line bg-panel"
        aria-label="Navigasi mobile demo"
      >
        {[
          [LayoutDashboard, 'Ringkas'],
          [ClipboardList, 'Pesanan'],
          [Shirt, 'Produksi'],
          [Ellipsis, 'Lainnya'],
        ].map(([Icon, label], index) => (
          <button
            key={String(label)}
            type="button"
            className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[0.68rem] font-bold ${index === 0 ? 'text-brand' : 'text-ink-muted'}`}
          >
            <Icon className="size-5" aria-hidden="true" />
            {String(label)}
          </button>
        ))}
      </nav>
    </div>
  )
}

export function DesignSystemPreview() {
  const [page, setPage] = useState(1)
  const [switchEnabled, setSwitchEnabled] = useState(true)

  const receipt58 = (
    <Receipt
      width={58}
      businessName="LAUNDRY BERSIH JAYA"
      outletName="Outlet Sudirman"
      orderCode="SDR-260808-0042"
      lines={receiptLines}
      footer="ETA 8 Agu 2026 · 17.00 WIB · Terima kasih"
    />
  )
  const receipt80 = (
    <Receipt
      width={80}
      businessName="LAUNDRY BERSIH JAYA"
      outletName="Outlet Sudirman"
      orderCode="SDR-260808-0042"
      lines={receiptLines}
      footer="ETA 8 Agu 2026 · 17.00 WIB · Terima kasih"
    />
  )

  return (
    <>
      <div className="ds-preview">
        <a
          href="#main-preview"
          className="fixed top-2 left-2 z-[100] -translate-y-20 rounded-md bg-ink px-4 py-3 text-sm font-bold text-white focus:translate-y-0"
        >
          Lewati ke konten
        </a>

        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-line bg-panel/90 px-4 backdrop-blur md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-brand font-black text-white">
              LK
            </span>
            <div className="min-w-0">
              <strong className="block truncate text-sm text-ink">
                LaundryKita Design System
              </strong>
              <span className="block truncate text-xs text-ink-muted">
                Preview komponen · bukan route produksi
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge label="Light theme" tone="primary" />
            <span className="hidden sm:block">
              <LinkButton href="#receipt" variant="secondary" size="sm">
                Lihat nota
              </LinkButton>
            </span>
          </div>
        </header>

        <div className="ds-preview-layout">
          <aside
            className="ds-preview-rail ds-scrollbar"
            aria-label="Indeks design system"
          >
            <div className="mb-4">
              <DemoLabel />
            </div>
            <p className="mb-4 text-xs leading-relaxed text-ink-muted">
              Token semantik, komponen aksesibel, dan pola visual netral untuk
              seluruh frontend.
            </p>
            <nav className="grid gap-1">
              {sectionLinks.map(([id, label], index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold text-ink-muted hover:bg-panel-subtle hover:text-ink"
                >
                  <span className="font-mono text-[0.65rem] text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <main id="main-preview" className="ds-preview-main">
            <PreviewSection
              id="overview"
              eyebrow="LaundryKita · Design System 1.0"
              title="Operasional yang tenang, tindakan yang tegas."
              description="Sistem visual ini mengutamakan kecepatan pindai kasir, kebenaran finansial, dan konteks outlet yang selalu terbaca. Teal menandai tindakan utama; ink dan ruang putih menjaga kepadatan tetap jelas."
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
                <div className="rounded-xl bg-ink p-6 text-white md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <DemoLabel />
                    <span className="text-xs font-bold tracking-widest text-white/60 uppercase">
                      Light only · MVP
                    </span>
                  </div>
                  <h1 className="mt-10 mb-3 max-w-2xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
                    Segar tanpa ramai. Padat tanpa terasa berat.
                  </h1>
                  <p className="mb-8 max-w-xl text-base leading-relaxed text-white/70">
                    System font, semantic token, 44 px target, focus yang
                    kentara, dan status berlabel membentuk fondasi UI
                    LaundryKita.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Sparkles className="size-4" aria-hidden="true" /> Primary
                      action
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/35 text-white hover:bg-white/10"
                    >
                      Secondary action
                    </Button>
                  </div>
                </div>
                <div className="grid content-between gap-4 rounded-xl border border-line bg-panel p-6">
                  <div>
                    <span className="text-xs font-black tracking-widest text-brand uppercase">
                      Prinsip inti
                    </span>
                    <ol className="mt-5 grid gap-4 pl-5 text-sm text-ink">
                      <li>
                        <strong>Konteks dahulu.</strong>
                        <span className="block text-ink-muted">
                          Tenant, outlet, status, baru tindakan.
                        </span>
                      </li>
                      <li>
                        <strong>Satu aksen.</strong>
                        <span className="block text-ink-muted">
                          Teal untuk aksi dan focus, bukan dekorasi.
                        </span>
                      </li>
                      <li>
                        <strong>State eksplisit.</strong>
                        <span className="block text-ink-muted">
                          Ikon, teks, dan arahan pemulihan.
                        </span>
                      </li>
                    </ol>
                  </div>
                  <Alert tone="info" title="Data preview">
                    <p>
                      Semua nama dan angka pada halaman ini adalah demo
                      non-production.
                    </p>
                  </Alert>
                </div>
              </div>
            </PreviewSection>

            <PreviewSection
              id="tokens"
              eyebrow="Foundations"
              title="Token yang bisa dibaca manusia."
              description="Semantic custom properties adalah sumber kebenaran. Tailwind memetakan token tersebut ke utility tanpa menyimpan nilai produk atau warna mentah di komponen."
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {colorTokens.map(([name, value, hex]) => (
                  <div key={name} className="ds-swatch">
                    <div
                      className="ds-swatch-color"
                      style={{ background: value }}
                    />
                    <div className="p-3">
                      <strong className="block text-xs text-ink">{name}</strong>
                      <code className="text-[0.68rem] text-ink-muted">
                        {hex}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <SectionCard
                  title="Typography"
                  description="System font stack · tanpa remote font"
                >
                  <div className="grid gap-4">
                    <p className="m-0 text-3xl font-black tracking-tight">
                      Display / 48
                    </p>
                    <p className="m-0 text-2xl font-bold tracking-tight">
                      Heading / 28
                    </p>
                    <p className="m-0 text-lg font-semibold">Section / 18</p>
                    <p className="m-0 text-base">
                      Body / 16 — cepat dipindai dan nyaman untuk operasi
                      harian.
                    </p>
                    <p className="m-0 text-sm text-ink-muted">
                      Small / 14 — helper, metadata, dan konteks.
                    </p>
                    <code className="font-receipt text-xs">
                      Mono / 12 — SDR-260808-0042 · Rp57.375
                    </code>
                  </div>
                </SectionCard>
                <SectionCard
                  title="Spacing, radius, elevation"
                  description="Ritme 4 px; radius bersahabat tanpa terasa dekoratif"
                >
                  <div className="grid gap-5">
                    <div className="flex flex-wrap items-end gap-3">
                      {[4, 8, 12, 16, 24, 32, 48].map((size) => (
                        <span
                          key={size}
                          className="grid place-items-center rounded-sm bg-accent text-[0.62rem] font-bold text-ink"
                          style={{
                            width: `${Math.max(size, 20)}px`,
                            height: `${Math.max(size, 20)}px`,
                          }}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Card className="h-20 rounded-sm p-3 text-xs">sm</Card>
                      <Card className="h-20 rounded-lg p-3 text-xs shadow-[var(--shadow-md)]">
                        lg
                      </Card>
                      <Card className="h-20 rounded-xl p-3 text-xs shadow-[var(--shadow-lg)]">
                        xl
                      </Card>
                    </div>
                    <p className="m-0 text-xs text-ink-muted">
                      Motion 120 / 180 / 240 ms · reduced-motion dihormati ·
                      z-index berlapis dari sticky hingga toast.
                    </p>
                  </div>
                </SectionCard>
              </div>
            </PreviewSection>

            <PreviewSection
              id="actions"
              eyebrow="Actions"
              title="Satu bahasa tindakan."
              description="Variant menyampaikan prioritas. Loading dan disabled tetap mempertahankan ukuran agar layout tidak bergeser."
            >
              <div className="grid gap-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Button>
                    <Plus className="size-4" /> Buat pesanan
                  </Button>
                  <Button variant="secondary">Simpan draft</Button>
                  <Button variant="outline">Tinjau</Button>
                  <Button variant="ghost">Batalkan</Button>
                  <Button variant="danger">Hapus akses</Button>
                  <Button loading loadingLabel="Menyimpan" />
                  <Button disabled>Tidak tersedia</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <IconButton
                    label="Cari"
                    icon={<Search className="size-5" />}
                  />
                  <IconButton
                    label="Tutup"
                    icon={<X className="size-5" />}
                    variant="secondary"
                  />
                  <LinkButton href="#forms">Link button</LinkButton>
                  <Badge>Neutral</Badge>
                  <Badge tone="primary">Primary</Badge>
                  <StatusBadge label="Selesai" tone="success" />
                  <StatusBadge label="Perlu perhatian" tone="warning" />
                  <StatusBadge label="Gagal" tone="danger" />
                  <StatusBadge label="Informasi" tone="info" />
                </div>
              </div>
            </PreviewSection>

            <PreviewSection
              id="forms"
              eyebrow="Form controls"
              title="Form yang langsung menjelaskan apa yang salah."
              description="Label selalu terlihat, helper dekat input, error terhubung melalui aria-describedby, dan target interaktif minimum 44 px."
            >
              <div className="grid gap-6 xl:grid-cols-2">
                <SectionCard
                  title="Input dasar"
                  description="State default, filled, disabled, dan invalid"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <Label htmlFor="demo-name">Nama pelanggan</Label>
                      <Input id="demo-name" defaultValue="Budi Santoso" />
                      <HelperText>Nama wajib untuk pencarian.</HelperText>
                    </Field>
                    <Field>
                      <Label htmlFor="demo-phone">Nomor HP</Label>
                      <Input
                        id="demo-phone"
                        leadingIcon={<FieldSearchIcon />}
                        placeholder="08xxxxxxxxxx"
                      />
                      <HelperText>Opsional · format Indonesia.</HelperText>
                    </Field>
                    <Field>
                      <Label htmlFor="demo-service">Layanan</Label>
                      <Select id="demo-service" defaultValue="kilogram">
                        <option value="kilogram">Cuci Kering · kilogram</option>
                        <option value="satuan">Bedcover · satuan</option>
                      </Select>
                    </Field>
                    <Field>
                      <Label htmlFor="demo-weight">Berat aktual</Label>
                      <Input
                        id="demo-weight"
                        defaultValue="2,35"
                        invalid
                        aria-describedby="demo-weight-error"
                      />
                      <FieldError id="demo-weight-error">
                        <AlertCircle className="size-3.5" />
                        Gunakan maksimal dua desimal.
                      </FieldError>
                    </Field>
                    <Field className="sm:col-span-2">
                      <Label htmlFor="demo-note">Catatan</Label>
                      <Textarea
                        id="demo-note"
                        placeholder="Catatan operasional, bukan data production"
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="demo-disabled">Disabled</Label>
                      <Input
                        id="demo-disabled"
                        disabled
                        defaultValue="Tidak dapat diubah"
                      />
                    </Field>
                  </div>
                </SectionCard>
                <SectionCard
                  title="Selection controls"
                  description="Native choice untuk bentuk sederhana; Radix untuk switch"
                >
                  <div className="grid gap-3">
                    <Checkbox
                      label="Cetak nota setelah simpan"
                      description="Contoh preferensi lokal pada preview."
                      defaultChecked
                    />
                    <Checkbox label="Kontrol dinonaktifkan" disabled />
                    <fieldset className="grid gap-1 border-0 p-0">
                      <legend className="mb-1 text-sm font-semibold">
                        Metode demo
                      </legend>
                      <Radio name="demo-payment" label="Tunai" defaultChecked />
                      <Radio name="demo-payment" label="Transfer manual" />
                    </fieldset>
                    <Switch
                      label="Aktifkan opsi express"
                      description="Demo behavior tanpa menyimpan data."
                      checked={switchEnabled}
                      onCheckedChange={setSwitchEnabled}
                    />
                    <Switch label="Tidak tersedia" disabled />
                  </div>
                </SectionCard>
              </div>
            </PreviewSection>

            <PreviewSection
              id="feedback"
              eyebrow="Feedback"
              title="State harus mengatakan apa yang terjadi."
              description="Warna mempercepat pindai, tetapi ikon, judul, copy, dan tindakan tetap membawa makna utama."
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <Alert tone="info" title="Informasi outlet">
                  <p>Konteks aktif: Outlet Sudirman · WIB.</p>
                </Alert>
                <Alert tone="success" title="Perubahan tersimpan">
                  <p>Demo berhasil tanpa menyimpan data.</p>
                </Alert>
                <Alert tone="warning" title="Perlu ditinjau">
                  <p>Nilai ini berbeda dari ringkasan terakhir.</p>
                </Alert>
                <Alert tone="danger" title="Tidak dapat memproses">
                  <p>Periksa input yang ditandai lalu coba lagi.</p>
                </Alert>
              </div>
              <div className="mt-6 overflow-hidden rounded-lg border border-line bg-panel">
                <Banner tone="warning" title="Mode hanya baca">
                  <p>
                    Mutasi dinonaktifkan. Pengguna berizin tetap dapat membuka
                    pemulihan billing.
                  </p>
                </Banner>
                <div className="p-5">
                  <ToastPreview tone="success" title="Berhasil disimulasikan">
                    <p>
                      Toast mempertahankan konteks dan dapat diumumkan oleh live
                      region.
                    </p>
                  </ToastPreview>
                </div>
              </div>
            </PreviewSection>

            <PreviewSection
              id="data"
              eyebrow="Data display"
              title="Tabel di desktop, kartu saat ruang sempit."
              description="Kode, status, nominal, waktu, dan tindakan utama tetap tersedia pada kedua representasi."
            >
              <FilterBar>
                <Field className="min-w-56 flex-1">
                  <Label htmlFor="demo-search">Cari data demo</Label>
                  <Input
                    id="demo-search"
                    leadingIcon={<Search className="size-4" />}
                    placeholder="Kode atau nama"
                  />
                </Field>
                <Field className="min-w-44">
                  <Label htmlFor="demo-filter">Status</Label>
                  <Select id="demo-filter">
                    <option>Semua status</option>
                    <option>READY</option>
                  </Select>
                </Field>
                <Button variant="secondary">Terapkan filter</Button>
              </FilterBar>
              <div className="mt-4 hidden md:block">
                <Table aria-label="Pesanan demo design system">
                  <thead>
                    <tr>
                      <th>Kode</th>
                      <th>Pelanggan</th>
                      <th>Order</th>
                      <th>Payment</th>
                      <th className="text-right">Total</th>
                      <th>
                        <span className="sr-only">Aksi</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoRows.map((row) => (
                      <tr key={row.code}>
                        <td className="font-mono text-xs font-bold">
                          {row.code}
                        </td>
                        <td>{row.customer}</td>
                        <td>
                          <StatusBadge
                            label={row.status}
                            tone={row.status === 'READY' ? 'success' : 'info'}
                          />
                        </td>
                        <td>
                          <StatusBadge
                            label={row.payment}
                            tone={
                              row.payment === 'PAID'
                                ? 'success'
                                : row.payment === 'PARTIAL'
                                  ? 'warning'
                                  : 'neutral'
                            }
                          />
                        </td>
                        <td className="text-right font-semibold">
                          {row.amount}
                        </td>
                        <td className="text-right">
                          <IconButton
                            label={`Aksi ${row.code}`}
                            icon={<Ellipsis className="size-4" />}
                            variant="ghost"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="mt-4 md:hidden">
                <ResponsiveCardList
                  ariaLabel="Pesanan demo dalam kartu"
                  items={demoRows}
                  getKey={(row) => row.code}
                  renderItem={(row) => (
                    <Card className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <strong className="block font-mono text-xs">
                            {row.code}
                          </strong>
                          <span className="mt-1 block text-sm">
                            {row.customer}
                          </span>
                        </div>
                        <strong>{row.amount}</strong>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <StatusBadge
                          label={row.status}
                          tone={row.status === 'READY' ? 'success' : 'info'}
                        />
                        <StatusBadge label={row.payment} tone="neutral" />
                      </div>
                    </Card>
                  )}
                />
              </div>
              <div className="mt-5">
                <Pagination page={page} totalPages={5} onPageChange={setPage} />
              </div>
            </PreviewSection>

            <PreviewSection
              id="overlays"
              eyebrow="Complex behavior"
              title="Overlay yang menjaga konteks dan focus."
              description="Radix menangani focus trap, Escape, aria relationship, dan focus return. Visual tetap berasal dari token LaundryKita."
            >
              <div className="flex flex-wrap gap-3">
                <Dialog
                  trigger={<Button>Buka dialog</Button>}
                  title="Tambah layanan demo"
                  description="Contoh form tanpa business logic."
                  footer={
                    <>
                      <Button variant="secondary">Batal</Button>
                      <Button>Simpan demo</Button>
                    </>
                  }
                >
                  <div className="grid gap-4">
                    <DemoLabel />
                    <Field>
                      <Label htmlFor="dialog-name">Nama layanan demo</Label>
                      <Input
                        id="dialog-name"
                        placeholder="Contoh: Cuci Kering"
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="dialog-unit">Unit</Label>
                      <Select id="dialog-unit">
                        <option>Kilogram</option>
                        <option>Satuan</option>
                      </Select>
                    </Field>
                  </div>
                </Dialog>
                <Drawer
                  trigger={<Button variant="secondary">Buka drawer</Button>}
                  title="Filter demo"
                  description="Drawer mempertahankan layar asal."
                  footer={
                    <>
                      <Button variant="secondary">Reset</Button>
                      <Button>Terapkan</Button>
                    </>
                  }
                >
                  <div className="grid gap-4">
                    <DemoLabel />
                    <Field>
                      <Label htmlFor="drawer-outlet">Outlet</Label>
                      <Select id="drawer-outlet">
                        <option>Outlet Sudirman</option>
                        <option>Outlet Kemang</option>
                      </Select>
                    </Field>
                    <Switch label="Hanya yang terlambat" />
                  </div>
                </Drawer>
                <ConfirmationDialog
                  trigger={
                    <Button variant="danger">Konfirmasi sensitif</Button>
                  }
                  title="Hapus akses demo?"
                  description="Tindakan ini hanya menguji pola confirmation."
                  confirmLabel="Hapus akses demo"
                  onConfirm={() => undefined}
                >
                  <Alert tone="warning" title="Dampak tindakan">
                    <p>
                      Label tombol menyebut tindakan; tidak memakai jawaban
                      “Ya”.
                    </p>
                  </Alert>
                </ConfirmationDialog>
                <DropdownMenu
                  label="Menu aksi demo"
                  trigger={
                    <Button variant="outline">
                      Menu aksi <ChevronDown className="size-4" />
                    </Button>
                  }
                  items={[
                    {
                      id: 'view',
                      label: 'Lihat detail',
                      icon: <BookOpen className="size-4" />,
                    },
                    {
                      id: 'duplicate',
                      label: 'Duplikasi demo',
                      icon: <Box className="size-4" />,
                    },
                    {
                      id: 'delete',
                      label: 'Tindakan sensitif',
                      icon: <X className="size-4" />,
                      danger: true,
                    },
                  ]}
                />
              </div>
              <div className="mt-6">
                <Tabs
                  ariaLabel="Contoh tab komponen"
                  defaultValue="overview"
                  items={[
                    {
                      value: 'overview',
                      label: 'Ringkasan',
                      content: (
                        <p className="m-0 text-sm text-ink-muted">
                          Tab menggunakan panah keyboard sesuai primitive Radix.
                        </p>
                      ),
                    },
                    {
                      value: 'history',
                      label: 'Histori',
                      content: (
                        <p className="m-0 text-sm text-ink-muted">
                          Konten kedua hanya untuk demonstrasi behavior.
                        </p>
                      ),
                    },
                    {
                      value: 'disabled',
                      label: 'Akses',
                      content: (
                        <p className="m-0 text-sm text-ink-muted">
                          Permission production tidak ditentukan di komponen.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </PreviewSection>

            <PreviewSection
              id="shell"
              eyebrow="Application frame"
              title="Konteks tenant dan outlet selalu lebih dulu."
              description="Shell adalah contoh visual saja. Navigation production, permission, dan routing baru dibuat pada fase Frontend Architecture/App Shell."
            >
              <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_22.5rem]">
                <AppShell
                  productName="LaundryKita"
                  workspaceLabel="Tenant app · demo"
                  workspaceLandmark={false}
                  context={
                    <div>
                      <strong className="block truncate text-sm">
                        Laundry Bersih Jaya
                      </strong>
                      <span className="block truncate text-xs text-ink-muted">
                        Outlet Sudirman · WIB
                      </span>
                    </div>
                  }
                  actions={
                    <>
                      <StatusBadge label="ACTIVE" tone="success" />
                      <IconButton
                        label="Akun demo"
                        icon={<Users className="size-4" />}
                        variant="ghost"
                      />
                    </>
                  }
                  navigation={[
                    {
                      id: 'dashboard',
                      label: 'Dashboard',
                      icon: <LayoutDashboard className="size-4" />,
                      active: true,
                    },
                    {
                      id: 'orders',
                      label: 'Pesanan',
                      icon: <ClipboardList className="size-4" />,
                    },
                    {
                      id: 'production',
                      label: 'Produksi',
                      icon: <Shirt className="size-4" />,
                    },
                    {
                      id: 'payments',
                      label: 'Pembayaran',
                      icon: <WalletCards className="size-4" />,
                    },
                    {
                      id: 'reports',
                      label: 'Laporan',
                      icon: <FileText className="size-4" />,
                    },
                    {
                      id: 'settings',
                      label: 'Pengaturan',
                      icon: <Settings className="size-4" />,
                    },
                  ]}
                >
                  <DemoLabel />
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h3 className="m-0 text-2xl font-black">
                        Ringkasan outlet
                      </h3>
                      <p className="mt-1 text-sm text-ink-muted">
                        Contoh hierarchy app shell desktop.
                      </p>
                    </div>
                    <Button>
                      <Plus className="size-4" /> Aksi utama
                    </Button>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <MetricCard
                      label="Nilai demo"
                      value="Rp1,24 jt"
                      icon={<Banknote className="size-4" />}
                    />
                    <MetricCard
                      label="Aktif"
                      value="18"
                      icon={<Activity className="size-4" />}
                    />
                    <MetricCard
                      label="Siap"
                      value="6"
                      icon={<PackageCheck className="size-4" />}
                    />
                  </div>
                </AppShell>
                <MobileShellPreview />
              </div>
            </PreviewSection>

            <PreviewSection
              id="patterns"
              eyebrow="Operational patterns"
              title="Pola yang siap diturunkan ke frontend."
              description="Contoh tetap statis dan diberi label demo. Formula, permission, dan lifecycle tidak diimplementasikan pada fase design system."
            >
              <div className="ds-order-grid">
                <SectionCard
                  title="Form order statis"
                  description="Hierarchy input cepat · demo non-production"
                  action={<DemoLabel />}
                >
                  <div className="grid gap-5">
                    <Field>
                      <Label htmlFor="order-customer">Pelanggan demo</Label>
                      <Input
                        id="order-customer"
                        leadingIcon={<Search className="size-4" />}
                        defaultValue="Budi Santoso"
                      />
                    </Field>
                    <div className="grid gap-3 rounded-lg border border-line bg-panel-subtle p-4 sm:grid-cols-3">
                      <Field>
                        <Label htmlFor="order-service">Layanan</Label>
                        <Select id="order-service">
                          <option>Cuci Kering</option>
                        </Select>
                      </Field>
                      <Field>
                        <Label htmlFor="order-actual">Aktual</Label>
                        <Input id="order-actual" defaultValue="2,35 kg" />
                      </Field>
                      <Field>
                        <Label htmlFor="order-billable">Tertagih</Label>
                        <Input
                          id="order-billable"
                          defaultValue="3,00 kg"
                          readOnly
                        />
                      </Field>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Switch label="Express demo" defaultChecked />
                      <Button variant="secondary">Tambah item</Button>
                    </div>
                  </div>
                </SectionCard>
                <Card className="sticky top-20 self-start border-2 border-brand p-5">
                  <span className="text-xs font-black tracking-widest text-brand uppercase">
                    Ringkasan demo
                  </span>
                  <dl className="mt-4 grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="m-0">Rp51.000</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Express</dt>
                      <dd className="m-0">Rp12.750</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Diskon</dt>
                      <dd className="m-0">-Rp6.375</dd>
                    </div>
                    <div className="mt-2 flex justify-between border-t border-line pt-3 text-lg font-black">
                      <dt>Total</dt>
                      <dd className="m-0">Rp57.375</dd>
                    </div>
                  </dl>
                  <Button className="mt-5 w-full">Konfirmasi demo</Button>
                  <HelperText className="mt-2 text-center">
                    Tidak menyimpan transaksi.
                  </HelperText>
                </Card>
              </div>

              <div className="mt-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="m-0 text-xl font-black">
                      Production board statis
                    </h3>
                    <p className="mt-1 mb-0 text-sm text-ink-muted">
                      Status selalu terbaca sebagai teks; mobile berubah menjadi
                      list.
                    </p>
                  </div>
                  <DemoLabel />
                </div>
                <div className="ds-board ds-scrollbar">
                  {[
                    ['RECEIVED', 3],
                    ['WASHING', 4],
                    ['DRYING', 2],
                    ['READY', 6],
                  ].map(([status, count]) => (
                    <section
                      key={status}
                      className="rounded-lg bg-panel-subtle p-3"
                    >
                      <div className="flex items-center justify-between border-b border-line pb-2">
                        <StatusBadge
                          label={String(status)}
                          tone={
                            status === 'READY'
                              ? 'success'
                              : status === 'RECEIVED'
                                ? 'neutral'
                                : 'info'
                          }
                        />
                        <strong className="text-xs">{count}</strong>
                      </div>
                      {demoRows.slice(0, 2).map((row, index) => (
                        <Card
                          key={`${status}-${row.code}`}
                          className="mt-3 p-3"
                        >
                          <strong className="block font-mono text-xs">
                            {row.code}
                          </strong>
                          <span className="mt-1 block text-sm">
                            {row.customer}
                          </span>
                          <div className="mt-3 flex justify-between text-xs text-ink-muted">
                            <span>
                              {index === 0 ? 'EXPRESS · ⚡' : 'Reguler'}
                            </span>
                            <span>17.00 WIB</span>
                          </div>
                        </Card>
                      ))}
                    </section>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="mb-4">
                  <h3 className="m-0 text-xl font-black">Paket billing demo</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    Pricing visual; entitlement production tetap versioned.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ['Starter', 'Rp149.000', 'Untuk satu outlet'],
                    ['Growth', 'Rp299.000', 'Operasi yang bertumbuh'],
                    ['Multi-Outlet', 'Rp599.000', 'Visibilitas lintas outlet'],
                  ].map(([name, price, description], index) => (
                    <Card
                      key={name}
                      className={`relative p-5 ${index === 1 ? 'border-2 border-brand' : ''}`}
                    >
                      {index === 1 ? (
                        <Badge
                          tone="primary"
                          className="absolute -top-3 left-4"
                        >
                          Paling sesuai demo
                        </Badge>
                      ) : null}
                      <h4 className="m-0 text-lg font-black">{name}</h4>
                      <p className="mt-1 text-sm text-ink-muted">
                        {description}
                      </p>
                      <strong className="mt-6 block text-2xl tracking-tight">
                        {price}
                        <span className="text-xs font-normal text-ink-muted">
                          /bulan
                        </span>
                      </strong>
                      <ul className="my-5 grid gap-2 pl-5 text-sm">
                        <li>Limit terkonfigurasi</li>
                        <li>Usage berlabel</li>
                        <li>Histori perubahan</li>
                      </ul>
                      <Button
                        className="w-full"
                        variant={index === 1 ? 'primary' : 'secondary'}
                      >
                        Pilih demo
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </PreviewSection>

            <PreviewSection
              id="states"
              eyebrow="System states"
              title="Setiap jalan buntu punya arah keluar."
              description="Loading menjaga geometri. Empty, error, denied, read-only, dan success menjelaskan konteks tanpa membuka data yang tidak sah."
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <LoadingState />
                <EmptyState
                  title="Belum ada data demo"
                  description="Buat item pertama jika capability dan entitlement mengizinkan."
                  action={<Button>Tambah demo</Button>}
                />
                <ErrorState
                  title="Data belum dapat dimuat"
                  description="Coba lagi. Correlation ID: DEMO-20260808."
                  action={<Button variant="secondary">Coba lagi</Button>}
                />
                <PermissionDeniedState
                  title="Akses tidak tersedia"
                  description="Kembali ke area yang sesuai dengan akses Anda."
                  action={<Button variant="secondary">Kembali</Button>}
                />
                <div className="lg:col-span-2">
                  <ReadOnlyBanner
                    title="Tenant dalam mode hanya baca"
                    description="Data tetap dapat dibaca. Mutasi baru dinonaktifkan."
                    action={
                      <Button variant="secondary">Buka pemulihan demo</Button>
                    }
                  />
                </div>
                <SuccessState
                  title="Aksi demo selesai"
                  description="Feedback mengumumkan hasil dan menyediakan langkah berikutnya."
                  action={<Button>Lanjut</Button>}
                />
              </div>
            </PreviewSection>

            <PreviewSection
              id="receipt"
              eyebrow="Print foundation"
              title="Nota yang tetap terbaca di 58 dan 80 mm."
              description="System mono font, integer rupiah, garis sederhana, tanpa ID internal. Browser print memakai ukuran media yang dipilih dan tidak mencetak preview lain."
            >
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <strong>58 mm</strong>
                    <Badge>Thermal</Badge>
                  </div>
                  {receipt58}
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <strong>80 mm</strong>
                    <Badge>Thermal</Badge>
                  </div>
                  {receipt80}
                </div>
              </div>
            </PreviewSection>

            <footer className="border-t border-line py-8 text-sm text-ink-muted">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span>
                  LaundryKita Design System 1.0 · preview non-production
                </span>
                <span>WCAG AA target · Light theme · 360 / 768 / 1280+</span>
              </div>
            </footer>
          </main>
        </div>
      </div>

      <div className="receipt-print-portal" aria-hidden="true">
        {receipt58}
        {receipt80}
      </div>
    </>
  )
}
