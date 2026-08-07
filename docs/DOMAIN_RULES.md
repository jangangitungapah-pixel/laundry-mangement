# Domain Rules — LaundryKita MVP

| Atribut | Nilai |
| --- | --- |
| Status | `APPROVED` |
| Versi | 1.0 |
| Scope | Aturan bisnis, state, formula, invariant, dan audit MVP |

Dokumen ini adalah sumber tunggal aturan domain. Scope/requirement berada di [`PRD.md`](PRD.md), sedangkan siapa yang boleh melakukan tindakan berada di [`ROLE_PERMISSION_MATRIX.md`](ROLE_PERMISSION_MATRIX.md).

## 1. Invariant lintas domain

| ID | Invariant |
| --- | --- |
| DR-GEN-01 | Mutasi tenant wajib memperoleh `tenant_id` dari membership server-side, bukan input bebas browser. |
| DR-GEN-02 | Mutasi operasional wajib memvalidasi outlet aktif, outlet assignment, capability, dan mode akses subscription. |
| DR-GEN-03 | Order state, payment state, cash-session state, dan subscription state tidak pernah digabung menjadi satu status. |
| DR-GEN-04 | Order, payment, refund, CashMovement, histori, dan audit tidak boleh dihapus permanen. |
| DR-GEN-05 | Money disimpan sebagai integer rupiah; kuantitas dihitung dengan decimal arithmetic, bukan floating-point biner. |
| DR-GEN-06 | Waktu disimpan sebagai instant server dan ditampilkan dalam timezone tenant. |
| DR-GEN-07 | Tindakan sensitif idempotent atau memakai idempotency key dan database transaction. |

## 2. Tenant dan outlet

### Tenant lifecycle

| State | Masuk ketika | Akses | Keluar ketika |
| --- | --- | --- | --- |
| `ONBOARDING` | Owner membuat tenant | Hanya flow setup | Onboarding valid selesai |
| `OPERATIONAL` | Onboarding selesai | Diturunkan dari subscription dan permission | Subscription masuk retensi atau tenant ditutup |
| `RETENTION` | Subscription CANCELED | Read-only selama 180 hari; billing tetap tersedia | Reactivation atau retensi berakhir |
| `ANONYMIZED` | Retensi berakhir | Tidak ada akses tenant | Terminal; record minimum legal/audit tetap terpisah |

`READ_ONLY` adalah mode akses yang diturunkan dari subscription, bukan tenant lifecycle baru.

### Outlet lifecycle

| Dari | Aksi | Syarat | Ke |
| --- | --- | --- | --- |
| — | Buat outlet | Entitlement tersedia; nama wajib; kode outlet unik 2–4 karakter | `ACTIVE` |
| `ACTIVE` | Nonaktifkan | Tidak ada order non-final dan bukan satu-satunya outlet saat onboarding | `INACTIVE` |
| `INACTIVE` | Aktifkan | Entitlement tersedia | `ACTIVE` |

Aturan:

- Satu outlet aktif dipilih pada app shell untuk seluruh mutasi operasional.
- Order, payment, status, dan kas tetap terikat ke outlet asal; tidak ada transfer order antar-outlet.
- Outlet inactive tetap muncul pada histori dan tidak menerima order, assignment, atau sesi kas baru.
- Agregasi `Semua outlet` hanya tersedia pada dashboard/laporan bagi capability lintas outlet.

## 3. Membership dan invitation

### Invitation lifecycle

| Dari | Event | Ke | Efek |
| --- | --- | --- | --- |
| — | Owner mengundang email | `PENDING` | Token berlaku 72 jam |
| `PENDING` | Diterima akun email yang sama | `ACCEPTED` | Membership dibuat/diaktifkan |
| `PENDING` | 72 jam berlalu | `EXPIRED` | Token tidak dapat digunakan |
| `PENDING` | Dicabut pengundang | `REVOKED` | Token tidak dapat digunakan |
| `EXPIRED`/`REVOKED` | Kirim ulang | `PENDING` baru | Token lama tetap invalid |

Resend memiliki cooldown 60 detik. Email global dapat memiliki membership pada beberapa tenant.

### Membership lifecycle

| Dari | Aksi | Guardrail | Ke |
| --- | --- | --- | --- |
| — | Invitation diterima | Role preset dan minimal satu outlet assignment untuk role operasional | `ACTIVE` |
| `ACTIVE` | Nonaktifkan | Bukan Owner terakhir; aktor ber-capability | `INACTIVE` |
| `INACTIVE` | Aktifkan | Entitlement pegawai tersedia | `ACTIVE` |

- Histori tindakan tetap menunjuk identitas pengguna setelah membership inactive.
- Transfer ownership dimulai Owner lama, diterima Owner baru, dan tidak pernah menghasilkan tenant tanpa Owner aktif.
- Role final: Owner, Admin, Cashier, Operator, dan Super Admin Platform. Tidak ada Courier.

## 4. Customer, layanan, dan harga

| ID | Aturan |
| --- | --- |
| DR-CUS-01 | Customer tenant-wide; nama wajib; HP opsional. |
| DR-CUS-02 | HP dinormalisasi untuk pencarian: trim, hapus separator, ubah awalan `0` menjadi `+62`, dan pertahankan format tampilan lokal. |
| DR-CUS-03 | HP sama menghasilkan warning dan pilihan memakai record lama atau tetap membuat record baru. |
| DR-CUS-04 | Histori customer difilter ke outlet yang dapat diakses pengguna. |
| DR-CUS-05 | Customer hanya dapat diarsipkan; archived tidak muncul pada pencarian default tetapi histori tetap tersedia. |
| DR-SRV-01 | Unit layanan hanya `KILOGRAM` atau `SATUAN`; tidak ada stage-profile atau dry-clean workflow. |
| DR-SRV-02 | Harga efektif adalah override outlet aktif jika ada, selain itu harga default tenant. |
| DR-SRV-03 | Menghapus override mengembalikan harga efektif ke default tenant. |
| DR-SRV-04 | Perubahan/nonaktif layanan tidak mengubah snapshot order lama. |

## 5. Order, produksi, edit, cancel, dan handoff

### Transisi order

| Dari | Transisi normal | Transisi khusus | Keadaan terminal |
| --- | --- | --- | --- |
| `RECEIVED` | `WASHING` | Skip maju ke tahap aktif hingga `READY`; cancel | Tidak |
| `WASHING` | `DRYING` | Skip maju hingga `READY`; rollback; cancel | Tidak |
| `DRYING` | `IRONING` | Skip ke `READY`; rollback; cancel | Tidak |
| `IRONING` | `READY` | Rollback; cancel | Tidak |
| `READY` | Handoff ke `COMPLETED` | Rollback; cancel | Tidak |
| `COMPLETED` | Tidak ada | Tidak ada rollback pada MVP | Ya |
| `CANCELED` | Tidak ada | Tidak ada restore; buat order baru bila perlu | Ya |

Aturan transisi:

- Order baru selalu `RECEIVED`.
- Skip hanya untuk seluruh order setelah seluruh item siap melewati tahap; capability, alasan, dan audit wajib.
- Rollback hanya dari state non-final; capability, alasan, dan audit wajib.
- `READY` berarti produksi selesai; `COMPLETED` berarti telah diserahkan.
- Order terlambat segera ketika waktu tenant melewati ETA dan order belum `READY`, `COMPLETED`, atau `CANCELED`.

### Edit dan cancel

| Kondisi | Perubahan yang diizinkan |
| --- | --- |
| `RECEIVED`, belum ada payment valid | Customer, item, quantity, express, diskon, ETA, catatan |
| Ada payment valid atau produksi sudah berjalan | ETA dan catatan; perubahan finansial hanya melalui correction transaction |
| `READY` | ETA/catatan operasional dan tindakan handoff/cancel berizin |
| `COMPLETED`/`CANCELED` | Read-only; tidak ada edit bebas |

Correction transaction harus menghitung total baru dan secara atomik menjalankan void/reversal/refund yang diperlukan sehingga `net paid <= total baru`. Cancel memerlukan alasan, capability, confirmation, dan penyelesaian payment; status `CANCELED` tidak menghapus order.

### Handoff

- Default handoff memerlukan payment `PAID`.
- Owner/Admin atau Cashier dengan capability `order.handoff_with_balance` dapat menyerahkan order `UNPAID/PARTIAL` dengan alasan wajib.
- Nama penerima opsional; timestamp, aktor, outlet, dan balance saat handoff wajib disimpan.
- Handoff yang sukses mengubah `READY` menjadi `COMPLETED` dan mengeluarkan order dari antrean siap diambil.

## 6. Kalkulasi order

### Kuantitas dan formula

- Berat aktual: lebih dari 0, maksimal dua desimal.
- Jumlah satuan: integer lebih dari 0.
- `billable_quantity = max(actual_quantity, minimum_quantity)`.
- `item_subtotal = round_half_up(billable_quantity × unit_price)`.
- Jika express: `item_surcharge = round_half_up(item_subtotal × express_percent / 100)`.
- `gross = sum(item_subtotal) + sum(item_surcharge)`.
- Diskon order berupa nominal atau persen; tidak dapat ditumpuk; maksimum 20% dari `gross` dan selalu memerlukan alasan.
- `discount_amount_percent = round_half_up(gross × discount_percent / 100)`.
- `total = gross - discount_amount`; total tidak boleh negatif.
- ETA default adalah waktu selesai terlama dari seluruh item berdasarkan durasi reguler/express; pengguna berizin dapat menetapkan ETA lebih lambat dengan catatan.
- Express adalah toggle order dan hanya aktif jika seluruh item eligible.

### Contoh normal

Layanan 2,35 kg, minimum 3 kg, harga Rp7.000/kg, express 25%, diskon 10%:

```text
billable_quantity = 3,00
item_subtotal     = 3 × 7.000 = 21.000
express           = round_half_up(21.000 × 25%) = 5.250
gross             = 26.250
discount          = round_half_up(26.250 × 10%) = 2.625
total             = 23.625
```

### Edge case

- Item non-eligible membuat toggle express tidak dapat diaktifkan; kasir harus melepas express atau item tersebut.
- Diskon di atas limit ditolak, bukan menunggu approval.
- Perubahan harga katalog ketika draft terbuka memerlukan review ulang sebelum submit.
- Snapshot order menyimpan actual quantity, billable quantity, unit price, surcharge, discount share, dan subtotal final.

## 7. Payment ledger, DP, void, reversal, dan refund

### Invariant payment

| ID | Invariant |
| --- | --- |
| DR-PAY-01 | `applied_amount` integer, lebih dari 0, dan tidak melebihi balance saat konfirmasi. |
| DR-PAY-02 | Uang diterima cash boleh melebihi applied amount; selisih adalah change dan bukan saldo customer. |
| DR-PAY-03 | Order/payment awal disimpan atomik; payment tidak boleh ada tanpa order valid. |
| DR-PAY-04 | Transfer/QRIS reference opsional; OTHER wajib mempunyai label metode. |
| DR-PAY-05 | Payment asal tidak diedit atau dihapus setelah tercatat; koreksi membuat record terkait. |

### Payment state order

| Kondisi net payment | State |
| --- | --- |
| Tidak pernah dibayar | `UNPAID` |
| `0 < net paid < total` | `PARTIAL` |
| `net paid = total` | `PAID` |
| Pernah dibayar dan seluruh net payment menjadi 0 karena refund | `REFUNDED` |

### Tindakan koreksi

| Tindakan | Kapan | Efek ledger order | Efek kas |
| --- | --- | --- | --- |
| Void | Payment salah, sesi/periode belum ditutup | Payment ditandai void; paid/balance dihitung ulang | Payment cash dikeluarkan dari expected cash sesi aktif |
| Reversal | Payment salah setelah close | Record lawan menonaktifkan nilai payment; paid/balance dihitung ulang | Hanya cash membuat CashMovement lawan pada sesi koreksi yang menaut sesi asal |
| Refund | Dana benar-benar dikembalikan | Refund penuh per payment; original tetap ada | Refund cash mengurangi expected cash sesi aktif; non-cash tidak mengubah kas fisik |

Partial refund bebas tidak tersedia. Jika sebagian dari beberapa payment harus dikembalikan, refund dilakukan penuh terhadap payment yang dipilih. Semua tindakan memerlukan capability, alasan, aktor, timestamp, confirmation, dan reference record asal.

### Contoh normal

Order Rp23.625 menerima DP transfer Rp10.000 sehingga `PARTIAL`. Saat handoff, cash diterima Rp20.000 dengan applied amount Rp13.625 dan change Rp6.375; order menjadi `PAID`, sedangkan expected cash bertambah Rp13.625.

## 8. Sesi kas dan tutup kas

### Lifecycle

| Dari | Aksi | Syarat | Ke |
| --- | --- | --- | --- |
| — | Buka sesi | Kasir, outlet, shift, opening float; tidak ada sesi aktif lain untuk pasangan tersebut | `OPEN` |
| `OPEN` | Catat payment cash/cash in/out | Capability dan tenant dapat bermutasi | `OPEN` |
| `OPEN` | Tutup | Input kas fisik dan review transaksi terbaru | `CLOSED` |
| `CLOSED` | Reopen | Capability sensitif, alasan, confirmation, audit | `OPEN` |

Formula:

```text
expected_cash = opening_float
              + valid_cash_payments
              + cash_in
              - cash_out
              - cash_refunds
              +/- valid_cash_adjustments

variance = physical_cash - expected_cash
```

- Transfer dan QRIS manual tidak masuk expected cash.
- Variance nol dapat ditutup langsung; variance nonnol wajib alasan dan menghasilkan review flag, tetapi tetap final tanpa approval gate.
- Review flag dapat ditandai reviewed oleh Owner/Admin; ini tidak mengubah nilai ledger.
- Tenant yang berubah read-only masih dapat menutup sesi yang sudah aktif; tidak dapat membuka sesi atau membuat movement baru.
- Close memakai optimistic concurrency: transaksi baru sejak ringkasan terakhir memaksa refresh.

## 9. Nota dan laporan

### Nota

- Nota memakai kode order sebagai nomor nota dan menampilkan identitas outlet, customer, item snapshot, actual/billable quantity, subtotal, surcharge, diskon, total, payment, balance, ETA, order/payment state.
- Nota tidak menampilkan UUID, tenant ID, atau data internal.
- Output MVP: layar berizin, browser print 58/80 mm, Web Share, dan download. Tidak ada public link.
- Cetak/bagikan selalu memakai state server terbaru dan mencatat event analytics yang relevan.

### Formula laporan

| Metrik | Formula dan waktu |
| --- | --- |
| Nilai Pesanan | Total order non-canceled berdasarkan `created_at` dalam timezone tenant |
| Pembayaran Diterima | Payment valid dikurangi refund berdasarkan timestamp transaksi finansial |
| Piutang | Sum balance order non-canceled pada akhir periode |
| Jumlah Pesanan | Count order non-canceled berdasarkan `created_at` |
| Rata-rata Transaksi | Nilai Pesanan / Jumlah Pesanan; nol jika tidak ada order |
| Layanan Terlaris | Sum billable quantity per snapshot layanan pada order non-canceled |
| Metode Payment | Sum net payment valid per metode |
| Keterlambatan | Count order yang ETA-nya terlewati sebelum READY/final |

Cutoff hari adalah 00.00–23.59.59 pada timezone tenant. Setiap kartu/tabel memiliki drill-down ke transaksi sumber dan filter outlet mengikuti permission.

## 10. Subscription, entitlement, dan retensi

### Subscription transition

| Dari | Event | Ke |
| --- | --- | --- |
| — | Onboarding selesai | `TRIALING` |
| `TRIALING` | Checkout terverifikasi | `ACTIVE` |
| `TRIALING` | Trial berakhir tanpa aktivasi | `PAST_DUE` |
| `ACTIVE` | Renewal gagal | `PAST_DUE` |
| `PAST_DUE` | Payment terverifikasi dalam grace | `ACTIVE` |
| `PAST_DUE` | Grace 7 hari berakhir | `SUSPENDED` |
| `ACTIVE` | Cancel efektif akhir periode | `CANCELED` |
| `SUSPENDED`/`CANCELED` | Checkout/reactivation terverifikasi | `ACTIVE` |
| Status apa pun | Manual suspend Super Admin | `SUSPENDED` dengan override manual |

Manual suspend hanya berakhir melalui reactivation eksplisit; webhook billing tidak menghapus override manual.

### Mode akses

| Status | Mode |
| --- | --- |
| `TRIALING`, `ACTIVE` | Mutasi sesuai capability dan entitlement |
| `PAST_DUE` selama grace | Mutasi tetap aktif; banner dan billing CTA wajib |
| `SUSPENDED`, `CANCELED` | Read-only; Owner/Admin billing dapat membuka billing dan close sesi aktif tetap tersedia |

### Entitlement pilot

| Paket | Outlet | Pegawai | Order/bulan | Laporan |
| --- | ---: | ---: | ---: | --- |
| Starter | 1 | 5 | 500 | Dasar |
| Growth | 1 | 15 | 2.000 | Lengkap |
| Multi-Outlet | 5 | 50 | 10.000 | Lengkap lintas outlet |

- Warning pada 80% dan 100%; create resource baru diblokir pada limit.
- Existing order dapat diproses, dibayar, diserahkan, dicetak, dan direkonsiliasi setelah limit.
- Upgrade aktif setelah webhook terverifikasi; downgrade/cancel akhir periode, tanpa proration.
- Plan/entitlement version disnapshot pada subscription history.
- Setelah CANCELED, tenant RETENTION 180 hari; permintaan export ditangani support terkontrol tanpa route MVP; kemudian data operasional dianonimkan/dihapus dan record finansial/audit minimum dipertahankan lima tahun.

## 11. Audit requirements

| Area | Event minimum | Alasan wajib |
| --- | --- | --- |
| Order | create, financial correction, cancel, skip, rollback, handoff berpiutang | Untuk seluruh tindakan sensitif |
| Payment | record, void, reversal, refund | Void/reversal/refund |
| Cash | open, cash in/out, close variance, reopen, reviewed | Cash in/out, variance, reopen |
| Access | invite, role/capability/assignment change, deactivate, ownership transfer | Perubahan sensitif dan deactivate |
| Subscription | checkout, webhook transition, plan change, cancel, manual support action | Tindakan manual Super Admin |
| Super Admin | tenant view sensitif, plan edit/archive, extension, suspend/reactivate | Seluruh mutasi |

Setiap audit menyimpan `event_id`, actor, tenant bila relevan, outlet bila relevan, target type/id, action, before/after minimum, reason, timestamp, dan correlation ID. Secret, token, password, serta data customer yang tidak diperlukan dilarang masuk audit/analytics.
