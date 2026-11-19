import { NextResponse } from "next/server";
import { careerStore } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const jobType = searchParams.get("type");
  const search = searchParams.get("search")?.toLowerCase();

  let jobs = careerStore.getJobs();

  if (category && category !== "ALL") {
    jobs = jobs.filter((j) => j.category === category);
  }

  if (jobType && jobType !== "ALL") {
    jobs = jobs.filter((j) => j.jobType === jobType);
  }

  if (search) {
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(search) ||
        j.company.name.toLowerCase().includes(search) ||
        j.skills.some((s) => s.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({ success: true, jobs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, companyName, category, jobType, experienceLevel, location, salaryMin, salaryMax, description, skills } = body;

    if (!title || !companyName || !description) {
      return NextResponse.json({ error: "Job title, company name, and description are required" }, { status: 400 });
    }

    const newJob = careerStore.addJob({
      title,
      company: {
        name: companyName,
        logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=150&q=80",
        location: location || "Remote",
        website: "https://company.careers",
      },
      category: category || "Engineering",
      jobType: jobType || "Full-time",
      experienceLevel: experienceLevel || "Mid Level",
      location: location || "Remote",
      salaryMin: Number(salaryMin) || 1200000,
      salaryMax: Number(salaryMax) || 2400000,
      description,
      requirements: [
        "Demonstrated technical proficiency in required core stack",
        "Experience collaborating with product and engineering leads",
        "Strong debugging, unit testing, and problem-solving skills",
      ],
      skills: Array.isArray(skills) ? skills : (skills || "React, TypeScript, Node.js").split(",").map((s: string) => s.trim()),
    });

    return NextResponse.json({ success: true, job: newJob }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create job" }, { status: 500 });
  }
}
