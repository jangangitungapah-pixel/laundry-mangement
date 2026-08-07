# Audit PRD dan Keputusan Terbuka — Laundry Management SaaS MVP

| Atribut | Nilai |
| --- | --- |
| Status dokumen | Draft untuk validasi produk |
| Sumber utama | `docs/PRD.md` versi 0.1, 7 Agustus 2026 |
| Pasar awal | Laundry skala kecil dan menengah di Indonesia |
| Prinsip | Frontend-first, SaaS multi-tenant, scope MVP tetap |

Dokumen ini mencatat hasil audit PRD dan pertanyaan yang belum mempunyai keputusan final. Semua rekomendasi di bawah adalah usulan untuk mempercepat diskusi, **bukan keputusan produk**. Selama status masih `TBD`, user flow, wireframe, fixture, dan frontend tidak boleh mengunci salah satu opsi secara diam-diam.

## Ringkasan audit PRD

### Requirement yang bertentangan atau belum selaras

| ID audit | Temuan | Dampak | Penanganan |
| --- | --- | --- | --- |
| AUD-01 | Nama file awal bukan `docs/PRD.md`, dan PRD bagian 24 menempatkan `AGENTS.md` setelah dokumen implementasi, sedangkan instruksi fondasi menetapkan urutan `PRD -> User Flows -> Screen Map -> Wireframes -> Design System -> Frontend`. | Sumber keputusan dan gate kerja dapat ambigu. | Path dan bagian 24 diselaraskan berdasarkan instruksi eksplisit tugas ini. Ini perubahan tata kelola, bukan keputusan produk terbuka. |
| AUD-02 | PRD bagian 22 masih menanyakan fokus kiloan atau langsung satuan/dry cleaning, tetapi `SRV-01` dan `ORD-02` sudah mewajibkan layanan kiloan dan satuan. | Field layanan, item pesanan, fixture, dan scope pengujian tidak pasti. | Putuskan melalui `P0-SRV-01`; jangan menambah workflow dry cleaning khusus tanpa requirement. |
| AUD-03 | Journey onboarding mengizinkan template atau layanan buatan sendiri, sedangkan `ONB-03` hanya menyatakan pemilihan template. | Cabang onboarding dan syarat selesai tidak pasti. | Putuskan melalui `P0-ONB-01`. |
| AUD-04 | Acceptance criteria menyebut payment dan subscription webhook, tetapi pembayaran pelanggan laundry bersifat manual dan payment gateway pelanggan secara eksplisit bukan MVP. | Dapat menyelundupkan payment gateway pelanggan ke MVP. | Klarifikasi melalui `P2-INT-02`; sampai diputuskan, hanya webhook provider billing subscription yang diakui. |
| AUD-05 | Role Courier dan entitlement pickup/delivery tersedia, tetapi tidak ada requirement, entitas, route, atau flow operasional pickup/delivery. Hanya optimasi rute yang jelas dikeluarkan dari MVP. | Screen map dapat melebar menjadi modul delivery tanpa batas yang jelas. | Putuskan melalui `P0-SCOPE-01`; jangan membuat layar khusus Courier/pickup/delivery dahulu. |
| AUD-06 | Scope dan route `/admin/plans` mengisyaratkan pengelolaan paket, tetapi `ADM-01`–`ADM-06` tidak mendefinisikan operasi paket atau entitlement. | Primary action dan tingkat risiko halaman paket tidak jelas. | Putuskan melalui `P0-ADM-01`. |
| AUD-07 | Audit log diwajibkan untuk tindakan tenant, tetapi route audit log hanya tersedia di area super admin. | Tidak jelas apakah owner memerlukan layar audit tenant atau cukup histori per entitas. | Putuskan melalui `P1-AUD-01`; jangan menambah route audit tenant sebelum ada requirement. |
| AUD-08 | Reliability menyebut kegagalan notification, tetapi functional requirements tidak mendefinisikan notification center atau notifikasi pelanggan. | Berpotensi menambah email/WhatsApp/notifikasi aplikasi di luar scope. | Perlakukan sebagai prinsip backend hingga `P2-NOTIF-01` diputuskan. |

### Aturan bisnis yang belum cukup jelas

| Area | Ketidakjelasan utama | Keputusan terkait |
| --- | --- | --- |
| Akses akun | Verifikasi email, penerimaan undangan, pengguna tanpa membership, dan tujuan login multi-tenant. | `P0-AUTH-01`, `P1-AUTH-02` |
| Onboarding | Syarat langkah layanan, waktu mulai trial, resume, dan akses tenant yang belum selesai. | `P0-ONB-01` |
| Permission/navigasi | Arti setiap sel `Terbatas`/`Opsional`, capability role preset, lifecycle pegawai, hak lintas outlet, dan bentuk quick-create. | `P0-PERM-01`, `P0-OUTLET-01`, `P0-NAV-01`, `P0-ORG-01` |
| Pelanggan | Field wajib, scope tenant/outlet, normalisasi nomor HP Indonesia, default duplikasi, dan arsip. | `P0-CUS-01`, `P1-CUS-02` |
| Layanan/harga | Unit MVP, pewarisan harga, minimum charge, pembulatan, express, surcharge, dan ETA banyak item. | `P0-SRV-01`, `P0-PRICE-01`, `P0-CALC-01`, `P0-CALC-02` |
| Pesanan | Kode/nota, diskon, status awal, transisi legal, edit, cancel, rollback, serah-terima, dan definisi terlambat. | `P0-ORD-01`, `P0-ORD-02`, `P0-DISC-01`, `P0-STATE-01`, `P0-HANDOFF-01`, `P1-ORD-03` |
| Pembayaran | Flow pembayaran awal, uang diterima/kembalian, reference manual, void versus refund, partial refund, dan tujuan ledger. | `P0-PAY-01`, `P0-PAY-02`, `P0-PAY-03`, `P1-PAY-04` |
| Nota | Cara berbagi dari browser atau tautan pelanggan, serta keamanan link bila dipilih. | `P0-RCP-01`, `P1-RCP-02` |
| Penyerahan | Makna `READY`/`COMPLETED` dan apakah pesanan berpiutang boleh diserahkan. | `P0-HANDOFF-01` |
| Kas | Perlu buka kas atau tidak, scope sesi, saldo awal, expected cash, selisih, approval, dan reopen. | `P0-CASH-01` |
| Laporan | Metrik yang tampil, definisi omzet/piutang/rata-rata transaksi, basis tanggal, refund/void, cutoff, dan drill-down. | `P0-REP-01`, `P1-REP-02` |
| Organisasi | Lifecycle undangan, owner terakhir, outlet nonaktif, assignment, dan batas entitlement. | `P0-PERM-01`, `P0-OUTLET-01`, `P0-ORG-01`, `P1-ORG-02` |
| Subscription | Struktur paket, trial, grace period, matriks status akses, upgrade/downgrade, over-limit, dan tagihan. | `P0-ONB-01`, `P0-SUB-01`, `P0-SUB-02`, `P1-SUB-03`, `P2-LIMIT-01` |
| Super admin | Operasi paket, batas data tenant, kompensasi, approval, dan konflik suspend dengan webhook. | `P0-ADM-01`, `P0-ADM-02`, `P0-ADM-03` |

### Keputusan yang langsung memengaruhi user flow atau wireframe

Semua keputusan `P0` di bawah mengubah navigasi, langkah, field, CTA, status, confirmation dialog, atau permission-denied/read-only state. Karena itu, seluruh `P0` wajib dijawab sebelum wireframe dimulai. Keputusan `P1` boleh memakai placeholder `TBD` pada low-fidelity wireframe, tetapi wajib final sebelum frontend dinyatakan selesai. Keputusan `P2` tidak boleh memblokir frontend mock selama adapter dan batas scope dijaga.

### Guardrail scope MVP

Sampai PRD diperbarui secara eksplisit, dokumen turunan tidak boleh menambahkan:

- payment gateway untuk pembayaran pelanggan laundry atau webhook pembayaran pelanggan;
- WhatsApp Business API otomatis, notification center, atau kampanye pelanggan;
- workflow pickup/delivery khusus, optimasi rute, atau layar Courier khusus;
- workflow produksi kustom per tenant;
- offline transaction queue, aplikasi native, atau integrasi printer native;
- inventory, payroll, absensi, loyalty, akuntansi lengkap, pajak/invoice engine, atau proration engine kompleks;
- public API, export/BI lanjutan, custom domain, atau impersonation super admin;
- full custom-role builder atau halaman audit tenant baru tanpa requirement yang disetujui.

Multi-outlet, subscription, super admin, print thermal browser, dan PWA dasar tetap bagian MVP karena sudah eksplisit di PRD.

## P0 — Wajib diputuskan sebelum wireframe

### P0-AUTH-01 — Jalur masuk akun dan pemilihan tenant

- **Pertanyaan:** Apakah registrasi hanya untuk calon Owner, apakah email harus diverifikasi sebelum akses tenant, bagaimana pegawai menerima undangan, dan ke mana pengguna diarahkan setelah login bila memiliki nol, satu, atau beberapa membership aktif?
- **Pengaruh terhadap produk:** Menentukan layar verifikasi/undangan, route autentikasi tambahan, pemilih tenant, redirect, app shell, empty state, dan permission-denied state pertama pengguna.
- **Opsi yang tersedia:**
  1. Semua pengguna dapat registrasi bebas tanpa verifikasi lalu mencari tenant.
  2. Registrasi publik hanya membuat Owner; pegawai wajib melalui undangan; email diverifikasi; tenant selalu dipilih setelah login.
  3. Registrasi publik hanya membuat Owner; pegawai melalui undangan; email diverifikasi sebelum akses tenant; langsung masuk bila tepat satu tenant dan tampilkan pemilih bila lebih dari satu.
- **Rekomendasi:** Opsi 3; pengguna tanpa membership aktif diarahkan ke onboarding jika ia calon Owner, atau ke state tanpa akses jika akun berasal dari jalur lain.
- **Alasan rekomendasi:** Paling sederhana untuk kasir/operator, mendukung `AUTH-06`, dan tidak membuat akun bebas memperoleh akses tenant.
- **Referensi PRD:** `AUTH-01`, `AUTH-05`, `AUTH-06`, `ONB-01`, `ORG-02`.
- **Status:** `TBD`

### P0-ONB-01 — Syarat onboarding dan waktu mulai trial

- **Pertanyaan:** Apakah langkah layanan wajib memakai template atau boleh membuat layanan sendiri, field outlet apa yang wajib, bagaimana `tenantSlug` ditentukan, dan kapan trial mulai dihitung?
- **Pengaruh terhadap produk:** Menentukan field dan cabang onboarding, validasi halaman selesai, URL tenant, resume progress, dan durasi trial efektif.
- **Opsi yang tersedia:**
  1. Template wajib, `tenantSlug` diisi manual, nama/alamat/kontak outlet wajib, dan trial mulai saat tenant dibuat.
  2. Template atau satu layanan custom, `tenantSlug` dibuat otomatis, hanya nama outlet wajib, dan trial mulai saat tenant dibuat.
  3. Seperti opsi 2, tetapi trial mulai saat onboarding berhasil diselesaikan.
- **Rekomendasi:** Opsi 3, dengan minimal satu layanan aktif sebelum onboarding selesai; `tenantSlug` dibuat dari nama bisnis dan diberi suffix bila bentrok, sedangkan alamat/kontak outlet tetap opsional pada MVP.
- **Alasan rekomendasi:** Tetap cepat melalui template, memenuhi journey yang mengizinkan layanan sendiri, dan tidak menghabiskan trial ketika setup belum siap.
- **Referensi PRD:** `ONB-01`–`ONB-05`, `SRV-01`–`SRV-04`, bagian 9.1.
- **Status:** `TBD`

### P0-PERM-01 — Matriks capability role MVP

- **Pertanyaan:** Capability default apa yang dimiliki Owner, Admin, Cashier, Operator, dan Courier; capability mana yang dapat diubah; apakah `/settings/roles` hanya menampilkan preset atau mengizinkan custom role?
- **Pengaruh terhadap produk:** Menentukan navigasi per role, CTA, field yang dapat diubah, route yang terlihat, dan semua permission-denied state.
- **Opsi yang tersedia:**
  1. Preset role tetap mengikuti tabel PRD tanpa toggle; seluruh sel `Terbatas`/`Opsional` harus diganti dengan matriks eksplisit terpisah.
  2. Preset memakai matriks rekomendasi di bawah, dengan toggle terbatas untuk tindakan sensitif dan akses Admin.
  3. Full custom-role builder.
- **Rekomendasi:** Opsi 2 dengan baseline berikut; toggle terbatas mencakup billing Admin, pengelolaan outlet/pegawai oleh Admin, diskon, cancel, refund/void, rollback status, dan penyerahan berpiutang.

  | Area capability | Owner | Admin default | Cashier default | Operator default | Courier default |
  | --- | --- | --- | --- | --- | --- |
  | Dashboard | Lengkap | Outlet yang ditugaskan | Operasional outlet | Ringkasan antrean | Tidak |
  | Pelanggan dan pesanan | Lengkap | Lengkap pada outlet tugas | Buat/ubah sesuai state pada outlet tugas | Baca minimum untuk produksi | Tidak sampai `P0-SCOPE-01` disetujui |
  | Status produksi | Ya | Ya | Ya pada outlet tugas | Ya pada outlet tugas | Tidak sampai `P0-SCOPE-01` disetujui |
  | Pembayaran dan kas | Ya | Ya | Ya pada outlet tugas | Tidak | Tidak |
  | Layanan dan harga | Ya | Ya | Tidak | Tidak | Tidak |
  | Laporan lengkap | Ya | Outlet yang ditugaskan | Tidak; hanya ringkasan shift/kas | Tidak | Tidak |
  | Outlet, pegawai, dan role | Ya | Off secara default; toggle terbatas | Tidak | Tidak | Tidak |
  | Billing Platform | Ya | Off secara default; toggle khusus | Tidak | Tidak | Tidak |

- **Alasan rekomendasi:** Memenuhi prinsip capability-based tanpa membawa kompleksitas full role engine ke MVP.
- **Referensi PRD:** bagian 6, `ORG-03`–`ORG-06`, route `/settings/roles`.
- **Status:** `TBD`

### P0-OUTLET-01 — Konteks outlet pada navigasi dan transaksi

- **Pertanyaan:** Apakah aplikasi memakai satu outlet aktif global, kapan opsi `Semua outlet` tersedia, dan apakah transaksi dapat dibuat, diproses, dibayar, atau diserahkan di outlet berbeda?
- **Pengaruh terhadap produk:** Menentukan app shell, filter persistent, data dashboard/laporan, assignment pegawai, dan konteks setiap mutasi.
- **Opsi yang tersedia:**
  1. Seluruh halaman selalu meminta outlet.
  2. Satu outlet aktif pada app shell; agregasi semua outlet hanya untuk dashboard/laporan berizin; transaksi tetap pada outlet asal.
  3. Transaksi dapat berpindah outlet selama proses.
- **Rekomendasi:** Opsi 2; perpindahan transaksi antar-outlet tidak termasuk MVP kecuali PRD diperbarui.
- **Alasan rekomendasi:** Mengurangi salah konteks di kasir, tetap mendukung owner multi-outlet, dan menjaga audit/rekonsiliasi sederhana.
- **Referensi PRD:** `AUTH-06`, `PRD-02`, `REP-02`, `ORG-01`, `ORG-03`, `ORG-05`.
- **Status:** `TBD`

### P0-NAV-01 — Bentuk quick-create dan edit data pendukung

- **Pertanyaan:** Apakah membuat pelanggan dari order serta membuat/mengubah outlet, layanan, dan pegawai menggunakan route penuh, modal/drawer, atau form in-page?
- **Pengaruh terhadap produk:** Menentukan screen map turunan, persistensi draft order, tombol kembali, fokus mobile, loading/error state, dan jumlah wireframe.
- **Opsi yang tersedia:**
  1. Semua tindakan memakai route penuh terpisah.
  2. Pelanggan memakai modal/drawer quick-create yang mempertahankan draft order; CRUD settings memakai dialog/drawer pada route daftar yang sudah ada.
  3. Semua tindakan inline di halaman tanpa permukaan terpisah.
- **Rekomendasi:** Opsi 2; form pelanggan juga dapat dibuka dari daftar pelanggan dengan komponen yang sama.
- **Alasan rekomendasi:** Mempertahankan target transaksi dua menit dan menghindari penambahan route yang belum ada di PRD.
- **Referensi PRD:** `CUS-01`, `ORD-01`, `ORG-01`, `ORG-02`, route settings bagian 8.3.
- **Status:** `TBD`

### P0-ORG-01 — Lifecycle inti pegawai dan outlet

- **Pertanyaan:** Status apa yang tampil untuk undangan/membership dan outlet, aksi utama apa yang tersedia, serta guardrail apa yang berlaku untuk Owner terakhir dan outlet dengan pesanan aktif?
- **Pengaruh terhadap produk:** Menentukan chip status, tab/filter, primary action, confirmation dialog, blocker, dan route penerimaan undangan pada flow pengelolaan pegawai/outlet.
- **Opsi yang tersedia:**
  1. Hanya `ACTIVE`/`INACTIVE`; undangan tidak mempunyai status yang terlihat; outlet selalu aktif.
  2. Undangan `PENDING/EXPIRED/REVOKED`, membership `ACTIVE/INACTIVE`, outlet `ACTIVE/INACTIVE`, dengan blocker Owner terakhir dan order aktif.
  3. Lifecycle approval bertingkat dan penghapusan permanen.
- **Rekomendasi:** Opsi 2; sediakan undang, kirim ulang, cabut undangan, ubah role/assignment, nonaktifkan membership, dan aktif/nonaktifkan outlet. Owner terakhir tidak boleh dinonaktifkan. Outlet dengan pesanan aktif tidak dapat dinonaktifkan sampai seluruh order mencapai status final; perpindahan order antar-outlet tidak termasuk MVP sesuai `P0-OUTLET-01`.
- **Alasan rekomendasi:** Memberi state minimum yang dapat dipahami tanpa hard delete atau approval engine kompleks.
- **Referensi PRD:** `ORG-01`–`ORG-06`, `AUTH-05`, `AUTH-06`.
- **Status:** `TBD`

### P0-SRV-01 — Jenis layanan yang tampil pada MVP

- **Pertanyaan:** Apakah UI MVP mendukung kiloan saja, kiloan dan satuan generik, atau juga workflow khusus dry cleaning?
- **Pengaruh terhadap produk:** Menentukan pilihan unit, field kuantitas, template layanan, fixture, dan acceptance test form pesanan.
- **Opsi yang tersedia:**
  1. Kiloan saja.
  2. Kiloan dan satuan sebagai model generik.
  3. Kiloan, satuan, dan workflow dry cleaning khusus.
- **Rekomendasi:** Opsi 2.
- **Alasan rekomendasi:** Konsisten dengan `SRV-01` dan `ORD-02`, melayani laundry Indonesia yang umum menerima item satuan, serta tidak menambah workflow khusus yang belum dirinci.
- **Referensi PRD:** `SRV-01`, `ORD-02`, bagian 22 butir 2.
- **Status:** `TBD`

### P0-CUS-01 — Scope pelanggan dan nomor HP duplikat

- **Pertanyaan:** Field pelanggan apa yang wajib, bagaimana nomor HP Indonesia dinormalisasi, apakah satu pelanggan digunakan lintas outlet, riwayat apa yang terlihat oleh pegawai outlet, dan apakah nomor sama diperingatkan atau diblokir?
- **Pengaruh terhadap produk:** Menentukan form pelanggan, pencarian POS, hasil duplikasi, detail riwayat, permission, dan data model mock.
- **Opsi yang tersedia:**
  1. Nama dan HP wajib; nomor disimpan apa adanya; pelanggan hanya milik satu outlet; duplikasi diblokir.
  2. Nama wajib, HP opsional; bila diisi dinormalisasi untuk pencarian ke format `+62`; pelanggan tenant-wide; nomor sama menghasilkan warning; riwayat dibatasi permission outlet.
  3. Field, scope, dan aturan duplikasi dapat dikonfigurasi tenant.
- **Rekomendasi:** Opsi 2; tampilan nomor tetap ramah format lokal Indonesia meskipun nilai pencarian dinormalisasi.
- **Alasan rekomendasi:** Selaras dengan entitas `Customer` dalam scope tenant, memudahkan pelanggan yang datang ke cabang lain, dan menghindari settings tambahan di MVP.
- **Referensi PRD:** `CUS-01`–`CUS-04`, `ORG-05`, bagian 22 butir 3.
- **Status:** `TBD`

### P0-PRICE-01 — Harga default dan override outlet

- **Pertanyaan:** Apakah layanan mempunyai harga default tenant yang diwariskan ke outlet, dan apa yang terjadi bila override outlet belum diisi atau dihapus?
- **Pengaruh terhadap produk:** Menentukan struktur halaman layanan, form outlet, sumber harga POS, label fallback, dan validasi onboarding.
- **Opsi yang tersedia:**
  1. Harga wajib diisi untuk setiap outlet.
  2. Harga default tenant diwariskan dengan override outlet eksplisit.
  3. Seluruh layanan dan harga bersifat outlet-local.
- **Rekomendasi:** Opsi 2.
- **Alasan rekomendasi:** Sesuai keberadaan `OutletServicePrice`, mempercepat setup multi-outlet, dan tetap mendukung perbedaan harga cabang.
- **Referensi PRD:** `SRV-02`, `SRV-05`, bagian 22 butir 5.
- **Status:** `TBD`

### P0-CALC-01 — Kuantitas, minimum charge, dan pembulatan rupiah

- **Pertanyaan:** Berapa presisi berat, apakah jumlah satuan wajib integer, apakah minimum menjadi validasi atau minimum charge, dan bagaimana hasil perkalian/persentase yang menghasilkan pecahan rupiah dibulatkan?
- **Pengaruh terhadap produk:** Menentukan input kuantitas, helper/error text, nilai yang disimpan, live subtotal, diskon/surcharge, total integer rupiah, dan isi nota.
- **Opsi yang tersedia:**
  1. Minimum hanya validasi; transaksi di bawah minimum ditolak; tidak ada pembulatan.
  2. Simpan berat aktual hingga dua desimal, jumlah satuan integer, hitung `billable quantity = max(actual, minimum)`, lalu bulatkan half-up ke rupiah terdekat pada subtotal setiap item serta komponen surcharge/diskon persen sebelum total dijumlahkan.
  3. Presisi, langkah pembulatan, minimum, dan metode pembulatan uang dapat dikonfigurasi per tenant.
- **Rekomendasi:** Opsi 2; UI membedakan berat aktual dari kuantitas tertagih dan kalkulator memakai decimal arithmetic agar hasil mock/backend identik.
- **Alasan rekomendasi:** Perhitungan dapat direkonsiliasi, nota tetap jujur terhadap hasil timbang, dan tidak menambah settings pembulatan kompleks.
- **Referensi PRD:** `SRV-03`, `ORD-02`, `ORD-03`, bagian 11.2.
- **Status:** `TBD`

### P0-CALC-02 — Express, surcharge, dan estimasi selesai

- **Pertanyaan:** Apakah express berlaku per pesanan atau item, bagaimana surcharge dihitung, bagaimana layanan yang tidak eligible ditangani, dan ETA apa yang dipakai untuk banyak item?
- **Pengaruh terhadap produk:** Menentukan lokasi toggle, state item campuran, live calculation, ringkasan surcharge, date/time picker, dan isi nota.
- **Opsi yang tersedia:**
  1. Toggle express pada level pesanan; seluruh item wajib eligible; surcharge persentase diterapkan pada subtotal setiap item; ETA pesanan memakai waktu selesai terlama.
  2. Toggle express dan surcharge fixed/persen pada setiap item; ETA tetap memakai item terlama.
  3. Express dimodelkan sebagai layanan terpisah.
- **Rekomendasi:** Opsi 1; bila ada item tidak eligible, express untuk seluruh order tidak dapat diaktifkan. Kasir harus melepas express atau mengeluarkan item tersebut sebelum konfirmasi.
- **Alasan rekomendasi:** Paling cepat untuk kasir dan tetap memanfaatkan surcharge serta durasi express per layanan.
- **Referensi PRD:** `SRV-04`, `ORD-03`, `ORD-06`, bagian 9.2.
- **Status:** `TBD`

### P0-DISC-01 — Aturan diskon

- **Pertanyaan:** Siapa yang dapat memberi diskon, apakah diskon fixed atau persen, berlaku per item atau pesanan, berapa batasnya, dan kapan alasan/approval wajib?
- **Pengaruh terhadap produk:** Menentukan kontrol diskon, permission, total calculation, confirmation dialog, dan histori audit.
- **Opsi yang tersedia:**
  1. Diskon nominal pada level order, hanya Owner, tanpa approval bertingkat.
  2. Diskon nominal atau persen pada level order; Owner/Admin aktif default, Cashier melalui toggle; maksimum 20% dari subtotal sebelum diskon; di atas batas ditolak; alasan wajib untuk setiap diskon.
  3. Diskon per item dan order dengan approval bertingkat.
- **Rekomendasi:** Opsi 2; tidak ada stacking dan nilai 20% tetap usulan yang harus disetujui atau diganti saat menjawab keputusan ini.
- **Alasan rekomendasi:** Cukup fleksibel untuk praktik outlet tanpa menambah mesin promosi atau approval kompleks.
- **Referensi PRD:** `ORD-03`, `ORD-07`, bagian 9.2 dan 22 butir 6.
- **Status:** `TBD`

### P0-ORD-01 — Format kode pesanan dan nomor nota

- **Pertanyaan:** Apakah kode pesanan dan nomor nota sama, format apa yang dipakai, dan unik pada scope tenant atau outlet?
- **Pengaruh terhadap produk:** Menentukan pencarian cepat, header nota, contoh data, panjang kolom tabel, dan komunikasi lisan dengan pelanggan.
- **Opsi yang tersedia:**
  1. Satu kode tenant-wide dengan format `YYMMDD-####`, sequence reset setiap hari tenant.
  2. Kode order sekaligus nomor nota dengan format `[OUTLET]-[YYMMDD]-[####]`; kode outlet 2–4 karakter, sequence empat digit reset per outlet per hari dalam timezone tenant.
  3. Kode pesanan dan nomor nota terpisah.
- **Rekomendasi:** Opsi 2; contoh `JKT-260807-0042`. Uniqueness memakai tenant + outlet + tanggal lokal + sequence dan tidak mengekspos ID internal.
- **Alasan rekomendasi:** Memudahkan identifikasi cabang dan operasional printer thermal, sekaligus menjaga urutan lokal.
- **Referensi PRD:** `ORD-04`, `RCP-01`, `RCP-04`, bagian 22 butir 4.
- **Status:** `TBD`

### P0-STATE-01 — Status awal dan transisi produksi

- **Pertanyaan:** Apa status awal pesanan, transisi maju mana yang legal, tahap mana boleh dilewati, dan kapan rollback memerlukan alasan?
- **Pengaruh terhadap produk:** Menentukan kolom board, tombol tindakan per state, confirmation dialog, permission, dan histori.
- **Opsi yang tersedia:**
  1. Semua tahap linear dan wajib.
  2. Jalur normal linear; pengguna dengan capability dapat memakai tindakan `Lewati tahap` untuk seluruh order dengan alasan; tidak ada konfigurasi tahap per layanan.
  3. Service mempunyai stage-profile dan order mixed-item memakai gabungan tahap yang dibutuhkan.
- **Rekomendasi:** Opsi 2 dengan `RECEIVED` sebagai status awal dan jalur normal berikut:

  | Dari | Ke secara normal |
  | --- | --- |
  | `RECEIVED` | `WASHING` |
  | `WASHING` | `DRYING` |
  | `DRYING` | `IRONING` |
  | `IRONING` | `READY` |
  | `READY` | Status serah-terima sesuai `P0-HANDOFF-01` |

  `Lewati tahap` boleh memilih status aktif yang lebih maju untuk seluruh order, wajib alasan dan audit, serta hanya digunakan setelah seluruh item siap melewati tahap tersebut. Transisi ke `CANCELED` mengikuti `P0-ORD-02`; setiap transisi mundur memerlukan capability, alasan, dan audit.
- **Alasan rekomendasi:** Mengakomodasi layanan yang tidak membutuhkan seluruh tahap tanpa melanggar non-goal workflow kustom.
- **Referensi PRD:** `PRD-01`–`PRD-05`, `ORD-07`, `ORD-08`, bagian 22 butir 7.
- **Status:** `TBD`

### P0-ORD-02 — Edit, koreksi, dan pembatalan pesanan

- **Pertanyaan:** Field apa yang dapat diedit pada setiap tahap, kapan tindakan koreksi khusus digunakan, dan sampai kapan pesanan dapat dibatalkan?
- **Pengaruh terhadap produk:** Menentukan form edit, field disabled, CTA cancel/koreksi, dampak total, alasan, confirmation dialog, refund handoff, dan histori.
- **Opsi yang tersedia:**
  1. Semua field dapat diedit sampai `COMPLETED` dan cancel dapat dilakukan kapan saja.
  2. Edit penuh hanya saat `RECEIVED` dan belum ada pembayaran valid. Setelah pembayaran atau produksi dimulai, hanya catatan/ETA yang bebas; perubahan item/harga/diskon memakai koreksi berizin yang sekaligus menyelesaikan void/refund/reversal terkait; cancel sebelum status akhir dengan alasan dan refund bila sudah dibayar.
  3. Order terkunci segera setelah dibuat; seluruh perubahan melalui void/cancel dan buat ulang.
- **Rekomendasi:** Opsi 2; koreksi finansial tidak boleh menghasilkan `net paid > total baru` dan harus dikonfirmasi sebagai satu rangkaian dengan tindakan payment `P0-PAY-02`. Setelah status akhir tidak ada edit bebas. `CANCELED` bersifat terminal dan tidak menghapus order.
- **Alasan rekomendasi:** Menjaga fleksibilitas operasional awal tanpa mengubah transaksi yang sudah diproses secara diam-diam.
- **Referensi PRD:** `ORD-07`–`ORD-09`, `PAY-05`, bagian 11.2 dan 22 butir 8.
- **Status:** `TBD`

### P0-HANDOFF-01 — Pelunasan dan penyerahan

- **Pertanyaan:** Apa arti `COMPLETED`, apakah laundry boleh diserahkan saat masih `UNPAID`/`PARTIAL`, dan bukti penerima minimum apa yang dicatat?
- **Pengaruh terhadap produk:** Menentukan flow `READY -> pembayaran -> penyerahan`, CTA detail pesanan, warning/override, confirmation dialog, field penerima, dan laporan piutang.
- **Opsi yang tersedia:**
  1. `COMPLETED` berarti produksi selesai; penyerahan tidak mempunyai status tersendiri.
  2. `READY` berarti produksi selesai dan `COMPLETED` berarti telah diserahkan; wajib lunas; cukup konfirmasi tanpa field penerima.
  3. `READY` berarti produksi selesai dan `COMPLETED` berarti telah diserahkan; penyerahan berpiutang boleh dengan capability/alasan; catat nama penerima opsional dan timestamp, tanpa foto/tanda tangan.
- **Rekomendasi:** Opsi 3.
- **Alasan rekomendasi:** Memisahkan antrean siap diambil dari histori serah terima dan tetap mendukung piutang yang memang muncul di dashboard PRD.
- **Referensi PRD:** `ORD-08`, `ORD-09`, `PRD-01`, `PAY-01`, `PAY-05`, bagian 9.3, 9.4, 11.2, dan 22 butir 8.
- **Status:** `TBD`

### P0-PAY-01 — Pencatatan pembayaran awal dan field per metode

- **Pertanyaan:** Apakah pembayaran awal dikonfirmasi bersama order atau sesudah order dibuat, apakah tunai mencatat uang diterima/kembalian, dan field apa yang diperlukan untuk transfer, QRIS manual, serta metode lainnya?
- **Pengaruh terhadap produk:** Menentukan urutan konfirmasi order, dialog pembayaran, field kondisional, failure state, nota, dan kas.
- **Opsi yang tersedia:**
  1. Order dibuat dahulu lalu pembayaran terpisah; semua metode hanya memasukkan nominal tepat.
  2. Draft order dan pembayaran awal dikonfirmasi dalam satu flow dan disimpan konsisten; tunai memakai `nominal diterapkan`, `uang diterima`, dan `kembalian`; transfer/QRIS memiliki reference opsional; `lainnya` memiliki label wajib.
  3. Seperti opsi 2 ditambah overpayment sebagai saldo pelanggan.
- **Rekomendasi:** Opsi 2; nilai payment yang diterapkan tidak boleh melebihi sisa tagihan, sedangkan kembalian tidak dihitung sebagai saldo pelanggan.
- **Alasan rekomendasi:** Cocok untuk kebiasaan kasir Indonesia, mencegah payment tanpa order, dan tidak menambah credit-wallet workflow.
- **Referensi PRD:** `ORD-03`, `PAY-01`–`PAY-04`, bagian 9.2, 9.4, dan 11.3.
- **Status:** `TBD`

### P0-PAY-02 — Void, refund, cancel, dan status pembayaran

- **Pertanyaan:** Apa perbedaan void dan refund, apakah partial refund didukung, bagaimana cancel order yang sudah dibayar diproses, dan kapan status `REFUNDED` digunakan?
- **Pengaruh terhadap produk:** Menentukan action menu, nominal refund, alasan, confirmation dialog, status chip, nota, cash movement, dan rekonsiliasi.
- **Opsi yang tersedia:**
  1. Void dan refund diperlakukan sama; hanya satu status akhir.
  2. Void biasa membatalkan record salah sebelum sesi/periode rekonsiliasi terkait ditutup. Setelah periode ditutup, `late void/reversal` menandai payment asal tidak valid untuk ledger order dan menghitung ulang paid/balance/status. Untuk payment tunai yang sudah masuk sesi kas, tindakan ini juga membuat `CashMovement` kompensasi bernilai lawan pada periode koreksi yang menaut ke payment serta sesi asal; untuk transfer/QRIS/metode non-tunai, koreksi hanya membuat reversal ledger dan audit/reference koreksi tanpa mengubah expected cash. Refund penuh berlaku per payment bila dana benar-benar dikembalikan; cancel berbayar wajib menyelesaikan refund; `REFUNDED` hanya bila net payment order nol setelah refund.
  3. Mendukung partial refund bebas, credit pelanggan, dan refund lintas metode.
- **Rekomendasi:** Opsi 2; `late void/reversal` hanya untuk record salah tanpa pengembalian dana, sedangkan refund hanya untuk dana yang benar-benar dikembalikan. Payment asal selalu dipertahankan dan setiap tindakan memerlukan capability, alasan, aktor, timestamp, serta reference koreksi. Link ke `CashMovement` lawan wajib hanya bila payment tunai sudah memengaruhi sesi kas yang ditutup; reversal non-tunai tidak mengubah expected cash.
- **Alasan rekomendasi:** Jejak finansial jelas dan edge case tetap terbatas untuk MVP.
- **Referensi PRD:** `ORD-09`, `PAY-01`, `PAY-04`, `PAY-05`, bagian 11.3.
- **Status:** `TBD`

### P0-PAY-03 — Tujuan halaman `/payments`

- **Pertanyaan:** Apakah `/payments` merupakan ledger, antrean piutang, atau keduanya; dari mana aksi pembayaran/refund/void dimulai?
- **Pengaruh terhadap produk:** Menentukan tujuan halaman, primary action, data utama, empty state, dan navigasi ke transaksi sumber.
- **Opsi yang tersedia:**
  1. Ledger pembayaran saja.
  2. Antrean piutang saja.
  3. Ledger dengan filter sisa tagihan; seluruh mutasi tetap dimulai dari detail order.
- **Rekomendasi:** Opsi 3.
- **Alasan rekomendasi:** Mendukung rekonsiliasi dan penagihan tanpa membuat dua sumber mutasi keuangan.
- **Referensi PRD:** route `/payments`, `PAY-01`–`PAY-05`, `REP-05`.
- **Status:** `TBD`

### P0-CASH-01 — Model sesi dan tutup kas

- **Pertanyaan:** Apakah ada buka kas, sesi berlaku per kasir/outlet/shift atau per outlet/hari, apa saldo awal dan formula expected cash, bagaimana selisih/approval/reopen ditangani, serta apakah sesi aktif boleh ditutup ketika tenant baru menjadi read-only?
- **Pengaruh terhadap produk:** Menentukan apakah halaman perlu state buka kas, isi ringkasan, input tutup kas, warning pembayaran tunai, dan histori sesi.
- **Opsi yang tersedia:**
  1. Rekap harian tanpa sesi buka kas.
  2. Satu sesi per outlet per shift; selisih nonnol masuk `PENDING_APPROVAL` sebelum final.
  3. Satu sesi per kasir per outlet per shift; selisih nonnol boleh langsung ditutup dengan alasan wajib dan ditandai untuk review, tanpa approval gate.
- **Rekomendasi:** Opsi 3. `Expected cash = saldo awal + pembayaran tunai valid + cash in - cash out - refund tunai +/- adjustment valid`; transfer/QRIS tidak masuk kas fisik. `Selisih = kas fisik - expected cash`; alasan wajib bila tidak nol, tetapi tutup kas langsung final dan hanya diberi flag review—tidak ada state pending approval pada MVP. Reopen hanya capability khusus, alasan, dan audit. Jika tenant berubah read-only, sesi yang sudah aktif masih boleh ditutup, tetapi movement/transaksi baru diblokir.
- **Alasan rekomendasi:** Paling mudah direkonsiliasi pada outlet dengan beberapa kasir dan sesuai entitas `CashSession`.
- **Referensi PRD:** `PAY-02`, `PAY-04`–`PAY-07`, entitas `CashSession` dan `CashMovement`, bagian 22 butir 9.
- **Status:** `TBD`

### P0-SUB-01 — Struktur perbandingan paket dan entitlement

- **Pertanyaan:** Berapa struktur paket yang perlu dibandingkan pada wireframe dan entitlement apa yang menjadi pembeda, tanpa mengunci angka harga/batas final?
- **Pengaruh terhadap produk:** Menentukan layout pricing/billing, comparison table, usage meter, limit state, dan CTA upgrade.
- **Opsi yang tersedia:**
  1. Satu paket pilot tanpa perbandingan.
  2. Tepat tiga tier placeholder: `Starter` (satu outlet dan laporan dasar), `Growth` (limit pegawai/order lebih tinggi dan laporan lengkap), serta `Multi-Outlet` (lebih dari satu outlet dan limit tertinggi); baris perbandingan wajib outlet, pegawai, volume order, dan level laporan.
  3. Paket berbasis usage dengan konfigurator kompleks.
- **Rekomendasi:** Opsi 2 memakai nilai placeholder berlabel `TBD`; angka harga, trial, grace, dan limit final tetap di `P2-LIMIT-01`.
- **Alasan rekomendasi:** Cukup untuk memvalidasi hierarchy dan upgrade flow tanpa menyamarkan hipotesis harga sebagai keputusan.
- **Referensi PRD:** `SUB-03`–`SUB-05`, bagian 9.5 dan 22 butir 10.
- **Status:** `TBD`

### P0-SUB-02 — Matriks akses berdasarkan status subscription

- **Pertanyaan:** Akses baca/mutasi apa yang berlaku pada `TRIALING`, `ACTIVE`, `PAST_DUE`, `SUSPENDED`, dan `CANCELED`; siapa yang tetap dapat membuka billing setelah grace period?
- **Pengaruh terhadap produk:** Menentukan banner, checkout CTA, app-wide read-only, permission-denied state, dan pemulihan subscription.
- **Opsi yang tersedia:**
  1. Hard block semua role segera setelah pembayaran bermasalah.
  2. `TRIALING/ACTIVE` penuh sesuai entitlement; `PAST_DUE` tetap aktif selama grace dengan banner; setelah grace `SUSPENDED/CANCELED` read-only; Owner dan Admin yang mempunyai capability billing tetap dapat membuka billing.
  3. Matriks bertingkat per fitur dan role.
- **Rekomendasi:** Opsi 2; Admin tetap mengikuti toggle billing `P0-PERM-01`, Super Admin dapat melakukan tindakan dukungan, dan tidak ada status yang menghapus data.
- **Alasan rekomendasi:** Sederhana, transparan, dan sejalan dengan `SUB-06` serta fixture past-due/read-only.
- **Referensi PRD:** `SUB-01`, `SUB-02`, `SUB-05`, `SUB-06`, bagian 11.4.
- **Status:** `TBD`

### P0-ADM-01 — Batas pengelolaan paket oleh Super Admin

- **Pertanyaan:** Apakah Super Admin dapat create/edit/archive plan dan entitlement atau hanya melihat konfigurasi?
- **Pengaruh terhadap produk:** Menentukan isi, primary action, form, empty state, dan confirmation dialog `/admin/plans`.
- **Opsi yang tersedia:**
  1. Plan view-only; konfigurasi di luar UI.
  2. Edit terbatas pada atribut plan/entitlement yang ditentukan, dengan konfirmasi dan audit.
  3. Full commercial plan builder dengan versioning, proration, dan approval.
- **Rekomendasi:** Opsi 2; atribut MVP dibatasi pada nama/label, status, harga tampilan, dan entitlement yang sudah disebut PRD. Plan yang pernah dipakai diarsipkan, bukan dihapus.
- **Alasan rekomendasi:** Memenuhi scope pengelolaan paket tanpa membangun commercial engine penuh.
- **Referensi PRD:** bagian 7, route `/admin/plans`, `SUB-03`, `SUB-04`.
- **Status:** `TBD`

### P0-ADM-02 — Batas data tenant yang terlihat oleh Super Admin

- **Pertanyaan:** Data tenant apa yang boleh dilihat Super Admin pada daftar/detail tanpa impersonation?
- **Pengaruh terhadap produk:** Menentukan field tabel/detail tenant, empty/error state, batas pencarian, dan paparan data pelanggan laundry.
- **Opsi yang tersedia:**
  1. Metadata bisnis, status subscription, entitlement usage, dan audit tindakan admin; tanpa data pelanggan/order.
  2. Opsi 1 ditambah metrik operasional agregat tanpa identitas pelanggan.
  3. Akses penuh ke data operasional tenant.
- **Rekomendasi:** Opsi 1.
- **Alasan rekomendasi:** Cukup untuk administrasi subscription dan paling konsisten dengan larangan impersonation serta minimisasi data.
- **Referensi PRD:** `ADM-01`, `ADM-02`, `ADM-05`, `ADM-06`, `RCP-04`.
- **Status:** `TBD`

### P0-ADM-03 — Trial extension, kompensasi, suspend, dan reactivate

- **Pertanyaan:** Apa bentuk kompensasi MVP, field/alasan apa yang wajib, apakah approval diperlukan, dan bagaimana manual suspend berinteraksi dengan update billing?
- **Pengaruh terhadap produk:** Menentukan action menu detail tenant, input durasi, taxonomy alasan, confirmation dialog, pending/error state, dan histori status.
- **Opsi yang tersedia:**
  1. Hanya trial extension serta suspend/reactivate; tidak ada kompensasi terpisah.
  2. Trial extension dan kompensasi berbentuk tambahan hari subscription/trial; alasan wajib; suspend/reactivate memerlukan konfirmasi; manual suspend tetap berlaku sampai reactivation eksplisit meski event billing masuk.
  3. Monetary credit/refund, perubahan status bebas, dan approval bertingkat.
- **Rekomendasi:** Opsi 2; seluruh tindakan menyimpan aktor, state lama/baru, durasi, alasan terstruktur plus catatan opsional, dan timestamp.
- **Alasan rekomendasi:** Memberi alat support yang nyata tanpa memasukkan refund billing atau approval engine kompleks.
- **Referensi PRD:** `ADM-03`–`ADM-05`, `SUB-02`, `SUB-08`.
- **Status:** `TBD`

### P0-SCOPE-01 — Cakupan pickup/delivery dan Courier

- **Pertanyaan:** Apakah workflow operasional pickup/delivery termasuk MVP, dan capability konkret apa yang dimiliki Courier?
- **Pengaruh terhadap produk:** Menentukan field alamat/jadwal pada order, status tambahan, route/board Courier, CTA penyerahan, dan entitlement.
- **Opsi yang tersedia:**
  1. Tidak ada workflow atau layar khusus; Courier hanya preset yang belum aktif pada pilot.
  2. Field pickup/delivery dan transisi serah-terima sederhana tanpa optimasi rute.
  3. Modul delivery lengkap.
- **Rekomendasi:** Opsi 1 sampai functional requirement pickup/delivery ditambahkan ke PRD.
- **Alasan rekomendasi:** Mencegah scope melebar dari satu entitlement placeholder menjadi modul yang belum mempunyai aturan, entitas, route, atau acceptance criteria.
- **Referensi PRD:** bagian 5.5, 6, 7, `SUB-04`.
- **Status:** `TBD`

### P0-RCP-01 — Permukaan berbagi nota

- **Pertanyaan:** Pada MVP, apakah tombol `Bagikan` mengirim file/konten dari session pengguna atau membuka tautan nota yang dapat diakses pelanggan?
- **Pengaruh terhadap produk:** Menentukan CTA nota, kebutuhan route publik, loading/error/expired state, dan batas data yang keluar dari session tenant.
- **Opsi yang tersedia:**
  1. Browser print serta Web Share/download file dari nota yang sedang dibuka; tidak ada public link.
  2. Private link yang mewajibkan login tenant.
  3. Public tokenized link dengan expiry dan revoke.
- **Rekomendasi:** Opsi 1 untuk MVP.
- **Alasan rekomendasi:** Memenuhi kebutuhan berbagi sederhana tanpa menambah permukaan kebocoran data dan backend token sebelum aturannya tersedia.
- **Referensi PRD:** `RCP-01`–`RCP-04`, non-goal WhatsApp Business API.
- **Status:** `TBD`

### P0-REP-01 — Metrik utama dashboard dan laporan

- **Pertanyaan:** Apakah wireframe menampilkan satu metrik `Omzet` atau memisahkan nilai order dari uang yang benar-benar diterima?
- **Pengaruh terhadap produk:** Menentukan jumlah kartu, label, hierarchy dashboard, kolom laporan, dan drill-down rekonsiliasi.
- **Opsi yang tersedia:**
  1. Satu kartu `Omzet` berbasis nilai order.
  2. Pisahkan `Nilai Pesanan` dan `Pembayaran Diterima`, serta tetap tampilkan `Piutang`; metrik PRD lain tidak berubah.
  3. Satu kartu `Omzet` berbasis pembayaran diterima.
- **Rekomendasi:** Opsi 2.
- **Alasan rekomendasi:** Menghindari istilah omzet yang ambigu ketika DP, bayar nanti, void, dan refund tersedia, serta membuat rekonsiliasi lebih mudah dipahami owner.
- **Referensi PRD:** `REP-01`, `REP-03`, `REP-05`, `PAY-01`, `PAY-05`.
- **Status:** `TBD`

## P1 — Wajib diputuskan sebelum frontend final

### P1-BRAND-01 — Nama dan identitas produk

- **Pertanyaan:** Apa nama produk dan arah identitas visual final?
- **Pengaruh terhadap produk:** Menentukan logo, title, copy publik, manifest PWA, nota, email, dan design token visual.
- **Opsi yang tersedia:** Tetap memakai placeholder `Platform`; memilih nama sebelum design system; atau rebrand setelah pilot.
- **Rekomendasi:** Gunakan `Platform` pada low-fidelity wireframe, lalu kunci nama sebelum design system dan frontend visual final.
- **Alasan rekomendasi:** Nama tidak perlu memblokir validasi alur, tetapi placeholder tidak boleh lolos ke artefak final.
- **Referensi PRD:** metadata PRD dan bagian 22 butir 1.
- **Status:** `TBD`

### P1-AUTH-02 — Kebijakan autentikasi rinci

- **Pertanyaan:** Apa aturan password, durasi session, rate limit, expiry reset/invitation, dan route callback yang dipakai setelah mekanisme masuk `P0-AUTH-01` disetujui?
- **Pengaruh terhadap produk:** Menentukan validation copy, reset password, invitation-expired state, session-expired state, dan perilaku redirect kembali.
- **Opsi yang tersedia:** Kebijakan managed provider apa adanya; kebijakan tambahan Platform; atau kebijakan berbeda berdasarkan jenis tindakan.
- **Rekomendasi:** Mulai dari kebijakan aman provider dengan pesan Bahasa Indonesia dan redirect kembali yang eksplisit; dokumentasikan nilai expiry sebelum auth frontend final.
- **Alasan rekomendasi:** Menghindari aturan keamanan buatan sendiri yang tidak konsisten sekaligus membuat semua state dapat diuji.
- **Referensi PRD:** `AUTH-01`–`AUTH-04`, `ORG-02`, integrasi email bagian 18.
- **Status:** `TBD`

### P1-REP-02 — Formula dan cutoff metrik laporan

- **Pertanyaan:** Setelah metrik `P0-REP-01` dipilih, transaksi apa yang masuk setiap angka, timestamp mana yang dipakai, bagaimana void/refund/DP dihitung, dan kapan hari bisnis berganti?
- **Pengaruh terhadap produk:** Menentukan fixture, expected result, drill-down, filter, dan rekonsiliasi angka final.
- **Opsi yang tersedia:** Basis tanggal order untuk semua; basis tanggal pembayaran untuk semua; atau basis domain masing-masing dengan cutoff tenant.
- **Rekomendasi:** Gunakan basis domain: `Nilai Pesanan` = total order valid menurut waktu dibuat setelah diskon+surcharge dan tanpa canceled; `Pembayaran Diterima` = payment valid dikurangi refund menurut timestamp payment/refund; `Piutang` = sisa order non-canceled pada akhir periode; rata-rata transaksi = Nilai Pesanan/order valid. Gunakan timezone tenant dan cutoff kalender 00.00 untuk MVP.
- **Alasan rekomendasi:** Setiap angka dapat ditelusuri ke transaksi sumber dan tidak mencampur penjualan dengan arus kas.
- **Referensi PRD:** `REP-01`–`REP-05`, `PAY-05`, bagian 11.3 dan 13.3.
- **Status:** `TBD`

### P1-ORG-02 — Detail undangan, ownership, dan penonaktifan

- **Pertanyaan:** Berapa expiry undangan, kapan resend tersedia, apakah ownership dapat ditransfer, dan bagaimana order aktif diselesaikan sebelum outlet dinonaktifkan setelah lifecycle inti `P0-ORG-01` disetujui?
- **Pengaruh terhadap produk:** Menentukan countdown/copy status, menu lanjutan, blocker detail, dan recovery flow halaman pegawai/outlet.
- **Opsi yang tersedia:** Nilai tetap Platform; nilai dapat dikonfigurasi tenant; atau approval manual Super Admin.
- **Rekomendasi:** Gunakan nilai tetap Platform untuk expiry/resend; ownership transfer memerlukan konfirmasi Owner lama dan baru; outlet tidak aktif tetap terbaca di histori tetapi tidak dapat menerima order baru.
- **Alasan rekomendasi:** Menjaga frontend konsisten dan menghindari settings tenant yang tidak diperlukan pada MVP.
- **Referensi PRD:** `ORG-01`–`ORG-06`.
- **Status:** `TBD`

### P1-RCP-02 — Keamanan tautan nota bila dipilih

- **Pertanyaan:** Jika `P0-RCP-01` memilih tautan, apakah akses private atau public bertoken, berapa expiry, bagaimana revoke, dan bagaimana cache dicegah?
- **Pengaruh terhadap produk:** Menentukan route pelanggan, expired/revoked/error state, kontrol keamanan, dan data yang dapat diterima pelanggan.
- **Opsi yang tersedia:** Private authenticated link; public opaque token dengan expiry/revoke; atau link permanen.
- **Rekomendasi:** Bila link memang dipilih, gunakan opaque token berumur terbatas yang dapat dicabut; jangan memakai ID internal atau link permanen.
- **Alasan rekomendasi:** Membatasi dampak kebocoran URL dan memenuhi `RCP-04`.
- **Referensi PRD:** `RCP-01`–`RCP-04` dan non-goal WhatsApp API.
- **Status:** `TBD`

### P1-PAY-04 — Detail filter dan kolom ledger pembayaran

- **Pertanyaan:** Setelah tujuan `/payments` diputuskan di `P0-PAY-03`, filter default, kolom minimum, pagination, dan drill-down apa yang diperlukan?
- **Pengaruh terhadap produk:** Menentukan kepadatan tabel, urutan informasi, query mock, dan rekonsiliasi harian.
- **Opsi yang tersedia:** Tabel ringkas mobile-first; tabel desktop lengkap dengan tampilan kartu mobile; atau dua halaman terpisah.
- **Rekomendasi:** Satu ledger responsif dengan filter tanggal/outlet/metode/status, kolom kode order, waktu, metode, nominal, aktor, dan status; drill-down menuju detail order.
- **Alasan rekomendasi:** Menjaga satu sumber pencarian dan tetap dapat digunakan pada ponsel.
- **Referensi PRD:** route `/payments`, `PAY-01`–`PAY-05`, `REP-05`.
- **Status:** `TBD`

### P1-ORD-03 — Definisi terlambat

- **Pertanyaan:** Apakah terlambat dihitung dari timestamp estimasi selesai, apakah ada grace operasional, dan bagaimana timezone/cutoff berlaku?
- **Pengaruh terhadap produk:** Menentukan badge keterlambatan, filter default, urutan antrean, dan hasil laporan.
- **Opsi yang tersedia:** Terlambat segera setelah ETA; terlambat setelah grace operasional; atau status manual.
- **Rekomendasi:** Berdasarkan ETA dalam timezone tenant, tanpa grace tersembunyi.
- **Alasan rekomendasi:** Konsisten dengan indikator PRD dan menghasilkan perilaku yang dapat diuji.
- **Referensi PRD:** `ORD-06`, `PRD-02`, `PRD-05`, bagian 13.3.
- **Status:** `TBD`

### P1-CUS-02 — Arsip dan penghapusan pelanggan

- **Pertanyaan:** Apakah pelanggan tanpa transaksi dapat dihapus permanen, dan bagaimana pelanggan dengan transaksi dinonaktifkan atau diarsipkan?
- **Pengaruh terhadap produk:** Menentukan action menu, confirmation dialog, hasil pencarian, dan histori pada customer detail.
- **Opsi yang tersedia:** Tidak ada delete, hanya archive; hard delete hanya tanpa transaksi; atau hard delete berizin untuk semua.
- **Rekomendasi:** Archive untuk semua pelanggan; hard delete tidak disediakan pada MVP.
- **Alasan rekomendasi:** Perilaku konsisten, mudah dipulihkan, dan tidak berisiko memutus relasi historis.
- **Referensi PRD:** `CUS-05`.
- **Status:** `TBD`

### P1-SUB-03 — Perubahan paket dan histori tagihan

- **Pertanyaan:** Kapan upgrade/downgrade/cancel berlaku, bagaimana tenant yang sudah over-limit ditangani, apakah ada proration, dan data apa yang dimaksud `tagihan`?
- **Pengaruh terhadap produk:** Menentukan confirmation copy, pending state, billing history, downgrade blocker, dan checkout summary.
- **Opsi yang tersedia:** Perubahan langsung; perubahan pada periode berikutnya; atau campuran upgrade langsung/downgrade periode berikutnya.
- **Rekomendasi:** Upgrade setelah pembayaran terverifikasi, downgrade/cancel pada akhir periode, tanpa proration engine kompleks pada MVP; definisikan histori tagihan minimum.
- **Alasan rekomendasi:** Pola ini mudah dipahami dan membatasi edge case komersial awal.
- **Referensi PRD:** `SUB-02`, `SUB-05`, `SUB-08`, acceptance criteria 7.
- **Status:** `TBD`

### P1-AUD-01 — Visibilitas audit untuk tenant

- **Pertanyaan:** Apakah Owner/Admin memiliki halaman audit tenant, atau hanya histori pada detail order/payment/permission?
- **Pengaruh terhadap produk:** Menentukan route tambahan, navigasi settings, filter audit, dan data sensitif yang terlihat.
- **Opsi yang tersedia:** Histori per entitas saja; halaman audit tenant read-only; atau audit hanya Super Admin.
- **Rekomendasi:** Histori per entitas untuk pengguna tenant dan `/admin/audit-logs` untuk Super Admin pada MVP.
- **Alasan rekomendasi:** Memenuhi keterlacakan tindakan utama tanpa menambah pusat audit tenant yang belum ada di IA.
- **Referensi PRD:** `ORD-07`, `PAY-05`, `ADM-05`, bagian 16.4.
- **Status:** `TBD`

### P1-PWA-01 — Batas PWA dasar

- **Pertanyaan:** Apa yang dimaksud kemampuan instalasi PWA dasar dan konten apa yang boleh dicache?
- **Pengaruh terhadap produk:** Menentukan install prompt, offline/error screen, service worker, dan ekspektasi pengguna pada koneksi tidak stabil.
- **Opsi yang tersedia:** Installability saja; cache app shell/read-only; atau offline mutation queue.
- **Rekomendasi:** Installability dan cache app shell statis saja; semua transaksi tetap memerlukan koneksi dan menampilkan error/retry yang jelas.
- **Alasan rekomendasi:** Sesuai prinsip PWA sebagai enhancement dan tidak menambah sinkronisasi offline berisiko ke MVP.
- **Referensi PRD:** bagian 7, 16.5, dan risiko koneksi pada bagian 21.
- **Status:** `TBD`

## P2 — Dapat ditunda sampai backend atau pilot

### P2-INT-01 — Provider email dan billing production

- **Pertanyaan:** Provider email transaksional dan provider billing production mana yang digunakan?
- **Pengaruh terhadap produk:** Menentukan biaya, metode checkout, deliverability, webhook, settlement, compliance, dan operasi support.
- **Opsi yang tersedia:** Provider lokal; provider global; atau kombinasi melalui adapter.
- **Rekomendasi:** Evaluasi provider Indonesia/global menggunakan biaya, QRIS/metode lokal, kualitas webhook, dokumentasi, dan compliance; pertahankan adapter netral sampai dipilih.
- **Alasan rekomendasi:** Provider dapat berubah dan tidak perlu mengunci frontend mock.
- **Referensi PRD:** `SUB-07`, bagian 18 dan 22 butir 11.
- **Status:** `TBD`

### P2-INT-02 — Arti payment webhook pada acceptance criteria

- **Pertanyaan:** Apakah frasa `payment webhook` hanya merujuk event pembayaran provider billing subscription atau dimaksudkan untuk pembayaran pelanggan laundry?
- **Pengaruh terhadap produk:** Menentukan integrasi backend, test idempotency, data entity, dan kemungkinan perluasan scope payment gateway pelanggan.
- **Opsi yang tersedia:** Hanya webhook billing subscription; dua jenis webhook; atau hapus istilah payment webhook yang ambigu.
- **Rekomendasi:** Artikan sebagai webhook pembayaran provider billing subscription dan perbaiki wording PRD; payment gateway pelanggan tetap pasca-MVP.
- **Alasan rekomendasi:** Konsisten dengan pembayaran operasional manual dan daftar non-goal MVP.
- **Referensi PRD:** `PAY-02`, `SUB-07`, bagian 7, 18, dan acceptance criteria 10.
- **Status:** `TBD`

### P2-DATA-01 — Retensi data setelah subscription berakhir

- **Pertanyaan:** Berapa lama data tenant disimpan setelah cancel/suspend, apakah ada export, kapan delete/anonymize dilakukan, dan siapa yang dapat memulihkan?
- **Pengaruh terhadap produk:** Menentukan kebijakan data, support, storage, lifecycle tenant, dan komunikasi cancellation.
- **Opsi yang tersedia:** Retensi tetap lalu delete; retensi tanpa batas; atau tier retensi berdasarkan status/legal.
- **Rekomendasi:** Tetapkan masa retensi soft-delete, kanal permintaan export/delete, serta restore terkontrol setelah review legal dan pilot.
- **Alasan rekomendasi:** Data operasional/keuangan tidak boleh hilang mendadak, tetapi retensi tanpa batas juga perlu dasar yang jelas.
- **Referensi PRD:** `SUB-06`, bagian 22 butir 12.
- **Status:** `TBD`

### P2-LIMIT-01 — Nilai final paket dan entitlement

- **Pertanyaan:** Berapa harga, durasi trial/grace, batas outlet, pegawai, order, dan fitur laporan setiap paket?
- **Pengaruh terhadap produk:** Menentukan data pricing production, enforcement backend, upsell, dan kelayakan bisnis.
- **Opsi yang tersedia:** Satu paket pilot; beberapa paket tetap; atau paket berbasis usage.
- **Rekomendasi:** Gunakan struktur entitlement yang disepakati pada P0, tetapi validasi angka dengan 3–10 tenant pilot sebelum dikunci.
- **Alasan rekomendasi:** PRD sendiri menyatakan harga dan target sebagai hipotesis yang perlu pilot.
- **Referensi PRD:** `SUB-03`–`SUB-05`, tujuan pilot bagian 4, risiko harga bagian 21.
- **Status:** `TBD`

### P2-OPS-01 — Backup, observability, dan prosedur insiden

- **Pertanyaan:** Vendor, frekuensi backup, target restore, SLO monitoring, jalur reprocess webhook, dan prosedur insiden apa yang dipakai sebelum produksi?
- **Pengaruh terhadap produk:** Menentukan kesiapan pilot berdata nyata dan respons kegagalan, tetapi tidak mengubah low-fidelity flow utama.
- **Opsi yang tersedia:** Fitur managed provider; kombinasi managed dan runbook internal; atau sistem observability khusus.
- **Rekomendasi:** Mulai dari kemampuan managed yang dapat diuji, dokumentasikan restore drill dan reprocess webhook sebelum closed pilot.
- **Alasan rekomendasi:** Memenuhi acceptance criteria tanpa membangun platform operasi khusus terlalu awal.
- **Referensi PRD:** bagian 16.3, 16.4, dan acceptance criteria 14.
- **Status:** `TBD`

### P2-ANL-01 — Provider dan retensi analytics

- **Pertanyaan:** Provider analytics, consent, retensi event, dan aturan pseudonymization apa yang digunakan?
- **Pengaruh terhadap produk:** Menentukan implementasi event, privacy policy, biaya, dan akses data pilot.
- **Opsi yang tersedia:** Analytics internal minimal; provider pihak ketiga; atau event server-side terpilih.
- **Rekomendasi:** Gunakan event minimum PRD dengan identifier pseudonim dan tanpa data pelanggan laundry yang tidak diperlukan; pilih provider mendekati pilot.
- **Alasan rekomendasi:** Cukup untuk mengukur pilot tanpa memperbesar risiko data.
- **Referensi PRD:** bagian 17.
- **Status:** `TBD`

### P2-NOTIF-01 — Batas notifikasi MVP

- **Pertanyaan:** Notification apa yang dimaksud oleh requirement reliability, siapa penerimanya, dan kanal apa yang termasuk MVP?
- **Pengaruh terhadap produk:** Dapat memengaruhi worker/backend, retry, template email, serta potensi layar notification center.
- **Opsi yang tersedia:** Hanya email autentikasi/undangan dan notifikasi billing provider; notifikasi status order manual; atau notification center/WhatsApp otomatis.
- **Rekomendasi:** Batasi pada email autentikasi/undangan dan event billing yang memang diperlukan; notifikasi pelanggan dan notification center tetap di luar MVP.
- **Alasan rekomendasi:** Selaras dengan functional requirements dan non-goal WhatsApp otomatis.
- **Referensi PRD:** bagian 16.3, 18, dan daftar non-MVP bagian 7.
- **Status:** `TBD`

## Format jawaban keputusan

Jawaban dapat diberikan singkat dengan ID, contoh:

```text
P0-AUTH-01: Opsi 3.
P0-ONB-01: Opsi 3, trial <durasi trial>.
P0-PERM-01: Opsi 2, Admin tidak boleh billing secara default.
```

Setelah keputusan disetujui, statusnya harus diperbarui dari `TBD`, requirement terkait di `docs/PRD.md` diperjelas, lalu `docs/USER_FLOWS.md` dan `docs/SCREEN_MAP.md` diselaraskan sebelum wireframe dibuat.
