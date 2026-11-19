import { NextResponse } from "next/server";
import { eduStore } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const grade = searchParams.get("grade");
  const feeStatus = searchParams.get("feeStatus");

  let students = eduStore.getStudents();

  if (grade && grade !== "ALL") {
    students = students.filter((s) => s.gradeClass === grade);
  }

  if (feeStatus && feeStatus !== "ALL") {
    students = students.filter((s) => s.feeStatus === feeStatus);
  }

  return NextResponse.json({ success: true, students });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, gradeClass, parentPhone } = body;

    if (!name || !email || !gradeClass) {
      return NextResponse.json({ error: "Name, Email, and Grade Class are required" }, { status: 400 });
    }

    const rollNumber = `STU-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newStudent = eduStore.addStudent({
      rollNumber,
      name,
      email,
      gradeClass,
      parentPhone: parentPhone || "+91 98000 00000",
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      feeStatus: "PENDING",
      feeAmount: gradeClass.includes("11") || gradeClass.includes("12") ? 52000 : 45000,
    });

    return NextResponse.json({ success: true, student: newStudent }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create student" }, { status: 500 });
  }
}
