import { NextResponse } from "next/server";
import { eduStore } from "@/lib/data";

export async function GET() {
  const teachers = eduStore.getTeachers();
  return NextResponse.json({ success: true, teachers });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, department, phone, classes } = body;

    if (!name || !email || !department) {
      return NextResponse.json({ error: "Name, email, and department are required" }, { status: 400 });
    }

    const employeeId = `TCH-${Math.floor(500 + Math.random() * 500)}`;
    const newTeacher = eduStore.addTeacher({
      employeeId,
      name,
      email,
      department,
      phone: phone || "+91 98000 11111",
      classes: classes || "Grade 10-A",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    });

    return NextResponse.json({ success: true, teacher: newTeacher }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create teacher" }, { status: 500 });
  }
}
