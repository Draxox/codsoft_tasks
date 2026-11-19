"use client";

import React from "react";
import Link from "next/link";
import { useAuth, Role, DEMO_ACCOUNTS } from "@/context/AuthContext";
import { ShieldAlert, Lock, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { currentUser, loginAs } = useAuth();
  const isAuthorized = allowedRoles.includes(currentUser.role);

  if (isAuthorized) {
    return <>{children}</>;
  }

  // Fallback destination based on actual role
  const fallbackUrl =
    currentUser.role === "ADMIN"
      ? "/"
      : currentUser.role === "TEACHER"
      ? "/teacher"
      : "/student";

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-rose-200 p-8 sm:p-12 shadow-xl max-w-lg w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-black tracking-wider uppercase inline-block mb-2">
            403 &bull; Role-Based Access Control (RBAC)
          </span>
          <h2 className="text-2xl font-black text-slate-900">Access Restricted</h2>
          <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
            Your current account role does not have authorization to view or modify this institutional module.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-slate-500">Current Identity:</span>
            <span className="font-bold text-slate-900">
              {currentUser.name} ({currentUser.role})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Required Role(s):</span>
            <span className="font-bold text-indigo-600">
              {allowedRoles.join(" or ")}
            </span>
          </div>
        </div>

        {/* Quick RBAC Switcher for Demonstration */}
        <div className="space-y-3 pt-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Quick-Switch Identity (Demo Mode):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allowedRoles.map((role) => {
              const account = DEMO_ACCOUNTS.find((a) => a.role === role);
              if (!account) return null;

              return (
                <button
                  key={account.id}
                  onClick={() => loginAs(account)}
                  className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  Switch to {account.name.split(" ")[0]} ({role})
                </button>
              );
            })}
          </div>

          <Link
            href={fallbackUrl}
            className="block text-xs font-bold text-slate-500 hover:text-slate-800 pt-2"
          >
            &larr; Return to my authorized {currentUser.role.toLowerCase()} portal
          </Link>
        </div>
      </div>
    </div>
  );
}
