# Product Requirements Document — LaundryKita MVP

| Atribut | Nilai |
| --- | --- |
| Status | `APPROVED` |
| Versi | 1.0 |
| Tanggal baseline | 7 Agustus 2026 |
| Target pasar | Laundry kecil dan menengah di Indonesia |
| Platform | Responsive web application / PWA dasar |
| Model bisnis | SaaS multi-tenant berbasis subscription |
| Strategi | Frontend-first, kemudian backend dan integrasi per vertical slice |

## 1. Ringkasan produk

LaundryKita adalah SaaS operasional laundry yang menyatukan pelanggan, pesanan, produksi, pembayaran manual, kas, outlet, pegawai, laporan, dan subscription. Satu akun dapat menjadi anggota beberapa tenant, tetapi seluruh data operasional wajib terisolasi berdasarkan membership, capability, dan assignment outlet.

MVP mengutamakan transaksi kasir maksimal dua menit, workflow produksi yang mudah dipahami operator, laporan yang dapat direkonsiliasi owner, serta administrasi subscription yang aman.

Sumber aturan turunan:

- aturan bisnis dan state: [`DOMAIN_RULES.md`](DOMAIN_RULES.md);
- akses dan capability: [`ROLE_PERMISSION_MATRIX.md`](ROLE_PERMISSION_MATRIX.md);
- urutan interaksi: [`USER_FLOWS.md`](USER_FLOWS.md);
- route dan screen state: [`SCREEN_MAP.md`](SCREEN_MAP.md);
- histori keputusan: [`OPEN_DECISIONS.md`](OPEN_DECISIONS.md).

## 2. Masalah yang diselesaikan

- Pesanan dan tahap produksi sulit dilacak dari catatan manual.
- DP, pelunasan, piutang, refund, dan kas sering tidak konsisten.
- Harga serta nota berbeda antarpegawai atau outlet.
- Owner sulit memantau transaksi dan performa multi-outlet.
- Aplikasi generik terlalu kompleks bagi kasir dan operator laundry.

## 3. Tujuan dan success metrics

### Tujuan MVP

1. Menjalankan seluruh operasi harian outlet pilot tanpa pencatatan utama di luar Platform.
2. Menyediakan fondasi multi-tenant yang aman dan dapat tumbuh ke multi-outlet.
3. Membuktikan kecepatan transaksi, keterpahaman status, dan kemauan membayar subscription.
4. Mengumpulkan baseline dari 3–10 bisnis pilot sebelum mengubah harga atau limit.

### Success metrics pilot

| Metrik | Target |
| --- | --- |
| Waktu membuat pesanan reguler | Maksimal 2 menit |
| Onboarding selesai tanpa bantuan | Minimal 70% tenant pilot |
| Transaksi outlet yang dicatat di LaundryKita | Minimal 80% |
| Tenant aktif setelah 14 hari | Minimal 60% |
| Pengguna memahami status tanpa pelatihan panjang | Minimal 80% |
| Insiden kebocoran data antar-tenant | 0 |
| Sesi transaksi terhambat error kritis | Di bawah 1% |

## 4. Persona dan role final

| Role | Tanggung jawab utama |
| --- | --- |
| Owner | Mengelola bisnis, outlet, layanan, pegawai, laporan, kas, dan subscription. |
| Admin | Mengelola operasional dan master data sesuai capability; billing dan organisasi tidak aktif secara default. |
| Cashier | Membuat pelanggan/pesanan, menerima pembayaran, mencetak nota, dan mengelola sesi kas outlet tugas. |
| Operator | Melihat antrean produksi dan memperbarui status pada outlet tugas. |
| Super Admin Platform | Mengelola metadata tenant, plan, subscription, dan tindakan dukungan tanpa impersonation atau data operasional pelanggan. |

Role Courier dan workflow pickup/delivery khusus tidak termasuk MVP.

## 5. Scope MVP

### Termasuk

- landing page, pricing, kontak, syarat, dan privasi;
- registrasi Owner, verifikasi email, login, logout, reset password, invitation pegawai, dan tenant selector;
- onboarding bisnis, outlet pertama, serta layanan template/custom;
- SaaS multi-tenant, multi-outlet, membership, preset role, dan capability terbatas;
- pelanggan tenant-wide dengan visibilitas histori berbasis outlet;
- layanan kiloan/satuan, harga default tenant, dan override outlet;
- pesanan, kalkulasi, diskon, express, ETA, produksi, handoff, dan histori;
- pembayaran pelanggan manual: tunai, transfer, QRIS manual, dan metode lain berlabel;
- DP, pelunasan, void, reversal, refund penuh per payment, cash in/out, adjustment, dan tutup kas;
- nota layar, browser print 58/80 mm, Web Share, dan download;
- dashboard dan laporan dasar yang dapat direkonsiliasi;
- tiga paket pilot, trial, grace, entitlement, checkout subscription, dan read-only;
- Super Admin, plan versioning, subscription history, dan audit log;
- responsive web hingga 360 px dan PWA installable dengan cache app shell statis.

### Tidak termasuk

- Courier, pickup/delivery khusus, dan optimasi rute;
- dry-cleaning workflow khusus atau workflow produksi kustom;
- payment gateway pelanggan laundry dan webhook pembayaran pelanggan;
- public receipt link, WhatsApp automation, notification center, atau kampanye pelanggan;
- offline mutation queue, aplikasi native, atau integrasi printer native;
- inventory, payroll, absensi, loyalty, referral, franchise hierarchy, akuntansi lengkap, pajak/invoice/proration engine;
- public API, custom domain, advanced BI/export, IoT, marketplace, atau Super Admin impersonation;
- full custom-role builder dan halaman audit tenant terpisah.

## 6. Model multi-tenancy dan outlet

- Setiap record operasional memiliki `tenant_id`; record berbasis outlet juga memiliki `outlet_id`.
- Akses diturunkan dari session, membership aktif, capability, dan outlet assignment—bukan parameter browser.
- Satu outlet aktif menjadi konteks semua mutasi operasional.
- Agregasi lintas outlet hanya tersedia pada dashboard/laporan untuk capability yang mengizinkan.
- Customer tenant-wide, tetapi histori order hanya terlihat jika pengguna dapat mengakses outlet order.
- Tenant read-only mempertahankan data dan akses baca yang diizinkan, sambil menolak mutasi baru kecuali billing dan penutupan sesi kas yang sudah aktif.

## 7. Functional requirements

### 7.1 Authentication dan session

| ID | Requirement final |
| --- | --- |
| AUTH-01 | Pengunjung dapat registrasi sebagai Owner menggunakan email dan password serta wajib memverifikasi email. |
| AUTH-02 | Pengguna dapat login dan logout; pegawai memperoleh akses hanya melalui invitation. |
| AUTH-03 | Pengguna dapat meminta dan menyelesaikan reset password tanpa membocorkan keberadaan akun. |
| AUTH-04 | Session bertahan setelah refresh dan berakhir setelah 30 hari tidak aktif atau logout. |
| AUTH-05 | Pengguna tanpa membership aktif tidak dapat membaca data tenant. |
| AUTH-06 | Pengguna satu tenant langsung masuk; pengguna multi-tenant memilih dan dapat berpindah tenant aktif. |

### 7.2 Onboarding

| ID | Requirement final |
| --- | --- |
| ONB-01 | Owner dapat membuat tenant dengan nama bisnis, kontak, timezone, dan slug unik otomatis. |
| ONB-02 | Owner wajib membuat outlet pertama; hanya nama outlet yang wajib. |
| ONB-03 | Owner dapat memilih template atau membuat satu layanan awal custom. |
| ONB-04 | Progress onboarding tersimpan dan retry tidak menggandakan resource. |
| ONB-05 | Trial dimulai ketika onboarding selesai dan minimal satu layanan aktif tersedia. |

### 7.3 Pelanggan

| ID | Requirement final |
| --- | --- |
| CUS-01 | Pengguna ber-capability dapat membuat, melihat, mengubah, dan mengarsipkan pelanggan. |
| CUS-02 | Pelanggan dapat dicari berdasarkan nama atau nomor HP Indonesia yang dinormalisasi. |
| CUS-03 | Nomor HP opsional; duplikasi dalam tenant menampilkan warning dan tidak memblokir penyimpanan. |
| CUS-04 | Detail pelanggan menampilkan riwayat dan ringkasan hanya dari outlet yang dapat diakses. |
| CUS-05 | Pelanggan tidak dapat dihapus permanen. |

### 7.4 Layanan dan harga

| ID | Requirement final |
| --- | --- |
| SRV-01 | Owner/Admin dapat membuat layanan kiloan atau satuan generik. |
| SRV-02 | Layanan memiliki nama, unit, harga default, durasi, status, dan konfigurasi express opsional. |
| SRV-03 | Layanan dapat memiliki minimum berat atau jumlah sebagai minimum charge. |
| SRV-04 | Layanan dapat memiliki express eligibility, surcharge persen, dan durasi express. |
| SRV-05 | Harga default tenant diwariskan dan dapat dioverride per outlet. |
| SRV-06 | Layanan dinonaktifkan atau harga diubah tanpa mengubah snapshot order lama. |

### 7.5 Pesanan

| ID | Requirement final |
| --- | --- |
| ORD-01 | Pengguna ber-capability dapat membuat order berisi satu atau lebih item pada outlet aktif. |
| ORD-02 | Item mendukung kilogram dua desimal atau satuan integer. |
| ORD-03 | Platform menghitung subtotal, surcharge, diskon, total, paid, dan balance dalam integer rupiah. |
| ORD-04 | Kode order/nota mengikuti `[OUTLET]-[YYMMDD]-[####]` dan unik per outlet per tanggal lokal. |
| ORD-05 | Item menyimpan snapshot nama layanan, unit, harga, kuantitas, dan komponen kalkulasi. |
| ORD-06 | Order memiliki ETA, catatan, flag express, dan indikator terlambat setelah ETA lewat. |
| ORD-07 | Perubahan penting menyimpan aktor, timestamp, alasan bila wajib, dan state lama/baru. |
| ORD-08 | Edit dan koreksi mengikuti state order/payment; order final tidak dapat diedit bebas. |
| ORD-09 | Cancel hanya sebelum state final, memerlukan capability/alasan, dan menyelesaikan payment terkait. |
| ORD-10 | Pengguna berizin dapat mencetak ulang atau membagikan nota terbaru. |

### 7.6 Produksi

| ID | Requirement final |
| --- | --- |
| PRD-01 | Status order adalah RECEIVED, WASHING, DRYING, IRONING, READY, COMPLETED, dan CANCELED. |
| PRD-02 | Board dapat difilter berdasarkan outlet, tanggal, status, express, dan keterlambatan. |
| PRD-03 | Setiap transisi menyimpan aktor, timestamp, status lama, status baru, dan alasan untuk skip/rollback. |
| PRD-04 | Mobile menggunakan tombol/list action dan tidak bergantung pada drag-and-drop. |
| PRD-05 | Express dan terlambat disampaikan melalui teks/ikon selain warna. |

### 7.7 Pembayaran dan kas

| ID | Requirement final |
| --- | --- |
| PAY-01 | Payment state adalah UNPAID, PARTIAL, PAID, dan REFUNDED, terpisah dari order state. |
| PAY-02 | Metode customer payment adalah CASH, TRANSFER, QRIS_MANUAL, dan OTHER. |
| PAY-03 | Satu order dapat memiliki beberapa payment; total net valid tidak boleh melebihi total order. |
| PAY-04 | Payment dan CashMovement tidak dapat dihapus permanen. |
| PAY-05 | Void, reversal, refund, dan adjustment memerlukan capability, alasan, audit, serta reference record asal. |
| PAY-06 | Pengguna ber-capability dapat mencatat cash in dan cash out pada sesi aktif. |
| PAY-07 | Kasir membuka dan menutup sesi per kasir/outlet/shift dengan saldo awal dan kas fisik. |

### 7.8 Nota

| ID | Requirement final |
| --- | --- |
| RCP-01 | Nota menampilkan outlet, kode, pelanggan, item, total, payment, balance, ETA, dan status. |
| RCP-02 | Nota dapat dicetak melalui browser pada format thermal 58 mm dan 80 mm. |
| RCP-03 | Nota dapat dibagikan melalui Web Share atau download dari session berizin. |
| RCP-04 | Nota tidak mengekspos ID internal atau data tenant lain; public receipt link tidak tersedia. |

### 7.9 Dashboard dan laporan

| ID | Requirement final |
| --- | --- |
| REP-01 | Dashboard menampilkan Nilai Pesanan, Pembayaran Diterima, Piutang, jumlah order, order aktif, dan siap diambil. |
| REP-02 | Laporan dapat difilter berdasarkan tanggal dan outlet sesuai capability. |
| REP-03 | Laporan mencakup metrik finansial, jumlah/rata-rata order, layanan terlaris, metode payment, dan keterlambatan. |
| REP-04 | Grafik penting mempunyai tabel atau ringkasan teks ekuivalen. |
| REP-05 | Setiap angka dapat ditelusuri ke order/payment valid setelah void, reversal, refund, dan cancel. |

### 7.10 Outlet, pegawai, dan permission

| ID | Requirement final |
| --- | --- |
| ORG-01 | Tenant dapat memiliki outlet sesuai entitlement dan status ACTIVE/INACTIVE. |
| ORG-02 | Owner dapat mengundang pegawai melalui email dengan lifecycle invitation. |
| ORG-03 | Membership dapat ditugaskan ke satu atau lebih outlet. |
| ORG-04 | Role menyediakan preset capability dan toggle sensitif terbatas. |
| ORG-05 | Seluruh akses dibatasi tenant dan, untuk operasi, outlet assignment. |
| ORG-06 | Membership dapat dinonaktifkan tanpa menghapus histori; Owner terakhir tidak dapat dinonaktifkan. |

### 7.11 Subscription dan entitlement

| ID | Requirement final |
| --- | --- |
| SUB-01 | Tenant memperoleh trial 14 hari sejak onboarding selesai. |
| SUB-02 | Status subscription adalah TRIALING, ACTIVE, PAST_DUE, SUSPENDED, dan CANCELED. |
| SUB-03 | Akses fitur dan limit memakai entitlement versioned, bukan nama paket di UI. |
| SUB-04 | Entitlement pilot mencakup outlet, pegawai, volume order, dan level laporan; tidak mencakup pickup/delivery. |
| SUB-05 | Owner dapat melihat paket, penggunaan, limit, status, periode, dan histori tagihan. |
| SUB-06 | PAST_DUE memiliki grace 7 hari; setelah itu SUSPENDED/CANCELED read-only tanpa penghapusan data. |
| SUB-07 | Checkout dan webhook billing diverifikasi server-side, idempotent, dan tidak percaya redirect browser. |
| SUB-08 | Plan version, entitlement, invoice minimum, dan setiap perubahan subscription mempunyai histori. |

### 7.12 Super Admin Platform

| ID | Requirement final |
| --- | --- |
| ADM-01 | Super Admin dapat mencari tenant dan melihat metadata bisnis. |
| ADM-02 | Super Admin dapat melihat subscription dan entitlement usage tanpa customer/order. |
| ADM-03 | Super Admin dapat memberi tambahan hari trial/subscription dengan alasan. |
| ADM-04 | Super Admin dapat suspend/reactivate; manual suspend bertahan sampai reactivation eksplisit. |
| ADM-05 | Semua tindakan Super Admin dicatat dengan aktor, target, alasan, timestamp, dan state change. |
| ADM-06 | Super Admin tidak dapat impersonation atau membaca data operasional tenant. |

## 8. Subscription dan asumsi pilot terkonfigurasi

Seluruh nilai berikut disimpan pada plan version dan dapat diubah tanpa perubahan arsitektur:

| Paket | Harga/bulan | Outlet | Pegawai | Order/bulan | Laporan |
| --- | ---: | ---: | ---: | ---: | --- |
| Starter | Rp149.000 | 1 | 5 | 500 | Dasar |
| Growth | Rp299.000 | 1 | 15 | 2.000 | Lengkap |
| Multi-Outlet | Rp599.000 | 5 | 50 | 10.000 | Lengkap lintas outlet |

- Trial: 14 hari; grace: 7 hari.
- Warning penggunaan muncul pada 80% dan 100%.
- Pada limit, pembuatan resource baru terkait diblokir; order/payment/status yang sudah ada, handoff, billing, dan penutupan sesi kas tetap dapat diselesaikan.
- Upgrade aktif setelah webhook payment subscription terverifikasi; downgrade/cancel efektif akhir periode dan tanpa proration.
- Downgrade diblokir sampai penggunaan berada di bawah limit paket tujuan.

## 9. Analytics

Event minimum: `sign_up_completed`, `onboarding_completed`, `first_order_created`, `order_created`, `order_status_changed`, `payment_recorded`, `receipt_printed`, `report_viewed`, `plan_selected`, `checkout_started`, `subscription_activated`, dan `limit_reached`.

Default pilot menggunakan adapter PostHog, pengiriman server-side untuk event sensitif, ID pseudonim, tanpa data customer laundry, dan retensi 12 bulan.

## 10. Non-functional requirements

### Security

- RLS wajib pada seluruh tabel tenant; service-role credential tidak pernah berada di browser.
- Server memverifikasi membership, capability, outlet, subscription, dan invariant domain pada setiap mutasi.
- Webhook memakai signature verification, idempotency key, event log, dan replay aman.
- Tenant-isolation test menjadi required check.
- Sensitive action memakai confirmation, alasan, dan audit sesuai Domain Rules.

### Performance dan compatibility

- Target p95 request operasional utama di bawah 1,5 detik di luar latency pihak ketiga.
- Tabel memakai pagination; laporan tidak memblokir transaksi.
- Target dua versi terbaru Chrome, Edge, Firefox, Safari; minimum viewport 360 px.
- Print thermal diuji pada Chrome/Edge desktop.

### Reliability dan operasi

- Transaksi finansial menggunakan database transaction ketika mengubah lebih dari satu ledger/state.
- Backup harian retensi 30 hari; target pilot RPO 24 jam dan RTO 8 jam.
- Restore drill bulanan, error monitoring terpusat, correlation ID, dan webhook replay wajib sebelum pilot berdata nyata.
- PWA hanya cache app shell statis; semua mutasi memerlukan koneksi.

### Aksesibilitas dan lokalisasi

- Bahasa UI Indonesia, rupiah integer, nomor HP format Indonesia, dan waktu sesuai timezone tenant.
- Input berlabel, fokus keyboard terlihat, kontras memadai, dialog keyboard-accessible.
- Status tidak disampaikan melalui warna saja dan grafik mempunyai alternatif teks/tabel.

## 11. Integrasi dan retensi data

- Database/auth/storage/RLS: Supabase/PostgreSQL.
- Email pilot: Supabase Auth dengan Resend SMTP melalui adapter.
- Billing subscription pilot: Xendit melalui adapter; payment gateway customer laundry tidak digunakan.
- Analytics pilot: PostHog melalui adapter.
- Tenant CANCELED read-only selama 180 hari, kemudian data operasional dianonimkan/dihapus; record finansial/audit minimum dipertahankan lima tahun. Permintaan export selama retensi ditangani support terkontrol tanpa fitur UI baru. Kebijakan ini wajib melewati pemeriksaan legal sebelum production.

## 12. Acceptance criteria MVP

MVP siap closed pilot jika:

1. Owner dapat registrasi, verifikasi email, onboarding, dan menerima order pertama.
2. Owner dapat mengelola outlet, layanan, pegawai, capability terbatas, dan billing.
3. Cashier dapat menyelesaikan customer → order → payment/bayar nanti → nota dalam target dua menit.
4. Operator dapat memproses seluruh status melalui mobile tanpa drag-and-drop.
5. Handoff, cancel, edit, void, reversal, refund, dan tutup kas mematuhi Domain Rules serta audit.
6. Dashboard/laporan dapat direkonsiliasi ke transaksi sumber.
7. Subscription, entitlement, limit, grace, read-only, dan recovery billing berfungsi dari server/webhook terverifikasi.
8. Super Admin dapat menjalankan fungsi dukungan tanpa impersonation atau data operasional customer.
9. Tenant A tidak dapat membaca/mengubah data Tenant B melalui UI maupun request langsung.
10. Seluruh route memiliki loading, empty, error, permission-denied, read-only, dan mobile behavior yang relevan.
11. Nota 58/80 mm dapat dibaca dan PWA dapat diinstal tanpa menjanjikan offline transaction.
12. Lint, typecheck, unit, integration/database, tenant-isolation, E2E, accessibility smoke, dan production build lulus.
13. Backup/restore, monitoring, incident runbook, dan webhook replay telah diuji.

## 13. Risiko tersisa dan mitigasi

| Risiko | Dampak | Mitigasi yang telah ditetapkan |
| --- | --- | --- |
| Harga/limit pilot tidak sesuai willingness-to-pay | Conversion rendah | Nilai berada pada plan version; ukur 3–10 tenant sebelum perubahan. |
| Nama LaundryKita berbenturan secara merek/domain | Rework identitas | Lakukan pemeriksaan merek/domain sebelum publik; domain model tidak bergantung brand. |
| Provider email/billing berubah atau gagal onboarding | Integrasi tertunda | Adapter provider, sandbox test, dan fallback operasional terdokumentasi. |
| Retensi lima tahun tidak sesuai kewajiban hukum final | Risiko compliance | Legal review menjadi production gate; durasi disimpan versioned. |
| Koneksi outlet tidak stabil | Transaksi terganggu | Error/retry dan draft lokal non-final; offline mutation queue tetap dilarang. |
| Mock frontend menyimpang dari backend | Rework | Shared contract, fixture invariant, dan contract test per vertical slice. |
| Kebocoran lintas tenant | Kritis | RLS, server authorization, dan tenant-isolation required check. |
| Kesalahan kalkulasi finansial | Kerugian dan laporan salah | Integer rupiah, decimal arithmetic, ledger immutable, transaction test, reconciliation test. |

## 14. Urutan dokumen dan gate

`PRD Final -> Product Baseline -> Domain Rules -> Permissions -> User Flows -> Screen Map -> Wireframes -> Design System -> Frontend`

Documentation gate lulus hanya ketika semua keputusan final, link valid, traceability lengkap, istilah konsisten, dan audit scope selesai. Wireframe tidak boleh mendefinisikan ulang requirement, formula, state, atau permission.
