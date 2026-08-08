# Panduan Kerja Repository

## Hierarchy sumber kebenaran

1. `docs/PRD.md` — scope, non-scope, persona, requirement, NFR, acceptance criteria.
2. `docs/OPEN_DECISIONS.md` — register keputusan final dan alasan perubahan.
3. `docs/PRODUCT_BASELINE.md` — ringkasan arah, bukan tempat membuat aturan baru.
4. `docs/DOMAIN_RULES.md` — lifecycle, state, formula, invariant, dan audit.
5. `docs/ROLE_PERMISSION_MATRIX.md` — role, capability, data/outlet scope, denied/read-only.
6. `docs/USER_FLOWS.md` — urutan interaksi dan edge case.
7. `docs/SCREEN_MAP.md` — route, data, action, dan screen state.
8. `docs/WIREFRAMES.md` — hierarchy, layout, responsive behavior, overlay, dan screen state.
9. `docs/DESIGN_SYSTEM.md` — token visual, kontrak komponen, responsive, accessibility, dan print foundation.
10. `docs/DELIVERY_PLAN.md` — urutan delivery dan gate.
11. `docs/PROJECT_SETUP.md` — runtime, tooling, script, environment, testing, dan batas project foundation.

Jika dua dokumen berbeda, hentikan pekerjaan pada area tersebut dan sinkronkan sumber kanonis terkait. Jangan memilih interpretasi secara diam-diam.

## Urutan kerja wajib

`PRD Final -> Product Baseline -> Domain Rules -> Permissions -> User Flows -> Screen Map -> Wireframes -> Design System -> Frontend`

- Setiap tahap memakai output tahap sebelumnya dan tidak mendefinisikan ulang aturan.
- Strategi frontend-first memakai feature service/repository contract dan mock adapter yang dapat diganti adapter backend.
- Setelah documentation gate `PASSED`, project foundation yang hanya berisi tooling, konfigurasi, provider kosong, satu placeholder netral tanpa routing produk, test harness, dan CI boleh dikerjakan sebelum atau paralel dengan wireframe.
- Project foundation bukan dimulainya fase fitur frontend. Sebelum wireframe dan design system disetujui, dilarang membuat production screen, design component, route produk, fixture produk, atau implementasi fitur.
- Jangan menulis kode aplikasi selain batas project foundation tersebut sebelum low-fidelity wireframe disetujui eksplisit; implementasi UI tetap menunggu design-system gate.
- Backend dan integrasi mengikuti vertical slice setelah frontend terkait tervalidasi; multi-tenancy tidak boleh ditunda sebagai retrofit.

## Batas scope

- Scope hanya berubah melalui pembaruan PRD dan Product Decision Register beserta dampaknya.
- Dilarang menambahkan fitur, route, role, state, formula, capability, provider, atau entitlement dari asumsi implementasi.
- Dilarang membuat Courier/pickup-delivery khusus, dry-clean workflow khusus, payment gateway customer, public receipt link, WhatsApp automation, offline mutation queue, native app, inventory, payroll, absensi, loyalty, accounting lengkap, full custom-role builder, public API, atau impersonation.
- Keputusan configurable tetap memakai default baseline dan satu sumber konfigurasi versioned; jangan menanam nilai di banyak komponen.

## Aturan perubahan keputusan

- Setiap perubahan mencatat alasan, pemilik, tanggal efektif, dampak migrasi, dan dokumen terdampak pada Product Decision Register.
- Perubahan scope/requirement memperbarui PRD; formula/state memperbarui Domain Rules; akses memperbarui Permission Matrix; flow/route kemudian disinkronkan.
- Status keputusan baseline hanya `APPROVED`. Draft perubahan tidak boleh menyebar ke artefak turunan sebelum disetujui dan disinkronkan.
- Jangan menghapus histori transaksi atau histori keputusan untuk menyederhanakan implementasi.

## Definition of Done

### Dokumentasi

- Seluruh keputusan final, requirement terlacak ke flow/layar, flow menunjuk domain rule/layar, dan link relatif valid.
- Scope, istilah, role, state, route, capability, formula, serta asumsi pilot konsisten.
- Audit tidak menemukan placeholder keputusan, pertanyaan produk yang belum diselesaikan, atau fitur di luar scope.
- `git diff --check` lulus dan tidak ada implementasi yang mendahului gate aktif.

### Project foundation

- Documentation gate telah `PASSED`; fondasi hanya memuat Vite, React, TypeScript strict, dependency minimal yang disetujui, provider kosong, environment validation, test harness, dan CI. Router boleh ditunda sampai fase app shell bila belum tersedia versi yang bebas high/critical vulnerability.
- Lint, typecheck, test, format check, build, dan audit dependency dijalankan; package lock tersedia dan tidak ada secret.
- Tidak ada production screen, design component, route produk, fixture produk, implementasi fitur, request API, authentication, atau business logic.
- Scaffold tidak mengubah status wireframe, design system, maupun frontend feature gate.

### Wireframe

- Hanya route final di Screen Map; semua flow prioritas tervalidasi desktop/mobile.
- Loading, empty, error, permission-denied, read-only, success, confirmation, dan critical edge case tergambar.
- Hierarki, primary action, konteks tenant/outlet, serta target transaksi dua menit diuji.
- Tidak mengubah domain/permission; approval Product Owner tercatat sebelum design system.

### Design system

- Dibangun setelah wireframe disetujui dan mencakup token, typography, spacing, color, state, form, table, dialog/drawer, navigation, feedback, serta print foundation dalam `src/shared/ui` dan `src/styles`.
- Mendukung 360 px, keyboard, focus trap/return, contrast AA, reduced motion, status non-color-only, rupiah, Bahasa Indonesia, target minimum 44 px, serta nota 58/80 mm.
- Preview hanya menjadi katalog internal dengan data demo; tidak boleh berisi route produk, fixture production, service call, auth, atau business logic.
- Lint, typecheck, component test, format check, build, audit dependency, browser QA 360/768/1440, console/overflow check, dan print QA lulus; approval dicatat sebelum frontend architecture.

### Frontend

- Frontend Architecture dan App Shell baru boleh dimulai setelah design-system gate `PASSED`; route dan feature diterapkan bertahap sesuai Delivery Plan, bukan sekaligus dari preview.
- Implementasi mengikuti screen/flow/domain/permission final melalui service contract dan mock adapter.
- Seluruh fixture mencakup persona, outlet, status, subscription, loading/empty/error/denied/read-only tanpa data lintas tenant.
- Responsive, accessibility, print, lint, typecheck, unit/component/E2E, dan production build lulus sesuai fase.
- Tidak ada secret, provider coupling di UI, hard-coded plan name untuk akses, atau mutasi yang hanya diamankan client-side.
