# Design System LaundryKita

| Atribut             | Nilai                                                                |
| ------------------- | -------------------------------------------------------------------- |
| Status gate         | `READY_FOR_THEME_QA`                                                 |
| Versi               | 1.0                                                                  |
| Tanggal persetujuan | 8 Agustus 2026                                                       |
| Otoritas            | Owner-delegated approval setelah audit teknis dan visual             |
| Implementasi        | `src/shared/ui`, `src/styles`, dan `src/app/DesignSystemPreview.tsx` |

Dokumen ini adalah sumber kanonis visual, token, dan kontrak komponen LaundryKita. Scope, aturan bisnis, akses, flow, dan route tetap dimiliki oleh [PRD](PRD.md), [Domain Rules](DOMAIN_RULES.md), [Role Permission Matrix](ROLE_PERMISSION_MATRIX.md), [User Flows](USER_FLOWS.md), dan [Screen Map](SCREEN_MAP.md).

## 1. Arah visual

LaundryKita memakai arah **fresh operational ledger**: permukaan putih hangat, teks ink yang kuat, serta teal sebagai aksen aksi tunggal. Hierarki harus cepat dipindai oleh kasir, tetap ramah untuk usaha laundry kecil-menengah, dan tidak menyerupai template SaaS generik.

- Tema MVP mendukung light dan dark melalui semantic token yang sama; komponen dan behavior tidak diduplikasi.
- Font memakai system stack lokal; tidak ada font remote atau CDN.
- Primary teal dipakai untuk aksi utama, fokus, dan penanda pilihan—bukan dekorasi massal.
- Success, warning, danger, dan info selalu disertai teks dan/atau ikon yang bermakna.
- Gradasi, ilustrasi dekoratif, glass effect, dan visual polish yang mengurangi kepadatan operasional dihindari.
- Bahasa UI adalah Bahasa Indonesia. Status domain yang ditampilkan mempertahankan enum kanonis bila dibutuhkan audit.

## 2. Fondasi token dan theme

`src/styles/tokens.css` adalah satu-satunya sumber palette. Komponen hanya membaca semantic custom properties atau pemetaan Tailwind, bukan warna mentah.

### Arsitektur theme

- `ThemeProvider` menyimpan theme aktif dan menyediakan `setTheme` serta `toggleTheme`.
- `ThemeContainer` memasang `data-theme="light"` atau `data-theme="dark"` pada boundary aplikasi.
- Provider juga menyinkronkan theme ke document root agar portal Radix menerima palette yang sama.
- Satu komponen tidak boleh bercabang berdasarkan theme untuk menentukan warna; pergantian kulit hanya melalui semantic token.
- Preference dapat disimpan pada `localStorage` dengan fallback ke preferensi sistem.
- Print receipt memakai token print tetap agar hasil thermal tidak berubah ketika aplikasi memakai dark theme.

### Warna semantik

| Token            | Light     | Dark      | Pemakaian            |
| ---------------- | --------- | --------- | -------------------- |
| `background`     | `#f4f8f7` | `#071310` | Latar aplikasi       |
| `surface`        | `#ffffff` | `#0d1f1b` | Panel dan dialog     |
| `surface-subtle` | `#edf4f2` | `#132a24` | Konten sekunder      |
| `text`           | `#132522` | `#e8f5f1` | Teks utama           |
| `muted`          | `#5c6e69` | `#a6bbb5` | Teks penjelas        |
| `border`         | `#cbd9d5` | `#2d4942` | Pemisah dan kontrol  |
| `primary`        | `#0f766e` | `#5eead4` | Aksi utama dan focus |
| `accent`         | `#ccfbf1` | `#123d36` | Penanda pilihan      |
| `success`        | `#18794e` | `#6ee7a7` | Hasil berhasil       |
| `warning`        | `#9a5807` | `#fbbf5b` | Perhatian            |
| `danger`         | `#b4232e` | `#fb7185` | Risiko/destructive   |
| `info`           | `#1e5f91` | `#7dd3fc` | Informasi netral     |

Nilai palette hanya boleh muncul dalam `tokens.css`. Perubahan palette wajib mengukur ulang kontras kedua theme.

### Tipografi, ruang, dan bentuk

- Font UI: system sans stack; font nota: system monospace stack.
- Skala teks: 12, 14, 16, 18, 22, 28, dan fluid 32–48 px.
- Line-height: 1.15 untuk judul, 1.5 untuk UI, dan 1.65 untuk bacaan panjang.
- Spacing memakai skala 4 px: 4, 8, 12, 16, 20, 24, 32, 40, 48, dan 64 px.
- Radius: 6, 10, 14, 20 px, serta pill penuh. Kontrol utama memakai radius medium; radius besar dibatasi pada surface hierarki tinggi.
- Elevation: `sm`, `md`, dan `lg`; border tetap menjadi pemisah utama.
- Lebar konten: reading 44 rem, content 76 rem, wide 90 rem.

### Breakpoint, z-index, fokus, dan motion

- Compact: 360 px; tablet: 768 px; desktop lebar: 1280 px ke atas.
- Z-index: base 0, sticky 20, dropdown 40, overlay 50, toast 60.
- Focus ring berukuran 3 px dan harus terlihat pada keyboard navigation.
- Durasi motion: 120, 180, dan 240 ms dengan easing standar.
- `prefers-reduced-motion: reduce` menonaktifkan animasi/transisi non-esensial dan smooth scroll.
- Target interaktif minimum 44 × 44 px. Kontrol kecil seperti switch harus dibungkus label/hit area minimal 44 px.

## 3. Dependency yang disetujui

| Dependency                                | Peran                                   | Guardrail                                                          |
| ----------------------------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Tailwind CSS v4 + Vite plugin             | Utility compiler di atas token semantik | Light/dark hanya mengganti token; utility komponen tetap sama      |
| `class-variance-authority`                | Kontrak variant/size typed              | Variant lintas komponen harus memakai istilah konsisten            |
| `clsx` + `tailwind-merge`                 | Komposisi class                         | Dipusatkan melalui helper `cn`                                     |
| `lucide-react`                            | Ikon garis konsisten                    | Ikon dekoratif `aria-hidden`; aksi icon-only wajib accessible name |
| Radix Dialog, Dropdown Menu, Switch, Tabs | Fokus dan keyboard behavior kompleks    | Tidak dipakai untuk komponen sederhana atau business logic         |

React Router, form library, chart library, Storybook, PWA plugin, SDK auth/backend/database/payment/analytics, dan library komponen siap pakai tidak termasuk design-system gate.

## 4. Inventaris komponen

Semua komponen diekspor melalui `src/shared/ui/index.ts`, mempunyai props TypeScript, tidak memuat aturan bisnis, dan menerima `className` bila komposisi layout dibutuhkan.

| Kelompok    | Komponen                                                                                                          | Kontrak penting                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Aksi        | `Button`, `IconButton`, `LinkButton`                                                                              | Variant primary/secondary/quiet/danger; size konsisten; loading/disabled; icon-only berlabel |
| Form        | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`                                                      | Label/description/error terhubung; invalid state semantik; target 44 px                      |
| Field       | `Field`, `Label`, `HelperText`, `FieldError`                                                                      | Menyatukan label, bantuan, dan error tanpa business validation                               |
| Status      | `Badge`, `StatusBadge`                                                                                            | Ikon atau label eksplisit; warna hanya penguat                                               |
| Surface     | `Card`, `SectionCard`, `MetricCard`                                                                               | Hierarki informasi, bukan card untuk setiap elemen                                           |
| Feedback    | `Alert`, `Banner`, `ToastPreview`                                                                                 | `role` sesuai urgensi; toast hanya visual preview, bukan manager global                      |
| Navigation  | `Tabs`, `DropdownMenu`, `Pagination`, `FilterBar`                                                                 | Keyboard operable dan state aktif terbaca                                                    |
| Overlay     | `Dialog`, `Drawer`, `ConfirmationDialog`                                                                          | Focus trap, Escape, close label, dan focus return                                            |
| Data        | `Table`, `ResponsiveCardList`                                                                                     | Tabel desktop; kartu/list atau scroll terkontrol pada compact                                |
| Async/state | `Skeleton`, `LoadingState`, `EmptyState`, `ErrorState`, `PermissionDeniedState`, `ReadOnlyBanner`, `SuccessState` | Pesan dan aksi harus spesifik pada consumer                                                  |
| Shell/print | `AppShell`, `Receipt`                                                                                             | Shell hanya visual foundation; nota mendukung 58 dan 80 mm                                   |

## 5. Aturan penggunaan

**Kontrak dual-theme wajib:** satu komponen, satu markup, satu behavior, dan dua palette melalui semantic token. Tidak boleh ada komponen light/dark terpisah atau warna mentah di consumer.

1. Pilih komponen semantik yang sudah ada sebelum menambah variasi baru.
2. Satu layar memiliki satu primary action dominan. Aksi sekunder memakai secondary/quiet.
3. Aksi destructive selalu memakai label eksplisit dan confirmation bila tidak mudah dipulihkan.
4. Loading tidak boleh menggeser struktur utama secara ekstrem; error harus memberi jalur retry atau pemulihan.
5. Permission denied berbeda dari read-only: denied menyembunyikan data/tindakan terlarang, sedangkan read-only tetap menunjukkan data yang sah dan alasan mutasi dinonaktifkan.
6. Jangan menyandikan capability, plan, status domain, formula, atau route ke komponen design system.
7. Contoh `AppShell`, form order, production board, billing card, dan nota pada preview adalah data demo—bukan fixture atau implementasi fitur.

## 6. Responsive dan layout

- 360 px: satu kolom, CTA mudah dijangkau, tabel berubah menjadi card-list, overlay memakai drawer bila konteks perlu dipertahankan.
- 768 px: navigasi dan filter dapat mengalir horizontal secara terkontrol; surface utama tetap tidak overflow.
- 1280 px+: rail/sidebar dan panel pendamping dapat tampil bersamaan selama primary content tetap dominan.
- Konteks tenant/outlet pada aplikasi produksi kelak mengikuti wireframe dan permission; contoh shell tidak menetapkan perilaku produk.
- Hindari horizontal overflow pada root. Scroller lokal hanya boleh dipakai bila konten memang tidak dapat direflow, memiliki affordance, dan tetap keyboard-accessible.

## 7. Aksesibilitas

- Target WCAG 2.2 AA untuk kontras, fokus, nama/label, dan keyboard behavior.
- Urutan fokus mengikuti urutan visual; skip link tersedia pada shell/preview yang memiliki navigasi panjang.
- Dialog/drawer mengunci fokus, menutup dengan Escape, dan mengembalikan fokus ke pemicu.
- Error form terhubung melalui `aria-describedby`/`aria-invalid`; status live memakai tingkat urgensi proporsional.
- Ikon tidak menjadi satu-satunya pembeda status. Icon button selalu memiliki `aria-label`.
- Perubahan motion harus tetap dapat dipahami ketika animasi dimatikan.

## 8. Nota 58/80 mm

- `Receipt` menerima width hanya `58` atau `80` mm dan memakai font monospace lokal.
- Print mode mengisolasi satu nota, menghapus border/shadow preview, dan membatasi lebar ke area cetak untuk menghindari clipping akibat pembulatan pixel.
- Informasi transaksi final harus mengikuti Domain Rules dan requirement nota; komponen hanya menyediakan struktur.
- QA printer fisik tetap bagian pilot; browser print foundation bukan integrasi native printer.

## 9. Preview dan quality gate

`DesignSystemPreview` menggantikan placeholder foundation sementara. Preview tidak memakai router, bukan production route, tidak boleh disalin sebagai feature, dan seluruh contoh diberi label demo.

Perubahan token atau primitive wajib menjalankan:

```bash
npm run check
npm audit --omit=dev
```

Perubahan visual memerlukan QA light dan dark pada 1440 × 900, 768 × 1024, dan 360 × 800, keyboard/focus, portal overlay, serta print QA 58/80 mm. Bukti baseline terdapat pada [Design System Audit](DESIGN_SYSTEM_AUDIT.md).
