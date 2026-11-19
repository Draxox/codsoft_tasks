"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "ADMIN" | "TEACHER" | "STUDENT";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  rollNumber?: string;
  employeeId?: string;
  gradeClass?: string;
  department?: string;
}

export const DEMO_ACCOUNTS: UserSession[] = [
  {
    id: "adm-1",
    name: "Dr. Evelyn Vance",
    email: "evelyn.vance@school.edu",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    employeeId: "ADM-001",
    department: "Office of the Principal",
  },
  {
    id: "tch-1",
    name: "Dr. Rajesh Sharma",
    email: "rajesh.sharma@school.edu",
    role: "TEACHER",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    employeeId: "TCH-501",
    department: "Mathematics & Statistics",
    gradeClass: "Grade 10-A",
  },
  {
    id: "tch-2",
    name: "Prof. Priya Sen",
    email: "priya.sen@school.edu",
    role: "TEACHER",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=200&q=80",
    employeeId: "TCH-502",
    department: "Computer Science & AI",
    gradeClass: "Grade 11-Sci",
  },
  {
    id: "stu-1",
    name: "Aarav Patel",
    email: "aarav.patel@school.edu",
    role: "STUDENT",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    rollNumber: "STU-2026-101",
    gradeClass: "Grade 10-A",
  },
  {
    id: "stu-2",
    name: "Diya Sharma",
    email: "diya.sharma@school.edu",
    role: "STUDENT",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rollNumber: "STU-2026-102",
    gradeClass: "Grade 10-A",
  },
  {
    id: "stu-5",
    name: "Kabir Singh",
    email: "kabir.singh@school.edu",
    role: "STUDENT",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rollNumber: "STU-2026-105",
    gradeClass: "Grade 11-Sci",
  },
];

interface AuthContextType {
  currentUser: UserSession;
  loginAs: (account: UserSession) => void;
  switchRole: (role: Role) => void;
  hasAccess: (allowedRoles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserSession>(DEMO_ACCOUNTS[0]); // Defaults to Admin

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("edumanage_user");
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const loginAs = (account: UserSession) => {
    setCurrentUser(account);
    try {
      localStorage.setItem("edumanage_user", JSON.stringify(account));
    } catch (e) {
      // ignore
    }
  };

  const switchRole = (role: Role) => {
    const match = DEMO_ACCOUNTS.find((a) => a.role === role);
    if (match) {
      loginAs(match);
    }
  };

  const hasAccess = (allowedRoles: Role[]) => {
    return allowedRoles.includes(currentUser.role);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginAs,
        switchRole,
        hasAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
