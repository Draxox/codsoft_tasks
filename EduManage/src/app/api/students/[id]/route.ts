import { NextResponse } from "next/server";
import { eduStore } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const student = eduStore.getStudent(id);

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, student });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { action, status, subject, marks } = body;

    if (action === "ATTENDANCE") {
      eduStore.updateAttendance(id, status);
    } else if (action === "GRADE") {
      eduStore.updateGrade(id, subject, Number(marks));
    } else if (action === "PAY_FEE") {
      eduStore.payFee(id);
    }

    const updated = eduStore.getStudent(id);
    return NextResponse.json({ success: true, student: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update student" }, { status: 500 });
  }
}
