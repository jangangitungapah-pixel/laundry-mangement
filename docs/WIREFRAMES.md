# Low-Fidelity Wireframes — LaundryKita MVP

| Atribut | Nilai |
| --- | --- |
| Status | `READY_FOR_APPROVAL` |
| Fase | Low-fidelity wireframes |
| Sumber route | [`SCREEN_MAP.md`](SCREEN_MAP.md) |
| Sumber flow | [`USER_FLOWS.md`](USER_FLOWS.md) |
| Sumber aturan | [`DOMAIN_RULES.md`](DOMAIN_RULES.md) |
| Sumber akses | [`ROLE_PERMISSION_MATRIX.md`](ROLE_PERMISSION_MATRIX.md) |

## 1. Tujuan dan batas

Wireframe memvalidasi hierarchy, navigasi, konteks tenant/outlet, urutan tindakan, state, dan responsivitas sebelum design system atau frontend dibuat. Artefak ini mencakup tepat 41 route final dan interaksi tanpa route baru. Seluruh label visual masih grayscale, tanpa keputusan branding, token final, ilustrasi, integrasi, autentikasi, atau data nyata.

Wireframe tidak mengubah scope, formula, lifecycle, role, capability, entitlement, maupun route. Detail aturan tetap dirujuk ke dokumen kanonis; prototype hanya mensimulasikan hasilnya. Semua data contoh memakai tenant fiktif, rupiah integer, nomor HP Indonesia, dan waktu tenant.

## 2. Thesis hierarchy dan interaksi

- **Thesis visual:** blueprint operasional grayscale dengan hierarchy tenang, garis/boks sederhana, dan konteks tenant–outlet yang selalu terbaca.
- **Urutan baca:** identitas konteks → judul dan status halaman → primary action → informasi utama → tindakan sekunder → histori/bantuan.
- **Thesis interaksi:** satu primary action per layar; detail lanjutan dibuka progresif melalui drawer/dialog; aksi sensitif selalu menampilkan dampak, alasan bila wajib, confirmation, lalu feedback.
- Status selalu memakai label teks dan, bila membantu, ikon; warna tidak pernah menjadi satu-satunya pembeda.
- Mutasi diturunkan dari capability dan mode subscription. Navigasi tersembunyi bukan pengganti pemeriksaan akses; denied dan read-only tetap mempunyai layar eksplisit.

## 3. Shell dan navigasi

| Shell | Desktop | Mobile | Aturan konteks |
| --- | --- | --- | --- |
| Public shell | Header ringkas berisi identitas placeholder, fitur, harga, kontak, login, dan CTA trial; konten utama; footer legal. | Header satu baris, menu drawer, CTA utama dekat konten; footer bertumpuk. | Tanpa tenant/outlet dan tanpa status subscription. |
| Authentication shell | Panel form tunggal, progress/status token, jalur kembali, dan tautan legal; tanpa navigasi produk penuh. | Form satu kolom, CTA tidak tertutup keyboard, helper dekat input. | Setelah session valid, redirect mengikuti membership dan onboarding yang sah. |
| Tenant app shell | Rail navigasi berbasis capability; top bar tenant, outlet aktif, status subscription, akun; workspace; area feedback. | App bar memperlihatkan tenant/outlet; maksimal empat tujuan utama pada bottom navigation dan menu **Lainnya** untuk sisanya; primary action sticky bila relevan. | Satu tenant aktif. Satu outlet aktif untuk operasi. Mode read-only tampil sebagai banner persisten dengan jalur billing bagi pengguna berizin. |
| Super Admin shell | Boundary visual/session terpisah; rail Platform; pencarian global tenant; area kerja tanpa navigasi tenant. | App bar Platform, bottom navigation ringkas, action sheet untuk mutasi sensitif. | Tidak memiliki outlet switcher dan tidak pernah menampilkan customer, order, payment, atau kas tenant. |

### 3.1 Navigasi berbasis capability

| Persona | Tujuan navigasi tenant yang terlihat secara default |
| --- | --- |
| Owner | Dashboard, Pesanan, Produksi, Pelanggan, Pembayaran, Kas, Laporan, Bisnis, Outlet, Layanan, Pegawai, Role, Billing. |
| Admin | Dashboard, Pesanan, Produksi, Pelanggan, Pembayaran, Kas, Laporan, Layanan, serta Bisnis dalam mode baca; organisasi dan billing hanya bila capability opsional aktif. |
| Cashier | Dashboard operasional, Pesanan, Produksi, Pelanggan, Pembayaran, dan Kas. |
| Operator | Dashboard antrean, daftar order minimum, dan Produksi. |
| Super Admin Platform | Ringkasan Platform, Tenant, Plan, Subscription, dan Audit Platform saja. |

Menu yang tidak relevan disembunyikan. Direct URL tanpa hak selalu menghasilkan permission-denied tanpa mengonfirmasi keberadaan tenant/resource. Primary action yang tidak diizinkan disembunyikan atau dinonaktifkan dengan alasan, sesuai kemampuan baca layar.

### 3.2 Outlet switcher

- Top bar tenant selalu menampilkan nama tenant, outlet aktif, dan timezone pada layar operasional.
- Pilihan operasional hanya outlet `ACTIVE` yang menjadi assignment pengguna; mengganti outlet mengganti konteks data dan seluruh mutasi berikutnya.
- Opsi **Semua outlet** hanya muncul pada dashboard/laporan dan hanya bagi pengguna yang memiliki scope agregasi. Admin hanya mengagregasi outlet assignment; Cashier dan Operator tidak mendapat opsi ini.
- Detail transaksi selalu menampilkan outlet asal dan tidak menyediakan pemindahan outlet.
- Saat draft mutasi belum disimpan, switcher dikunci dan menjelaskan bahwa draft perlu diselesaikan atau dibatalkan lebih dahulu; ini mencegah konteks tampak berganti di tengah input tanpa mengubah aturan domain.

## 4. Pola desktop dan mobile

| Target | Pola layout |
| --- | --- |
| Desktop 1280–1440 px | Rail tetap, top bar konteks, header halaman, workspace 12 kolom, panel ringkasan kanan hanya bila membantu keputusan, tabel padat dengan header tetap. |
| Tablet 768 px | Rail menjadi navigation drawer, grid 6 kolom, detail sekunder turun ke bawah, tabel dapat scroll horizontal terkontrol. |
| Mobile 360–430 px | Satu kolom, app bar ringkas, bottom navigation capability-based, filter/form panjang memakai drawer layar penuh, tabel kompleks menjadi card/list atau scroll berlabel, primary action sticky di safe area. |

Order baru memakai layout dua area pada desktop—input utama dan ringkasan sticky—lalu menjadi satu kolom pada mobile dengan total ringkas dan CTA tetap terlihat. Produksi berubah dari lane desktop menjadi list per status pada mobile dan tidak memakai drag-and-drop. Receipt memakai preview fit-width serta mode print 58/80 mm melalui browser.

## 5. Route coverage

Legenda state: `Ld` loading, `Ø` empty, `Err` error, `Deny` permission-denied, `RO` read-only, `OK` success. `—` berarti state tidak berlaku secara domain, bukan state yang hilang. ID `W01`–`W41` dipakai pada mapping flow agar route literal hanya didefinisikan sekali di manifest ini.

### 5.1 Public, authentication, dan tenant entry

| ID | Route | Tujuan; aktor | Layout region; informasi utama | Primary; secondary action | Mobile transformation | State (`Ld`; `Ø`; `Err`; `Deny`; `RO`; `OK`) | Dialog/drawer | Flow; requirement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| W01 | `/` | Menjelaskan nilai produk; Publik | Public shell: hero, manfaat MVP, CTA, footer | Mulai trial; lihat fitur/harga | Section satu kolom, CTA penuh | Placeholder; konten inti statis; CTA tetap tersedia; —; —; arahkan registrasi | Menu mobile | UF-01; `AUTH-01` |
| W02 | `/features` | Menjelaskan modul dalam scope; Publik | Public shell: daftar modul dan guardrail | Mulai trial; lihat harga | Section bertumpuk | Skeleton; pesan konten; retry; —; —; arahkan registrasi | Menu mobile | UF-01; PRD §5 |
| W03 | `/pricing` | Membandingkan paket pilot; Publik | Public shell: tiga paket, harga, limit, trial | Pilih paket; hubungi tim | Kartu paket bertumpuk | Skeleton plan version; kanal kontak; retry tanpa checkout; —; —; arahkan register/billing sesuai session | Menu mobile | UF-11; `SUB-03`–`SUB-05` |
| W04 | `/contact` | Menemukan kanal bantuan; Publik | Public shell: kanal resmi dan konteks bantuan | Hubungi tim; kembali | Tap target kanal besar | Minimal; kanal belum tersedia; navigasi tetap aktif; —; —; feedback kanal dipilih | Menu mobile | UF-01, UF-11; PRD §5 |
| W05 | `/login` | Membuat session; Publik/pengguna terdaftar | Auth shell: email, password, reset link | Masuk; lupa password/registrasi Owner | Form tunggal, CTA aman dari keyboard | Submit terkunci; —; kredensial/network aman; user login dialihkan; —; arahkan tenant entry | — | UF-01; `AUTH-02`, `AUTH-04` |
| W06 | `/register` | Membuat akun Owner; calon Owner | Auth shell: email, password, consent legal | Buat akun; masuk | Form satu kolom | Submit terkunci; —; validation/duplicate/network; user login dialihkan; —; instruksi verifikasi | — | UF-01; `AUTH-01` |
| W07 | `/verify-email` | Memverifikasi akun; penerima email | Auth shell: email tersamar, status token | Lanjut onboarding/login; kirim ulang | Status dan CTA tunggal | Validasi token; —; expired dan recovery; token invalid tanpa data; —; status terverifikasi | Confirmation resend | UF-01; `AUTH-01` |
| W08 | `/forgot-password` | Meminta reset aman; Publik | Auth shell: email dan instruksi generik | Kirim tautan; kembali login | Satu field | Submit/cooldown; —; pesan generik; —; —; konfirmasi generik | — | UF-01; `AUTH-03` |
| W09 | `/reset-password` | Menetapkan password baru; penerima token | Auth shell: password, konfirmasi, helper | Simpan password; kembali login | Helper selalu terlihat | Token/submit; —; expired/invalid/validation; token invalid aman; —; arahkan login | — | UF-01; `AUTH-03` |
| W10 | `/accept-invitation` | Menerima membership; penerima invitation | Auth shell: tenant, role, outlet, expiry | Terima undangan; login/daftar sesuai email | Ringkasan dan CTA bertumpuk | Validasi token; —; expired/revoked/mismatch; token invalid tanpa metadata; —; membership aktif | Confirmation menerima | UF-01, UF-10; `ORG-02`, `ORG-03` |
| W11 | `/select-tenant` | Memilih tenant aktif; user multi-membership | Auth shell: membership, role, status subscription | Buka tenant; logout | Card satu kolom | Skeleton membership; state tanpa akses/onboarding Owner; retry; membership inactive tidak tampil; badge mode baca; tenant terpilih | Confirmation ganti tenant bila session aktif | UF-01; `AUTH-05`, `AUTH-06` |
| W12 | `/terms` | Membaca syarat; Publik | Public shell: versi, tanggal, isi dokumen | Kembali; hubungi tim | Lebar baca tunggal | Skeleton; kanal kontak; retry; —; —; kembali ke sumber | — | UF-01; PRD §5 |
| W13 | `/privacy` | Membaca privasi; Publik | Public shell: versi, tanggal, isi dokumen | Kembali; hubungi tim | Lebar baca tunggal | Skeleton; kanal kontak; retry; —; —; kembali ke sumber | — | UF-01; PRD §5, §9 |

### 5.2 Onboarding Owner

| ID | Route | Tujuan; aktor | Layout region; informasi utama | Primary; secondary action | Mobile transformation | State (`Ld`; `Ø`; `Err`; `Deny`; `RO`; `OK`) | Dialog/drawer | Flow; requirement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| W14 | `/onboarding/business` | Membuat identitas tenant; Owner terverifikasi | Auth/setup shell: stepper, nama, kontak, timezone, slug preview | Simpan dan lanjut; keluar lalu lanjut nanti | Stepper ringkas, CTA sticky | Progress skeleton/submit; form berpanduan; validation/retry menjaga input; non-Owner diblokir; —; langkah tersimpan | Confirmation keluar | UF-02; `ONB-01`, `ONB-04` |
| W15 | `/onboarding/outlet` | Membuat outlet pertama; Owner onboarding | Setup shell: nama, kode, alamat/kontak | Simpan dan lanjut; kembali | Form satu kolom | Ringkasan/submit; form awal; validation/retry idempotent; tenant tidak cocok; —; outlet tersimpan | — | UF-02; `ONB-02`, `ORG-01` |
| W16 | `/onboarding/services` | Menyiapkan layanan aktif; Owner onboarding | Setup shell: template/custom, unit, harga, durasi, minimum, express | Simpan dan lanjut; tambah/edit layanan | Card template, form drawer layar penuh | Skeleton template; CTA template/custom; service/harga invalid; tenant tidak cocok; —; layanan aktif tersimpan | OV-03 | UF-02; `ONB-03`, `SRV-01`–`SRV-05` |
| W17 | `/onboarding/complete` | Meninjau dan memulai trial; Owner onboarding | Setup shell: ringkasan bisnis, outlet, layanan, trial | Selesaikan onboarding; kembali edit langkah | Section ringkasan | Finalisasi idempotent; daftar langkah kurang; retry tanpa duplikat; non-Owner diblokir; —; dashboard dibuka | Confirmation finalisasi | UF-02; `ONB-04`, `ONB-05`, `SUB-01` |

### 5.3 Tenant application

| ID | Route | Tujuan; aktor | Layout region; informasi utama | Primary; secondary action | Mobile transformation | State (`Ld`; `Ø`; `Err`; `Deny`; `RO`; `OK`) | Dialog/drawer | Flow; requirement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| W18 | `/app/[tenantSlug]/dashboard` | Ringkasan operasi; Owner, Admin, Cashier/Operator terbatas | Tenant shell: konteks outlet/periode, tiga metrik finansial, jumlah/aktif/siap | Buka order/antrean; ubah filter/drill-down | Kartu 2 lalu 1 kolom dan list | Skeleton per widget; CTA order pertama/reset filter; retry widget; tanpa membership tidak memuat data; data tampil, mutasi mati dan billing banner; filter sukses diterapkan | Filter drawer | UF-09; `REP-01`, `REP-02` |
| W19 | `/app/[tenantSlug]/orders` | Mencari order; Owner/Admin/Cashier, Operator minimum | Tenant shell: filter, kode, customer, outlet, ETA, total/balance, state/flag | Buat order bila berizin, atau buka antrean bagi Operator; cari/filter/export tidak tersedia | Card list, filter drawer | Skeleton list; order pertama/reset filter; retry menjaga filter; scope aman; list tersedia dan create/edit mati; hasil filter tampil | Filter drawer | UF-04–UF-07; `ORD-01`, `PRD-02` |
| W20 | `/app/[tenantSlug]/orders/new` | Membuat order cepat; Owner/Admin/Cashier | Tenant shell: customer, item, actual/billable, harga, express, diskon, ETA, payment, total sticky | Konfirmasi order; bayar nanti/DP/lunas dan batalkan draft | Satu kolom, summary/CTA sticky, drawer layar penuh | Skeleton katalog/customer dan submit; tanpa layanan memberi jalur settings bila berizin; validation/stale price/idempotency; capability/outlet invalid; form mutasi tidak dibuka; detail/nota setelah tersimpan | OV-01, OV-06, OV-07 | UF-03–UF-05; `ORD-01`–`ORD-07`, `PAY-01`–`PAY-03` |
| W21 | `/app/[tenantSlug]/orders/[orderId]` | Sumber detail dan tindakan legal; user tenant sesuai scope | Tenant shell: header/outlet, customer, snapshot item, total/payment/balance, ETA, state, histori | Tindakan legal berikutnya; edit, bayar, nota, cancel, handoff sesuai hak/state | Accordion section, primary action sticky | Skeleton per section; not-found aman; conflict/retry dengan correlation ID; tidak mengungkap resource lain; detail tampil dan mutasi mati; feedback action serta state terbaru | OV-07, OV-09, OV-10, OV-11 | UF-04–UF-07; `ORD-*`, `PAY-01`–`PAY-05` |
| W22 | `/app/[tenantSlug]/orders/[orderId]/edit` | Edit/koreksi sesuai state; Owner/Admin/Cashier ber-capability | Tenant shell: field legal, state/payment, total lama/baru, dampak koreksi, alasan | Simpan/koreksi; kembali tanpa mengubah | Section field, impact summary sticky | Skeleton/submit; order final diarahkan detail; validation/version/payment conflict; capability/outlet invalid; field baca dengan alasan; detail order terbaru | OV-09, OV-11 | UF-07; `ORD-08`, `ORD-09`, `PAY-05` |
| W23 | `/app/[tenantSlug]/orders/[orderId]/receipt` | Menampilkan nota berizin; user dengan akses order | Tenant shell/print canvas: outlet, kode, customer, snapshot item, total, payment, balance, ETA, state | Cetak; bagikan/download/kembali detail | Preview fit-width, native share bila ada | Skeleton sampai lengkap; not-found aman; retry print/share; data tidak dirender; lihat/print tetap tersedia; feedback cetak/bagikan | OV-08 | UF-04, UF-05, UF-07; `RCP-01`–`RCP-04` |
| W24 | `/app/[tenantSlug]/production` | Memproses antrean; Owner/Admin/Cashier/Operator | Tenant shell: lane/list state, kode, ETA, express/terlambat, filter | Transisi normal; filter, skip/rollback berizin | List per status, tombol aksi, tanpa drag-drop | Skeleton per lane; antrean kosong/reset filter; rollback UI dan retry; assigned outlet/action; board terlihat dan action mati; status/histori diperbarui | OV-10 | UF-06, UF-07; `PRD-01`–`PRD-05` |
| W25 | `/app/[tenantSlug]/customers` | Mencari/membuat customer; Owner/Admin/Cashier | Tenant shell: search nama/HP, archived filter, ringkasan yang boleh terlihat | Tambah customer; buka detail/reset search | Card list, quick-create layar penuh | Skeleton sambil search aktif; customer pertama/reset; retry menjaga query; capability wajib; list terlihat dan create/archive mati; customer dipilih/dibuat | OV-01 | UF-03, UF-04; `CUS-01`–`CUS-03` |
| W26 | `/app/[tenantSlug]/customers/[customerId]` | Profil/histori scoped; Owner/Admin/Cashier | Tenant shell: profil, warning duplicate, ringkasan/order outlet-visible | Buat order atau ubah profil; arsipkan bila berizin | Section dan timeline card | Skeleton profil/histori; customer tanpa histori; retry per section; histori outlet lain tidak dimuat; data tampil dan mutasi mati; profil diperbarui | OV-01, confirmation arsip | UF-03, UF-04; `CUS-04`, `CUS-05` |
| W27 | `/app/[tenantSlug]/payments` | Ledger dan filter piutang; Owner/Admin/Cashier | Tenant shell: tanggal/outlet/metode/state, kode, waktu, nominal, aktor, balance | Buka order; ubah filter | Tabel menjadi card, filter drawer | Skeleton tabel; belum ada payment/piutang; retry tanpa total parsial; assigned outlet/capability; ledger tampil, mutasi dari detail order tetap mati; drill-down terbuka | Filter drawer | UF-05, UF-08, UF-09; `PAY-01`–`PAY-05`, `REP-05` |
| W28 | `/app/[tenantSlug]/cash-register` | Rekonsiliasi sesi; Cashier pemilik sesi, Owner/Admin ber-capability | Tenant shell: shift, opening, cash payment/movement, expected, physical, variance, review | Buka atau tutup sesi; cash in/out, review/reopen bila berizin | Summary card, keypad, CTA close sticky | Skeleton konteks; CTA buka/no history; stale summary/validation/retry; scope pemilik/manager; sesi aktif boleh ditutup, mutasi lain mati; ringkasan sesi closed | OV-12 | UF-08; `PAY-04`–`PAY-07` |
| W29 | `/app/[tenantSlug]/reports` | Rekonsiliasi laporan; Owner/Admin, Cashier ringkas | Tenant shell: outlet/periode, metrik final, layanan/metode/late, chart dan tabel ekuivalen | Ubah filter/drill-down; reset filter | Chart scroll, tabel/card alternatif | Skeleton per section; periode kosong; error section tanpa total parsial; level laporan/outlet scope; histori tetap tampil; filter/drill-down diterapkan | Filter drawer | UF-09; `REP-01`–`REP-05` |
| W30 | `/app/[tenantSlug]/settings/business` | Mengelola identitas tenant; Owner, Admin baca/edit opsional | Tenant shell/settings: nama, kontak, timezone, slug baca | Simpan bila berizin; batalkan | Form satu kolom | Skeleton/submit; recovery state; validation/retry; edit capability terpisah; data tampil dan save mati; perubahan tersimpan | Confirmation perubahan timezone | UF-02, UF-10; `ONB-01`, `ORG-04` |
| W31 | `/app/[tenantSlug]/settings/outlets` | Mengelola outlet; Owner, Admin opsional | Tenant shell/settings: outlet, kode, state, assignment, usage/limit | Tambah outlet; edit/nonaktif/aktifkan | Card, dialog layar penuh | Skeleton list/dialog; CTA outlet pertama; limit/blocker/validation; organization capability; list tampil dan mutasi mati; outlet tersimpan | OV-02 | UF-02, UF-10, UF-11; `ORG-01`, `SUB-04`, `SUB-05` |
| W32 | `/app/[tenantSlug]/settings/services` | Mengelola layanan/harga; Owner/Admin | Tenant shell/settings: unit, harga default/override, durasi, minimum, express, state | Tambah layanan; edit/nonaktif/hapus override | Card, form drawer layar penuh | Skeleton katalog; CTA layanan pertama; validation/conflict/retry; service capability; katalog tampil dan mutasi mati; snapshot katalog terbaru | OV-03 | UF-02, UF-04; `SRV-01`–`SRV-06` |
| W33 | `/app/[tenantSlug]/settings/staff` | Mengelola invitation/membership; Owner, Admin opsional | Tenant shell/settings: state invitation/member, role, outlet, usage/limit | Undang pegawai; resend/revoke/edit assignment/nonaktifkan | Card, filter, dialog layar penuh | Skeleton list; CTA undangan pertama; duplicate/expired/limit/blocker; organization capability; list tampil dan mutasi mati; invitation/member diperbarui | OV-04 | UF-10; `ORG-02`, `ORG-03`, `ORG-06` |
| W34 | `/app/[tenantSlug]/settings/roles` | Meninjau preset/toggle; Owner, Admin baca/opsional | Tenant shell/settings: matrix empat role dan toggle sensitif terbatas | Simpan toggle; pilih role | Grouped list | Skeleton matrix; konfigurasi preset tidak tersedia; lockout guard/retry; grant dibatasi aktor; matrix tampil dan toggle mati; capability tersimpan | OV-05 | UF-10; `ORG-04`, `ORG-05` |
| W35 | `/app/[tenantSlug]/settings/billing` | Mengelola/recovery subscription; Owner, Admin billing opsional | Tenant shell/settings: paket, status, periode, trial/grace, usage/limit, invoice/histori | Pilih/ubah paket; cancel/downgrade sesuai aturan | Paket stack dan usage bar berlabel | Skeleton dan checkout pending; plan unavailable menuju support; provider/webhook/retry; billing capability; tetap aktif untuk recovery; perubahan pending/terverifikasi terlihat | OV-13 | UF-11; `SUB-01`–`SUB-08` |

### 5.4 Super Admin Platform

| ID | Route | Tujuan; aktor | Layout region; informasi utama | Primary; secondary action | Mobile transformation | State (`Ld`; `Ø`; `Err`; `Deny`; `RO`; `OK`) | Dialog/drawer | Flow; requirement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| W36 | `/admin` | Ringkasan kesehatan Platform; Super Admin Platform | Admin shell: count tenant/subscription dan event perhatian | Cari tenant; buka subscription | Kartu bertumpuk | Skeleton widget; link daftar; retry widget; non-admin diblokir; —; hasil pencarian terbuka | Pencarian tenant | UF-12; `ADM-01`, `ADM-02` |
| W37 | `/admin/tenants` | Mencari tenant; Super Admin Platform | Admin shell: search/filter metadata, paket, status, usage | Buka detail; reset filter | Tabel menjadi card | Skeleton tabel; reset search; retry menjaga query; non-admin diblokir; —; detail tenant terbuka | Filter drawer | UF-12; `ADM-01`, `ADM-02` |
| W38 | `/admin/tenants/[tenantId]` | Menjalankan support action; Super Admin Platform | Admin shell: metadata, subscription, usage, state/history tanpa data operasional | Tambah hari/suspend/reactivate; buka audit/subscription | Section card dan action sheet | Skeleton detail; not-found; concurrent/retry; non-admin diblokir; state tenant hanya objek kelola; histori state diperbarui | OV-15, OV-16 | UF-12; `ADM-02`–`ADM-05` |
| W39 | `/admin/plans` | Mengelola plan version; Super Admin Platform | Admin shell: label, harga tampilan, entitlement, usage, state | Buat versi/edit; arsipkan | Card dan form layar penuh | Skeleton list/form; CTA plan pertama; validation/plan-used guard; non-admin diblokir; —; version/history diperbarui | OV-14 | UF-12; `SUB-03`, `SUB-04`, `ADM-05` |
| W40 | `/admin/subscriptions` | Memantau subscription/event; Super Admin Platform | Admin shell: tenant, plan version, state, periode, usage, invoice/event | Buka tenant; filter | Tabel menjadi card | Skeleton tabel; reset filter; webhook/retry state; non-admin diblokir; semua subscription state tetap terlihat; detail terbuka | Filter drawer | UF-11, UF-12; `SUB-02`, `SUB-07`, `SUB-08` |
| W41 | `/admin/audit-logs` | Menelusuri audit Platform; Super Admin Platform | Admin shell: aktor, aksi, target, metadata tenant, alasan, waktu, correlation ID | Filter audit; reset | Filter drawer dan card | Skeleton tabel; reset filter; retry tanpa klaim parsial; non-admin diblokir; —; hasil filter tampil | Filter drawer | UF-12; `ADM-05`, `ADM-06` |

## 6. Mapping user flow ke layar

| Flow | Jalur layar | Overlay utama | Bukti akhir |
| --- | --- | --- | --- |
| UF-01 | W06 → W07 → W05 → W11; jalur reset W08 → W09; pegawai W10 | Confirmation resend/terima/ganti tenant | Session berada pada membership/tenant sah atau denied aman. |
| UF-02 | W14 → W15 → W16 → W17 → W18 | OV-03 dan confirmation finalisasi | Tenant operasional, satu outlet, layanan aktif, trial dimulai. |
| UF-03 | W25/W20 → W26 | OV-01 dan confirmation arsip | Customer tenant-wide tersimpan, warning duplikat dan histori scoped. |
| UF-04 | W19 → W20 → W21 → W23 | OV-01, OV-06, OV-07, OV-08 | Order RECEIVED dan payment state terpisah, snapshot serta nota tersedia. |
| UF-05 | W21 → W23; ledger W27 sebagai drill-down | OV-07, OV-11 | Payment immutable, balance/state/nota/audit konsisten. |
| UF-06 | W24 ↔ W21 | OV-10 | Transisi valid tersimpan dengan aktor, waktu, dan alasan jika wajib. |
| UF-07 | W21 → W22/W23 | OV-09, OV-10, OV-11 | Edit/cancel/handoff sah tanpa menghapus histori/ledger. |
| UF-08 | W28; rekonsiliasi W27/W29 | OV-12 | Sesi CLOSED berisi expected, physical, variance, reason/flag. |
| UF-09 | W18 → W29 → W21/W27 | Filter drawer | Metrik final terfilter dan dapat ditelusuri ke transaksi sumber. |
| UF-10 | W31 → W33 → W34; acceptance invitation W10 | OV-02, OV-04, OV-05 | Outlet, membership, assignment, dan capability konsisten serta teraudit. |
| UF-11 | W03 → W35 | OV-13 | Subscription/entitlement mengikuti state server terverifikasi. |
| UF-12 | W36 → W37 → W38; W39/W40/W41 | OV-14, OV-15, OV-16 | Metadata/plan/subscription berubah sah dan teraudit tanpa data operasional. |

## 7. Critical dialog, drawer, confirmation, dan feedback

| ID | Pola dan isi minimum | Pemicu/layar | Guardrail |
| --- | --- | --- | --- |
| OV-01 | Drawer **Pelanggan baru/ubah**: nama, HP, kandidat duplikat, gunakan lama atau simpan baru | W20, W25, W26 | Menjaga draft; nama wajib; HP opsional; warning tidak memblokir. |
| OV-02 | Dialog/drawer **Tambah/Edit outlet**: nama, kode, kontak, state, penggunaan/limit | W31 | Code unik; entitlement; blocker order non-final dan outlet onboarding terakhir. |
| OV-03 | Drawer **Tambah/Edit layanan**: unit, harga, minimum, durasi, express, inheritance outlet | W16, W32 | Hanya kiloan/satuan; snapshot order lama tidak berubah. |
| OV-04 | Dialog **Undang pegawai**: email, preset role, outlet assignment, limit | W33 | Invitation lifecycle, expiry/cooldown, tidak membuat role baru. |
| OV-05 | Drawer **Capability role**: grouped toggle sensitif dan ringkasan dampak | W34 | Hanya toggle yang disetujui; grant actor dan last-Owner guard. |
| OV-06 | Dialog **Diskon**: nominal/persen, nilai, alasan, gross dan hasil | W20 | Maksimum 20%, satu diskon, capability, alasan wajib. |
| OV-07 | Dialog **Pembayaran**: DP/lunas, metode, applied amount, cash tendered/change atau reference/label | W20, W21 | Applied amount ≤ balance; cash memerlukan sesi aktif; konfirmasi atomik. |
| OV-08 | Dialog **Cetak nota**: preview, 58/80 mm, print, Web Share, download | W23 | Session/order berizin; tanpa ID internal atau public link. |
| OV-09 | Action drawer **Edit/Cancel/Handoff**: tindakan legal, dampak payment, alasan/recipient jika wajib | W21, W22 | Edit menurut state; cancel sebelum final; handoff balance hanya capability; confirmation. |
| OV-10 | Dialog **Rollback/Skip status**: old/new state, alasan, actor, dampak antrean | W21, W24 | State non-final, capability, seluruh item siap untuk skip, audit. |
| OV-11 | Dialog **Void/Reversal/Refund**: payment asal, jenis koreksi legal, amount penuh, alasan | W21, W22 | Record asal tetap; refund penuh per payment; efek kas sesuai metode/periode. |
| OV-12 | Step dialog **Buka/Tutup kas**: shift/opening atau expected/physical/variance/reason | W28 | Satu sesi per kasir/outlet/shift; refresh bila stale; close tetap boleh saat read-only. |
| OV-13 | Dialog **Upgrade/ubah paket**: paket, usage/limit, periode, pending checkout | W35 | Aktif hanya setelah webhook terverifikasi; blocker downgrade dan tanpa proration. |
| OV-14 | Confirmation **Archive plan**: version, tenant terpakai, dampak dan alasan | W39 | Plan terpakai tidak dihapus; histori dan audit tetap ada. |
| OV-15 | Confirmation **Suspend tenant**: state saat ini, dampak read-only, alasan | W38 | Manual override bertahan sampai reactivation eksplisit; tanpa data operasional. |
| OV-16 | Confirmation **Reactivate tenant**: state/entitlement hasil, alasan | W38 | Capability Platform, concurrent review, audit before/after. |

Semua overlay memakai judul tindakan, target dan konteks outlet/tenant, ringkasan dampak, tombol primer spesifik, tombol batal, state submit, error inline, serta feedback success. Destructive/sensitive confirmation tidak bergantung kata “Ya”; label tombol menyebut tindakan, misalnya **Batalkan pesanan** atau **Suspend tenant**.

## 8. Screen-state matrix

| State | Komposisi low-fidelity | Perilaku tindakan |
| --- | --- | --- |
| Default | Data fixture lengkap, konteks dan filter terlihat, satu primary action dominan. | Hanya action yang sah bagi persona/capability aktif. |
| Loading | Skeleton mengikuti geometri konten; judul/konteks tetap; submit menampilkan progress. | Cegah submit ganda; navigasi aman tetap tersedia. |
| Empty | Menjelaskan data/filter yang kosong dan tindakan pemulihan yang relevan. | CTA create hanya bila capability, entitlement, dan mode akses mengizinkan. |
| Error | Pesan Bahasa Indonesia, area terdampak, retry, dan correlation ID untuk error operasional. | Tidak menampilkan data parsial sebagai total final; success tidak dipalsukan. |
| Permission denied | Pesan akses ditolak tanpa nama/data resource yang tidak boleh diketahui. | Kembali ke tujuan yang sah; tidak ada mutasi atau bocoran data. |
| Read-only | Data yang semula boleh dibaca tetap terlihat; banner sebab dan jalur recovery. | Semua mutasi mati kecuali billing berizin dan close sesi kas yang sudah aktif. |
| Success | Feedback singkat berisi hasil dan next action; data/state terbaru mengganti draft. | Fokus berpindah ke feedback atau heading hasil lalu action berikutnya. |

Untuk public/auth yang tidak mempunyai konsep tenant read-only atau permission, simulasi menampilkan label **Tidak berlaku pada layar ini** tanpa menyiratkan state produk baru.

## 9. Responsive, keyboard, dan focus behavior

- Urutan DOM sama dengan urutan baca visual; setiap route memiliki satu `h1`, landmark main, label input, dan skip link pada shell aplikasi.
- `Tab`/`Shift+Tab` menjangkau kontrol dalam urutan logis; `Enter`/`Space` mengaktifkan kontrol; `Escape` menutup overlay yang belum submit. Fokus terlihat pada grayscale.
- Dialog mengunci fokus, menempatkan fokus awal pada judul atau field pertama yang aman, lalu mengembalikan fokus ke trigger. Error submit memindahkan fokus ke ringkasan error dan menaut field terkait.
- Setelah hash/route berubah, fokus menuju heading halaman. Feedback async diumumkan melalui live region tanpa menghapus konteks input.
- Search customer/order mendukung keyboard: ketik, panah memilih hasil, `Enter` memilih. Form order menjaga nilai input ketika drawer customer/diskon/payment dibuka.
- Quantity kiloan memakai input desimal maksimal dua digit; satuan memakai integer. Ringkasan menunjukkan actual dan billable agar minimum charge tidak tersembunyi.
- Mobile action tidak bergantung hover, drag, swipe tersembunyi, atau warna. Target sentuh dan safe-area disiapkan untuk fase design system.
- Tabel desktop mempunyai header/label kolom; transformasi card mobile mempertahankan kode, status, nominal, waktu, dan primary action. Horizontal scroll selalu mempunyai label dan tidak mengunci page scroll.

### 9.1 Target transaksi pelanggan lama

Skenario audit lengkap dapat diselesaikan dalam paling banyak 12 interaksi utama: (1) buka Order Baru, (2) cari dan pilih customer lama, (3) pilih layanan kiloan, (4) isi berat, (5) tambah layanan satuan, (6) isi jumlah, (7) aktifkan express, (8) terapkan diskon beralasan, (9) pilih DP, (10) isi metode dan nominal, (11) konfirmasi order, (12) cetak nota. Transaksi reguler tanpa opsi express/diskon/DP memakai lebih sedikit langkah. Penghitungan ini menilai penyelesaian kelompok input bermakna, bukan setiap penekanan tombol saat mengetik.

## 10. Keputusan layout yang diambil

Keputusan berikut hanya menentukan representasi dan dapat ditinjau pada gate wireframe; tidak mengubah keputusan produk:

1. Rail desktop dan bottom navigation mobile dipakai untuk tenant app; tujuan berfrekuensi rendah masuk menu **Lainnya**.
2. Konteks tenant, outlet, timezone, dan subscription ditempatkan pada top bar/banner sebelum konten operasional.
3. Order baru memakai input utama plus ringkasan sticky; drawer menjaga draft untuk customer, diskon, dan payment.
4. Daftar produksi desktop memakai lane, sedangkan mobile memakai grouped list dengan tombol transisi eksplisit.
5. Tabel padat menjadi card/list pada mobile; hanya tabel yang tetap perlu perbandingan kolom memakai scroll horizontal terkontrol.
6. Settings mempertahankan satu route daftar per domain dan memakai drawer/dialog untuk create/edit sesuai Screen Map.
7. Aksi sensitif ditempatkan pada action menu sekunder, bukan bersaing dengan primary action normal.
8. Super Admin memakai shell dan boundary berbeda agar tidak menyerupai akses tenant atau menyediakan impersonation tersirat.

## 11. Acceptance criteria wireframe

- Manifest memuat tepat W01–W41 dan tidak membuat route baru.
- UF-01–UF-12 dapat dijalankan end-to-end melalui layar dan overlay yang dipetakan.
- Public, authentication, tenant app, dan Super Admin shell terbaca berbeda tanpa branding final.
- Persona/capability mengatur navigasi, data, dan action sesuai Permission Matrix.
- Tenant/outlet aktif selalu terlihat pada operasi; **Semua outlet** hanya dashboard/laporan berizin.
- Subscription PAST_DUE menampilkan grace/banner; SUSPENDED/CANCELED menampilkan read-only dengan billing recovery berizin.
- Default, loading, empty, error, permission-denied, read-only, dan success dapat disimulasikan.
- Seluruh critical overlay OV-01–OV-16 mempunyai context, validation, confirmation, error, dan feedback yang relevan.
- Produksi mobile tidak memakai drag-and-drop; status/express/terlambat tidak dibedakan hanya melalui warna.
- Form order menampilkan formula sebagai hasil kanonis, menjaga draft, mendukung keyboard, dan skenario audit tidak melebihi 12 interaksi utama.
- Nota hanya tersedia dalam session berizin untuk layar/print/Web Share/download dan mendukung 58/80 mm.
- Layout dapat ditinjau pada 360–430 px, 768 px, serta 1280–1440 px tanpa primary action terhalang.
- Tidak ada visual design final, dependency, network request, penyimpanan browser, source aplikasi, atau perubahan aturan produk pada artefak wireframe.

Approval Product Owner atas hierarchy, navigasi, konteks outlet, primary action, critical state, dan happy path diperlukan sebelum gate dinyatakan `PASSED` dan fase design system dimulai.
