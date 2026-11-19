"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth, DEMO_ACCOUNTS, Role } from "@/context/AuthContext";
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  BookOpen,
  Lock,
  ChevronDown,
  User,
  School,
  X,
  Check,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, loginAs } = useAuth();
  const [showIdentityMenu, setShowIdentityMenu] = useState(false);

  const portals = [
    { label: "Admin Portal", href: "/", allowed: ["ADMIN"] as Role[], icon: ShieldCheck },
    { label: "Teacher Portal", href: "/teacher", allowed: ["TEACHER", "ADMIN"] as Role[], icon: UserCheck },
    { label: "Student Portal", href: "/student", allowed: ["STUDENT", "ADMIN"] as Role[], icon: BookOpen },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
                Edu<span className="text-indigo-600">Manage</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                RBAC Institutional ERP
              </span>
            </div>
          </Link>

          {/* Role Navigation Pills */}
          <div className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            {portals.map((portal) => {
              const Icon = portal.icon;
              const isActive =
                portal.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(portal.href);
              const isLocked = !portal.allowed.includes(currentUser.role);

              return (
                <Link
                  key={portal.href}
                  href={portal.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  } ${isLocked ? "opacity-60" : ""}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{portal.label}</span>
                  {isLocked && <Lock className="w-3 h-3 text-slate-400 ml-0.5" />}
                </Link>
              );
            })}
          </div>

          {/* Current User Session Badge & Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowIdentityMenu(true)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition text-left group"
              title="Click to switch role or demo account"
            >
              <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 leading-none">
                    {currentUser.name}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wide ${
                      currentUser.role === "ADMIN"
                        ? "bg-purple-100 text-purple-800"
                        : currentUser.role === "TEACHER"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {currentUser.role}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {currentUser.employeeId || currentUser.rollNumber || "Institutional Account"}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition" />
            </button>
          </div>
        </div>
      </header>

      {/* Identity & RBAC Switcher Modal */}
      {showIdentityMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Role-Based Access Control (RBAC) Switcher
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simulate different institutional privileges and portal permissions.
                </p>
              </div>
              <button
                onClick={() => setShowIdentityMenu(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
              {DEMO_ACCOUNTS.map((account) => {
                const isSelected = currentUser.id === account.id;

                return (
                  <div
                    key={account.id}
                    onClick={() => {
                      loginAs(account);
                      setShowIdentityMenu(false);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-500/20"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <Image
                          src={account.avatar}
                          alt={account.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900">{account.name}</h4>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wide ${
                              account.role === "ADMIN"
                                ? "bg-purple-100 text-purple-800"
                                : account.role === "TEACHER"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {account.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {account.department || account.gradeClass} &bull;{" "}
                          <span className="font-mono">{account.employeeId || account.rollNumber}</span>
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              💡 <strong>RBAC Policy</strong>: 
              <br />&bull; <strong>Admin</strong> has full global privileges.
              <br />&bull; <strong>Teacher</strong> can mark attendance and enter grades for assigned classes.
              <br />&bull; <strong>Student</strong> can only view their own personal report card, attendance, and fee ledger.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
