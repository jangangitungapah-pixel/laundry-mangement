# Screen Map — LaundryKita MVP

| Atribut | Nilai |
| --- | --- |
| Status | `APPROVED` |
| Versi | 1.0 |
| Flow | [`USER_FLOWS.md`](USER_FLOWS.md) |
| Permission | [`ROLE_PERMISSION_MATRIX.md`](ROLE_PERMISSION_MATRIX.md) |

Semua route tenant memvalidasi session, membership, capability, outlet assignment, subscription, dan resource tenant server-side. Route parameter tidak pernah menjadi bukti akses.

## 1. Public, authentication, dan tenant entry

| Route | Pengguna | Tujuan | Primary action | Data | Loading | Empty | Error | Permission denied | Read-only | Mobile behavior | Flow / requirement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Publik | Menjelaskan nilai LaundryKita | Mulai trial | Manfaat, modul, CTA | Placeholder konten dinamis | Konten inti statis tetap ada | CTA tetap tersedia | Tidak berlaku | Tidak berlaku | Single-column CTA jelas | UF-01 / `AUTH-01` |
| `/features` | Publik | Menjelaskan fitur dalam scope | Mulai trial | Modul MVP dan guardrail | Skeleton bila dinamis | Pesan konten belum tersedia | Retry | Tidak berlaku | Tidak berlaku | Section bertumpuk | UF-01 / scope PRD |
| `/pricing` | Publik | Membandingkan paket pilot | Pilih paket | Starter/Growth/Multi-Outlet, harga, limit, trial | Skeleton plan version | Kanal kontak bila plan unavailable | Retry; jangan checkout | Tidak berlaku | Tidak berlaku | Kartu horizontal menjadi stack | UF-11 / `SUB-03`–`SUB-05` |
| `/contact` | Publik | Menampilkan kanal bantuan | Hubungi tim | Email/kanal resmi | Minimal | Kanal belum tersedia | Navigasi tetap ada | Tidak berlaku | Tidak berlaku | Tap target kanal besar | Pendukung UF-01/UF-11 |
| `/login` | Publik | Membuat session | Masuk | Email, password, reset link | Submit terkunci/loading | Tidak berlaku | Kredensial/network aman | User login diarahkan ke tenant entry | Tidak berlaku | Keyboard/form tidak tertutup CTA | UF-01 / `AUTH-02`, `AUTH-04` |
| `/register` | Publik calon Owner | Membuat akun Owner | Buat akun | Email, password, legal consent | Submit loading | Tidak berlaku | Duplicate/validation/network | User login diarahkan ke tenant entry | Tidak berlaku | Form satu kolom | UF-01 / `AUTH-01` |
| `/verify-email` | Penerima email | Memverifikasi akun | Lanjut onboarding/login | Status token dan email tersamar | Token validation | Tidak berlaku | Expired dengan resend | Token invalid tanpa data akun | Tidak berlaku | Status dan CTA tunggal | UF-01 / `AUTH-01` |
| `/forgot-password` | Publik | Meminta reset | Kirim tautan | Email dan instruksi | Submit loading/cooldown | Tidak berlaku | Pesan generik | Tidak berlaku | Tidak berlaku | Satu field | UF-01 / `AUTH-03` |
| `/reset-password` | Penerima token | Menetapkan password baru | Simpan password | Password dan konfirmasi | Token/submit loading | Tidak berlaku | Expired/invalid/validation | Token invalid aman | Tidak berlaku | Password helper terlihat | UF-01 / `AUTH-03` |
| `/accept-invitation` | Penerima invitation | Menerima membership | Terima undangan | Tenant, role, outlet, expiry | Token validation | Tidak berlaku | Expired/revoked/email mismatch | Token invalid tanpa metadata sensitif | Tidak berlaku | Ringkasan dan CTA bertumpuk | UF-01, UF-10 / `ORG-02`, `ORG-03` |
| `/select-tenant` | User multi-membership | Memilih konteks tenant | Buka tenant | Membership aktif, role, status | Skeleton membership | State tanpa akses/onboarding Owner | Retry/logout | Membership inactive disembunyikan | Tenant read-only diberi badge | List/card satu kolom | UF-01 / `AUTH-05`, `AUTH-06` |
| `/terms` | Publik | Menampilkan syarat | Kembali | Versi/tanggal/isi | Skeleton dokumen | Kanal kontak | Retry | Tidak berlaku | Tidak berlaku | Typography baca | Pendukung UF-01 |
| `/privacy` | Publik | Menampilkan privasi | Kembali | Versi/tanggal/isi | Skeleton dokumen | Kanal kontak | Retry | Tidak berlaku | Tidak berlaku | Typography baca | Pendukung UF-01 |

## 2. Onboarding Owner

| Route | Pengguna | Tujuan | Primary action | Data | Loading | Empty | Error | Permission denied | Read-only | Mobile behavior | Flow / requirement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/onboarding/business` | Owner terverifikasi | Membuat identitas tenant | Simpan dan lanjut | Nama, kontak, timezone, slug preview, progress | Skeleton progress; submit loading | Form awal berpanduan | Validation/retry menjaga input | Non-Owner/login invalid diblokir | Tidak berlaku | Stepper ringkas; sticky CTA | UF-02 / `ONB-01`, `ONB-04` |
| `/onboarding/outlet` | Owner onboarding | Membuat outlet pertama | Simpan dan lanjut | Nama wajib, kode, alamat/kontak opsional | Ringkasan/submit loading | Form outlet | Validation/retry idempotent | Tenant onboarding tidak cocok | Tidak berlaku | Satu kolom | UF-02 / `ONB-02`, `ORG-01` |
| `/onboarding/services` | Owner onboarding | Menyiapkan layanan aktif | Simpan dan lanjut | Template/custom, unit, harga, durasi, minimum, express | Skeleton template | CTA template/custom | Service/price invalid; retry | Tenant tidak cocok | Tidak berlaku | Card template dan drawer form | UF-02 / `ONB-03`, `SRV-01`–`SRV-05` |
| `/onboarding/complete` | Owner onboarding | Meninjau dan mengaktifkan trial | Selesaikan onboarding | Bisnis, outlet, layanan, trial 14 hari | Finalisasi idempotent | Daftar langkah kurang | Retry tanpa duplikat | Non-Owner diblokir | Tidak berlaku | Ringkasan section | UF-02 / `ONB-04`, `ONB-05`, `SUB-01` |

## 3. Tenant application

| Route | Pengguna | Tujuan | Primary action | Data | Loading | Empty | Error | Permission denied | Read-only | Mobile behavior | Flow / requirement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/app/[tenantSlug]/dashboard` | Owner; Admin; Cashier/Operator terbatas | Ringkasan operasional | Buka order/antrean | Nilai Pesanan, Payment Diterima, Piutang, order aktif/ready, outlet/periode | Skeleton per widget | CTA order pertama/ubah filter | Widget retry independen | Tanpa membership tidak memuat data | Data tampil; CTA mutasi mati; billing banner | Kartu 2/1 kolom dan list | UF-09 / `REP-01`, `REP-02` |
| `/app/[tenantSlug]/orders` | Owner/Admin/Cashier; Operator read-minimum | Mencari order | Buat order | Kode, customer, outlet, ETA, total/balance, order/payment state, flags | Skeleton list/filter | CTA order pertama/reset filter | Retry mempertahankan filter | Scope tenant/outlet aman | List tersedia; create/edit mati | Card list; filter drawer | UF-04–UF-07 / `ORD-01`, `PRD-02` |
| `/app/[tenantSlug]/orders/new` | Owner/Admin/Cashier | Membuat order cepat | Konfirmasi order | Outlet, customer, items, quantities, price, express, discount, ETA, payment, totals | Catalog/customer skeleton; submit loading | Tidak ada service: link settings bagi yang berizin | Validation/stale price/idempotency | Capability/outlet invalid | Form tidak dapat dibuka untuk mutasi | Sticky summary/CTA; quick-create drawer | UF-03–UF-05 / `ORD-01`–`ORD-07`, `PAY-01`–`PAY-03` |
| `/app/[tenantSlug]/orders/[orderId]` | User tenant sesuai scope | Sumber detail/action order | Action legal berikutnya | Header, customer, item snapshot, totals, payment, ETA, states, history | Skeleton section | Not-found aman | Conflict/retry/correlation ID | Tidak mengungkap resource tenant lain | Detail tampil; semua mutasi mati | Section accordion; sticky primary action | UF-04–UF-07 / `ORD-*`, `PAY-01`–`PAY-05` |
| `/app/[tenantSlug]/orders/[orderId]/edit` | Owner/Admin/Cashier sesuai capability | Edit atau correction | Simpan/koreksi | Field legal, state/payment, old/new total, correction impact, reason | Skeleton/submit loading | Order final diarahkan detail | Validation/version/payment conflict | Capability/outlet invalid | Form read-only dengan alasan | Field sections; impact summary sticky | UF-07 / `ORD-08`, `ORD-09`, `PAY-05` |
| `/app/[tenantSlug]/orders/[orderId]/receipt` | User berizin order | Print/share/download nota | Cetak | Nota final tanpa ID internal | Skeleton sampai data lengkap | Not-found aman | Print/share retry | Data tidak dirender | Lihat/print tetap tersedia | Preview fit-width; native share bila ada | UF-04, UF-05, UF-07 / `RCP-01`–`RCP-04` |
| `/app/[tenantSlug]/production` | Owner/Admin/Cashier/Operator | Mengelola antrean produksi | Transisi order | Kolom/list state, flags, ETA, filter, history ringkas | Skeleton per lane | Tidak ada antrean/reset filter | Update rollback UI dan retry | Hanya assigned outlet/action | Board dapat dilihat; action mati | List per status; tanpa drag-drop | UF-06, UF-07 / `PRD-01`–`PRD-05` |
| `/app/[tenantSlug]/customers` | Owner/Admin/Cashier | Mencari/membuat customer | Tambah customer | Nama, HP, archived filter, ringkasan outlet-visible | Skeleton/search aktif | CTA customer pertama/reset search | Retry mempertahankan query | Capability customer wajib | List dapat dilihat; create/archive mati | Card list dan quick-create drawer | UF-03, UF-04 / `CUS-01`–`CUS-03` |
| `/app/[tenantSlug]/customers/[customerId]` | Owner/Admin/Cashier | Profil dan histori customer | Buat order/ubah | Profil, warning duplicate, order/summary scoped outlet | Skeleton profil/histori | Customer tanpa histori | Retry per section | Histori outlet lain tidak dimuat | Data tampil; mutasi mati | Sections/card timeline | UF-03, UF-04 / `CUS-04`, `CUS-05` |
| `/app/[tenantSlug]/payments` | Owner/Admin/Cashier | Ledger dan filter piutang | Buka order | Order, waktu, outlet, metode, amount, actor, status, balance | Skeleton table/filter | Belum ada payment/piutang | Retry; total parsial tidak dianggap final | Assigned outlet/capability | Ledger tampil; mutasi hanya dari order dan mati | Table menjadi cards; filter drawer | UF-05, UF-08, UF-09 / `PAY-01`–`PAY-05`, `REP-05` |
| `/app/[tenantSlug]/cash-register` | Owner/Admin/Cashier | Buka/tutup dan review sesi kas | Buka/Tutup sesi | Shift, opening, cash payments, movements, expected, physical, variance, review | Skeleton context | CTA buka sesi atau no history | Stale summary/validation/retry | Kasir hanya sesi sendiri; manager sesuai scope | Sesi aktif boleh ditutup; selain itu mutasi mati | Summary cards; keypad; sticky close | UF-08 / `PAY-04`–`PAY-07` |
| `/app/[tenantSlug]/reports` | Owner/Admin; Cashier ringkas | Laporan rekonsiliasi | Ubah filter/drill-down | Metrik final, service/method/late, charts+tabel, outlet/periode | Skeleton per section | Ubah filter | Section error; no partial total | Level laporan dan outlet scope | Data historis tetap tampil | Charts scroll; tabel/cards alternatif | UF-09 / `REP-01`–`REP-05` |
| `/app/[tenantSlug]/settings/business` | Owner; Admin read/edit opsional | Identitas tenant | Simpan | Nama, kontak, timezone, slug read-only | Skeleton/submit | Recovery state | Validation/retry | Edit capability terpisah | Data tampil; save mati | Satu kolom | UF-02, UF-10 / `ONB-01`, `ORG-04` |
| `/app/[tenantSlug]/settings/outlets` | Owner; Admin opsional | Mengelola outlet | Tambah outlet | Outlet, code, state, assignments, usage/limit | Skeleton list/dialog | CTA outlet pertama | Limit/blocker/validation | Organization capability | List tampil; mutasi mati | Cards; dialog full-screen | UF-02, UF-10, UF-11 / `ORG-01`, `SUB-04`, `SUB-05` |
| `/app/[tenantSlug]/settings/services` | Owner/Admin | Mengelola layanan/harga | Tambah layanan | Unit, default/override price, duration, minimum, express, state | Skeleton catalog | CTA layanan pertama | Validation/conflict/retry | Service capability | Catalog tampil; mutasi mati | Cards; form drawer full-screen | UF-02, UF-04 / `SRV-01`–`SRV-06` |
| `/app/[tenantSlug]/settings/staff` | Owner; Admin opsional | Invitation/membership/assignment | Undang pegawai | Invitation/membership state, role, outlets, usage/limit | Skeleton list | CTA undangan pertama | Duplicate/expired/limit/blocker | Organization capability | List tampil; mutasi mati | Cards; status filter; dialog full-screen | UF-10 / `ORG-02`, `ORG-03`, `ORG-06` |
| `/app/[tenantSlug]/settings/roles` | Owner; Admin read/opsional | Meninjau preset/toggle | Simpan toggle | Matrix Owner/Admin/Cashier/Operator dan toggle sensitif | Skeleton matrix | Error konfigurasi preset | Lockout guard/retry | Capability grant dibatasi aktor | Matrix tampil; toggle mati | Matrix jadi grouped list | UF-10 / `ORG-04`, `ORG-05` |
| `/app/[tenantSlug]/settings/billing` | Owner; Admin billing opsional | Subscription dan recovery | Pilih/ubah paket | Plan, status, period, trial/grace, usage/limit, invoice/history | Skeleton; checkout pending | Plan unavailable: support | Provider/webhook/retry | Billing capability | Tetap aktif untuk recovery; non-billing data read-only | Paket stack; usage bars | UF-11 / `SUB-01`–`SUB-08` |

## 4. Super Admin Platform

| Route | Pengguna | Tujuan | Primary action | Data | Loading | Empty | Error | Permission denied | Read-only | Mobile behavior | Flow / requirement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/admin` | Super Admin Platform | Ringkasan kesehatan Platform | Cari tenant | Count tenant/subscription, event perhatian | Skeleton widget | Link daftar | Retry per widget | Non-admin diblokir | Tidak berlaku pada tenant mode | Kartu stack | UF-12 / `ADM-01`, `ADM-02` |
| `/admin/tenants` | Super Admin Platform | Mencari tenant | Buka detail | Metadata, plan, status, usage | Skeleton table/filter | Reset search | Retry mempertahankan query | Non-admin diblokir | N/A; platform permission berlaku | Table menjadi cards | UF-12 / `ADM-01`, `ADM-02` |
| `/admin/tenants/[tenantId]` | Super Admin Platform | Support action tenant | Extension/suspend/reactivate | Metadata, subscription, usage, state/history; tanpa customer/order | Skeleton detail | Not-found | Concurrent/retry | Non-admin diblokir | Tenant read-only adalah data yang dikelola | Section cards; action sheet | UF-12 / `ADM-02`–`ADM-05` |
| `/admin/plans` | Super Admin Platform | Mengelola plan version | Buat versi/edit/archive | Label, display price, entitlement, usage, state | Skeleton list/form | CTA plan pertama | Validation/plan-used guard | Non-admin diblokir | Tidak terkait tenant read-only | Cards; form full-screen | UF-12 / `SUB-03`, `SUB-04`, `ADM-05` |
| `/admin/subscriptions` | Super Admin Platform | Memantau subscription/event | Buka tenant | Tenant, plan version, state, period, usage, invoice/event | Skeleton table/filter | Reset filter | Webhook/retry state | Non-admin diblokir | Menampilkan semua state | Table menjadi cards | UF-11, UF-12 / `SUB-02`, `SUB-07`, `SUB-08` |
| `/admin/audit-logs` | Super Admin Platform | Menelusuri audit Platform | Filter audit | Actor, action, target, tenant metadata, reason, timestamp, correlation ID | Skeleton table | Reset filter | Retry; no partial claim | Non-admin diblokir | Tidak terkait | Filter drawer dan cards | UF-12 / `ADM-05`, `ADM-06` |

## 5. Interaksi tanpa route baru

- Customer quick-create: drawer/modal dari daftar atau order baru.
- Payment, void, reversal, refund, cancel, correction, dan handoff: dialog/step pada detail order.
- Buka/tutup/review/reopen sesi: dialog/step pada cash register.
- Create/edit outlet, service, staff, capability: dialog/drawer pada route settings terkait.
- Extension, compensation, suspend, reactivate: dialog pada detail tenant admin.
- Web Share/download receipt hanya dari session berizin; tidak ada route receipt publik.

## 6. Traceability requirement ke layar

| Requirement ID | Flow | Layar utama |
| --- | --- | --- |
| `AUTH-01`, `AUTH-02`, `AUTH-03`, `AUTH-04`, `AUTH-05`, `AUTH-06` | UF-01 | Register, verify email, login, reset password, invitation, tenant selector |
| `ONB-01`, `ONB-02`, `ONB-03`, `ONB-04`, `ONB-05` | UF-02 | Empat layar onboarding dan dashboard |
| `CUS-01`, `CUS-02`, `CUS-03`, `CUS-04`, `CUS-05` | UF-03, UF-04 | Customer list/detail dan quick-create drawer |
| `SRV-01`, `SRV-02`, `SRV-03`, `SRV-04`, `SRV-05`, `SRV-06` | UF-02, UF-04 | Onboarding services, settings services, order baru |
| `ORD-01`, `ORD-02`, `ORD-03`, `ORD-04`, `ORD-05`, `ORD-06`, `ORD-07`, `ORD-08`, `ORD-09`, `ORD-10` | UF-04, UF-05, UF-07 | Order list/new/detail/edit/receipt |
| `PRD-01`, `PRD-02`, `PRD-03`, `PRD-04`, `PRD-05` | UF-06, UF-07 | Production board dan order detail |
| `PAY-01`, `PAY-02`, `PAY-03`, `PAY-04`, `PAY-05`, `PAY-06`, `PAY-07` | UF-05, UF-08 | Order detail, payment ledger, cash register |
| `RCP-01`, `RCP-02`, `RCP-03`, `RCP-04` | UF-04, UF-05, UF-07 | Receipt dan print/share dialog |
| `REP-01`, `REP-02`, `REP-03`, `REP-04`, `REP-05` | UF-08, UF-09 | Dashboard, reports, dan transaction drill-down |
| `ORG-01`, `ORG-02`, `ORG-03`, `ORG-04`, `ORG-05`, `ORG-06` | UF-01, UF-02, UF-10 | Outlet, staff, roles, invitation, tenant selector |
| `SUB-01`, `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06`, `SUB-07`, `SUB-08` | UF-02, UF-10, UF-11, UF-12 | Pricing, billing, outlet/staff limits, admin subscriptions |
| `ADM-01`, `ADM-02`, `ADM-03`, `ADM-04`, `ADM-05`, `ADM-06` | UF-12 | Seluruh area Super Admin Platform |
