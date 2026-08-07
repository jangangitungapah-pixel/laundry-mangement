# Role Permission Matrix — LaundryKita MVP

| Atribut | Nilai |
| --- | --- |
| Status | `APPROVED` |
| Versi | 1.0 |
| Sumber scope | [`PRD.md`](PRD.md) |
| Sumber invariant | [`DOMAIN_RULES.md`](DOMAIN_RULES.md) |

Permission diperiksa server-side sebagai capability dan scope, bukan hanya nama role. Owner dapat mengubah toggle yang secara eksplisit ditandai `Opsional`; role baru dan custom-role builder tidak tersedia.

## 1. Scope data

| Role | Tenant scope | Outlet scope | Batas data |
| --- | --- | --- | --- |
| Owner | Satu tenant aktif | Semua outlet tenant; satu outlet aktif untuk operasi | Seluruh data tenant yang termasuk MVP |
| Admin | Satu tenant aktif | Hanya outlet assignment; agregasi assignment pada laporan | Data operasional assigned outlet; billing/organisasi hanya bila toggle aktif |
| Cashier | Satu tenant aktif | Hanya outlet assignment dan satu outlet aktif | Customer tenant-wide untuk pencarian; histori/order/payment hanya assigned outlet |
| Operator | Satu tenant aktif | Hanya outlet assignment dan satu outlet aktif | Data minimum order yang diperlukan untuk produksi |
| Super Admin Platform | Platform | Tidak memakai assignment outlet | Metadata tenant, plan, subscription, entitlement usage, audit admin; tanpa customer/order/payment/kas |

## 2. Akses halaman

Legenda: `Ya` = default; `Terbatas` = data/action sesuai scope; `Opsional` = Owner dapat mengaktifkan capability; `Tidak` = route tidak tersedia.

| Area halaman | Owner | Admin | Cashier | Operator | Super Admin Platform |
| --- | --- | --- | --- | --- | --- |
| Public/auth/onboarding Owner | Ya | Auth saja | Auth/invitation | Auth/invitation | Auth admin terpisah |
| Dashboard tenant | Ya, semua/tiap outlet | Ya, assigned outlet | Ringkasan operasional outlet | Ringkasan antrean | Tidak |
| Order list/detail/receipt | Ya | Ya | Ya | Terbatas untuk produksi | Tidak |
| Order baru/edit | Ya | Ya | Ya sesuai Domain Rules | Tidak | Tidak |
| Board produksi | Ya | Ya | Ya | Ya | Tidak |
| Customer list/detail | Ya | Ya | Ya | Tidak | Tidak |
| Payment ledger | Ya | Ya | Ya | Tidak | Tidak |
| Kas/tutup kas | Ya | Ya | Ya | Tidak | Tidak |
| Laporan | Lengkap semua outlet | Lengkap assigned outlet | Ringkasan shift/kas | Tidak | Tidak |
| Settings bisnis | Ya | Read; edit Opsional | Tidak | Tidak | Tidak |
| Settings outlet/staff/role | Ya | Opsional | Tidak | Tidak | Tidak |
| Settings layanan/harga | Ya | Ya | Tidak | Tidak | Tidak |
| Billing tenant | Ya | Opsional | Tidak | Tidak | Tidak |
| Area `/admin` | Tidak | Tidak | Tidak | Tidak | Ya |

## 3. Capability mutasi operasional

| Capability | Owner | Admin default | Cashier default | Operator default | Super Admin Platform |
| --- | --- | --- | --- | --- | --- |
| `customer.create_update` | Ya | Ya | Ya | Tidak | Tidak |
| `customer.archive` | Ya | Ya | Tidak | Tidak | Tidak |
| `order.create` | Ya | Ya | Ya | Tidak | Tidak |
| `order.edit_regular` | Ya | Ya | Ya | Tidak | Tidak |
| `order.status_forward` | Ya | Ya | Ya | Ya | Tidak |
| `payment.record` | Ya | Ya | Ya | Tidak | Tidak |
| `receipt.print_share` | Ya | Ya | Ya | Tidak | Tidak |
| `cash.open_close` | Ya | Ya | Ya | Tidak | Tidak |
| `cash.movement` | Ya | Ya | Ya | Tidak | Tidak |
| `service.manage` | Ya | Ya | Tidak | Tidak | Tidak |

Seluruh capability tenant di atas tetap dibatasi outlet assignment dan mode subscription.

## 4. Tindakan sensitif

| Capability sensitif | Owner | Admin default | Cashier default | Aturan |
| --- | --- | --- | --- | --- |
| `order.discount` | Ya | Ya | Tidak; Opsional | Maksimum konfigurasi 20%, alasan wajib |
| `order.cancel` | Ya | Ya | Tidak; Opsional | Sebelum state final, alasan dan payment resolution |
| `order.financial_correct` | Ya | Ya | Tidak | Atomic correction dan audit |
| `order.status_skip` | Ya | Ya | Tidak; Opsional | Seluruh item siap, alasan wajib |
| `order.status_rollback` | Ya | Ya | Tidak; Opsional | State non-final, alasan wajib |
| `order.handoff_with_balance` | Ya | Ya | Tidak; Opsional | Warning dan alasan wajib |
| `payment.void_reversal` | Ya | Ya | Tidak; Opsional | Reference payment dan alasan wajib |
| `payment.refund` | Ya | Ya | Tidak; Opsional | Refund penuh per payment dan alasan wajib |
| `cash.reopen` | Ya | Tidak; Opsional | Tidak | Reopen reason dan audit |
| `cash.review_variance` | Ya | Ya | Tidak | Tidak mengubah ledger |
| `organization.manage` | Ya | Tidak; Opsional | Tidak | Tidak dapat menonaktifkan Owner terakhir |
| `business.settings_edit` | Ya | Tidak; Opsional | Tidak | Tenant metadata saja |
| `billing.manage` | Ya | Tidak; Opsional | Tidak | Tetap tersedia saat read-only |

Owner tidak dapat menonaktifkan kontrol yang membuat tenant kehilangan seluruh Owner aktif. Pengguna tidak dapat memberi capability yang tidak ia miliki atau mengubah role Owner dirinya sendiri tanpa ownership-transfer flow.

## 5. Super Admin Platform

| Capability | Akses | Guardrail |
| --- | --- | --- |
| `platform.tenant_read` | Metadata tenant, subscription, entitlement usage | Tanpa customer/order/payment/kas |
| `platform.plan_manage` | Create version, edit label/harga/entitlement, archive | Plan terpakai tidak dihapus; confirmation dan audit |
| `platform.subscription_read` | Status, event, invoice minimum, usage | Data billing minimum |
| `platform.trial_compensate` | Tambah hari trial/subscription | Durasi, alasan, confirmation, audit |
| `platform.suspend_reactivate` | Manual suspend/reactivate | Alasan, state impact, manual override precedence |
| `platform.audit_read` | Audit Platform dan tindakan admin | Tidak memuat secret/data customer |
| Impersonation | Tidak | Tidak ada tombol, session, atau fallback impersonation |

## 6. Permission denied

- Navigasi yang tidak relevan disembunyikan, tetapi keamanan tetap ditegakkan server-side.
- Direct URL tanpa membership/capability menghasilkan halaman akses ditolak yang tidak mengungkap keberadaan tenant/resource.
- Jika pengguna boleh melihat halaman tetapi tidak boleh bermutasi, data tetap tampil dan CTA dinonaktifkan/disembunyikan dengan alasan yang dapat ditindaklanjuti.
- Kehilangan permission saat form terbuka membuat submit ditolak; data tenant lain tidak pernah dipertahankan atau ditampilkan.
- Super Admin dan tenant app memakai session/authorization boundary terpisah.

## 7. Perilaku tenant read-only

| Tindakan | Owner/Admin billing | Role tenant lain |
| --- | --- | --- |
| Membaca data yang sebelumnya diizinkan | Ya | Ya |
| Membuka billing dan memulai recovery | Ya | Tidak |
| Menutup sesi kas yang sudah aktif | Ya sesuai capability | Cashier pemilik sesi |
| Membuat order/payment/movement/resource baru | Tidak | Tidak |
| Mengubah status, edit, cancel, refund, atau reopen | Tidak | Tidak |

Banner read-only selalu menjelaskan penyebab dan jalur recovery. Server menolak mutasi walaupun CTA lama masih terbuka di browser.

Permintaan export selama masa retensi ditangani support terkontrol dan bukan capability atau layar self-service MVP.
