import {
  CostComponents,
  CalculatedQuoteResult,
  UserRole,
} from "@/types/motolantic";

/**
 * PRINSIP DETERMINISTIK MOTOLANTIC:
 * "AI merekomendasikan. Kode menghitung. Database mencatat."
 * Fungsi ini memastikan tidak ada harga total yang dikarang oleh LLM/AI.
 */
export function calculateDeterministicQuote(
  input: CostComponents
): CalculatedQuoteResult {
  const itemPriceIdr = Math.round(input.itemPriceIdr);
  const internationalShippingIdr = Math.round(input.internationalShippingIdr);
  const estimatedImportDutyIdr = Math.round(input.estimatedImportDutyIdr);
  const localDeliveryIdr = Math.round(input.localDeliveryIdr);

  // Perhitungan biaya layanan / komisi deterministik berdasarkan kurs yang dikunci
  const serviceFeeIdr = Math.round(
    input.serviceFeeUsd * input.lockedExchangeRateIdrPerUsd
  );

  const totalIdr =
    itemPriceIdr +
    internationalShippingIdr +
    estimatedImportDutyIdr +
    localDeliveryIdr +
    serviceFeeIdr;

  return {
    itemPriceIdr,
    internationalShippingIdr,
    estimatedImportDutyIdr,
    localDeliveryIdr,
    serviceFeeIdr,
    totalIdr,
    calculationSource: "DETERMINISTIC_BACKEND_CODE",
    timestampIso: new Date().toISOString(),
    simulationNotice: input.isSimulation
      ? "Angka simulasi (Kurs dikunci Rp16.000/USD untuk ilustrasi; biaya masuk barang bersifat estimasi belum diverifikasi pajak/bea resmi)."
      : "Perhitungan terverifikasi sistem produksi.",
  };
}

/**
 * Kalkulator Keekonomian Unit Pilot (Sesuai Dokumen Revisi Hal. 25)
 */
export function calculatePilotUnitEconomics(
  commissionUsd: 3 | 4,
  monthlyFixedCostIdr: number = 1200000
) {
  const lockedRate = 16000;
  const serviceRevenueIdr = commissionUsd * lockedRate;
  const paymentAdminCostIdr = 10000;
  const opsWorkCostIdr = 15000;
  const issueAllocationCostIdr = 10000;

  const remainingContributionIdr =
    serviceRevenueIdr -
    (paymentAdminCostIdr + opsWorkCostIdr + issueAllocationCostIdr);

  const breakEvenOrders = Math.ceil(
    monthlyFixedCostIdr / remainingContributionIdr
  );

  return {
    commissionUsd,
    lockedRate,
    serviceRevenueIdr,
    paymentAdminCostIdr,
    opsWorkCostIdr,
    issueAllocationCostIdr,
    remainingContributionIdr,
    monthlyFixedCostIdr,
    breakEvenOrders,
  };
}

/**
 * MAGS (Motolantic Agent Governance System) & RBAC Permission Enforcer
 * Menolak aksi di luar wewenang dengan HTTP 403 deterministik.
 */
export interface PermissionCheckResult {
  allowed: boolean;
  httpStatus: 200 | 403;
  code: string;
  message: string;
}

const ROLE_PERMISSIONS: Record<UserRole | "agen_ai", string[]> = {
  pelanggan: [
    "request.create",
    "quote.view",
    "order.approve_own",
    "tracking.view_own",
  ],
  staf_operasi: [
    "request.read_all",
    "supplier.evaluate",
    "shipping.update_with_evidence",
    "ticket.manage",
  ],
  teknisi: [
    "part.verify_fitment",
    "part.confirm_oem_replacement",
    "ai_hypothesis.review",
  ],
  pemilik: [
    "finance.approve_high_impact",
    "refund.execute",
    "mags.override_policy",
    "audit.read_all",
  ],
  agen_ai: [
    "part.recommend_hypothesis",
    "supplier.search_candidates",
    "price.draft_analysis",
    "logistics.flag_delay",
  ],
};

export function enforceMAGSPermission(
  actor: UserRole | "agen_ai",
  action: string
): PermissionCheckResult {
  // Aturan mutlak: instalasi kemampuan mandiri ke produksi selalu ditolak untuk agen
  if (action === "skill.install" && actor === "agen_ai") {
    return {
      allowed: false,
      httpStatus: 403,
      code: "MAGS_ERR_SKILL_INSTALL_FORBIDDEN",
      message:
        "HTTP 403 Forbidden: Kontrol deterministik MAGS menolak instalasi kemampuan mandiri (skill.install) oleh agen AI. Insiden diteruskan ke Koordinator dan Pemilik.",
    };
  }

  const allowedList = ROLE_PERMISSIONS[actor] || [];
  if (!allowedList.includes(action)) {
    return {
      allowed: false,
      httpStatus: 403,
      code: "RBAC_ERR_UNAUTHORIZED_ACTION",
      message: `HTTP 403 Forbidden: Peran '${actor}' tidak memiliki otoritas untuk mengeksekusi '${action}'. Menyembunyikan tombol di UI tidak cukup; backend menolak aksi ini secara deterministik.`,
    };
  }

  return {
    allowed: true,
    httpStatus: 200,
    code: "MAGS_OK_AUTHORIZED",
    message: `HTTP 200 OK: Aksi '${action}' diizinkan untuk peran '${actor}' dan dicatat ke jejak audit.`,
  };
}

export function formatIdr(amount: number): string {
  return "Rp" + amount.toLocaleString("id-ID");
}
