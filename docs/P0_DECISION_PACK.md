# P0 Decision Pack — Preparation Gate Wireframe

| Atribut | Nilai |
| --- | --- |
| Tujuan | Mempercepat persetujuan keputusan P0 sebelum wireframe |
| Sumber | `docs/PRD.md` dan `docs/OPEN_DECISIONS.md` |
| Status seluruh usulan | `PROPOSED` — belum menjadi keputusan final |
| Batas | Tidak mengubah status `TBD` pada dokumen sumber |

## Cara review

- **Safe defaults** dapat disetujui sekaligus karena terutama menjaga konsistensi UX, keamanan, atau scope MVP.
- **Keputusan bisnis** wajib dikonfirmasi satu per satu karena memengaruhi operasi outlet, uang, permission, atau model komersial.
- Override harus menyebut nilai pengganti. Persetujuan pack ini belum mengubah PRD atau status `TBD`; sinkronisasi dokumen dilakukan setelah jawaban Product Owner diterima.

## 1. Akun, tenant, role, dan outlet

### Safe defaults yang dapat disetujui sekaligus

#### P0-NAV-01 — Bentuk quick-create dan edit data pendukung
- **Default:** Pelanggan dibuat melalui modal/drawer yang mempertahankan draft order; CRUD outlet, layanan, dan pegawai memakai dialog/drawer pada route daftar yang sudah ada.
- **Alasan:** Menjaga target transaksi dua menit tanpa menambah route MVP.
- **Dampak wireframe:** Perlu state modal/drawer, kembali ke draft, loading, validation, dan error tanpa halaman baru.
- **Status:** `PROPOSED`

#### P0-ORG-01 — Lifecycle inti pegawai dan outlet
- **Default:** Gunakan status undangan `PENDING/EXPIRED/REVOKED`, membership dan outlet `ACTIVE/INACTIVE`; blokir penonaktifan Owner terakhir dan outlet yang masih memiliki order aktif.
- **Alasan:** Memberi lifecycle minimum tanpa hard delete atau approval engine.
- **Dampak wireframe:** Perlu status chip, resend/revoke, assignment, confirmation, dan blocker penonaktifan.
- **Status:** `PROPOSED`

### Keputusan bisnis yang wajib dikonfirmasi Product Owner

#### P0-AUTH-01 — Jalur masuk akun dan pemilihan tenant
- **Default:** Registrasi publik hanya untuk Owner; pegawai melalui undangan; email diverifikasi; masuk langsung untuk satu tenant dan tampilkan pemilih untuk beberapa tenant.
- **Alasan:** Jalur kasir/operator tetap singkat dan membership tidak dapat diperoleh bebas.
- **Dampak wireframe:** Perlu state verifikasi, penerimaan undangan, tanpa membership, serta pemilih tenant kondisional.
- **Status:** `PROPOSED`

#### P0-ONB-01 — Syarat onboarding dan waktu mulai trial
- **Default:** Template atau satu layanan custom; `tenantSlug` otomatis; hanya nama outlet wajib; minimal satu layanan aktif; trial mulai setelah onboarding selesai.
- **Alasan:** Setup tetap cepat dan masa trial tidak habis saat konfigurasi belum siap.
- **Dampak wireframe:** Perlu cabang template/custom, validasi minimum, preview slug, resume, dan ringkasan aktivasi trial.
- **Status:** `PROPOSED`

#### P0-PERM-01 — Matriks capability role MVP
- **Default:** Preset capability dengan toggle terbatas untuk billing Admin, pengelolaan outlet/pegawai, diskon, cancel, refund/void, rollback, dan penyerahan berpiutang; tanpa full custom-role builder.
- **Alasan:** Menjaga capability-based access tanpa memperluas MVP menjadi permission engine generik.
- **Dampak wireframe:** Navigasi, CTA, disabled/denied state, dan halaman role harus mengikuti matriks per capability.
- **Status:** `PROPOSED`

#### P0-OUTLET-01 — Konteks outlet pada navigasi dan transaksi
- **Default:** Satu outlet aktif di app shell; agregasi semua outlet hanya pada dashboard/laporan berizin; transaksi tetap di outlet asal.
- **Alasan:** Mengurangi salah konteks dan menjaga audit serta rekonsiliasi sederhana.
- **Dampak wireframe:** Perlu outlet switcher persisten, label outlet transaksi, dan opsi Semua outlet hanya pada layar agregat.
- **Status:** `PROPOSED`

## 2. Pelanggan, layanan, harga, dan diskon

### Safe defaults yang dapat disetujui sekaligus

#### P0-SRV-01 — Jenis layanan yang tampil pada MVP
- **Default:** Dukung layanan kiloan dan satuan sebagai model generik; tanpa workflow dry cleaning khusus.
- **Alasan:** Selaras dengan requirement PRD tanpa menambah workflow baru.
- **Dampak wireframe:** Form layanan dan item order memiliki pilihan unit kilogram/satuan saja.
- **Status:** `PROPOSED`

#### P0-PRICE-01 — Harga default dan override outlet
- **Default:** Harga default tenant diwariskan; outlet dapat memiliki override eksplisit dan kembali ke default bila override dihapus.
- **Alasan:** Mempercepat setup multi-outlet sekaligus mendukung harga cabang.
- **Dampak wireframe:** Perlu label harga turunan, input override, aksi kembali ke default, dan sumber harga pada POS.
- **Status:** `PROPOSED`

### Keputusan bisnis yang wajib dikonfirmasi Product Owner

#### P0-CUS-01 — Scope pelanggan dan nomor HP duplikat
- **Default:** Nama wajib, HP opsional dan dinormalisasi ke `+62`; pelanggan tenant-wide; nomor sama menghasilkan warning; riwayat tetap dibatasi permission outlet.
- **Alasan:** Mendukung pelanggan lintas cabang tanpa menambah setting tenant.
- **Dampak wireframe:** Perlu helper format HP, hasil pencarian duplikat, warning non-blocking, dan state riwayat terbatas.
- **Status:** `PROPOSED`

#### P0-CALC-01 — Kuantitas, minimum charge, dan pembulatan rupiah
- **Default:** Berat maksimal dua desimal, jumlah satuan integer, kuantitas tertagih memakai nilai maksimum aktual/minimum, dan pecahan uang dibulatkan half-up per subtotal item serta komponen persen.
- **Alasan:** Membuat kalkulasi POS, nota, dan backend dapat direkonsiliasi.
- **Dampak wireframe:** Perlu input sesuai unit, pembeda kuantitas aktual/tertagih, helper minimum, dan live total integer rupiah.
- **Status:** `PROPOSED`

#### P0-CALC-02 — Express, surcharge, dan estimasi selesai
- **Default:** Express pada level order; seluruh item wajib eligible; surcharge persen dihitung per item; ETA memakai item paling lama.
- **Alasan:** Paling cepat untuk kasir dan tidak menambah konfigurasi express per item.
- **Dampak wireframe:** Perlu satu toggle express, validasi item tidak eligible, rincian surcharge, dan ETA order.
- **Status:** `PROPOSED`

#### P0-DISC-01 — Aturan diskon
- **Default:** Diskon nominal atau persen pada level order; Owner/Admin aktif default, Cashier melalui capability; maksimal 20%, tanpa stacking, dan alasan selalu wajib.
- **Alasan:** Cukup fleksibel tanpa mesin promosi atau approval bertingkat.
- **Dampak wireframe:** Perlu pemilih tipe diskon, indikator limit, field alasan, denied state, dan ringkasan total.
- **Status:** `PROPOSED`

## 3. Pesanan, produksi, pembayaran, nota, dan kas

### Safe defaults yang dapat disetujui sekaligus

#### P0-PAY-03 — Tujuan halaman pembayaran
- **Default:** `/payments` menjadi ledger dengan filter sisa tagihan; seluruh mutasi pembayaran tetap dimulai dari detail order.
- **Alasan:** Menjaga satu sumber mutasi dan mendukung rekonsiliasi serta penagihan.
- **Dampak wireframe:** Halaman berfokus pada pencarian/filter dan drill-down, bukan form pembayaran mandiri.
- **Status:** `PROPOSED`

#### P0-RCP-01 — Permukaan berbagi nota
- **Default:** Gunakan browser print serta Web Share/download dari session pengguna; tanpa public link pada MVP.
- **Alasan:** Memenuhi berbagi sederhana dengan risiko kebocoran dan scope backend lebih kecil.
- **Dampak wireframe:** Perlu CTA Cetak/Bagikan/Unduh dan failure state lokal; tidak perlu layar token publik.
- **Status:** `PROPOSED`

### Keputusan bisnis yang wajib dikonfirmasi Product Owner

#### P0-ORD-01 — Format kode pesanan dan nomor nota
- **Default:** Kode order sekaligus nomor nota memakai `[OUTLET]-[YYMMDD]-[####]`, sequence reset per outlet per hari; contoh `JKT-260807-0042`.
- **Alasan:** Mudah disebut, dicari, dicetak, dan mengidentifikasi cabang tanpa ID internal.
- **Dampak wireframe:** Menentukan lebar kolom, header nota, pencarian, serta contoh data.
- **Status:** `PROPOSED`

#### P0-STATE-01 — Status awal dan transisi produksi
- **Default:** Mulai dari `RECEIVED`, jalur normal linear hingga `READY`; skip ke depan hanya dengan capability, alasan, dan audit; rollback juga memerlukan capability dan alasan.
- **Alasan:** Menjaga workflow standar sambil menangani layanan yang dapat melewati tahap.
- **Dampak wireframe:** Board dan detail memerlukan CTA per transisi, aksi Lewati tahap, rollback, confirmation, dan histori.
- **Status:** `PROPOSED`

#### P0-ORD-02 — Edit, koreksi, dan pembatalan pesanan
- **Default:** Edit penuh hanya saat `RECEIVED` tanpa pembayaran; setelah bayar/proses hanya catatan dan ETA bebas; koreksi finansial wajib menyelesaikan reversal/refund; cancel hanya sebelum status final.
- **Alasan:** Mencegah total baru bertentangan dengan payment dan menjaga histori transaksi.
- **Dampak wireframe:** Field berubah menurut state; perlu flow koreksi terpandu, impact summary, alasan, refund handoff, dan terminal state.
- **Status:** `PROPOSED`

#### P0-HANDOFF-01 — Pelunasan dan penyerahan
- **Default:** `READY` berarti produksi selesai dan `COMPLETED` berarti diserahkan; penyerahan berpiutang boleh dengan capability/alasan; nama penerima opsional dan timestamp wajib.
- **Alasan:** Memisahkan antrean siap diambil dari serah-terima sambil mendukung piutang nyata.
- **Dampak wireframe:** Perlu CTA lunasi/serahkan, warning piutang, override berizin, field penerima, dan confirmation.
- **Status:** `PROPOSED`

#### P0-PAY-01 — Pencatatan pembayaran awal dan field per metode
- **Default:** Draft order dan pembayaran awal dikonfirmasi konsisten; tunai mencatat nominal diterapkan, uang diterima, dan kembalian; transfer/QRIS memakai reference opsional; metode lainnya memakai label wajib.
- **Alasan:** Sesuai kebiasaan kasir Indonesia tanpa menambah saldo pelanggan.
- **Dampak wireframe:** Perlu langkah pembayaran dalam flow order, field kondisional per metode, summary, dan atomic error state.
- **Status:** `PROPOSED`

#### P0-PAY-02 — Void, refund, cancel, dan status pembayaran
- **Default:** Void sebelum periode ditutup; late reversal setelah tutup; refund hanya saat dana dikembalikan; payment asal tidak dihapus. CashMovement lawan hanya untuk tunai, sedangkan non-tunai dikoreksi pada ledger/audit.
- **Alasan:** Menjaga ledger order dan kas tetap sinkron serta dapat diaudit.
- **Dampak wireframe:** Perlu action berbeda untuk void/reversal/refund, alasan, confirmation, status chip, dan reference koreksi.
- **Status:** `PROPOSED`

#### P0-CASH-01 — Model sesi dan tutup kas
- **Default:** Satu sesi per kasir, outlet, dan shift; saldo awal serta expected cash dihitung dari transaksi tunai. Selisih langsung final dengan alasan dan flag review, tanpa pending approval; reopen berizin dan teraudit.
- **Alasan:** Cocok untuk multi-kasir dan tetap sederhana untuk MVP.
- **Dampak wireframe:** Perlu buka/tutup sesi, ringkasan expected cash, input fisik, selisih, alasan, review flag, dan reopen state.
- **Status:** `PROPOSED`

## 4. Dashboard dan laporan

### Keputusan bisnis yang wajib dikonfirmasi Product Owner

#### P0-REP-01 — Metrik utama dashboard dan laporan
- **Default:** Pisahkan `Nilai Pesanan`, `Pembayaran Diterima`, dan `Piutang`; metrik operasional PRD lainnya tetap tampil.
- **Alasan:** Menghindari istilah omzet yang ambigu pada DP, bayar nanti, void, dan refund.
- **Dampak wireframe:** Menentukan tiga kartu finansial, hierarchy dashboard, kolom laporan, dan drill-down rekonsiliasi.
- **Status:** `PROPOSED`

## 5. Subscription

### Keputusan bisnis yang wajib dikonfirmasi Product Owner

#### P0-SUB-01 — Struktur perbandingan paket dan entitlement
- **Default:** Tampilkan tepat tiga tier placeholder: Starter, Growth, dan Multi-Outlet; bandingkan outlet, pegawai, volume order, serta level laporan; seluruh angka tetap `TBD`.
- **Alasan:** Cukup untuk menguji hierarchy dan upgrade tanpa mengunci harga atau limit pilot.
- **Dampak wireframe:** Menentukan tiga kartu paket, tabel perbandingan, usage meter, limit state, dan CTA upgrade.
- **Status:** `PROPOSED`

#### P0-SUB-02 — Matriks akses berdasarkan status subscription
- **Default:** `TRIALING/ACTIVE` aktif; `PAST_DUE` aktif selama grace dengan banner; `SUSPENDED/CANCELED` read-only; Owner dan Admin ber-capability billing tetap dapat membuka billing.
- **Alasan:** Transparan, tidak menghapus data, dan memberi jalur pemulihan subscription.
- **Dampak wireframe:** Perlu banner status, app-wide read-only, disabled mutation, billing exception, serta recovery CTA.
- **Status:** `PROPOSED`

## 6. Super admin dan scope MVP

### Safe defaults yang dapat disetujui sekaligus

#### P0-ADM-02 — Batas data tenant yang terlihat oleh Super Admin
- **Default:** Super Admin hanya melihat metadata bisnis, status subscription, penggunaan entitlement, dan audit tindakan admin; tanpa data pelanggan/order.
- **Alasan:** Memenuhi kebutuhan dukungan dengan prinsip minimisasi data dan tanpa impersonation.
- **Dampak wireframe:** Daftar/detail tenant tidak memiliki drill-down ke data operasional pelanggan.
- **Status:** `PROPOSED`

#### P0-SCOPE-01 — Cakupan pickup/delivery dan Courier
- **Default:** Tidak ada workflow atau layar pickup/delivery khusus; preset Courier belum aktif pada pilot sampai PRD memiliki requirement terkait.
- **Alasan:** Mencegah entitlement placeholder memperluas MVP menjadi modul delivery.
- **Dampak wireframe:** Tidak membuat board/route Courier atau field pickup/delivery; state akses Courier tetap nonaktif.
- **Status:** `PROPOSED`

### Keputusan bisnis yang wajib dikonfirmasi Product Owner

#### P0-ADM-01 — Batas pengelolaan paket oleh Super Admin
- **Default:** Super Admin dapat mengubah terbatas nama/label, status, harga tampilan, dan entitlement PRD; plan yang pernah dipakai hanya dapat diarsipkan.
- **Alasan:** Memenuhi pengelolaan paket tanpa commercial engine lengkap.
- **Dampak wireframe:** `/admin/plans` memerlukan list/detail, form terbatas, archive, confirmation, dan audit feedback.
- **Status:** `PROPOSED`

#### P0-ADM-03 — Trial extension, kompensasi, suspend, dan reactivate
- **Default:** Kompensasi berupa tambahan hari trial/subscription; alasan wajib; suspend/reactivate dikonfirmasi; manual suspend berlaku sampai reactivation eksplisit.
- **Alasan:** Memberi alat support tanpa monetary credit atau approval bertingkat.
- **Dampak wireframe:** Detail tenant memerlukan action menu, durasi, alasan terstruktur, confirmation, dan histori state.
- **Status:** `PROPOSED`

## Gate persetujuan

Wireframe belum boleh dimulai sampai seluruh keputusan bisnis dikonfirmasi, safe defaults disetujui atau dioverride, dan hasilnya kemudian disinkronkan ke PRD, `OPEN_DECISIONS.md`, `USER_FLOWS.md`, serta `SCREEN_MAP.md` melalui tugas terpisah.
