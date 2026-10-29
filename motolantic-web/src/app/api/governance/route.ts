import { NextResponse } from "next/server";
import {
  calculateDeterministicQuote,
  enforceMAGSPermission,
} from "@/lib/deterministic-engine";
import { CostComponents, UserRole } from "@/types/motolantic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.type === "CHECK_PERMISSION") {
      const actor = body.actor as UserRole | "agen_ai";
      const action = body.action as string;
      const result = enforceMAGSPermission(actor, action);

      return NextResponse.json(result, { status: result.httpStatus });
    }

    if (body.type === "CALCULATE_QUOTE") {
      const costInput = body.costInput as CostComponents;
      const quote = calculateDeterministicQuote(costInput);
      return NextResponse.json(quote, { status: 200 });
    }

    return NextResponse.json(
      { error: "Tipe permintaan API tidak dikenal." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Kesalahan pemrosesan permintaan deterministik." },
      { status: 500 }
    );
  }
}
