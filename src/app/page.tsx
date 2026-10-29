"use client";

import React, { useState } from "react";
import { UserRole } from "@/types/motolantic";
import {
  PRIORITY_VEHICLES,
  PRIORITY_CATEGORIES,
} from "@/data/motolantic-data";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import OrderLabPrototype from "@/components/OrderLabPrototype";
import RoleWorkspace from "@/components/RoleWorkspace";
import Footer from "@/components/Footer";
import { Wrench, ShieldCheck, Layers, CarFront } from "lucide-react";

export default function MotolanticHomePage() {
  const [activeRole, setActiveRole] = useState<UserRole>("pelanggan");
  const [customRequestNote, setCustomRequestNote] = useState<string | null>(
    null
  );

  const handleTriggerOrderLab = (summary: string) => {
    setCustomRequestNote(summary);
    const el = document.getElementById("simulasi-order");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <Navbar activeRole={activeRole} onSelectRole={setActiveRole} />

      <main className="flex-grow">
        <HeroSearch onTriggerOrderLab={handleTriggerOrderLab} />

        <OrderLabPrototype customRequestNote={customRequestNote} />

        <section
          id="fokus-kendaraan"
          className="py-16 bg-motolantic-warmWhite border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-motolantic-orange">
                Disiplin Ruang Lingkup Awal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-motolantic-navy mt-1">
                Kelompok Produk Prioritas & Fokus Kendaraan
              </h2>
              <p className="text-sm text-motolantic-steel mt-1">
                Motolantic memulai dari kebutuhan nyata bengkel independen dan
                pemilik mobil tanpa membuka seluruh kategori sekaligus atau
                menyimpan stok spekulatif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRIORITY_CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2"
                >
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-motolantic-navy text-motolantic-orange">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-motolantic-navy">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-semibold text-motolantic-orange">
                    Contoh: {cat.examples}
                  </p>
                  <p className="text-xs text-motolantic-steel leading-relaxed">
                    {cat.verificationFocus}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRIORITY_VEHICLES.map((v) => (
                <div
                  key={v.brand}
                  className="bg-motolantic-navy text-white rounded-2xl p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold">{v.brand}</span>
                    <CarFront className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {v.models.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-100"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  {v.evNotice && (
                    <p className="text-[11px] text-amber-200 bg-amber-950/60 border border-amber-500/30 p-2.5 rounded-lg leading-relaxed">
                      {v.evNotice}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <RoleWorkspace activeRole={activeRole} onSelectRole={setActiveRole} />

        <section id="tentang-kami" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-motolantic-orange">
                  Siapa Motolantic · Acuan Identitas v1.0 (21 Oktober 2026)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-motolantic-navy">
                  Berangkat dari Pengalaman Mekanik Bengkel, Diperkuat Teknologi
                  yang Bertanggung Jawab
                </h2>
                <p className="text-sm text-motolantic-steel leading-relaxed">
                  Motolantic adalah startup Indonesia yang mengembangkan layanan
                  pencarian dan pengadaan suku cadang otomotif dengan
                  menggabungkan keahlian bengkel dan teknologi digital. Didirikan
                  sebagai gagasan usaha oleh{" "}
                  <strong className="text-motolantic-navy">
                    Tydi Humaini (Ted/Tedy)
                  </strong>
                  , seorang mekanik mobil berpengalaman, Motolantic berfokus
                  membantu bengkel independen serta pemilik kendaraan memahami
                  komponen yang dibutuhkan, menelusuri pilihan sumber global, dan
                  merencanakan pemesanan dengan informasi yang jelas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      title: "1. Kejelasan Komponen",
                      desc: "Apa yang sebenarnya dibutuhkan kendaraan berdasarkan diagnosis yang terverifikasi.",
                    },
                    {
                      title: "2. Kejelasan Kecocokan",
                      desc: "Bukti nomor part, varian, dan posisi yang mendukung aplikasi pada kendaraan.",
                    },
                    {
                      title: "3. Kejelasan Sumber",
                      desc: "Siapa pemasoknya, bagaimana kondisinya, dan kapan stok terakhir dikonfirmasi.",
                    },
                    {
                      title: "4. Kejelasan Transaksi & Tindak Lanjut",
                      desc: "Rincian biaya deterministik serta penanggung jawab pesanan hingga barang diterima.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-motolantic-warmWhite border border-slate-200"
                    >
                      <h3 className="text-xs font-extrabold uppercase text-motolantic-navy">
                        {item.title}
                      </h3>
                      <p className="text-xs text-motolantic-steel mt-1">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-motolantic-navy text-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-motolantic-orange text-white">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">
                      Profil Penggagas & Pendiri
                    </h3>
                    <p className="text-xs text-cyan-300">
                      Tydi Humaini (Ted / Tedy)
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Pengalaman praktis sebagai mekanik mobil menjadi dasar layanan
                  Motolantic: membaca foto part lama, membedakan varian mesin,
                  memeriksa sisi pemasangan kiri/kanan, dan menanyakan data
                  tambahan sebelum komponen dinyatakan sesuai.
                </p>
                <div className="border-t border-slate-800 pt-3 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-motolantic-orange shrink-0" />
                    <span>
                      <strong>Visi:</strong> Menjadi penghubung tepercaya antara
                      kebutuhan suku cadang otomotif di Indonesia dan sumber
                      pengadaan global.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-motolantic-orange shrink-0" />
                    <span>
                      <strong>Prinsip Kerja:</strong> Berani membuka akses,
                      teliti sebelum meminta pelanggan membayar.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
