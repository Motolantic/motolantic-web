import React from "react";
import { EpistemicFitmentStatus } from "@/types/motolantic";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

interface EpistemicBadgeProps {
  status: EpistemicFitmentStatus;
}

/**
 * Standar Kejujuran Epistemik Motolantic (Dokumen Identitas v1.0 Bagian 7.3 & 14):
 * - Dilarang memakai persentase keyakinan karangan.
 * - Status penting tidak disampaikan melalui warna saja; wajib menyertakan label teks resmi.
 */
export default function EpistemicBadge({ status }: EpistemicBadgeProps) {
  if (status === "Terkonfirmasi berdasarkan bukti") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-200 border border-emerald-500/40">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Status Kecocokan: Terkonfirmasi berdasarkan bukti</span>
      </span>
    );
  }

  if (status === "Indikasi cocok tetapi perlu verifikasi tambahan") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/90 text-amber-200 border border-amber-500/40">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          Status Kecocokan: Indikasi cocok tetapi perlu verifikasi tambahan
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-600">
      <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      <span>Status Kecocokan: Belum dapat dipastikan</span>
    </span>
  );
}
