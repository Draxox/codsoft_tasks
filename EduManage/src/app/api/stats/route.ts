import { NextResponse } from "next/server";
import { eduStore } from "@/lib/data";

export async function GET() {
  const stats = eduStore.getStats();
  return NextResponse.json({ success: true, stats });
}
