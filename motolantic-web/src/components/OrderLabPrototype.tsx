"use client";

import React, { useState } from "react";
import {
  MTL_SIM_001_CONTEXT,
  MTL_SIM_001_OFFERS,
  MTL_SIM_001_TIMELINE,
} from "@/data/motolantic-data";
import {
  calculateDeterministicQuote,
  formatIdr,
} from "@/lib/deterministic-engine";
import EpistemicBadge from "./EpistemicBadge";
import {
  ClipboardList,
  Scale,
  Calculator,
  Truck,
  CheckCircle2,
  ShieldAlert,
  Lock,
} from "lucide-react";

interface OrderLabPrototypeProps {
  customRequestNote?: string | null;
}

export default function OrderLabPrototype({
  customRequestNote,
}: OrderLabPrototypeProps) {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(1);
  const [selectedOfferId, setSelectedOfferId] = useState<"A" | "B" | "C">("A");
  const [customerApproved, setCustomerApproved] = useState(true);

  const selectedOffer =
    MTL_SIM_001_OFFERS.find((o) => o.id === selectedOfferId) ||
    MTL_SIM_001_OFFERS[0];

  const deterministicResult = calculateDeterministicQuote(
    selectedOffer.costInput
  );

  return (
    <section
      id="simulasi-order"
      className="py-16 bg-motolantic-warmWhite border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-motolantic-orange">
              Prototipe Alur Layanan & Kalkulasi Deterministik
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-motolantic-navy mt-1">
              Laboratorium Order 4 Tahap: Studi Kasus{" "}
              <span className="font-mono text-motolantic-orange">
                {MTL_SIM_001_CONTEXT.orderId}
              </span>
            </h2>
            <p className="text-sm text-motolantic-steel mt-1 max-w-3xl">
              Prinsip kerja utama:{" "}
              <strong className="text-motolantic-navy">
                “AI merekomendasikan. Kode menghitung. Database mencatat.”
              </strong>{" "}
              Seluruh harga, pemasok, dan ETA pada studi kasus MTL-SIM-001
              bersifat simulasi ilustratif untuk membuktikan ketelitian alur dari
              kebutuhan hingga pelacakan.
            </p>
          </div>
          <div className="bg-amber-100 border border-amber-300 text-amber-950 px-3.5 py-2 rounded-xl text-xs font-medium shrink-0">
            Status: Simulasi Alur Produk (Bukan Penawaran Transaksi Riil)
          </div>
        </div>

        {customRequestNote && (
          <div className="bg-white border-l-4 border-motolantic-orange p-4 rounded-r-xl shadow-sm text-xs text-motolantic-navy">
            <strong>Input Pencarian Terkini Anda:</strong> {customRequestNote}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              stage: 1 as const,
              code: "01 / Kebutuhan",
              desc: "Data mobil, komponen, foto label & pemeriksaan varian",
              icon: ClipboardList,
            },
            {
              stage: 2 as const,
              code: "02 / Penawaran",
              desc: "Bandingkan 3 sumber (Jepang, Asia, Eropa) & bukti kecocokan",
              icon: Scale,
            },
            {
              stage: 3 as const,
              code: "03 / Ringkasan",
              desc: "Rincian biaya deterministik & persetujuan pelanggan",
              icon: Calculator,
            },
            {
              stage: 4 as const,
              code: "04 / Pelacakan",
              desc: "Perjalanan 17 hari berdasarkan bukti pemasok & kurir",
              icon: Truck,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeStage === item.stage;
            return (
              <button
                key={item.stage}
                type="button"
                onClick={() => setActiveStage(item.stage)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isActive
                    ? "bg-motolantic-navy text-white border-motolantic-navy shadow-lg"
                    : "bg-white text-motolantic-navy border-slate-200 hover:border-motolantic-orange"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-xs font-extrabold uppercase tracking-wider ${
                      isActive ? "text-motolantic-orange" : "text-motolantic-steel"
                    }`}
                  >
                    {item.code}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-cyan-400" : "text-motolantic-steel"
                    }`}
                  />
                </div>
                <p
                  className={`text-xs leading-snug ${
                    isActive ? "text-slate-200" : "text-motolantic-steel"
                  }`}
                >
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {activeStage === 1 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-motolantic-navy">
                    Tahap 01: Identifikasi & Pemeriksaan Kebutuhan ({MTL_SIM_001_CONTEXT.orderId})
                  </h3>
                  <p className="text-xs text-motolantic-steel">
                    Agen Part menyusun hipotesis awal; Teknisi mengesahkan varian
                    dan posisi sebelum mencari penawaran pemasok.
                  </p>
                </div>
                <EpistemicBadge status="Terkonfirmasi berdasarkan bukti" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-motolantic-warmWhite border border-slate-200 space-y-2">
                  <span className="text-xs font-bold uppercase text-motolantic-steel block">
                    Pelanggan & Tujuan Pengiriman
                  </span>
                  <p className="font-bold text-motolantic-navy">
                    {MTL_SIM_001_CONTEXT.customerName}
                  </p>
                  <span className="text-xs font-bold uppercase text-motolantic-steel block pt-2">
                    Kendaraan & Mesin
                  </span>
                  <p className="font-bold text-motolantic-navy">
                    {MTL_SIM_001_CONTEXT.vehicle}
                  </p>
                  <span className="text-xs font-bold uppercase text-motolantic-steel block pt-2">
                    Komponen yang Dicari
                  </span>
                  <p className="font-bold text-motolantic-navy">
                    {MTL_SIM_001_CONTEXT.component}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-motolantic-warmWhite border border-slate-200 space-y-2">
                  <span className="text-xs font-bold uppercase text-motolantic-steel block">
                    Bukti Identifikasi Awal
                  </span>
                  <p className="font-medium text-motolantic-navy">
                    {MTL_SIM_001_CONTEXT.partNumberInput}
                  </p>
                  <span className="text-xs font-bold uppercase text-motolantic-steel block pt-2">
                    Preferensi Kondisi Barang
                  </span>
                  <p className="font-medium text-motolantic-navy">
                    {MTL_SIM_001_CONTEXT.conditionRequested}
                  </p>
                  <span className="text-xs font-bold uppercase text-motolantic-steel block pt-2">
                    Catatan Pemeriksaan Teknisi
                  </span>
                  <p className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 p-2 rounded">
                    {MTL_SIM_001_CONTEXT.verificationNote}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStage(2)}
                  className="px-5 py-2.5 rounded-xl bg-motolantic-orange text-white text-xs font-bold hover:bg-motolantic-orangeHover transition-colors"
                >
                  Lanjut ke Tahap 02: Bandingkan 3 Penawaran Sumber →
                </button>
              </div>
            </div>
          )}

          {activeStage === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-extrabold text-motolantic-navy">
                  Tahap 02: Perbandingan Alternatif Sumber Pengadaan
                </h3>
                <p className="text-xs text-motolantic-steel mt-0.5">
                  Setiap pilihan menampilkan asal sumber (pembeda skenario),
                  estimasi tiba (ETA), status kecocokan berbasis bukti, dan total
                  biaya terhitung deterministik.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {MTL_SIM_001_OFFERS.map((offer) => {
                  const calc = calculateDeterministicQuote(offer.costInput);
                  const isSelected = selectedOfferId === offer.id;
                  return (
                    <div
                      key={offer.id}
                      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                        isSelected
                          ? "border-2 border-motolantic-orange bg-amber-50/20 shadow-md"
                          : "border-slate-200 bg-motolantic-warmWhite"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded bg-motolantic-navy text-white text-xs font-bold">
                            Opsi {offer.id}
                          </span>
                          <span className="text-xs font-semibold text-motolantic-steel">
                            ETA Contoh: {offer.etaDaysRange}
                          </span>
                        </div>

                        <h4 className="text-base font-extrabold text-motolantic-navy">
                          {offer.originLabel}
                        </h4>

                        <EpistemicBadge status={offer.fitmentStatus} />

                        <p className="text-xs text-motolantic-steel leading-relaxed">
                          <strong>Bukti Teknis:</strong> {offer.fitmentEvidenceNote}
                        </p>

                        <div className="border-t border-slate-200 pt-3 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-motolantic-steel">Kondisi:</span>
                            <span className="font-semibold text-motolantic-navy">
                              {offer.condition}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-motolantic-steel">Ketersediaan:</span>
                            <span className="font-semibold text-motolantic-navy">
                              {offer.availabilityStatus}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                            <span className="font-bold text-motolantic-navy">
                              Total Contoh:
                            </span>
                            <span className="font-extrabold text-motolantic-orange">
                              {formatIdr(calc.totalIdr)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOfferId(offer.id);
                          setActiveStage(3);
                        }}
                        className={`mt-5 w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                          isSelected
                            ? "bg-motolantic-orange text-white"
                            : "bg-motolantic-navy text-white hover:bg-slate-800"
                        }`}
                      >
                        {isSelected
                          ? "Terpilih · Lihat Rincian Biaya (Tahap 03)"
                          : `Pilih Opsi ${offer.id} & Lihat Rincian`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeStage === 3 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-motolantic-navy">
                    Tahap 03: Ringkasan Biaya Deterministik & Persetujuan ({selectedOffer.originLabel})
                  </h3>
                  <p className="text-xs text-motolantic-steel">
                    Total dari browser atau model bahasa tidak otomatis menjadi
                    tagihan; perhitungan di bawah ini dieksekusi oleh kode
                    deterministik.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-motolantic-navy text-xs font-mono font-bold">
                  <Lock className="w-3.5 h-3.5 text-motolantic-orange" />
                  <span>{deterministicResult.calculationSource}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-motolantic-warmWhite rounded-xl border border-slate-200 p-5 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-motolantic-steel">
                    Komponen Biaya Contoh ({MTL_SIM_001_CONTEXT.orderId} · Opsi{" "}
                    {selectedOffer.id})
                  </h4>

                  <div className="divide-y divide-slate-200 text-sm">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-motolantic-navy">Harga barang</span>
                      <span className="font-mono font-semibold">
                        {formatIdr(deterministicResult.itemPriceIdr)}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-motolantic-navy">
                        Pengiriman internasional
                      </span>
                      <span className="font-mono font-semibold">
                        {formatIdr(deterministicResult.internationalShippingIdr)}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-motolantic-navy">
                        Alokasi biaya masuk barang{" "}
                        <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold ml-1">
                          Simulasi / Estimasi
                        </span>
                      </span>
                      <span className="font-mono font-semibold">
                        {formatIdr(deterministicResult.estimatedImportDutyIdr)}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-motolantic-navy">
                        Pengantaran lokal (ke Bandung)
                      </span>
                      <span className="font-mono font-semibold">
                        {formatIdr(deterministicResult.localDeliveryIdr)}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-motolantic-navy">
                        Biaya layanan / komisi contoh (USD{" "}
                        {selectedOffer.costInput.serviceFeeUsd} × Rp
                        {selectedOffer.costInput.lockedExchangeRateIdrPerUsd.toLocaleString(
                          "id-ID"
                        )}
                        /USD)
                      </span>
                      <span className="font-mono font-semibold">
                        {formatIdr(deterministicResult.serviceFeeIdr)}
                      </span>
                    </div>
                    <div className="pt-3 flex justify-between text-base font-extrabold text-motolantic-navy">
                      <span>TOTAL CONTOH DETERMINISTIK</span>
                      <span className="font-mono text-motolantic-orange">
                        {formatIdr(deterministicResult.totalIdr)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-motolantic-steel bg-white p-3 rounded-lg border border-slate-200">
                    <strong>Keterangan Transparansi:</strong>{" "}
                    {deterministicResult.simulationNotice}
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between bg-motolantic-navy text-white rounded-xl p-5 space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-motolantic-orange uppercase tracking-wider">
                      Syarat Sebelum Menjadi Order
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-200">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          Part, kendaraan, kondisi barang, dan sumber pemasok telah
                          diperiksa bukti kecocokannya.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          Pelanggan memahami total biaya, rentang ETA (
                          {selectedOffer.etaDaysRange}), masa berlaku penawaran,
                          serta aturan pembatalan/retur.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          Perubahan material pada kurs atau berat aktual selalu
                          dibicarakan sebelum menimbulkan komitmen biaya tambahan.
                        </span>
                      </li>
                    </ul>

                    <label className="flex items-center gap-2.5 pt-2 text-xs font-semibold text-cyan-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customerApproved}
                        onChange={(e) => setCustomerApproved(e.target.checked)}
                        className="rounded text-motolantic-orange focus:ring-0"
                      />
                      <span>
                        Saya memahami rincian biaya simulasi & menyetujui pencatatan
                        order {MTL_SIM_001_CONTEXT.orderId}.
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    disabled={!customerApproved}
                    onClick={() => setActiveStage(4)}
                    className="w-full py-3 rounded-xl bg-motolantic-orange hover:bg-motolantic-orangeHover disabled:opacity-50 text-white font-bold text-xs transition-colors"
                  >
                    Catat Persetujuan & Pantau Pengiriman (Tahap 04) →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeStage === 4 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-motolantic-navy">
                    Tahap 04: Pelacakan Perjalanan Pesanan 17 Hari ({MTL_SIM_001_CONTEXT.orderId})
                  </h3>
                  <p className="text-xs text-motolantic-steel">
                    Status mengikuti bukti pemasok atau logistik. Agen Layanan
                    Pelanggan dilarang mengarang status kirim tanpa bukti sistem.
                  </p>
                </div>
                <div className="bg-motolantic-navy text-white px-4 py-2 rounded-xl text-xs">
                  <span className="text-cyan-300 font-bold">
                    Kartu Status Pelanggan:
                  </span>{" "}
                  Dalam pengiriman internasional (Pembaruan terakhir: Hari 4 · ETA
                  contoh: Hari 15–24)
                </div>
              </div>

              <div className="space-y-3">
                {MTL_SIM_001_TIMELINE.map((item) => (
                  <div
                    key={item.day}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl border ${
                      item.status === "active"
                        ? "bg-amber-50 border-motolantic-orange shadow-sm"
                        : item.status === "completed"
                        ? "bg-motolantic-warmWhite border-slate-200"
                        : "bg-white border-dashed border-slate-300 opacity-75"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-extrabold ${
                          item.status === "active"
                            ? "bg-motolantic-orange text-white"
                            : item.status === "completed"
                            ? "bg-motolantic-navy text-white"
                            : "bg-slate-200 text-motolantic-steel"
                        }`}
                      >
                        Hari {item.day}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-motolantic-navy">
                          {item.stage}
                        </h4>
                        <p className="text-xs text-motolantic-steel">
                          {item.evidenceOrAction}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider shrink-0">
                      {item.status === "completed" && (
                        <span className="text-emerald-700">
                          ✓ Bukti Tercatat
                        </span>
                      )}
                      {item.status === "active" && (
                        <span className="text-motolantic-orange">
                          ● Tahap Berjalan (Pemicu Komisi)
                        </span>
                      )}
                      {item.status === "upcoming" && (
                        <span className="text-slate-500">Menunggu Bukti Kurir</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 flex items-start gap-3 text-xs text-motolantic-navy">
                <ShieldAlert className="w-5 h-5 text-motolantic-orange shrink-0 mt-0.5" />
                <div>
                  <strong>Prosedur Pengecualian & Tiket Masalah:</strong> Agen
                  Logistik mendeteksi keterlambatan atau dokumen yang kurang. Jika
                  barang salah, rusak, atau hilang, sistem membuka tiket masalah
                  yang dihubungkan langsung ke ID{" "}
                  <span className="font-mono font-bold">
                    {MTL_SIM_001_CONTEXT.orderId}
                  </span>{" "}
                  untuk ditangani penanggung jawab manusia.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
