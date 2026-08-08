# Project Setup — LaundryKita

## Status dan batas

Project foundation adalah fondasi tooling, bukan implementasi fitur frontend. Fondasi boleh tersedia setelah documentation gate `PASSED`, sedangkan production screen, design component, route produk, fixture produk, dan business logic tetap menunggu approval wireframe serta design-system gate.

Status gate `PASSED`. React Router sementara dihapus karena patched version `8.3.0` untuk advisory `GHSA-qwww-vcr4-c8h2` belum tersedia di npm pada 8 Agustus 2026. Foundation merender `App` langsung di dalam `QueryClientProvider`; router dipilih kembali pada fase app shell setelah tersedia versi kompatibel tanpa high/critical vulnerability.

## Runtime

- Baseline: Node.js `>=22.12.0` dan npm.
- Versi yang direkomendasikan developer/CI: nilai dalam `.nvmrc`.
- Package manager tunggal: npm dengan `package-lock.json`; CI wajib memakai `npm ci`.

## Stack foundation

| Area         | Pilihan                          | Alasan                                                                  |
| ------------ | -------------------------------- | ----------------------------------------------------------------------- |
| Build        | Vite                             | Development server dan production build yang minimal untuk React.       |
| UI runtime   | React + TypeScript strict        | Fondasi typed tanpa menetapkan visual design.                           |
| Routing      | Ditunda ke fase app shell        | Mencegah dependency high vulnerability; route produk belum didaftarkan. |
| Server state | TanStack Query                   | Provider tersedia tanpa query bisnis atau network request.              |
| Environment  | Zod                              | Memvalidasi variable non-secret sebelum digunakan.                      |
| Quality      | ESLint + Prettier                | Memisahkan static analysis dan formatting.                              |
| Test         | Vitest + Testing Library + jsdom | Menguji render placeholder dan provider secara ringan.                  |

## Struktur

```text
src/
  app/
    App.tsx
    App.test.tsx
    providers.tsx
  shared/
    config/env.ts
    lib/query-client.ts
  test/setup.ts
  main.tsx
  vite-env.d.ts
public/
```

Folder fitur dan 41 route dalam Screen Map sengaja belum dibuat.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Validasi lokal lengkap:

```bash
npm run check
```

## Package scripts

| Script                 | Fungsi                                                    |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Menjalankan Vite development server.                      |
| `npm run build`        | TypeScript project build lalu Vite production build.      |
| `npm run preview`      | Meninjau hasil build lokal.                               |
| `npm run lint`         | Menjalankan ESLint tanpa warning.                         |
| `npm run typecheck`    | Memeriksa TypeScript project references.                  |
| `npm test -- --run`    | Menjalankan test sekali untuk validasi/CI.                |
| `npm run test:watch`   | Menjalankan Vitest dalam watch mode.                      |
| `npm run format`       | Memformat file foundation yang dikelola Prettier.         |
| `npm run format:check` | Memeriksa formatting file foundation.                     |
| `npm run check`        | Lint, typecheck, test, format check, dan build berurutan. |

## Environment variables

Salin `.env.example` menjadi `.env.local` bila perlu override lokal. Jangan commit file environment lokal atau secret.

| Variable            | Default development     | Fungsi                                                   |
| ------------------- | ----------------------- | -------------------------------------------------------- |
| `VITE_APP_NAME`     | `LaundryKita`           | Nama aplikasi non-secret.                                |
| `VITE_API_BASE_URL` | `http://localhost:3000` | Base URL non-secret; foundation belum melakukan request. |

Nilai divalidasi pada `src/shared/config/env.ts`. Nilai default menjaga placeholder dapat dijalankan tanpa file environment lokal.

## Testing dan CI

Test minimum memastikan placeholder `App` dapat dirender serta QueryClientProvider berjalan tanpa runtime error. Tidak ada snapshot besar atau fixture produk. Workflow `.github/workflows/ci.yml` menggunakan Node.js 22.12, npm cache, `npm ci`, lalu `npm run check` pada push dan pull request dengan permission `contents: read`.

## Dependency yang sengaja ditunda

React Router, Tailwind, UI component/icon library, Storybook, PWA plugin, state manager tambahan, form library, backend/database/auth/payment/analytics SDK, dan dependency feature lain menunggu fase/gate yang sah. Foundation juga tidak memuat authentication, API request, dashboard, navigation produk, atau implementasi fitur.
