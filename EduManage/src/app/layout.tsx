import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "EduManage | Full-Stack Student Management System & RBAC",
  description: "Centralized institutional platform for managing students, faculty, daily attendance, examinations, and fee records with Role-Based Access Control.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-indigo-600 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="bg-white border-t border-slate-200 py-6 mt-16 text-center text-xs text-slate-500">
            EduManage Student Information System &bull; Role-Based Access Control (RBAC) Architecture &bull; CodSoft Full Stack Web Development Internship
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
