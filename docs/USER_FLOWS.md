# User Flows — LaundryKita MVP

| Atribut | Nilai |
| --- | --- |
| Status | `APPROVED` |
| Versi | 1.0 |
| Aturan bisnis | [`DOMAIN_RULES.md`](DOMAIN_RULES.md) |
| Permission | [`ROLE_PERMISSION_MATRIX.md`](ROLE_PERMISSION_MATRIX.md) |
| Layar | [`SCREEN_MAP.md`](SCREEN_MAP.md) |

Setiap mutasi di bawah tetap memvalidasi tenant, outlet, capability, subscription, dan invariant server-side.

## UF-01 — Registrasi, login, dan pemilihan tenant

### Aktor
Calon Owner; pegawai yang menerima invitation; pengguna terdaftar.

### Tujuan
Membuat atau mengakses akun dan masuk ke tenant yang sah.

### Precondition
Pengguna belum login, atau mempunyai akun/session yang dapat divalidasi.

### Main flow
1. Calon Owner registrasi dengan email dan password minimal delapan karakter.
2. Platform mengirim verifikasi email 24 jam; setelah verifikasi, Owner menuju onboarding.
3. Pegawai membuka invitation 72 jam, login/registrasi dengan email tujuan, lalu menerima membership.
4. Pengguna login; Platform membuat session dan memuat membership aktif.
5. Tepat satu membership langsung membuka dashboard; lebih dari satu membuka tenant selector.
6. Pemilihan/pindah tenant mengganti seluruh konteks data dan outlet aktif.

### Alternate flow
- Lupa password: tautan reset berlaku 60 menit lalu kembali ke login.
- Akun Owner tanpa membership melanjutkan onboarding.
- Akun invitation tanpa membership aktif melihat state tanpa akses dan dapat logout.

### Error dan edge case
- Pesan reset/login tidak membocorkan keberadaan akun.
- Token expired/revoked menampilkan recovery action.
- Tenant SUSPENDED/CANCELED masuk dalam read-only, bukan tenant lain dari URL.
- Session berakhir setelah 30 hari tidak aktif; data layar dibersihkan sebelum login ulang.

### Hasil akhir
Session aktif berada pada tenant/membership yang sah, atau akses ditolak tanpa data tenant.

### Requirement ID
`AUTH-01`, `AUTH-02`, `AUTH-03`, `AUTH-04`, `AUTH-05`, `AUTH-06`, `ORG-02`, `ORG-05`.

### Domain rule terkait
`DR-GEN-01`–`DR-GEN-03`; Domain Rules bagian 3 dan 10.

### Layar terkait
`/register`, `/verify-email`, `/login`, `/forgot-password`, `/reset-password`, `/accept-invitation`, `/select-tenant`.

## UF-02 — Onboarding Owner

### Aktor
Owner terverifikasi yang belum menyelesaikan tenant.

### Tujuan
Membuat tenant, outlet pertama, layanan aktif, dan memulai trial.

### Precondition
Session Owner aktif dan tenant berada pada lifecycle `ONBOARDING`.

### Main flow
1. Owner mengisi nama bisnis, kontak, dan timezone; Platform membuat slug unik otomatis.
2. Owner membuat outlet pertama; nama wajib, alamat/kontak opsional, dan Platform membuat kode outlet unik 2–4 karakter yang dapat diedit.
3. Owner memilih template layanan atau membuat satu layanan kiloan/satuan custom.
4. Platform menyimpan progress setiap langkah dan menampilkan ringkasan.
5. Owner menyelesaikan onboarding setelah minimal satu layanan aktif.
6. Platform mengubah tenant menjadi `OPERATIONAL`, memulai trial 14 hari, dan membuka dashboard.

### Alternate flow
- Owner meninggalkan flow dan kembali pada langkah terakhir.
- Owner meninjau/mengubah data sebelum konfirmasi final.

### Error dan edge case
- Retry tidak menggandakan tenant/outlet/layanan.
- Slug bentrok mendapat suffix otomatis.
- Kegagalan satu langkah mempertahankan progress valid dan tidak memulai trial.
- Harga layanan wajib tersedia melalui default tenant sebelum selesai.

### Hasil akhir
Tenant siap menerima order dengan outlet, layanan, membership Owner, dan trial aktif.

### Requirement ID
`ONB-01`, `ONB-02`, `ONB-03`, `ONB-04`, `ONB-05`, `SRV-01`, `SRV-02`, `SRV-05`, `ORG-01`, `SUB-01`.

### Domain rule terkait
Domain Rules bagian 2, 4, dan 10.

### Layar terkait
`/onboarding/business`, `/onboarding/outlet`, `/onboarding/services`, `/onboarding/complete`, `/app/[tenantSlug]/dashboard`.

## UF-03 — Membuat atau mengarsipkan customer

### Aktor
Owner, Admin, atau Cashier ber-capability pada outlet aktif.

### Tujuan
Menggunakan customer tenant-wide tanpa kehilangan batas visibilitas outlet.

### Precondition
Membership aktif, capability customer, dan tenant dapat bermutasi.

### Main flow
1. Pengguna mencari nama atau HP sebelum membuat record.
2. Pengguna membuka quick-create dari daftar atau draft order.
3. Nama diisi; HP opsional dinormalisasi untuk pencarian ke format +62.
4. Platform menampilkan kandidat duplikat tanpa memblokir penyimpanan.
5. Pengguna memilih record lama atau mengonfirmasi customer baru.
6. Customer baru dipilih kembali pada draft order tanpa kehilangan input.

### Alternate flow
- Pengguna memperbarui profil sesuai capability.
- Owner/Admin mengarsipkan customer; histori tetap tersedia dan pencarian default menyembunyikannya.

### Error dan edge case
- Duplicate submit tidak menghasilkan record tanpa warning.
- Riwayat outlet di luar assignment tidak ditampilkan.
- Customer tidak pernah hard delete.
- Kehilangan permission saat submit menghasilkan denied state aman.

### Hasil akhir
Customer tenant-wide tersimpan/diperbarui/diarsipkan dengan histori utuh.

### Requirement ID
`CUS-01`, `CUS-02`, `CUS-03`, `CUS-04`, `CUS-05`, `AUTH-05`, `ORG-05`.

### Domain rule terkait
`DR-CUS-01`–`DR-CUS-05`, `DR-GEN-01`, `DR-GEN-02`.

### Layar terkait
`/app/[tenantSlug]/customers`, `/app/[tenantSlug]/customers/[customerId]`, drawer Customer Baru pada route order/customer.

## UF-04 — Membuat order dan nota

### Aktor
Owner, Admin, atau Cashier pada outlet aktif.

### Tujuan
Membuat order reguler dalam maksimal dua menit dengan kalkulasi dan snapshot benar.

### Precondition
Tenant dapat bermutasi; outlet dan layanan aktif; harga efektif tersedia.

### Main flow
1. Platform membuka draft pada outlet aktif dan pengguna memilih/membuat customer.
2. Pengguna menambahkan satu atau lebih layanan dan memasukkan berat dua desimal atau jumlah integer.
3. Platform menampilkan actual quantity, billable quantity, harga efektif, dan subtotal.
4. Pengguna dapat mengaktifkan express bila seluruh item eligible, memberi satu diskon order dengan alasan, serta mengisi ETA/catatan.
5. Platform menghitung gross, diskon, total, paid, dan balance dalam rupiah.
6. Pengguna memilih bayar nanti, DP, atau lunas; input payment menjadi bagian konfirmasi atomik.
7. Platform menyimpan order/payment, snapshot item, histori, dan kode `[OUTLET]-[YYMMDD]-[####]`.
8. Detail serta nota terbaru ditampilkan untuk print/share/download.

### Alternate flow
- Quick-create customer mempertahankan draft.
- Harga override outlet menggantikan harga tenant; tanpa override memakai default.
- Bayar nanti menghasilkan payment state `UNPAID`.

### Error dan edge case
- Item non-eligible menonaktifkan express seluruh order.
- Diskon di atas 20%, stacking, quantity invalid, atau applied payment di atas balance ditolak.
- Harga/service berubah sebelum submit memaksa review ulang.
- Idempotency mencegah order/payment ganda.
- Limit order memblokir order baru tetapi tidak mengubah draft menjadi transaksi palsu.

### Hasil akhir
Order `RECEIVED` tersimpan pada outlet asal dengan payment state akurat, snapshot immutable, histori, dan nota.

### Requirement ID
`ORD-01`, `ORD-02`, `ORD-03`, `ORD-04`, `ORD-05`, `ORD-06`, `ORD-07`, `ORD-08`, `ORD-09`, `ORD-10`, `SRV-03`, `SRV-04`, `SRV-06`, `PAY-01`, `PAY-02`, `PAY-03`, `RCP-01`, `RCP-02`, `RCP-03`, `RCP-04`.

### Domain rule terkait
`DR-SRV-01`–`DR-SRV-04`; Domain Rules bagian 5, 6, 7, dan 9.

### Layar terkait
`/app/[tenantSlug]/orders/new`, `/app/[tenantSlug]/orders/[orderId]`, `/app/[tenantSlug]/orders/[orderId]/receipt`.

## UF-05 — Menerima DP, pelunasan, dan koreksi payment

### Aktor
Owner, Admin, atau Cashier dengan capability payment; tindakan koreksi mengikuti capability sensitif.

### Tujuan
Mencatat payment manual dan koreksinya tanpa menghapus ledger.

### Precondition
Order non-canceled mempunyai balance; tenant dapat bermutasi; sesi cash aktif untuk metode cash.

### Main flow
1. Pengguna membuka detail order dan melihat total, payment, serta balance.
2. Pengguna memilih CASH, TRANSFER, QRIS_MANUAL, atau OTHER.
3. Platform menampilkan field metode: cash tendered/change, reference opsional, atau label OTHER wajib.
4. Pengguna memasukkan applied amount yang tidak melebihi balance dan mengonfirmasi.
5. Platform menyimpan payment immutable, menghitung ulang payment state, mencatat audit/event, dan memperbarui nota.

### Alternate flow
- DP menghasilkan `PARTIAL`; applied amount sebesar balance menghasilkan `PAID`.
- Void sebelum close membatalkan payment salah.
- Reversal setelah close membuat record lawan; hanya cash membuat CashMovement kompensasi.
- Refund penuh per payment dipakai hanya ketika dana benar-benar dikembalikan.

### Error dan edge case
- Duplicate submit, stale balance, sesi cash tidak aktif, atau order canceled ditolak.
- Uang diterima cash boleh lebih besar; applied amount tetap maksimum balance dan selisih menjadi change.
- Partial refund bebas dan customer wallet tidak tersedia.
- Semua koreksi memerlukan alasan/reference dan mempertahankan payment asal.

### Hasil akhir
Payment ledger, balance, payment state, kas, nota, dan audit konsisten.

### Requirement ID
`PAY-01`, `PAY-02`, `PAY-03`, `PAY-04`, `PAY-05`, `ORD-03`, `ORD-07`, `REP-05`.

### Domain rule terkait
`DR-PAY-01`–`DR-PAY-05`; Domain Rules bagian 7 dan 8.

### Layar terkait
`/app/[tenantSlug]/orders/[orderId]`, `/app/[tenantSlug]/payments`, `/app/[tenantSlug]/orders/[orderId]/receipt`.

## UF-06 — Memproses laundry

### Aktor
Operator; Owner/Admin/Cashier dengan capability status.

### Tujuan
Memindahkan order melalui workflow produksi standar dengan audit lengkap.

### Precondition
Order non-final pada outlet assignment dan pengguna ber-capability.

### Main flow
1. Pengguna membuka board outlet aktif dan memfilter antrean.
2. Platform menampilkan state, ETA, express, keterlambatan, dan data minimum order.
3. Pengguna memilih transisi normal berikutnya melalui tombol mobile-friendly.
4. Platform memvalidasi versi state, capability, dan subscription.
5. State baru, aktor, timestamp, serta histori tersimpan dan board diperbarui.

### Alternate flow
- Skip maju sampai READY dilakukan ber-capability dengan alasan setelah seluruh item siap.
- Rollback state non-final dilakukan ber-capability dengan alasan.
- Cancel mengikuti UF-07 dan penyelesaian payment.

### Error dan edge case
- Concurrent update memuat state terbaru sebelum retry.
- COMPLETED/CANCELED tidak dapat ditransisikan.
- Koneksi gagal tidak menghasilkan success palsu; offline queue tidak tersedia.
- Status express/terlambat tidak hanya memakai warna.

### Hasil akhir
Order berada pada state valid dengan histori aktor/timestamp/alasan yang diperlukan.

### Requirement ID
`PRD-01`, `PRD-02`, `PRD-03`, `PRD-04`, `PRD-05`, `ORD-07`, `ORD-08`.

### Domain rule terkait
Domain Rules bagian 5; `DR-GEN-02`, `DR-GEN-07`.

### Layar terkait
`/app/[tenantSlug]/production`, `/app/[tenantSlug]/orders/[orderId]`.

## UF-07 — Edit, cancel, dan handoff order

### Aktor
Owner/Admin; Cashier sesuai capability reguler/sensitif.

### Tujuan
Mengubah order yang masih aman, membatalkan dengan penyelesaian payment, atau menyerahkan laundry.

### Precondition
Order pada outlet aktif dan state/action memenuhi Domain Rules.

### Main flow
1. Pengguna membuka detail dan Platform menampilkan action yang legal.
2. Untuk edit reguler, hanya field yang diizinkan state/payment yang aktif.
3. Untuk koreksi finansial, Platform menampilkan total lama/baru serta reversal/refund yang harus diselesaikan atomik.
4. Untuk cancel, pengguna memberi alasan, meninjau dampak payment, dan mengonfirmasi sebelum state final.
5. Untuk handoff READY, payment dilunasi atau pengguna ber-capability memberi alasan penyerahan berpiutang.
6. Platform mencatat penerima opsional, timestamp/aktor wajib, lalu mengubah READY menjadi COMPLETED.

### Alternate flow
- ETA/catatan dapat diubah setelah produksi dimulai.
- Order tanpa payment dapat cancel tanpa refund.
- Order ber-payment menyelesaikan refund/reversal sebelum CANCELED.

### Error dan edge case
- Total baru tidak boleh lebih kecil dari net paid tanpa payment correction.
- COMPLETED/CANCELED read-only.
- Handoff ganda atau stale state ditolak idempotent.
- Tenant read-only menolak edit/cancel/handoff baru.

### Hasil akhir
Order terubah, canceled, atau completed secara valid tanpa kehilangan histori/ledger.

### Requirement ID
`ORD-07`, `ORD-08`, `ORD-09`, `ORD-10`, `PRD-01`, `PRD-03`, `PAY-01`, `PAY-05`.

### Domain rule terkait
Domain Rules bagian 5 dan 7.

### Layar terkait
`/app/[tenantSlug]/orders/[orderId]`, `/app/[tenantSlug]/orders/[orderId]/edit`, `/app/[tenantSlug]/orders/[orderId]/receipt`.

## UF-08 — Buka dan tutup kas

### Aktor
Cashier pemilik sesi; Owner/Admin ber-capability kas.

### Tujuan
Merekonsiliasi cash fisik per kasir/outlet/shift tanpa menghapus movement.

### Precondition
Outlet aktif; tidak ada sesi aktif lain untuk kasir/outlet; tenant dapat bermutasi untuk membuka sesi.

### Main flow
1. Kasir membuka sesi dengan shift dan opening float.
2. Payment cash serta cash in/out tercatat pada sesi aktif.
3. Saat close, Platform menghitung expected cash dan memuat transaksi terbaru.
4. Kasir memasukkan physical cash; Platform menghitung variance.
5. Variance nonnol mewajibkan alasan dan menghasilkan review flag.
6. Kasir mengonfirmasi; sesi menjadi CLOSED dan ringkasan tersedia.

### Alternate flow
- Owner/Admin menandai variance telah direview tanpa mengubah ledger.
- Reopen memakai capability sensitif, alasan, confirmation, dan audit.
- Sesi yang sudah aktif boleh ditutup ketika tenant berubah read-only.

### Error dan edge case
- Transaksi baru setelah ringkasan memaksa refresh.
- Transfer/QRIS tidak masuk expected cash.
- Physical cash negatif, duplicate close, dan movement tanpa sesi ditolak.

### Hasil akhir
Sesi closed mempunyai opening, expected, physical, variance, alasan/flag, dan histori utuh.

### Requirement ID
`PAY-04`, `PAY-05`, `PAY-06`, `PAY-07`, `REP-02`, `REP-05`.

### Domain rule terkait
Domain Rules bagian 8 dan 11.

### Layar terkait
`/app/[tenantSlug]/cash-register`, `/app/[tenantSlug]/payments`, `/app/[tenantSlug]/reports`.

## UF-09 — Melihat dashboard dan laporan

### Aktor
Owner, Admin, dan Cashier sesuai level laporan.

### Tujuan
Memahami performa dan menelusuri angka ke transaksi sumber.

### Precondition
Membership aktif dan capability laporan pada scope outlet yang diminta.

### Main flow
1. Pengguna memilih periode dan satu outlet; Owner dapat memilih Semua outlet.
2. Dashboard memuat Nilai Pesanan, Pembayaran Diterima, Piutang, jumlah order, order aktif, dan siap diambil.
3. Laporan memuat rata-rata order, layanan terlaris, metode payment, serta keterlambatan.
4. Filter/timezone selalu terlihat dan grafik mempunyai tabel/ringkasan.
5. Pengguna membuka drill-down transaksi sumber dari metrik.

### Alternate flow
- Admin hanya mengagregasi assigned outlet.
- Cashier melihat ringkasan shift/kas, bukan laporan lengkap.
- Periode tanpa data menampilkan empty state dan reset filter.

### Error dan edge case
- Query parsial tidak ditampilkan sebagai total final.
- Outlet di luar permission ditolak tanpa data.
- Selisih rekonsiliasi menghasilkan error operasional dan correlation ID.

### Hasil akhir
Metrik tampil sesuai formula, periode, timezone, dan outlet scope serta dapat direkonsiliasi.

### Requirement ID
`REP-01`, `REP-02`, `REP-03`, `REP-04`, `REP-05`, `PAY-05`, `ORG-05`.

### Domain rule terkait
Domain Rules bagian 9; Permission Matrix bagian 1–2.

### Layar terkait
`/app/[tenantSlug]/dashboard`, `/app/[tenantSlug]/reports`, detail order/payment sebagai drill-down.

## UF-10 — Mengelola outlet, pegawai, dan capability

### Aktor
Owner; Admin jika capability organisasi diaktifkan.

### Tujuan
Mengelola outlet dan akses pegawai tanpa menghapus histori atau melampaui entitlement.

### Precondition
Tenant dapat bermutasi dan aktor memiliki capability organisasi.

### Main flow
1. Pengguna membuka outlet/staff dan melihat usage serta limit.
2. Outlet baru dibuat ACTIVE dengan nama/kode unik dan harga tenant diwariskan.
3. Pegawai diundang dengan email, role preset, dan outlet assignment.
4. Penerima menerima invitation; membership menjadi ACTIVE.
5. Owner dapat mengubah assignment/toggle yang diizinkan atau menonaktifkan membership/outlet.
6. Platform mengaudit perubahan capability dan status.

### Alternate flow
- Invitation expired/revoked dapat dikirim ulang setelah cooldown.
- Ownership ditransfer dengan penerimaan Owner baru.
- Outlet/membership inactive tetap terlihat pada histori dan dapat diaktifkan kembali jika limit tersedia.

### Error dan edge case
- Owner terakhir dan outlet dengan order non-final tidak dapat dinonaktifkan.
- Limit outlet/pegawai memblokir create, bukan menghapus resource.
- Pengguna tidak dapat memberi capability yang tidak dimilikinya.
- Full custom role dan Courier tidak tersedia.

### Hasil akhir
Outlet, invitation, membership, assignment, dan capability konsisten serta teraudit.

### Requirement ID
`ORG-01`, `ORG-02`, `ORG-03`, `ORG-04`, `ORG-05`, `ORG-06`, `AUTH-05`, `AUTH-06`, `SUB-03`, `SUB-04`, `SUB-05`.

### Domain rule terkait
Domain Rules bagian 2–3; Permission Matrix bagian 1–4.

### Layar terkait
`/app/[tenantSlug]/settings/outlets`, `/app/[tenantSlug]/settings/staff`, `/app/[tenantSlug]/settings/roles`, `/accept-invitation`.

## UF-11 — Mengelola subscription

### Aktor
Owner; Admin dengan capability billing.

### Tujuan
Melihat usage/limit dan mengaktifkan, mengubah, atau memulihkan subscription dari data server terverifikasi.

### Precondition
Capability billing dan subscription/plan version dapat dimuat.

### Main flow
1. Pengguna membuka billing dan melihat status, paket, periode, usage, limit, dan histori.
2. Pengguna membandingkan Starter, Growth, dan Multi-Outlet.
3. Upgrade membuat checkout Xendit; UI kembali dalam status pending.
4. Server memverifikasi webhook idempotent lalu mengaktifkan plan/entitlement version.
5. Downgrade/cancel dijadwalkan akhir periode; downgrade harus memenuhi limit tujuan.
6. Banner dan akses mengikuti status subscription terbaru.

### Alternate flow
- Trial 14 hari dapat diaktifkan sebelum habis.
- PAST_DUE aktif selama grace 7 hari dan kembali ACTIVE setelah payment terverifikasi.
- Setelah grace, tenant SUSPENDED read-only; billing tetap tersedia.
- CANCELED dapat direaktivasi selama retention 180 hari.

### Error dan edge case
- Redirect browser tidak pernah mengaktifkan subscription.
- Webhook invalid/duplikat/out-of-order dicatat dan diproses idempotent.
- Limit 80%/100% menampilkan warning; existing transaction tetap dapat diselesaikan.
- Manual suspend Super Admin tidak ditimpa webhook.

### Hasil akhir
Subscription, entitlement, usage, access mode, dan history sesuai state server.

### Requirement ID
`SUB-01`, `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06`, `SUB-07`, `SUB-08`, `ORG-01`.

### Domain rule terkait
Domain Rules bagian 10; Permission Matrix bagian 7.

### Layar terkait
`/pricing`, `/app/[tenantSlug]/settings/billing`.

## UF-12 — Pengelolaan tenant oleh Super Admin Platform

### Aktor
Super Admin Platform.

### Tujuan
Mengelola metadata tenant, plan, subscription, dan support action tanpa impersonation/data operasional.

### Precondition
Session admin terpisah dan capability Platform valid.

### Main flow
1. Admin mencari tenant berdasarkan metadata dan membuka detail subscription/usage.
2. Admin dapat menambah hari trial/subscription dengan durasi dan alasan.
3. Admin dapat suspend/reactivate dengan ringkasan dampak dan confirmation.
4. Admin mengelola plan version terbatas serta mengarsipkan plan terpakai.
5. Seluruh mutasi menyimpan aktor, alasan, before/after, timestamp, dan correlation ID.

### Alternate flow
- Admin meninjau subscription/audit tanpa mutasi.
- Webhook billing masuk saat manual suspend; override manual tetap berlaku.

### Error dan edge case
- Customer/order/payment/kas tenant tidak dapat dibuka.
- Impersonation tidak mempunyai route atau fallback.
- Concurrent state change memaksa review sebelum submit ulang.
- Plan terpakai tidak dapat dihapus.

### Hasil akhir
Metadata/plan/subscription berubah secara sah dan teraudit, atau tetap tidak berubah setelah peninjauan/gagal aman.

### Requirement ID
`ADM-01`, `ADM-02`, `ADM-03`, `ADM-04`, `ADM-05`, `ADM-06`, `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06`, `SUB-07`, `SUB-08`.

### Domain rule terkait
Domain Rules bagian 10–11; Permission Matrix bagian 5.

### Layar terkait
`/admin`, `/admin/tenants`, `/admin/tenants/[tenantId]`, `/admin/plans`, `/admin/subscriptions`, `/admin/audit-logs`.

## Traceability requirement

| Requirement family | Flow utama | Layar utama |
| --- | --- | --- |
| `AUTH-*` | UF-01 | Auth, invitation, tenant selector |
| `ONB-*` | UF-02 | Onboarding |
| `CUS-*` | UF-03 | Customer list/detail dan quick-create |
| `SRV-*` | UF-02, UF-04 | Services dan order baru |
| `ORD-*` | UF-04, UF-05, UF-07 | Order list/new/detail/edit/receipt |
| `PRD-*` | UF-06, UF-07 | Production dan order detail |
| `PAY-*` | UF-05, UF-08 | Order detail, payment ledger, cash register |
| `RCP-*` | UF-04, UF-05, UF-07 | Receipt |
| `REP-*` | UF-08, UF-09 | Dashboard, reports, drill-down |
| `ORG-*` | UF-01, UF-02, UF-10 | Outlet, staff, roles, invitation |
| `SUB-*` | UF-02, UF-10, UF-11, UF-12 | Pricing, billing, admin subscription |
| `ADM-*` | UF-12 | Admin area |
