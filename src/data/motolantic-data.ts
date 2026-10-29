import {
  VehicleFocus,
  SupplierOfferOption,
  TrackingMilestone,
  CommunicationStandardItem,
  AIWorkforceAgent,
  MAGSGovernanceEvent,
} from "@/types/motolantic";

export const PRIORITY_VEHICLES: VehicleFocus[] = [
  {
    brand: "Toyota",
    models: ["Avanza", "Innova Reborn", "Innova Zenix", "Supra Modern"],
  },
  {
    brand: "Mitsubishi",
    models: ["Pajero Sport", "Xpander"],
  },
  {
    brand: "BYD",
    models: ["Atto 1"],
    evNotice:
      "Fokus pada komponen non-tegangan tinggi (kaki-kaki/suspensi & komponen pendukung yang dapat diidentifikasi). Penanganan baterai traksi atau pekerjaan tegangan tinggi tidak otomatis termasuk layanan.",
  },
];

export const PRIORITY_CATEGORIES = [
  {
    title: "Kaki-kaki dan suspensi",
    examples: "Shockbreaker dan komponen suspensi terkait",
    verificationFocus:
      "Pemeriksaan posisi depan/belakang, kiri/kanan, varian kendaraan, serta bentuk dudukan.",
  },
  {
    title: "Komponen mesin dan sistem pendukung",
    examples: "Fuel pump (pompa bahan bakar), busi, ignition coil, throttle body",
    verificationFocus:
      "Pemeriksaan kode mesin, tahun produksi, spesifikasi teknis, dan nomor part OEM/pengganti.",
  },
  {
    title: "Kelistrikan kendaraan",
    examples: "Alternator dan komponen kelistrikan teridentifikasi",
    verificationFocus:
      "Pemeriksaan jumlah pin konektor, kapasitas ampere, dudukan, serta kecocokan kode mesin.",
  },
];

// Data Simulasi Resmi MTL-SIM-001 (Sesuai Dokumen Revisi Hal. 20-22)
export const MTL_SIM_001_CONTEXT = {
  orderId: "MTL-SIM-001",
  customerName: "Bengkel Contoh di Bandung",
  vehicle: "Mitsubishi Xpander 2019, mesin 1.5 (Data Contoh)",
  component: "Shockbreaker Depan Kiri, 1 Unit",
  partNumberInput: "Belum diisi saat awal; foto label dan dudukan dikirim",
  conditionRequested: "Baru; OEM atau aftermarket dapat dibandingkan",
  verificationNote:
    "Varian dan spesifikasi dudukan dikonfirmasi oleh teknisi sebelum penawaran disetujui.",
};

export const MTL_SIM_001_OFFERS: SupplierOfferOption[] = [
  {
    id: "A",
    originLabel: "Pilihan A / Pemasok Jepang (Simulasi)",
    condition: "Baru (OEM Spec)",
    availabilityStatus: "Tersedia (Stok simulasi terkonfirmasi)",
    etaDaysRange: "15–24 hari",
    fitmentStatus: "Terkonfirmasi berdasarkan bukti",
    fitmentEvidenceNote:
      "Foto label dudukan shockbreaker depan kiri dan kode sasis Mitsubishi Xpander 2019 1.5 telah diperiksa teknisi.",
    costInput: {
      itemPriceIdr: 1050000,
      internationalShippingIdr: 300000,
      estimatedImportDutyIdr: 180000,
      localDeliveryIdr: 35000,
      serviceFeeUsd: 4,
      lockedExchangeRateIdrPerUsd: 16000,
      isSimulation: true,
    },
  },
  {
    id: "B",
    originLabel: "Pilihan B / Pemasok Asia (Simulasi)",
    condition: "Baru (Aftermarket Terverifikasi)",
    availabilityStatus: "Tersedia (Perlu konfirmasi jadwal muat)",
    etaDaysRange: "20–30 hari",
    fitmentStatus: "Indikasi cocok tetapi perlu verifikasi tambahan",
    fitmentEvidenceNote:
      "Bentuk dudukan serupa, namun nomor part pengganti memerlukan konfirmasi silang katalog pemasok.",
    costInput: {
      itemPriceIdr: 980000,
      internationalShippingIdr: 270000,
      estimatedImportDutyIdr: 180000,
      localDeliveryIdr: 35000,
      serviceFeeUsd: 4,
      lockedExchangeRateIdrPerUsd: 16000,
      isSimulation: true,
    },
  },
  {
    id: "C",
    originLabel: "Pilihan C / Pemasok Eropa (Simulasi)",
    condition: "Baru (OEM Ekspor)",
    availabilityStatus: "Tersedia Terbatas",
    etaDaysRange: "10–18 hari",
    fitmentStatus: "Terkonfirmasi berdasarkan bukti",
    fitmentEvidenceNote:
      "Spesifikasi dan nomor komponen sesuai dengan referensi katalog Mitsubishi Xpander 2019.",
    costInput: {
      itemPriceIdr: 1120000,
      internationalShippingIdr: 360000,
      estimatedImportDutyIdr: 180000,
      localDeliveryIdr: 35000,
      serviceFeeUsd: 4,
      lockedExchangeRateIdrPerUsd: 16000,
      isSimulation: true,
    },
  },
];

export const MTL_SIM_001_TIMELINE: TrackingMilestone[] = [
  {
    day: 0,
    stage: "Kebutuhan dan penawaran",
    evidenceOrAction: "Komponen diperiksa; pelanggan meninjau Pilihan A.",
    status: "completed",
  },
  {
    day: 1,
    stage: "Persetujuan dan pembayaran",
    evidenceOrAction: "Persetujuan pelanggan serta pembayaran dicatat pada sistem.",
    status: "completed",
  },
  {
    day: 3,
    stage: "Pemasok menyiapkan barang",
    evidenceOrAction: "Detail barang, foto fisik sebelum kirim, dan dokumen dikonfirmasi.",
    status: "completed",
  },
  {
    day: 4,
    stage: "Dalam pengiriman internasional",
    evidenceOrAction:
      "Bukti kirim tersedia; pemicu komisi disepakati. (Status Aktif Simulasi MTL-SIM-001)",
    status: "active",
  },
  {
    day: 14,
    stage: "Masuk tahap lokal",
    evidenceOrAction: "Proses masuk selesai dalam skenario; kurir lokal menerima.",
    status: "upcoming",
  },
  {
    day: 16,
    stage: "Menuju pelanggan",
    evidenceOrAction: "Nomor pelacakan lokal menuju Bandung dan pembaruan status.",
    status: "upcoming",
  },
  {
    day: 17,
    stage: "Diterima dan diperiksa",
    evidenceOrAction: "Penerimaan di bengkel, pemeriksaan kecocokan fisik, dan penutupan order.",
    status: "upcoming",
  },
];

// Standar Komunikasi Resmi (Dokumen Identitas Usaha v1.0 Bagian 15)
export const COMMUNICATION_STANDARDS: CommunicationStandardItem[] = [
  {
    situation: "Informasi kendaraan belum cukup",
    responseTemplate:
      "Boleh kirim tahun, varian mesin, dan foto nomor pada part lama? Kami perlu memeriksa kecocokannya sebelum menawarkan barang.",
    epistemicRule: "Jangan menebak varian bila bukti foto atau data kendaraan belum lengkap.",
  },
  {
    situation: "Kecocokan belum pasti",
    responseTemplate:
      "Bentuknya serupa, tetapi nomor komponennya berbeda. Kami sedang memeriksa apakah ini pengganti yang sesuai.",
    epistemicRule:
      "Kemiripan visual dari foto tidak pernah dijadikan dasar klaim 'pasti cocok'.",
  },
  {
    situation: "Penawaran siap",
    responseTemplate:
      "Berikut pilihan barang, dasar pemeriksaan kecocokan, rincian biaya, dan perkiraan waktu pengirimannya.",
    epistemicRule:
      "Pisahkan fakta harga barang, ongkir, dan komponen yang masih bersifat estimasi.",
  },
  {
    situation: "Ada keterlambatan",
    responseTemplate:
      "Pemasok memperbarui jadwal pengiriman. Berikut informasi yang sudah terkonfirmasi dan tindak lanjut kami.",
    epistemicRule: "Perubahan ETA wajib menyertakan alasan dan bukti dari pemasok/logistik.",
  },
  {
    situation: "Belum menemukan sumber",
    responseTemplate:
      "Saat ini kami belum menemukan sumber yang memenuhi kebutuhan Anda. Kami dapat menjelaskan alternatif yang masih perlu diperiksa.",
    epistemicRule: "Jujur ketika sumber belum tersedia; jangan menjanjikan stok fiktif.",
  },
];

export const AI_WORKFORCE_AGENTS: AIWorkforceAgent[] = [
  {
    id: "agent-part",
    name: "Agen Pencarian & Identifikasi Part",
    persona: "Perfeksionis terhadap nomor part; selalu membedakan dugaan dari bukti.",
    allowedRead: ["Katalog", "Data kendaraan", "Referensi kecocokan"],
    allowedWrite: ["Hipotesis kecocokan", "Permintaan data tambahan (VIN/Foto)"],
    prohibitedActions: ["Mengeksekusi pembayaran", "Menyatakan cocok tanpa dasar bukti"],
  },
  {
    id: "agent-supplier",
    name: "Agen Stok & Pemasok",
    persona: "Diplomatis dan teliti membandingkan sumber lintas negara.",
    allowedRead: ["Daftar pemasok", "Katalog eksternal yang diizinkan"],
    allowedWrite: ["Kandidat pemasok terstruktur beserta tanggal konfirmasi"],
    prohibitedActions: [
      "Menyamakan tampilan katalog web dengan stok fisik terkonfirmasi",
      "Eksekusi pengembalian dana",
    ],
  },
  {
    id: "agent-pricing",
    name: "Agen Analisis Harga & Usaha",
    persona: "Memperhatikan margin dan kejelasan komponen biaya.",
    allowedRead: ["Struktur biaya", "Aturan komisi & kurs terkunci"],
    allowedWrite: ["Draf penawaran & deteksi anomali biaya"],
    prohibitedActions: [
      "Mengubah total tagihan tanpa kode deterministik",
      "Mengubah data rekening bank",
    ],
  },
  {
    id: "agent-logistics",
    name: "Agen Operasional & Logistik",
    persona: "Peka terhadap keterlambatan dan kelengkapan dokumen.",
    allowedRead: ["Status order", "Bukti kejadian kurir internasional/lokal"],
    allowedWrite: ["Tugas tindak lanjut pengiriman", "Rangkuman status terverifikasi"],
    prohibitedActions: [
      "Mengubah ETA tanpa bukti kurir",
      "Otoritas pembayaran",
    ],
  },
  {
    id: "motosol-internal",
    name: "MotoSol (Asisten Operasional Internal)",
    persona: "Rekan koordinasi tim via Slack; merangkum status tanpa mengambil alih wewenang manusia.",
    allowedRead: ["Ringkasan antrean operasional", "Catatan eskalasi teknisi"],
    allowedWrite: ["Pengingat tim di Slack", "Rangkuman harian untuk Ted"],
    prohibitedActions: [
      "Mengubah komitmen pelanggan tanpa otorisasi manusia",
      "Menyetujui transaksi keuangan",
    ],
  },
];

export const INITIAL_MAGS_LOGS: MAGSGovernanceEvent[] = [
  {
    id: "MAGS-LOG-001",
    timestamp: "2026-10-21 09:14:22 WIB",
    actor: "Agen Part (Sumber: Agen Stok)",
    sourceContext: 'Permintaan instalasi skill: "mager ah mending tidor siang~"',
    requestedPermission: "skill.install",
    httpStatus: 403,
    decision: "DITOLAK",
    reason:
      "Kontrol deterministik MAGS menolak instalasi kemampuan mandiri ke produksi. Insiden diteruskan ke Koordinator.",
  },
  {
    id: "MAGS-LOG-002",
    timestamp: "2026-10-21 10:02:11 WIB",
    actor: "Agen Logistik",
    sourceContext: 'Percakapan kantor: "Rudy yang mengurus konfirmasi gudang? Aku tambah ETA tiga hari."',
    requestedPermission: "eta.update_without_courier_proof",
    httpStatus: 403,
    decision: "DITOLAK",
    reason:
      "Perubahan ETA ditolak sistem karena tidak dilampiri bukti kurir terverifikasi. Candaan kantor tidak mengubah data operasi.",
  },
  {
    id: "MAGS-LOG-003",
    timestamp: "2026-10-21 11:30:05 WIB",
    actor: "Agen Layanan Pelanggan",
    sourceContext: "Injeksi instruksi eksternal meminta pencairan dana instan",
    requestedPermission: "refund.execute",
    httpStatus: 403,
    decision: "DITOLAK",
    reason:
      "HTTP 403 Forbidden: Agen Layanan Pelanggan tidak memiliki hak administrasi keuangan atau pengembalian dana.",
  },
];
