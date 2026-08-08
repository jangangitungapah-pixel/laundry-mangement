# LaundryKita

LaundryKita adalah SaaS multi-tenant untuk operasional laundry kecil dan menengah di Indonesia: customer, order, produksi, payment manual, kas, outlet, pegawai, laporan, dan subscription.

## Status proyek

| Gate | Status |
| --- | --- |
| Documentation baseline | `PASSED` — PRD 1.0 dan keputusan baseline telah disetujui |
| Project foundation | `PASSED` — quality checks lulus dan audit runtime dependency tidak menemukan vulnerability |
| Low-fidelity wireframes | `PASSED` — visual QA dan delegated Product Owner approval tercatat |
| Design system | `PASSED` — dual-theme contract, provider, semantic token, accessibility, responsive, overlay, dan print guard tersedia |
| Frontend Architecture/App Shell | `PASSED` — React Router 7.18.2, 41 route registry, lima shell, error boundary, access policy, formatter, dan mock-adapter contract tersedia |
| Frontend features | `READY` — vertical slice pertama adalah authentication dan onboarding |
| Backend/integrasi | Belum dimulai |

Repository saat ini memiliki 41 route kanonis, public/auth/onboarding/tenant/admin shell, error boundary, access policy murni, service contract, mock-adapter convention, formatter tenant-aware, dan design system dual-theme. Route masih menampilkan contract page tanpa business behavior; preview design system tersedia hanya saat development pada `/__design-system`.

## Urutan kerja

`PRD Final -> Product Baseline -> Domain Rules -> Permissions -> User Flows -> Screen Map -> Wireframes -> Design System -> Frontend`

Tahap berikutnya adalah vertical slice authentication dan onboarding dengan mock adapter. Route, shell, access policy, dan service contract yang sudah tersedia wajib dipakai tanpa backend call langsung dari komponen. Baca [`AGENTS.md`](AGENTS.md) sebelum melakukan perubahan apa pun.

## Quick start

```bash
npm install
npm run dev
npm run check
```

## Indeks dan sumber kebenaran

| Jenis informasi | Sumber kanonis | Fungsi |
| --- | --- | --- |
| Scope, non-scope, persona, requirement, NFR, acceptance criteria | [`docs/PRD.md`](docs/PRD.md) | Kontrak produk tertinggi |
| Ringkasan arah produk | [`docs/PRODUCT_BASELINE.md`](docs/PRODUCT_BASELINE.md) | Bacaan cepat sebelum tiap fase |
| Formula, invariant, lifecycle, transition, audit | [`docs/DOMAIN_RULES.md`](docs/DOMAIN_RULES.md) | Aturan bisnis tunggal |
| Role, capability, tenant/outlet scope, denied/read-only | [`docs/ROLE_PERMISSION_MATRIX.md`](docs/ROLE_PERMISSION_MATRIX.md) | Aturan akses tunggal |
| Urutan interaksi pengguna | [`docs/USER_FLOWS.md`](docs/USER_FLOWS.md) | Flow final dan edge case |
| Route, data, action, serta screen state | [`docs/SCREEN_MAP.md`](docs/SCREEN_MAP.md) | Kontrak layar final |
| Spesifikasi hierarchy, shell, layout, responsive, dan overlay | [`docs/WIREFRAMES.md`](docs/WIREFRAMES.md) | Sumber kanonis low-fidelity wireframe |
| Prototype klik low-fidelity | [`design/wireframes/README.md`](design/wireframes/README.md) | Cara membuka dan menjalankan 41 route serta happy path |
| Bukti coverage dan validasi wireframe | [`docs/WIREFRAME_AUDIT.md`](docs/WIREFRAME_AUDIT.md) | Audit kesiapan approval wireframe |
| Bukti visual QA wireframe | [`docs/WIREFRAME_VISUAL_QA.md`](docs/WIREFRAME_VISUAL_QA.md) | Browser, viewport, flow, overlay, state, dan print QA |
| Token, kontrak komponen, responsive, accessibility, dan print | [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | Sumber kanonis design system |
| Bukti implementasi dan visual QA design system | [`docs/DESIGN_SYSTEM_AUDIT.md`](docs/DESIGN_SYSTEM_AUDIT.md) | Coverage, contrast, keyboard, viewport, print, dan quality checks |
| Histori dan alasan keputusan | [`docs/OPEN_DECISIONS.md`](docs/OPEN_DECISIONS.md) | Product Decision Register |
| Urutan implementasi dan gate | [`docs/DELIVERY_PLAN.md`](docs/DELIVERY_PLAN.md) | Roadmap delivery |
| Runtime, tooling, script, test, CI, dan batas foundation | [`docs/PROJECT_SETUP.md`](docs/PROJECT_SETUP.md) | Panduan project foundation |
| Router, route registry, shell, boundary, access policy, service contract, dan adapter | [`docs/FRONTEND_ARCHITECTURE.md`](docs/FRONTEND_ARCHITECTURE.md) | Sumber kanonis frontend architecture |
| Bukti approval preparation gate | [`docs/P0_DECISION_PACK.md`](docs/P0_DECISION_PACK.md) | Receipt, bukan sumber aturan |

## Gate berikutnya

Documentation, project foundation, wireframe, Design System, serta Frontend Architecture/App Shell telah `PASSED`. Gate berikutnya adalah vertical slice authentication dan onboarding berbasis mock adapter; backend dan integrasi tetap belum dimulai.
