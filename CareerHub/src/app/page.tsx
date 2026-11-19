"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatSalary } from "@/lib/utils";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Upload,
  CheckCircle2,
  X,
  FileText,
  DollarSign,
  Building2,
  Filter,
} from "lucide-react";

export default function JobBoardPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  // Application Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<any>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [uploadedResumeName, setUploadedResumeName] = useState("Alex_Fullstack_Engineer_Resume.pdf");
  const [coverNote, setCoverNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState<any>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/jobs?category=${selectedCategory}&type=${selectedType}&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.jobs) setJobs(data.jobs);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchJobs, 200);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedType, search]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail || !selectedJobForApply) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJobForApply.id,
          candidateName,
          candidateEmail,
          candidatePhone,
          linkedinUrl,
          resumeName: uploadedResumeName,
          coverLetter: coverNote,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setApplySuccess(data.application);
        fetchJobs(); // Update applicant count
      }
    } catch (err) {
      console.error("Failed to apply", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Curated Tech & Engineering Opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Discover Your Next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              High-Impact Role
            </span>
          </h1>

          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Directly apply to engineering, design, and DevOps roles at fast-growing technology companies. Track your applications in real time.
          </p>

          {/* Search & Filter Bar */}
          <div className="max-w-3xl mx-auto pt-6">
            <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Job title, skills (Next.js, React, Node), or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Categories</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Product Design</option>
                <option value="DevOps">Cloud & DevOps</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Work Types</option>
                <option value="Remote">100% Remote</option>
                <option value="Full-time">Full-time</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Jobs Listing Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-black text-slate-900">Featured Openings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing {jobs.length} verified listings</p>
          </div>

          <Link
            href="/applications"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Track Submitted Applications <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="mt-6 space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-emerald-300 hover:shadow-md transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <Image
                    src={job.company.logo}
                    alt={job.company.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">{job.company.name}</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      {job.jobType}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                      {job.experienceLevel}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-sm sm:text-base font-black text-slate-900 block">
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 md:justify-end mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedJobForApply(job);
                    setApplySuccess(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
                >
                  <span>Quick Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Apply Modal */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            {applySuccess ? (
              /* Success Screen */
              <div className="text-center space-y-4 py-4 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Application Submitted!</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Your application for <strong>{applySuccess.jobTitle}</strong> has been transmitted directly to {applySuccess.companyName}&apos;s recruitment pipeline.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Applicant:</span>
                    <span className="font-bold text-slate-900">{applySuccess.candidateName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Resume Attached:</span>
                    <span className="font-bold text-emerald-600">{applySuccess.resumeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Status:</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                      {applySuccess.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Link
                    href="/applications"
                    className="flex-1 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    View in My Applications
                  </Link>
                  <button
                    onClick={() => setSelectedJobForApply(null)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Application Form */
              <form onSubmit={handleApply} className="space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">
                      Applying for
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      {selectedJobForApply.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedJobForApply.company.name} &bull; {selectedJobForApply.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedJobForApply(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">LinkedIn / Portfolio URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/alex-dev"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Resume Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Resume (PDF/DOCX) *</label>
                  <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 truncate">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{uploadedResumeName}</span>
                    </div>
                    <label className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 cursor-pointer transition shrink-0">
                      Browse
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadedResumeName(e.target.files[0].name);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Note for the Hiring Team</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly state your relevant experience and stack alignment..."
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForApply(null)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Transmitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
