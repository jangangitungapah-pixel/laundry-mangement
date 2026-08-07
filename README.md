# LaundryKita

LaundryKita adalah SaaS multi-tenant untuk operasional laundry kecil dan menengah di Indonesia: customer, order, produksi, payment manual, kas, outlet, pegawai, laporan, dan subscription.

## Status proyek

| Gate | Status |
| --- | --- |
| Documentation baseline | `PASSED` — PRD 1.0 dan keputusan baseline telah disetujui |
| Low-fidelity wireframes | Belum dimulai |
| Design system | Belum dimulai |
| Frontend | Belum dimulai |
| Backend/integrasi | Belum dimulai |

Repository saat ini hanya berisi dokumentasi. Tidak ada scaffold, dependency, wireframe, design system, atau kode aplikasi.

## Urutan kerja

`PRD Final -> Product Baseline -> Domain Rules -> Permissions -> User Flows -> Screen Map -> Wireframes -> Design System -> Frontend`

Tahap berikutnya adalah low-fidelity wireframes berdasarkan dokumen yang sudah disetujui. Baca [`AGENTS.md`](AGENTS.md) sebelum melakukan perubahan apa pun.

## Indeks dan sumber kebenaran

| Jenis informasi | Sumber kanonis | Fungsi |
| --- | --- | --- |
| Scope, non-scope, persona, requirement, NFR, acceptance criteria | [`docs/PRD.md`](docs/PRD.md) | Kontrak produk tertinggi |
| Ringkasan arah produk | [`docs/PRODUCT_BASELINE.md`](docs/PRODUCT_BASELINE.md) | Bacaan cepat sebelum tiap fase |
| Formula, invariant, lifecycle, transition, audit | [`docs/DOMAIN_RULES.md`](docs/DOMAIN_RULES.md) | Aturan bisnis tunggal |
| Role, capability, tenant/outlet scope, denied/read-only | [`docs/ROLE_PERMISSION_MATRIX.md`](docs/ROLE_PERMISSION_MATRIX.md) | Aturan akses tunggal |
| Urutan interaksi pengguna | [`docs/USER_FLOWS.md`](docs/USER_FLOWS.md) | Flow final dan edge case |
| Route, data, action, serta screen state | [`docs/SCREEN_MAP.md`](docs/SCREEN_MAP.md) | Kontrak layar final |
| Histori dan alasan keputusan | [`docs/OPEN_DECISIONS.md`](docs/OPEN_DECISIONS.md) | Product Decision Register |
| Urutan implementasi dan gate | [`docs/DELIVERY_PLAN.md`](docs/DELIVERY_PLAN.md) | Roadmap delivery |
| Bukti approval preparation gate | [`docs/P0_DECISION_PACK.md`](docs/P0_DECISION_PACK.md) | Receipt, bukan sumber aturan |

## Gate berikutnya

Wireframe hanya boleh dimulai dari route dan flow final. Wireframe harus low-fidelity, mencakup desktop/mobile serta loading, empty, error, permission-denied, dan read-only state, dan tidak boleh mengubah scope, formula, state, capability, atau route tanpa perubahan dokumen kanonis lebih dahulu.
