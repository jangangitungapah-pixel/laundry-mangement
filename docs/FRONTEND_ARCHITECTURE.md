# Frontend Architecture dan App Shell — LaundryKita

| Atribut | Nilai |
| --- | --- |
| Status | PASSED |
| Tanggal | 8 Agustus 2026 |
| Scope | Routing, shell, boundary, access policy, service contract, mock adapter, formatting, dan test harness |
| Non-scope | Business behavior, autentikasi nyata, request API, backend, database, dan payment provider |

## Keputusan utama

- Router dipin pada React Router 7.18.2 dan memakai Data Mode melalui createBrowserRouter serta RouterProvider.
- Unstable RSC API tidak digunakan. Dependency audit high/critical tetap wajib pada setiap perubahan lockfile.
- Route registry memuat tepat 41 route kanonis dari Screen Map. Route internal design system tidak termasuk route produk dan hanya tersedia saat development.
- Public, authentication, onboarding, tenant, dan platform admin memakai shell terpisah sesuai konteks, tetapi seluruh warna tetap berasal dari semantic token yang sama.
- Route pada fase ini menampilkan contract page. Business behavior hanya boleh ditambahkan melalui vertical slice terkait.

## Struktur runtime

1. main memasang QueryClientProvider dan ThemeProvider.
2. App memasang AppRouter.
3. AppRouter membuat route dari route registry dan memasang route error boundary.
4. ArchitectureRoute memilih shell berdasarkan metadata route.
5. Vertical slice mengganti contract page dengan page component tanpa mengubah kontrak shell dan route.

## Routing dan boundary

- Parameter tenantSlug, orderId, customerId, dan tenantId hanya identifier route, bukan bukti authorization.
- Route tidak dikenal selalu masuk NotFoundPage.
- Kegagalan render atau route masuk RouteErrorPage tanpa mengklaim transaksi berhasil atau berubah.
- Design system preview tersedia pada /__design-system hanya ketika Vite berjalan dalam development mode.
- Build memakai vendor code splitting agar bundle aplikasi, React Router, dan UI dependency tidak menjadi satu chunk besar.

## Access policy

Access policy adalah pure function dan membedakan hasil allow, read-only, serta deny. Pemeriksaan dilakukan berurutan untuk:

1. session;
2. platform-admin context;
3. membership aktif;
4. tenant scope;
5. outlet assignment;
6. capability;
7. subscription read-only untuk mutation.

Client guard hanya mengatur pengalaman UI. Backend kelak tetap wajib mengulang authorization dan tenant isolation server-side.

## Service contract dan adapter

- Component tidak boleh melakukan request backend langsung.
- Service mengembalikan ServiceResult dengan bentuk success atau failure yang eksplisit.
- Failure membawa code, pesan aman, retryable flag, dan correlation ID opsional.
- AppContextGateway menjadi contoh port. Mock adapter mengimplementasikan port yang sama secara deterministik.
- Backend adapter kelak mengganti mock melalui composition root, bukan melalui perubahan component.

## Localization dan waktu

- Formatter dibuat dari locale, currency, dan tenant timeZone.
- Baseline Indonesia memakai id-ID, IDR, dan Asia/Jakarta.
- Nilai uang tetap number integer pada boundary frontend; formatter hanya mengubah representasi visual.
- Timezone tidak boleh disebar sebagai literal di component feature.

## Quality gate

- Dual-theme architecture contract lulus.
- Route registry harus tetap tepat 41 sampai Screen Map disetujui berubah.
- Route id dan path wajib unik.
- Access policy memiliki test untuk public, session, tenant, outlet, capability, read-only, dan platform-admin.
- Public shell, tenant shell, not-found, formatter, lint, typecheck, test, format, build, audit, serta git diff check wajib lulus.

## Tahap berikutnya

Vertical slice pertama adalah authentication dan onboarding. Slice tersebut memakai route, shell, access policy, service result, dan mock-adapter convention yang sudah tersedia. Dilarang menambahkan backend SDK, session production, atau business call langsung dari component pada fase mock frontend.
