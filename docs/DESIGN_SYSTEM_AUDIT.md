# Design System Audit — LaundryKita

| Atribut     | Nilai                                                                      |
| ----------- | -------------------------------------------------------------------------- |
| Tanggal     | 8 Agustus 2026                                                             |
| Scope       | Token, primitive, preview, responsive, aksesibilitas, dan print foundation |
| Browser QA  | Chromium melalui Playwright CLI                                            |
| Hasil akhir | `PASSED`                                                                   |
| Approval    | Owner-delegated sesuai mandat; tidak mengubah keputusan produk             |

## Coverage implementasi

- Token semantik: warna, type, spacing, radius, elevation, width, breakpoint, z-index, focus, motion, reduced motion, dan minimum target.
- Komponen: aksi, form/field, status, surface, feedback, tabs/dropdown, overlay, data/responsive list, pagination/filter, async/state, shell, dan receipt.
- Preview: seluruh token/state, shell desktop/mobile, form order demo, tabel/kartu demo, board produksi demo, dialog/drawer, plan cards demo, state matrix, serta nota 58/80 mm.
- Scope guard: tidak ada router/route produk, auth, API request, backend, SDK bisnis, fixture produksi, atau implementasi feature.

## Accessibility QA

| Pemeriksaan           | Hasil                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| Keyboard entry        | Tab pertama menuju skip link; focus outline 2 px terlihat                                          |
| Dialog                | Fokus masuk overlay, tetap terperangkap setelah enam Tab, Escape menutup, fokus kembali ke trigger |
| Drawer/confirmation   | Behavior fokus, Escape, dan konfirmasi tercakup component test                                     |
| Reduced motion        | Smooth scroll menjadi `auto`; transition efektif mendekati 0 ms                                    |
| Accessible name       | Icon button dan close control memiliki nama; input terhubung ke label/error                        |
| Target 44 px          | Semua pemicu memenuhi minimum; visual switch 48 × 28 berada dalam label hit area minimum 44 px     |
| Status non-color-only | Badge, banner, alert, dan state memakai label/ikon eksplisit                                       |

Rasio kontras yang diukur terhadap surface/background:

| Pasangan           |   Rasio | Hasil AA normal |
| ------------------ | ------: | --------------- |
| Primary / putih    |  5.47:1 | Lulus           |
| Text / background  | 14.91:1 | Lulus           |
| Muted / background |  5.04:1 | Lulus           |
| Success / surface  |  4.91:1 | Lulus           |
| Warning / surface  |  5.12:1 | Lulus           |
| Danger / surface   |  5.90:1 | Lulus           |
| Info / surface     |  6.09:1 | Lulus           |

## Responsive dan visual QA

| Viewport   | Client width | Root scroll width | Overflow | Sampel yang diperiksa                                                   |
| ---------- | -----------: | ----------------: | -------: | ----------------------------------------------------------------------- |
| 1440 × 900 |      1425 px |           1425 px |     0 px | Hero, token, komponen, desktop shell, pattern, overlay, states, receipt |
| 768 × 1024 |       753 px |            753 px |     0 px | Navigation, tablet flow, overlay, form/table, states                    |
| 360 × 800  |       345 px |            345 px |     0 px | Header/nav, mobile shell, order form, card-list, pagination, receipt    |

Temuan yang diperbaiki selama QA:

1. Anchor section tertutup gabungan sticky header/navigation pada tablet dan mobile; `scroll-margin-top` ditambahkan.
2. Pagination menambah overflow 10 px pada viewport 360; layout compact diubah menjadi dua baris.
3. Lebar cetak fisik membulat pecahan pixel; print receipt diberi `max-width: 100%` dan `box-sizing: border-box`.
4. Label nota demo yang masih berbahasa Inggris diselaraskan ke Bahasa Indonesia.
5. Favicon 404 dihilangkan sehingga console browser bersih.

Visual diperiksa dari screenshot browser aktual pada ketiga viewport. Tidak ada console error atau page error pada smoke test akhir.

## Print QA

| Media | Viewport/page width |          Receipt box | Clipping/overflow | Hasil visual                                |
| ----- | ------------------: | -------------------: | ----------------- | ------------------------------------------- |
| 58 mm |              219 px | ≤ 219 px setelah cap | Tidak ada         | Struktur, total, status, dan footer terbaca |
| 80 mm |              302 px | ≤ 302 px setelah cap | Tidak ada         | Struktur, total, status, dan footer terbaca |

Print mode menampilkan tepat satu nota, menyembunyikan preview lain, menghapus chrome visual, dan tidak bergantung pada network/font remote. Printer thermal fisik tetap perlu diuji saat pilot hardware.

## Automated validation

| Perintah               | Hasil                  |
| ---------------------- | ---------------------- |
| `npm run lint`         | Lulus, 0 warning       |
| `npm run typecheck`    | Lulus                  |
| `npm test -- --run`    | Lulus, 2 file / 9 test |
| `npm run format:check` | Lulus                  |
| `npm run build`        | Lulus                  |
| `npm run check`        | Lulus                  |
| `npm audit --omit=dev` | 0 vulnerability        |
| `git diff --check`     | Lulus                  |

## Risiko tersisa

- Nama merek/domain tetap perlu pemeriksaan legal sebelum publik; ini risiko go-to-market, bukan keputusan design system terbuka.
- Printer thermal dan Web Share perlu uji perangkat pilot; foundation print browser sudah tersedia, tanpa native integration.
- Density serta waktu transaksi harus divalidasi kembali ketika app shell dan vertical slice memakai data realistis.
- Perubahan major dependency wajib melalui audit compatibility, accessibility, dan vulnerability ulang.

## Rekomendasi gate

Design System `PASSED`. Gate **Frontend Architecture dan App Shell** terbuka; implementasi feature/vertical slice tetap menunggu app-shell foundation dan wajib mengikuti sumber kanonis tanpa menyalin business logic ke primitive UI.
