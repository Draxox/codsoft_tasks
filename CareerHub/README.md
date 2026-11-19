# 💼 CareerHub — Modern Recruitment Platform & Candidate ATS

> Built for the **CodSoft Full Stack Web Development Internship** (Project 3 of 3)

**CareerHub** is an end-to-end recruitment and candidate application platform built with **Next.js 15+ (React 19)**, **Tailwind CSS 4**, **PostgreSQL**, and **Prisma ORM**. It unifies candidate job discovery, resume submissions, personal application tracking, and an employer Applicant Tracking System (ATS) Kanban board into a single real-time platform.

---

## 🎥 Live Demo Video Walkthrough

[![GitHub Repository](https://img.shields.io/badge/GitHub-codsoft__tasks-181717?style=for-the-badge&logo=github)](https://github.com/Draxox/codsoft_tasks)
[![Watch CareerHub Walkthrough Video](https://img.shields.io/badge/▶%EF%B8%8F_Click_to_Watch-CareerHub_Demo_Video_(MP4)-10b981?style=for-the-badge&logo=video)](https://github.com/Draxox/codsoft_tasks/raw/main/CareerHub/docs/demo.mp4)

> 🎥 **Walkthrough Video**: [**Click here to Play / Download `docs/demo.mp4`**](https://github.com/Draxox/codsoft_tasks/raw/main/CareerHub/docs/demo.mp4)

> 💡 *A complete walkthrough showing the full operational recruitment lifecycle: Candidate job search & dynamic skill filters ➔ One-click application modal with simulated resume attachment ➔ Candidate real-time 4-stage application tracker ➔ Recruiter ATS Kanban pipeline with live applicant stage progression ➔ Job requisition publisher modal.*

---

## 🌟 Key Features

### 🧑‍💻 1. Candidate Job Discovery & Search (`/`)
- **Curated Openings**: Engineering, Product Design, and Cloud DevOps listings with salary ranges (`₹22 - ₹35 LPA`), experience tags, and remote badges.
- **Dynamic Search & Filtering**: Real-time filtering by role category, employment type (Remote, Full-time, Hybrid), and technical skills.
- **Quick-Apply Modal**: One-click application flow with candidate credentials, portfolio link, cover note, and file attachment preview (`.pdf`/`.docx`).

### 📄 2. Real-Time Application Pipeline Tracker (`/applications`)
- **Visual 4-Stage Stepper**:
  1. `Applied` (Resume received by ATS)
  2. `Under Review` (Screened by hiring team)
  3. `Interview Scheduled` (Technical round queued)
  4. `Offer Extended` (Formal proposal sent)
- **Live Background Sync**: Automatically reflects changes made by the recruiter in real time.
- **Application Dossier**: Attached resume name, company match score (e.g. 94%), and submission timestamp.

### 🏢 3. Recruiter ATS & Talent Pipeline (`/recruiter`)
- **High-Level Hiring Metrics**: Live counters for active job requisitions, total candidate profiles, scheduled interviews, and extended offers.
- **ATS Kanban Pipeline Board**:
  - *Column 1*: New Applications (Stage: `APPLIED`)
  - *Column 2*: Under Review (Stage: `UNDER_REVIEW`)
  - *Column 3*: Interview Scheduled (Stage: `INTERVIEW_SCHEDULED`)
  - *Column 4*: Offers Extended (Stage: `OFFER_EXTENDED`)
- **1-Click Stage Progression**: Recruiters can review candidate details, inspect resumes, and advance candidates with instant feedback.
- **Job Requisition Publisher**: Interactive modal to post new jobs with salary bounds, experience levels, and skill tags.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ / 16 (Turbopack, App Router) | Full-stack React framework & Server Endpoints |
| **Frontend Library** | React 19 | Latest concurrent UI components & hooks |
| **Styling** | Tailwind CSS 4.0 | Modern utility-first responsive styling |
| **Icons** | Lucide React | High-contrast, clean icons |
| **Database** | PostgreSQL 15 | Relational persistence for jobs, companies, and applications |
| **ORM** | Prisma ORM 5.22 | Type-safe schema modeling and queries |

---

## 🚀 Getting Started

### 1. Installation
Navigate to the `CareerHub` directory and install dependencies:
```bash
cd CareerHub
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

*(Note: CareerHub is configured on port 3002 so it can run concurrently with DineDesk on port 3000 and EduManage on port 3001!)*

---

## 🧪 Testing the Complete Workflow

1. **Candidate Job Search & Apply**:
   - Open `http://localhost:3002`.
   - Filter by **Engineering** or search for *"Next.js"*.
   - Click **Quick Apply** on the *Senior Full Stack Engineer* role.
   - Enter your name, attach a resume, and submit.
   - Click **View in My Applications** to see the 4-stage stepper.
2. **Recruiter Hiring Pipeline (ATS)**:
   - Open `http://localhost:3002/recruiter` in a second tab.
   - The application you just submitted appears under **1. New Applications**.
   - Click **Start Review &rarr;** ➔ advances to **2. Under Review**.
   - Click **Schedule Interview** ➔ advances to **3. Interview Scheduled**.
   - Click **Extend Formal Offer &rarr;** ➔ advances to **4. Offer Extended**.
   - Switch back to the candidate tab: notice the 4-stage stepper has progressed in real time!
3. **Publish a New Job**:
   - On `/recruiter`, click **Create New Requisition**.
   - Fill in job title, company, salary bounds, and publish.
   - Switch to the main job board: the new position is immediately live!

---

## 👨‍💻 Internship Submission Information
- **Internship**: CodSoft Full Stack Web Development Internship
- **Role**: Full Stack Developer
- **Project**: CareerHub — Recruitment & Job Application Platform (Project 3 of 3)
