"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatSalary, formatDate } from "@/lib/utils";
import {
  Send,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Briefcase,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const PIPELINE_STAGES = [
  { key: "APPLIED", label: "Applied", desc: "Resume submitted to ATS" },
  { key: "UNDER_REVIEW", label: "Under Review", desc: "Screened by recruiter" },
  { key: "INTERVIEW_SCHEDULED", label: "Interview", desc: "Technical round queued" },
  { key: "OFFER_EXTENDED", label: "Offer", desc: "Formal proposal sent" },
];

export default function CandidateApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      if (data.applications) setApplications(data.applications);
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStageIndex = (status: string) => {
    switch (status) {
      case "APPLIED":
        return 0;
      case "UNDER_REVIEW":
        return 1;
      case "INTERVIEW_SCHEDULED":
        return 2;
      case "OFFER_EXTENDED":
        return 3;
      case "REJECTED":
        return -1;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <Send className="w-3.5 h-3.5" />
            Candidate Dashboard
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Application Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status tracking for all submitted job applications & recruiter updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchApplications}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-emerald-600" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            href="/"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Briefcase className="w-4 h-4" />
            Browse More Jobs
          </Link>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {applications.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs">
            <Send className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No active applications yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Apply to your favorite engineering or design roles from the job board to track them here.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
            >
              Explore Job Board <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          applications.map((app) => {
            const currentStage = getStageIndex(app.status);
            const isRejected = app.status === "REJECTED";

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in-50"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {app.companyName}
                      </span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="text-[11px] text-slate-400 font-mono">ID: {app.id}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mt-0.5">
                      {app.jobTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Applied by <strong>{app.candidateName}</strong> &bull; Submitted on {app.appliedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black border border-emerald-100">
                      Match Score: {app.matchScore}%
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black ${
                        app.status === "OFFER_EXTENDED"
                          ? "bg-purple-100 text-purple-800"
                          : app.status === "INTERVIEW_SCHEDULED"
                          ? "bg-emerald-100 text-emerald-800"
                          : app.status === "UNDER_REVIEW"
                          ? "bg-blue-100 text-blue-800"
                          : isRejected
                          ? "bg-rose-100 text-rose-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {app.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Pipeline Stepper */}
                {!isRejected ? (
                  <div className="pt-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {PIPELINE_STAGES.map((stage, idx) => {
                        const isDone = idx <= currentStage;
                        const isCurrent = idx === currentStage;

                        return (
                          <div
                            key={stage.key}
                            className={`p-3.5 rounded-2xl border transition ${
                              isCurrent
                                ? "bg-emerald-50/80 border-emerald-400 shadow-xs"
                                : isDone
                                ? "bg-slate-50 border-slate-200 text-slate-700"
                                : "bg-white border-slate-200/50 opacity-40 text-slate-400"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold text-slate-400">Step {idx + 1}</span>
                              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 leading-tight">
                              {stage.label}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              {stage.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-rose-50 text-rose-700 rounded-2xl text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Application closed by the hiring team.
                  </div>
                )}

                {/* Resume Attached pill */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Attached Document: <strong className="text-slate-800 font-mono">{app.resumeName}</strong></span>
                  </div>
                  <span className="text-[11px] text-slate-400">Live Auto-Sync Active</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
