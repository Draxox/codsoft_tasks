# 🚀 CodSoft Full Stack Web Development Internship Tasks

Repository containing all 3 projects completed for the **CodSoft Full Stack Web Development Internship**.

---

## 📋 Projects Overview

| Task # | Project Name | Description | Tech Stack | Demo Video | Status |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **01** | [**DineDesk**](./DineDesk) | Modern Restaurant Ordering, Contactless QR, Table Reservations & Real-Time Kitchen Display System (KDS) | Next.js 15+, React 19, Tailwind CSS 4, PostgreSQL, Prisma ORM | [🎥 Walkthrough](./DineDesk/README.md#-live-demo-video-walkthrough) | ✅ **Completed** |
| **02** | [**EduManage**](./EduManage) | Student Information System & Academic ERP (Attendance, Grades & Fees) | Next.js 15+, React 19, Tailwind CSS 4, PostgreSQL, Prisma ORM | [🎥 Walkthrough](./EduManage/README.md#-live-demo-video-walkthrough) | ✅ **Completed** |
| **03** | [**CareerHub**](./CareerHub) | Modern Recruitment & Job Application Platform with ATS Candidate Pipeline | Next.js 15+, React 19, Tailwind CSS 4, PostgreSQL, Prisma ORM | [🎥 Walkthrough](./CareerHub/README.md#-live-demo-video-walkthrough) | ✅ **Completed** |

---

## 🍽️ Task 1: DineDesk — Restaurant Management & Kitchen KDS
- **🎥 Live Video Walkthrough**: [View in DineDesk README](./DineDesk/README.md#-live-demo-video-walkthrough)
- **Digital Interactive Menu & Cart**: Contactless QR dining (`/menu?table=4`), dietary filters (Veg/Non-Veg), spice levels, and custom notes.
- **Kitchen Display System (KDS)**: Real-time touch-friendly Kanban prep board (`/kitchen`) with Web Audio chime for chefs.
- **Table Reservation Engine**: Instant booking with section preference (Patio, Window, Hall) and automated table allocation.
- **Live Order Tracker & Payment Simulator**: Real-time 4-stage stepper with simulated instant UPI / Card payments.
- **Manager & Floor Plan Portal**: Dynamic table status manager (`/admin/tables`) with downloadable QR standees, menu stock availability toggles (`/admin/menu`), and revenue analytics.

> For detailed architecture, setup guide, and database schema, see [**DineDesk README**](./DineDesk/README.md).

---

## 🎓 Task 2: EduManage — Student Management System & ERP
- **🎥 Live Video Walkthrough**: [View in EduManage README](./EduManage/README.md#-live-demo-video-walkthrough)
- **Institutional Admin Operations**: Live academic KPI stats, student enrollment modal, searchable directory with Class and Fee filters.
- **Faculty Attendance & Grading**: 1-click attendance roll call board (`Present`, `Late`, `Absent`) and examination score evaluation out of 100 with auto-calculated letter grades (`A+` to `D`).
- **Student & Parent Academic Portal**: Official examination report card, term attendance progress bar with eligibility warnings, and simulated 1-click tuition fee online clearance with verified receipts.

> For detailed architecture, setup guide, and database schema, see [**EduManage README**](./EduManage/README.md).

---

## 💼 Task 3: CareerHub — Recruitment Platform & Candidate ATS
- **🎥 Live Video Walkthrough**: [View in CareerHub README](./CareerHub/README.md#-live-demo-video-walkthrough)
- **Candidate Job Discovery & Search**: Filter openings by role category, employment type (Remote, Hybrid, Full-time), salary range, and technical skills.
- **1-Click Quick Apply**: Modal with candidate credentials, portfolio URL, custom note, and simulated file attachment preview.
- **Live Candidate Pipeline Tracker**: Real-time 4-stage stepper (`Applied` ➔ `Under Review` ➔ `Interview Scheduled` ➔ `Offer Extended`).
- **Recruiter ATS Pipeline Board**: Interactive 4-column Kanban board to review applicant dossiers and advance candidates with 1 click.
- **Job Requisition Publisher**: Employer modal to publish live job requisitions with compensation ranges and required skills.

> For detailed architecture, setup guide, and database schema, see [**CareerHub README**](./CareerHub/README.md).
