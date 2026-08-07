# Prototype Low-Fidelity Wireframe — LaundryKita MVP

Prototype ini adalah artefak desain untuk meninjau hierarchy, navigasi, konteks tenant/outlet, permission, responsive behavior, dan critical state sebelum design system atau frontend dibuat. Ia bukan source aplikasi.

## Cara membuka

Pilihan paling sederhana:

1. Buka [`index.html`](index.html) langsung melalui browser.
2. Gunakan panel **Kontrol** untuk mengganti persona, outlet, subscription state, dan screen state.
3. Gunakan tombol **Skenario** untuk menjalankan happy path bertahap.
4. Route memakai hash, misalnya `index.html#/app/[tenantSlug]/orders/new`, sehingga dapat berpindah tanpa server.

Jika browser membatasi file lokal, jalankan static server bawaan yang sudah tersedia di komputer—tanpa memasang dependency—dari root repository, misalnya:

```powershell
python -m http.server 4173
```

Kemudian buka `http://localhost:4173/design/wireframes/`. Static server hanya opsi preview; prototype tidak melakukan network request.

## Struktur file

- [`index.html`](index.html) — shell semantik, control panel, viewport, scenario drawer, dan dialog.
- [`wireframe.css`](wireframe.css) — aturan grayscale low-fidelity untuk desktop, tablet, mobile, focus, reduced motion, dan print preview.
- [`prototype.js`](prototype.js) — manifest 41 route, fixture fiktif, renderer layar, simulasi permission/state, 18 happy path, dan critical overlay.

Tidak ada `package.json`, framework, dependency, build process, API, database, autentikasi nyata, `localStorage`, atau analytics.

## Memilih konteks simulasi

### Persona

- **Public** — public/auth shell; registrasi publik hanya Owner.
- **Owner** — semua layar tenant yang diizinkan, termasuk organisasi dan billing.
- **Admin** — operasi, layanan, dan laporan assigned outlet; toggle organisasi/billing tidak dianggap aktif pada fixture default.
- **Cashier** — pelanggan, pesanan, payment, kas, receipt, produksi, serta ringkasan outlet.
- **Operator** — dashboard antrean, order minimum, dan produksi.
- **Super Admin** — shell `/admin` terpisah, hanya metadata tenant/subscription/usage/audit Platform.

Direct URL yang tidak sesuai persona menampilkan **Permission denied**. Navigasi menyembunyikan area yang tidak relevan, tetapi prototype tidak dimaksudkan sebagai kontrol keamanan nyata.

### Outlet

- **Outlet Sudirman** dan **Outlet Kemang** adalah konteks tunggal mutasi operasional.
- **Semua outlet** hanya aktif pada dashboard/laporan berizin. Fixture mengizinkan Owner pada dashboard/laporan dan Admin pada laporan assigned-outlet aggregation.
- Konteks tenant, outlet, timezone, persona, dan subscription selalu terlihat pada app shell.

### Subscription state

- Selector ini diterapkan pada tenant app; public, auth, onboarding, dan Super Admin shell tidak menganggap pilihannya sebagai state tenant yang sedang aktif.
- `TRIALING` dan `ACTIVE`: mutasi mengikuti capability.
- `PAST_DUE`: mutasi tetap aktif selama grace 7 hari dengan banner billing.
- `SUSPENDED` dan `CANCELED`: tenant read-only; billing recovery Owner dan penutupan sesi kas yang sudah aktif tetap tersedia.

### Screen state

Tujuh pilihan tersedia: **Default**, **Loading**, **Empty**, **Error**, **Permission denied**, **Read-only**, dan **Success**. Pilihan ini hanya mengganti representasi visual; tidak mengubah fixture atau aturan kanonis.

## Happy path yang dapat dijalankan

Panel **Skenario** memuat 18 alur klik:

1. Registrasi Owner.
2. Verifikasi email.
3. Onboarding bisnis, outlet, dan layanan.
4. Login dan pemilihan tenant.
5. Quick-create pelanggan tanpa kehilangan draft.
6. Membuat pesanan kiloan.
7. Menambah layanan satuan.
8. Menerapkan express dan diskon berizin.
9. Menerima DP.
10. Mencetak nota.
11. Memproses status `RECEIVED → WASHING → DRYING → IRONING → READY`.
12. Melunasi dan menyerahkan pesanan menjadi `COMPLETED`.
13. Membuka dan menutup sesi kas.
14. Melihat dashboard dan laporan.
15. Mengundang pegawai dan mengatur outlet.
16. Melihat serta mengubah subscription.
17. Super Admin meninjau tenant tanpa data operasional.
18. Super Admin melakukan suspend dan reactivate.

Gabungan skenario mencakup `UF-01` sampai `UF-12`. Pesanan reguler untuk pelanggan lama ditandai **11 interaksi utama**, di bawah batas 12 interaksi wireframe.

## Overlay kritis

Dialog/drawer/confirmation tersedia untuk quick-create pelanggan; tambah/edit outlet; tambah/edit layanan; undang pegawai; capability role; diskon; payment; print nota; edit/cancel/handoff order; rollback; void/reversal/refund; buka/tutup kas; upgrade paket; archive plan; serta suspend/reactivate tenant.

Gunakan action pada layar terkait atau jalankan skenario. Confirmation hanya menampilkan feedback visual dan tidak menyimpan perubahan.

## Batas prototype

- Semua data adalah fixture fiktif Indonesia dan kembali ke kondisi awal saat reload.
- Form tidak menjalankan validasi domain/backend, checkout, print, Web Share, download, email, atau authentication nyata.
- Hash route memakai placeholder literal `[tenantSlug]`, `[orderId]`, `[customerId]`, dan `[tenantId]` agar sama dengan Screen Map.
- Permission/state adalah simulasi untuk review UX; enforcement production tetap wajib server-side.
- Grafik, tabel, receipt, skeleton, feedback, dan print hanya menunjukkan struktur dan hierarchy.
- Visual sengaja grayscale, belum menetapkan color token, typography final, icon library, branding final, atau motion system.
- Prototype tidak boleh disalin menjadi reusable production component, service, fixture production, atau fondasi aplikasi. Frontend baru dapat dimulai setelah wireframe disetujui dan design system gate selesai.

Sumber kanonis tetap [`../../docs/PRD.md`](../../docs/PRD.md), [`../../docs/DOMAIN_RULES.md`](../../docs/DOMAIN_RULES.md), [`../../docs/ROLE_PERMISSION_MATRIX.md`](../../docs/ROLE_PERMISSION_MATRIX.md), [`../../docs/USER_FLOWS.md`](../../docs/USER_FLOWS.md), dan [`../../docs/SCREEN_MAP.md`](../../docs/SCREEN_MAP.md).
