"use client";

import React, { useState } from "react";
import { SearchEntryMode } from "@/types/motolantic";
import EpistemicBadge from "./EpistemicBadge";
import {
  Search,
  Camera,
  Car,
  Globe2,
  ArrowRight,
  CheckCircle,
  FileSearch,
  Headphones,
  Info,
} from "lucide-react";

interface HeroSearchProps {
  onTriggerOrderLab: (prefillSummary: string) => void;
}

export default function HeroSearch({ onTriggerOrderLab }: HeroSearchProps) {
  const [entryMode, setEntryMode] = useState<SearchEntryMode>("part_number");

  // State Pintu 1: Nomor Part
  const [partNumber, setPartNumber] = useState("4060A481");
  const [partNameHint, setPartNameHint] = useState(
    "Shockbreaker Depan Kiri / Throttle Body"
  );

  // State Pintu 2: Foto Komponen
  const [photoLabelText, setPhotoLabelText] = useState(
    "Foto label fisik & dudukan bawah shockbreaker depan kiri"
  );
  const [symptomNote, setSymptomNote] = useState(
    "Ada rembesan oli pada tabung suspensi depan kiri; butuh pencocokan dudukan."
  );

  // State Pintu 3: Data Mobil
  const [brand, setBrand] = useState("Mitsubishi");
  const [model, setModel] = useState("Xpander");
  const [year, setYear] = useState("2019");
  const [engineVariant, setEngineVariant] = useState("1.5L MIVEC (4A91)");
  const [mountPosition, setMountPosition] = useState("Depan Kiri (Front LH)");
  const [vinOptional, setVinOptional] = useState("");

  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let summary = "";
    if (entryMode === "part_number") {
      summary = `[Pintu Masuk: Nomor Part] Nomor: ${
        partNumber || "Belum diketahui"
      } | Deskripsi: ${partNameHint}`;
    } else if (entryMode === "component_photo") {
      summary = `[Pintu Masuk: Foto Komponen] Bukti Visual: ${photoLabelText} | Catatan Kondisi: ${symptomNote}`;
    } else {
      summary = `[Pintu Masuk: Data Mobil] ${brand} ${model} (${year}) | Varian/Mesin: ${engineVariant} | Posisi: ${mountPosition} | VIN: ${
        vinOptional || "Opsional (belum diisi)"
      }`;
    }
    setSubmittedSummary(summary);
  };

  return (
    <section
      id="cari-sparepart"
      className="relative bg-gradient-to-b from-motolantic-navyDark via-motolantic-navy to-[#142E49] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Keahlian bengkel. Jangkauan global.</span>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-widest uppercase text-motolantic-orange">
                Suku cadang dunia. Kepastian untuk mobilmu.
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Part sulit dicari?{" "}
                <span className="text-cyan-400">Mulai dari kebutuhan mobilmu.</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Kirim nomor part, foto komponen, atau data kendaraan. Motolantic
                membantu memeriksa kebutuhan, mencari pilihan sumber luar negeri,
                dan menjelaskan biaya serta estimasi pengadaannya dalam satu tempat.
              </p>
            </div>

            <div className="bg-white text-motolantic-navy rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-6">
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-4">
                <button
                  type="button"
                  onClick={() => setEntryMode("part_number")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    entryMode === "part_number"
                      ? "bg-motolantic-navy text-white shadow-sm"
                      : "bg-slate-100 text-motolantic-steel hover:bg-slate-200"
                  }`}
                >
                  <Search className="w-4 h-4 text-motolantic-orange" />
                  <span>1. Nomor Part</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEntryMode("component_photo")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    entryMode === "component_photo"
                      ? "bg-motolantic-navy text-white shadow-sm"
                      : "bg-slate-100 text-motolantic-steel hover:bg-slate-200"
                  }`}
                >
                  <Camera className="w-4 h-4 text-motolantic-orange" />
                  <span>2. Foto Komponen</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEntryMode("vehicle_data")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    entryMode === "vehicle_data"
                      ? "bg-motolantic-navy text-white shadow-sm"
                      : "bg-slate-100 text-motolantic-steel hover:bg-slate-200"
                  }`}
                >
                  <Car className="w-4 h-4 text-motolantic-orange" />
                  <span>3. Data Mobil</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {entryMode === "part_number" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                        Nomor Part (OEM / Aftermarket)
                      </label>
                      <input
                        type="text"
                        value={partNumber}
                        onChange={(e) => setPartNumber(e.target.value)}
                        placeholder="Contoh: 4060A481 / 22030-0C020"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                        Nama Komponen / Kendaraan (Opsional)
                      </label>
                      <input
                        type="text"
                        value={partNameHint}
                        onChange={(e) => setPartNameHint(e.target.value)}
                        placeholder="Contoh: Shockbreaker Depan Kiri Xpander"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                      />
                    </div>
                  </div>
                )}

                {entryMode === "component_photo" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                          Deskripsi Foto Label / Dudukan Part Lama
                        </label>
                        <input
                          type="text"
                          value={photoLabelText}
                          onChange={(e) => setPhotoLabelText(e.target.value)}
                          placeholder="Contoh: Foto stiker kode part & soket konektor"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                          Keterangan Kondisi / Posisi Komponen
                        </label>
                        <input
                          type="text"
                          value={symptomNote}
                          onChange={(e) => setSymptomNote(e.target.value)}
                          placeholder="Jelaskan posisi & kondisi komponen lama"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-motolantic-steel bg-slate-100 p-2.5 rounded-lg flex items-start gap-2">
                      <Info className="w-4 h-4 text-motolantic-navy shrink-0 mt-0.5" />
                      <span>
                        <strong>Catatan Teknis:</strong> Permintaan berdasarkan
                        gejala kerusakan perlu diklarifikasi terlebih dahulu; foto
                        dan percakapan jarak jauh tidak selalu cukup untuk
                        menetapkan diagnosis tanpa pemeriksaan bukti nomor part
                        atau dimensi.
                      </span>
                    </p>
                  </div>
                )}

                {entryMode === "vehicle_data" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                          Merek Fokus
                        </label>
                        <select
                          value={brand}
                          onChange={(e) => {
                            const newBrand = e.target.value;
                            setBrand(newBrand);
                            if (newBrand === "Toyota") setModel("Innova Zenix");
                            if (newBrand === "Mitsubishi") setModel("Xpander");
                            if (newBrand === "BYD") setModel("Atto 1");
                          }}
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                        >
                          <option value="Toyota">Toyota</option>
                          <option value="Mitsubishi">Mitsubishi</option>
                          <option value="BYD">BYD (Non-Tegangan Tinggi)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                          Model Kendaraan
                        </label>
                        <input
                          type="text"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          placeholder="Avanza / Xpander / Atto 1"
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                          Tahun Produksi
                        </label>
                        <input
                          type="text"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          placeholder="Contoh: 2019"
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                          Varian / Kode Mesin
                        </label>
                        <input
                          type="text"
                          value={engineVariant}
                          onChange={(e) => setEngineVariant(e.target.value)}
                          placeholder="Contoh: 1.5L 4A91 / 2GD-FTV"
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                          Posisi Pemasangan
                        </label>
                        <input
                          type="text"
                          value={mountPosition}
                          onChange={(e) => setMountPosition(e.target.value)}
                          placeholder="Depan Kiri / Belakang Kanan"
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-motolantic-steel mb-1">
                          Nomor Rangka / VIN (Opsional)
                        </label>
                        <input
                          type="text"
                          value={vinOptional}
                          onChange={(e) => setVinOptional(e.target.value)}
                          placeholder="Diisi bila varian meragukan"
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-motolantic-orange"
                        />
                      </div>
                    </div>

                    {brand === "BYD" && (
                      <div className="text-xs bg-amber-50 border border-amber-300 text-amber-900 px-3 py-2 rounded-lg">
                        <strong>Batas Layanan Kendaraan Listrik (BYD Atto 1):</strong>{" "}
                        Cakupan komponen dikembangkan mengikuti kemampuan teknis
                        (seperti kaki-kaki/suspensi). Penanganan baterai traksi
                        atau pekerjaan tegangan tinggi tidak termasuk layanan.
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEntryMode("component_photo")}
                    className="text-xs font-semibold text-motolantic-steel hover:text-motolantic-navy text-left underline"
                  >
                    Belum tahu nomor part? Kami bantu identifikasi lewat foto & data mobil.
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-motolantic-orange hover:bg-motolantic-orangeHover text-white font-bold text-sm shadow-lg transition-all"
                  >
                    <span>Ajukan Pencarian Part</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {submittedSummary && (
                <div className="mt-4 p-4 rounded-xl bg-motolantic-warmWhite border border-slate-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-motolantic-navy">
                      Permintaan Diterima ke Antrean Pemeriksaan
                    </span>
                    <EpistemicBadge status="Indikasi cocok tetapi perlu verifikasi tambahan" />
                  </div>
                  <p className="text-xs text-motolantic-navy font-mono bg-white p-2 rounded border border-slate-200">
                    {submittedSummary}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <p className="text-xs text-motolantic-steel">
                      Standar Komunikasi: “Boleh kirim tahun, varian mesin,
                      dan foto nomor pada part lama? Kami perlu memeriksa
                      kecocokannya sebelum menawarkan barang.”
                    </p>
                    <button
                      type="button"
                      onClick={() => onTriggerOrderLab(submittedSummary)}
                      className="text-xs font-bold text-motolantic-orange hover:underline"
                    >
                      Lanjut ke Simulasi Penawaran MTL-SIM-001 →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 p-3.5 rounded-xl">
                <CheckCircle className="w-5 h-5 text-motolantic-orange shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-white">
                    Pemeriksaan Kecocokan
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Berdasarkan bukti nomor part, varian, posisi, dan dudukan—bukan
                    kemiripan gambar semata.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 p-3.5 rounded-xl">
                <FileSearch className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-white">
                    Rincian Biaya Terbuka
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Pisahkan harga barang, ongkir lintas negara, estimasi masuk,
                    dan biaya layanan secara deterministik.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 p-3.5 rounded-xl">
                <Headphones className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-white">
                    Pendampingan Pesanan
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Keputusan berdampak tinggi dan kasus meragukan selalu diperiksa
                    oleh manusia/teknisi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 block">
                    FROM GLOBAL SUPPLIERS → TO INDONESIA
                  </span>
                  <h2 className="text-base font-bold text-white mt-0.5">
                    Contoh Hasil Pencarian · Simulasi Konsep
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/40 text-amber-200 text-[11px] font-semibold">
                  Data Ilustratif
                </span>
              </div>

              <div className="bg-motolantic-navyDark/90 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Throttle Body Assembly
                    </h3>
                    <p className="text-xs text-slate-400">
                      Komponen sistem bahan bakar & udara mesin
                    </p>
                  </div>
                  <a
                    href="#simulasi-order"
                    className="px-3 py-1.5 rounded-full border border-cyan-400/60 text-cyan-300 text-xs font-semibold hover:bg-cyan-950 transition-colors shrink-0"
                  >
                    Lihat rincian →
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-800/80 pt-2.5">
                  <div>
                    <span className="text-slate-400 block">Pemasok luar negeri:</span>
                    <span className="font-semibold text-slate-100">
                      Amerika Serikat (Simulasi)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Ketersediaan:</span>
                    <span className="font-semibold text-emerald-400">
                      Tersedia (Simulasi)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Estimasi tiba:</span>
                    <span className="font-semibold text-slate-100">
                      ± 2–3 minggu
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Perkiraan biaya:</span>
                    <span className="font-semibold text-amber-300">
                      Dihitung setelah cek varian
                    </span>
                  </div>
                </div>
                <EpistemicBadge status="Indikasi cocok tetapi perlu verifikasi tambahan" />
              </div>

              <div className="bg-motolantic-navyDark/90 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Shockbreaker Depan Kiri (Studi Kasus MTL-SIM-001)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Mitsubishi Xpander 2019 1.5 · Kaki-kaki & Suspensi
                    </p>
                  </div>
                  <a
                    href="#simulasi-order"
                    className="px-3 py-1.5 rounded-full border border-motolantic-orange text-motolantic-orange text-xs font-semibold hover:bg-motolantic-orange hover:text-white transition-colors shrink-0"
                  >
                    Uji Order →
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-800/80 pt-2.5">
                  <div>
                    <span className="text-slate-400 block">Pemasok luar negeri:</span>
                    <span className="font-semibold text-slate-100">
                      Jepang (Pilihan A)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Ketersediaan:</span>
                    <span className="font-semibold text-emerald-400">
                      Tersedia (Simulasi)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Estimasi tiba:</span>
                    <span className="font-semibold text-slate-100">
                      15–24 hari
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Contoh Deterministik:</span>
                    <span className="font-bold text-white">
                      Rp1.629.000 (Simulasi)
                    </span>
                  </div>
                </div>
                <EpistemicBadge status="Terkonfirmasi berdasarkan bukti" />
              </div>

              <div className="bg-gradient-to-r from-motolantic-navy to-slate-900 border border-motolantic-orange/40 rounded-xl p-4">
                <p className="text-sm font-extrabold text-white">
                  “Mobilmu boleh langka. Jalan keluarnya harus ada.”
                </p>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Kalimat ini adalah semangat kami mencari solusi lintas sumber,
                  bukan jaminan mutlak bahwa setiap part pasti tersedia tanpa
                  pemeriksaan bukti pemasok.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
