# User Flows — Laundry Management SaaS MVP

| Atribut | Nilai |
| --- | --- |
| Status | Draft untuk validasi produk |
| Bahasa utama | Bahasa Indonesia |
| Pasar awal | Laundry skala kecil dan menengah di Indonesia |
| Sumber keputusan produk | `docs/PRD.md` versi 0.1, 7 Agustus 2026 |
| Strategi | Frontend-first dengan mock adapter; arsitektur SaaS multi-tenant tetap dipertahankan |

## Cara membaca dokumen

- Dokumen ini menerjemahkan requirement PRD menjadi alur, bukan menambah requirement baru.
- `Pengguna berizin` berarti pengguna mempunyai membership aktif, capability yang sesuai, dan akses outlet yang relevan. Pemeriksaan akses tidak boleh hanya bergantung pada route atau parameter browser.
- Status pesanan dan status pembayaran selalu diperlakukan sebagai dua state yang berbeda.
- Keputusan yang belum ditetapkan PRD ditandai **TBD** dan harus dicatat serta diselesaikan melalui `docs/OPEN_DECISIONS.md`. Mock frontend boleh menggambarkan opsi, tetapi tidak boleh mengubahnya menjadi keputusan produk terselubung.
- Loading, empty, error, permission-denied, success feedback, serta konfirmasi tindakan berisiko berlaku pada halaman terkait sesuai PRD bagian 13.2. Detail per layar dijabarkan di `docs/SCREEN_MAP.md`.
- Seluruh data operasional dalam flow tenant harus tetap berada dalam scope tenant dan, bila relevan, outlet. Subscription Platform tidak boleh tercampur dengan pembayaran pelanggan laundry.

## Daftar flow

| ID | User flow |
| --- | --- |
| UF-01 | Registrasi dan login |
| UF-02 | Onboarding owner |
| UF-03 | Membuat pelanggan |
| UF-04 | Membuat pesanan |
| UF-05 | Menerima DP atau pembayaran penuh |
| UF-06 | Memproses laundry |
| UF-07 | Menyelesaikan dan menyerahkan pesanan |
| UF-08 | Tutup kas |
| UF-09 | Melihat laporan |
| UF-10 | Mengelola pegawai dan outlet |
| UF-11 | Mengelola subscription |
| UF-12 | Pengelolaan tenant oleh super admin |

---

## UF-01 — Registrasi dan login

### Aktor

- Calon pengguna yang belum mempunyai akun; apakah registrasi publik hanya untuk Owner mengikuti `P0-AUTH-01`.
- Pengguna terdaftar dengan membership aktif: Owner, Admin Laundry, Cashier, Operator, atau Courier.

### Tujuan

Membuat akun Platform atau masuk ke akun yang sudah ada, lalu mencapai konteks tenant yang boleh diakses.

### Precondition

- Untuk registrasi, calon pengguna belum login dan mempunyai email yang dapat digunakan.
- Untuk login, pengguna sudah mempunyai akun.
- Untuk membuka data tenant, pengguna mempunyai membership aktif pada tenant tersebut.

### Trigger

Pengguna memilih **Daftar** atau **Masuk** dari halaman publik, atau diarahkan ke login karena session tidak tersedia lagi.

### Main flow

1. Pengguna membuka halaman registrasi atau login.
2. Pada registrasi, calon pengguna memasukkan email dan password, lalu menyetujui tindakan pembuatan akun.
3. Platform memvalidasi input dan membuat akun pengguna.
4. Platform mencatat keberhasilan registrasi untuk event `sign_up_completed` tanpa mengirim data pelanggan laundry.
5. Platform melanjutkan ke verifikasi, UF-02, atau penerimaan undangan sesuai jalur akun yang disetujui dalam `P0-AUTH-01`; jalur tersebut belum final.
6. Pada login, pengguna memasukkan email dan password.
7. Platform memverifikasi kredensial dan membuat session.
8. Platform memeriksa membership aktif pengguna sebelum memberikan akses data tenant.
9. Platform menghitung membership aktif yang sah dan menerapkan tujuan login untuk kondisi nol, satu, atau beberapa tenant sesuai `P0-AUTH-01`.
10. Bila keputusan final memerlukan pemilih tenant, Platform hanya menampilkan membership aktif dan tidak mencampur data antartenant; apakah pemilih selalu tampil atau hanya pada kondisi tertentu masih **TBD** dalam `P0-AUTH-01`.
11. Session tetap aktif setelah refresh sesuai kebijakan session yang berlaku.

### Alternate flow

- Pengguna lupa password: pengguna membuka **Lupa password**, meminta reset, mengikuti instruksi autentikasi, lalu kembali login.
- Pengguna yang sudah login membuka halaman login/registrasi: Platform mengarahkan ke konteks yang sesuai, bukan membuat session kedua yang membingungkan.
- Keberadaan langkah verifikasi email serta urutannya masih **TBD** dalam `P0-AUTH-01`.
- Jalur akun pegawai dan bentuk penerimaan undangan masih **TBD** dalam `P0-AUTH-01` dan `P0-ORG-01`; lihat UF-10.

### Error/edge cases

- Email registrasi sudah digunakan.
- Kredensial login salah atau akun tidak dapat diautentikasi.
- Session kedaluwarsa saat pengguna berada di aplikasi; Platform meminta login ulang dan tidak mengekspos data tenant.
- Login berhasil tetapi seluruh membership nonaktif; pengguna tidak boleh mengakses data tenant dan mendapat penjelasan tindakan berikutnya.
- Tenant yang dipilih sudah disuspend atau read-only; hak baca/mutasi mengikuti `P0-SUB-02` yang masih **TBD**, bukan sekadar hasil login.
- Pemuatan daftar membership gagal; Platform tidak boleh menebak tenant dari URL.
- Keberadaan verifikasi email mengikuti `P0-AUTH-01`; aturan password, durasi session, rate limit, expiry, dan callback tetap **TBD** dalam `P1-AUTH-02`.

### Hasil akhir

- Registrasi berhasil menghasilkan akun dan mengarahkan pengguna ke langkah berikutnya yang telah disetujui; atau
- Login berhasil menghasilkan session dan konteks tenant yang sah; atau
- Akses ditolak secara aman tanpa menampilkan data tenant yang tidak berhak dilihat.

### Referensi requirement ID PRD

`AUTH-01`, `AUTH-02`, `AUTH-03`, `AUTH-04`, `AUTH-05`, `AUTH-06`, `ONB-01`, `ORG-05`, `ORG-06`.

---

## UF-02 — Onboarding owner

### Aktor

Owner yang sudah terautentikasi dan akan membuat tenant baru.

### Tujuan

Membuat bisnis laundry, outlet pertama, layanan awal, dan trial sehingga tenant siap menerima pesanan.

### Precondition

- Owner mempunyai session aktif.
- Owner belum menyelesaikan onboarding untuk tenant baru, atau sedang melanjutkan progress onboarding yang tersimpan.

### Trigger

Owner selesai registrasi, memilih membuat tenant baru, atau melanjutkan onboarding yang belum selesai.

### Main flow

1. Owner membuka langkah **Bisnis**.
2. Owner mengisi nama bisnis, nomor kontak, dan zona waktu tenant.
3. Platform memvalidasi data dan menyimpan progress onboarding.
4. Owner membuka langkah **Outlet** dan mengisi data outlet pertama yang diminta.
5. Platform membuat outlet pertama dalam scope tenant.
6. Owner membuka langkah **Layanan**.
7. Owner menyelesaikan langkah layanan menggunakan mekanisme yang kelak disetujui dalam `P0-ONB-01`. UI dapat menawarkan template sesuai `ONB-03`, pembuatan layanan sendiri sesuai journey PRD, atau keduanya; belum ada cabang yang final.
8. Platform menampilkan ringkasan bisnis, outlet, dan layanan untuk dikonfirmasi.
9. Platform menyelesaikan onboarding dan memastikan state trial sesuai konfigurasi; trial dapat sudah dimulai sebelumnya atau baru dimulai pada tahap ini menurut `P0-ONB-01` yang masih **TBD**.
10. Platform mencatat event `onboarding_completed`.
11. Owner diarahkan ke dashboard tenant yang sudah siap digunakan.

### Alternate flow

- Owner meninggalkan onboarding sebelum selesai: data yang sudah valid tetap tersimpan dan langkah terakhir dapat dilanjutkan.
- Owner memilih template: Platform mengisi layanan awal yang masih dapat ditinjau sebelum onboarding diselesaikan.
- Owner membuat layanan sendiri hanya bila `P0-ONB-01` mengizinkan; unit kiloan/satuan dan batas dry cleaning tetap **TBD** dalam `P0-SRV-01`.
- Owner mempunyai lebih dari satu tenant: tenant baru tetap dibuat sebagai scope terpisah dan kemudian tersedia melalui mekanisme pindah tenant.

### Error/edge cases

- Data bisnis, outlet, atau layanan tidak valid atau belum lengkap.
- Penyimpanan progress gagal; Platform mempertahankan input lokal seperlunya dan menawarkan retry tanpa menampilkan status selesai palsu.
- Pembuatan tenant berhasil tetapi outlet atau layanan gagal; Platform mempertahankan onboarding sebagai belum selesai dan tidak menggandakan tenant ketika retry.
- Konfigurasi trial tidak tersedia; Platform tidak boleh menebak durasi atau entitlement trial.
- Field outlet, format/keunikan `tenantSlug`, dan titik mulai trial mengikuti `P0-ONB-01`; pewarisan harga mengikuti `P0-PRICE-01`; nilai trial dan grace period masih **TBD** melalui `P2-LIMIT-01`. Isi template pada mock adalah fixture non-final yang hanya memakai jenis layanan yang disetujui di `P0-SRV-01`.

### Hasil akhir

Tenant, outlet pertama, layanan awal, membership Owner, dan trial tersedia; onboarding ditandai selesai dan Owner dapat menuju dashboard.

### Referensi requirement ID PRD

`ONB-01`, `ONB-02`, `ONB-03`, `ONB-04`, `ONB-05`, `SRV-01`, `SRV-02`, `SRV-03`, `SRV-04`, `SRV-05`, `ORG-01`, `SUB-01`, `SUB-03`, `SUB-04`.

---

## UF-03 — Membuat pelanggan

### Aktor

Owner, Admin Laundry, Cashier, atau pengguna lain yang memperoleh capability pelanggan secara eksplisit.

### Tujuan

Mencatat pelanggan dalam tenant agar dapat dipilih pada pesanan dan mempunyai riwayat transaksi yang terpusat.

### Precondition

- Pengguna sudah login, mempunyai membership aktif, dan memiliki permission mengelola pelanggan.
- Konteks tenant sudah ditetapkan; akses outlet diterapkan bila relevan.

### Trigger

Pengguna memilih **Tambah pelanggan** dari daftar pelanggan atau dari form pesanan baru.

### Main flow

1. Pengguna lebih dahulu mencari pelanggan berdasarkan nama atau nomor HP.
2. Jika pelanggan tidak ditemukan, pengguna membuka form pelanggan baru.
3. Pengguna mengisi data pelanggan yang diperlukan.
4. Platform memvalidasi data dan mencari potensi duplikasi nomor HP dalam scope pelanggan yang disetujui melalui `P0-CUS-01`.
5. Jika tidak ada konflik, pengguna mengonfirmasi pembuatan pelanggan.
6. Platform membuat pelanggan dengan `tenant_id` dari konteks akses yang sah, bukan dari input bebas browser.
7. Platform memberi success feedback.
8. Jika flow dimulai dari pesanan, pelanggan baru otomatis dipilih pada form pesanan tanpa kehilangan isian pesanan yang sudah ada.

### Alternate flow

- Pelanggan sudah ditemukan: pengguna memilih pelanggan tersebut dan tidak membuat record baru.
- Nomor HP sama ditemukan: Platform menampilkan peringatan duplikasi. Pelanggan baru hanya dapat dibuat jika kebijakan tenant mengizinkannya.
- Pengguna membatalkan form: tidak ada record pelanggan yang dibuat dan konteks sebelumnya tetap dipertahankan.
- Pengguna memperbaiki data pelanggan yang sudah ada jika mempunyai permission, alih-alih membuat duplikat.

### Error/edge cases

- Field wajib pelanggan dan normalisasi nomor HP Indonesia masih **TBD** dalam `P0-CUS-01`.
- Default kebijakan nomor HP duplikat, apakah dapat dikonfigurasi, dan perilaku warning/block masih **TBD** dalam `P0-CUS-01`.
- Scope pelanggan tenant/outlet dan riwayat yang boleh terlihat masih **TBD** dalam `P0-CUS-01`; UI tidak boleh mengunci salah satu opsi diam-diam.
- Pengguna kehilangan permission saat menyimpan; Platform menolak mutasi tanpa kehilangan isolasi tenant.
- Request terkirim dua kali; Platform tidak boleh menghasilkan duplikat tanpa peringatan yang jelas.
- Pelanggan dengan histori transaksi tidak boleh dihapus permanen; pola archive/nonaktif tetap **TBD** dalam `P1-CUS-02`.

### Hasil akhir

Pelanggan baru tersimpan dalam scope tenant yang benar dan siap dipilih pada pesanan, atau pengguna kembali menggunakan record pelanggan yang sudah ada.

### Referensi requirement ID PRD

`CUS-01`, `CUS-02`, `CUS-03`, `CUS-04`, `CUS-05`, `AUTH-05`, `ORG-05`.

---

## UF-04 — Membuat pesanan

### Aktor

Owner, Admin Laundry, atau Cashier dengan capability membuat pesanan pada outlet aktif.

### Tujuan

Mencatat pesanan laundry satu atau lebih item secara cepat, menghitung nilai transaksi dengan benar, dan menghasilkan kode pesanan serta nota.

### Precondition

- Pengguna mempunyai membership aktif, permission membuat pesanan, dan assignment outlet yang relevan.
- Tenant tidak berada dalam kondisi yang melarang mutasi.
- Outlet dan minimal satu layanan aktif tersedia.
- Harga layanan untuk outlet dapat ditentukan tanpa menebak aturan yang belum final.

### Trigger

Pengguna memilih **Pesanan baru** dari app shell, dashboard, atau daftar pesanan.

### Main flow

1. Platform membuka form pesanan dengan outlet transaksi yang ditentukan sesuai `P0-OUTLET-01`; outlet tidak boleh diinferensikan hanya dari parameter browser.
2. Pengguna mencari pelanggan berdasarkan nama atau nomor HP.
3. Pengguna memilih pelanggan yang ditemukan atau membuat pelanggan melalui UF-03.
4. Pengguna menambahkan satu atau lebih layanan.
5. Untuk setiap item, pengguna memasukkan kuantitas berdasarkan unit layanan yang disetujui di `P0-SRV-01`; aturan presisi/minimum mengikuti `P0-CALC-01`.
6. Pengguna mengatur express pada level yang diputuskan di `P0-CALC-02`, serta mengisi diskon, estimasi selesai, dan catatan bila relevan.
7. Platform mengambil harga outlet yang berlaku, lalu menghitung subtotal, surcharge, diskon, total, jumlah dibayar, dan sisa tagihan dalam rupiah.
8. Platform menampilkan ringkasan transaksi agar pengguna dapat memeriksa pelanggan, item, harga, dan estimasi selesai.
9. Pengguna memilih DP, pembayaran penuh, atau bayar nanti. Untuk DP/pembayaran penuh, form memakai langkah input/validasi UF-05 tanpa mencatat record sampai titik konfirmasi yang disetujui dalam `P0-PAY-01`.
10. Pengguna mengonfirmasi draft pesanan. Apakah pembayaran awal dikonfirmasi pada interaksi yang sama atau sesudah order dibuat masih **TBD** dalam `P0-PAY-01`.
11. Platform menyimpan pesanan dan, bila berlaku, pembayaran awal menggunakan strategi yang disetujui; kegagalan tidak boleh menghasilkan status pembayaran palsu atau pembayaran tanpa pesanan.
12. Platform menyimpan snapshot nama/jenis layanan, harga, berat/jumlah, surcharge, diskon, dan subtotal agar perubahan katalog berikutnya tidak mengubah transaksi lama.
13. Platform membuat kode pesanan yang mudah dibaca dan unik dalam scope yang telah diputuskan.
14. Platform mencatat histori perubahan penting dan event `order_created`; untuk pesanan pertama tenant juga mencatat `first_order_created`. Jika pembayaran awal berhasil menjadi record, Platform menghitung status pembayaran serta mencatat `payment_recorded` sesuai UF-05 sebelum nota final ditampilkan.
15. Platform menampilkan detail pesanan dan nota yang dapat dicetak atau dibagikan.

### Alternate flow

- Pelanggan belum terdaftar: pengguna membuat pelanggan tanpa meninggalkan form pesanan melalui UF-03.
- Jika `P0-SRV-01` menyetujui kedua unit, pesanan dapat mengombinasikan layanan kiloan dan satuan; bila tidak, hanya unit MVP yang disetujui ditampilkan.
- Layanan mempunyai harga override outlet: harga tersebut digunakan sesuai aturan pewarisan harga yang telah diputuskan.
- Pesanan express: Platform memakai scope, surcharge, dan durasi yang disetujui melalui `P0-CALC-02`, lalu menampilkan indikator express.
- Bayar nanti: pesanan dibuat dengan jumlah dibayar nol dan status pembayaran `UNPAID`.
- Pengguna membatalkan sebelum konfirmasi: tidak ada pesanan final yang dibuat.

### Error/edge cases

- Berat/jumlah nol, negatif, tidak sesuai unit, atau format desimal tidak valid.
- Makna minimum berat/jumlah, presisi, dan pembulatan berstatus **TBD** dalam `P0-CALC-01`.
- Layanan dinonaktifkan atau harganya berubah sebelum konfirmasi; Platform meminta pengguna meninjau ulang, tidak mengganti nilai diam-diam.
- Pengguna melewati limit volume pesanan atau kehilangan permission; akses mengikuti entitlement/capability yang sah.
- Nominal pembayaran yang diterapkan melebihi sisa tagihan harus selalu ditolak; hanya uang tunai yang diterima boleh lebih besar jika workflow kembalian `P0-PAY-01` disetujui.
- Request konfirmasi ganda; Platform harus mencegah terciptanya dua pesanan dari satu konfirmasi pengguna.
- Format dan scope keunikan kode pesanan/nomor nota masih **TBD** dalam `P0-ORD-01`.
- Siapa yang boleh memberi diskon, batas, jenis, serta kebutuhan alasan/approval masih **TBD** dalam `P0-DISC-01` dan `P0-PERM-01`.
- Express dan cara menghitung estimasi selesai dari satu atau beberapa durasi layanan masih **TBD** dalam `P0-CALC-02`.
- Status produksi awal dan transisi mengikuti `P0-STATE-01`; kebijakan edit setelah produksi dimulai mengikuti `P0-ORD-02`.
- Pewarisan harga default tenant ke outlet masih **TBD** dalam `P0-PRICE-01`.

### Hasil akhir

Pesanan tersimpan di tenant/outlet yang benar dengan snapshot harga, perhitungan rupiah, histori awal, status produksi dan pembayaran yang sah, kode pesanan, serta nota.

### Referensi requirement ID PRD

`ORD-01`, `ORD-02`, `ORD-03`, `ORD-04`, `ORD-05`, `ORD-06`, `ORD-07`, `ORD-08`, `ORD-09`, `ORD-10`, `SRV-02`, `SRV-03`, `SRV-04`, `SRV-05`, `SRV-06`, `PAY-01`, `PAY-02`, `PAY-03`, `RCP-01`, `RCP-02`, `RCP-03`, `RCP-04`, `ORG-05`, `SUB-03`, `SUB-04`.

---

## UF-05 — Menerima DP atau pembayaran penuh

### Aktor

- Owner, Admin Laundry, atau Cashier dengan capability menerima pembayaran.
- Courier hanya jika `P0-SCOPE-01` memasukkannya dan `P0-PERM-01` memberi capability pembayaran; keduanya masih **TBD**.

### Tujuan

Mencatat DP, pelunasan bertahap, atau pembayaran penuh tanpa menghapus jejak keuangan.

### Precondition

- Pengguna sudah login dan mempunyai akses ke tenant, outlet, serta pesanan yang sudah tersimpan.
- Pesanan valid dan mempunyai sisa tagihan lebih dari nol.
- Tenant tidak berada dalam kondisi yang melarang mutasi.

### Trigger

Pengguna memilih **Terima pembayaran** dari detail pesanan yang masih mempunyai sisa tagihan. Pemakaian form yang sama pada draft order dijelaskan sebagai alternate flow.

### Main flow

1. Platform menampilkan total pesanan, seluruh pembayaran sebelumnya, jumlah dibayar, dan sisa tagihan.
2. Pengguna memilih metode pembayaran: tunai, transfer, QRIS manual, atau lainnya.
3. Pengguna memasukkan nominal yang diterapkan dan field kondisional metode sesuai `P0-PAY-01`, termasuk uang diterima bila workflow kembalian kelak disetujui.
4. Platform memvalidasi nominal yang diterapkan sebagai integer rupiah, lebih dari nol, dan tidak melebihi sisa tagihan.
5. Platform menampilkan ringkasan pembayaran untuk dikonfirmasi.
6. Pengguna mengonfirmasi pembayaran.
7. Platform mencatat pembayaran sebagai record baru yang tidak dapat dihapus permanen.
8. Platform menghitung ulang jumlah dibayar dan sisa tagihan.
9. Platform memperbarui status pembayaran menjadi `PARTIAL` jika masih ada sisa atau `PAID` jika sisa nol.
10. Platform mencatat event `payment_recorded` dan memberikan success feedback.
11. Platform menampilkan nota terbaru untuk dicetak ulang atau dibagikan.

### Alternate flow

- DP: pengguna membayar sebagian dan pesanan tetap berstatus pembayaran `PARTIAL`.
- Pembayaran penuh: nominal sama dengan sisa tagihan dan status berubah menjadi `PAID`.
- Pelunasan bertahap: pengguna menambahkan pembayaran baru; pembayaran lama tetap tersimpan.
- Bayar nanti pada pembuatan order: pengguna melewati pencatatan pembayaran dan status tetap `UNPAID`.
- Pembayaran awal saat membuat order: UF-04 memakai langkah input dan validasi 1–5 sebagai draft. Konfirmasi/persistensi mengikuti `P0-PAY-01`; setelah record berhasil dibuat, langkah 8–11 flow ini tetap dijalankan sebelum UF-04 menampilkan nota final.
- Refund atau void: pengguna yang mempunyai permission memakai tindakan terpisah sesuai `P0-PAY-02`, memberi alasan, dan menghasilkan audit log; pembayaran asal tidak dihapus.
- Metode non-tunai manual: pengguna mencatat metode, sedangkan verifikasi transfer/QRIS tidak diasumsikan otomatis dalam MVP.

### Error/edge cases

- Nominal yang diterapkan nol, negatif, bukan integer rupiah, atau melebihi sisa tagihan. Uang tunai yang diterima boleh lebih besar hanya jika workflow kembalian pada `P0-PAY-01` disetujui.
- Pembayaran dikirim dua kali akibat klik ulang atau retry; Platform harus mencegah pencatatan ganda.
- Sisa tagihan berubah karena pembayaran pengguna lain; Platform memuat ulang nilai terbaru sebelum konfirmasi.
- Pesanan sudah dibatalkan atau mempunyai status yang tidak mengizinkan pembayaran; kebijakan detailnya masih **TBD** dalam `P0-ORD-02` dan `P0-PAY-02`.
- Apakah pembayaran tunai hanya boleh dicatat ketika ada sesi kas terbuka masih **TBD** dalam `P0-CASH-01`.
- Nominal payment yang diterapkan di atas sisa tagihan selalu ditolak; hanya field uang diterima dapat melebihi sisa bila kembalian disetujui dalam `P0-PAY-01`.
- Batas pembayaran Courier mengikuti `P0-SCOPE-01`/`P0-PERM-01`; reference transfer/QRIS dan field metode `lainnya` masih **TBD** dalam `P0-PAY-01`.
- Kegagalan penyimpanan tidak boleh memperbarui status pembayaran hanya di UI.

### Hasil akhir

Pembayaran baru tercatat secara permanen, status pembayaran dan sisa tagihan konsisten, histori pembayaran dapat direkonsiliasi, dan nota terbaru tersedia.

### Referensi requirement ID PRD

`PAY-01`, `PAY-02`, `PAY-03`, `PAY-04`, `PAY-05`, `ORD-03`, `ORD-07`, `ORD-10`, `RCP-01`, `RCP-03`, `RCP-04`, `REP-05`, `ORG-05`.

---

## UF-06 — Memproses laundry

### Aktor

- Operator sebagai aktor utama.
- Owner, Admin Laundry, atau Cashier dengan capability perubahan status produksi.
- Courier hanya untuk transisi yang kelak disetujui melalui `P0-SCOPE-01` dan `P0-PERM-01`; batasnya masih **TBD**.

### Tujuan

Memindahkan pesanan melalui workflow produksi standar dengan jejak aktor dan waktu yang jelas.

### Precondition

- Pengguna mempunyai membership aktif, assignment outlet, dan capability mengubah status produksi.
- Pesanan tersedia pada outlet yang dapat diakses dan belum `CANCELED` atau `COMPLETED`.

### Trigger

Operator membuka board produksi untuk melihat antrean pekerjaan.

### Main flow

1. Platform membuka board produksi sesuai scope tenant dan outlet pengguna.
2. Platform mengelompokkan atau menampilkan pesanan berdasarkan status standar: `RECEIVED`, `WASHING`, `DRYING`, `IRONING`, dan `READY`.
3. Operator memfilter antrean berdasarkan outlet, tanggal, status, express, atau keterlambatan sesuai permission.
4. Platform menampilkan indikator express dan terlambat dengan teks/ikon, tidak hanya warna.
5. Operator memilih pesanan.
6. Platform menampilkan identitas pesanan yang diperlukan, status saat ini, estimasi selesai, catatan, dan tindakan status yang diizinkan.
7. Operator memilih status berikutnya melalui kontrol yang dapat digunakan di ponsel dan tidak bergantung pada drag-and-drop.
8. Platform memvalidasi transisi dan permission.
9. Platform menyimpan status baru bersama status lama, aktor, dan timestamp.
10. Platform memperbarui board dan memberi success feedback.
11. Ketika pesanan mencapai status yang boleh diserahkan menurut `P0-HANDOFF-01`, pesanan muncul pada antrean penyerahan untuk UF-07.

### Alternate flow

- Operator menggunakan filter express atau terlambat untuk memprioritaskan pekerjaan.
- Tahap tertentu dilewati hanya jika matriks `P0-STATE-01` mengizinkannya; status keputusan masih **TBD**.
- Pengguna berizin memindahkan pesanan ke tahap sebelumnya melalui tindakan khusus yang menyertakan audit; capability dan alasan mengikuti `P0-STATE-01`/`P0-PERM-01`.
- Pembatalan dilakukan oleh pengguna berizin, dengan alasan dan audit, serta tidak diperlakukan sebagai penghapusan.

### Error/edge cases

- Pengguna mencoba mengakses pesanan tenant atau outlet lain.
- Status pesanan sudah berubah oleh pengguna lain; Platform menampilkan state terbaru dan meminta tindakan diulang.
- Pesanan sudah `CANCELED` atau `COMPLETED` ketika tindakan dikirim.
- Pengguna kehilangan assignment/permission saat board masih terbuka.
- Koneksi gagal saat perubahan status; UI tidak boleh menampilkan keberhasilan sampai penyimpanan terkonfirmasi. Offline queue tidak termasuk MVP.
- Status awal, transisi valid, tahap yang dapat dilewati, alasan rollback, dan kemampuan Courier masih **TBD** dalam `P0-STATE-01`, `P0-SCOPE-01`, serta `P0-PERM-01`.

### Hasil akhir

Pesanan berada pada status produksi baru yang valid; perubahan mempunyai histori aktor dan timestamp; antrean pengguna lain menampilkan state terbaru.

### Referensi requirement ID PRD

`PRD-01`, `PRD-02`, `PRD-03`, `PRD-04`, `PRD-05`, `ORD-07`, `ORD-08`, `ORD-09`, `ORG-05`.

---

## UF-07 — Menyelesaikan dan menyerahkan pesanan

### Aktor

- Cashier sebagai aktor utama penyerahan.
- Owner atau Admin Laundry dengan capability yang sama.
- Courier hanya jika penyerahan/delivery dan pembayaran disetujui melalui `P0-SCOPE-01` serta `P0-PERM-01`; detailnya **TBD**.

### Tujuan

Memastikan pesanan siap, menyelesaikan kewajiban pembayaran sesuai kebijakan, mencatat penyerahan, dan menutup status operasional pesanan.

### Precondition

- Pengguna berizin mengakses pesanan pada tenant/outlet aktif.
- Pesanan berada pada status yang memenuhi syarat penyerahan menurut `P0-HANDOFF-01` dan belum `CANCELED` atau tercatat sudah diserahkan.
- Data total pembayaran dan sisa tagihan tersedia.

### Trigger

Pelanggan datang mengambil laundry, atau petugas berizin memulai penyerahan pesanan pada status yang memenuhi syarat.

### Main flow

1. Pengguna membuka antrean penyerahan atau mencari kode pesanan.
2. Pengguna membuka detail pesanan dan mencocokkan kode, pelanggan, item, serta status yang dinyatakan siap diserahkan oleh `P0-HANDOFF-01`.
3. Platform menampilkan total, pembayaran sebelumnya, dan sisa tagihan secara jelas.
4. Jika masih ada sisa tagihan, pengguna mengikuti UF-05 untuk mencatat pelunasan, kecuali kebijakan final secara eksplisit mengizinkan penyerahan dengan piutang.
5. Platform menampilkan ringkasan penyerahan dan meminta konfirmasi tindakan penyelesaian.
6. Pengguna mengonfirmasi bahwa pesanan telah diserahkan.
7. Platform mencatat penyerahan dan menerapkan status akhir sesuai keputusan `P0-HANDOFF-01`. Rekomendasi mapping `READY` menjadi `COMPLETED` masih **TBD** dan tidak boleh di-hardcode sebelum disetujui.
8. Platform menampilkan nota terbaru yang dapat dicetak ulang atau dibagikan.
9. Setelah penyerahan berhasil dicatat, pesanan tidak lagi muncul dalam antrean penyerahan, tetapi tetap tersedia dalam histori dan laporan.

### Alternate flow

- Pesanan sudah dibayar penuh sebelum mencapai status penyerahan: pengguna langsung mengonfirmasi penyerahan.
- Penyerahan dengan sisa tagihan hanya tersedia jika `P0-HANDOFF-01` dan `P0-PERM-01` mengizinkannya; kebijakan ini masih **TBD**.
- Penyerahan dilakukan oleh Courier: hanya status/tindakan yang diberikan capability yang boleh digunakan; optimasi rute delivery tidak termasuk MVP.
- Nota hilang: pengguna dapat mencetak ulang dari detail pesanan.
- Pengguna membatalkan konfirmasi: status tetap pada state sebelum penyerahan.

### Error/edge cases

- Kode pesanan salah, pesanan tidak ditemukan, atau berasal dari tenant/outlet yang tidak dapat diakses.
- Pesanan belum memenuhi status penyerahan, sudah tercatat diserahkan, atau `CANCELED`.
- Pembayaran gagal tetapi UI mencoba melanjutkan penyelesaian; status tidak boleh berubah secara palsu.
- Pesanan berubah oleh pengguna lain saat konfirmasi.
- Upaya menyelesaikan pesanan dua kali.
- Makna `COMPLETED`, kebijakan `UNPAID`/`PARTIAL`, bukti penerima, dan batas tindakan Courier masih **TBD** dalam `P0-HANDOFF-01` dan `P0-SCOPE-01`.
- Mengembalikan status akhir penyerahan ke tahap sebelumnya memerlukan permission dan audit; rincian alasan/approval mengikuti `P0-STATE-01` dan `P0-ORD-02`.

### Hasil akhir

Penyerahan tercatat dengan histori aktor dan timestamp; status akhir mengikuti keputusan `P0-HANDOFF-01`, status pembayaran tetap akurat sebagai state terpisah, dan nota terbaru tersedia.

### Referensi requirement ID PRD

`PRD-01`, `PRD-03`, `ORD-03`, `ORD-07`, `ORD-08`, `ORD-10`, `PAY-01`, `PAY-03`, `RCP-01`, `RCP-02`, `RCP-03`, `RCP-04`, `ORG-05`.

---

## UF-08 — Tutup kas

### Aktor

Cashier, Owner, atau Admin Laundry yang mempunyai capability kas pada outlet aktif.

### Tujuan

Membandingkan catatan kas dengan kas fisik dan menutup sesi atau periode kas secara sederhana tanpa menghapus jejak transaksi.

### Precondition

- Pengguna sudah login dan mempunyai akses kas pada outlet.
- Konteks penutupan kas tersedia sesuai model `P0-CASH-01`: sesi aktif bila model sesi dipilih, atau periode terbuka bila rekap tanpa sesi dipilih.
- Pembayaran, cash in, dan cash out yang relevan sudah tercatat.

### Trigger

Kasir mengakhiri shift/periode operasional dan memilih **Tutup kas**.

### Main flow

1. Platform membuka konteks kas untuk outlet dan periode/sesi yang aktif.
2. Platform menampilkan ringkasan transaksi kas yang tercatat, termasuk pembayaran tunai, cash in, cash out, dan adjustment yang sah.
3. Platform menampilkan nilai kas menurut sistem berdasarkan metode tutup kas yang telah disetujui.
4. Kasir menghitung kas fisik dan memasukkan nominalnya dalam rupiah.
5. Platform menghitung serta menampilkan selisih antara kas fisik dan catatan sistem.
6. Jika metode final memerlukan catatan/alasan untuk selisih, kasir mengisinya. Aturan tersebut masih **TBD** dalam `P0-CASH-01`.
7. Platform menampilkan ringkasan akhir dan confirmation dialog.
8. Kasir mengonfirmasi tutup kas.
9. Platform menutup sesi/periode kas, menyimpan nilai fisik dan selisih, serta memberi success feedback.
10. Hasil tutup kas tersedia untuk peninjauan pengguna yang mempunyai permission laporan/kas.

### Alternate flow

- Tidak ada selisih: kasir mengonfirmasi nilai yang sama dengan catatan sistem.
- Ada selisih: Platform menampilkan perbedaan dan mengikuti kebijakan alasan/adjustment yang telah diputuskan.
- Ada cash in atau cash out yang belum dicatat: kasir kembali mencatat movement yang sah, lalu mengulang ringkasan tutup kas.
- Kasir membatalkan konfirmasi: sesi/periode tetap terbuka dan data transaksi tidak berubah.
- Pengguna berizin melakukan koreksi melalui adjustment/void, bukan menghapus pembayaran atau movement lama.

### Error/edge cases

- Pada model sesi: tidak ada sesi aktif, sesi sudah ditutup, atau sesi berubah oleh pengguna lain. Pada model rekap: periode sudah ditutup atau datanya berubah.
- Kas fisik kosong, negatif, atau format rupiah tidak valid.
- Pengguna tidak mempunyai permission atau berpindah outlet saat proses berlangsung.
- Transaksi baru masuk ketika ringkasan sedang diperiksa; Platform harus meminta refresh/review sebelum penutupan final.
- Metode tutup kas outlet pilot—per kasir, per shift, per outlet per hari, atau bentuk lain—masih **TBD** dalam `P0-CASH-01`.
- Saldo awal, perlakuan transfer/QRIS manual, multi-kasir, waktu cutoff, expected cash, approval selisih, dan reopen mengikuti `P0-CASH-01`.
- Tenant menjadi read-only saat penutupan; kebijakan penyelesaian sesi aktif masih **TBD** dalam `P0-CASH-01` dan `P0-SUB-02`.

### Hasil akhir

Sesi/periode kas ditutup dengan nilai kas sistem, kas fisik, dan selisih yang dapat ditelusuri; pembayaran serta movement asal tetap utuh.

### Referensi requirement ID PRD

`PAY-04`, `PAY-05`, `PAY-06`, `PAY-07`, `REP-02`, `REP-05`, `ORG-05`.

---

## UF-09 — Melihat laporan

### Aktor

- Owner dan Admin Laundry untuk laporan lengkap sesuai permission.
- Cashier untuk laporan terbatas sesuai capability; batas rincinya masih **TBD** dalam `P0-PERM-01`.

### Tujuan

Memahami performa bisnis dan merekonsiliasi angka ringkasan dengan transaksi sumber pada tenant/outlet yang boleh diakses.

### Precondition

- Pengguna sudah login, mempunyai membership aktif, dan capability laporan.
- Konteks tenant serta scope outlet pengguna sudah ditentukan.

### Trigger

Pengguna membuka dashboard atau halaman laporan.

### Main flow

1. Platform membuka dashboard atau laporan dalam scope tenant yang sah.
2. Platform menampilkan filter tanggal dan outlet yang tersedia sesuai permission.
3. Pengguna memilih rentang tanggal dan scope outlet yang disetujui dalam `P0-OUTLET-01`; agregasi beberapa outlet hanya tersedia bila keputusan final mengizinkannya.
4. Platform memuat metrik finansial yang dipilih dalam `P0-REP-01`, jumlah pesanan, pesanan aktif, siap diambil, dan piutang untuk dashboard.
5. Pada laporan, Platform memuat metrik finansial yang dipilih, jumlah pesanan, rata-rata transaksi, layanan terlaris, metode pembayaran, dan keterlambatan.
6. Platform menampilkan konteks filter, timezone tenant, dan format rupiah dengan jelas.
7. Grafik penting disertai tabel atau ringkasan teks yang setara.
8. Pengguna meninjau rincian yang tersedia untuk merekonsiliasi angka dengan transaksi sumber tanpa keluar dari scope permission.
9. Platform mencatat event `report_viewed` tanpa data pelanggan yang tidak diperlukan.

### Alternate flow

- Owner multi-outlet dapat memilih seluruh outlet atau satu outlet hanya bila pola agregasi tersebut disetujui dalam `P0-OUTLET-01`.
- Admin hanya melihat outlet yang ditugaskan jika permission dibatasi outlet.
- Cashier melihat subset laporan yang diberikan capability; isi subset tersebut masih **TBD** dalam `P0-PERM-01`.
- Tidak ada data pada rentang yang dipilih: Platform menampilkan empty state dan opsi mengganti filter.
- Grafik tidak dapat atau tidak nyaman digunakan: pengguna tetap memperoleh informasi melalui tabel/ringkasan.

### Error/edge cases

- Rentang tanggal tidak valid atau melampaui batas query yang kelak ditentukan.
- Query laporan gagal/timeout; transaksi operasional lain tidak boleh ikut terblokir.
- Pengguna meminta outlet di luar assignment atau tenant lain.
- Angka ringkasan tidak sama dengan transaksi valid setelah void/refund; Platform harus menampilkan error/indikasi rekonsiliasi, bukan menyembunyikan selisih.
- Pilihan metrik masih **TBD** dalam `P0-REP-01`; formula DP/piutang/refund dan timezone cutoff mengikuti `P1-REP-02`; hak Cashier mengikuti `P0-PERM-01`.
- Export laporan tidak dinyatakan sebagai scope MVP dan tidak boleh ditambahkan tanpa pembaruan PRD.

### Hasil akhir

Pengguna melihat metrik dan laporan sesuai filter serta permission; angka tetap dapat ditelusuri ke transaksi sumber dan tidak mencampur data antartenant.

### Referensi requirement ID PRD

`REP-01`, `REP-02`, `REP-03`, `REP-04`, `REP-05`, `PAY-05`, `AUTH-05`, `ORG-05`.

---

## UF-10 — Mengelola pegawai dan outlet

### Aktor

- Owner sebagai aktor utama.
- Admin Laundry dengan capability terbatas yang diberikan Owner; batas preset Admin masih **TBD** dalam `P0-PERM-01`.

### Tujuan

Menambah dan memelihara outlet, mengundang pegawai, memberi preset role/capability, serta membatasi akses pegawai ke outlet yang relevan.

### Precondition

- Pengguna sudah login dan mempunyai capability mengelola outlet dan/atau pegawai.
- Tenant aktif dan entitlement outlet/pegawai dapat dibaca.
- Untuk undangan pegawai, layanan email tersedia pada fase backend/integrasi; frontend-first menggunakan state mock yang setara.

### Trigger

Owner/Admin membuka pengaturan **Outlet** atau **Pegawai**.

### Main flow

1. Platform menampilkan daftar outlet atau pegawai hanya dalam tenant aktif.
2. Untuk menambah outlet, pengguna memilih **Tambah outlet**.
3. Platform menampilkan penggunaan dan batas outlet dari entitlement, bukan dari nama paket.
4. Pengguna mengisi data outlet yang ditetapkan, meninjau ringkasan, dan mengonfirmasi.
5. Platform membuat outlet baru dalam tenant jika entitlement dan permission mengizinkan.
6. Untuk menambah pegawai, pengguna memilih **Undang pegawai**.
7. Pengguna memasukkan identitas undangan yang dibutuhkan, memilih preset role, dan menugaskan satu atau lebih outlet.
8. Platform menampilkan capability yang akan diberikan agar pengguna dapat meninjau akses.
9. Pengguna mengonfirmasi undangan.
10. Platform membuat atau memperbarui hubungan membership yang sesuai dan mengirim undangan melalui mekanisme yang kelak ditetapkan.
11. Setelah lifecycle undangan selesai, pegawai hanya dapat melihat tenant dan outlet sesuai membership, assignment, serta capability.
12. Platform memberi success feedback dan memperbarui daftar pegawai/outlet.

### Alternate flow

- Pegawai sudah menjadi anggota tenant: Owner memperbarui assignment outlet atau preset role tanpa membuat profil global duplikat.
- Satu pegawai ditugaskan ke beberapa outlet jika entitlement dan permission mengizinkan.
- Owner/Admin memperbarui data outlet yang sudah ada; perubahan tidak boleh mengubah histori transaksi lama.
- Owner menonaktifkan membership: akses dicabut, tetapi histori tindakan pengguna tetap tersimpan.
- Batas entitlement tercapai: Platform menjelaskan batas dan mengarahkan Owner yang berhak ke UF-11, tanpa otomatis mengubah paket.
- Admin hanya mengelola bagian yang capability-nya diberikan; akses billing Platform tetap opsional dan terpisah.

### Error/edge cases

- Batas outlet atau pegawai tercapai.
- Email undangan sudah menjadi anggota, mempunyai undangan tertunda, atau terkait akun pada tenant lain; akun global boleh memiliki beberapa membership, tetapi data tenant tetap terisolasi.
- Undangan gagal dikirim, kedaluwarsa, atau digunakan dua kali; lifecycle inti masih **TBD** dalam `P0-ORG-01` dan detail expiry dalam `P1-ORG-02`.
- Pengguna mencoba menetapkan role/capability yang tidak boleh ia berikan.
- Pengguna mencoba menonaktifkan dirinya sendiri atau Owner terakhir; guardrail masih **TBD** dalam `P0-ORG-01`.
- Pengguna mencoba mengakses atau memindahkan outlet dari tenant lain.
- Field outlet mengikuti `P0-ONB-01`; lifecycle outlet/pegawai mengikuti `P0-ORG-01`; tindakan Admin, preset role, dan Courier mengikuti `P0-PERM-01` serta `P0-SCOPE-01`. Semuanya masih **TBD**.
- Penghapusan permanen outlet atau membership tidak diasumsikan sebagai bagian flow.

### Hasil akhir

Outlet tersimpan sesuai entitlement dan/atau pegawai mempunyai membership, preset role, capability, serta assignment outlet yang sah; perubahan akses tidak menghapus histori tindakan.

### Referensi requirement ID PRD

`ORG-01`, `ORG-02`, `ORG-03`, `ORG-04`, `ORG-05`, `ORG-06`, `AUTH-05`, `AUTH-06`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06`.

---

## UF-11 — Mengelola subscription

### Aktor

- Owner.
- Admin Laundry hanya jika capability billing Platform diberikan secara eksplisit; default dan batas aksesnya masih **TBD** dalam `P0-PERM-01`.

### Tujuan

Melihat paket, penggunaan, batas, tagihan, serta status subscription dan memulai perubahan paket dengan sumber status yang dapat dipercaya.

### Precondition

- Pengguna sudah login ke tenant dan mempunyai capability billing Platform.
- Data plan, entitlement, penggunaan, dan subscription tersedia.
- Provider billing tersedia untuk checkout pada fase integrasi; mock frontend harus menyediakan state trial, aktif, mendekati limit, past due, dan read-only.

### Trigger

Owner membuka halaman billing, memilih upgrade/perubahan paket, atau menindaklanjuti peringatan limit/tagihan.

### Main flow

1. Platform membuka halaman billing dalam scope tenant aktif.
2. Platform menampilkan paket saat ini, status subscription, periode/trial yang relevan, penggunaan, dan batas entitlement.
3. Owner meninjau paket, entitlement, dan pilihan perubahan yang tersedia sesuai struktur `P0-SUB-01`, bukan sekadar nama paket.
4. Jika terdapat pilihan perubahan yang sah, Owner memilih paket tujuan; pada struktur satu paket, langkah ini dapat tidak tersedia.
5. Platform menampilkan ringkasan pilihan, harga, konsekuensi entitlement, dan tindakan konfirmasi sesuai keputusan komersial yang telah disetujui.
6. Owner mengonfirmasi dan Platform membuat sesi pembayaran melalui provider billing.
7. Owner menyelesaikan atau membatalkan pembayaran pada provider.
8. Setelah kembali ke Platform, UI menampilkan status pending sampai server menerima dan memverifikasi webhook.
9. Platform memverifikasi webhook, memproses event secara idempotent, dan memperbarui subscription serta entitlement.
10. Platform mencatat histori perubahan subscription dan event analytics yang relevan (`plan_selected`, `checkout_started`, atau `subscription_activated`).
11. UI memuat status server terbaru dan menampilkan success feedback hanya setelah aktivasi terkonfirmasi.

### Alternate flow

- Tenant masih trial: Owner melihat sisa trial, penggunaan, dan paket tanpa harus langsung checkout.
- Owner membatalkan checkout: subscription lama tetap berlaku dan UI kembali ke billing tanpa status aktif palsu.
- Pembayaran gagal atau subscription menjadi `PAST_DUE`: Platform menampilkan tindakan berikutnya sesuai grace period.
- Grace period berakhir: perilaku akses mengikuti `P0-SUB-02`; tenant dapat menjadi read-only tanpa penghapusan data bila opsi tersebut disetujui.
- Owner memilih upgrade, downgrade, pembatalan, atau reaktivasi hanya jika operasi tersebut ditetapkan dalam kebijakan paket. Proration dan waktu efektif masih **TBD** dalam `P1-SUB-03`.
- Limit tercapai: Platform mencatat `limit_reached` dan menjelaskan opsi, tanpa menaikkan paket otomatis.

### Error/edge cases

- Redirect provider berhasil tetapi webhook belum diterima; UI tetap pending dan tidak mengaktifkan entitlement dari redirect browser.
- Webhook duplikat, terlambat, tidak berurutan, atau signature tidak valid.
- Provider billing tidak tersedia atau sesi checkout kedaluwarsa.
- Pengguna tanpa capability billing mencoba memulai checkout.
- Tenant sudah melebihi entitlement paket tujuan ketika downgrade.
- Struktur paket mengikuti `P0-SUB-01`; status akses mengikuti `P0-SUB-02`; harga/durasi/limit final, provider, perubahan paket, dan retensi masih **TBD** dalam `P2-LIMIT-01`, `P2-INT-01`, `P1-SUB-03`, serta `P2-DATA-01`.
- Perbedaan arti operasional `PAST_DUE`, `SUSPENDED`, `CANCELED`, dan cakupan mutasi saat read-only wajib diputuskan melalui `P0-SUB-02` sebelum wireframe.

### Hasil akhir

Subscription dan entitlement tenant mencerminkan status server/webhook terverifikasi, mempunyai histori, dan UI menampilkan penggunaan serta batas yang konsisten; atau perubahan batal/gagal tanpa mengubah akses secara palsu.

### Referensi requirement ID PRD

`SUB-01`, `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06`, `SUB-07`, `SUB-08`, `ORG-01`.

---

## UF-12 — Pengelolaan tenant oleh super admin

### Aktor

Super Admin Platform.

### Tujuan

Mencari dan meninjau tenant, memeriksa subscription/entitlement, serta melakukan tindakan dukungan yang diizinkan dengan alasan dan audit log.

### Precondition

- Super Admin sudah diautentikasi dan mempunyai permission administratif Platform.
- Super Admin berada di area `/admin`, bukan konteks anggota tenant biasa.
- Data tenant, subscription, entitlement, dan audit log tersedia.

### Trigger

Super Admin membuka daftar tenant untuk dukungan operasional, investigasi status subscription, trial extension, kompensasi, suspend, atau reaktivasi.

### Main flow

1. Super Admin membuka daftar tenant.
2. Platform menampilkan pencarian dan daftar tenant dengan informasi minimum yang diperlukan.
3. Super Admin mencari lalu memilih tenant.
4. Platform membuka detail tenant dan menampilkan status subscription serta penggunaan entitlement.
5. Super Admin memilih salah satu tindakan yang diizinkan: memberi trial extension/kompensasi, suspend tenant, atau reactivate tenant; bentuk dan guardrail tindakan mengikuti `P0-ADM-03`.
6. Platform menampilkan dampak tindakan dan field yang diwajibkan oleh `ADM-03` serta `P0-ADM-03`; alasan selalu wajib untuk trial extension/kompensasi, sedangkan tindakan lain mengikuti keputusan final.
7. Super Admin meninjau lalu mengonfirmasi tindakan berisiko.
8. Platform memeriksa ulang permission dan state tenant terkini.
9. Platform menjalankan tindakan tanpa menghapus data tenant.
10. Platform mencatat aktor, timestamp, alasan bila diwajibkan/diisi, state lama, dan state baru di audit log.
11. Platform memuat ulang detail tenant dan menampilkan success feedback.

### Alternate flow

- Super Admin hanya meninjau tenant, subscription, penggunaan entitlement, atau audit log tanpa melakukan mutasi.
- Super Admin memperpanjang trial atau memberikan kompensasi dengan alasan yang dapat diaudit.
- Super Admin mensuspend tenant; efek akses/mutasi mengikuti kebijakan status yang telah diputuskan.
- Super Admin mereaktivasi tenant dan memulihkan akses sesuai subscription serta entitlement yang sah.
- Super Admin membuka daftar plan/subscription. Operasi perubahan definisi plan mengikuti `P0-ADM-01` dan tetap **TBD**, walaupun pengelolaan paket termasuk scope MVP.

### Error/edge cases

- Tenant tidak ditemukan atau berubah status saat tindakan dikonfirmasi.
- Alasan tindakan kosong atau tidak memenuhi kebijakan yang kelak ditetapkan.
- Super Admin tidak mempunyai capability untuk tindakan tertentu.
- Trial extension/kompensasi melampaui batas atau membutuhkan approval tambahan; batas dan approval masih **TBD** dalam `P0-ADM-03`.
- Suspend/reactivate berbenturan dengan webhook billing yang masuk bersamaan; prioritas sumber status masih **TBD** dalam `P0-ADM-03`.
- Tindakan gagal setelah sebagian proses; UI tidak boleh menampilkan keberhasilan sebelum state server konsisten.
- Super Admin mencoba menyamar sebagai pengguna tenant. Impersonation tidak termasuk MVP dan harus ditolak.
- Scope data tenant, taxonomy alasan/approval tindakan, dampak status subscription, dan notifikasi tenant masih **TBD** dalam `P0-ADM-02`, `P0-ADM-03`, `P0-SUB-02`, serta `P2-NOTIF-01`.

### Hasil akhir

Tenant tetap tidak berubah setelah peninjauan saja, atau status/trial/kompensasinya diperbarui secara sah dengan alasan dan audit log lengkap; tidak ada impersonation atau penghapusan data tenant.

### Referensi requirement ID PRD

`ADM-01`, `ADM-02`, `ADM-03`, `ADM-04`, `ADM-05`, `ADM-06`, `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06`, `SUB-07`, `SUB-08`.

---

## Traceability ringkas

| Area requirement | Flow utama |
| --- | --- |
| Authentication dan session (`AUTH-*`) | UF-01, UF-02, UF-03, UF-09, UF-10 |
| Onboarding (`ONB-*`) | UF-01, UF-02 |
| Pelanggan (`CUS-*`) | UF-03, UF-04 |
| Layanan dan harga (`SRV-*`) | UF-02, UF-04 |
| Pesanan (`ORD-*`) | UF-04, UF-05, UF-06, UF-07 |
| Produksi (`PRD-*`) | UF-06, UF-07 |
| Pembayaran dan kas (`PAY-*`) | UF-04, UF-05, UF-07, UF-08, UF-09 |
| Nota (`RCP-*`) | UF-04, UF-05, UF-07 |
| Dashboard dan laporan (`REP-*`) | UF-05, UF-08, UF-09 |
| Organisasi dan permission (`ORG-*`) | Seluruh flow tenant; terutama UF-10 |
| Subscription dan entitlement (`SUB-*`) | UF-02, UF-04, UF-10, UF-11, UF-12 |
| Super admin (`ADM-*`) | UF-12 |
