import React from "react";
import LogoPrecision from "./LogoPrecision";

export default function Footer() {
  return (
    <footer className="bg-motolantic-navyDark text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-3">
            <LogoPrecision variant="light" showTagline={true} />
            <p className="text-xs text-slate-300 leading-relaxed max-w-md pt-1">
              Motolantic membantu bengkel dan pemilik mobil menemukan serta
              memesan suku cadang melalui pemeriksaan kebutuhan, pencarian sumber,
              dan informasi biaya yang jelas.
            </p>
            <p className="text-xs font-bold text-motolantic-orange">
              “Mobilmu boleh langka. Jalan keluarnya harus ada.”
            </p>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">
              Identitas Usaha & Pengendalian Dokumen
            </h3>
            <p className="text-slate-300">
              <strong>Nama dalam perencanaan:</strong> PT Motolantic Teknologi
              Nusantara
            </p>
            <p className="text-slate-300">
              <strong>Penggagas dan Pendiri:</strong> Tydi Humaini (Ted/Tedy) ·
              Mekanik mobil berpengalaman
            </p>
            <p className="text-slate-300">
              <strong>Asisten Operasional Internal:</strong> MotoSol
            </p>
            <p className="text-slate-400">
              Acuan Identitas Usaha Versi 1.0 (21 Oktober 2026) & Ringkasan Proyek
              Revisi (12 Oktober 2026).
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">
              Batas Layanan Awal
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Motolantic tidak otomatis berperan sebagai produsen, distributor
              resmi, bengkel pemasang, importir tercatat, atau pemberi garansi
              pabrik kecuali dinyatakan secara tertulis pada transaksi terkait.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p>
            © 2026 Motolantic · PT Motolantic Teknologi Nusantara (Nama
            perusahaan dalam perencanaan sesuai arahan pendiri; pencantuman ini
            bukan pernyataan bahwa pendirian badan hukum telah selesai).
          </p>
          <p className="text-slate-500 font-mono">
            Prinsip: Berani membuka akses, teliti sebelum meminta pelanggan
            membayar.
          </p>
        </div>
      </div>
    </footer>
  );
}
