// Status kecocokan resmi Motolantic (Kejujuran Epistemik - Tanpa Persentase Karangan)
export type EpistemicFitmentStatus =
  | "Terkonfirmasi berdasarkan bukti"
  | "Indikasi cocok tetapi perlu verifikasi tambahan"
  | "Belum dapat dipastikan";

// Tiga pintu masuk pencarian kebutuhan
export type SearchEntryMode = "part_number" | "component_photo" | "vehicle_data";

// Empat peran antarmuka dalam satu platform terpadu
export type UserRole = "pelanggan" | "staf_operasi" | "teknisi" | "pemilik";

// Kelompok produk prioritas
export type PriorityCategory =
  | "Kaki-kaki dan suspensi"
  | "Komponen mesin dan sistem pendukung"
  | "Kelistrikan kendaraan";

export interface VehicleFocus {
  brand: "Toyota" | "Mitsubishi" | "BYD";
  models: string[];
  evNotice?: string;
}

export interface CostComponents {
  itemPriceIdr: number;
  internationalShippingIdr: number;
  estimatedImportDutyIdr: number;
  localDeliveryIdr: number;
  serviceFeeUsd: number;
  lockedExchangeRateIdrPerUsd: number;
  isSimulation: boolean;
}

export interface CalculatedQuoteResult {
  itemPriceIdr: number;
  internationalShippingIdr: number;
  estimatedImportDutyIdr: number;
  localDeliveryIdr: number;
  serviceFeeIdr: number;
  totalIdr: number;
  calculationSource: "DETERMINISTIC_BACKEND_CODE";
  timestampIso: string;
  simulationNotice: string;
}

export interface SupplierOfferOption {
  id: "A" | "B" | "C";
  originLabel: string;
  condition: string;
  availabilityStatus: string;
  etaDaysRange: string;
  fitmentStatus: EpistemicFitmentStatus;
  fitmentEvidenceNote: string;
  costInput: CostComponents;
}

export interface TrackingMilestone {
  day: number;
  stage: string;
  evidenceOrAction: string;
  status: "completed" | "active" | "upcoming";
}

export interface CommunicationStandardItem {
  situation: string;
  responseTemplate: string;
  epistemicRule: string;
}

export interface AIWorkforceAgent {
  id: string;
  name: string;
  persona: string;
  allowedRead: string[];
  allowedWrite: string[];
  prohibitedActions: string[];
}

export interface MAGSGovernanceEvent {
  id: string;
  timestamp: string;
  actor: string;
  sourceContext: string;
  requestedPermission: string;
  httpStatus: 200 | 403;
  decision: "DIIZINKAN" | "DITOLAK";
  reason: string;
}
