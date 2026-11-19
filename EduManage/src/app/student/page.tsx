"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  GraduationCap,
  Award,
  CalendarCheck2,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  QrCode,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import RoleGuard from "@/components/RoleGuard";

function StudentContent() {
  const { currentUser } = useAuth();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("stu-1");
  const [student, setStudent] = useState<any>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccessMsg, setPaySuccessMsg] = useState("");

  const loadData = async () => {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      if (data.students) {
        setAllStudents(data.students);
        const authMatch = currentUser.role === "STUDENT"
          ? data.students.find((s: any) => s.email === currentUser.email || s.rollNumber === currentUser.rollNumber)
          : null;
        const targetId = authMatch ? authMatch.id : (idParam || selectedStudentId || data.students[0]?.id);
        setSelectedStudentId(targetId);
        const found = data.students.find((s: any) => s.id === targetId) || data.students[0];
        setStudent(found);
      }
    } catch (err) {
      console.error("Failed to load student", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [idParam, selectedStudentId]);

  const handlePayFee = async () => {
    if (!student) return;
    setIsPaying(true);
    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "PAY_FEE" }),
      });
      const data = await res.json();
      if (data.student) {
        setStudent(data.student);
        setPaySuccessMsg(`Tuition fee of ${formatCurrency(data.student.feeAmount)} successfully paid!`);
      }
    } catch (err) {
      console.error("Failed to pay fee", err);
    } finally {
      setIsPaying(false);
    }
  };

  if (!student) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xs text-slate-400">
        Loading student record...
      </div>
    );
  }

  const totalMarks = student.grades?.reduce((sum: number, g: any) => sum + g.marks, 0) || 0;
  const maxPossible = (student.grades?.length || 4) * 100;
  const overallPercentage = Math.round((totalMarks / maxPossible) * 100);

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Profile Card & Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <Image src={student.avatar} alt={student.name} fill className="object-cover" unoptimized />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{student.name}</h1>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold">
                {student.gradeClass}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 space-x-2">
              <span>Roll Number: <strong className="font-mono text-slate-800">{student.rollNumber}</strong></span>
              <span>&bull;</span>
              <span>Official Email: <strong className="text-slate-800">{student.email}</strong></span>
            </p>
          </div>
        </div>

        {/* Switch Student Preview Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Switch Student:</label>
          <select
            value={student.id}
            onChange={(e) => {
              setSelectedStudentId(e.target.value);
              const found = allStudents.find((s) => s.id === e.target.value);
              if (found) setStudent(found);
            }}
            className="text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {allStudents.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.rollNumber})
              </option>
            ))}
          </select>
        </div>
      </div>

      {paySuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{paySuccessMsg}</span>
        </div>
      )}

      {/* Grid: Attendance & Tuition Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarCheck2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Attendance Record</h2>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                student.attendanceRate >= 75
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {student.attendanceRate >= 75 ? "Exam Eligible" : "Attendance Warning"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-3xl font-black text-slate-900">{student.attendanceRate}%</span>
              <p className="text-xs text-slate-500 mt-0.5">Overall Academic Term Rate</p>
            </div>
            <div className="w-24 bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  student.attendanceRate >= 90 ? "bg-emerald-500" : "bg-amber-500"
                }`}
                style={{ width: `${student.attendanceRate}%` }}
              />
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Recent Roll Call History
            </h4>
            <div className="flex flex-wrap gap-2">
              {student.attendances?.map((att: any, idx: number) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border flex items-center gap-1.5 ${
                    att.status === "PRESENT"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : att.status === "LATE"
                      ? "bg-amber-50 border-amber-200 text-amber-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{att.date}: {att.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tuition Fee Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Tuition & Term Fee</h2>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                student.feeStatus === "PAID"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {student.feeStatus}
            </span>
          </div>

          <div className="py-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Annual Tuition Fee
            </span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">
              {formatCurrency(student.feeAmount)}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              {student.feeStatus === "PAID"
                ? `Cleared & verified on ${student.feePaidDate}`
                : "Term payment is due"}
            </p>
          </div>

          {student.feeStatus !== "PAID" ? (
            <button
              onClick={handlePayFee}
              disabled={isPaying}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition"
            >
              <CreditCard className="w-4 h-4" />
              {isPaying ? "Processing Payment..." : "Pay Tuition Fee Online"}
            </button>
          ) : (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 font-bold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Tuition Fee Cleared in Full
              </span>
              <button
                onClick={() => window.print()}
                className="text-[11px] underline hover:text-emerald-900 flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" /> Print Receipt
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Examination Academic Report Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
              <Award className="w-4 h-4" />
              Mid-Term Academic Assessment
            </div>
            <h2 className="text-xl font-black text-slate-900">Official Report Card</h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200">
              Total Score: {totalMarks} / {maxPossible}
            </span>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200">
              Aggregate: {overallPercentage}% (Distinction)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Subject</th>
                <th className="py-3 px-6">Marks Obtained</th>
                <th className="py-3 px-6">Maximum Marks</th>
                <th className="py-3 px-6">Letter Grade</th>
                <th className="py-3 px-6 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {student.grades?.map((g: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 font-bold text-slate-900">{g.subject}</td>
                  <td className="py-4 px-6 font-black text-indigo-600 text-sm">{g.marks}</td>
                  <td className="py-4 px-6 text-slate-500 font-mono">100</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-md font-extrabold text-xs ${
                        g.grade === "A+"
                          ? "bg-purple-100 text-purple-800"
                          : g.grade === "A"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {g.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-slate-500">
                    {g.marks >= 90 ? "Outstanding" : g.marks >= 80 ? "Very Good" : "Satisfactory"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </RoleGuard>
  );
}

export default function StudentPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading student portal...</div>}>
      <StudentContent />
    </Suspense>
  );
}
