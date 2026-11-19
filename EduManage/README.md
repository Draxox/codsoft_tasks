# 🎓 EduManage — Student Management System & Institutional ERP

> Built for the **CodSoft Full Stack Web Development Internship** (Project 2 of 3)

**EduManage** is a modern, unified academic operations platform built with **Next.js 15+ (React 19)**, **Tailwind CSS 4**, **PostgreSQL**, and **Prisma ORM**. It eliminates paper-based records by connecting school administrators, faculty teachers, and students through dedicated role-based portals.

---

## 🎥 Live Demo Video Walkthrough

[![GitHub Repository](https://img.shields.io/badge/GitHub-codsoft__tasks-181717?style=for-the-badge&logo=github)](https://github.com/Draxox/codsoft_tasks)

<div align="center">
  <video src="https://github.com/user-attachments/assets/20659da9-8b3c-4918-8784-ab6bbef2528d" autoplay loop controls="controls" width="100%"></video>
</div>

> 🎥 **Walkthrough Video**: [**Click here to Play / Download `docs/demo.mp4`**](https://github.com/Draxox/codsoft_tasks/raw/main/EduManage/docs/demo.mp4) (11.6 MB)

> 💡 *A complete walkthrough showing the full operational lifecycle: Role-Based Access Control (RBAC) ➔ Admin overview & student enrollment ➔ 403 Forbidden security interception on student identity ➔ Faculty classroom roll call & examination score evaluation ➔ Student personalized report card & online fee clearance.*

---

## 🌟 Key Features

### 👔 1. Institutional Administration Portal (`/`)
- **Key Metrics Dashboard**: Live counters for total enrolled students, faculty members, institutional attendance average, and total tuition collected.
- **Student Information Directory**: Searchable, filterable student records by Grade/Class (`Grade 10-A`, `Grade 10-B`, `Grade 11-Sci`) and Fee status (`Paid`, `Pending`, `Overdue`).
- **Student Enrollment Engine**: Modal to enroll new students with automatic roll number generation (`STU-2026-xxx`) and class assignment.
- **Faculty Roster**: Comprehensive directory of teachers, departments, assigned classrooms, and contact details.
- **Institutional Tuition Ledger**: Track and record term tuition fee payments with instant verification.

### 👨‍🏫 2. Faculty & Teacher Portal (`/teacher`)
- **Classroom Selector**: Switch between assigned classes with student tallies.
- **Daily Attendance Marking Grid**: 1-click toggles for `Present`, `Late`, and `Absent` per student with live attendance tally and bulk *"Mark All Present"* shortcut.
- **Examination Score Entry**: Select subject (Mathematics, Physics, Computer Science, English) and enter marks out of 100 with auto-calculated letter grades (`A+`, `A`, `B`, `C`).

### 🎓 3. Student & Parent Academic Portal (`/student`)
- **Student Profile**: Roll Number, Class, and parent contact details.
- **Attendance Tracker**: Visual term attendance percentage with examination eligibility warnings (`< 75%`).
- **Official Examination Report Card**: Subject-wise scores, maximum marks, distinction aggregates, and letter grades.
- **Online Tuition Fee Simulator**: Term fee statement with interactive 1-click online fee clearance and digital receipt generation.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ / 16 (Turbopack, App Router) | Full-stack React framework & Server Endpoints |
| **Frontend Library** | React 19 | Latest concurrent UI components & hooks |
| **Styling** | Tailwind CSS 4.0 | Modern utility-first responsive styling |
| **Icons** | Lucide React | High-contrast, clean icons |
| **Database** | PostgreSQL 15 | Relational persistence for students, teachers, grades, and attendance |
| **ORM** | Prisma ORM 5.22 | Type-safe schema modeling and queries |

---

## 🚀 Getting Started

### 1. Installation
Navigate to the `EduManage` directory and install dependencies:
```bash
cd EduManage
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

*(Note: EduManage is configured on port 3001 so it can run concurrently with Task 1 DineDesk on port 3000!)*

---

## 🧪 Testing the Complete Workflow

1. **Admin Roster & Enrollment**:
   - Open `http://localhost:3001`.
   - Inspect the KPI cards and switch between **Student Records**, **Faculty Roster**, and **Tuition Ledger**.
   - Click **Enroll Student** to add a new student.
2. **Teacher Attendance & Grades**:
   - Click **Teacher Portal** in the top navigation bar.
   - Switch class to **Grade 10-A**.
   - Toggle an attendance status (`Late` or `Absent`) and click **Save Attendance Record**.
   - Switch to **Examination Grades Entry**, change a student's marks, and click **Update**.
3. **Student Report Card & Fee Clearance**:
   - Click **Student Portal** in the top navigation bar.
   - Switch between students to view their report cards.
   - For a student with a pending fee (e.g. Rohan Gupta), click **Pay Tuition Fee Online** to simulate clearance and generate a verified digital receipt.

---

## 👨‍💻 Internship Submission Information
- **Internship**: CodSoft Full Stack Web Development Internship
- **Role**: Full Stack Developer
- **Project**: EduManage — Student Management System (Project 2 of 3)
