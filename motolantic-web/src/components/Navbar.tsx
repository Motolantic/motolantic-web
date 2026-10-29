"use client";

import React from "react";
import LogoPrecision from "./LogoPrecision";
import { UserRole } from "@/types/motolantic";
import { ShieldCheck, MessageSquare } from "lucide-react";

interface NavbarProps {
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

const ROLE_LABELS: { id: UserRole; label: string }[] = [
  { id: "pelanggan", label: "Antarmuka Pelanggan" },
  { id: "staf_operasi", label: "Staf Operasional (+MotoSol)" },
  { id: "teknisi", label: "Teknisi Pemeriksa" },
  { id: "pemilik", label: "Pemilik / Eksekutif (+MAGS)" },
];

export default function Navbar({ activeRole, onSelectRole }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-motolantic-navy/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-3.5 gap-4">
          <a href="#top" className="focus:outline-none">
            <LogoPrecision variant="light" showTagline={true} />
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-200">
            <a
              href="#cari-sparepart"
              className="hover:text-motolantic-orange transition-colors"
            >
              Cari Sparepart
            </a>
            <a
              href="#simulasi-order"
              className="hover:text-motolantic-orange transition-colors"
            >
              Simulasi 4 Tahap (MTL-SIM-001)
            </a>
            <a
              href="#fokus-kendaraan"
              className="hover:text-motolantic-orange transition-colors"
            >
              Fokus Kendaraan
            </a>
            <a
              href="#portal-peran"
              className="hover:text-motolantic-orange transition-colors"
            >
              Arsitektur 4 Peran & MAGS
            </a>
            <a
              href="#tentang-kami"
              className="hover:text-motolantic-orange transition-colors"
            >
              Tentang Kami
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-motolantic-navyDark border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-motolantic-orange mr-1.5 shrink-0" />
              <label htmlFor="rbac-select" className="sr-only">
                Pilih Peran RBAC
              </label>
              <select
                id="rbac-select"
                value={activeRole}
                onChange={(e) => onSelectRole(e.target.value as UserRole)}
                className="bg-transparent text-slate-100 font-medium focus:outline-none cursor-pointer"
              >
                {ROLE_LABELS.map((r) => (
                  <option
                    key={r.id}
                    value={r.id}
                    className="bg-motolantic-navy text-white"
                  >
                    Peran: {r.label}
                  </option>
                ))}
              </select>
            </div>

            <a
              href="#cari-sparepart"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-cyan-400/60 text-cyan-200 hover:bg-cyan-950/60 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Konsultasi</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
