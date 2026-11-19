export interface JobData {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    location: string;
    website: string;
  };
  category: "Engineering" | "Design" | "Product" | "DevOps" | "Data";
  jobType: "Full-time" | "Remote" | "Contract" | "Hybrid";
  experienceLevel: "Entry Level" | "Mid Level" | "Senior" | "Lead";
  location: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  skills: string[];
  applicantCount: number;
  postedAt: string;
}

export interface ApplicationData {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  linkedinUrl?: string;
  resumeName: string;
  coverLetter?: string;
  status: "APPLIED" | "UNDER_REVIEW" | "INTERVIEW_SCHEDULED" | "OFFER_EXTENDED" | "REJECTED";
  matchScore: number;
  appliedDate: string;
}

export const initialJobs: JobData[] = [
  {
    id: "job-101",
    title: "Senior Full Stack Engineer (Next.js & Node)",
    company: {
      name: "PulseCloud Systems",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
      location: "Bengaluru, India (Hybrid)",
      website: "https://pulsecloud.io",
    },
    category: "Engineering",
    jobType: "Full-time",
    experienceLevel: "Senior",
    location: "Bengaluru (Hybrid)",
    salaryMin: 2200000,
    salaryMax: 3500000,
    description: "Architect and scale high-concurrency client dashboards using Next.js 15, React 19, and PostgreSQL database pipelines.",
    requirements: [
      "4+ years building full-stack applications with TypeScript and React/Next.js",
      "Deep understanding of server components, API route optimization, and Prisma ORM",
      "Experience with relational data modeling in PostgreSQL",
    ],
    skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    applicantCount: 14,
    postedAt: "2 days ago",
  },
  {
    id: "job-102",
    title: "Frontend UI/UX Architect",
    company: {
      name: "FinFlow Technologies",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80",
      location: "Remote - Worldwide",
      website: "https://finflow.tech",
    },
    category: "Design",
    jobType: "Remote",
    experienceLevel: "Lead",
    location: "100% Remote",
    salaryMin: 2800000,
    salaryMax: 4200000,
    description: "Lead our design systems engineering team. Craft accessible, high-performance web interfaces and reusable component libraries.",
    requirements: [
      "Mastery of modern CSS architectures, Tailwind CSS v4, and accessible Radix/Shadcn primitives",
      "Proven portfolio designing and maintaining design systems across web and mobile",
      "Experience with performance profiling and Core Web Vitals optimization",
    ],
    skills: ["React 19", "Tailwind CSS 4", "Design Systems", "Figma", "Accessibility"],
    applicantCount: 22,
    postedAt: "1 day ago",
  },
  {
    id: "job-103",
    title: "Backend Distributed Systems Engineer",
    company: {
      name: "HyperScale Data",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80",
      location: "Hyderabad, India",
      website: "https://hyperscale.io",
    },
    category: "Engineering",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    location: "Hyderabad (On-site)",
    salaryMin: 1800000,
    salaryMax: 2600000,
    description: "Design low-latency microservices, transactional queues, and persistence layers capable of handling 50k+ requests per second.",
    requirements: [
      "Strong background in Node.js, Go, or Python with relational databases",
      "Hands-on experience with Redis caching and PostgreSQL query tuning",
      "Familiarity with containerized deployments (Docker/Kubernetes)",
    ],
    skills: ["Node.js", "PostgreSQL", "Redis", "Docker", "REST & GraphQL"],
    applicantCount: 9,
    postedAt: "3 days ago",
  },
  {
    id: "job-104",
    title: "Junior Full Stack Developer",
    company: {
      name: "Apex Labs",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=150&q=80",
      location: "Pune, India (Hybrid)",
      website: "https://apexlabs.co",
    },
    category: "Engineering",
    jobType: "Full-time",
    experienceLevel: "Entry Level",
    location: "Pune (Hybrid)",
    salaryMin: 800000,
    salaryMax: 1400000,
    description: "Exciting opportunity for emerging software engineers to build customer-facing features, integrate REST APIs, and learn production CI/CD workflows.",
    requirements: [
      "Solid understanding of JavaScript / TypeScript, React, and CSS fundamentals",
      "Eager to learn full-stack frameworks like Next.js and relational database concepts",
      "Good communication skills and eagerness to collaborate in agile sprints",
    ],
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    applicantCount: 38,
    postedAt: "Just now",
  },
  {
    id: "job-105",
    title: "DevOps & Cloud Infrastructure Lead",
    company: {
      name: "CloudBridge Global",
      logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80",
      location: "Remote (India)",
      website: "https://cloudbridge.net",
    },
    category: "DevOps",
    jobType: "Remote",
    experienceLevel: "Senior",
    location: "Remote (India)",
    salaryMin: 2500000,
    salaryMax: 3800000,
    description: "Build robust infrastructure-as-code, manage Kubernetes clusters on AWS/GCP, and ensure 99.99% system availability.",
    requirements: [
      "Extensive experience with Terraform, Docker, and Kubernetes orchestration",
      "Expertise in CI/CD automation pipelines (GitHub Actions, GitLab CI)",
      "Strong monitoring and observability setup (Prometheus, Grafana)",
    ],
    skills: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Docker"],
    applicantCount: 11,
    postedAt: "4 days ago",
  },
];

export const initialApplications: ApplicationData[] = [
  {
    id: "app-201",
    jobId: "job-101",
    jobTitle: "Senior Full Stack Engineer (Next.js & Node)",
    companyName: "PulseCloud Systems",
    candidateName: "Alex Chen",
    candidateEmail: "alex.chen@devmail.com",
    candidatePhone: "+91 98765 22001",
    linkedinUrl: "https://linkedin.com/in/alexchen-dev",
    resumeName: "Alex_Chen_Staff_Engineer_Resume.pdf",
    coverLetter: "Excited about your Next.js 15 migration. Built scalable SaaS portals handling 1M+ active users.",
    status: "UNDER_REVIEW",
    matchScore: 94,
    appliedDate: "2026-11-17",
  },
  {
    id: "app-202",
    jobId: "job-101",
    jobTitle: "Senior Full Stack Engineer (Next.js & Node)",
    companyName: "PulseCloud Systems",
    candidateName: "Priya Sharma",
    candidateEmail: "priya.sharma@codehub.io",
    candidatePhone: "+91 98765 22002",
    linkedinUrl: "https://linkedin.com/in/priya-sharma-tech",
    resumeName: "Priya_Sharma_Resume_Fullstack.pdf",
    coverLetter: "Experienced with PostgreSQL query tuning, Prisma ORM, and high-performance server components.",
    status: "INTERVIEW_SCHEDULED",
    matchScore: 91,
    appliedDate: "2026-11-16",
  },
  {
    id: "app-203",
    jobId: "job-104",
    jobTitle: "Junior Full Stack Developer",
    companyName: "Apex Labs",
    candidateName: "Rahul Varma",
    candidateEmail: "rahul.varma@campus.edu",
    candidatePhone: "+91 98765 22003",
    linkedinUrl: "https://linkedin.com/in/rahul-varma",
    resumeName: "Rahul_Varma_Junior_Developer.pdf",
    coverLetter: "Passionate developer graduating this year. Completed 3 comprehensive full-stack web applications.",
    status: "APPLIED",
    matchScore: 86,
    appliedDate: "2026-11-19",
  },
  {
    id: "app-204",
    jobId: "job-102",
    jobTitle: "Frontend UI/UX Architect",
    companyName: "FinFlow Technologies",
    candidateName: "Sara Jenkins",
    candidateEmail: "sara.jenkins@designsystems.io",
    candidatePhone: "+91 98765 22004",
    linkedinUrl: "https://linkedin.com/in/sarajenkins",
    resumeName: "Sara_Jenkins_Design_Systems_Lead.pdf",
    coverLetter: "Authored component libraries for 3 Fortune 500 fintech apps. Strong advocate for accessible UX.",
    status: "OFFER_EXTENDED",
    matchScore: 98,
    appliedDate: "2026-11-12",
  },
];

// Persistent Global Singleton Store
const globalStore = globalThis as unknown as {
  careerhub_jobs?: JobData[];
  careerhub_applications?: ApplicationData[];
};

export const careerStore = {
  getJobs(): JobData[] {
    if (!globalStore.careerhub_jobs) {
      globalStore.careerhub_jobs = JSON.parse(JSON.stringify(initialJobs));
    }
    return globalStore.careerhub_jobs!;
  },

  getJob(id: string): JobData | undefined {
    return this.getJobs().find((j) => j.id === id);
  },

  addJob(job: Omit<JobData, "id" | "applicantCount" | "postedAt">): JobData {
    const jobs = this.getJobs();
    const newJob: JobData = {
      ...job,
      id: "job-" + Date.now(),
      applicantCount: 0,
      postedAt: "Just now",
    };
    jobs.unshift(newJob);
    return newJob;
  },

  getApplications(jobId?: string): ApplicationData[] {
    if (!globalStore.careerhub_applications) {
      globalStore.careerhub_applications = JSON.parse(JSON.stringify(initialApplications));
    }
    const apps = globalStore.careerhub_applications!;
    if (jobId) {
      return apps.filter((a) => a.jobId === jobId);
    }
    return apps;
  },

  addApplication(app: Omit<ApplicationData, "id" | "status" | "appliedDate" | "matchScore">): ApplicationData {
    const apps = this.getApplications();
    const jobs = this.getJobs();

    // Increment job applicant count
    const job = jobs.find((j) => j.id === app.jobId);
    if (job) {
      job.applicantCount += 1;
    }

    const newApp: ApplicationData = {
      ...app,
      id: "app-" + Date.now(),
      status: "APPLIED",
      matchScore: Math.floor(82 + Math.random() * 16),
      appliedDate: new Date().toISOString().split("T")[0],
    };
    apps.unshift(newApp);
    return newApp;
  },

  updateApplicationStatus(appId: string, status: ApplicationData["status"]): ApplicationData | null {
    const apps = this.getApplications();
    const app = apps.find((a) => a.id === appId);
    if (!app) return null;
    app.status = status;
    return app;
  },

  getStats() {
    const jobs = this.getJobs();
    const apps = this.getApplications();
    return {
      activeJobs: jobs.length,
      totalApplications: apps.length,
      interviewsScheduled: apps.filter((a) => a.status === "INTERVIEW_SCHEDULED").length,
      offersExtended: apps.filter((a) => a.status === "OFFER_EXTENDED").length,
    };
  },
};
