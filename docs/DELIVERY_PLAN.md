# Delivery Plan — LaundryKita MVP

| Atribut | Nilai |
| --- | --- |
| Status | `APPROVED` |
| Strategi | Frontend-first, vertical slice, multi-tenancy sejak backend foundation |
| Urutan | Gate berurutan; fase berikutnya tidak boleh melewati dependency |

## 1. Documentation baseline

- **Input:** PRD draft, audit, preparation decision pack, mandat keputusan.
- **Output:** PRD 1.0, Product Baseline, Domain Rules, Permission Matrix, User Flows, Screen Map, Decision Register, Delivery Plan.
- **Dependency:** Tidak ada dependency implementasi.
- **Gate:** Semua keputusan approved, traceability/link/scope konsisten, `git diff --check` lulus.
- **Definition of Done:** Checklist dokumentasi dalam `AGENTS.md` terpenuhi dan documentation gate dinyatakan `PASSED`.
- **Dilarang terlalu dini:** Wireframe, design token, scaffold, dependency, schema, atau kode aplikasi selama documentation gate belum `PASSED`.

## 2. Project foundation (tooling-only)

- **Status gate:** `PASSED` pada 8 Agustus 2026.

- **Input:** Documentation baseline yang `PASSED` dan process guardrail dalam `AGENTS.md`.
- **Output:** Vite, React, TypeScript strict, dependency foundation minimal, satu placeholder netral, provider kosong, environment validation, test harness, package lock, dan CI; router dapat ditunda sampai app shell bila versi aman belum tersedia.
- **Dependency:** Documentation gate `PASSED`; fase ini boleh berjalan sebelum atau paralel dengan low-fidelity wireframes.
- **Gate:** Lint, typecheck, test, format check, build, dependency audit, dan CI configuration lulus tanpa menambah product UI atau business behavior.
- **Definition of Done:** Vite/React/TypeScript tersedia; dependency hanya foundation yang disetujui; lint, typecheck, test, dan build lulus; CI tersedia; tidak ada production screen, product route, fixture produk, design component, atau feature implementation.
- **Dilarang terlalu dini:** Menurunkan wireframe menjadi component, mendaftarkan 41 route produk, membuat app shell produksi, memasang design dependency, menghubungkan API/auth/backend, atau menyebut scaffold sebagai frontend feature phase.

## 3. Low-fidelity wireframes

- **Status gate:** `PASSED` pada 8 Agustus 2026 melalui visual QA dan delegated Product Owner approval.

- **Input:** Seluruh output documentation baseline.
- **Output:** Wireframe desktop/mobile untuk 41 route final dan dialog/drawer critical flow; prototype klik untuk happy path.
- **Dependency:** Documentation gate `PASSED`.
- **Gate:** Product/UX approval pada hierarchy, navigation, outlet context, primary action, serta critical state.
- **Definition of Done:** UF-01–UF-12 dapat dilalui; loading/empty/error/denied/read-only/success/confirmation tergambar; transaksi reguler diuji maksimal dua menit.
- **Dilarang terlalu dini:** Visual polish, brand exploration luas, kode frontend, route/role/state baru, atau perubahan formula dari wireframe.

## 4. Design system

- **Status gate:** `PASSED` pada 8 Agustus 2026; baseline visual, dual-theme contract, semantic token guard, provider, accessibility, responsive, overlay, dan print foundation diterima melalui delegated Product Owner continuation.

- **Input:** Wireframe yang disetujui dan kebutuhan aksesibilitas/print PRD.
- **Output:** Satu implementasi komponen dengan semantic token, palette light/dark, ThemeProvider/ThemeContainer, responsive layout, preview internal, dan receipt foundation 58/80 mm.
- **Dependency:** Wireframe gate disetujui.
- **Gate:** Contoh app shell, form order, table/card, production board, dialog/drawer, billing, dan print receipt disetujui.
- **Definition of Done:** Light dan dark lulus kontras AA, keyboard/focus trap dan return, reduced motion, target 44 px, status non-color-only, viewport 360/768/1440, portal overlay, console/overflow, serta print 58/80 mm; lint/typecheck/test/build/audit dependency lulus.
- **Dilarang terlalu dini:** Implementasi feature, provider coupling, custom component tanpa kebutuhan wireframe, atau backend schema.

## 5. Frontend architecture dan app shell

- **Status gate:** `PASSED` pada 8 Agustus 2026; React Router 7.18.2, 41 route registry, lima shell, route error boundary, access policy, formatter, service contract, mock adapter convention, dan test harness tersedia.

- **Input:** Design system, Screen Map, Permission Matrix, Domain Rules.
- **Output:** App shell, pemilihan dan pemasangan router yang bebas high/critical vulnerability, routing produk, state/error boundary, localization/formatting, service contracts, mock adapter convention, fixture factory, test harness.
- **Dependency:** Design-system gate.
- **Gate:** Shell desktop/mobile dan semua global state tervalidasi dengan mock tanpa business logic di component.
- **Definition of Done:** Lint/typecheck/test/build lulus; no secret; capability/outlet/read-only guards dapat diuji; adapter dapat diganti tanpa mengubah UI.
- **Dilarang terlalu dini:** Backend call langsung dari component, hard-coded plan access, service-role credential, atau implementasi seluruh feature sekaligus.

## 6. Frontend per vertical slice dengan mock adapter

- **Input:** Frontend architecture/app shell dan kontrak flow/screen/domain.
- **Output:** Slice berurutan: (1) auth/onboarding, (2) customer/order/receipt, (3) production/handoff, (4) payment/cash, (5) organization/master data, (6) dashboard/reports, (7) billing, (8) Super Admin/public.
- **Dependency:** Slice memakai contract/fixture yang sama dan design system stabil.
- **Gate:** Setiap slice lulus UX review, responsive/accessibility smoke, happy path, critical edge case, denied/read-only, dan E2E mock.
- **Definition of Done:** Semua route terkait selesai tanpa placeholder keputusan; fixture mencakup persona/state/limit/error; target transaksi order tercapai.
- **Dilarang terlalu dini:** Mengubah Domain Rules di UI, mock yang melanggar tenant scope, advanced feature di luar slice, atau network integration sebelum slice tervalidasi.

## 7. Backend foundation dan multi-tenancy

- **Input:** Service contracts stabil, Domain Rules, Permission Matrix, NFR PRD.
- **Output:** Auth, schema/migration, RLS, server authorization, tenant/outlet context, audit/event, idempotency, money helpers, test factories, provider adapter interfaces.
- **Dependency:** Critical frontend contracts auth/order/payment telah tervalidasi.
- **Gate:** Database kosong dapat dimigrasi; tenant-isolation, authorization, invariant, transaction, dan contract test lulus.
- **Definition of Done:** Tidak ada service-role credential di browser; seluruh tabel tenant ber-RLS; audit/correlation ID aktif; backup sandbox diuji.
- **Dilarang terlalu dini:** Provider production sebelum adapter/test, denormalisasi laporan prematur, generic workflow engine, atau bypass RLS demi kemudahan development.

## 8. Integrasi frontend-backend per vertical slice

- **Input:** Frontend slice approved, backend foundation, contract test.
- **Output:** Supabase adapter dan integration/E2E untuk urutan slice yang sama; mock tetap tersedia untuk deterministic UI test.
- **Dependency:** Endpoint/query/mutation memenuhi contract dan invariant terkait.
- **Gate:** Parity mock-vs-backend, concurrent/error/idempotency, permission, tenant isolation, dan reconciliation lulus per slice.
- **Definition of Done:** Tidak ada UI-only security; optimistic update dapat rollback; logs tidak bocor data; performance operasional memenuhi target.
- **Dilarang terlalu dini:** Big-bang integration, mematikan mock test, menggabungkan state order/payment/cash, atau menunda authorization.

## 9. Subscription dan Super Admin

- **Input:** Tenant app terintegrasi, plan version, provider adapters, state/access rules.
- **Output:** Xendit sandbox checkout/webhook, entitlement enforcement, usage meter/limits, read-only/recovery, retention state, plan/admin/support actions, audit UI.
- **Dependency:** Billing adapter, signature/idempotency, server authorization, dan manual-suspend precedence tersedia.
- **Gate:** Webhook invalid/duplicate/out-of-order, grace/read-only/recovery, limit, downgrade blocker, dan no-impersonation tests lulus.
- **Definition of Done:** Redirect tidak mengaktifkan subscription; Super Admin tidak dapat membaca customer/order; seluruh tindakan sensitif teraudit.
- **Dilarang terlalu dini:** Payment gateway customer, proration/credit engine, plan-name checks di UI, atau impersonation.

## 10. Security, testing, observability, dan deployment

- **Input:** Seluruh slice terintegrasi dan acceptance criteria feature lulus.
- **Output:** Required CI checks, threat/security review, backup/restore runbook, monitoring/alerts, webhook replay, incident runbook, performance/accessibility/print/browser QA, deployment environments.
- **Dependency:** Production-like staging dan provider sandbox stabil.
- **Gate:** Acceptance criteria PRD 1.0, legal retention review, restore drill, incident exercise, dan production readiness review lulus.
- **Definition of Done:** Lint/typecheck/unit/integration/database/RLS/E2E/accessibility/build lulus; RPO/RTO pilot terbukti; rollback/deploy runbook siap; closed-pilot approval tercatat.
- **Dilarang terlalu dini:** Production data sebelum restore/monitoring, public launch sebelum brand/legal/provider checks, atau menurunkan required check untuk mengejar jadwal.

## Vertical-slice dependency ringkas

```text
Documentation -> Project Foundation (tooling-only)
Documentation -> Wireframes -> Design System
Project Foundation + Design System -> Frontend Architecture/App Shell
                                   -> Frontend Slice + Mock -> Backend Foundation
                                   -> Slice Integration -> Subscription/Admin
                                   -> Production Readiness
```

Perubahan di satu fase yang menyentuh scope, formula/state, atau access wajib kembali ke sumber kanonis dan mengulang gate terdampak.
