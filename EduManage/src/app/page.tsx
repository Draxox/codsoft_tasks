"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Users,
  GraduationCap,
  Percent,
  CreditCard,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  UserPlus,
  RefreshCw,
  Mail,
  Phone,
} from "lucide-react";

import RoleGuard from "@/components/RoleGuard";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"students" | "teachers" | "fees">("students");

  const [selectedGrade, setSelectedGrade] = useState<string>("ALL");
  const [selectedFeeFilter, setSelectedFeeFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showAddStudentModal, setShowAddStudentModal] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("Grade 10-A");
  const [newStudentPhone, setNewStudentPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const [statsRes, studentsRes, teachersRes] = await Promise.all([
        fetch("/api/stats"),
        fetch(`/api/students?grade=${selectedGrade}&feeStatus=${selectedFeeFilter}`),
        fetch("/api/teachers"),
      ]);
      const statsData = await statsRes.json();
      const studentsData = await studentsRes.json();
      const teachersData = await teachersRes.json();

      setStats(statsData.stats);
      setStudents(studentsData.students);
      setTeachers(teachersData.teachers);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedGrade, selectedFeeFilter]);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStudentName,
          email: newStudentEmail,
          gradeClass: newStudentGrade,
          parentPhone: newStudentPhone,
        }),
      });
      if (res.ok) {
        setShowAddStudentModal(false);
        setNewStudentName("");
        setNewStudentEmail("");
        setNewStudentPhone("");
        loadData();
      }
    } catch (err) {
      console.error("Failed to add student", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayFee = async (studentId: string) => {
    try {
      await fetch(`/api/students/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "PAY_FEE" }),
      });
      loadData();
    } catch (err) {
      console.error("Failed to record payment", err);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <GraduationCap className="w-4 h-4" />
            Central Institutional Administration
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Academic Operations Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time management of student rosters, faculty assignments, daily attendance rates, and tuition fees.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddStudentModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <UserPlus className="w-4 h-4" />
            Enroll Student
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Students</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {stats?.totalStudents || 0}
            </h3>
            <p className="text-[11px] text-indigo-600 font-semibold mt-1">Active Enrolled</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Faculty Members</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {stats?.totalTeachers || 0}
            </h3>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">Across 4 Departments</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg. Attendance</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">
              {stats?.avgAttendance || 0}%
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">&uarr; 3.2% institutional rate</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Percent className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tuition Collected</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {stats ? formatCurrency(stats.totalFeesCollected) : "₹0"}
            </h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">
              {stats?.pendingFeeStudents || 0} accounts pending
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "students"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Users className="w-4 h-4" />
          Student Records ({students.length})
        </button>

        <button
          onClick={() => setActiveTab("teachers")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "teachers"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Faculty Roster ({teachers.length})
        </button>

        <button
          onClick={() => setActiveTab("fees")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "fees"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          Tuition & Fee Ledger
        </button>
      </div>

      {/* Tab 1: Students Roster */}
      {activeTab === "students" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Filters Bar */}
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student name or roll #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Classes</option>
                <option value="Grade 10-A">Grade 10-A</option>
                <option value="Grade 10-B">Grade 10-B</option>
                <option value="Grade 11-Sci">Grade 11-Sci</option>
              </select>

              <select
                value={selectedFeeFilter}
                onChange={(e) => setSelectedFeeFilter(e.target.value)}
                className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Fee Statuses</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="OVERDUE">Overdue</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-6">Student</th>
                  <th className="py-3 px-6">Class / Grade</th>
                  <th className="py-3 px-6">Attendance Rate</th>
                  <th className="py-3 px-6">Fee Status</th>
                  <th className="py-3 px-6">Parent Phone</th>
                  <th className="py-3 px-6 text-right">Portal Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100">
                          <Image src={s.avatar} alt={s.name} fill className="object-cover" unoptimized />
                        </div>
                        <div>
                          <strong className="text-slate-900 block font-bold">{s.name}</strong>
                          <span className="text-[11px] text-slate-400 font-mono">{s.rollNumber}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px]">
                        {s.gradeClass}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              s.attendanceRate >= 90
                                ? "bg-emerald-500"
                                : s.attendanceRate >= 75
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${s.attendanceRate}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">{s.attendanceRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          s.feeStatus === "PAID"
                            ? "bg-emerald-100 text-emerald-800"
                            : s.feeStatus === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {s.feeStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono text-[11px]">
                      {s.parentPhone}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/student?id=${s.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        Open Profile <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Teachers Roster */}
      {activeTab === "teachers" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((tch) => (
            <div key={tch.id} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-4">
              <div>
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 mb-3">
                  <Image src={tch.avatar} alt={tch.name} fill className="object-cover" unoptimized />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 font-mono">
                  {tch.employeeId}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{tch.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{tch.department}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{tch.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tch.phone}</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 font-medium">
                Assigned: <strong className="text-slate-900">{tch.classes}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Fees Management */}
      {activeTab === "fees" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">Institutional Tuition Ledger</h2>
              <p className="text-xs text-slate-500 mt-0.5">Track, record, and verify student term tuition payments.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {stats ? formatCurrency(stats.totalFeesCollected) : "₹0"} Total Received
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {students.map((s) => (
              <div key={s.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{s.name}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">{s.rollNumber} &bull; {s.gradeClass}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900">{formatCurrency(s.feeAmount)}</span>
                    <span
                      className={`block text-[10px] font-bold ${
                        s.feeStatus === "PAID" ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {s.feeStatus === "PAID" ? `Paid on ${s.feePaidDate}` : "Payment Outstanding"}
                    </span>
                  </div>

                  {s.feeStatus !== "PAID" ? (
                    <button
                      onClick={() => handlePayFee(s.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                    >
                      Record Payment
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Receipt Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enroll Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form
            onSubmit={handleAddStudent}
            className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200"
          >
            <h3 className="text-base font-bold text-slate-900">Enroll New Student</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Student Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ishaan Sen"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Official Student Email *</label>
              <input
                type="email"
                required
                placeholder="e.g. ishaan.sen@school.edu"
                value={newStudentEmail}
                onChange={(e) => setNewStudentEmail(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Class / Grade *</label>
              <select
                value={newStudentGrade}
                onChange={(e) => setNewStudentGrade(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Grade 10-A">Grade 10-A</option>
                <option value="Grade 10-B">Grade 10-B</option>
                <option value="Grade 11-Sci">Grade 11-Sci</option>
                <option value="Grade 12-Sci">Grade 12-Sci</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Parent Contact Phone</label>
              <input
                type="tel"
                placeholder="+91 98765 00000"
                value={newStudentPhone}
                onChange={(e) => setNewStudentPhone(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? "Enrolling..." : "Enroll Student"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </RoleGuard>
  );
}
