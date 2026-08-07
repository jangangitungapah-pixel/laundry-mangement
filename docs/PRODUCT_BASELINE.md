# Product Baseline — LaundryKita MVP

| Atribut | Nilai |
| --- | --- |
| Status | `APPROVED` |
| Versi | 1.0 |
| Sumber scope/requirement | [`PRD.md`](PRD.md) |

Dokumen ini adalah bacaan ringkas sebelum setiap fase. Detail formula/state berada di [`DOMAIN_RULES.md`](DOMAIN_RULES.md), akses berada di [`ROLE_PERMISSION_MATRIX.md`](ROLE_PERMISSION_MATRIX.md), dan alasan keputusan berada di [`OPEN_DECISIONS.md`](OPEN_DECISIONS.md).

## Proposisi dan pasar

LaundryKita membantu laundry kecil–menengah Indonesia menjalankan customer, order, produksi, payment manual, kas, outlet, pegawai, laporan, dan subscription dalam satu responsive web/PWA. Nilai utama: transaksi kasir maksimal dua menit, status produksi jelas, keuangan dapat direkonsiliasi, dan owner dapat memantau satu atau beberapa outlet.

## Modul MVP

- Public/auth: landing, pricing, registrasi Owner, verifikasi, login/reset, invitation pegawai.
- Setup: tenant, outlet pertama, layanan kiloan/satuan, harga tenant/override outlet.
- Operasi: customer, order, express, diskon, produksi, handoff, nota.
- Keuangan: DP/pelunasan manual, ledger immutable, kas, tutup kas, laporan.
- Organisasi: outlet, pegawai, preset capability, assignment outlet.
- SaaS: plan, trial, entitlement, billing subscription, read-only, Super Admin.
- Platform: multi-tenancy, audit, analytics minimum, PWA installability.

## Prinsip UX

1. Kasir menyelesaikan happy path customer → order → payment/bayar nanti → nota dalam maksimal dua menit.
2. Satu outlet aktif selalu terlihat pada konteks operasional.
3. Mobile tidak bergantung drag-and-drop; primary action tetap terjangkau pada 360 px.
4. Semua data screen memiliki loading, empty, error, permission-denied, dan read-only state yang relevan.
5. Bahasa Indonesia, integer rupiah, nomor HP Indonesia, dan timezone tenant.
6. Tindakan berisiko memakai ringkasan dampak, confirmation, alasan, dan feedback.

## Model operasional

- Customer berlaku tenant-wide; histori dibatasi outlet assignment.
- Layanan hanya kiloan/satuan generik; harga tenant diwariskan dan dapat dioverride outlet.
- Order tetap pada outlet asal; status order, payment, cash session, dan subscription terpisah.
- Payment customer manual: cash, transfer, QRIS manual, atau metode lain berlabel.
- Record transaksi tidak dihapus; koreksi memakai void, reversal, refund, atau adjustment.
- READY berarti selesai produksi; COMPLETED berarti telah diserahkan.

## Model subscription

Asumsi pilot terkonfigurasi pada plan version:

| Paket | Harga/bulan | Outlet | Pegawai | Order/bulan | Laporan |
| --- | ---: | ---: | ---: | ---: | --- |
| Starter | Rp149.000 | 1 | 5 | 500 | Dasar |
| Growth | Rp299.000 | 1 | 15 | 2.000 | Lengkap |
| Multi-Outlet | Rp599.000 | 5 | 50 | 10.000 | Lengkap lintas outlet |

Trial 14 hari dan grace 7 hari. TRIALING/ACTIVE dapat bermutasi; PAST_DUE tetap aktif selama grace; SUSPENDED/CANCELED read-only. Billing subscription memakai provider, sedangkan payment customer laundry tetap manual.

## Guardrail scope

Tidak ada Courier/pickup-delivery khusus, dry-clean workflow khusus, payment gateway customer, public receipt link, WhatsApp automation, offline mutation queue, native app, inventory, payroll, absensi, loyalty, accounting lengkap, full custom-role builder, advanced BI, public API, atau impersonation.

## Keputusan arsitektur produk

- SaaS multi-tenant dengan RLS dan server authorization.
- Frontend-first memakai feature service/repository contract dan mock adapter yang diganti adapter backend.
- Entitlement versioned; UI tidak bergantung nama paket.
- Provider email, billing, dan analytics berada di belakang adapter.
- Money integer rupiah; kalkulasi kuantitas memakai decimal arithmetic; ledger immutable.
- Mutasi selalu memvalidasi tenant, outlet, capability, subscription, dan invariant domain.

## Definisi MVP selesai

MVP selesai ketika acceptance criteria PRD terpenuhi, seluruh critical flow lulus dengan mock dan backend terintegrasi, tenant isolation serta reconciliation test lulus, responsive/accessibility/print tervalidasi, billing dan Super Admin aman, dan backup/restore/monitoring/runbook siap closed pilot.
