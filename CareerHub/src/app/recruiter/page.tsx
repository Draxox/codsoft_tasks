"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatSalary } from "@/lib/utils";
import {
  Users,
  Briefcase,
  UserCheck,
  CheckCircle2,
  Plus,
  RefreshCw,
  ArrowRight,
  FileText,
  Phone,
  Mail,
  Linkedin,
  Clock,
  Sparkles,
  Building2,
  XCircle,
  X,
} from "lucide-react";

export default function RecruiterPortalPage() {
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Job Modal state
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newCategory, setNewCategory] = useState("Engineering");
  const [newType, setNewType] = useState("Full-time");
  const [newExp, setNewExp] = useState("Mid Level");
  const [newLocation, setNewLocation] = useState("Bengaluru (Hybrid)");
  const [newSalaryMin, setNewSalaryMin] = useState("1800000");
  const [newSalaryMax, setNewSalaryMax] = useState("2800000");
  const [newDesc, setNewDesc] = useState("");
  const [newSkills, setNewSkills] = useState("React, Next.js, TypeScript, PostgreSQL");
  const [isPosting, setIsPosting] = useState(false);

  const loadData = async () => {
    try {
      const [statsRes, appsRes, jobsRes] = await Promise.all([
        fetch("/api/stats"),
        fetch("/api/applications"),
        fetch("/api/jobs"),
      ]);
      const statsData = await statsRes.json();
      const appsData = await appsRes.json();
      const jobsData = await jobsRes.json();

      setStats(statsData.stats);
      if (appsData.applications) setApplications(appsData.applications);
      if (jobsData.jobs) setJobs(jobsData.jobs);
    } catch (err) {
      console.error("Failed to load recruiter data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateStage = async (appId: string, status: string) => {
    // Optimistic UI update
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status } : a))
    );

    try {
      await fetch(`/api/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      loadData();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCompany || !newDesc) return;
    setIsPosting(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          companyName: newCompany,
          category: newCategory,
          jobType: newType,
          experienceLevel: newExp,
          location: newLocation,
          salaryMin: Number(newSalaryMin),
          salaryMax: Number(newSalaryMax),
          description: newDesc,
          skills: newSkills.split(",").map((s) => s.trim()),
        }),
      });

      if (res.ok) {
        setShowPostJobModal(false);
        setNewTitle("");
        setNewCompany("");
        setNewDesc("");
        loadData();
      }
    } catch (err) {
      console.error("Failed to post job", err);
    } finally {
      setIsPosting(false);
    }
  };

  // Group applications into Pipeline stages
  const newApps = applications.filter((a) => a.status === "APPLIED");
  const reviewApps = applications.filter((a) => a.status === "UNDER_REVIEW");
  const interviewApps = applications.filter((a) => a.status === "INTERVIEW_SCHEDULED");
  const offerApps = applications.filter((a) => a.status === "OFFER_EXTENDED");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <Briefcase className="w-4 h-4" />
            Recruiter Operations & ATS Pipeline
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Applicant Tracking System (ATS)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage candidate pipelines, schedule technical rounds, and publish new team requisitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPostJobModal(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            Create New Requisition
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Postings</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{jobs.length}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Accepting applicants</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Applicants</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{applications.length}</h3>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">Active candidate profiles</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Interviews Queued</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">
              {stats?.interviewsScheduled || 0}
            </h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">Technical screens</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Offers Extended</p>
            <h3 className="text-2xl font-black text-purple-600 mt-1">
              {stats?.offersExtended || 0}
            </h3>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">Final stage talent</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Kanban ATS Pipeline Columns */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Candidate Hiring Pipeline
          </h2>
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Auto-Sync Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 overflow-x-auto">
          {/* Column 1: New Applications */}
          <div className="bg-slate-100/70 p-4 rounded-3xl border border-slate-200 flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-600">1. New Applications</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-black">
                {newApps.length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {newApps.map((app) => (
                <div key={app.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{app.candidateName}</h4>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {app.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{app.jobTitle}</p>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{app.candidateEmail}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate">{app.resumeName}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => updateStage(app.id, "UNDER_REVIEW")}
                    className="w-full py-2 bg-slate-900 hover:bg-black text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 transition shadow-xs"
                  >
                    Start Review &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Under Review */}
          <div className="bg-blue-50/40 p-4 rounded-3xl border border-blue-200/80 flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between pb-2 border-b border-blue-200">
              <span className="text-xs font-bold uppercase text-blue-800">2. Under Review</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-black">
                {reviewApps.length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {reviewApps.map((app) => (
                <div key={app.id} className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs space-y-3">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{app.candidateName}</h4>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {app.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{app.jobTitle}</p>
                  </div>

                  {app.coverLetter && (
                    <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-lg line-clamp-2">
                      &ldquo;{app.coverLetter}&rdquo;
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateStage(app.id, "INTERVIEW_SCHEDULED")}
                      className="py-2 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold rounded-xl transition shadow-xs"
                    >
                      Schedule Interview
                    </button>
                    <button
                      onClick={() => updateStage(app.id, "REJECTED")}
                      className="py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-[10px] font-bold rounded-xl transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Interview Scheduled */}
          <div className="bg-amber-50/40 p-4 rounded-3xl border border-amber-200/80 flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200">
              <span className="text-xs font-bold uppercase text-amber-800">3. Interview Scheduled</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black">
                {interviewApps.length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {interviewApps.map((app) => (
                <div key={app.id} className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-3">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{app.candidateName}</h4>
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        Technical Round
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{app.jobTitle}</p>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{app.candidatePhone}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => updateStage(app.id, "OFFER_EXTENDED")}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 transition shadow-xs"
                  >
                    Extend Formal Offer &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Offers Extended */}
          <div className="bg-purple-50/40 p-4 rounded-3xl border border-purple-200/80 flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between pb-2 border-b border-purple-200">
              <span className="text-xs font-bold uppercase text-purple-800">4. Offer Extended</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-black">
                {offerApps.length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {offerApps.map((app) => (
                <div key={app.id} className="bg-white p-4 rounded-2xl border border-purple-200 shadow-xs space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{app.candidateName}</h4>
                      <p className="text-[11px] text-slate-500">{app.jobTitle}</p>
                    </div>
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      🎉
                    </span>
                  </div>

                  <div className="p-2 bg-purple-50 rounded-xl text-[11px] text-purple-900 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>Offer Proposal Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateJob}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Publish New Requisition</h3>
              <button
                type="button"
                onClick={() => setShowPostJobModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Job Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Frontend Architect"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Tech"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Product Design</option>
                  <option value="DevOps">Cloud & DevOps</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Work Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Experience</label>
                <select
                  value={newExp}
                  onChange={(e) => setNewExp(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Bengaluru"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Min Salary (INR)</label>
                <input
                  type="number"
                  placeholder="1800000"
                  value={newSalaryMin}
                  onChange={(e) => setNewSalaryMin(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Max Salary (INR)</label>
                <input
                  type="number"
                  placeholder="3000000"
                  value={newSalaryMax}
                  onChange={(e) => setNewSalaryMax(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Job Description *</label>
              <textarea
                rows={3}
                required
                placeholder="Explain the technical scope and day-to-day responsibilities..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPostJobModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPosting}
                className="px-5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {isPosting ? "Publishing..." : "Publish Job"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
