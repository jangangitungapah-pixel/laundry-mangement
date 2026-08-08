# LaundryKita

LaundryKita adalah SaaS multi-tenant untuk operasional laundry kecil dan menengah di Indonesia: customer, order, produksi, payment manual, kas, outlet, pegawai, laporan, dan subscription.

## Status proyek

| Gate | Status |
| --- | --- |
| Documentation baseline | `PASSED` — PRD 1.0 dan keputusan baseline telah disetujui |
| Project foundation | `PASSED` — quality checks lulus dan audit runtime dependency tidak menemukan vulnerability |
| Low-fidelity wireframes | `PASSED` — visual QA dan delegated Product Owner approval tercatat |
| Design system | Belum dimulai — gate sudah terbuka |
| Frontend features | Belum dimulai |
| Backend/integrasi | Belum dimulai |

Repository saat ini berisi dokumentasi, prototype low-fidelity statis, dan project foundation tooling-only. Fondasi hanya memiliki placeholder netral, QueryClient provider kosong, test harness, dan CI; pemilihan router ditunda ke fase app shell. Belum ada production UI, design system, route produk, fixture produk, atau implementasi fitur.

## Urutan kerja

`PRD Final -> Product Baseline -> Domain Rules -> Permissions -> User Flows -> Screen Map -> Wireframes -> Design System -> Frontend`

Tahap berikutnya adalah design system berdasarkan low-fidelity wireframe yang telah disetujui. Baca [`AGENTS.md`](AGENTS.md) sebelum melakukan perubahan apa pun.

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
| Histori dan alasan keputusan | [`docs/OPEN_DECISIONS.md`](docs/OPEN_DECISIONS.md) | Product Decision Register |
| Urutan implementasi dan gate | [`docs/DELIVERY_PLAN.md`](docs/DELIVERY_PLAN.md) | Roadmap delivery |
| Runtime, tooling, script, test, CI, dan batas foundation | [`docs/PROJECT_SETUP.md`](docs/PROJECT_SETUP.md) | Panduan project foundation |
| Bukti approval preparation gate | [`docs/P0_DECISION_PACK.md`](docs/P0_DECISION_PACK.md) | Receipt, bukan sumber aturan |

## Gate berikutnya

Project foundation dan low-fidelity wireframe telah `PASSED`. Design system boleh dimulai dengan [`docs/WIREFRAMES.md`](docs/WIREFRAMES.md) sebagai sumber hierarchy/layout dan dokumen domain/permission sebagai guardrail. Frontend features tetap belum boleh dimulai sampai design-system gate disetujui.
