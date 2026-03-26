"use client"

import { create } from "zustand"
import type { User, UserRole } from "./types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { name: string; email: string; password: string; role: UserRole }) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

// Demo users for different roles
const DEMO_USERS: Record<string, User> = {
  "admin@tnlms.gov.in": {
    id: "u1",
    name: "Dr. Ramesh Kumar",
    email: "admin@tnlms.gov.in",
    role: "super_admin",
    avatar: "",
    createdAt: "2024-01-01",
  },
  "school@tnlms.gov.in": {
    id: "u2",
    name: "Mrs. Lakshmi Devi",
    email: "school@tnlms.gov.in",
    role: "school_admin",
    schoolId: "s1",
    avatar: "",
    createdAt: "2024-01-15",
  },
  "faculty@tnlms.gov.in": {
    id: "u3",
    name: "Mr. Senthil Nathan",
    email: "faculty@tnlms.gov.in",
    role: "faculty",
    schoolId: "s1",
    avatar: "",
    createdAt: "2024-02-01",
  },
  "student@tnlms.gov.in": {
    id: "u4",
    name: "Priya Krishnan",
    email: "student@tnlms.gov.in",
    role: "student",
    schoolId: "s1",
    avatar: "",
    createdAt: "2024-03-01",
  },
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password?: string) => {
    set({ isLoading: true })
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Invalid email or password")
      }

      const { token, user } = await res.json()
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      set({ user, isAuthenticated: true, isLoading: false })
    } catch (err: any) {
      set({ isLoading: false })
      throw err
    }
  },

  register: async (data) => {
    set({ isLoading: true })
    await new Promise((r) => setTimeout(r, 800))
    set({
      user: {
        id: "u_new_" + Date.now(),
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: new Date().toISOString(),
      },
      isAuthenticated: true,
      isLoading: false,
    })
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  setUser: (user) => {
    set({ user, isAuthenticated: true })
  },
}))

// ===== Language Store =====
interface LanguageState {
  locale: "en"
  setLocale: (locale: "en") => void
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  en: {
    // Common
    "app.title": "KalviPlus",
    "app.subtitle": "Tamil Nadu Learning Management System",
    "common.dashboard": "Dashboard",
    "common.home": "Home",
    "common.settings": "Settings",
    "common.profile": "Profile",
    "common.logout": "Logout",
    "common.login": "Login",
    "common.register": "Register",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.loading": "Loading...",
    "common.noData": "No data available",
    "common.actions": "Actions",
    "common.status": "Status",
    "common.all": "All",
    "common.back": "Back",

    // Auth
    "auth.login.title": "Sign In",
    "auth.login.subtitle": "Access your KalviPlus account",
    "auth.login.email": "Email Address",
    "auth.login.password": "Password",
    "auth.login.forgotPassword": "Forgot Password?",
    "auth.login.noAccount": "Don't have an account?",
    "auth.login.signUp": "Sign Up",
    "auth.register.title": "Create Account",
    "auth.register.subtitle": "Join KalviPlus",
    "auth.register.name": "Full Name",
    "auth.register.role": "Select Role",
    "auth.register.haveAccount": "Already have an account?",
    "auth.register.signIn": "Sign In",
    "auth.forgotPassword.title": "Reset Password",
    "auth.forgotPassword.subtitle": "Enter your email to receive a reset link",
    "auth.forgotPassword.send": "Send Reset Link",
    "auth.forgotPassword.backToLogin": "Back to Login",

    // Roles
    "role.super_admin": "Super Admin",
    "role.school_admin": "School Admin",
    "role.faculty": "Faculty",
    "role.student": "Student",
    "role.parent": "Parent",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.schools": "Schools",
    "nav.students": "Students",
    "nav.faculty": "Faculty",
    "nav.subjects": "Subjects",
    "nav.lessons": "Lessons",
    "nav.assessments": "Assessments",
    "nav.analytics": "Analytics",
    "nav.ai": "AI Insights",
    "nav.videos": "Videos",
    "nav.quizzes": "Quizzes",
    "nav.results": "Results",
    "nav.attendance": "Attendance",
    "nav.documentation": "Documentation",
    "nav.content": "Content",
    "nav.performance": "Performance",
    "nav.recommendations": "Recommendations",

    // Standards & Medium
    "standard.10": "10th Standard",
    "standard.11": "11th Standard",
    "standard.12": "12th Standard",
    "medium.english": "English Medium",
    "medium.tamil": "Tamil Medium",

    // Subjects
    "subject.mathematics": "Mathematics",
    "subject.science": "Science",
    "subject.physics": "Physics",
    "subject.chemistry": "Chemistry",
    "subject.biology": "Biology",
    "subject.computerScience": "Computer Science",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.totalSchools": "Total Schools",
    "dashboard.totalStudents": "Total Students",
    "dashboard.totalFaculty": "Total Faculty",
    "dashboard.totalSubjects": "Total Subjects",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.performanceOverview": "Performance Overview",
    "dashboard.districtComparison": "District Comparison",
    "dashboard.topPerformers": "Top Performers",
    "dashboard.atRiskStudents": "At-Risk Students",
    "dashboard.upcomingAssessments": "Upcoming Assessments",

    // Faculty
    "faculty.uploadLesson": "Upload Lesson",
    "faculty.uploadVideo": "Upload Video",
    "faculty.uploadPDF": "Upload PDF",
    "faculty.createQuiz": "Create Quiz",
    "faculty.classAnalytics": "Class Analytics",
    "faculty.riskStudents": "At-Risk Students",

    // Student
    "student.enrolledSubjects": "Enrolled Subjects",
    "student.watchVideos": "Watch Videos",
    "student.attemptQuiz": "Attempt Quiz",
    "student.myPerformance": "My Performance",
    "student.predictedScore": "Predicted Score",
    "student.recommendedLessons": "Recommended Lessons",

    // AI
    "ai.predictedScore": "Predicted Final Score",
    "ai.riskLevel": "Risk Level",
    "ai.recommendations": "Personalized Recommendations",
    "ai.confidence": "Confidence",

    // Assessment
    "assessment.create": "Create Assessment",
    "assessment.title": "Assessment Title",
    "assessment.type": "Type",
    "assessment.duration": "Duration (minutes)",
    "assessment.totalMarks": "Total Marks",
    "assessment.questions": "Questions",
    "assessment.addQuestion": "Add Question",
    "assessment.start": "Start Assessment",
    "assessment.submit": "Submit Assessment",
    "assessment.timeRemaining": "Time Remaining",
    "assessment.score": "Your Score",
    "assessment.passed": "Passed",
    "assessment.failed": "Needs Improvement",

    // Analytics
    "analytics.subjectPerformance": "Subject Performance",
    "analytics.progressOverTime": "Progress Over Time",
    "analytics.weakAreas": "Weak Areas",
    "analytics.classAverage": "Class Average",
    "analytics.unitDifficulty": "Unit Difficulty",
    "analytics.schoolComparison": "School Comparison",
    "analytics.districtPerformance": "District Performance",

  },
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  locale: "en",
  setLocale: (locale) => set({ locale }),
  t: (key: string) => {
    return translations.en[key] || key
  },
}))
