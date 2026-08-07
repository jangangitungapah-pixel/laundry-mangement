# LaundryKita

LaundryKita adalah SaaS multi-tenant untuk operasional laundry kecil dan menengah di Indonesia: customer, order, produksi, payment manual, kas, outlet, pegawai, laporan, dan subscription.

## Status proyek

| Gate | Status |
| --- | --- |
| Documentation baseline | `PASSED` — PRD 1.0 dan keputusan baseline telah disetujui |
| Low-fidelity wireframes | `READY_FOR_APPROVAL` — spesifikasi dan prototype statis siap ditinjau |
| Design system | Belum dimulai |
| Frontend | Belum dimulai |
| Backend/integrasi | Belum dimulai |

Repository saat ini berisi dokumentasi dan prototype low-fidelity statis sebagai artefak desain. Tidak ada scaffold, dependency, design system, atau kode aplikasi production.

## Urutan kerja

`PRD Final -> Product Baseline -> Domain Rules -> Permissions -> User Flows -> Screen Map -> Wireframes -> Design System -> Frontend`

Tahap berikutnya adalah approval Product Owner atas low-fidelity wireframes. Baca [`AGENTS.md`](AGENTS.md) sebelum melakukan perubahan apa pun.

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
| Histori dan alasan keputusan | [`docs/OPEN_DECISIONS.md`](docs/OPEN_DECISIONS.md) | Product Decision Register |
| Urutan implementasi dan gate | [`docs/DELIVERY_PLAN.md`](docs/DELIVERY_PLAN.md) | Roadmap delivery |
| Bukti approval preparation gate | [`docs/P0_DECISION_PACK.md`](docs/P0_DECISION_PACK.md) | Receipt, bukan sumber aturan |

## Gate berikutnya

Product Owner perlu meninjau hierarchy, navigasi, konteks outlet, primary action, critical overlay, responsive behavior, dan happy path pada prototype low-fidelity. Status wireframe tidak boleh dinaikkan menjadi `PASSED` sebelum approval eksplisit; design system dan frontend tetap belum boleh dimulai.
