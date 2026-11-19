import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CareerHub | Modern Recruitment & Job Application Platform",
  description: "Connect job seekers and hiring teams through curated listings, one-click resume applications, and candidate ATS pipelines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-emerald-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-slate-200 py-6 mt-16 text-center text-xs text-slate-500">
          CareerHub Talent Platform &bull; Built for CodSoft Full Stack Web Development Internship (Project 3 of 3)
        </footer>
      </body>
    </html>
  );
}
