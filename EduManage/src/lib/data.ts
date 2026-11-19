export interface StudentData {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  gradeClass: string;
  parentPhone: string;
  avatar: string;
  attendanceRate: number;
  attendances: { date: string; status: "PRESENT" | "ABSENT" | "LATE" }[];
  grades: { subject: string; marks: number; maxMarks: number; grade: string }[];
  feeStatus: "PAID" | "PENDING" | "OVERDUE";
  feeAmount: number;
  feePaidDate?: string;
}

export interface TeacherData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  phone: string;
  classes: string;
  avatar: string;
}

export const initialStudents: StudentData[] = [
  {
    id: "stu-1",
    rollNumber: "STU-2026-101",
    name: "Aarav Patel",
    email: "aarav.patel@school.edu",
    gradeClass: "Grade 10-A",
    parentPhone: "+91 98765 11001",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 94,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "PRESENT" },
      { date: "2026-11-17", status: "PRESENT" },
      { date: "2026-11-16", status: "LATE" },
      { date: "2026-11-15", status: "PRESENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 95, maxMarks: 100, grade: "A+" },
      { subject: "Physics", marks: 88, maxMarks: 100, grade: "A" },
      { subject: "Computer Science", marks: 98, maxMarks: 100, grade: "A+" },
      { subject: "English Literature", marks: 86, maxMarks: 100, grade: "A" },
    ],
    feeStatus: "PAID",
    feeAmount: 45000,
    feePaidDate: "2026-10-15",
  },
  {
    id: "stu-2",
    rollNumber: "STU-2026-102",
    name: "Diya Sharma",
    email: "diya.sharma@school.edu",
    gradeClass: "Grade 10-A",
    parentPhone: "+91 98765 11002",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 98,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "PRESENT" },
      { date: "2026-11-17", status: "PRESENT" },
      { date: "2026-11-16", status: "PRESENT" },
      { date: "2026-11-15", status: "PRESENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 99, maxMarks: 100, grade: "A+" },
      { subject: "Physics", marks: 94, maxMarks: 100, grade: "A+" },
      { subject: "Computer Science", marks: 96, maxMarks: 100, grade: "A+" },
      { subject: "English Literature", marks: 92, maxMarks: 100, grade: "A+" },
    ],
    feeStatus: "PAID",
    feeAmount: 45000,
    feePaidDate: "2026-10-12",
  },
  {
    id: "stu-3",
    rollNumber: "STU-2026-103",
    name: "Rohan Gupta",
    email: "rohan.gupta@school.edu",
    gradeClass: "Grade 10-A",
    parentPhone: "+91 98765 11003",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 88,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "PRESENT" },
      { date: "2026-11-17", status: "ABSENT" },
      { date: "2026-11-16", status: "PRESENT" },
      { date: "2026-11-15", status: "PRESENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 82, maxMarks: 100, grade: "B+" },
      { subject: "Physics", marks: 78, maxMarks: 100, grade: "B" },
      { subject: "Computer Science", marks: 89, maxMarks: 100, grade: "A" },
      { subject: "English Literature", marks: 84, maxMarks: 100, grade: "B+" },
    ],
    feeStatus: "PENDING",
    feeAmount: 45000,
  },
  {
    id: "stu-4",
    rollNumber: "STU-2026-104",
    name: "Ananya Verma",
    email: "ananya.verma@school.edu",
    gradeClass: "Grade 10-B",
    parentPhone: "+91 98765 11004",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 91,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "PRESENT" },
      { date: "2026-11-17", status: "PRESENT" },
      { date: "2026-11-16", status: "PRESENT" },
      { date: "2026-11-15", status: "LATE" },
    ],
    grades: [
      { subject: "Mathematics", marks: 87, maxMarks: 100, grade: "A" },
      { subject: "Physics", marks: 85, maxMarks: 100, grade: "A" },
      { subject: "Computer Science", marks: 91, maxMarks: 100, grade: "A+" },
      { subject: "English Literature", marks: 89, maxMarks: 100, grade: "A" },
    ],
    feeStatus: "PAID",
    feeAmount: 45000,
    feePaidDate: "2026-10-20",
  },
  {
    id: "stu-5",
    rollNumber: "STU-2026-105",
    name: "Kabir Singh",
    email: "kabir.singh@school.edu",
    gradeClass: "Grade 11-Sci",
    parentPhone: "+91 98765 11005",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 79,
    attendances: [
      { date: "2026-11-19", status: "ABSENT" },
      { date: "2026-11-18", status: "ABSENT" },
      { date: "2026-11-17", status: "PRESENT" },
      { date: "2026-11-16", status: "PRESENT" },
      { date: "2026-11-15", status: "ABSENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 74, maxMarks: 100, grade: "C+" },
      { subject: "Physics", marks: 76, maxMarks: 100, grade: "B" },
      { subject: "Computer Science", marks: 85, maxMarks: 100, grade: "A" },
      { subject: "English Literature", marks: 80, maxMarks: 100, grade: "B" },
    ],
    feeStatus: "OVERDUE",
    feeAmount: 52000,
  },
  {
    id: "stu-6",
    rollNumber: "STU-2026-106",
    name: "Meera Joshi",
    email: "meera.joshi@school.edu",
    gradeClass: "Grade 11-Sci",
    parentPhone: "+91 98765 11006",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 96,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "PRESENT" },
      { date: "2026-11-17", status: "PRESENT" },
      { date: "2026-11-16", status: "PRESENT" },
      { date: "2026-11-15", status: "PRESENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 93, maxMarks: 100, grade: "A+" },
      { subject: "Physics", marks: 91, maxMarks: 100, grade: "A+" },
      { subject: "Computer Science", marks: 94, maxMarks: 100, grade: "A+" },
      { subject: "English Literature", marks: 88, maxMarks: 100, grade: "A" },
    ],
    feeStatus: "PAID",
    feeAmount: 52000,
    feePaidDate: "2026-10-18",
  },
  {
    id: "stu-7",
    rollNumber: "STU-2026-107",
    name: "Ishaan Nair",
    email: "ishaan.nair@school.edu",
    gradeClass: "Grade 10-B",
    parentPhone: "+91 98765 11007",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 85,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "LATE" },
      { date: "2026-11-17", status: "PRESENT" },
      { date: "2026-11-16", status: "ABSENT" },
      { date: "2026-11-15", status: "PRESENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 79, maxMarks: 100, grade: "B" },
      { subject: "Physics", marks: 81, maxMarks: 100, grade: "A" },
      { subject: "Computer Science", marks: 88, maxMarks: 100, grade: "A" },
      { subject: "English Literature", marks: 83, maxMarks: 100, grade: "B+" },
    ],
    feeStatus: "PAID",
    feeAmount: 45000,
    feePaidDate: "2026-10-25",
  },
  {
    id: "stu-8",
    rollNumber: "STU-2026-108",
    name: "Tanya Roy",
    email: "tanya.roy@school.edu",
    gradeClass: "Grade 11-Sci",
    parentPhone: "+91 98765 11008",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 92,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "PRESENT" },
      { date: "2026-11-17", status: "PRESENT" },
      { date: "2026-11-16", status: "PRESENT" },
      { date: "2026-11-15", status: "PRESENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 89, maxMarks: 100, grade: "A" },
      { subject: "Physics", marks: 92, maxMarks: 100, grade: "A+" },
      { subject: "Computer Science", marks: 95, maxMarks: 100, grade: "A+" },
      { subject: "English Literature", marks: 90, maxMarks: 100, grade: "A+" },
    ],
    feeStatus: "PENDING",
    feeAmount: 52000,
  },
  {
    id: "stu-9",
    rollNumber: "STU-2026-109",
    name: "Vikramaditya Rao",
    email: "vikramaditya.rao@school.edu",
    gradeClass: "Grade 12-Sci",
    parentPhone: "+91 98765 11009",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 97,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "PRESENT" },
      { date: "2026-11-17", status: "PRESENT" },
      { date: "2026-11-16", status: "PRESENT" },
      { date: "2026-11-15", status: "PRESENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 98, maxMarks: 100, grade: "A+" },
      { subject: "Physics", marks: 96, maxMarks: 100, grade: "A+" },
      { subject: "Computer Science", marks: 99, maxMarks: 100, grade: "A+" },
      { subject: "English Literature", marks: 94, maxMarks: 100, grade: "A+" },
    ],
    feeStatus: "PAID",
    feeAmount: 58000,
    feePaidDate: "2026-10-05",
  },
  {
    id: "stu-10",
    rollNumber: "STU-2026-110",
    name: "Sanya Kapoor",
    email: "sanya.kapoor@school.edu",
    gradeClass: "Grade 12-Sci",
    parentPhone: "+91 98765 11010",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    attendanceRate: 90,
    attendances: [
      { date: "2026-11-19", status: "PRESENT" },
      { date: "2026-11-18", status: "PRESENT" },
      { date: "2026-11-17", status: "LATE" },
      { date: "2026-11-16", status: "PRESENT" },
      { date: "2026-11-15", status: "PRESENT" },
    ],
    grades: [
      { subject: "Mathematics", marks: 84, maxMarks: 100, grade: "A" },
      { subject: "Physics", marks: 86, maxMarks: 100, grade: "A" },
      { subject: "Computer Science", marks: 90, maxMarks: 100, grade: "A+" },
      { subject: "English Literature", marks: 92, maxMarks: 100, grade: "A+" },
    ],
    feeStatus: "OVERDUE",
    feeAmount: 58000,
  },
];

export const initialTeachers: TeacherData[] = [
  {
    id: "tch-1",
    employeeId: "TCH-501",
    name: "Dr. Rajesh Sharma",
    email: "rajesh.sharma@school.edu",
    department: "Mathematics & Statistics",
    phone: "+91 98111 22334",
    classes: "Grade 10-A, Grade 11-Sci, Grade 12-Sci",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tch-2",
    employeeId: "TCH-502",
    name: "Prof. Priya Sen",
    email: "priya.sen@school.edu",
    department: "Computer Science & AI",
    phone: "+91 98222 33445",
    classes: "Grade 10-A, Grade 10-B, Grade 11-Sci",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tch-3",
    employeeId: "TCH-503",
    name: "Sunita Rao",
    email: "sunita.rao@school.edu",
    department: "Physics & Chemistry",
    phone: "+91 98333 44556",
    classes: "Grade 10-B, Grade 11-Sci, Grade 12-Sci",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tch-4",
    employeeId: "TCH-504",
    name: "Vikram Roy",
    email: "vikram.roy@school.edu",
    department: "English & Social Sciences",
    phone: "+91 98444 55667",
    classes: "Grade 10-A, Grade 10-B",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tch-5",
    employeeId: "TCH-505",
    name: "Dr. Alok Nath",
    email: "alok.nath@school.edu",
    department: "Economics & Business",
    phone: "+91 98555 66778",
    classes: "Grade 11-Sci, Grade 12-Sci",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

// Global Singleton in-memory state store
const globalEdu = globalThis as unknown as {
  edumanage_students?: StudentData[];
  edumanage_teachers?: TeacherData[];
};

export const eduStore = {
  getStudents(): StudentData[] {
    if (!globalEdu.edumanage_students) {
      globalEdu.edumanage_students = JSON.parse(JSON.stringify(initialStudents));
    }
    return globalEdu.edumanage_students!;
  },

  getStudent(id: string): StudentData | undefined {
    return this.getStudents().find((s) => s.id === id || s.rollNumber === id);
  },

  addStudent(student: Omit<StudentData, "id" | "attendanceRate" | "attendances" | "grades">): StudentData {
    const students = this.getStudents();
    const newStudent: StudentData = {
      ...student,
      id: "stu-" + Date.now(),
      attendanceRate: 100,
      attendances: [{ date: new Date().toISOString().split("T")[0], status: "PRESENT" }],
      grades: [
        { subject: "Mathematics", marks: 85, maxMarks: 100, grade: "A" },
        { subject: "Physics", marks: 80, maxMarks: 100, grade: "A" },
        { subject: "Computer Science", marks: 90, maxMarks: 100, grade: "A+" },
        { subject: "English Literature", marks: 85, maxMarks: 100, grade: "A" },
      ],
    };
    students.unshift(newStudent);
    return newStudent;
  },

  updateAttendance(studentId: string, status: "PRESENT" | "ABSENT" | "LATE"): boolean {
    const student = this.getStudent(studentId);
    if (!student) return false;
    const today = new Date().toISOString().split("T")[0];
    const existing = student.attendances.find((a) => a.date === today);
    if (existing) {
      existing.status = status;
    } else {
      student.attendances.unshift({ date: today, status });
    }

    const presentCount = student.attendances.filter((a) => a.status === "PRESENT").length;
    student.attendanceRate = Math.round((presentCount / student.attendances.length) * 100);
    return true;
  },

  updateGrade(studentId: string, subject: string, marks: number): boolean {
    const student = this.getStudent(studentId);
    if (!student) return false;
    const gradeObj = student.grades.find((g) => g.subject.toLowerCase() === subject.toLowerCase());
    const calculateLetter = (m: number) => {
      if (m >= 90) return "A+";
      if (m >= 80) return "A";
      if (m >= 70) return "B";
      if (m >= 60) return "C";
      return "D";
    };

    if (gradeObj) {
      gradeObj.marks = marks;
      gradeObj.grade = calculateLetter(marks);
    } else {
      student.grades.push({
        subject,
        marks,
        maxMarks: 100,
        grade: calculateLetter(marks),
      });
    }
    return true;
  },

  payFee(studentId: string): boolean {
    const student = this.getStudent(studentId);
    if (!student) return false;
    student.feeStatus = "PAID";
    student.feePaidDate = new Date().toISOString().split("T")[0];
    return true;
  },

  getTeachers(): TeacherData[] {
    if (!globalEdu.edumanage_teachers) {
      globalEdu.edumanage_teachers = JSON.parse(JSON.stringify(initialTeachers));
    }
    return globalEdu.edumanage_teachers!;
  },

  addTeacher(teacher: Omit<TeacherData, "id">): TeacherData {
    const teachers = this.getTeachers();
    const newTeacher: TeacherData = {
      ...teacher,
      id: "tch-" + Date.now(),
    };
    teachers.push(newTeacher);
    return newTeacher;
  },

  getStats() {
    const students = this.getStudents();
    const teachers = this.getTeachers();
    const totalFeesCollected = students
      .filter((s) => s.feeStatus === "PAID")
      .reduce((sum, s) => sum + s.feeAmount, 0);
    const avgAttendance = Math.round(
      students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length
    );

    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalClasses: 4,
      avgAttendance,
      totalFeesCollected,
      pendingFeeStudents: students.filter((s) => s.feeStatus !== "PAID").length,
    };
  },
};
