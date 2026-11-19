import { NextResponse } from "next/server";
import { careerStore } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");
  const email = searchParams.get("email");

  let apps = careerStore.getApplications(jobId || undefined);

  if (email) {
    apps = apps.filter((a) => a.candidateEmail.toLowerCase() === email.toLowerCase());
  }

  return NextResponse.json({ success: true, applications: apps });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, candidateName, candidateEmail, candidatePhone, linkedinUrl, resumeName, coverLetter } = body;

    if (!jobId || !candidateName || !candidateEmail) {
      return NextResponse.json({ error: "Job ID, candidate name, and email are required" }, { status: 400 });
    }

    const job = careerStore.getJob(jobId);
    if (!job) {
      return NextResponse.json({ error: "Target job listing not found" }, { status: 404 });
    }

    const newApp = careerStore.addApplication({
      jobId,
      jobTitle: job.title,
      companyName: job.company.name,
      candidateName,
      candidateEmail,
      candidatePhone: candidatePhone || "+91 98765 00000",
      linkedinUrl: linkedinUrl || "https://linkedin.com",
      resumeName: resumeName || `${candidateName.replace(/\s+/g, "_")}_Resume.pdf`,
      coverLetter: coverLetter || "Excited to apply for this role. My background aligns well with your team's technical requirements.",
    });

    return NextResponse.json({ success: true, application: newApp }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to submit application" }, { status: 500 });
  }
}
