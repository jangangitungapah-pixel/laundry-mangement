# Product Requirements Document

## Laundry Management SaaS — MVP

| Atribut | Nilai |
| --- | --- |
| Status | Draft untuk validasi |
| Versi | 0.1 |
| Tanggal | 7 Agustus 2026 |
| Target pasar awal | Pengusaha laundry skala kecil dan menengah di Indonesia |
| Platform | Responsive web application / Progressive Web App |
| Model bisnis | SaaS multi-tenant berbasis subscription |
| Strategi pengembangan | Frontend-first, dilanjutkan backend dan integrasi per modul |

> Nama produk belum ditentukan. Dokumen menggunakan istilah **Platform** untuk aplikasi SaaS dan **Tenant** untuk setiap bisnis laundry yang berlangganan.

---

## 1. Ringkasan Produk

Platform adalah aplikasi manajemen operasional laundry yang membantu pemilik dan pegawai mengelola pelanggan, pesanan, proses produksi, pembayaran, kas, outlet, pegawai, laporan, dan subscription dalam satu sistem.

Platform dibangun sebagai SaaS multi-tenant. Satu akun pengguna dapat menjadi anggota satu atau lebih bisnis laundry, sedangkan seluruh data operasional setiap bisnis harus terisolasi secara ketat dari tenant lain.

MVP berfokus pada alur utama berikut:

1. Pemilik mendaftarkan bisnis dan outlet.
2. Pemilik mengatur layanan dan harga.
3. Kasir membuat pelanggan dan pesanan.
4. Operator memperbarui proses pengerjaan laundry.
5. Kasir menerima pembayaran dan mencetak atau membagikan nota.
6. Pemilik memantau operasional dan laporan.
7. Pemilik mengelola subscription Platform.
8. Super admin mengelola tenant, paket, dan status subscription.

---

## 2. Latar Belakang dan Masalah

Banyak bisnis laundry masih menggunakan buku, spreadsheet, chat, atau aplikasi kasir umum. Cara tersebut menimbulkan beberapa masalah:

- Pesanan sulit dilacak berdasarkan tahap pengerjaan.
- Risiko pakaian terlambat, tertukar, atau kehilangan catatan meningkat.
- Pembayaran DP dan piutang tidak tercatat konsisten.
- Pemilik kesulitan melihat omzet, volume pesanan, dan performa outlet.
- Harga layanan sering tidak konsisten antarpegawai atau outlet.
- Nota dan riwayat pelanggan tersebar di banyak tempat.
- Pemilik bisnis multi-outlet tidak memiliki satu sumber data yang terpusat.
- Aplikasi yang terlalu kompleks sulit dipakai pegawai operasional.

Platform harus menawarkan pengalaman yang cepat untuk kasir, sederhana untuk operator, dan cukup informatif bagi pemilik usaha.

---

## 3. Visi Produk

Menjadi sistem operasional laundry yang mudah dipelajari, dapat digunakan dari perangkat apa pun, dan mampu berkembang dari satu outlet kecil menjadi bisnis laundry multi-outlet.

### Prinsip produk

1. **Cepat di kasir** — pesanan reguler dapat dibuat dalam waktu kurang dari dua menit.
2. **Status mudah dipahami** — setiap orang dapat mengetahui posisi pengerjaan pesanan.
3. **Aman antar-tenant** — data bisnis tidak boleh bocor ke tenant lain.
4. **Mobile-friendly** — tugas operasional utama tetap nyaman dilakukan dari ponsel.
5. **Tidak menghapus jejak keuangan** — koreksi menggunakan void, refund, atau adjustment.
6. **Sederhana sebelum fleksibel** — MVP menggunakan workflow standar sebelum menyediakan workflow khusus.
7. **Subscription transparan** — pengguna dapat melihat paket, batas penggunaan, tagihan, dan status subscription.

---

## 4. Tujuan MVP

### Tujuan utama

- Membuktikan bahwa seluruh operasi harian satu outlet dapat dijalankan di Platform.
- Mengurangi pencatatan manual pada penerimaan, produksi, pembayaran, dan pelaporan.
- Menyediakan fondasi multi-tenant yang aman untuk banyak bisnis laundry.
- Menguji kemauan pengusaha laundry membayar subscription bulanan.
- Mendapatkan umpan balik dari 3–10 bisnis laundry pilot.

### Indikator keberhasilan pilot

| Indikator | Target awal |
| --- | --- |
| Waktu membuat pesanan reguler | Maksimal 2 menit |
| Penyelesaian onboarding tanpa bantuan | Minimal 70% tenant pilot |
| Pesanan yang dicatat melalui Platform | Minimal 80% dari transaksi outlet pilot |
| Tenant pilot aktif setelah 14 hari | Minimal 60% |
| Insiden kebocoran data antar-tenant | 0 |
| Error kritis yang menghambat transaksi | Kurang dari 1% sesi transaksi |
| Pengguna yang memahami status pesanan tanpa pelatihan panjang | Minimal 80% pengguna pilot |

Target merupakan hipotesis awal dan dapat direvisi setelah baseline pilot tersedia.

---

## 5. Target Pengguna

### 5.1 Owner

Pemilik satu atau beberapa outlet. Membutuhkan gambaran omzet, pesanan, pegawai, kas, dan kondisi subscription.

**Kebutuhan utama:**

- Memantau bisnis tanpa harus berada di outlet.
- Mengatur layanan dan harga.
- Mengelola outlet dan pegawai.
- Melihat laporan.
- Mengelola subscription Platform.

### 5.2 Admin Laundry

Pegawai kepercayaan yang membantu owner mengelola operasional, master data, dan laporan, tetapi tidak selalu boleh mengakses billing Platform.

### 5.3 Cashier

Pegawai yang menerima pelanggan, membuat pesanan, menerima pembayaran, dan mencetak nota.

**Kebutuhan utama:**

- Proses transaksi cepat.
- Pencarian pelanggan mudah.
- Harga dihitung otomatis.
- Status pembayaran jelas.

### 5.4 Operator

Pegawai yang mengerjakan pencucian, pengeringan, dan penyetrikaan.

**Kebutuhan utama:**

- Melihat antrean berdasarkan tahap.
- Mengenali pesanan express atau terlambat.
- Memperbarui status dengan sedikit langkah.

### 5.5 Courier

Pegawai yang menangani pickup atau delivery. Role tersedia dalam model permission, tetapi modul rute dan optimasi pengiriman belum menjadi bagian MVP.

### 5.6 Super Admin

Tim pengelola Platform yang menangani tenant, paket, subscription, dan dukungan operasional.

---

## 6. Role dan Permission

| Kapabilitas | Owner | Admin | Cashier | Operator | Courier | Super Admin |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Melihat dashboard tenant | Ya | Ya | Terbatas | Terbatas | Tidak | Tidak |
| Membuat dan mengubah pesanan | Ya | Ya | Ya | Terbatas | Terbatas | Tidak |
| Mengubah status produksi | Ya | Ya | Ya | Ya | Terbatas | Tidak |
| Menerima pembayaran | Ya | Ya | Ya | Tidak | Terbatas | Tidak |
| Mengelola layanan dan harga | Ya | Ya | Tidak | Tidak | Tidak | Tidak |
| Mengelola outlet | Ya | Terbatas | Tidak | Tidak | Tidak | Tidak |
| Mengelola pegawai dan role | Ya | Terbatas | Tidak | Tidak | Tidak | Tidak |
| Melihat laporan lengkap | Ya | Ya | Terbatas | Tidak | Tidak | Tidak |
| Mengelola billing Platform | Ya | Opsional | Tidak | Tidak | Tidak | Tidak |
| Mengelola seluruh tenant | Tidak | Tidak | Tidak | Tidak | Tidak | Ya |

Permission akhir harus berbasis kapabilitas. Nama role merupakan preset permission, bukan satu-satunya mekanisme otorisasi.

---

## 7. Scope MVP

### Termasuk dalam MVP

- Landing page dan halaman pricing.
- Registrasi, login, lupa password, dan logout.
- Onboarding bisnis, outlet, dan layanan awal.
- Multi-tenant dan multi-outlet.
- Membership, role, dan permission dasar.
- Pelanggan.
- Katalog layanan dan harga per outlet.
- Pembuatan dan pengelolaan pesanan.
- Tahapan produksi.
- Pembayaran operasional manual.
- Kas masuk, kas keluar, dan tutup kas sederhana.
- Nota layar dan print thermal.
- Dashboard serta laporan dasar.
- Paket, trial, subscription, dan entitlement.
- Super admin.
- Audit log untuk tindakan penting.
- Responsive web dan kemampuan instalasi PWA dasar.

### Tidak termasuk dalam MVP

- Aplikasi native Android atau iOS.
- Payroll dan absensi pegawai.
- Akuntansi double-entry lengkap.
- Inventory bahan kimia dan suku cadang.
- Optimasi rute pickup/delivery.
- Marketplace laundry.
- Franchise hierarchy kompleks.
- Integrasi IoT mesin cuci.
- Loyalty, poin, membership pelanggan, dan referral kompleks.
- WhatsApp Business API otomatis penuh.
- Custom domain per tenant.
- Public API untuk integrator.
- Workflow produksi kustom per tenant.
- Integrasi pembayaran pelanggan secara otomatis melalui payment gateway.

---

## 8. Information Architecture

### 8.1 Halaman publik

```text
/
/features
/pricing
/contact
/login
/register
/forgot-password
/terms
/privacy
```

### 8.2 Onboarding

```text
/onboarding/business
/onboarding/outlet
/onboarding/services
/onboarding/complete
```

### 8.3 Aplikasi tenant

```text
/app/[tenantSlug]/dashboard
/app/[tenantSlug]/orders
/app/[tenantSlug]/orders/new
/app/[tenantSlug]/orders/[orderId]
/app/[tenantSlug]/orders/[orderId]/edit
/app/[tenantSlug]/orders/[orderId]/receipt
/app/[tenantSlug]/production
/app/[tenantSlug]/customers
/app/[tenantSlug]/customers/[customerId]
/app/[tenantSlug]/payments
/app/[tenantSlug]/cash-register
/app/[tenantSlug]/reports
/app/[tenantSlug]/settings/business
/app/[tenantSlug]/settings/outlets
/app/[tenantSlug]/settings/services
/app/[tenantSlug]/settings/staff
/app/[tenantSlug]/settings/roles
/app/[tenantSlug]/settings/billing
```

### 8.4 Super admin

```text
/admin
/admin/tenants
/admin/tenants/[tenantId]
/admin/plans
/admin/subscriptions
/admin/audit-logs
```

---

## 9. User Journeys Utama

### 9.1 Registrasi dan onboarding owner

1. Pengguna membuka halaman registrasi.
2. Pengguna membuat akun.
3. Pengguna mengisi nama bisnis, nomor kontak, dan zona waktu.
4. Pengguna membuat outlet pertama.
5. Pengguna memilih template layanan atau membuat layanan sendiri.
6. Platform membuat trial dan mengarahkan pengguna ke dashboard.

**Hasil yang diharapkan:** tenant siap menerima pesanan tanpa konfigurasi teknis tambahan.

### 9.2 Membuat pesanan

1. Kasir mencari pelanggan berdasarkan nama atau nomor HP.
2. Jika pelanggan belum ada, kasir membuat pelanggan dari form pesanan.
3. Kasir menambahkan satu atau lebih layanan.
4. Kasir memasukkan berat atau jumlah.
5. Kasir memilih express, diskon, estimasi selesai, dan catatan bila diperlukan.
6. Platform menghitung subtotal, diskon, surcharge, dan total.
7. Kasir mencatat DP, pembayaran penuh, atau bayar nanti.
8. Kasir mengonfirmasi pesanan.
9. Platform membuat kode pesanan dan nota.

### 9.3 Memproses pesanan

1. Operator membuka board produksi.
2. Operator melihat pesanan berdasarkan tahap.
3. Operator memilih pesanan dan memperbarui status.
4. Platform mencatat waktu, pengguna, status lama, dan status baru.
5. Pesanan yang siap diambil muncul pada antrean kasir.

### 9.4 Menyelesaikan pembayaran

1. Kasir membuka pesanan.
2. Kasir melihat total, pembayaran sebelumnya, dan sisa tagihan.
3. Kasir memilih metode pembayaran.
4. Platform mencatat pembayaran dan memperbarui status pembayaran.
5. Kasir mencetak atau membagikan nota terbaru.

### 9.5 Mengelola subscription

1. Owner membuka halaman billing.
2. Owner melihat paket, entitlement, penggunaan, dan status tagihan.
3. Owner memilih paket.
4. Platform membuat sesi pembayaran melalui provider billing.
5. Provider mengirim webhook.
6. Platform memverifikasi webhook dan memperbarui subscription secara idempotent.

---

## 10. Functional Requirements

### 10.1 Authentication dan session

| ID | Requirement |
| --- | --- |
| AUTH-01 | Pengguna dapat registrasi menggunakan email dan password. |
| AUTH-02 | Pengguna dapat login dan logout. |
| AUTH-03 | Pengguna dapat meminta reset password. |
| AUTH-04 | Session harus tetap aktif setelah refresh sesuai kebijakan session. |
| AUTH-05 | Pengguna tanpa membership aktif tidak dapat mengakses data tenant. |
| AUTH-06 | Pengguna yang tergabung di beberapa tenant dapat berpindah tenant. |

### 10.2 Onboarding

| ID | Requirement |
| --- | --- |
| ONB-01 | Owner dapat membuat tenant baru. |
| ONB-02 | Owner dapat membuat outlet pertama. |
| ONB-03 | Owner dapat memilih template layanan awal. |
| ONB-04 | Progress onboarding tersimpan. |
| ONB-05 | Tenant baru otomatis memperoleh trial sesuai konfigurasi Platform. |

### 10.3 Pelanggan

| ID | Requirement |
| --- | --- |
| CUS-01 | Pengguna berizin dapat membuat, melihat, dan mengubah pelanggan. |
| CUS-02 | Pelanggan dapat dicari berdasarkan nama dan nomor HP. |
| CUS-03 | Nomor HP dapat digunakan oleh pelanggan berbeda jika tenant mengizinkannya; Platform harus memberi peringatan duplikasi. |
| CUS-04 | Detail pelanggan menampilkan riwayat pesanan dan ringkasan transaksi. |
| CUS-05 | Pelanggan yang mempunyai transaksi tidak boleh dihapus permanen. |

### 10.4 Layanan dan harga

| ID | Requirement |
| --- | --- |
| SRV-01 | Owner/admin dapat membuat layanan kiloan atau satuan. |
| SRV-02 | Layanan mempunyai nama, unit, harga, durasi, dan status aktif. |
| SRV-03 | Layanan dapat mempunyai minimum berat atau jumlah. |
| SRV-04 | Layanan dapat mempunyai express surcharge dan durasi express. |
| SRV-05 | Harga dapat dioverride per outlet. |
| SRV-06 | Menonaktifkan layanan tidak mengubah histori pesanan lama. |

### 10.5 Pesanan

| ID | Requirement |
| --- | --- |
| ORD-01 | Pengguna berizin dapat membuat pesanan berisi satu atau lebih item. |
| ORD-02 | Item mendukung unit kilogram dan satuan. |
| ORD-03 | Platform menghitung subtotal, surcharge, diskon, total, jumlah dibayar, dan sisa tagihan. |
| ORD-04 | Pesanan mempunyai kode yang mudah dibaca dan unik dalam scope tenant/outlet yang ditentukan. |
| ORD-05 | Pesanan menyimpan harga snapshot agar perubahan katalog tidak mengubah transaksi lama. |
| ORD-06 | Pesanan dapat mempunyai estimasi selesai dan catatan. |
| ORD-07 | Perubahan penting dicatat dalam histori. |
| ORD-08 | Pesanan yang sudah selesai tidak dapat diedit bebas; koreksi memerlukan tindakan khusus dan audit. |
| ORD-09 | Pembatalan memerlukan alasan dan permission. |
| ORD-10 | Pengguna dapat mencetak ulang nota. |

### 10.6 Produksi

| ID | Requirement |
| --- | --- |
| PRD-01 | Status standar adalah RECEIVED, WASHING, DRYING, IRONING, READY, COMPLETED, dan CANCELED. |
| PRD-02 | Board produksi dapat difilter berdasarkan outlet, tanggal, status, express, dan keterlambatan. |
| PRD-03 | Setiap perubahan status mencatat aktor dan timestamp. |
| PRD-04 | Tampilan mobile tidak bergantung pada drag-and-drop. |
| PRD-05 | Pesanan express dan terlambat memiliki indikator visual yang jelas. |

### 10.7 Pembayaran operasional dan kas

| ID | Requirement |
| --- | --- |
| PAY-01 | Pesanan mendukung UNPAID, PARTIAL, PAID, dan REFUNDED. |
| PAY-02 | Metode MVP adalah tunai, transfer, QRIS manual, dan lainnya. |
| PAY-03 | Satu pesanan dapat mempunyai beberapa pembayaran. |
| PAY-04 | Pembayaran tidak boleh dihapus permanen. |
| PAY-05 | Refund dan void memerlukan alasan, permission, dan audit log. |
| PAY-06 | Pengguna dapat mencatat cash in dan cash out. |
| PAY-07 | Kasir dapat melakukan tutup kas dengan memasukkan kas fisik. |

### 10.8 Nota

| ID | Requirement |
| --- | --- |
| RCP-01 | Nota menampilkan identitas outlet, kode pesanan, pelanggan, item, total, pembayaran, sisa tagihan, dan estimasi selesai. |
| RCP-02 | Nota dapat dicetak pada printer thermal 58 mm dan 80 mm melalui browser print. |
| RCP-03 | Nota memiliki tampilan layar yang dapat dibagikan. |
| RCP-04 | Nota tidak boleh mengekspos ID internal atau informasi tenant lain. |

### 10.9 Dashboard dan laporan

| ID | Requirement |
| --- | --- |
| REP-01 | Dashboard menampilkan omzet, jumlah pesanan, pesanan aktif, siap diambil, dan piutang. |
| REP-02 | Laporan dapat difilter berdasarkan tanggal dan outlet sesuai permission. |
| REP-03 | Laporan awal mencakup omzet, jumlah pesanan, rata-rata transaksi, layanan terlaris, metode pembayaran, dan keterlambatan. |
| REP-04 | Grafik penting memiliki alternatif tabel. |
| REP-05 | Angka laporan harus dapat direkonsiliasi dengan transaksi sumber. |

### 10.10 Outlet, pegawai, dan permission

| ID | Requirement |
| --- | --- |
| ORG-01 | Tenant dapat mempunyai satu atau lebih outlet sesuai entitlement. |
| ORG-02 | Owner dapat mengundang pegawai. |
| ORG-03 | Pegawai dapat ditugaskan ke satu atau lebih outlet. |
| ORG-04 | Role menyediakan preset permission. |
| ORG-05 | Akses data selalu dibatasi tenant dan, jika relevan, outlet. |
| ORG-06 | Menonaktifkan membership mencabut akses tanpa menghapus histori tindakan pengguna. |

### 10.11 Subscription dan entitlement

| ID | Requirement |
| --- | --- |
| SUB-01 | Tenant baru dapat memperoleh trial. |
| SUB-02 | Platform mendukung status TRIALING, ACTIVE, PAST_DUE, SUSPENDED, dan CANCELED. |
| SUB-03 | Paket dikendalikan melalui entitlement, bukan pengecekan nama paket di UI. |
| SUB-04 | Entitlement awal meliputi batas outlet, pegawai, volume pesanan, laporan, dan fitur pickup/delivery. |
| SUB-05 | Owner dapat melihat penggunaan dan batas paket. |
| SUB-06 | Setelah grace period berakhir, tenant dapat dijadikan read-only tanpa menghapus data. |
| SUB-07 | Webhook billing harus diverifikasi dan diproses secara idempotent. |
| SUB-08 | Perubahan subscription mempunyai histori. |

### 10.12 Super admin

| ID | Requirement |
| --- | --- |
| ADM-01 | Super admin dapat mencari dan melihat tenant. |
| ADM-02 | Super admin dapat melihat status subscription dan penggunaan entitlement. |
| ADM-03 | Super admin dapat memberi trial extension atau kompensasi dengan alasan. |
| ADM-04 | Super admin dapat suspend dan reactivate tenant. |
| ADM-05 | Tindakan super admin harus dicatat di audit log. |
| ADM-06 | Super admin tidak boleh menyamar sebagai pengguna tenant tanpa mekanisme impersonation yang aman; impersonation tidak termasuk MVP. |

---

## 11. Aturan Bisnis

### 11.1 Tenant dan data

- Setiap record operasional wajib mempunyai `tenant_id`, kecuali tabel referensi global.
- Akses tenant harus ditentukan dari membership pengguna, bukan hanya parameter dari browser.
- Unique constraint yang berkaitan dengan bisnis harus mempertimbangkan scope tenant.
- Tenant yang disuspend tetap memiliki data, tetapi akses mutasi dapat dibatasi.

### 11.2 Pesanan

- Harga pada pesanan adalah snapshot harga ketika transaksi dibuat.
- Perubahan katalog tidak mengubah pesanan lama.
- Berat dapat menggunakan desimal; uang menggunakan integer rupiah.
- Order status dan payment status merupakan state yang berbeda.
- Pesanan selesai tidak boleh dipindahkan ke tahap sebelumnya tanpa permission dan audit.
- Pembatalan tidak sama dengan penghapusan.

### 11.3 Pembayaran

- Total pembayaran valid tidak boleh melebihi sisa tagihan, kecuali workflow kembalian didefinisikan secara eksplisit.
- Refund tidak menghapus pembayaran asal.
- Rekonsiliasi laporan menggunakan transaksi valid setelah memperhitungkan void dan refund.

### 11.4 Subscription

- Subscription Platform terpisah dari pembayaran pesanan pelanggan laundry.
- Status subscription hanya diaktifkan berdasarkan data server atau webhook terverifikasi, bukan redirect browser.
- Nama paket dapat berubah tanpa mengubah logika akses karena akses menggunakan entitlement.
- Batas dan grace period dikonfigurasi, tidak ditanam langsung pada banyak komponen.

---

## 12. Data Entities Tingkat Tinggi

| Entitas | Fungsi |
| --- | --- |
| Tenant | Bisnis laundry pelanggan Platform |
| Outlet | Cabang operasional tenant |
| Profile | Profil pengguna global |
| Membership | Hubungan pengguna, tenant, role, dan status |
| OutletAssignment | Penugasan membership ke outlet |
| Customer | Pelanggan laundry dalam scope tenant |
| Service | Katalog layanan laundry |
| OutletServicePrice | Override harga layanan per outlet |
| Order | Header transaksi pesanan |
| OrderItem | Snapshot layanan, harga, berat/jumlah, dan subtotal |
| OrderStatusHistory | Riwayat perubahan proses |
| OrderPayment | Pembayaran pelanggan terhadap pesanan |
| CashSession | Sesi buka/tutup kas |
| CashMovement | Cash in, cash out, dan adjustment |
| Plan | Definisi paket komersial |
| Entitlement | Batas atau fitur yang diberikan paket |
| Subscription | Status langganan tenant |
| SubscriptionEvent | Event internal atau webhook billing |
| AuditLog | Jejak tindakan sensitif |

Detail kolom, index, constraint, dan RLS akan dijabarkan di `DATA_MODEL.md`.

---

## 13. UX dan UI Requirements

### 13.1 Perangkat dan layout

- Kasir dan owner dioptimalkan untuk desktop/tablet.
- Operator harus nyaman menggunakan ponsel.
- Lebar minimum yang diuji adalah 360 px.
- Navigasi desktop menggunakan sidebar.
- Navigasi mobile menggunakan pola yang tidak menutupi tindakan utama.

### 13.2 State wajib

Setiap halaman data harus memiliki:

- Loading state.
- Empty state.
- Error state.
- Permission-denied state bila relevan.
- Success feedback setelah mutasi.
- Confirmation dialog untuk tindakan berisiko.

### 13.3 Bahasa dan format

- Bahasa utama adalah Bahasa Indonesia.
- Mata uang ditampilkan sebagai rupiah.
- Tanggal dan waktu mengikuti timezone tenant.
- Istilah operasional harus mudah dipahami pegawai laundry.
- Pesan error harus menjelaskan tindakan berikutnya, bukan hanya kode teknis.

### 13.4 Aksesibilitas dasar

- Seluruh input memiliki label.
- Fokus keyboard terlihat jelas.
- Kontras warna memadai.
- Status tidak disampaikan melalui warna saja.
- Dialog dapat ditutup dan dinavigasi menggunakan keyboard.
- Grafik penting mempunyai versi tabel atau ringkasan teks.

---

## 14. Wireframe Priority

Wireframe dibuat low-fidelity berdasarkan urutan berikut:

### Prioritas 1 — Core transaction

1. App shell desktop dan mobile.
2. Login dan registrasi.
3. Onboarding bisnis, outlet, dan layanan.
4. Dashboard owner.
5. Form pesanan baru.
6. Daftar pesanan.
7. Detail pesanan.
8. Nota.
9. Board produksi.

### Prioritas 2 — Operational support

10. Daftar dan detail pelanggan.
11. Layanan dan harga.
12. Outlet dan pegawai.
13. Pembayaran dan kas.
14. Laporan.

### Prioritas 3 — SaaS management

15. Billing tenant.
16. Paket dan penggunaan entitlement.
17. Dashboard super admin.
18. Detail tenant untuk super admin.
19. Daftar subscription.
20. Landing page dan pricing.

Wireframe harus memvalidasi hierarki informasi, urutan tindakan, dan perpindahan halaman. Warna serta detail visual final belum menjadi fokus tahap ini.

---

## 15. Frontend-First Delivery Strategy

Frontend dibangun dengan mock adapter agar tidak dibuang ketika backend tersedia.

```text
UI Component
    ↓
Feature Service / Repository Interface
    ↓
Mock Adapter pada fase frontend
    ↓
Supabase Adapter pada fase integrasi backend
```

### Fixture persona

- Owner satu outlet.
- Owner multi-outlet.
- Cashier.
- Operator.
- Tenant trial.
- Tenant aktif.
- Tenant mendekati limit.
- Tenant past due dan read-only.
- Super admin.

### Fixture data

Data mock harus realistis untuk konteks Indonesia dan mencakup:

- Pelanggan dengan dan tanpa riwayat.
- Pesanan reguler, express, terlambat, selesai, dan dibatalkan.
- Pembayaran unpaid, partial, paid, dan refunded.
- Layanan kiloan dan satuan.
- Satu tenant satu outlet dan tenant multi-outlet.
- Loading, empty, error, dan permission-denied state.

### Urutan milestone frontend

| Milestone | Output |
| --- | --- |
| F01 | Design system dan component library |
| F02 | App shell, authentication mock, dan onboarding |
| F03 | Dashboard berdasarkan role |
| F04 | Pesanan/POS dan nota |
| F05 | Board produksi dan histori status |
| F06 | Pelanggan, layanan, outlet, dan pegawai |
| F07 | Pembayaran, kas, dan tutup kas |
| F08 | Dashboard laporan |
| F09 | Subscription tenant dan super admin |
| F10 | Landing page dan pricing |
| F11 | Responsive, accessibility, visual QA, dan E2E hardening |

### Gate frontend

1. **Visual gate:** design system disetujui setelah app shell, form, dan tabel contoh.
2. **Transaction gate:** alur pesanan dari pelanggan sampai nota berjalan dengan mock data.
3. **Frontend freeze gate:** seluruh halaman utama, responsive state, dan E2E frontend disetujui sebelum integrasi backend.

---

## 16. Non-Functional Requirements

### 16.1 Security

- Row Level Security wajib pada seluruh tabel tenant.
- Service-role credential tidak boleh tersedia di browser.
- Server harus memverifikasi membership dan permission pada setiap mutasi.
- Webhook harus diverifikasi, idempotent, dan diaudit.
- Sensitive action memerlukan alasan atau konfirmasi bila relevan.
- Tenant-isolation test harus menjadi required check.

### 16.2 Performance

- Halaman operasional utama harus terasa responsif pada koneksi seluler normal.
- Interaksi lokal seperti membuka dialog tidak boleh menunggu jaringan.
- Tabel menggunakan pagination atau pembatasan data.
- Query laporan tidak boleh memblokir transaksi operasional.
- Target awal p95 untuk request operasional utama adalah di bawah 1,5 detik, tidak termasuk latency pihak ketiga.

### 16.3 Reliability

- Migration dapat dijalankan dari database kosong.
- Webhook aman terhadap retry dan event duplikat.
- Operasi pembayaran menggunakan transaksi database ketika diperlukan.
- Backup dan prosedur restore harus didokumentasikan sebelum produksi.
- Kegagalan notification tidak boleh membatalkan transaksi utama.

### 16.4 Observability

- Error aplikasi tercatat tanpa mengekspos secret atau data sensitif.
- Request penting mempunyai correlation identifier.
- Webhook failure dapat dilihat dan diproses ulang secara aman.
- Audit log tersedia untuk perubahan pesanan sensitif, pembayaran, permission, dan subscription.

### 16.5 Compatibility

- Dua versi terbaru Chrome, Edge, Firefox, dan Safari menjadi target awal.
- Print nota diuji pada Chrome/Edge desktop.
- PWA merupakan enhancement; fungsi inti tetap dapat diakses sebagai web biasa.

---

## 17. Analytics Events

Event produk minimum:

| Event | Tujuan |
| --- | --- |
| `sign_up_completed` | Mengukur registrasi berhasil |
| `onboarding_completed` | Mengukur aktivasi tenant |
| `first_order_created` | Menentukan time-to-value |
| `order_created` | Mengukur volume penggunaan |
| `order_status_changed` | Mengukur penggunaan workflow produksi |
| `payment_recorded` | Mengukur penggunaan pembayaran |
| `receipt_printed` | Mengukur kebutuhan printer |
| `report_viewed` | Mengukur nilai laporan |
| `plan_selected` | Mengukur minat paket |
| `checkout_started` | Mengukur conversion funnel |
| `subscription_activated` | Mengukur tenant berbayar |
| `limit_reached` | Mengidentifikasi kebutuhan upgrade |

Analytics tidak boleh mengirim data pelanggan laundry yang tidak diperlukan.

---

## 18. Integrasi Eksternal

### MVP

- Supabase/PostgreSQL untuk database, auth, storage, dan RLS.
- Provider billing untuk subscription Platform.
- Email transaksional untuk autentikasi dan undangan.
- Hosting frontend/fullstack.
- Error monitoring setelah fondasi stabil.

### Pasca-MVP

- WhatsApp Business API.
- Payment gateway untuk pembayaran pelanggan laundry.
- Accounting export.
- Barcode atau QR scanner workflow.
- Public API.

Integrasi eksternal harus dibungkus adapter agar provider dapat diganti tanpa mengubah domain utama.

---

## 19. Acceptance Criteria MVP

MVP dianggap siap pilot apabila:

1. Owner dapat registrasi dan menyelesaikan onboarding.
2. Owner dapat membuat outlet, layanan, dan pegawai.
3. Kasir dapat membuat pelanggan dan pesanan sampai nota.
4. Operator dapat memperbarui seluruh tahap produksi.
5. Kasir dapat mencatat DP, pelunasan, dan tutup kas.
6. Owner dapat melihat dashboard dan laporan dasar.
7. Owner dapat melihat paket, penggunaan, tagihan, dan status subscription.
8. Super admin dapat mengelola tenant dan subscription.
9. Tenant A tidak dapat membaca atau mengubah data Tenant B melalui UI maupun request langsung.
10. Seluruh payment dan subscription webhook test bersifat idempotent.
11. Aplikasi berfungsi pada desktop dan layar ponsel 360 px.
12. Nota dapat dicetak dengan layout thermal yang dapat dibaca.
13. Lint, typecheck, unit test, database test, E2E test, dan production build lulus.
14. Backup, restore, error monitoring, dan prosedur insiden dasar terdokumentasi.

---

## 20. Release Plan

### Tahap 1 — Internal prototype

- Frontend menggunakan mock data.
- Validasi desain dan alur transaksi.
- Tidak menyimpan transaksi riil.

### Tahap 2 — Alpha

- Backend, auth, tenancy, dan RLS aktif.
- Digunakan dengan data pengujian internal.
- Billing menggunakan test environment.

### Tahap 3 — Closed pilot

- 3–10 bisnis laundry.
- Support langsung dan pengumpulan feedback mingguan.
- Perubahan scope hanya untuk blocker, keamanan, atau kebutuhan operasional berulang.

### Tahap 4 — Paid beta

- Subscription production aktif.
- Onboarding mandiri.
- Monitoring dan proses support dasar aktif.

---

## 21. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Frontend mock tidak sesuai backend | Rework integrasi | Gunakan shared schema dan repository interface sejak awal |
| Kebocoran data antar-tenant | Kritis | RLS, server authorization, dan tenant-isolation tests |
| Scope terlalu besar | MVP terlambat | Gunakan requirement ID dan daftar non-goal |
| UI terlalu kompleks untuk pegawai | Adopsi rendah | Uji flow dengan kasir/operator nyata dan minimalkan langkah |
| Perhitungan pembayaran salah | Kerugian dan laporan salah | Money integer, transaction test, dan reconciliation test |
| Webhook subscription ganda/terlambat | Status paket salah | Signature verification, idempotency key, dan event log |
| Koneksi outlet tidak stabil | Transaksi terganggu | Loading/error UX yang jelas; evaluasi offline queue pasca-pilot |
| Harga paket tidak cocok | Conversion rendah | Wawancara dan pilot sebelum mengunci harga |
| Terlalu banyak permission khusus | Kompleksitas tinggi | Mulai dengan preset role dan capability terbatas |

---

## 22. Keputusan yang Masih Terbuka

Keputusan berikut perlu divalidasi sebelum atau selama wireframing:

1. Nama dan identitas visual produk.
2. Fokus awal laundry kiloan saja atau langsung mendukung satuan/dry cleaning.
3. Apakah satu pelanggan dapat digunakan lintas outlet dalam tenant yang sama.
4. Format kode pesanan dan nomor nota.
5. Apakah harga layanan default tenant diwariskan ke outlet.
6. Siapa yang boleh memberi diskon dan berapa batasnya.
7. Apakah status WASHING, DRYING, dan IRONING wajib atau dapat dilewati.
8. Kebijakan edit pesanan setelah produksi dimulai.
9. Metode tutup kas yang digunakan outlet pilot.
10. Struktur paket, harga, trial, dan grace period.
11. Provider email dan provider billing production.
12. Kebijakan retensi data tenant setelah subscription dibatalkan.

Jika keputusan belum tersedia saat frontend dikerjakan, gunakan asumsi paling sederhana, tandai sebagai `TBD`, dan jangan menanam keputusan tersebut di banyak komponen.

---

## 23. Definition of Done per Milestone

Setiap milestone dianggap selesai apabila:

- Semua acceptance criteria milestone terpenuhi.
- Tidak ada perubahan di luar scope tanpa dokumentasi.
- Loading, empty, error, dan permission state tersedia bila relevan.
- UI responsif pada viewport yang ditentukan.
- Tidak ada TypeScript error.
- Lint dan formatting lulus.
- Unit test yang relevan ditambahkan dan lulus.
- E2E happy path dan critical edge case lulus.
- Production build lulus.
- Diff telah direview untuk regresi, tenant isolation, dan security issue.
- Dokumentasi terkait diperbarui.

---

## 24. Urutan Dokumen dan Gate

Artefak produk dan frontend dibuat serta disetujui secara berurutan:

1. `PRD.md`
2. `USER_FLOWS.md`
3. `SCREEN_MAP.md`
4. `WIREFRAMES.md` atau file desain wireframe
5. `DESIGN_SYSTEM.md`
6. Frontend melalui file milestone `F01` sampai `F11`

`AGENTS.md` adalah aturan kerja repository dan dibuat pada tahap fondasi dokumentasi. Dokumen pendukung `DATA_CONTRACTS.md`, `DATA_MODEL.md`, `SECURITY.md`, dan `TESTING.md` disiapkan sebelum implementasi backend atau integrasi terkait. Dokumen pendukung tersebut tidak mengizinkan tahap wireframe dilewati.

Kode aplikasi tidak boleh ditulis sebelum wireframe disetujui. PRD ini menjadi sumber keputusan produk. Dokumen arsitektur dan implementasi tidak boleh diam-diam mengubah requirement produk tanpa memperbarui PRD atau mencatat keputusan melalui ADR.
