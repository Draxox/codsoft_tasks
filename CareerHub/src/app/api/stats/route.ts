import { NextResponse } from "next/server";
import { careerStore } from "@/lib/data";

export async function GET() {
  const stats = careerStore.getStats();
  return NextResponse.json({ success: true, stats });
}
