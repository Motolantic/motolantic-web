"use client";

import React, { useState } from "react";
import { UserRole, EpistemicFitmentStatus } from "@/types/motolantic";
import {
  COMMUNICATION_STANDARDS,
  AI_WORKFORCE_AGENTS,
  INITIAL_MAGS_LOGS,
} from "@/data/motolantic-data";
import {
  calculatePilotUnitEconomics,
  enforceMAGSPermission,
  formatIdr,
  PermissionCheckResult,
} from "@/lib/deterministic-engine";
import EpistemicBadge from "./EpistemicBadge";
import {
  Users,
  Wrench,
  Briefcase,
  Slack,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface RoleWorkspaceProps {
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export default function RoleWorkspace({
  activeRole,
  onSelectRole,
}: RoleWorkspaceProps) {
  const [techSelectedFitment, setTechSelectedFitment] =
    useState<EpistemicFitmentStatus>("Terkonfirmasi berdasarkan bukti");
  const [techNote, setTechNote] = useState(
    "Nomor komponen 4060A481 dan foto dudukan shockbreaker depan kiri cocok dengan spesifikasi Mitsubishi Xpander 2019 1.5L."
  );

  const [pilotCommissionUsd, setPilotCommissionUsd] = useState<3 | 4>(4);
  const pilotMetrics = calculatePilotUnitEconomics(pilotCommissionUsd, 1200000);

  const [permissionTestResult, setPermissionTestResult] =
    useState<PermissionCheckResult | null>(null);

  const triggerPermissionTest = (
    actor: UserRole | "agen_ai",
    action: string
  ) => {
    const res = enforceMAGSPermission(actor, action);
    setPermissionTestResult(res);
  };

  return (
    <section
      id="portal-peran"
      className="py-16 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-motolantic-orange">
              Satu Platform · Empat Antarmuka Peran · Governance Deterministik
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-motolantic-navy mt-1">
              Arsitektur Peran (RBAC), Tenaga Kerja AI & Asisten MotoSol
            </h2>
            <p className="text-sm text-motolantic-steel mt-1 max-w-3xl">
              Motolantic tidak dibangun sebagai empat website terpisah tanpa inti
              bersama. Seluruh peran berbagi satu sumber kebenaran bisnis
              (PostgreSQL), sementara izin dieksekusi secara deterministik di
              level backend melalui{" "}
              <strong className="text-motolantic-navy">
                MAGS (Motolantic Agent Governance System)
              </strong>
              .
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              id: "pelanggan" as UserRole,
              title: "1. Antarmuka Pelanggan",
              subtitle: "Pencarian, perbandingan penawaran, persetujuan & lacak",
              icon: Users,
            },
            {
              id: "staf_operasi" as UserRole,
              title: "2. Staf Operasional",
              subtitle: "Antrean order, komunikasi standar & koordinasi MotoSol",
              icon: Slack,
            },
            {
              id: "teknisi" as UserRole,
              title: "3. Teknisi Pemeriksa",
              subtitle: "Verifikasi kecocokan part, varian & validasi hipotesis AI",
              icon: Wrench,
            },
            {
              id: "pemilik" as UserRole,
              title: "4. Pemilik / Eksekutif",
              subtitle: "Keekonomian pilot, pengawasan MAGS & otoritas manusia",
              icon: Briefcase,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeRole === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onSelectRole(tab.id);
                  setPermissionTestResult(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  active
                    ? "bg-motolantic-navy text-white border-motolantic-navy shadow-md"
                    : "bg-motolantic-warmWhite text-motolantic-navy border-slate-200 hover:border-motolantic-orange"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-motolantic-orange">
                    {tab.title}
                  </span>
                  <Icon className="w-4 h-4 opacity-80" />
                </div>
                <p
                  className={`text-xs ${
                    active ? "text-slate-300" : "text-motolantic-steel"
                  }`}
                >
                  {tab.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-motolantic-warmWhite rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          {activeRole === "pelanggan" && (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-motolantic-navy">
                Hak Akses & Pengalaman Pelanggan (Bengkel Independen & Pemilik Mobil)
              </h3>
              <p className="text-sm text-motolantic-steel">
                Pelanggan hanya dapat mengakses permintaannya sendiri, melihat
                penawaran beserta dasar pemeriksaan kecocokan, menyetujui rincian
                biaya, dan memantau pengiriman yang telah terverifikasi.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-motolantic-navy block mb-1">
                    Cakupan Data Pelanggan
                  </span>
                  Mengajukan kebutuhan via Nomor Part, Foto Komponen, atau Data
                  Mobil; menerima rincian biaya transparan; mengikuti status order
                  pribadi.
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-motolantic-navy block mb-1">
                    Perlindungan Kejujuran Epistemik
                  </span>
                  Tidak pernah disuguhi persentase kecocokan karangan atau janji
                  stok palsu. Setiap perubahan biaya/ETA wajib disertai alasan.
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-motolantic-navy block mb-1">
                    Uji Batas Izin Backend (RBAC)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      triggerPermissionTest("pelanggan", "refund.execute")
                    }
                    className="mt-1 px-3 py-1.5 rounded bg-motolantic-navy text-white font-semibold hover:bg-slate-800"
                  >
                    Simulasikan Aksi Terlarang: Eksekusi Refund Sendiri
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRole === "staf_operasi" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-motolantic-navy">
                    Meja Kerja Staf Operasional & Asisten Internal MotoSol (Slack)
                  </h3>
                  <p className="text-xs text-motolantic-steel">
                    Mengelola antrean permintaan, dokumen pengiriman, dan menjaga
                    standar suara merek Motolantic.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-motolantic-navy text-cyan-300 text-xs font-bold">
                  MotoSol: Aktif Membantu Koordinasi Internal
                </span>
              </div>

              <div className="bg-motolantic-navy text-white rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-motolantic-orange">
                  <Slack className="w-4 h-4" />
                  <span>Ringkasan Asisten Operasional Internal MotoSol (via Slack)</span>
                </div>
                <p className="text-xs text-slate-200 font-mono leading-relaxed">
                  [MotoSol #ops-motolantic]: “Pagi tim! Order simulasi{" "}
                  <strong>MTL-SIM-001</strong> (Shockbreaker Depan Kiri Xpander
                  2019 - Bandung) berada di Hari 4 (Dalam pengiriman
                  internasional). Bukti resi pemasok Jepang sudah diunggah. Ingat:
                  MotoSol hanya merangkum status dan menyiapkan pengingat;
                  persetujuan komisi dan perubahan komitmen pelanggan tetap berada
                  pada otoritas manusia yang ditunjuk.”
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-motolantic-navy">
                  Standar Komunikasi Resmi (5 Situasi Kritis Layanan)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {COMMUNICATION_STANDARDS.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5"
                    >
                      <span className="text-xs font-extrabold uppercase text-motolantic-orange">
                        Situasi {idx + 1}: {item.situation}
                      </span>
                      <p className="text-xs font-medium text-motolantic-navy italic">
                        “{item.responseTemplate}”
                      </p>
                      <p className="text-[11px] text-motolantic-steel">
                        <strong>Prinsip:</strong> {item.epistemicRule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeRole === "teknisi" && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-extrabold text-motolantic-navy">
                  Konsol Pemeriksaan Teknis & Validasi Hipotesis AI
                </h3>
                <p className="text-xs text-motolantic-steel">
                  Teknisi memeriksa varian, posisi pemasangan, dudukan, dan nomor
                  pengganti. Teknisi berhak mengonfirmasi atau menolak hipotesis
                  Agen Part, tetapi tidak memiliki wewenang pencairan dana (HTTP 403).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-motolantic-navy">
                    Penetapan Status Kecocokan Berbasis Bukti (MTL-SIM-001)
                  </h4>

                  <div>
                    <label className="block text-xs font-bold uppercase text-motolantic-steel mb-1.5">
                      Pilih Status Pemeriksaan Resmi (Tanpa Persentase Karangan)
                    </label>
                    <select
                      value={techSelectedFitment}
                      onChange={(e) =>
                        setTechSelectedFitment(
                          e.target.value as EpistemicFitmentStatus
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                    >
                      <option value="Terkonfirmasi berdasarkan bukti">
                        Terkonfirmasi berdasarkan bukti
                      </option>
                      <option value="Indikasi cocok tetapi perlu verifikasi tambahan">
                        Indikasi cocok tetapi perlu verifikasi tambahan
                      </option>
                      <option value="Belum dapat dipastikan">
                        Belum dapat dipastikan
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-motolantic-steel mb-1.5">
                      Catatan Bukti Pemeriksaan Teknisi
                    </label>
                    <textarea
                      rows={3}
                      value={techNote}
                      onChange={(e) => setTechNote(e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="pt-1">
                    <EpistemicBadge status={techSelectedFitment} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-motolantic-navy">
                      Batas Otoritas Teknisi (Pemisahan Peran Backend)
                    </h4>
                    <p className="text-xs text-motolantic-steel leading-relaxed">
                      Sesuai dokumen arsitektur: jika teknisi mencoba menyetujui
                      pengembalian dana (refund) tanpa hak yang sesuai, backend
                      menolak dengan <strong>HTTP 403 Forbidden</strong>. Uji
                      kontrol deterministik tersebut melalui tombol di bawah:
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        triggerPermissionTest("teknisi", "part.verify_fitment")
                      }
                      className="px-3.5 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800"
                    >
                      Uji Aksi Sah: Verifikasi Kecocokan Part (HTTP 200)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        triggerPermissionTest("teknisi", "refund.execute")
                      }
                      className="px-3.5 py-2 rounded-lg bg-rose-700 text-white text-xs font-bold hover:bg-rose-800"
                    >
                      Uji Aksi Terlarang: Setujui Refund (HTTP 403)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRole === "pemilik" && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-extrabold text-motolantic-navy">
                  Ruang Kendali Pemilik / Eksekutif (Tydi Humaini) · Keekonomian & MAGS
                </h3>
                <p className="text-xs text-motolantic-steel">
                  Manusia memegang kepemilikan perusahaan dan tanggung jawab
                  keputusan berdampak tinggi. Memantau keekonomian unit pilot,
                  matriks wewenang agen AI, dan jejak audit MAGS.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-motolantic-navy">
                      Simulasi Keekonomian Per Order (Pilot)
                    </h4>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setPilotCommissionUsd(3)}
                        className={`px-2.5 py-1 rounded text-xs font-bold ${
                          pilotCommissionUsd === 3
                            ? "bg-motolantic-orange text-white"
                            : "bg-slate-100 text-motolantic-navy"
                        }`}
                      >
                        USD 3
                      </button>
                      <button
                        type="button"
                        onClick={() => setPilotCommissionUsd(4)}
                        className={`px-2.5 py-1 rounded text-xs font-bold ${
                          pilotCommissionUsd === 4
                            ? "bg-motolantic-orange text-white"
                            : "bg-slate-100 text-motolantic-navy"
                        }`}
                      >
                        USD 4
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-200 text-xs">
                    <div className="py-2 flex justify-between">
                      <span>
                        Pendapatan layanan (USD {pilotMetrics.commissionUsd} × Rp16.000)
                      </span>
                      <span className="font-mono font-bold">
                        {formatIdr(pilotMetrics.serviceRevenueIdr)}
                      </span>
                    </div>
                    <div className="py-2 flex justify-between text-motolantic-steel">
                      <span>Biaya pembayaran / admin</span>
                      <span className="font-mono">
                        - {formatIdr(pilotMetrics.paymentAdminCostIdr)}
                      </span>
                    </div>
                    <div className="py-2 flex justify-between text-motolantic-steel">
                      <span>Alokasi kerja operasi</span>
                      <span className="font-mono">
                        - {formatIdr(pilotMetrics.opsWorkCostIdr)}
                      </span>
                    </div>
                    <div className="py-2 flex justify-between text-motolantic-steel">
                      <span>Alokasi penanganan masalah</span>
                      <span className="font-mono">
                        - {formatIdr(pilotMetrics.issueAllocationCostIdr)}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between font-extrabold text-motolantic-navy text-sm">
                      <span>Sisa Kontribusi Hipotetis / Order</span>
                      <span className="font-mono text-emerald-700">
                        {formatIdr(pilotMetrics.remainingContributionIdr)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-motolantic-warmWhite border border-slate-200 text-[11px] text-motolantic-steel">
                    Jika biaya tetap hipotetis{" "}
                    <strong>{formatIdr(pilotMetrics.monthlyFixedCostIdr)}/bulan</strong>,
                    kontribusi{" "}
                    <strong>{formatIdr(pilotMetrics.remainingContributionIdr)}</strong>{" "}
                    membutuhkan sekitar{" "}
                    <strong className="text-motolantic-navy">
                      {pilotMetrics.breakEvenOrders} order
                    </strong>{" "}
                    untuk menutupnya. (Hitungan ilustratif; disiplin modal awal di
                    bawah Rp5.000.000 menghindari stok spekulatif).
                  </div>
                </div>

                <div className="lg:col-span-7 bg-motolantic-navy text-white p-5 rounded-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-extrabold text-motolantic-orange uppercase tracking-wider">
                        MAGS (Motolantic Agent Governance System) · Audit Log
                      </h4>
                      <p className="text-xs text-slate-300">
                        Penegakan aturan dilakukan oleh kode deterministik di luar
                        model bahasa.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        triggerPermissionTest("agen_ai", "skill.install")
                      }
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                    >
                      Uji Blokir Deterministik: skill.install (Agen AI)
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {INITIAL_MAGS_LOGS.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-lg bg-motolantic-navyDark border border-slate-800 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-cyan-300">
                            {log.id} · {log.actor}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 font-mono font-bold">
                            HTTP {log.httpStatus} {log.decision}
                          </span>
                        </div>
                        <p className="text-slate-300 font-mono text-[11px]">
                          Izin diminta: <strong>{log.requestedPermission}</strong> |{" "}
                          {log.sourceContext}
                        </p>
                        <p className="text-slate-400 text-[11px]">{log.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-motolantic-navy">
                  Matriks Wewenang Tenaga Kerja AI & Batas Eksekusi
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {AI_WORKFORCE_AGENTS.map((agent) => (
                    <div
                      key={agent.id}
                      className="bg-white p-4 rounded-xl border border-slate-200 text-xs flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <span className="font-extrabold text-motolantic-navy block">
                          {agent.name}
                        </span>
                        <p className="text-[11px] text-motolantic-steel mt-1">
                          {agent.persona}
                        </p>
                      </div>
                      <div className="space-y-1.5 border-t border-slate-100 pt-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                            Keluaran yang Diizinkan:
                          </span>
                          <span className="text-[11px] text-motolantic-navy">
                            {agent.allowedWrite.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase text-rose-700 block">
                            Dilarang Keras:
                          </span>
                          <span className="text-[11px] text-motolantic-steel">
                            {agent.prohibitedActions.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {permissionTestResult && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 text-xs font-mono ${
                permissionTestResult.allowed
                  ? "bg-emerald-950 text-emerald-200 border-emerald-500"
                  : "bg-rose-950 text-rose-200 border-rose-500"
              }`}
            >
              {permissionTestResult.allowed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-bold">
                  RESPONS BACKEND DETERMINISTIK [{permissionTestResult.code}]
                </div>
                <div>{permissionTestResult.message}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
