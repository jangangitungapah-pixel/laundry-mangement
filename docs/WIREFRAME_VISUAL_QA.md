# Visual QA Low-Fidelity Wireframe — LaundryKita MVP

| Atribut | Hasil |
| --- | --- |
| Tanggal | 8 Agustus 2026 |
| Target | `design/wireframes/index.html` melalui local static server |
| Browser | Chromium, dikendalikan dengan Playwright |
| Baseline | [`WIREFRAMES.md`](WIREFRAMES.md) dan [`SCREEN_MAP.md`](SCREEN_MAP.md) |
| Hasil akhir | `PASS` |
| Gate | `PASSED` melalui owner-delegated approval |

Dokumen ini mencatat inspeksi browser yang benar-benar dijalankan. Prototype tetap artefak desain statis, bukan source aplikasi atau enforcement permission.

## 1. Cakupan

| Area | Target | Hasil |
| --- | ---: | --- |
| Route | 41 | 41/41 dapat dinavigasi; title unik; missing/extra/gagal 0 |
| Happy path | 18 | 18/18 selesai; 44 step; mencakup UF-01–UF-12 |
| Critical overlay | 21 | 21/21 terbuka; ID unresolved 0 |
| Screen state | 7 | Default, Loading, Empty, Error, Permission denied, Read-only, Success |
| Persona | 6 | Public, Owner, Admin, Cashier, Operator, Super Admin |
| Viewport | 3 | 1440×900, 768×1024, 360×800 |
| Print | 2 | 58 mm dan 80 mm |

Seluruh route pada manifest `ROUTES` diuji dengan persona yang sah. Route prioritas yang diinspeksi lebih dalam meliputi login, register, verifikasi email, onboarding bisnis/outlet/layanan, tenant selector, dashboard, order baru, detail order, production board, sesi kas, laporan, billing, daftar tenant Super Admin, detail tenant, plan, dan audit Platform.

## 2. Viewport dan responsive behavior

| Viewport | Sampel utama | Hasil |
| --- | --- | --- |
| 1440×900 | Login, dashboard, order baru, detail order, production, laporan, billing, Super Admin | Desktop shell dan hierarchy terbaca; order item tidak menabrak sticky summary; root overflow 0 |
| 768×1024 | Onboarding, dashboard, order, laporan, billing, settings | Tablet transformation stabil; chip membungkus; tabel memakai pola responsif; root/screen overflow 0 untuk 41 route |
| 360×800 | Auth, order baru/detail, production, kas, laporan, billing, Super Admin | Bottom navigation dan sticky primary action tidak bertabrakan; card/list terbaca; root/screen overflow 0 untuk 41 route |

Pada 360 px, primary action order tetap berada di atas bottom navigation. Semua outlet hanya muncul pada dashboard/laporan untuk persona berizin; route operasional otomatis kembali ke satu outlet aktif.

## 3. Happy path dan transaksi reguler

Runner diuji dari registrasi Owner sampai tindakan Super Admin. Semua 18 scenario selesai tanpa runtime error dan mencakup:

- UF-01: register, verifikasi email, login, dan pemilihan tenant;
- UF-02: onboarding bisnis, outlet, layanan, dan trial;
- UF-03–UF-05: quick-create pelanggan, order kiloan+satuan, express, diskon berizin, DP, pembayaran, dan nota;
- UF-06–UF-08: produksi, pelunasan/handoff, buka serta tutup sesi kas;
- UF-09–UF-12: dashboard/laporan, pegawai/outlet, subscription, serta tenant Super Admin.

Skenario order pelanggan lama memakai 11 interaksi utama, di bawah batas maksimum 12. Ini adalah hitungan kelompok input bermakna; target durasi dua menit tetap perlu usability test dengan kasir pada fase design system/pilot.

## 4. Overlay, keyboard, dan focus

Seluruh overlay berikut dibuka di browser: quick customer, outlet form, service form, invite staff, role capability, discount, payment, print receipt, edit order, cancel order, handoff, rollback, void, reversal, refund, cash open, cash close, upgrade plan, archive plan, suspend tenant, dan reactivate tenant.

- focus masuk ke dialog/drawer dan tetap berada di dalam overlay;
- `Escape` menutup overlay yang dapat dibatalkan;
- focus kembali ke pemicu setelah overlay ditutup;
- navigasi route memindahkan focus ke `#screen`;
- `Tab` memperlihatkan outline focus solid 3 px;
- status selalu mempunyai label teks, bukan warna saja.

## 5. Permission, read-only, state, dan outlet

- Operator yang membuka langsung route order baru mendapat permission-denied tanpa data tenant/customer/keuangan.
- Pada SUSPENDED, mutasi order nonaktif; billing recovery tetap tersedia untuk Owner.
- Pada sesi kas yang sudah aktif, read-only tetap mengizinkan close session namun memblokir pembukaan sesi dan mutasi baru.
- Ketujuh screen state dapat dipilih dan dirender tanpa overflow.
- Owner dapat memilih Semua outlet pada dashboard/laporan; konteks tersebut tidak tersedia pada route operasional.
- Setelah reload dan seluruh smoke-test, console/runtime error berjumlah 0.

## 6. Print 58 mm dan 80 mm

Nota diuji memakai Chromium print media dan PDF dengan ukuran halaman 58 mm serta 80 mm.

| Ukuran | Document/receipt width | Hasil |
| --- | --- | --- |
| 58 mm | 219 CSS px / 219 CSS px | Tidak clipping; teks dan total terbaca |
| 80 mm | 302 CSS px / 302 CSS px | Tidak clipping; teks dan total terbaca |

Control panel, navigation, action, dan traceability panel tidak tercetak. Nota hanya memuat data receipt yang diizinkan. Printer thermal fisik belum diuji dan tetap menjadi pemeriksaan pilot, bukan blocker wireframe.

## 7. Temuan dan perbaikan

| Temuan | Dampak | Perbaikan | Retest |
| --- | --- | --- | --- |
| Atribut `hidden` kalah oleh `display:flex` scenario runner | Runner tetap aktif dan scenario selesai dapat memicu error | Tambah aturan global `[hidden] { display:none !important; }` | 18/18 scenario, error 0 |
| Drawer off-canvas dan chip traceability memperlebar document | Horizontal scroll/clipping pada sejumlah route | Clip overflow root dan izinkan `.chip-row` membungkus | 41/41 pada 768 dan 360, overflow 0 |
| Grid item order desktop terlalu lebar | Item menyentuh sticky summary pada 1440 | Batasi kolom kuantitas/harga/subtotal dengan `minmax` yang lebih rapat | Overlap 0 |
| Receipt selalu 80 mm dan root minimum 320 px saat print | Nota 58 mm dapat terpotong | Reset print min-width; receipt `width:100%` dengan `max-width:80mm`; sembunyikan panel non-receipt | 58/80 mm sesuai lebar, clipping 0 |
| Browser meminta favicon yang tidak ada | Console 404 | Tambah data favicon kosong lokal | Console error 0 |

Perbaikan hanya menyentuh `design/wireframes/` dan tidak mengubah route, flow, role, state, formula, entitlement, atau keputusan produk.

## 8. Perintah dan bukti validasi

- local server: `python -m http.server 4173 --bind 127.0.0.1`;
- browser automation: `playwright-cli` session terhadap `http://127.0.0.1:4173/design/wireframes/`;
- sintaks: `node --check design/wireframes/prototype.js`;
- route/flow/overlay/state: manifest extraction dan browser smoke-run;
- responsive: screenshot serta pengukuran `clientWidth`, `scrollWidth`, dan bounding box;
- print: Chromium print-media screenshot dan PDF 58/80 mm;
- repository: link check dan `git diff --check`.

Screenshot/PDF QA merupakan artefak sementara dan tidak menjadi bagian source repository. Hasil yang dapat direproduksi dicatat sebagai angka dan kondisi lulus pada dokumen ini.

## 9. Risiko tersisa dan keputusan gate

Tidak ada blocker visual atau teknis tersisa. Risiko non-blocking untuk fase berikutnya:

1. usability test dua menit dengan kasir baru;
2. keyboard virtual dan safe-area pada perangkat fisik;
3. density tabel/card dengan data pilot yang lebih padat;
4. kalibrasi printer thermal 58/80 mm yang dipakai outlet pilot;
5. kontras dan hierarchy setelah token visual final diterapkan.

Dengan mandat persetujuan yang didelegasikan Product Owner, hasil audit ini menaikkan low-fidelity wireframe menjadi `PASSED`. Design system boleh dimulai; implementasi frontend feature tetap menunggu design-system gate.
