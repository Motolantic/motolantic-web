import { NextResponse } from "next/server";
import {
  calculateDeterministicQuote,
  enforceMAGSPermission,
} from "@/lib/deterministic-engine";
import { MTL_SIM_001_OFFERS } from "@/data/motolantic-data";

export const dynamic = "force-static";

export async function GET() {
  const sampleQuote = calculateDeterministicQuote(MTL_SIM_001_OFFERS[0].costInput);
  const sampleMagsCheck = enforceMAGSPermission("agen_ai", "skill.install");

  return NextResponse.json(
    {
      status: "ACTIVE",
      engine: "DETERMINISTIC_BACKEND_CODE",
      sampleQuoteOptionA: sampleQuote,
      sampleMagsEnforcement: sampleMagsCheck,
    },
    { status: 200 }
  );
}
