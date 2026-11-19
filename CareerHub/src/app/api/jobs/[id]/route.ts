import { NextResponse } from "next/server";
import { careerStore } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const job = careerStore.getJob(id);

  if (!job) {
    return NextResponse.json({ error: "Job listing not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, job });
}
