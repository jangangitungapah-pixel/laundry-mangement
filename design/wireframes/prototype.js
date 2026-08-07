/*
 * LaundryKita low-fidelity wireframe prototype.
 * Artefak desain saja — bukan source aplikasi dan tidak boleh dipakai sebagai
 * komponen production. Seluruh state hanya hidup di memori tab ini.
 */
(function () {
  "use strict";

  const PERSONAS = ["Public", "Owner", "Admin", "Cashier", "Operator", "Super Admin"];
  const TENANT_ROLES = ["Owner", "Admin", "Cashier", "Operator"];
  const EVERYONE = [...PERSONAS];

  const route = (path, name, group, shell, roles, purpose, primary, secondary, info, flows, reqs, kind) => ({
    path, name, group, shell, roles, purpose, primary, secondary, info, flows, reqs, kind
  });

  // Manifest ini harus identik dan berjumlah tepat 41 route dari SCREEN_MAP.md.
  const ROUTES = [
    route("/", "Beranda", "Public", "public", EVERYONE, "Menjelaskan nilai LaundryKita untuk operasi laundry Indonesia.", "Mulai trial", "Lihat fitur", "Nilai produk, modul MVP, dan CTA", ["UF-01"], ["AUTH-01"], "landing"),
    route("/features", "Fitur", "Public", "public", EVERYONE, "Menjelaskan modul yang termasuk MVP dan batasnya.", "Mulai trial", "Lihat paket", "Pelanggan, pesanan, produksi, pembayaran, kas, laporan", ["UF-01"], ["Scope PRD"], "features"),
    route("/pricing", "Harga", "Public", "public", EVERYONE, "Membandingkan tiga paket pilot terkonfigurasi.", "Pilih paket", "Hubungi tim", "Starter, Growth, Multi-Outlet, trial dan limit", ["UF-11"], ["SUB-03", "SUB-04", "SUB-05"], "pricing"),
    route("/contact", "Kontak", "Public", "public", EVERYONE, "Menampilkan kanal bantuan resmi.", "Hubungi tim", "Kembali", "Email dan jam dukungan pilot", ["UF-01", "UF-11"], ["Pendukung"], "contact"),
    route("/login", "Masuk", "Autentikasi", "auth", EVERYONE, "Membuat session pengguna.", "Masuk", "Lupa password", "Email, password, dan jalur recovery", ["UF-01"], ["AUTH-02", "AUTH-04"], "auth"),
    route("/register", "Daftar Owner", "Autentikasi", "auth", EVERYONE, "Membuat akun publik khusus Owner.", "Buat akun", "Sudah punya akun", "Email, password minimal 8 karakter, persetujuan legal", ["UF-01"], ["AUTH-01"], "auth"),
    route("/verify-email", "Verifikasi email", "Autentikasi", "auth", EVERYONE, "Memvalidasi email sebelum onboarding atau login.", "Lanjut", "Kirim ulang", "Email tersamar, token 24 jam", ["UF-01"], ["AUTH-01"], "auth-status"),
    route("/forgot-password", "Lupa password", "Autentikasi", "auth", EVERYONE, "Meminta tautan reset tanpa membocorkan akun.", "Kirim tautan", "Kembali masuk", "Email dan pesan generik", ["UF-01"], ["AUTH-03"], "auth"),
    route("/reset-password", "Atur password baru", "Autentikasi", "auth", EVERYONE, "Mengganti password melalui token 60 menit.", "Simpan password", "Kembali masuk", "Password dan konfirmasi", ["UF-01"], ["AUTH-03"], "auth"),
    route("/accept-invitation", "Terima undangan", "Autentikasi", "auth", EVERYONE, "Menerima membership pegawai yang berlaku 72 jam.", "Terima undangan", "Tolak", "Tenant, role preset, outlet assignment, expiry", ["UF-01", "UF-10"], ["ORG-02", "ORG-03"], "invitation"),
    route("/select-tenant", "Pilih bisnis", "Autentikasi", "auth", ["Owner", "Admin", "Cashier", "Operator"], "Memilih tenant aktif saat pengguna memiliki beberapa membership.", "Buka tenant", "Keluar", "Membership aktif, role, subscription state", ["UF-01"], ["AUTH-05", "AUTH-06"], "tenant-select"),
    route("/terms", "Syarat layanan", "Public", "public", EVERYONE, "Menampilkan syarat penggunaan versi pilot.", "Kembali", "Kontak", "Versi, tanggal, dan isi dokumen", ["UF-01"], ["Pendukung"], "legal"),
    route("/privacy", "Privasi", "Public", "public", EVERYONE, "Menampilkan kebijakan privasi dan minimisasi data.", "Kembali", "Kontak", "Versi, tanggal, dan isi dokumen", ["UF-01"], ["Pendukung"], "legal"),

    route("/onboarding/business", "Identitas bisnis", "Onboarding", "onboarding", ["Owner"], "Membuat tenant dengan konteks Indonesia.", "Simpan dan lanjut", "Keluar nanti", "Nama, kontak, timezone, slug otomatis", ["UF-02"], ["ONB-01", "ONB-04"], "onboarding-business"),
    route("/onboarding/outlet", "Outlet pertama", "Onboarding", "onboarding", ["Owner"], "Membuat outlet pertama tenant.", "Simpan dan lanjut", "Kembali", "Nama wajib, kode 2–4 karakter, alamat dan kontak opsional", ["UF-02"], ["ONB-02", "ORG-01"], "onboarding-outlet"),
    route("/onboarding/services", "Layanan awal", "Onboarding", "onboarding", ["Owner"], "Menyiapkan minimal satu layanan aktif.", "Simpan dan lanjut", "Tambah custom", "Template atau layanan kiloan/satuan, harga, durasi, minimum, express", ["UF-02"], ["ONB-03", "SRV-01", "SRV-02", "SRV-03", "SRV-04", "SRV-05"], "onboarding-services"),
    route("/onboarding/complete", "Tinjau onboarding", "Onboarding", "onboarding", ["Owner"], "Mengaktifkan tenant dan trial setelah setup valid.", "Selesaikan onboarding", "Ubah data", "Ringkasan bisnis, outlet, layanan, trial 14 hari", ["UF-02"], ["ONB-04", "ONB-05", "SUB-01"], "onboarding-complete"),

    route("/app/[tenantSlug]/dashboard", "Dashboard", "Operasional", "tenant", TENANT_ROLES, "Memberi ringkasan operasional sesuai scope outlet.", "Buka order", "Lihat antrean", "Nilai Pesanan, Pembayaran Diterima, Piutang, order aktif dan siap", ["UF-09"], ["REP-01", "REP-02"], "dashboard"),
    route("/app/[tenantSlug]/orders", "Pesanan", "Operasional", "tenant", TENANT_ROLES, "Mencari dan memantau pesanan outlet yang dapat diakses.", "Buat pesanan", "Filter", "Kode, pelanggan, outlet, ETA, total, balance, order/payment state", ["UF-04", "UF-05", "UF-06", "UF-07"], ["ORD-01", "PRD-02"], "orders"),
    route("/app/[tenantSlug]/orders/new", "Pesanan baru", "Operasional", "tenant", ["Owner", "Admin", "Cashier"], "Membuat pesanan cepat dengan kalkulasi dan payment atomik.", "Konfirmasi pesanan", "Batalkan draft", "Outlet, pelanggan, item, quantity, express, diskon, ETA, payment, total", ["UF-03", "UF-04", "UF-05"], ["ORD-01", "ORD-02", "ORD-03", "ORD-04", "ORD-05", "ORD-06", "ORD-07", "PAY-01", "PAY-02", "PAY-03"], "order-new"),
    route("/app/[tenantSlug]/orders/[orderId]", "Detail pesanan", "Operasional", "tenant", TENANT_ROLES, "Menjadi sumber detail, histori, dan tindakan legal order.", "Action berikutnya", "Tindakan lainnya", "Header, pelanggan, snapshot item, total, payment, ETA, state, histori", ["UF-04", "UF-05", "UF-06", "UF-07"], ["ORD-*", "PAY-01", "PAY-02", "PAY-03", "PAY-04", "PAY-05"], "order-detail"),
    route("/app/[tenantSlug]/orders/[orderId]/edit", "Edit pesanan", "Operasional", "tenant", ["Owner", "Admin", "Cashier"], "Mengedit field legal atau menjalankan correction transaction.", "Simpan perubahan", "Kembali ke detail", "State/payment, field legal, old/new total, dampak correction", ["UF-07"], ["ORD-08", "ORD-09", "PAY-05"], "order-edit"),
    route("/app/[tenantSlug]/orders/[orderId]/receipt", "Nota", "Operasional", "tenant", ["Owner", "Admin", "Cashier"], "Meninjau, mencetak, membagikan, atau mengunduh nota terbaru.", "Cetak", "Bagikan / unduh", "Nota tanpa ID internal; format 58/80 mm", ["UF-04", "UF-05", "UF-07"], ["RCP-01", "RCP-02", "RCP-03", "RCP-04"], "receipt"),
    route("/app/[tenantSlug]/production", "Produksi", "Operasional", "tenant", TENANT_ROLES, "Memproses antrean dengan workflow status standar.", "Status berikutnya", "Filter / rollback", "RECEIVED hingga READY, ETA, express, terlambat", ["UF-06", "UF-07"], ["PRD-01", "PRD-02", "PRD-03", "PRD-04", "PRD-05"], "production"),
    route("/app/[tenantSlug]/customers", "Pelanggan", "Operasional", "tenant", ["Owner", "Admin", "Cashier"], "Mencari dan membuat pelanggan tenant-wide.", "Tambah pelanggan", "Filter arsip", "Nama, HP Indonesia, ringkasan histori yang terlihat", ["UF-03", "UF-04"], ["CUS-01", "CUS-02", "CUS-03"], "customers"),
    route("/app/[tenantSlug]/customers/[customerId]", "Detail pelanggan", "Operasional", "tenant", ["Owner", "Admin", "Cashier"], "Melihat profil dan histori sesuai outlet assignment.", "Buat pesanan", "Ubah profil", "Profil, warning duplikat, ringkasan dan histori", ["UF-03", "UF-04"], ["CUS-04", "CUS-05"], "customer-detail"),
    route("/app/[tenantSlug]/payments", "Pembayaran", "Keuangan", "tenant", ["Owner", "Admin", "Cashier"], "Menyediakan ledger payment dan filter piutang; mutasi dimulai dari order.", "Buka pesanan", "Filter ledger", "Kode, waktu, outlet, metode, nominal, aktor, status, balance", ["UF-05", "UF-08", "UF-09"], ["PAY-01", "PAY-02", "PAY-03", "PAY-04", "PAY-05", "REP-05"], "payments"),
    route("/app/[tenantSlug]/cash-register", "Kas", "Keuangan", "tenant", ["Owner", "Admin", "Cashier"], "Membuka, menutup, dan meninjau sesi kas outlet.", "Buka / tutup sesi", "Cash in / out", "Shift, opening, cash payment, movement, expected, physical, variance", ["UF-08"], ["PAY-04", "PAY-05", "PAY-06", "PAY-07"], "cash"),
    route("/app/[tenantSlug]/reports", "Laporan", "Keuangan", "tenant", ["Owner", "Admin", "Cashier"], "Menampilkan laporan yang dapat direkonsiliasi.", "Ubah filter", "Buka drill-down", "Metrik finansial, order, layanan, metode, keterlambatan", ["UF-09"], ["REP-01", "REP-02", "REP-03", "REP-04", "REP-05"], "reports"),

    route("/app/[tenantSlug]/settings/business", "Pengaturan bisnis", "Pengaturan", "tenant", ["Owner", "Admin"], "Melihat atau mengubah identitas tenant sesuai capability.", "Simpan", "Batalkan", "Nama, kontak, timezone, slug read-only", ["UF-02", "UF-10"], ["ONB-01", "ORG-04"], "settings-business"),
    route("/app/[tenantSlug]/settings/outlets", "Outlet", "Pengaturan", "tenant", ["Owner"], "Mengelola outlet tanpa menghapus histori.", "Tambah outlet", "Edit outlet", "Kode, status ACTIVE/INACTIVE, assignment, usage/limit", ["UF-02", "UF-10", "UF-11"], ["ORG-01", "SUB-04", "SUB-05"], "settings-outlets"),
    route("/app/[tenantSlug]/settings/services", "Layanan & harga", "Pengaturan", "tenant", ["Owner", "Admin"], "Mengelola layanan kiloan/satuan dan harga efektif.", "Tambah layanan", "Edit harga", "Unit, default/override, durasi, minimum, express, status", ["UF-02", "UF-04"], ["SRV-01", "SRV-02", "SRV-03", "SRV-04", "SRV-05", "SRV-06"], "settings-services"),
    route("/app/[tenantSlug]/settings/staff", "Pegawai", "Pengaturan", "tenant", ["Owner"], "Mengelola invitation, membership, role, dan assignment outlet.", "Undang pegawai", "Kelola assignment", "PENDING/EXPIRED/REVOKED, membership ACTIVE/INACTIVE, usage", ["UF-10"], ["ORG-02", "ORG-03", "ORG-06"], "settings-staff"),
    route("/app/[tenantSlug]/settings/roles", "Role & capability", "Pengaturan", "tenant", ["Owner"], "Meninjau preset dan toggle sensitif terbatas.", "Simpan toggle", "Pulihkan preset", "Owner, Admin, Cashier, Operator dan capability sensitif", ["UF-10"], ["ORG-04", "ORG-05"], "settings-roles"),
    route("/app/[tenantSlug]/settings/billing", "Subscription", "Pengaturan", "tenant", ["Owner"], "Mengelola paket, usage, tagihan, dan recovery.", "Pilih / ubah paket", "Lihat histori", "Plan, state, periode, trial/grace, usage/limit, invoice", ["UF-11"], ["SUB-01", "SUB-02", "SUB-03", "SUB-04", "SUB-05", "SUB-06", "SUB-07", "SUB-08"], "billing"),

    route("/admin", "Dashboard Platform", "Super Admin", "admin", ["Super Admin"], "Meninjau kesehatan Platform tanpa data operasional tenant.", "Cari tenant", "Lihat perhatian", "Jumlah tenant/subscription dan event perhatian", ["UF-12"], ["ADM-01", "ADM-02"], "admin-dashboard"),
    route("/admin/tenants", "Tenant", "Super Admin", "admin", ["Super Admin"], "Mencari tenant berdasarkan metadata.", "Buka detail", "Filter", "Metadata, paket, status, entitlement usage", ["UF-12"], ["ADM-01", "ADM-02"], "admin-tenants"),
    route("/admin/tenants/[tenantId]", "Detail tenant", "Super Admin", "admin", ["Super Admin"], "Menjalankan support action tanpa customer/order/payment/kas.", "Tambah hari / suspend", "Reactivate", "Metadata, subscription, usage, state dan histori", ["UF-12"], ["ADM-02", "ADM-03", "ADM-04", "ADM-05"], "admin-tenant-detail"),
    route("/admin/plans", "Plan version", "Super Admin", "admin", ["Super Admin"], "Mengelola plan version terkonfigurasi dan mengarsipkan yang terpakai.", "Buat versi", "Edit / archive", "Label, harga tampilan, entitlement, usage, state", ["UF-12"], ["SUB-03", "SUB-04", "ADM-05"], "admin-plans"),
    route("/admin/subscriptions", "Subscription Platform", "Super Admin", "admin", ["Super Admin"], "Memantau subscription, invoice minimum, dan event billing.", "Buka tenant", "Filter", "Tenant, plan version, state, periode, usage, event", ["UF-11", "UF-12"], ["SUB-02", "SUB-07", "SUB-08"], "admin-subscriptions"),
    route("/admin/audit-logs", "Audit Platform", "Super Admin", "admin", ["Super Admin"], "Menelusuri tindakan Platform tanpa secret atau data customer.", "Filter audit", "Buka detail", "Aktor, action, target, alasan, waktu, correlation ID", ["UF-12"], ["ADM-05", "ADM-06"], "admin-audit")
  ];

  const ORDER_STATES = ["RECEIVED", "WASHING", "DRYING", "IRONING", "READY", "COMPLETED", "CANCELED"];
  const PAYMENT_STATES = ["UNPAID", "PARTIAL", "PAID", "REFUNDED"];

  const OVERLAYS = {
    "quick-customer": { title: "Pelanggan baru", type: "DRAWER", action: "Simpan dan pilih", roles: ["Owner", "Admin", "Cashier"], body: "customer" },
    "outlet-form": { title: "Tambah / edit outlet", type: "DIALOG", action: "Simpan outlet", roles: ["Owner"], body: "outlet" },
    "service-form": { title: "Tambah / edit layanan", type: "DRAWER", action: "Simpan layanan", roles: ["Owner", "Admin"], body: "service" },
    "invite-staff": { title: "Undang pegawai", type: "DIALOG", action: "Kirim undangan", roles: ["Owner"], body: "invite" },
    "role-capability": { title: "Capability role", type: "DRAWER", action: "Simpan toggle", roles: ["Owner"], body: "capability" },
    "discount": { title: "Terapkan diskon", type: "DIALOG", action: "Terapkan diskon", roles: ["Owner", "Admin"], body: "discount" },
    "payment": { title: "Catat pembayaran", type: "DIALOG", action: "Konfirmasi pembayaran", roles: ["Owner", "Admin", "Cashier"], body: "payment" },
    "print-receipt": { title: "Cetak nota", type: "DIALOG", action: "Buka print browser", roles: ["Owner", "Admin", "Cashier"], body: "receipt" },
    "edit-order": { title: "Edit pesanan", type: "DRAWER", action: "Tinjau perubahan", roles: ["Owner", "Admin", "Cashier"], body: "edit" },
    "cancel-order": { title: "Batalkan pesanan", type: "CONFIRMATION", action: "Batalkan pesanan", roles: ["Owner", "Admin"], body: "cancel", sensitive: true },
    "handoff-order": { title: "Serahkan pesanan", type: "CONFIRMATION", action: "Konfirmasi serah terima", roles: ["Owner", "Admin", "Cashier"], body: "handoff" },
    "rollback-status": { title: "Rollback status", type: "CONFIRMATION", action: "Rollback ke DRYING", roles: ["Owner", "Admin"], body: "rollback", sensitive: true },
    "void-payment": { title: "Void pembayaran", type: "CONFIRMATION", action: "Void payment", roles: ["Owner", "Admin"], body: "void", sensitive: true },
    "reverse-payment": { title: "Reversal pembayaran", type: "CONFIRMATION", action: "Catat reversal", roles: ["Owner", "Admin"], body: "reversal", sensitive: true },
    "refund-payment": { title: "Refund penuh", type: "CONFIRMATION", action: "Catat refund", roles: ["Owner", "Admin"], body: "refund", sensitive: true },
    "cash-open": { title: "Buka sesi kas", type: "DIALOG", action: "Buka sesi", roles: ["Owner", "Admin", "Cashier"], body: "cash-open" },
    "cash-close": { title: "Tutup sesi kas", type: "CONFIRMATION", action: "Tutup sesi", roles: ["Owner", "Admin", "Cashier"], body: "cash-close", closeAllowed: true },
    "upgrade-plan": { title: "Upgrade paket", type: "DIALOG", action: "Lanjut ke checkout", roles: ["Owner"], body: "upgrade", recovery: true },
    "archive-plan": { title: "Archive plan", type: "CONFIRMATION", action: "Archive plan", roles: ["Super Admin"], body: "archive", sensitive: true },
    "suspend-tenant": { title: "Suspend tenant", type: "CONFIRMATION", action: "Suspend tenant", roles: ["Super Admin"], body: "suspend", sensitive: true },
    "reactivate-tenant": { title: "Reactivate tenant", type: "CONFIRMATION", action: "Reactivate tenant", roles: ["Super Admin"], body: "reactivate", sensitive: true }
  };

  const HAPPY_PATHS = [
    { title: "Registrasi Owner", persona: "Public", flow: "UF-01", steps: [{ route: "/register", label: "Isi email, password, dan persetujuan" }, { route: "/verify-email", label: "Buka email verifikasi" }] },
    { title: "Verifikasi email", persona: "Public", flow: "UF-01", steps: [{ route: "/verify-email", label: "Token valid selama 24 jam" }, { route: "/onboarding/business", label: "Session Owner terverifikasi", persona: "Owner" }] },
    { title: "Onboarding bisnis, outlet, layanan", persona: "Owner", flow: "UF-02", steps: [{ route: "/onboarding/business", label: "Identitas tenant; trial belum dimulai" }, { route: "/onboarding/outlet", label: "Outlet pertama; trial belum dimulai" }, { route: "/onboarding/services", label: "Minimal satu layanan aktif" }, { route: "/onboarding/complete", label: "Konfirmasi final memulai trial 14 hari" }, { route: "/app/[tenantSlug]/dashboard", label: "Tenant OPERATIONAL dengan TRIALING", subscription: "TRIALING" }] },
    { title: "Login dan pilih tenant", persona: "Owner", flow: "UF-01", steps: [{ route: "/login", label: "Masuk" }, { route: "/select-tenant", label: "Pilih membership aktif" }, { route: "/app/[tenantSlug]/dashboard", label: "Tenant dan outlet aktif" }] },
    { title: "Quick-create pelanggan", persona: "Cashier", flow: "UF-03", steps: [{ route: "/app/[tenantSlug]/orders/new", label: "Draft order dipertahankan", overlay: "quick-customer" }, { route: "/app/[tenantSlug]/orders/new", label: "Pelanggan baru terpilih" }] },
    { title: "Pesanan kiloan", persona: "Cashier", flow: "UF-04", steps: [{ route: "/app/[tenantSlug]/orders/new", label: "Pilih pelanggan lama" }, { route: "/app/[tenantSlug]/orders/new", label: "Cuci Kering 2,35 kg; tertagih minimum 3 kg" }] },
    { title: "Tambah layanan satuan", persona: "Cashier", flow: "UF-04", steps: [{ route: "/app/[tenantSlug]/orders/new", label: "Tambah Bedcover satuan × 2" }] },
    { title: "Express dan diskon berizin", persona: "Owner", flow: "UF-04", steps: [{ route: "/app/[tenantSlug]/orders/new", label: "Aktifkan express bila semua item eligible" }, { route: "/app/[tenantSlug]/orders/new", label: "Diskon 10% dengan alasan", overlay: "discount" }] },
    { title: "Menerima DP", persona: "Cashier", flow: "UF-05", steps: [{ route: "/app/[tenantSlug]/orders/new", label: "Pilih DP Rp10.000", overlay: "payment" }, { route: "/app/[tenantSlug]/orders/[orderId]", label: "Payment state PARTIAL" }] },
    { title: "Mencetak nota", persona: "Cashier", flow: "UF-04", steps: [{ route: "/app/[tenantSlug]/orders/[orderId]/receipt", label: "Nota terbaru tanpa ID internal", overlay: "print-receipt" }] },
    { title: "Memproses produksi", persona: "Operator", flow: "UF-06", steps: ORDER_STATES.slice(0, 5).map(state => ({ route: "/app/[tenantSlug]/production", label: `Transisi terkontrol: ${state}` })) },
    { title: "Pelunasan dan serah terima", persona: "Cashier", flow: "UF-07", steps: [{ route: "/app/[tenantSlug]/orders/[orderId]", label: "Order READY dan balance Rp47.375", overlay: "payment" }, { route: "/app/[tenantSlug]/orders/[orderId]", label: "Payment PAID; konfirmasi serah terima", overlay: "handoff-order" }, { route: "/app/[tenantSlug]/orders/[orderId]", label: "Handoff mengubah READY menjadi COMPLETED" }] },
    { title: "Buka dan tutup sesi kas", persona: "Cashier", flow: "UF-08", steps: [{ route: "/app/[tenantSlug]/cash-register", label: "Belum ada sesi; isi opening float", overlay: "cash-open" }, { route: "/app/[tenantSlug]/cash-register", label: "Sesi OPEN; rekonsiliasi expected vs physical", overlay: "cash-close" }, { route: "/app/[tenantSlug]/cash-register", label: "Sesi CLOSED dengan variance Rp0" }] },
    { title: "Dashboard dan laporan", persona: "Owner", flow: "UF-09", outlet: "Semua outlet", steps: [{ route: "/app/[tenantSlug]/dashboard", label: "Tiga metrik finansial terpisah" }, { route: "/app/[tenantSlug]/reports", label: "Drill-down rekonsiliasi" }] },
    { title: "Undang pegawai dan atur outlet", persona: "Owner", flow: "UF-10", steps: [{ route: "/app/[tenantSlug]/settings/staff", label: "Undangan role + assignment", overlay: "invite-staff" }, { route: "/app/[tenantSlug]/settings/outlets", label: "Tambah atau edit outlet", overlay: "outlet-form" }] },
    { title: "Lihat dan ubah subscription", persona: "Owner", flow: "UF-11", steps: [{ route: "/app/[tenantSlug]/settings/billing", label: "Bandingkan usage dan limit" }, { route: "/app/[tenantSlug]/settings/billing", label: "Checkout menunggu webhook", overlay: "upgrade-plan" }] },
    { title: "Super Admin meninjau tenant", persona: "Super Admin", flow: "UF-12", steps: [{ route: "/admin/tenants", label: "Cari metadata tenant" }, { route: "/admin/tenants/[tenantId]", label: "Lihat subscription dan usage tanpa data operasional" }] },
    { title: "Suspend dan reactivate tenant", persona: "Super Admin", flow: "UF-12", steps: [{ route: "/admin/tenants/[tenantId]", label: "ACTIVE; konfirmasi manual suspend", subscription: "ACTIVE", overlay: "suspend-tenant" }, { route: "/admin/tenants/[tenantId]", label: "SUSPENDED; manual override tetap sampai reactivation", subscription: "SUSPENDED", overlay: "reactivate-tenant" }, { route: "/admin/tenants/[tenantId]", label: "ACTIVE setelah reactivation eksplisit", subscription: "ACTIVE" }] }
  ];

  const state = {
    persona: "Owner",
    outlet: "Outlet Sudirman",
    subscription: "ACTIVE",
    screenState: "Default",
    scenarioIndex: -1,
    scenarioStep: 0,
    toastTimer: null
  };

  const el = id => document.getElementById(id);
  const currentRoute = () => {
    const raw = window.location.hash.slice(1);
    const path = raw ? decodeURIComponent(raw) : "/";
    return ROUTES.find(item => item.path === path) || ROUTES[0];
  };
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const rupiah = value => `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
  const chip = (label, mode = "") => `<span class="status-chip"${mode ? ` data-state="${mode}"` : ""}>${escapeHtml(label)}</span>`;
  const button = (label, options = {}) => {
    const attrs = ["class=\"button " + (options.primary ? "button-primary" : options.quiet ? "button-quiet" : "button-secondary") + "\""];
    if (options.overlay) attrs.push(`data-overlay="${options.overlay}"`);
    if (options.navigate) attrs.push(`data-navigate="${options.navigate}"`);
    if (options.mutation) attrs.push("data-mutation=\"true\"");
    if (options.recovery) attrs.push("data-recovery=\"true\"");
    if (options.closeAllowed) attrs.push("data-close-allowed=\"true\"");
    if (options.disabled) attrs.push("disabled", `title="${escapeHtml(options.reason || "Tindakan tidak tersedia")}"`);
    return `<button type="button" ${attrs.join(" ")}>${escapeHtml(label)}</button>`;
  };

  function isTenantReadOnly() {
    return state.screenState === "Read-only" || state.subscription === "SUSPENDED" || state.subscription === "CANCELED";
  }

  function isRouteAllowed(item = currentRoute()) {
    return item.roles.includes(state.persona);
  }

  function canMutate(item = currentRoute()) {
    if (!isRouteAllowed(item)) return false;
    if (item.shell === "public" || item.shell === "auth" || item.shell === "onboarding") return true;
    if (item.shell === "admin") return state.persona === "Super Admin";
    if (state.persona === "Owner") return true;
    if (state.persona === "Admin") {
      return !["settings-business", "reports", "dashboard"].includes(item.kind);
    }
    if (state.persona === "Cashier") {
      return ["orders", "order-new", "order-detail", "order-edit", "production", "customers", "customer-detail", "payments", "cash"].includes(item.kind);
    }
    return state.persona === "Operator" && item.kind === "production";
  }

  function navigate(path) {
    const next = `#${path}`;
    if (window.location.hash === next) render();
    else window.location.hash = next;
  }

  function showToast(message) {
    clearTimeout(state.toastTimer);
    const toast = el("toast");
    toast.textContent = message;
    toast.hidden = false;
    state.toastTimer = window.setTimeout(() => { toast.hidden = true; }, 3200);
  }

  function subscriptionBanner(item) {
    if (item.shell !== "tenant") return "";
    if (state.subscription === "PAST_DUE") {
      return `<div class="banner"><span class="banner-symbol">!</span><div><strong>PAST_DUE · grace 7 hari</strong><p>Operasi tetap aktif selama grace. Owner dapat memulihkan subscription melalui billing.</p></div>${state.persona === "Owner" ? button("Buka billing", { navigate: "/app/[tenantSlug]/settings/billing" }) : ""}</div>`;
    }
    if (state.subscription === "SUSPENDED" || state.subscription === "CANCELED" || state.screenState === "Read-only") {
      const reason = state.subscription === "CANCELED" ? "Subscription CANCELED; data berada dalam masa retensi 180 hari." : state.subscription === "SUSPENDED" ? "Subscription SUSPENDED; tenant berada dalam mode read-only." : "Screen state read-only sedang disimulasikan untuk review.";
      return `<div class="banner"><span class="banner-symbol">×</span><div><strong>Mode read-only</strong><p>${reason} Mutasi ditolak; data historis tetap dapat dibaca.</p></div>${state.persona === "Owner" ? button("Pulihkan di billing", { navigate: "/app/[tenantSlug]/settings/billing", recovery: true }) : ""}</div>`;
    }
    if (state.subscription === "TRIALING") {
      return `<div class="banner"><span class="banner-symbol">i</span><div><strong>TRIALING · 9 dari 14 hari tersisa</strong><p>Usage saat ini 286 dari 500 order.</p></div>${state.persona === "Owner" ? button("Lihat paket", { navigate: "/app/[tenantSlug]/settings/billing" }) : ""}</div>`;
    }
    return "";
  }

  function scenarioBanner() {
    if (state.scenarioIndex < 0) return "";
    const scenario = HAPPY_PATHS[state.scenarioIndex];
    const step = scenario.steps[state.scenarioStep];
    return `<div class="banner"><span class="banner-symbol">${state.scenarioStep + 1}</span><div><strong>${escapeHtml(scenario.title)}</strong><p>${escapeHtml(step.label)} · ${scenario.flow}</p></div></div>`;
  }

  function isHandoffScenario() {
    return state.scenarioIndex >= 0 && HAPPY_PATHS[state.scenarioIndex].title === "Pelunasan dan serah terima";
  }

  function isCashScenario() {
    return state.scenarioIndex >= 0 && HAPPY_PATHS[state.scenarioIndex].title === "Buka dan tutup sesi kas";
  }

  function isSuspendScenario() {
    return state.scenarioIndex >= 0 && HAPPY_PATHS[state.scenarioIndex].title === "Suspend dan reactivate tenant";
  }

  function actionConfig(item) {
    if (state.persona === "Operator" && item.kind === "orders") {
      return [{ label: "Buka produksi", navigate: "/app/[tenantSlug]/production", primary: true }, { label: "Filter antrean" }];
    }
    if (state.persona === "Operator" && item.kind === "order-detail") {
      return [{ label: "Kembali ke produksi", navigate: "/app/[tenantSlug]/production", primary: true }];
    }
    if (isHandoffScenario() && item.kind === "order-detail") {
      if (state.scenarioStep === 0) return [{ label: "Lunasi Rp47.375", overlay: "payment", primary: true, mutation: true }];
      if (state.scenarioStep === 1) return [{ label: "Serahkan pesanan", overlay: "handoff-order", primary: true, mutation: true }, { label: "Cetak nota", navigate: "/app/[tenantSlug]/orders/[orderId]/receipt" }];
      return [{ label: "Lihat nota final", navigate: "/app/[tenantSlug]/orders/[orderId]/receipt", primary: true }];
    }
    if (isCashScenario() && item.kind === "cash") {
      if (state.scenarioStep === 0) return [{ label: "Buka sesi", overlay: "cash-open", primary: true, mutation: true }];
      if (state.scenarioStep === 1) return [{ label: "Tutup sesi", overlay: "cash-close", primary: true, mutation: true, closeAllowed: true }];
      return [{ label: "Lihat ringkasan", primary: true }];
    }
    if (isSuspendScenario() && item.kind === "admin-tenant-detail") {
      if (state.scenarioStep === 0) return [{ label: "Suspend tenant", overlay: "suspend-tenant", primary: true, mutation: true }];
      if (state.scenarioStep === 1) return [{ label: "Reactivate tenant", overlay: "reactivate-tenant", primary: true, mutation: true }];
      return [{ label: "Lihat audit", navigate: "/admin/audit-logs", primary: true }];
    }
    const configs = {
      landing: [{ label: "Mulai trial", navigate: "/register", primary: true }, { label: "Lihat fitur", navigate: "/features" }],
      features: [{ label: "Mulai trial", navigate: "/register", primary: true }, { label: "Lihat paket", navigate: "/pricing" }],
      pricing: [{ label: state.persona === "Owner" ? "Pilih paket" : "Mulai trial", overlay: state.persona === "Owner" ? "upgrade-plan" : null, navigate: state.persona === "Owner" ? null : "/register", primary: true }, { label: "Hubungi tim", navigate: "/contact" }],
      contact: [{ label: "Salin email", primary: true }, { label: "Kembali", navigate: "/" }],
      auth: [{ label: item.primary, primary: true }, { label: item.secondary, navigate: item.path === "/forgot-password" || item.path === "/reset-password" ? "/login" : "/login" }],
      "auth-status": [{ label: item.primary, navigate: "/onboarding/business", primary: true }, { label: item.secondary }],
      invitation: [{ label: "Terima undangan", primary: true }, { label: "Tolak" }],
      "tenant-select": [{ label: "Buka tenant", navigate: "/app/[tenantSlug]/dashboard", primary: true }, { label: "Keluar", navigate: "/login" }],
      legal: [{ label: "Kembali", navigate: "/", primary: true }, { label: "Kontak", navigate: "/contact" }],
      "onboarding-business": [{ label: item.primary, navigate: "/onboarding/outlet", primary: true, mutation: true }, { label: item.secondary }],
      "onboarding-outlet": [{ label: item.primary, navigate: "/onboarding/services", primary: true, mutation: true }, { label: item.secondary, navigate: "/onboarding/business" }],
      "onboarding-services": [{ label: item.primary, navigate: "/onboarding/complete", primary: true, mutation: true }, { label: "Tambah custom", overlay: "service-form", mutation: true }],
      "onboarding-complete": [{ label: item.primary, navigate: "/app/[tenantSlug]/dashboard", primary: true, mutation: true }, { label: item.secondary, navigate: "/onboarding/business" }],
      dashboard: [{ label: "Buka order", navigate: "/app/[tenantSlug]/orders", primary: true }, { label: "Lihat antrean", navigate: "/app/[tenantSlug]/production" }],
      orders: [{ label: "Buat pesanan", navigate: "/app/[tenantSlug]/orders/new", primary: true, mutation: true }, { label: "Filter" }],
      "order-new": [{ label: "Konfirmasi pesanan", overlay: "payment", primary: true, mutation: true }, { label: "Pelanggan baru", overlay: "quick-customer", mutation: true }],
      "order-detail": [{ label: "Terima pembayaran", overlay: "payment", primary: true, mutation: true }, { label: "Edit", overlay: "edit-order", mutation: true }, { label: "Batalkan", overlay: "cancel-order", mutation: true }],
      "order-edit": [{ label: "Simpan perubahan", overlay: "edit-order", primary: true, mutation: true }, { label: "Kembali", navigate: "/app/[tenantSlug]/orders/[orderId]" }],
      receipt: [{ label: "Cetak", overlay: "print-receipt", primary: true }, { label: "Bagikan / unduh" }],
      production: [{ label: "Status berikutnya", primary: true, mutation: true }, { label: "Rollback", overlay: "rollback-status", mutation: true }],
      customers: [{ label: "Tambah pelanggan", overlay: "quick-customer", primary: true, mutation: true }, { label: "Filter arsip" }],
      "customer-detail": [{ label: "Buat pesanan", navigate: "/app/[tenantSlug]/orders/new", primary: true, mutation: true }, { label: "Ubah profil", overlay: "quick-customer", mutation: true }],
      payments: [{ label: "Buka pesanan", navigate: "/app/[tenantSlug]/orders/[orderId]", primary: true }, { label: "Filter ledger" }],
      cash: [{ label: "Buka sesi", overlay: "cash-open", primary: true, mutation: true }, { label: "Tutup sesi", overlay: "cash-close", mutation: true, closeAllowed: true }],
      reports: [{ label: "Ubah filter", primary: true }, { label: "Buka drill-down", navigate: "/app/[tenantSlug]/payments" }],
      "settings-business": [{ label: "Simpan", primary: true, mutation: true }, { label: "Batalkan" }],
      "settings-outlets": [{ label: "Tambah outlet", overlay: "outlet-form", primary: true, mutation: true }, { label: "Edit outlet", overlay: "outlet-form", mutation: true }],
      "settings-services": [{ label: "Tambah layanan", overlay: "service-form", primary: true, mutation: true }, { label: "Edit harga", overlay: "service-form", mutation: true }],
      "settings-staff": [{ label: "Undang pegawai", overlay: "invite-staff", primary: true, mutation: true }, { label: "Kelola assignment", overlay: "invite-staff", mutation: true }],
      "settings-roles": [{ label: "Simpan toggle", overlay: "role-capability", primary: true, mutation: true }, { label: "Pulihkan preset", overlay: "role-capability", mutation: true }],
      billing: [{ label: "Pilih / ubah paket", overlay: "upgrade-plan", primary: true, mutation: true, recovery: true }, { label: "Lihat histori" }],
      "admin-dashboard": [{ label: "Cari tenant", navigate: "/admin/tenants", primary: true }, { label: "Lihat perhatian", navigate: "/admin/subscriptions" }],
      "admin-tenants": [{ label: "Buka detail", navigate: "/admin/tenants/[tenantId]", primary: true }, { label: "Filter" }],
      "admin-tenant-detail": [{ label: "Suspend", overlay: "suspend-tenant", primary: true, mutation: true }, { label: "Reactivate", overlay: "reactivate-tenant", mutation: true }],
      "admin-plans": [{ label: "Buat versi", primary: true, mutation: true }, { label: "Archive", overlay: "archive-plan", mutation: true }],
      "admin-subscriptions": [{ label: "Buka tenant", navigate: "/admin/tenants/[tenantId]", primary: true }, { label: "Filter" }],
      "admin-audit": [{ label: "Filter audit", primary: true }, { label: "Buka detail" }]
    };
    return configs[item.kind] || [];
  }

  function pageHeading(item, denied = false) {
    const actions = denied ? "" : actionConfig(item).map(config => {
      const blockedByCapability = config.mutation && !canMutate(item);
      const blockedByOverlayPermission = config.overlay && OVERLAYS[config.overlay] && !OVERLAYS[config.overlay].roles.includes(state.persona);
      const blockedByReadOnly = config.mutation && item.shell === "tenant" && isTenantReadOnly() && !config.recovery && !config.closeAllowed;
      const blockedByLoading = state.screenState === "Loading";
      return button(config.label, {
        ...config,
        disabled: blockedByCapability || blockedByOverlayPermission || blockedByReadOnly || blockedByLoading,
        reason: blockedByLoading ? "Tunggu data selesai dimuat" : blockedByCapability || blockedByOverlayPermission ? "Capability tidak tersedia untuk persona ini" : "Tenant read-only menolak mutasi ini"
      });
    }).join("");
    return `<header class="page-heading"><div><div class="route-label">${escapeHtml(item.path)}</div><h1>${escapeHtml(item.name)}</h1><p>${escapeHtml(item.purpose)}</p></div><div class="page-actions">${actions}</div></header>`;
  }

  function traceability(item) {
    return `<section class="section panel panel-flat"><div class="section-heading"><div><span class="eyebrow">TRACEABILITY</span><h2>Patokan layar</h2></div></div><div class="chip-row">${item.flows.map(flow => chip(flow)).join("")}${item.reqs.map(req => chip(req)).join("")}</div><p class="small muted" style="margin:10px 0 0">Informasi utama: ${escapeHtml(item.info)}.</p></section>`;
  }

  function statePanel(mode, item) {
    const map = {
      Loading: ["…", "Memuat layar", "Skeleton menjaga struktur; action terkunci sampai data lengkap."],
      Empty: ["○", "Belum ada data", `Tidak ada data untuk ${item.name.toLowerCase()} pada filter dan outlet aktif. Ubah filter atau gunakan primary action bila berizin.`],
      Error: ["!", "Data tidak dapat dimuat", "Tidak ada total parsial yang diklaim final. Coba lagi; correlation ID WF-26-0807 ditampilkan untuk dukungan."],
      "Permission denied": ["×", "Akses ditolak", "Session, membership, capability, atau outlet assignment tidak mengizinkan layar ini. Keberadaan resource tenant lain tidak diungkap." ]
    };
    if (mode === "Loading") {
      return `<div class="state-panel"><div style="width:100%"><div class="state-symbol">…</div><h2>Memuat ${escapeHtml(item.name)}</h2>${Array.from({ length: 6 }, (_, index) => `<div class="skeleton skeleton-line${index % 3 === 2 ? " short" : ""}"></div>`).join("")}</div></div>`;
    }
    const [symbol, title, copy] = map[mode];
    return `<div class="state-panel"><div><div class="state-symbol">${symbol}</div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p>${mode === "Error" ? button("Coba lagi", { primary: true }) : mode === "Empty" ? button("Reset filter", { primary: true }) : button("Kembali ke layar aman", { navigate: item.shell === "admin" ? "/admin" : "/" })}</div></div>`;
  }

  function metrics() {
    return `<div class="metric-grid">
      <div class="metric"><span class="eyebrow">NILAI PESANAN</span><strong>${rupiah(2485000)}</strong><small>42 order valid · created-at</small></div>
      <div class="metric"><span class="eyebrow">PEMBAYARAN DITERIMA</span><strong>${rupiah(1937500)}</strong><small>Payment valid − refund</small></div>
      <div class="metric"><span class="eyebrow">PIUTANG</span><strong>${rupiah(547500)}</strong><small>Balance order non-canceled</small></div>
      <div class="metric"><span class="eyebrow">ORDER AKTIF</span><strong>18</strong><small>RECEIVED hingga IRONING</small></div>
      <div class="metric"><span class="eyebrow">SIAP DIAMBIL</span><strong>7</strong><small>Status READY</small></div>
      <div class="metric"><span class="eyebrow">TERLAMBAT</span><strong>2</strong><small>ETA terlewati · ⚑ teks + ikon</small></div>
    </div>`;
  }

  function ordersTable() {
    const rows = [
      ["SDR-260807-0042", "Budi Santoso", "RECEIVED", "PARTIAL", "Hari ini, 17.00", rupiah(57375)],
      ["SDR-260807-0041", "Siti Aminah", "WASHING", "PAID", "Hari ini, 15.30 · ⚑ Terlambat", rupiah(42000)],
      ["SDR-260807-0038", "Rina Putri", "READY", "UNPAID", "Siap diambil", rupiah(58000)]
    ];
    return `<div class="data-table-wrap" data-mobile="cards"><table><thead><tr><th>Kode</th><th>Pelanggan</th><th>Status order</th><th>Status payment</th><th>ETA</th><th>Total</th></tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => `<td data-label="${["Kode", "Pelanggan", "Status order", "Status payment", "ETA", "Total"][index]}">${index === 0 ? `<a class="table-action" href="#/app/[tenantSlug]/orders/[orderId]">${cell}</a>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function operatorQueue() {
    const rows = [
      ["SDR-260807-0042", "RECEIVED", "Hari ini, 17.00", "⚡ EXPRESS", "Cuci Kering + 1 item"],
      ["SDR-260807-0041", "WASHING", "Hari ini, 15.30", "⚑ TERLAMBAT", "Cuci Setrika"],
      ["SDR-260807-0038", "READY", "Siap diambil", "Reguler", "Bedcover × 2"]
    ];
    return `<div class="data-table-wrap" data-mobile="cards"><table><thead><tr><th>Kode</th><th>Status</th><th>ETA</th><th>Flag</th><th>Ringkasan layanan</th></tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => `<td data-label="${["Kode", "Status", "ETA", "Flag", "Layanan"][index]}">${index === 0 ? `<a class="table-action" href="#/app/[tenantSlug]/orders/[orderId]">${cell}</a>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function publicContent(item) {
    if (item.kind === "landing") return `<section class="split-layout"><div><span class="eyebrow">RESPONSIVE WEB / PWA · INDONESIA</span><h2 style="font-size:clamp(2rem,6vw,4.8rem);line-height:.94;letter-spacing:-.06em;max-width:780px">Operasi laundry, jelas dari nota sampai tutup kas.</h2><p class="muted" style="max-width:600px">Pesanan, produksi, pembayaran manual, kas, outlet, pegawai, dan laporan dalam satu konteks tenant yang sah.</p><div class="inline-actions">${button("Mulai trial 14 hari", { navigate: "/register", primary: true })}${button("Lihat paket", { navigate: "/pricing" })}</div></div><div class="panel"><span class="eyebrow">ALUR OPERASIONAL</span>${["01 · Pelanggan", "02 · Pesanan", "03 · DP / lunas", "04 · Produksi", "05 · Handoff", "06 · Tutup kas"].map(label => `<div class="list-row"><strong>${label}</strong><span>→</span></div>`).join("")}</div></section>`;
    if (item.kind === "features") return `<div class="three-col">${[["Pelanggan & pesanan", "Tenant-wide, outlet-scoped, kiloan dan satuan."], ["Produksi", "Status linear, action mobile, skip/rollback teraudit."], ["Keuangan", "DP, pelunasan, ledger immutable, kas, dan laporan."], ["Organisasi", "Outlet, invitation, preset role, toggle sensitif terbatas."], ["Subscription", "Trial, entitlement, grace, read-only, recovery."], ["Guardrail", "Tanpa delivery khusus, inventory, payroll, atau gateway customer."]].map(([title, copy]) => `<section class="panel"><span class="eyebrow">MODUL MVP</span><h2>${title}</h2><p class="muted">${copy}</p></section>`).join("")}</div>`;
    if (item.kind === "pricing") return pricingCards();
    if (item.kind === "contact") return `<section class="panel" style="max-width:700px"><span class="eyebrow">DUKUNGAN PILOT</span><h2>Hubungi tim LaundryKita</h2><div class="list-row"><div><strong>Email</strong><p>pilot@laundrykita.example</p></div>${button("Salin", {})}</div><div class="list-row"><div><strong>Jam dukungan</strong><p>Senin–Jumat, 09.00–17.00 WIB</p></div><span>WIB</span></div></section>`;
    return `<article class="panel" style="max-width:820px"><span class="eyebrow">VERSI 1.0 · 7 AGUSTUS 2026</span><h2>${item.kind === "legal" && item.path === "/privacy" ? "Privasi dan minimisasi data" : "Syarat penggunaan pilot"}</h2>${Array.from({ length: 5 }, (_, index) => `<h3>${index + 1}. ${["Lingkup", "Akses", "Data", "Kewajiban", "Kontak"][index]}</h3><p class="muted">Blok teks wireframe untuk menilai panjang baris, hierarchy, dan perilaku baca pada mobile. Isi legal final bukan bagian dari fase ini.</p>`).join("")}</article>`;
  }

  function authContent(item) {
    if (item.kind === "auth-status") return `<section class="state-panel" style="max-width:620px;margin:auto"><div><div class="state-symbol">✓</div><span class="eyebrow">TOKEN VALID</span><h2>Email telah diverifikasi</h2><p>ha•••@contoh.id siap melanjutkan onboarding Owner. Token berlaku 24 jam dan tidak menampilkan detail akun lain.</p>${button("Lanjut onboarding", { navigate: "/onboarding/business", primary: true })}</div></section>`;
    if (item.kind === "invitation") return `<section class="panel" style="max-width:620px;margin:auto"><span class="eyebrow">UNDANGAN · 68 JAM TERSISA</span><h2>Laundry Bersih Jaya</h2><div class="list-row"><strong>Role</strong><span>Cashier</span></div><div class="list-row"><strong>Outlet</strong><span>Outlet Sudirman</span></div><div class="list-row"><strong>Status</strong>${chip("PENDING")}</div><p class="small muted">Masuk atau daftar menggunakan email tujuan yang sama. Token berlaku 72 jam.</p></section>`;
    if (item.kind === "tenant-select") return `<div class="stack" style="max-width:760px;margin:auto"><div class="list-row"><div><strong>Laundry Bersih Jaya</strong><div class="list-meta">${chip("Owner")}${chip(state.subscription, state.subscription === "ACTIVE" ? "success" : "warning")}</div></div>${button("Buka tenant", { navigate: "/app/[tenantSlug]/dashboard", primary: true })}</div><div class="list-row"><div><strong>Laundry Melati</strong><div class="list-meta">${chip("Admin")}${chip("SUSPENDED", "blocked")}</div></div>${button("Buka read-only", { navigate: "/app/[tenantSlug]/dashboard" })}</div></div>`;
    const isReset = item.path === "/reset-password";
    const isRegister = item.path === "/register";
    const isForgot = item.path === "/forgot-password";
    return `<section class="panel" style="max-width:520px;margin:auto"><span class="eyebrow">${isRegister ? "KHUSUS OWNER" : "AKSES AKUN"}</span><h2>${escapeHtml(item.name)}</h2><div class="form-grid" style="grid-template-columns:1fr"><label>Email<input type="email" value="hana@contoh.id" autocomplete="email"></label>${!isForgot ? `<label>${isReset ? "Password baru" : "Password"}<input type="password" value="password" minlength="8"><span class="field-hint">Minimal 8 karakter</span></label>` : ""}${isReset ? `<label>Konfirmasi password<input type="password" value="password" minlength="8"></label>` : ""}${isRegister ? `<label><span><input type="checkbox" checked style="width:auto;min-height:auto"> Saya menyetujui syarat dan privasi</span></label>` : ""}</div><div style="margin-top:16px">${button(item.primary, { primary: true })}</div>${isForgot ? `<p class="small muted" style="margin-top:12px">Respons selalu generik agar keberadaan akun tidak terungkap.</p>` : ""}</section>`;
  }

  function onboardingContent(item) {
    const steps = ["Bisnis", "Outlet", "Layanan", "Selesai"];
    const current = ["onboarding-business", "onboarding-outlet", "onboarding-services", "onboarding-complete"].indexOf(item.kind);
    const stepper = `<div class="chip-row" style="margin-bottom:18px">${steps.map((step, index) => `<span class="tag"${index === current ? " style=\"border-color:#111;background:#111;color:#fff\"" : ""}>${index + 1} · ${step}</span>`).join("")}</div>`;
    if (item.kind === "onboarding-business") return `${stepper}<section class="form-section"><h2>Identitas tenant</h2><div class="form-grid"><label>Nama bisnis<input value="Laundry Bersih Jaya"></label><label>Kontak<input value="+62 812-3456-7890"></label><label>Timezone<select><option>Asia/Jakarta (WIB)</option></select></label><label>Slug otomatis<input value="laundry-bersih-jaya" readonly><span class="field-hint">Unik; suffix otomatis bila bentrok.</span></label></div></section>`;
    if (item.kind === "onboarding-outlet") return `${stepper}<section class="form-section"><h2>Outlet pertama</h2><div class="form-grid"><label>Nama outlet *<input value="Outlet Sudirman"></label><label>Kode outlet<input value="SDR" maxlength="4"><span class="field-hint">2–4 karakter, unik dalam tenant.</span></label><label class="full">Alamat opsional<textarea>Jl. Jenderal Sudirman No. 10, Jakarta</textarea></label></div></section>`;
    if (item.kind === "onboarding-services") return `${stepper}<div class="two-col"><section class="panel"><span class="eyebrow">TEMPLATE</span><h2>Cuci Kering</h2><p>KILOGRAM · ${rupiah(7000)}/kg · minimum 3 kg</p><p>Express eligible · 25%</p>${chip("Dipilih", "success")}</section><section class="panel"><span class="eyebrow">TEMPLATE</span><h2>Cuci Setrika</h2><p>KILOGRAM · ${rupiah(10000)}/kg · minimum 3 kg</p>${button("Pilih template", { mutation: true })}</section></div>`;
    return `${stepper}<section class="panel"><h2>Siap memulai trial</h2>${[["Bisnis", "Laundry Bersih Jaya"], ["Outlet", "Outlet Sudirman · SDR"], ["Layanan", "Cuci Kering · aktif"], ["Trial", "14 hari dimulai saat finalisasi"]].map(([a,b]) => `<div class="list-row"><strong>${a}</strong><span>${b}</span></div>`).join("")}<p class="small muted" style="margin-top:12px">Finalisasi idempotent; retry tidak menggandakan resource.</p></section>`;
  }

  function pricingCards(interactive = true) {
    const plans = [
      ["Starter", 149000, "1 outlet", "5 pegawai", "500 order", "Laporan dasar"],
      ["Growth", 299000, "1 outlet", "15 pegawai", "2.000 order", "Laporan lengkap"],
      ["Multi-Outlet", 599000, "5 outlet", "50 pegawai", "10.000 order", "Lengkap lintas outlet"]
    ];
    return `<div class="three-col">${plans.map(([name, price, ...limits]) => `<section class="panel"><span class="eyebrow">PAKET PILOT</span><h2>${name}</h2><p><strong style="font-size:1.7rem">${rupiah(price)}</strong><span class="muted">/bulan</span></p>${limits.map(limit => `<div class="list-row"><span>${limit}</span><span>✓</span></div>`).join("")}${interactive ? state.persona === "Owner" ? button("Pilih paket", { overlay: "upgrade-plan", primary: name === "Growth", recovery: true }) : button("Mulai trial", { navigate: "/register", primary: name === "Growth" }) : name === "Growth" ? chip("Dipilih", "success") : chip("Opsi")}</section>`).join("")}</div><p class="small muted" style="margin-top:12px">Trial 14 hari · grace 7 hari · harga dan limit berada pada plan version.</p>`;
  }

  function tenantContent(item) {
    switch (item.kind) {
      case "dashboard":
        if (state.persona === "Operator") {
          return `<div class="metric-grid"><div class="metric"><span class="eyebrow">ANTREAN AKTIF</span><strong>18</strong><small>RECEIVED hingga IRONING</small></div><div class="metric"><span class="eyebrow">SIAP</span><strong>7</strong><small>Status READY</small></div><div class="metric"><span class="eyebrow">TERLAMBAT</span><strong>2</strong><small>⚑ ETA terlewati</small></div><div class="metric"><span class="eyebrow">EXPRESS</span><strong>4</strong><small>⚡ Label + ikon</small></div></div><section class="section"><div class="section-heading"><div><span class="eyebrow">RINGKASAN PRODUKSI</span><h2>Outlet Sudirman</h2></div><a href="#/app/[tenantSlug]/production">Buka board</a></div>${operatorQueue()}</section><p class="small muted">Tampilan Operator tidak memuat nama pelanggan, payment, total, kas, atau laporan finansial.</p>`;
        }
        if (state.persona === "Cashier") {
          return `<div class="metric-grid"><div class="metric"><span class="eyebrow">ORDER HARI INI</span><strong>24</strong><small>Outlet Sudirman</small></div><div class="metric"><span class="eyebrow">ORDER AKTIF</span><strong>18</strong><small>RECEIVED–IRONING</small></div><div class="metric"><span class="eyebrow">SIAP DIAMBIL</span><strong>7</strong><small>Status READY</small></div><div class="metric"><span class="eyebrow">PIUTANG ORDER</span><strong>6</strong><small>UNPAID/PARTIAL</small></div><div class="metric"><span class="eyebrow">SESI KAS</span><strong>OPEN</strong><small>Shift pagi</small></div><div class="metric"><span class="eyebrow">TERLAMBAT</span><strong>2</strong><small>⚑ ETA terlewati</small></div></div><section class="section"><div class="section-heading"><div><span class="eyebrow">OPERASIONAL OUTLET</span><h2>Pesanan terbaru</h2></div><a href="#/app/[tenantSlug]/orders">Lihat semua</a></div>${ordersTable()}</section><p class="small muted">Cashier melihat ringkasan operasional outlet aktif, bukan agregasi performa lintas outlet.</p>`;
        }
        return `${metrics()}<div class="split-layout section"><section><div class="section-heading"><div><span class="eyebrow">ORDER TERBARU</span><h2>Perlu perhatian</h2></div><a href="#/app/[tenantSlug]/orders">Lihat semua</a></div>${ordersTable()}</section><section class="panel"><span class="eyebrow">ANTREAN OUTLET</span><h2>Status hari ini</h2>${[["RECEIVED", 5], ["WASHING", 4], ["DRYING", 3], ["IRONING", 6], ["READY", 7]].map(([label, count]) => `<div class="summary-line"><span>${label}</span><strong>${count}</strong></div>`).join("")}</section></div>`;

      case "orders":
        if (state.persona === "Operator") {
          return `<div class="filter-row"><input class="field search" aria-label="Cari kode pesanan" placeholder="Cari kode pesanan"><select class="field" aria-label="Status order"><option>Semua status produksi</option>${ORDER_STATES.map(status => `<option>${status}</option>`).join("")}</select><select class="field"><option>Semua flag</option><option>Express</option><option>Terlambat</option></select></div>${operatorQueue()}<p class="small muted">Scope minimum produksi: kode, status, ETA, flag, dan ringkasan layanan. Data pelanggan/keuangan tidak dimuat.</p>`;
        }
        return `<div class="filter-row"><input class="field search" aria-label="Cari pesanan" placeholder="Cari kode, nama, atau HP"><select class="field" aria-label="Status order"><option>Semua status order</option>${ORDER_STATES.map(status => `<option>${status}</option>`).join("")}</select><select class="field" aria-label="Status payment"><option>Semua payment</option>${PAYMENT_STATES.map(status => `<option>${status}</option>`).join("")}</select></div>${ordersTable()}<p class="small muted">Pagination · 1–25 dari 42 pesanan · timezone Asia/Jakarta.</p>`;

      case "order-new":
        return `<div class="order-workspace"><div class="stack">
          <section class="form-section"><div class="section-heading"><div><span class="eyebrow">01 · PELANGGAN</span><h2>Budi Santoso</h2><p>+62 812-3456-7890 · customer tenant-wide</p></div>${button("Cari / buat", { overlay: "quick-customer", mutation: true })}</div></section>
          <section class="form-section"><div class="section-heading"><div><span class="eyebrow">02 · ITEM</span><h2>Layanan dan kuantitas</h2></div>${button("Tambah layanan", { mutation: true })}</div><div class="order-items">
            <div class="order-item"><label>Layanan<select><option>Cuci Kering · KILOGRAM</option></select></label><label>Aktual<input value="2,35" inputmode="decimal"></label><label>Tertagih<input value="3,00" readonly></label><label>Harga<input value="Rp7.000" readonly></label><strong>${rupiah(21000)}</strong></div>
            <div class="order-item"><label>Layanan<select><option>Bedcover · SATUAN</option></select></label><label>Jumlah<input value="2" inputmode="numeric"></label><label>Tertagih<input value="2" readonly></label><label>Harga<input value="Rp15.000" readonly></label><strong>${rupiah(30000)}</strong></div>
          </div><p class="field-hint">Berat maksimum 2 desimal; jumlah satuan integer. Harga efektif memakai override outlet bila ada.</p></section>
          <section class="form-section"><h2>Express, diskon, dan ETA</h2><div class="form-grid"><label><span><input type="checkbox" checked style="width:auto;min-height:auto"> Express seluruh order</span><span class="field-hint">Semua item eligible · surcharge 25% per item</span></label><label>ETA<input value="8 Agustus 2026, 17.00"></label><label class="full">Catatan<textarea placeholder="Opsional">Pisahkan pakaian putih</textarea></label></div><div class="inline-actions" style="margin-top:12px">${button("Atur diskon", { overlay: "discount", mutation: true, disabled: !["Owner", "Admin"].includes(state.persona), reason: "Cashier memerlukan capability order.discount" })}${chip("Diskon 10% · alasan tercatat")}</div></section>
        </div><aside class="summary-panel"><span class="eyebrow">RINGKASAN · OUTLET SUDIRMAN</span><div class="summary-line"><span>Subtotal item</span><strong>${rupiah(51000)}</strong></div><div class="summary-line"><span>Express 25%</span><strong>${rupiah(12750)}</strong></div><div class="summary-line"><span>Gross</span><strong>${rupiah(63750)}</strong></div><div class="summary-line"><span>Diskon 10%</span><strong>−${rupiah(6375)}</strong></div><div class="summary-line total"><span>Total</span><strong>${rupiah(57375)}</strong></div><div class="summary-line"><span>DP</span><strong>${rupiah(10000)}</strong></div><div class="summary-line"><span>Balance</span><strong>${rupiah(47375)}</strong></div><div class="interaction-count"><strong>Pesanan reguler pelanggan lama: 11 interaksi utama</strong><div class="interaction-rail">${Array.from({ length: 11 }, (_, index) => `<span class="step-token">${index + 1}</span>`).join("")}</div></div>${button("Konfirmasi order + DP", { overlay: "payment", primary: true, mutation: true })}<p class="small muted" style="margin:10px 0 0">Order dan payment awal dikonfirmasi atomik.</p></aside><div class="mobile-order-action" aria-label="Aksi utama pesanan mobile">${button("Konfirmasi order + DP", { overlay: "payment", primary: true, mutation: true })}</div></div>`;

      case "order-detail":
        if (state.persona === "Operator") {
          return `<div class="split-layout"><section class="panel"><div class="section-heading"><div><span class="eyebrow">KODE PESANAN</span><h2>SDR-260807-0042</h2></div><div class="chip-row">${chip("READY", "success")}${chip("⚡ EXPRESS")}</div></div><div class="two-col"><div><span class="eyebrow">OUTLET</span><strong>Outlet Sudirman</strong></div><div><span class="eyebrow">ETA</span><strong>8 Agu 2026 · 17.00 WIB</strong></div></div><p class="small muted" style="margin-top:14px">Data minimum produksi; identitas pelanggan dan seluruh informasi keuangan tidak dimuat.</p></section><section class="panel"><span class="eyebrow">RINGKASAN LAYANAN</span><h2>Pekerjaan</h2><div class="list-row"><strong>Cuci Kering</strong><span>2,35 kg · tertagih 3 kg</span></div><div class="list-row"><strong>Bedcover</strong><span>2 satuan</span></div><div class="list-row"><strong>Catatan produksi</strong><span>Pisahkan pakaian putih</span></div></section></div><section class="section panel"><h2>Histori status</h2>${[["READY", "7 Agu · 15.05"], ["IRONING", "7 Agu · 14.10"], ["DRYING", "7 Agu · 12.30"], ["RECEIVED", "7 Agu · 09.14"]].map(([status, time]) => `<div class="list-row"><strong>${status}</strong><span class="small muted">${time}</span></div>`).join("")}</section>`;
        }
        {
          const handoffStep = isHandoffScenario() ? state.scenarioStep : 0;
          const orderState = isHandoffScenario() && handoffStep >= 2 ? "COMPLETED" : "READY";
          const paymentState = isHandoffScenario() && handoffStep >= 1 ? "PAID" : "PARTIAL";
          const paid = paymentState === "PAID" ? 57375 : 10000;
          const balance = 57375 - paid;
          const contextualAction = orderState === "COMPLETED" ? button("Lihat nota final", { navigate: "/app/[tenantSlug]/orders/[orderId]/receipt" }) : paymentState === "PAID" ? button("Serahkan pesanan", { overlay: "handoff-order", primary: true, mutation: true }) : button("Lunasi", { overlay: "payment", primary: true, mutation: true });
          return `<div class="split-layout"><div class="stack"><section class="panel"><div class="section-heading"><div><span class="eyebrow">SDR-260807-0042</span><h2>Budi Santoso</h2></div><div class="chip-row">${chip(orderState, orderState === "COMPLETED" ? "success" : "")}${chip(paymentState, paymentState === "PAID" ? "success" : "warning")}${chip("EXPRESS · ikon ⚡")}</div></div><div class="two-col"><div><span class="eyebrow">OUTLET ASAL</span><strong>Outlet Sudirman</strong></div><div><span class="eyebrow">ETA</span><strong>8 Agu 2026 · 17.00 WIB</strong></div></div></section><section class="panel"><h2>Item snapshot</h2><div class="list-row"><div><strong>Cuci Kering</strong><p>2,35 kg · tertagih 3 kg · ${rupiah(7000)}/kg</p></div><strong>${rupiah(26250)}</strong></div><div class="list-row"><div><strong>Bedcover</strong><p>2 satuan · ${rupiah(15000)}/satuan</p></div><strong>${rupiah(37500)}</strong></div></section><section class="panel"><h2>Histori</h2>${orderState === "COMPLETED" ? `<div class="list-row"><strong>COMPLETED</strong><span class="small muted">Kasir Ayu · 7 Agu, 16.02 · diserahkan</span></div>` : ""}${[["READY", "Operator Dimas · 7 Agu, 15.05"], ["IRONING", "Operator Dimas · 7 Agu, 14.10"], ["DRYING", "Operator Rani · 7 Agu, 12.30"], ["RECEIVED", "Kasir Ayu · 7 Agu, 09.14"]].map(([status, meta]) => `<div class="list-row"><strong>${status}</strong><span class="small muted">${meta}</span></div>`).join("")}</section></div><aside class="summary-panel"><span class="eyebrow">PAYMENT TERPISAH DARI ORDER</span><div class="summary-line"><span>Total</span><strong>${rupiah(57375)}</strong></div><div class="summary-line"><span>Dibayar</span><strong>${rupiah(paid)}</strong></div><div class="summary-line total"><span>Balance</span><strong>${rupiah(balance)}</strong></div>${contextualAction}<div style="height:8px"></div>${button("Lihat nota", { navigate: "/app/[tenantSlug]/orders/[orderId]/receipt" })}<div class="inline-actions" style="margin-top:12px">${["Owner", "Admin"].includes(state.persona) ? `${button("Void", { overlay: "void-payment", mutation: true })}${button("Reversal", { overlay: "reverse-payment", mutation: true })}${button("Refund", { overlay: "refund-payment", mutation: true })}` : ""}</div><p class="small muted" style="margin:10px 0 0">Handoff default memerlukan PAID. Serah-terima berpiutang memerlukan capability dan alasan.</p></aside></div>`;
        }

      case "order-edit":
        return `<div class="banner"><span class="banner-symbol">i</span><div><strong>Payment sudah tercatat</strong><p>Item, quantity, express, dan diskon terkunci. Hanya ETA/catatan bebas; koreksi finansial membutuhkan transaction atomik.</p></div></div><section class="form-section"><h2>Field yang masih legal</h2><div class="form-grid"><label>Customer<input value="Budi Santoso" disabled></label><label>Status<input value="READY" disabled></label><label>ETA<input value="8 Agustus 2026, 18.00"></label><label class="full">Catatan<textarea>Perubahan jadwal atas permintaan pelanggan.</textarea></label></div><div class="two-col section"><div class="panel"><span class="eyebrow">TOTAL LAMA</span><strong>${rupiah(57375)}</strong></div><div class="panel"><span class="eyebrow">TOTAL BARU</span><strong>${rupiah(57375)}</strong></div></div></section>`;

      case "receipt":
        return `<div class="receipt-actions">${button("Cetak 58 mm", { overlay: "print-receipt", primary: true })}${button("Cetak 80 mm", { overlay: "print-receipt" })}${button("Bagikan / download")}</div><article class="receipt"><div class="receipt-header"><strong>LAUNDRY BERSIH JAYA</strong><p>Outlet Sudirman<br>SDR-260807-0042</p></div><div class="summary-line"><span>Pelanggan</span><span>Budi Santoso</span></div><div class="summary-line"><span>Cuci Kering</span><span>3 kg × ${rupiah(7000)}</span></div><div class="summary-line"><span>Bedcover</span><span>2 × ${rupiah(15000)}</span></div><div class="summary-line"><span>Express</span><span>${rupiah(12750)}</span></div><div class="summary-line"><span>Diskon</span><span>−${rupiah(6375)}</span></div><div class="summary-line total"><span>TOTAL</span><span>${rupiah(57375)}</span></div><div class="summary-line"><span>Dibayar</span><span>${rupiah(10000)}</span></div><div class="summary-line"><span>Balance</span><span>${rupiah(47375)}</span></div><div class="summary-line"><span>Order</span><span>READY</span></div><div class="summary-line"><span>Payment</span><span>PARTIAL</span></div><p style="text-align:center;margin:16px 0 0">ETA 8 Agu 2026 · 17.00 WIB<br>Terima kasih</p></article>`;

      case "production":
        return `<div class="filter-row"><select class="field"><option>Hari ini</option></select><select class="field"><option>Semua status aktif</option>${ORDER_STATES.map(status => `<option>${status}</option>`).join("")}</select><select class="field"><option>Semua prioritas</option><option>Express</option><option>Terlambat</option></select></div><div class="kanban">${ORDER_STATES.slice(0, 5).map((status, index) => `<section class="kanban-lane"><h3>${status}<span>${[5,4,3,6,7][index]}</span></h3>${index < 3 ? `<article class="kanban-card"><strong>SDR-260807-00${42-index}</strong><p>${state.persona === "Operator" ? ["Cuci Kering + 1 item", "Cuci Setrika", "Bedcover × 2"][index] : ["Budi Santoso", "Siti Aminah", "Rina Putri"][index]}</p><div class="list-meta">${index === 1 ? chip("⚑ TERLAMBAT", "warning") : chip("⚡ EXPRESS")}</div><div style="margin-top:9px">${button(index === 0 ? "Mulai cuci" : "Status berikutnya", { primary: true, mutation: true })}</div></article>` : ""}</section>`).join("")}</div><p class="small muted">Mobile memakai list dan tombol; drag-and-drop tidak menjadi syarat interaksi. COMPLETED dan CANCELED tersedia melalui filter histori.${state.persona === "Operator" ? " Data customer dan keuangan tidak dimuat." : ""}</p>`;

      case "customers":
        return `<div class="filter-row"><input class="field search" placeholder="Cari nama atau nomor HP Indonesia"><select class="field"><option>Aktif</option><option>Archived</option></select></div><div class="stack">${[["Budi Santoso", "+62 812-3456-7890", "8 order terlihat"], ["Siti Aminah", "+62 811-2200-4455", "3 order terlihat"], ["Rina Putri", "HP belum diisi", "1 order terlihat"]].map(([name, phone, summary]) => `<div class="list-row"><div><a class="table-action" href="#/app/[tenantSlug]/customers/[customerId]">${name}</a><p>${phone}</p><div class="list-meta">${chip("Tenant-wide")}${chip(summary)}</div></div><span>→</span></div>`).join("")}</div>`;

      case "customer-detail":
        return `<div class="split-layout"><section class="panel"><span class="eyebrow">PROFIL TENANT-WIDE</span><h2>Budi Santoso</h2><div class="list-row"><strong>Nomor HP</strong><span>+62 812-3456-7890</span></div><div class="list-row"><strong>Status</strong>${chip("ACTIVE", "success")}</div><div class="list-row"><strong>Catatan</strong><span>Pelanggan reguler</span></div></section><section class="panel"><span class="eyebrow">RINGKASAN OUTLET YANG DAPAT DIAKSES</span><div class="summary-line"><span>Jumlah order</span><strong>8</strong></div><div class="summary-line"><span>Nilai pesanan</span><strong>${rupiah(482000)}</strong></div><div class="summary-line"><span>Piutang</span><strong>${rupiah(47375)}</strong></div></section></div><section class="section"><div class="section-heading"><h2>Histori pesanan</h2><p>Outlet di luar assignment tidak dimuat.</p></div>${ordersTable()}</section>`;

      case "payments":
        return `<div class="filter-row"><input class="field" type="date" value="2026-08-07"><select class="field"><option>Semua metode</option><option>CASH</option><option>TRANSFER</option><option>QRIS_MANUAL</option><option>OTHER</option></select><select class="field"><option>Semua status</option>${PAYMENT_STATES.map(status => `<option>${status}</option>`).join("")}</select><select class="field"><option>Semua payment + piutang</option><option>Piutang saja</option></select></div><div class="data-table-wrap" data-mobile="cards"><table><thead><tr><th>Kode order</th><th>Waktu</th><th>Metode</th><th>Nominal</th><th>Aktor</th><th>Payment state</th></tr></thead><tbody>${[["SDR-260807-0042", "09.14", "TRANSFER", rupiah(10000), "Ayu", "PARTIAL"], ["SDR-260807-0041", "08.45", "CASH", rupiah(42000), "Ayu", "PAID"], ["SDR-260806-0088", "Kemarin", "QRIS_MANUAL", rupiah(65000), "Nina", "REFUNDED"]].map(row => `<tr>${row.map((value, index) => `<td data-label="${["Kode", "Waktu", "Metode", "Nominal", "Aktor", "Payment state"][index]}">${index === 0 ? `<a class="table-action" href="#/app/[tenantSlug]/orders/[orderId]">${value}</a>` : value}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="small muted">Payment asal immutable. Void, reversal, dan refund membuat record/reference audit; mutasi dimulai dari detail order.</p>`;

      case "cash":
        if (isCashScenario() && state.scenarioStep === 0) {
          return `<section class="state-panel"><div><div class="state-symbol">○</div><h2>Belum ada sesi kas aktif</h2><p>Kasir Ayu · Outlet Sudirman · Shift pagi. Isi opening float untuk mulai menerima CASH.</p>${button("Buka sesi kas", { overlay: "cash-open", primary: true, mutation: true })}</div></section>`;
        }
        if (isCashScenario() && state.scenarioStep >= 2) {
          return `<div class="split-layout"><section class="panel"><div class="section-heading"><div><span class="eyebrow">SESI · SHIFT PAGI</span><h2>Kasir Ayu · Outlet Sudirman</h2></div>${chip("CLOSED", "success")}</div><div class="summary-line"><span>Opening float</span><strong>${rupiah(500000)}</strong></div><div class="summary-line"><span>Expected cash</span><strong>${rupiah(875000)}</strong></div><div class="summary-line"><span>Physical cash</span><strong>${rupiah(875000)}</strong></div><div class="summary-line total"><span>Variance</span><strong>${rupiah(0)}</strong></div></section><section class="panel"><span class="eyebrow">AUDIT</span><h2>Penutupan tersimpan</h2><div class="list-row"><strong>Aktor</strong><span>Ayu Lestari</span></div><div class="list-row"><strong>Waktu</strong><span>7 Agu 2026 · 17.02 WIB</span></div><div class="list-row"><strong>Review flag</strong><span>Tidak diperlukan</span></div></section></div>`;
        }
        return `<div class="split-layout"><section class="panel"><div class="section-heading"><div><span class="eyebrow">SESI AKTIF · SHIFT PAGI</span><h2>Kasir Ayu · Outlet Sudirman</h2></div>${chip("OPEN")}</div>${[["Opening float", 500000], ["Cash payment valid", 350000], ["Cash in", 50000], ["Cash out", -25000], ["Cash refund", 0], ["Adjustment", 0]].map(([label, value]) => `<div class="summary-line"><span>${label}</span><strong>${value < 0 ? "−" : ""}${rupiah(Math.abs(value))}</strong></div>`).join("")}<div class="summary-line total"><span>Expected cash</span><strong>${rupiah(875000)}</strong></div></section><section class="panel"><span class="eyebrow">REKONSILIASI</span><h2>Tutup sesi</h2><label>Kas fisik<input value="Rp875.000" inputmode="numeric"></label><div class="summary-line"><span>Variance</span><strong>${rupiah(0)}</strong></div><p class="small muted">Variance nonnol wajib alasan dan flag review, tetapi tidak menunggu approval.</p>${button("Tutup sesi aktif", { overlay: "cash-close", primary: true, mutation: true, closeAllowed: true })}</section></div><section class="section panel"><h2>Formula kas</h2><code>opening + valid cash payment + cash in − cash out − cash refund ± adjustment</code><p class="small muted" style="margin:8px 0 0">TRANSFER dan QRIS_MANUAL tidak masuk kas fisik.</p></section>`;

      case "reports":
        if (state.persona === "Cashier") {
          return `<div class="banner"><span class="banner-symbol">i</span><div><strong>Ringkasan shift/kas · Outlet Sudirman</strong><p>Cashier tidak memperoleh laporan lengkap atau agregasi lintas outlet.</p></div></div><div class="metric-grid"><div class="metric"><span class="eyebrow">OPENING FLOAT</span><strong>${rupiah(500000)}</strong><small>Shift pagi</small></div><div class="metric"><span class="eyebrow">CASH PAYMENT</span><strong>${rupiah(350000)}</strong><small>Payment cash valid</small></div><div class="metric"><span class="eyebrow">EXPECTED CASH</span><strong>${rupiah(875000)}</strong><small>Setelah movement</small></div><div class="metric"><span class="eyebrow">TRANSAKSI CASH</span><strong>12</strong><small>Outlet aktif</small></div><div class="metric"><span class="eyebrow">VARIANCE</span><strong>${rupiah(0)}</strong><small>Belum ditutup</small></div><div class="metric"><span class="eyebrow">SESI</span><strong>OPEN</strong><small>Kasir Ayu · Shift pagi</small></div></div><section class="section panel"><h2>Rekonsiliasi shift</h2><div class="summary-line"><span>Opening</span><strong>${rupiah(500000)}</strong></div><div class="summary-line"><span>+ Cash payment valid</span><strong>${rupiah(350000)}</strong></div><div class="summary-line"><span>+ Cash in</span><strong>${rupiah(50000)}</strong></div><div class="summary-line"><span>− Cash out</span><strong>${rupiah(25000)}</strong></div><div class="summary-line total"><span>Expected</span><strong>${rupiah(875000)}</strong></div></section>`;
        }
        return `${metrics()}<div class="two-col section"><section><div class="section-heading"><h2>Nilai pesanan per hari</h2><p>Ringkasan teks tersedia</p></div><div class="chart-placeholder">${[42,68,54,86,63,92,74].map(height => `<div class="bar" style="height:${height}%"></div>`).join("")}</div><div class="chart-caption"><span>1 Agu</span><span>7 Agu</span></div></section><section class="panel"><h2>Ringkasan ekuivalen</h2><div class="summary-line"><span>Periode tertinggi</span><strong>6 Agu</strong></div><div class="summary-line"><span>Nilai</span><strong>${rupiah(640000)}</strong></div><div class="summary-line"><span>Rata-rata order</span><strong>${rupiah(59167)}</strong></div><div class="summary-line"><span>Terlambat</span><strong>2 order</strong></div></section></div><section class="section"><div class="section-heading"><h2>Transaksi sumber</h2><p>Setelah void, reversal, refund, dan cancel.</p></div>${ordersTable()}</section>`;

      case "settings-business":
        return `<section class="form-section"><h2>Identitas tenant</h2><div class="form-grid"><label>Nama bisnis<input value="Laundry Bersih Jaya"${state.persona === "Admin" ? " disabled" : ""}></label><label>Kontak<input value="+62 21 555-0199"${state.persona === "Admin" ? " disabled" : ""}></label><label>Timezone<select${state.persona === "Admin" ? " disabled" : ""}><option>Asia/Jakarta (WIB)</option></select></label><label>Slug<input value="laundry-bersih-jaya" readonly></label></div>${state.persona === "Admin" ? `<p class="small muted">Admin default dapat membaca; edit memerlukan toggle business.settings_edit.</p>` : ""}</section>`;

      case "settings-outlets":
        return `<div class="banner"><span class="banner-symbol">2</span><div><strong>2 dari 5 outlet terpakai</strong><p>Entitlement Multi-Outlet · pembuatan diblokir ketika mencapai limit.</p></div></div><div class="two-col"><section class="panel"><span class="eyebrow">SDR · ACTIVE</span><h2>Outlet Sudirman</h2><p>12 pegawai · 18 order aktif</p>${button("Edit outlet", { overlay: "outlet-form", mutation: true })}</section><section class="panel"><span class="eyebrow">KMG · ACTIVE</span><h2>Outlet Kemang</h2><p>8 pegawai · 11 order aktif</p>${button("Edit outlet", { overlay: "outlet-form", mutation: true })}</section></div><p class="small muted">Outlet dengan order non-final tidak dapat dinonaktifkan; histori outlet inactive tetap tersedia.</p>`;

      case "settings-services":
        return `<div class="data-table-wrap" data-mobile="cards"><table><thead><tr><th>Layanan</th><th>Unit</th><th>Harga tenant</th><th>Outlet Sudirman</th><th>Minimum</th><th>Express</th><th>Status</th></tr></thead><tbody><tr><td data-label="Layanan"><strong>Cuci Kering</strong></td><td data-label="Unit">KILOGRAM</td><td data-label="Harga tenant">${rupiah(7000)}</td><td data-label="Outlet">Warisan · ${rupiah(7000)}</td><td data-label="Minimum">3 kg</td><td data-label="Express">25% · eligible</td><td data-label="Status">ACTIVE</td></tr><tr><td data-label="Layanan"><strong>Bedcover</strong></td><td data-label="Unit">SATUAN</td><td data-label="Harga tenant">${rupiah(15000)}</td><td data-label="Outlet">Override · ${rupiah(17000)}</td><td data-label="Minimum">1</td><td data-label="Express">25% · eligible</td><td data-label="Status">ACTIVE</td></tr></tbody></table></div><p class="small muted">Menghapus override mengembalikan harga ke default tenant. Order lama memakai snapshot.</p>`;

      case "settings-staff":
        return `<div class="banner"><span class="banner-symbol">20</span><div><strong>20 dari 50 pegawai</strong><p>Membership inactive tetap pada histori dan tidak dihitung sebagai akses aktif.</p></div></div><div class="stack">${[["Hana Pratama", "Owner", "Semua outlet", "ACTIVE"], ["Ayu Lestari", "Cashier", "Outlet Sudirman", "ACTIVE"], ["dimas@contoh.id", "Operator", "Outlet Kemang", "PENDING"], ["nina@contoh.id", "Admin", "Outlet Sudirman", "EXPIRED"]].map(([name, roleName, outlets, memberState]) => `<div class="list-row"><div><strong>${name}</strong><div class="list-meta">${chip(roleName)}${chip(outlets)}${chip(memberState, memberState === "ACTIVE" ? "success" : "warning")}</div></div>${button(memberState === "EXPIRED" ? "Kirim ulang" : "Kelola", { overlay: "invite-staff", mutation: true })}</div>`).join("")}</div>`;

      case "settings-roles":
        return `<div class="data-table-wrap"><table><thead><tr><th>Capability</th><th>Owner</th><th>Admin</th><th>Cashier</th><th>Operator</th></tr></thead><tbody>${[["order.discount", "Ya", "Ya", "Opsional", "Tidak"], ["order.cancel", "Ya", "Ya", "Opsional", "Tidak"], ["order.status_skip", "Ya", "Ya", "Opsional", "Tidak"], ["order.status_rollback", "Ya", "Ya", "Opsional", "Tidak"], ["order.handoff_with_balance", "Ya", "Ya", "Opsional", "Tidak"], ["payment.void_reversal", "Ya", "Ya", "Opsional", "Tidak"], ["payment.refund", "Ya", "Ya", "Opsional", "Tidak"], ["billing.manage", "Ya", "Opsional", "Tidak", "Tidak"]].map(row => `<tr>${row.map((value, index) => `<td>${index === 0 ? `<code>${value}</code>` : value}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="small muted">Preset role tetap. Hanya toggle sensitif yang eksplisit dapat diubah; tidak ada custom-role builder.</p>`;

      case "billing":
        return `${state.subscription === "SUSPENDED" || state.subscription === "CANCELED" ? `<div class="banner"><span class="banner-symbol">!</span><div><strong>Recovery tetap tersedia</strong><p>Data operasional read-only; billing dapat memulai checkout/reactivation.</p></div></div>` : ""}<div class="split-layout"><section class="panel"><span class="eyebrow">SUBSCRIPTION SAAT INI</span><div class="section-heading"><h2>Growth</h2>${chip(state.subscription, ["ACTIVE", "TRIALING"].includes(state.subscription) ? "success" : "warning")}</div><div class="summary-line"><span>Harga</span><strong>${rupiah(299000)}/bulan</strong></div><div class="summary-line"><span>Periode</span><strong>1–31 Agu 2026</strong></div><div class="summary-line"><span>Order</span><strong>1.286 / 2.000</strong></div><div class="summary-line"><span>Pegawai</span><strong>12 / 15</strong></div><div class="summary-line"><span>Outlet</span><strong>1 / 1</strong></div><p class="small muted">Upgrade aktif hanya setelah webhook subscription terverifikasi. Redirect browser tidak mengaktifkan paket.</p></section><section><div class="section-heading"><h2>Paket tersedia</h2><p>Plan version</p></div>${pricingCards()}</section></div>`;

      default:
        return `<section class="state-panel"><div><div class="state-symbol">□</div><h2>Layout route tersedia</h2><p>${escapeHtml(item.info)}</p></div></section>`;
    }
  }

  function adminContent(item) {
    switch (item.kind) {
      case "admin-dashboard":
        return `<div class="metric-grid"><div class="metric"><span class="eyebrow">TENANT AKTIF</span><strong>36</strong><small>Tanpa data operasional</small></div><div class="metric"><span class="eyebrow">TRIALING</span><strong>8</strong><small>Metadata subscription</small></div><div class="metric"><span class="eyebrow">PAST_DUE</span><strong>3</strong><small>Perlu perhatian</small></div><div class="metric"><span class="eyebrow">SUSPENDED</span><strong>2</strong><small>Manual + otomatis</small></div><div class="metric"><span class="eyebrow">EVENT GAGAL</span><strong>1</strong><small>Webhook billing</small></div><div class="metric"><span class="eyebrow">PLAN VERSION</span><strong>3</strong><small>Starter/Growth/Multi-Outlet</small></div></div>`;
      case "admin-tenants":
        return `<div class="filter-row"><input class="field search" placeholder="Cari nama, slug, atau metadata tenant"><select class="field"><option>Semua subscription</option><option>TRIALING</option><option>ACTIVE</option><option>PAST_DUE</option><option>SUSPENDED</option><option>CANCELED</option></select></div><div class="data-table-wrap" data-mobile="cards"><table><thead><tr><th>Tenant</th><th>Plan</th><th>Subscription</th><th>Usage order</th><th>Outlet</th></tr></thead><tbody>${[["Laundry Bersih Jaya", "Growth v1", "ACTIVE", "1.286 / 2.000", "1 / 1"], ["Laundry Melati", "Starter v1", "SUSPENDED", "488 / 500", "1 / 1"], ["Cuci Kilat", "Multi-Outlet v1", "TRIALING", "320 / 10.000", "3 / 5"]].map(row => `<tr>${row.map((value, index) => `<td data-label="${["Tenant", "Plan", "State", "Order", "Outlet"][index]}">${index === 0 ? `<a class="table-action" href="#/admin/tenants/[tenantId]">${value}</a>` : value}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="small muted">Daftar hanya memuat metadata, subscription, dan entitlement usage—tanpa pelanggan, order, payment, atau kas.</p>`;
      case "admin-tenant-detail":
        return `<div class="banner"><span class="banner-symbol">!</span><div><strong>Batas data Super Admin</strong><p>Tidak ada impersonation dan tidak ada akses ke customer, order, payment, atau kas tenant.</p></div></div><div class="split-layout"><section class="panel"><span class="eyebrow">METADATA TENANT</span><h2>Laundry Bersih Jaya</h2>${[["Slug", "laundry-bersih-jaya"], ["Dibuat", "7 Juli 2026"], ["Timezone", "Asia/Jakarta"], ["Plan version", "Growth v1"], ["Subscription", state.subscription], ["Usage order", "1.286 / 2.000"]].map(([label, value]) => `<div class="list-row"><strong>${label}</strong><span>${value}</span></div>`).join("")}</section><section class="panel"><span class="eyebrow">SUPPORT ACTION</span><h2>Tindakan teraudit</h2>${button("Tambah hari", { primary: true, mutation: true })}<div style="height:8px"></div>${button("Suspend tenant", { overlay: "suspend-tenant", mutation: true })}<div style="height:8px"></div>${button("Reactivate tenant", { overlay: "reactivate-tenant", mutation: true })}<p class="small muted" style="margin-top:12px">Alasan, before/after, timestamp, aktor, dan correlation ID wajib.</p></section></div>`;
      case "admin-plans":
        return `<div class="data-table-wrap" data-mobile="cards"><table><thead><tr><th>Plan version</th><th>Harga</th><th>Outlet</th><th>Pegawai</th><th>Order</th><th>Status</th></tr></thead><tbody>${[["Starter v1", rupiah(149000), "1", "5", "500", "ACTIVE"], ["Growth v1", rupiah(299000), "1", "15", "2.000", "ACTIVE"], ["Multi-Outlet v1", rupiah(599000), "5", "50", "10.000", "ACTIVE"]].map(row => `<tr>${row.map((value, index) => `<td data-label="${["Plan", "Harga", "Outlet", "Pegawai", "Order", "Status"][index]}">${value}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="small muted">Plan terpakai tidak dihapus. Perubahan membuat version baru atau archive dengan audit.</p>`;
      case "admin-subscriptions":
        return `<div class="filter-row"><select class="field"><option>Semua state</option><option>TRIALING</option><option>ACTIVE</option><option>PAST_DUE</option><option>SUSPENDED</option><option>CANCELED</option></select><select class="field"><option>Semua event</option><option>Payment verified</option><option>Webhook failed</option><option>Manual suspend</option></select></div><div class="stack">${[["Laundry Bersih Jaya", "ACTIVE", "Growth v1", "Webhook verified · 07.15"], ["Laundry Melati", "SUSPENDED", "Starter v1", "Manual suspend · 6 Agu"], ["Cuci Kilat", "TRIALING", "Multi-Outlet v1", "9 hari tersisa"]].map(([tenant, status, plan, event]) => `<div class="list-row"><div><a class="table-action" href="#/admin/tenants/[tenantId]">${tenant}</a><div class="list-meta">${chip(status)}${chip(plan)}</div><p>${event}</p></div><span>→</span></div>`).join("")}</div>`;
      case "admin-audit":
        return `<div class="filter-row"><input class="field" type="date" value="2026-08-07"><select class="field"><option>Semua action Platform</option><option>tenant.suspend</option><option>tenant.reactivate</option><option>plan.archive</option></select></div><div class="data-table-wrap" data-mobile="cards"><table><thead><tr><th>Waktu</th><th>Aktor</th><th>Action</th><th>Target</th><th>Alasan</th><th>Correlation ID</th></tr></thead><tbody><tr><td data-label="Waktu">07 Agu 10.22 WIB</td><td data-label="Aktor">admin@platform.example</td><td data-label="Action">tenant.suspend</td><td data-label="Target">Laundry Melati</td><td data-label="Alasan">Verifikasi dukungan pilot</td><td data-label="Correlation">adm_260807_a18</td></tr><tr><td data-label="Waktu">06 Agu 16.04 WIB</td><td data-label="Aktor">ops@platform.example</td><td data-label="Action">plan.archive</td><td data-label="Target">Starter v0</td><td data-label="Alasan">Diganti Starter v1</td><td data-label="Correlation">adm_260806_b07</td></tr></tbody></table></div>`;
      default:
        return `<section class="state-panel"><div><div class="state-symbol">□</div><h2>Area Platform</h2><p>Metadata dan audit saja; tidak ada data operasional tenant.</p></div></section>`;
    }
  }

  function overlayBody(kind) {
    const bodies = {
      customer: `<div class="overlay-grid"><label>Nama pelanggan *<input value="Dewi Lestari" required></label><label>Nomor HP opsional<div class="field-prefix"><span>+62</span><input value="812 9900 1122" inputmode="tel"></div></label><label class="full">Catatan<textarea placeholder="Opsional"></textarea></label></div><div class="danger-note"><strong>! Kemungkinan duplikat</strong><p class="small" style="margin:4px 0 0">Nomor serupa ditemukan atas nama Dewi L. Pilih record lama atau lanjut membuat pelanggan baru; warning tidak memblokir.</p></div><p class="small muted">Setelah disimpan, pelanggan dipilih pada draft tanpa menghapus item order.</p>`,
      outlet: `<div class="overlay-grid"><label>Nama outlet *<input value="Outlet Kemang" required></label><label>Kode 2–4 karakter<input value="KMG" maxlength="4"></label><label class="full">Alamat opsional<textarea>Jl. Kemang Raya No. 21, Jakarta</textarea></label><label>Status<select><option>ACTIVE</option><option>INACTIVE</option></select></label><label>Harga layanan<select><option>Warisi default tenant</option></select></label></div><p class="small muted">2 dari 5 outlet terpakai. Outlet dengan order non-final tidak dapat dinonaktifkan.</p>`,
      service: `<div class="overlay-grid"><label>Nama layanan *<input value="Cuci Kering"></label><label>Unit<select><option>KILOGRAM</option><option>SATUAN</option></select></label><label>Harga default tenant<input value="7000" inputmode="numeric"></label><label>Minimum charge<input value="3" inputmode="decimal"></label><label>Durasi reguler<input value="2 hari"></label><label><span><input type="checkbox" checked style="width:auto;min-height:auto"> Express eligible</span></label><label>Surcharge express (%)<input value="25" inputmode="numeric"></label><label>Durasi express<input value="1 hari"></label></div><p class="small muted">Harga berubah hanya untuk order baru; snapshot order lama tidak berubah. Override outlet dapat dihapus untuk kembali ke default.</p>`,
      invite: `<div class="overlay-grid"><label class="full">Email tujuan<input type="email" value="dimas@contoh.id"></label><label>Role preset<select><option>Operator</option><option>Cashier</option><option>Admin</option></select></label><label>Outlet assignment<select><option>Outlet Sudirman</option><option>Outlet Kemang</option></select></label></div><p class="small muted">Invitation berstatus PENDING selama 72 jam. Resend cooldown 60 detik; token lama tetap invalid setelah resend/revoke.</p>`,
      capability: `<p class="danger-note"><strong>Preset role tetap</strong><br><span class="small">Hanya toggle sensitif terbatas. Pengguna tidak dapat memberi capability yang tidak dimilikinya.</span></p><div class="stack">${["order.discount", "order.cancel", "order.status_skip", "order.status_rollback", "order.handoff_with_balance", "payment.void_reversal", "payment.refund"].map((capability, index) => `<label class="list-row"><code>${capability}</code><input type="checkbox"${index < 2 ? " checked" : ""} style="width:auto;min-height:auto"></label>`).join("")}</div>`,
      discount: `<div class="overlay-grid"><label>Jenis diskon<select><option>Persen</option><option>Nominal</option></select></label><label>Nilai<input value="10" inputmode="decimal"></label><label class="full">Alasan wajib<textarea required>Promo pembukaan outlet</textarea></label></div><div class="summary-line"><span>Gross</span><strong>${rupiah(63750)}</strong></div><div class="summary-line"><span>Diskon 10%</span><strong>−${rupiah(6375)}</strong></div><div class="summary-line total"><span>Total</span><strong>${rupiah(57375)}</strong></div><p class="small muted">Maksimum 20% gross; tidak dapat ditumpuk. Nilai di atas limit ditolak tanpa approval flow.</p>`,
      payment: `<div class="overlay-grid"><label>Metode<select id="paymentMethod"><option>CASH</option><option>TRANSFER</option><option>QRIS_MANUAL</option><option>OTHER</option></select></label><label>Applied amount<input value="10000" inputmode="numeric"></label><label>Uang diterima (CASH)<input value="20000" inputmode="numeric"></label><label>Kembalian<input value="10000" readonly></label><label class="full">Reference transfer/QRIS opsional<input placeholder="Tidak wajib"></label></div><div class="summary-line"><span>Balance sebelum</span><strong>${rupiah(57375)}</strong></div><div class="summary-line"><span>Applied</span><strong>${rupiah(10000)}</strong></div><div class="summary-line total"><span>Balance sesudah</span><strong>${rupiah(47375)}</strong></div><p class="small muted">Payment immutable. Cash memerlukan sesi aktif; OTHER memerlukan label metode.</p>`,
      receipt: `<div class="overlay-grid"><label>Lebar thermal<select><option>58 mm</option><option>80 mm</option></select></label><label>Salinan<select><option>1</option><option>2</option></select></label></div><div class="danger-note"><strong>Nota terbaru</strong><p class="small" style="margin:4px 0 0">SDR-260807-0042 · READY · PARTIAL · balance ${rupiah(47375)}. Tidak ada UUID, tenant ID, atau public receipt link.</p></div><p class="small muted">Prototype hanya mensimulasikan dialog; output production menggunakan browser print.</p>`,
      edit: `<p class="danger-note"><strong>State menentukan field</strong><br><span class="small">RECEIVED tanpa payment: edit penuh. Setelah payment/proses: hanya ETA dan catatan tanpa correction transaction.</span></p><div class="overlay-grid"><label>ETA<input value="8 Agustus 2026, 18.00"></label><label class="full">Catatan<textarea>Perubahan jadwal atas permintaan pelanggan.</textarea></label></div><div class="two-col"><div class="panel"><span class="eyebrow">TOTAL LAMA</span><strong>${rupiah(57375)}</strong></div><div class="panel"><span class="eyebrow">TOTAL BARU</span><strong>${rupiah(57375)}</strong></div></div>`,
      cancel: `<p class="danger-note"><strong>Pesanan tidak dihapus.</strong><br><span class="small">Cancel hanya sebelum status final dan payment terkait harus diselesaikan.</span></p><label>Alasan wajib<textarea required>Pelanggan membatalkan sebelum proses selesai.</textarea></label><div class="summary-line"><span>Status saat ini</span><strong>RECEIVED</strong></div><div class="summary-line"><span>Payment</span><strong>UNPAID</strong></div><div class="summary-line"><span>Hasil</span><strong>CANCELED + audit</strong></div>`,
      handoff: `<p class="danger-note"><strong>Order READY dan payment PAID.</strong><br><span class="small">Konfirmasi ini memindahkan status order ke COMPLETED dan menyimpan timestamp, aktor, outlet, serta balance saat handoff.</span></p><div class="summary-line"><span>Order</span><strong>SDR-260807-0042</strong></div><div class="summary-line"><span>Payment state</span><strong>PAID</strong></div><div class="summary-line"><span>Balance</span><strong>${rupiah(0)}</strong></div><label>Nama penerima opsional<input value="Budi Santoso"></label>`,
      rollback: `<p class="danger-note"><strong>Rollback IRONING → DRYING</strong><br><span class="small">Hanya state non-final; alasan dan audit wajib. COMPLETED/CANCELED tidak dapat rollback.</span></p><label>Alasan wajib<textarea required>Kelembapan masih terdeteksi saat quality check.</textarea></label>`,
      void: `<p class="danger-note"><strong>Void sebelum sesi/periode ditutup</strong><br><span class="small">Payment asal tetap ada dan dikeluarkan dari expected cash sesi aktif.</span></p><div class="summary-line"><span>Payment</span><strong>pay_0042 · CASH</strong></div><div class="summary-line"><span>Nominal</span><strong>${rupiah(10000)}</strong></div><label>Alasan wajib<textarea required>Metode pembayaran salah dipilih.</textarea></label>`,
      reversal: `<p class="danger-note"><strong>Reversal setelah sesi/periode ditutup</strong><br><span class="small">Record lawan menonaktifkan nilai payment; payment asal dipertahankan. Hanya cash membuat CashMovement kompensasi pada sesi koreksi.</span></p><div class="summary-line"><span>Payment asal</span><strong>pay_0042 · CASH</strong></div><div class="summary-line"><span>Nominal reversal</span><strong>${rupiah(10000)}</strong></div><label>Alasan wajib<textarea required>Koreksi payment setelah tutup sesi.</textarea></label>`,
      refund: `<p class="danger-note"><strong>Refund penuh per payment</strong><br><span class="small">Dipakai hanya ketika dana benar-benar dikembalikan. Partial refund bebas tidak tersedia.</span></p><div class="summary-line"><span>Payment asal</span><strong>pay_0042</strong></div><div class="summary-line"><span>Refund</span><strong>${rupiah(10000)}</strong></div><label>Alasan wajib<textarea required>Dana dikembalikan kepada pelanggan.</textarea></label>`,
      "cash-open": `<div class="overlay-grid"><label>Outlet<input value="Outlet Sudirman" readonly></label><label>Kasir<input value="Ayu Lestari" readonly></label><label>Shift<select><option>Pagi</option><option>Siang</option></select></label><label>Opening float<input value="500000" inputmode="numeric"></label></div><p class="small muted">Hanya satu sesi OPEN untuk pasangan kasir/outlet/shift.</p>`,
      "cash-close": `<p class="danger-note"><strong>Ringkasan terbaru · versi 10.22 WIB</strong><br><span class="small">Transaksi baru setelah ringkasan memaksa refresh sebelum close.</span></p><div class="summary-line"><span>Expected cash</span><strong>${rupiah(875000)}</strong></div><label>Physical cash<input value="875000" inputmode="numeric"></label><div class="summary-line total"><span>Variance</span><strong>${rupiah(0)}</strong></div><label>Alasan variance<textarea placeholder="Wajib bila variance tidak nol"></textarea></label><p class="small muted">Close sesi yang sudah aktif tetap tersedia dalam tenant read-only.</p>`,
      upgrade: `${pricingCards(false)}<p class="danger-note"><strong>Checkout subscription Platform</strong><br><span class="small">UI kembali dalam status pending. Upgrade hanya aktif setelah webhook provider terverifikasi server-side dan idempotent.</span></p>`,
      archive: `<p class="danger-note"><strong>Plan terpakai tidak dapat dihapus.</strong><br><span class="small">Archive mencegah pemilihan baru dan mempertahankan subscription history.</span></p><div class="summary-line"><span>Plan version</span><strong>Starter v0</strong></div><label>Alasan wajib<textarea required>Diganti oleh Starter v1.</textarea></label>`,
      suspend: `<p class="danger-note"><strong>Tenant menjadi read-only.</strong><br><span class="small">Data tidak dihapus. Manual suspend bertahan sampai reactivation eksplisit dan tidak ditimpa webhook.</span></p><div class="summary-line"><span>Tenant</span><strong>Laundry Bersih Jaya</strong></div><div class="summary-line"><span>Dari</span><strong>ACTIVE</strong></div><div class="summary-line"><span>Ke</span><strong>SUSPENDED</strong></div><label>Alasan wajib<textarea required>Verifikasi dukungan pilot.</textarea></label>`,
      reactivate: `<p class="danger-note"><strong>Hapus manual suspend override.</strong><br><span class="small">Akses mutasi kembali hanya bila subscription/entitlement server valid.</span></p><div class="summary-line"><span>Tenant</span><strong>Laundry Bersih Jaya</strong></div><div class="summary-line"><span>Dari</span><strong>SUSPENDED</strong></div><div class="summary-line"><span>Ke</span><strong>ACTIVE</strong></div><label>Alasan wajib<textarea required>Verifikasi support selesai.</textarea></label>`
    };
    return bodies[kind] || "";
  }

  function showOverlay(id) {
    const config = OVERLAYS[id];
    if (!config) return;
    const item = currentRoute();
    if (!config.roles.includes(state.persona)) {
      showToast(`Akses ditolak: ${state.persona} tidak memiliki capability untuk tindakan ini.`);
      return;
    }
    if (item.shell === "tenant" && isTenantReadOnly() && !config.recovery && !config.closeAllowed) {
      showToast("Tenant read-only menolak mutasi ini. Billing recovery dan close sesi aktif tetap tersedia bila berizin.");
      return;
    }
    const content = el("overlayContent");
    content.innerHTML = `<header class="overlay-header"><div><span class="eyebrow">${escapeHtml(config.type)} · WIREFRAME</span><h2 id="overlayTitle">${escapeHtml(config.title)}</h2></div><button class="icon-button" type="submit" value="cancel" aria-label="Tutup">×</button></header><div class="overlay-body">${overlayBody(config.body)}</div><footer class="overlay-footer"><button class="button button-quiet" type="submit" value="cancel">Batal</button><button class="button button-primary" type="submit" value="confirm">${escapeHtml(config.action)}</button></footer>`;
    content.dataset.overlayId = id;
    el("overlayDialog").showModal();
    window.setTimeout(() => {
      const first = content.querySelector("input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button");
      if (first) first.focus();
    }, 0);
  }

  function showRouteIndex() {
    const content = el("overlayContent");
    content.innerHTML = `<header class="overlay-header"><div><span class="eyebrow">ROUTE MANIFEST</span><h2 id="overlayTitle">41 route kanonis</h2></div><button class="icon-button" type="submit" value="cancel" aria-label="Tutup">×</button></header><div class="overlay-body"><div class="route-index">${ROUTES.map((item, index) => `<a class="route-index-item" href="#${item.path}"><span class="scenario-number">${index + 1}</span><span><strong>${escapeHtml(item.name)}</strong><br><code>${escapeHtml(item.path)}</code></span></a>`).join("")}</div></div><footer class="overlay-footer"><button class="button button-primary" type="submit" value="cancel">Tutup</button></footer>`;
    content.dataset.overlayId = "route-index";
    el("overlayDialog").showModal();
  }

  function renderContext(item, denied) {
    const contexts = {
      public: ["PUBLIC SHELL", "Tanpa tenant"],
      auth: ["AUTH SHELL", "Session simulasi"],
      onboarding: ["ONBOARDING OWNER", "Tenant belum OPERATIONAL"],
      admin: ["SUPER ADMIN SHELL", "Boundary Platform"]
    };
    if (item.shell === "tenant" && denied) {
      el("contextStrip").innerHTML = `<span class="context-chip">Konteks tidak tersedia</span><span class="context-chip">Akses ditolak</span>`;
    } else if (item.shell === "tenant") {
      el("contextStrip").innerHTML = `<span class="context-chip">Laundry Bersih Jaya</span><span class="context-chip">${escapeHtml(state.outlet)}</span><span class="context-chip">Asia/Jakarta</span>`;
    } else {
      el("contextStrip").innerHTML = contexts[item.shell].map(label => `<span class="context-chip">${label}</span>`).join("");
    }
    el("sessionStrip").innerHTML = `${chip(state.persona)}${item.shell === "tenant" && !denied ? chip(state.subscription, ["SUSPENDED", "CANCELED"].includes(state.subscription) ? "blocked" : state.subscription === "PAST_DUE" ? "warning" : "success") : ""}`;
  }

  function routePoolForShell(item) {
    if (item.shell === "tenant") return ROUTES.filter(candidate => candidate.shell === "tenant" && candidate.roles.includes(state.persona));
    if (item.shell === "admin") return ROUTES.filter(candidate => candidate.shell === "admin" && candidate.roles.includes(state.persona));
    if (item.shell === "onboarding") return ROUTES.filter(candidate => candidate.shell === "onboarding" && candidate.roles.includes(state.persona));
    return ROUTES.filter(candidate => ["public", "auth"].includes(candidate.shell) && candidate.roles.includes(state.persona));
  }

  function renderNavigation(item, denied) {
    const navigationItem = denied
      ? state.persona === "Super Admin"
        ? ROUTES.find(candidate => candidate.path === "/admin")
        : TENANT_ROLES.includes(state.persona)
          ? ROUTES.find(candidate => candidate.path === "/app/[tenantSlug]/dashboard")
          : ROUTES.find(candidate => candidate.path === "/")
      : item;
    const pool = routePoolForShell(navigationItem);
    const groups = [...new Set(pool.map(candidate => candidate.group))];
    el("routeNav").innerHTML = groups.map(group => `<section class="nav-group"><div class="nav-group-title">${escapeHtml(group)}</div>${pool.filter(candidate => candidate.group === group).map(candidate => `<a class="nav-link" href="#${candidate.path}"${candidate.path === item.path ? " aria-current=\"page\"" : ""}><span>${escapeHtml(candidate.name)}</span><span>→</span></a>`).join("")}</section>`).join("");

    let mobile;
    if (navigationItem.shell === "tenant") {
      if (state.persona === "Cashier") mobile = [["Dashboard", "/app/[tenantSlug]/dashboard"], ["Pesanan", "/app/[tenantSlug]/orders"], ["Kas", "/app/[tenantSlug]/cash-register"]];
      else if (state.persona === "Operator") mobile = [["Dashboard", "/app/[tenantSlug]/dashboard"], ["Produksi", "/app/[tenantSlug]/production"], ["Pesanan", "/app/[tenantSlug]/orders"]];
      else mobile = [["Dashboard", "/app/[tenantSlug]/dashboard"], ["Pesanan", "/app/[tenantSlug]/orders"], ["Laporan", "/app/[tenantSlug]/reports"]];
    } else if (navigationItem.shell === "admin") mobile = [["Platform", "/admin"], ["Tenant", "/admin/tenants"], ["Subscription", "/admin/subscriptions"]];
    else if (navigationItem.shell === "onboarding") mobile = [["Bisnis", "/onboarding/business"], ["Outlet", "/onboarding/outlet"], ["Layanan", "/onboarding/services"]];
    else mobile = [["Beranda", "/"], ["Fitur", "/features"], ["Harga", "/pricing"]];
    el("mobileNav").innerHTML = `${mobile.map(([label, path]) => `<a href="#${path}"${path === item.path ? " aria-current=\"page\"" : ""}>${label}</a>`).join("")}<button type="button" data-toggle-mobile-nav="true">Menu</button>`;
  }

  function allowsAllOutlets(item) {
    return (state.persona === "Owner" && ["dashboard", "reports"].includes(item.kind)) || (state.persona === "Admin" && item.kind === "reports");
  }

  function syncOutletControl(item, denied) {
    const select = el("outletSelect");
    const allOption = [...select.options].find(option => option.value === "Semua outlet");
    const allowed = !denied && item.shell === "tenant" && allowsAllOutlets(item);
    allOption.disabled = !allowed;
    allOption.hidden = !allowed;
    select.disabled = item.shell !== "tenant" || denied;
    if (!allowed && state.outlet === "Semua outlet") {
      state.outlet = "Outlet Sudirman";
      select.value = state.outlet;
    }
    el("outletHint").textContent = allowed ? "Semua outlet tersedia sebagai agregasi berizin pada layar ini." : item.shell === "tenant" ? "Satu outlet aktif untuk operasi; agregasi tidak tersedia pada layar ini." : "Konteks outlet tidak berlaku pada shell ini.";
  }

  function applyActionGuards(item) {
    const readonly = item.shell === "tenant" && isTenantReadOnly();
    el("screen").querySelectorAll("[data-mutation=true]").forEach(action => {
      const recovery = action.dataset.recovery === "true";
      const closeAllowed = action.dataset.closeAllowed === "true";
      const overlay = action.dataset.overlay ? OVERLAYS[action.dataset.overlay] : null;
      const overlayDenied = overlay && !overlay.roles.includes(state.persona);
      if ((!canMutate(item) || overlayDenied || (readonly && !recovery && !closeAllowed)) && !action.disabled) {
        action.disabled = true;
        action.title = !canMutate(item) || overlayDenied ? "Capability tidak tersedia untuk persona ini" : "Tenant read-only menolak mutasi ini";
      }
    });
  }

  function render() {
    const item = currentRoute();
    const denied = state.screenState === "Permission denied" || !isRouteAllowed(item);
    syncOutletControl(item, denied);
    renderContext(item, denied);
    renderNavigation(item, denied);

    let content;
    if (denied) content = statePanel("Permission denied", item);
    else if (["Loading", "Empty", "Error"].includes(state.screenState)) content = statePanel(state.screenState, item);
    else if (item.shell === "public") content = publicContent(item);
    else if (item.shell === "auth") content = authContent(item);
    else if (item.shell === "onboarding") content = onboardingContent(item);
    else if (item.shell === "tenant") content = tenantContent(item);
    else content = adminContent(item);

    const success = state.screenState === "Success" ? `<div class="banner"><span class="banner-symbol">✓</span><div><strong>Berhasil</strong><p>Feedback sukses simulasi ditampilkan tanpa mengubah fixture atau aturan kanonis.</p></div></div>` : "";
    el("screen").innerHTML = `<div class="screen-inner">${pageHeading(item, denied)}${denied ? "" : subscriptionBanner(item)}${denied ? "" : scenarioBanner()}${denied ? "" : success}${content}${traceability(item)}</div>`;
    applyActionGuards(item);
    document.title = `${item.name} — LaundryKita Wireframe`;
    el("screen").focus({ preventScroll: true });
    el("routeNav").classList.remove("open");

    if (state.pendingOverlay) {
      const pending = state.pendingOverlay;
      state.pendingOverlay = null;
      window.setTimeout(() => showOverlay(pending), 40);
    }
  }

  function renderScenarioList() {
    el("scenarioList").innerHTML = HAPPY_PATHS.map((scenario, index) => `<button class="scenario-button" type="button" data-scenario="${index}"><span class="scenario-number">${index + 1}</span><span><strong>${escapeHtml(scenario.title)}</strong><small>${scenario.flow} · ${scenario.steps.length} tampilan</small></span><span>→</span></button>`).join("");
  }

  function openScenarioDrawer(open) {
    el("scenarioDrawer").classList.toggle("open", open);
    el("scenarioDrawer").setAttribute("aria-hidden", String(!open));
    el("openScenarios").setAttribute("aria-expanded", String(open));
    el("drawerBackdrop").hidden = !open;
    if (open) el("closeScenarios").focus();
  }

  function updateScenarioRunner() {
    const runner = el("scenarioRunner");
    if (state.scenarioIndex < 0) {
      runner.hidden = true;
      return;
    }
    const scenario = HAPPY_PATHS[state.scenarioIndex];
    const step = scenario.steps[state.scenarioStep];
    runner.hidden = false;
    el("scenarioCounter").textContent = `${scenario.flow} · LANGKAH ${state.scenarioStep + 1}/${scenario.steps.length}`;
    el("scenarioTitle").textContent = scenario.title;
    el("scenarioStep").textContent = step.label;
    el("scenarioPrev").disabled = state.scenarioStep === 0;
    el("scenarioNext").textContent = state.scenarioStep === scenario.steps.length - 1 ? "Selesai ✓" : "Berikutnya →";
  }

  function applyScenarioStep() {
    const scenario = HAPPY_PATHS[state.scenarioIndex];
    const step = scenario.steps[state.scenarioStep];
    if (step.persona) state.persona = step.persona;
    if (step.subscription) state.subscription = step.subscription;
    el("personaSelect").value = state.persona;
    el("subscriptionSelect").value = state.subscription;
    state.pendingOverlay = step.overlay || null;
    updateScenarioRunner();
    navigate(step.route);
  }

  function startScenario(index) {
    const scenario = HAPPY_PATHS[index];
    state.scenarioIndex = index;
    state.scenarioStep = 0;
    state.persona = scenario.persona;
    state.subscription = scenario.subscription || "ACTIVE";
    state.outlet = scenario.outlet || "Outlet Sudirman";
    state.screenState = "Default";
    el("personaSelect").value = state.persona;
    el("subscriptionSelect").value = state.subscription;
    el("outletSelect").value = state.outlet;
    el("screenStateSelect").value = state.screenState;
    openScenarioDrawer(false);
    applyScenarioStep();
  }

  function stopScenario(completed = false) {
    if (completed) showToast("Happy path selesai. Fixture tidak disimpan dan dapat dijalankan ulang.");
    state.scenarioIndex = -1;
    state.scenarioStep = 0;
    state.pendingOverlay = null;
    updateScenarioRunner();
    render();
  }

  function bindEvents() {
    window.addEventListener("hashchange", render);
    el("personaSelect").addEventListener("change", event => { state.persona = event.target.value; stopScenario(false); });
    el("outletSelect").addEventListener("change", event => { state.outlet = event.target.value; render(); });
    el("subscriptionSelect").addEventListener("change", event => { state.subscription = event.target.value; render(); });
    el("screenStateSelect").addEventListener("change", event => { state.screenState = event.target.value; render(); });
    el("showRouteIndex").addEventListener("click", showRouteIndex);
    el("openScenarios").addEventListener("click", () => openScenarioDrawer(true));
    el("closeScenarios").addEventListener("click", () => openScenarioDrawer(false));
    el("drawerBackdrop").addEventListener("click", () => {
      openScenarioDrawer(false);
      el("controlPanel").classList.remove("open");
    });
    el("toggleControls").addEventListener("click", () => {
      const open = el("controlPanel").classList.toggle("open");
      el("toggleControls").setAttribute("aria-expanded", String(open));
      el("drawerBackdrop").hidden = !open;
    });
    el("closeControls").addEventListener("click", () => {
      el("controlPanel").classList.remove("open");
      el("toggleControls").setAttribute("aria-expanded", "false");
      el("drawerBackdrop").hidden = true;
    });
    el("toggleNav").addEventListener("click", () => {
      const open = el("routeNav").classList.toggle("open");
      el("toggleNav").setAttribute("aria-expanded", String(open));
    });
    el("scenarioList").addEventListener("click", event => {
      const trigger = event.target.closest("[data-scenario]");
      if (trigger) startScenario(Number(trigger.dataset.scenario));
    });
    el("scenarioPrev").addEventListener("click", () => {
      if (state.scenarioStep > 0) { state.scenarioStep -= 1; applyScenarioStep(); }
    });
    el("scenarioNext").addEventListener("click", () => {
      const scenario = HAPPY_PATHS[state.scenarioIndex];
      if (state.scenarioStep >= scenario.steps.length - 1) stopScenario(true);
      else { state.scenarioStep += 1; applyScenarioStep(); }
    });
    el("scenarioStop").addEventListener("click", () => stopScenario(false));
    document.addEventListener("click", event => {
      const overlayTrigger = event.target.closest("[data-overlay]");
      const navigateTrigger = event.target.closest("[data-navigate]");
      const mobileToggle = event.target.closest("[data-toggle-mobile-nav]");
      if (overlayTrigger && !overlayTrigger.disabled) showOverlay(overlayTrigger.dataset.overlay);
      else if (navigateTrigger && !navigateTrigger.disabled) navigate(navigateTrigger.dataset.navigate);
      else if (mobileToggle) {
        const open = el("routeNav").classList.toggle("open");
        el("toggleNav").setAttribute("aria-expanded", String(open));
      } else if (event.target.closest("button") && !event.target.closest("dialog") && !event.target.closest(".scenario-runner") && !event.target.closest(".control-panel") && !event.target.closest(".prototype-bar")) {
        const generic = event.target.closest("button");
        if (!generic.disabled && !generic.dataset.overlay && !generic.dataset.navigate) showToast("Aksi wireframe disimulasikan; tidak ada data yang disimpan.");
      }
    });
    el("overlayDialog").addEventListener("close", () => {
      if (el("overlayDialog").returnValue === "confirm") {
        const config = OVERLAYS[el("overlayContent").dataset.overlayId];
        showToast(`${config ? config.title : "Aksi"} berhasil disimulasikan. Tidak ada data yang disimpan.`);
      }
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && el("scenarioDrawer").classList.contains("open")) openScenarioDrawer(false);
    });
  }

  function assertManifest() {
    const paths = ROUTES.map(item => item.path);
    const unique = new Set(paths);
    const coveredFlows = new Set(HAPPY_PATHS.map(scenario => scenario.flow));
    if (paths.length !== 41 || unique.size !== 41) throw new Error(`Route manifest invalid: ${paths.length} route, ${unique.size} unik.`);
    for (let index = 1; index <= 12; index += 1) {
      const id = `UF-${String(index).padStart(2, "0")}`;
      if (!coveredFlows.has(id)) throw new Error(`Happy path tidak mencakup ${id}.`);
    }
    const requiredOverlays = ["quick-customer", "outlet-form", "service-form", "invite-staff", "role-capability", "discount", "payment", "print-receipt", "edit-order", "cancel-order", "handoff-order", "rollback-status", "void-payment", "reverse-payment", "refund-payment", "cash-open", "cash-close", "upgrade-plan", "archive-plan", "suspend-tenant", "reactivate-tenant"];
    requiredOverlays.forEach(id => { if (!OVERLAYS[id]) throw new Error(`Overlay hilang: ${id}`); });
    window.WIREFRAME_MANIFEST = Object.freeze([...paths]);
    window.WIREFRAME_AUDIT = Object.freeze({
      routeCount: paths.length,
      uniqueRouteCount: unique.size,
      happyPathCount: HAPPY_PATHS.length,
      flowCoverage: Object.freeze([...coveredFlows].sort()),
      criticalOverlays: Object.freeze([...requiredOverlays]),
      screenStates: Object.freeze(["Default", "Loading", "Empty", "Error", "Permission denied", "Read-only", "Success"]),
      regularOrderInteractionCount: 11
    });
  }

  assertManifest();
  renderScenarioList();
  bindEvents();
  el("routeCount").textContent = `${ROUTES.length}/41 route`;
  if (!window.location.hash) window.location.hash = "#/";
  else render();
})();
