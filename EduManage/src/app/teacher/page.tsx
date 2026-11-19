"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  UserCheck,
  CalendarCheck2,
  Award,
  Check,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  Save,
  CheckCircle2,
} from "lucide-react";

import RoleGuard from "@/components/RoleGuard";

export default function TeacherPortalPage() {
  const [selectedClass, setSelectedClass] = useState<string>("Grade 10-A");
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceState, setAttendanceState] = useState<{ [key: string]: "PRESENT" | "ABSENT" | "LATE" }>({});
  const [activeTab, setActiveTab] = useState<"attendance" | "grades">("attendance");

  const [selectedSubject, setSelectedSubject] = useState<string>("Mathematics");
  const [gradeInputs, setGradeInputs] = useState<{ [key: string]: number }>({});
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");

  const loadStudents = async () => {
    try {
      const res = await fetch(`/api/students?grade=${selectedClass}`);
      const data = await res.json();
      if (data.students) {
        setStudents(data.students);

        // Pre-fill attendance state
        const initialAtt: { [key: string]: "PRESENT" | "ABSENT" | "LATE" } = {};
        const initialGrades: { [key: string]: number } = {};

        data.students.forEach((s: any) => {
          initialAtt[s.id] = s.attendances?.[0]?.status || "PRESENT";
          const matchGrade = s.grades?.find((g: any) => g.subject.toLowerCase() === selectedSubject.toLowerCase());
          initialGrades[s.id] = matchGrade ? matchGrade.marks : 85;
        });

        setAttendanceState(initialAtt);
        setGradeInputs(initialGrades);
      }
    } catch (err) {
      console.error("Failed to load students", err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [selectedClass]);

  const handleAttendanceChange = (studentId: string, status: "PRESENT" | "ABSENT" | "LATE") => {
    setAttendanceState((prev) => ({ ...prev, [studentId]: status }));
  };

  const markAllPresent = () => {
    const updated: { [key: string]: "PRESENT" | "ABSENT" | "LATE" } = {};
    students.forEach((s) => (updated[s.id] = "PRESENT"));
    setAttendanceState(updated);
  };

  const handleSaveAttendance = async () => {
    try {
      await Promise.all(
        Object.entries(attendanceState).map(([studentId, status]) =>
          fetch(`/api/students/${studentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "ATTENDANCE", status }),
          })
        )
      );
      setSaveSuccessMsg(`Attendance for ${selectedClass} successfully saved!`);
      setTimeout(() => setSaveSuccessMsg(""), 3500);
      loadStudents();
    } catch (err) {
      console.error("Failed to save attendance", err);
    }
  };

  const handleSaveGrade = async (studentId: string) => {
    try {
      const marks = gradeInputs[studentId] || 85;
      await fetch(`/api/students/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "GRADE",
          subject: selectedSubject,
          marks,
        }),
      });
      setSaveSuccessMsg(`Grade for student updated to ${marks}/100!`);
      setTimeout(() => setSaveSuccessMsg(""), 3000);
      loadStudents();
    } catch (err) {
      console.error("Failed to save grade", err);
    }
  };

  const presentCount = Object.values(attendanceState).filter((s) => s === "PRESENT").length;
  const absentCount = Object.values(attendanceState).filter((s) => s === "ABSENT").length;
  const lateCount = Object.values(attendanceState).filter((s) => s === "LATE").length;

  return (
    <RoleGuard allowedRoles={["TEACHER", "ADMIN"]}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
              alt="Teacher"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">Dr. Rajesh Sharma</h1>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                Faculty Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              HOD Mathematics &bull; Employee ID: <strong className="text-slate-700">TCH-501</strong>
            </p>
          </div>
        </div>

        {/* Class Selection Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-600">Active Classroom:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs font-bold px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          >
            <option value="Grade 10-A">Grade 10-A (3 Students)</option>
            <option value="Grade 10-B">Grade 10-B (1 Student)</option>
            <option value="Grade 11-Sci">Grade 11-Sci (2 Students)</option>
          </select>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "attendance"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <CalendarCheck2 className="w-4 h-4" />
          Daily Attendance Marking ({students.length} Students)
        </button>

        <button
          onClick={() => setActiveTab("grades")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "grades"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Award className="w-4 h-4" />
          Examination Grades Entry
        </button>
      </div>

      {/* Tab 1: Attendance Marking Board */}
      {activeTab === "attendance" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Attendance Roll Call &bull; {new Date().toDateString()}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mark each student as Present, Late, or Absent with a single click.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-emerald-700">{presentCount} Present</span> &bull;
                <span className="text-amber-700">{lateCount} Late</span> &bull;
                <span className="text-red-700">{absentCount} Absent</span>
              </div>

              <button
                onClick={markAllPresent}
                className="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
              >
                Mark All Present
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {students.map((student) => {
              const currentStatus = attendanceState[student.id] || "PRESENT";

              return (
                <div
                  key={student.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                      <Image
                        src={student.avatar}
                        alt={student.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {student.rollNumber} &bull; Term Attendance: {student.attendanceRate}%
                      </p>
                    </div>
                  </div>

                  {/* 3 Status Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAttendanceChange(student.id, "PRESENT")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        currentStatus === "PRESENT"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      Present
                    </button>

                    <button
                      onClick={() => handleAttendanceChange(student.id, "LATE")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        currentStatus === "LATE"
                          ? "bg-amber-500 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Late
                    </button>

                    <button
                      onClick={() => handleAttendanceChange(student.id, "ABSENT")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        currentStatus === "ABSENT"
                          ? "bg-red-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={handleSaveAttendance}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition"
            >
              <Save className="w-4 h-4" />
              Save Attendance Record
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Grades Entry */}
      {activeTab === "grades" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Examination Evaluation & Score Card
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update subject scores out of 100 to auto-generate official student report card grades.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600">Subject:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="text-xs font-bold px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English Literature">English Literature</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {students.map((student) => {
              const currentMarks = gradeInputs[student.id] ?? 85;
              const calculateLetter = (m: number) => {
                if (m >= 90) return "A+";
                if (m >= 80) return "A";
                if (m >= 70) return "B";
                if (m >= 60) return "C";
                return "D";
              };

              return (
                <div
                  key={student.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{student.rollNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={currentMarks}
                        onChange={(e) =>
                          setGradeInputs({
                            ...gradeInputs,
                            [student.id]: Number(e.target.value),
                          })
                        }
                        className="w-16 text-center text-xs font-bold py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-xs text-slate-400 font-bold">/ 100</span>
                    </div>

                    <span className="w-8 text-center text-xs font-extrabold text-indigo-700 bg-indigo-50 py-1 rounded-md">
                      {calculateLetter(currentMarks)}
                    </span>

                    <button
                      onClick={() => handleSaveGrade(student.id)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                    >
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
    </RoleGuard>
  );
}
