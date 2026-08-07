# Panduan Kerja Repository

## Sumber keputusan

- `docs/PRD.md` adalah sumber utama keputusan produk dan batas scope MVP.
- Gunakan ID requirement PRD saat menurunkan user flow, screen map, wireframe, dan acceptance criteria.
- Jika dokumen turunan berbeda dari PRD, hentikan asumsi, tandai `TBD`, dan catat pertanyaannya di `docs/OPEN_DECISIONS.md`.

## Urutan kerja wajib

`PRD -> User Flows -> Screen Map -> Wireframes -> Design System -> Frontend`

- Setiap tahap harus konsisten dengan tahap sebelumnya.
- Jangan menulis kode aplikasi sebelum wireframe mendapat persetujuan eksplisit.
- Strategi implementasi adalah frontend-first: validasi UX lebih dahulu, lalu bangun frontend dengan kontrak feature service/repository dan mock adapter yang dapat diganti saat integrasi backend.
- Fondasi tetap berupa SaaS multi-tenant, responsive web/PWA, berbahasa Indonesia, dan relevan untuk operasi laundry di Indonesia.

## Batas scope dan keputusan

- Jangan memperluas MVP tanpa memperbarui `docs/PRD.md` dan mencatat alasan serta dampaknya.
- Jangan mengubah aturan bisnis secara diam-diam dari dokumen desain atau implementasi.
- Semua keputusan yang belum final harus diberi label `TBD`; rekomendasi bukan keputusan final.
- Jangan menyebarkan asumsi `TBD` ke banyak komponen atau fixture. Gunakan satu rujukan keputusan yang jelas.
- Fitur yang tidak memiliki requirement MVP tidak boleh muncul sebagai flow atau layar seolah-olah sudah disetujui.

## Definition of Done tugas dokumentasi

Tugas dokumentasi selesai bila:

- isi konsisten dengan `docs/PRD.md`, scope MVP, role, permission, dan arsitektur multi-tenant;
- setiap user flow memiliki referensi requirement ID, dan setiap layar menunjuk user flow yang dapat ditelusuri kembali ke PRD;
- istilah, status, route, dan nama role digunakan konsisten dalam Bahasa Indonesia;
- loading, empty, error, dan permission-denied state dicatat bila relevan;
- konflik, asumsi, dan keputusan belum final tercatat sebagai `TBD` di `docs/OPEN_DECISIONS.md`;
- tautan dan referensi antar-dokumen valid, serta diff ditinjau agar tidak menambah scope;
- tidak ada kode aplikasi, dependency, scaffold, atau wireframe yang dibuat sebelum gate-nya.
