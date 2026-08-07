# Audit Low-Fidelity Wireframe — LaundryKita MVP

| Atribut | Hasil |
| --- | --- |
| Tanggal audit | 7 Agustus 2026 |
| Scope | `docs/WIREFRAMES.md` dan `design/wireframes/*` |
| Baseline | PRD 1.0 dan seluruh dokumen kanonis berstatus `APPROVED` |
| Validasi teknis | `PASS` |
| Rekomendasi gate | `READY_FOR_APPROVAL` — bukan `PASSED` |

Audit ini membandingkan artefak wireframe dengan [`PRD.md`](PRD.md), [`DOMAIN_RULES.md`](DOMAIN_RULES.md), [`ROLE_PERMISSION_MATRIX.md`](ROLE_PERMISSION_MATRIX.md), [`USER_FLOWS.md`](USER_FLOWS.md), dan [`SCREEN_MAP.md`](SCREEN_MAP.md). Prototype tetap merupakan artefak desain statis, bukan source aplikasi atau enforcement keamanan.

## 1. Ringkasan hasil

| Area | Target | Hasil | Status |
| --- | ---: | --- | --- |
| Route | 41 | 41 di Screen Map, 41 di spesifikasi wireframe, dan 41 di manifest prototype; seluruh set identik, unik, tanpa missing/extra | `PASS` |
| User flow | UF-01–UF-12 | 12 flow unik tercakup oleh 18 happy path | `PASS` |
| Critical overlay | 19 kebutuhan minimum | 21 definisi tersedia dan 21 direferensikan; handoff serta reversal dipisahkan untuk memperjelas tindakan kanonis | `PASS` |
| Screen state | 7 | Default, Loading, Empty, Error, Permission denied, Read-only, Success | `PASS` |
| Persona | 6 pilihan simulasi | Public, Owner, Admin, Cashier, Operator, Super Admin | `PASS` |
| Outlet context | 3 pilihan | Sudirman/Kemang; Semua outlet hanya pada dashboard/laporan berizin | `PASS` |
| Subscription state | 5 | TRIALING, ACTIVE, PAST_DUE, SUSPENDED, CANCELED | `PASS` |
| Order pelanggan lama | Maksimal 12 interaksi utama | 11 interaksi utama pada prototype | `PASS` |
| Dependency/network/storage | Tidak ada | Tidak ditemukan package, dependency, external asset, request jaringan, atau browser storage | `PASS` |

Tidak ditemukan kontradiksi yang memerlukan pembukaan keputusan produk atau perubahan dokumen kanonis.

## 2. Route coverage dan navigasi

- Ekstraksi tabel [`SCREEN_MAP.md`](SCREEN_MAP.md): 41 route, 41 unik.
- Manifest W01–W41 pada [`WIREFRAMES.md`](WIREFRAMES.md): 41 route, 41 unik, missing 0, extra 0.
- `ROUTES` pada [`prototype.js`](../design/wireframes/prototype.js): 41 route, 41 unik, missing 0, extra 0.
- Navigasi sidebar, bottom navigation, route index, scenario runner, dan helper `navigate()` memakai hash serta manifest yang sama. Placeholder `[tenantSlug]`, `[orderId]`, `[customerId]`, dan `[tenantId]` dipertahankan literal agar identik dengan Screen Map.
- Route yang tidak sesuai persona menghasilkan permission-denied. Konteks tenant pada denied state diganti konteks generik sehingga nama tenant/outlet tidak bocor.

Audit statis membuktikan kesetaraan manifest dan mekanisme hash. Bukti render browser dicatat terpisah pada bagian visual QA.

## 3. Flow coverage

| Flow | Happy path utama dalam prototype |
| --- | --- |
| UF-01 | Registrasi Owner; verifikasi email; login dan pemilihan tenant |
| UF-02 | Onboarding bisnis, outlet, layanan, dan aktivasi trial |
| UF-03 | Quick-create pelanggan dengan draft tetap terjaga |
| UF-04 | Order kiloan, item satuan, express, diskon, DP, dan nota |
| UF-05 | DP/pelunasan serta akses koreksi payment dari detail order |
| UF-06 | RECEIVED → WASHING → DRYING → IRONING → READY |
| UF-07 | Pelunasan READY, handoff PAID, lalu COMPLETED; edit/cancel tersedia sesuai capability |
| UF-08 | Belum ada sesi → OPEN → CLOSED dengan rekonsiliasi |
| UF-09 | Dashboard, laporan, dan drill-down transaksi sumber |
| UF-10 | Invitation pegawai, assignment, outlet, dan capability preset |
| UF-11 | Paket, usage/limit, checkout pending, dan recovery billing |
| UF-12 | Review metadata tenant, suspend, reactivate, plan, subscription, dan audit Platform |

Jumlah scenario adalah 18 dan himpunan ID flow tepat UF-01 sampai UF-12. Runner menampilkan state antara untuk handoff, sesi kas, serta suspend/reactivate; fixture tidak disimpan setelah reload.

## 4. Overlay coverage

Kebutuhan minimum seluruhnya tersedia: quick-create pelanggan; tambah/edit outlet; tambah/edit layanan; undang pegawai; capability role; diskon; pembayaran; print nota; edit dan cancel order; rollback status; void dan refund; buka dan tutup kas; upgrade paket; archive plan; suspend dan reactivate tenant.

Prototype mempunyai 21 definisi overlay dan 21 referensi tanpa ID unresolved. Dua representasi tambahan bukan scope baru:

- handoff dipisahkan dari drawer edit/cancel agar transisi READY → COMPLETED dan syarat PAID terlihat;
- reversal dipisahkan dari void/refund karena sudah merupakan koreksi ledger kanonis di Domain Rules.

Overlay sensitif memuat target/dampak, alasan bila wajib, confirmation, cancel, submit state, dan feedback. Permission overlay diperiksa per persona sebelum dibuka; default Cashier tidak memperoleh diskon, cancel, rollback, void/reversal, atau refund sensitif.

## 5. State, permission, read-only, dan outlet

### Screen state

Ketujuh state dapat dipilih dari control panel. Loading mempertahankan geometri dan mencegah submit; Empty memberi recovery action; Error tidak mengklaim total parsial dan menampilkan correlation ID; Permission denied tidak memuat data resource; Read-only mempertahankan baca serta mematikan mutasi; Success memakai feedback teks dan ikon.

### Permission dan data scope

- Navigasi diturunkan dari route role/capability fixture dan direct URL tetap diuji dengan denied state.
- Operator hanya melihat antrean, kode, outlet, status, ETA, flag, ringkasan layanan, dan catatan produksi; customer serta data keuangan tidak dimuat.
- Cashier melihat ringkasan operasional outlet dan laporan shift/kas, bukan laporan penuh atau agregasi lintas outlet.
- Admin default tidak memperoleh organization/billing toggle opsional; settings bisnis tersedia baca saja.
- Super Admin memakai shell terpisah dan hanya melihat metadata tenant, subscription, entitlement usage, serta audit Platform—tanpa impersonation atau data operasional.
- Payment ledger hanya membuka/filter transaksi; void, reversal, dan refund dimulai dari detail order.

### Read-only dan subscription

- PAST_DUE tetap dapat bermutasi selama grace 7 hari dan menampilkan banner recovery.
- SUSPENDED/CANCELED atau simulasi Read-only menonaktifkan mutasi tenant.
- Billing recovery tetap tersedia untuk Owner pada fixture default; Admin default tidak mempunyai `billing.manage`.
- Close sesi kas yang sudah aktif tetap tersedia; buka sesi, payment, movement, status, edit, cancel, refund, dan resource baru tetap diblokir.

### Outlet

- Tenant, outlet aktif, timezone, persona, dan subscription terlihat pada shell operasional.
- Sudirman/Kemang dapat dipilih sebagai satu konteks outlet aktif.
- **Semua outlet** disembunyikan selain pada dashboard/laporan Owner dan laporan agregat assigned-outlet Admin.
- Jika berpindah ke route yang tidak mengizinkan agregasi, konteks otomatis kembali ke Outlet Sudirman.
- Detail transaksi menyebut outlet asal dan tidak menyediakan transfer antar-outlet.

## 6. Financial correctness dan scope guard

Fixture order `SDR-260807-0042` konsisten di daftar, detail, nota, dan scenario:

```text
subtotal item = (3,00 × Rp7.000) + (2 × Rp15.000) = Rp51.000
express 25%  = Rp12.750
gross        = Rp63.750
diskon 10%   = Rp6.375
total        = Rp57.375
DP           = Rp10.000
balance      = Rp47.375
```

Fixture kas juga konsisten: `Rp500.000 + Rp350.000 + Rp50.000 − Rp25.000 = Rp875.000`. Transfer/QRIS tidak dimasukkan ke kas fisik. Order state, payment state, cash-session state, dan subscription state tetap dipisahkan.

Audit literal memastikan hanya role, order state, payment state, subscription state, dan tiga paket pilot kanonis yang dipakai. Tidak ditemukan route baru, payment gateway customer, public receipt link, Courier, dry-clean workflow, inventory, payroll, offline mutation queue, impersonation, atau fitur non-scope lain.

## 7. Responsive, keyboard, dan focus coverage

Audit CSS/markup menemukan:

- desktop default untuk target 1280–1440 px;
- tablet melalui breakpoint maksimum 1050 px, termasuk target 768 px;
- mobile/tablet sempit melalui breakpoint maksimum 800 px dan penyesuaian rapat maksimum 390 px, termasuk target 360–430 px serta target tablet 768 px;
- tabel kompleks memakai card/list atau `overflow-x: auto` terkontrol;
- CTA konfirmasi order mempunyai action bar fixed di atas bottom navigation, sedangkan summary lengkap tetap berada di alur baca;
- field aktual, tertagih, harga, dan subtotal item tetap terlihat pada layout order mobile;
- production mobile tidak bergantung drag-and-drop;
- skip link, satu `main`, fokus terlihat, fokus heading setelah hash berubah, native modal focus containment, `Escape`, reduced-motion, dan print stylesheet tersedia;
- status memakai teks/ikon dan tidak bergantung warna.

### Visual QA yang dilakukan auditor ini

Auditor independen ini tidak merender prototype di browser dan tidak mengklaim visual QA 360 px/1440 px. Pemeriksaan pada bagian ini bersifat statis terhadap CSS, markup, dan behavior JavaScript. Hasil render browser yang benar-benar dilakukan harus ditambahkan sebagai bukti terpisah sebelum approval Product Owner.

Agen utama telah mencoba membuka preview melalui in-app browser, tetapi runtime browser tidak tersedia. Percobaan fallback Chrome/Edge headless juga ditolak lingkungan dengan `Access denied`. Tidak ada screenshot atau render aktual yang dihasilkan; karena itu responsive/visual QA tetap dinyatakan **belum tervalidasi secara visual**, bukan lulus.

## 8. Validation command dan hasil

| Pemeriksaan | Perintah/ringkasan | Hasil |
| --- | --- | --- |
| Sintaks JavaScript | `node --check design/wireframes/prototype.js` dengan Node v24.18.0 | `PASS` |
| Route set | Ekstraksi regex Screen Map, W01–W41, dan `ROUTES`; `Compare-Object` | 41/41; missing 0; extra 0; duplikat 0 |
| Flow/scenario | Ekstraksi `HAPPY_PATHS` | 18 scenario; 12 flow unik |
| Overlay | Ekstraksi `OVERLAYS` dan seluruh referensi | 21 definisi; 21 referensi; unresolved 0; kebutuhan minimum hilang 0 |
| State/persona | Audit literal control/manifest | 7 state; 6 persona; missing 0 |
| Network/storage | Scan `fetch`, XHR, WebSocket, EventSource, sendBeacon, storage, import/require, dan URL eksternal | 0 temuan |
| Dependency | `Get-ChildItem -Recurse -Filter package.json` | 0 file |
| Link relatif | Scan Markdown repository dan `Test-Path` target | 55 link diperiksa pada 14 file Markdown; broken 0 |
| Whitespace | `git diff --check` | `PASS` |

## 9. Limitation dan risiko UX tersisa

Limitasi yang disengaja dan bukan blocker teknis:

- Prototype tidak menjalankan validasi server, persistence, print/Web Share/download, email, checkout, autentikasi, atau network request nyata.
- Permission dan subscription guard hanya simulasi visual; enforcement production tetap server-side.
- Scenario runner mengganti representasi fixture, bukan membuat ledger atau histori persisten.
- Breakpoint telah tercakup secara statis, tetapi density, scroll, safe-area, keyboard virtual, focus return, dan print 58/80 mm tetap perlu inspeksi browser/perangkat.

Risiko yang wajib diaudit Product/UX sebelum design system:

1. Apakah 11 interaksi utama order tetap dapat diselesaikan dalam dua menit oleh kasir baru.
2. Apakah ringkasan sticky dan bottom navigation tidak bertabrakan pada 360 px serta saat keyboard mobile terbuka.
3. Apakah perbedaan order state, payment state, dan read-only cukup jelas tanpa visual color final.
4. Apakah tabel/card payment, laporan, role, serta audit masih mudah dipindai pada data padat.
5. Apakah confirmation finansial memberi cukup friction tanpa memperlambat transaksi normal.
6. Apakah receipt 58/80 mm dan browser print tetap terbaca pada printer pilot.

## 10. Blocker dan rekomendasi gate

Tidak ada blocker dokumentasi, scope, route, flow, permission, formula, atau teknis statis yang ditemukan. Seluruh validasi teknis yang dijalankan lulus.

Rekomendasi fase adalah `READY_FOR_APPROVAL`, bukan `PASSED`. Product Owner masih harus menyetujui hierarchy, navigation, konteks outlet, primary action, critical state, responsive render, dan happy path sebelum design system dimulai.
