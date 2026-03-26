// ===== User Roles =====
export type UserRole = "super_admin" | "school_admin" | "faculty" | "student" | "parent"

// ===== User =====
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  schoolId?: string
  avatar?: string
  phone?: string
  subjects?: Subject[] // multiple subjects support
  createdAt: string
}

// ===== School =====
export interface School {
  id: string
  name_en: string
  district: string
  code: string
  principalName: string
  studentCount: number
  facultyCount: number
  createdAt: string
}

// ===== Academic Hierarchy =====
export type Standard = "10" | "12"
export type Medium = "english" | "tamil"

export interface Subject {
  id: string
  name_en: string
  standard: Standard
  medium: Medium
  code: string
  icon?: string
}

export interface Unit {
  id: string
  subjectId: string
  name_en: string
  unitNumber: number
  description_en?: string
  }

export interface Lesson {
  id: string
  unitId: string
  title_en: string
  lessonNumber: number
  videoUrl?: string
  notesUrl?: string
  duration?: number
  description_en?: string
  }

// ===== Assessment =====
export interface Assessment {
  id: string
  subjectId: string
  unitId?: string
  title_en: string
  type: "quiz" | "exam" | "assignment"
  totalMarks: number
  duration: number // in minutes
  questionCount: number
  createdBy: string
  createdAt: string
}

export interface Question {
  id: string
  assessmentId: string
  question_en: string
  options_en: string[]
  []
  correctAnswer: number
  marks: number
  explanation_en?: string
  }

export interface Result {
  id: string
  studentId: string
  assessmentId: string
  score: number
  totalMarks: number
  percentage: number
  timeTaken: number
  attemptDate: string
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[]
}

// ===== Analytics =====
export interface PerformanceAnalytics {
  id: string
  studentId: string
  subjectId: string
  averageScore: number
  totalAttempts: number
  strongUnits: string[]
  weakUnits: string[]
  progressPercentage: number
  lastUpdated: string
}

export interface Recommendation {
  id: string
  studentId: string
  type: "lesson" | "practice" | "review"
  title_en: string
  description_en: string
  priority: "high" | "medium" | "low"
  lessonId?: string
}

// ===== AI Predictions =====
export interface AIPrediction {
  predictedScore: number
  riskLevel: "low" | "medium" | "high"
  confidence: number
  factors: string[]
}

// ===== Attendance =====
export interface Attendance {
  id: string
  studentId: string
  date: string
  status: "present" | "absent" | "late"
  subjectId?: string
}

// ===== Navigation =====
export interface NavItem {
  title: string
  titleKey: string
  href: string
  icon: string
  roles: UserRole[]
  children?: NavItem[]
}

// ===== Dashboard Stats =====
export interface DashboardStat {
  label: string
  value: string | number
  change?: number
  icon: string
}
