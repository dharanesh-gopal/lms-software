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

  login: async (email: string) => {
    set({ isLoading: true })
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800))
    const user = DEMO_USERS[email]
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false })
    } else {
      // Default to student for any email
      set({
        user: {
          id: "u_new",
          name: email.split("@")[0],
          email,
          role: "student",
          createdAt: new Date().toISOString(),
        },
        isAuthenticated: true,
        isLoading: false,
      })
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
  locale: "en" | "ta"
  setLocale: (locale: "en" | "ta") => void
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

    // Language
    "language.english": "English",
    "language.tamil": "Tamil",
    "language.toggle": "Switch Language",
  },
  ta: {
    // Common
    "app.title": "TN EduLearn LMS",
    "app.subtitle": "தமிழ்நாடு கற்றல் மேலாண்மை அமைப்பு",
    "common.dashboard": "டாஷ்போர்ட்",
    "common.home": "முகப்பு",
    "common.settings": "அமைப்புகள்",
    "common.profile": "சுயவிவரம்",
    "common.logout": "வெளியேறு",
    "common.login": "உள்நுழைய",
    "common.register": "பதிவு செய்ய",
    "common.submit": "சமர்ப்பி",
    "common.cancel": "ரத்து செய்",
    "common.save": "சேமி",
    "common.delete": "நீக்கு",
    "common.edit": "திருத்து",
    "common.view": "பார்",
    "common.search": "தேடு",
    "common.filter": "வடிகட்டி",
    "common.loading": "ஏற்றுகிறது...",
    "common.noData": "தரவு இல்லை",
    "common.actions": "செயல்கள்",
    "common.status": "நிலை",
    "common.all": "அனைத்தும்",
    "common.back": "பின்னால்",

    // Auth
    "auth.login.title": "உள்நுழைய",
    "auth.login.subtitle": "உங்கள் KalviPlus கணக்கை அணுகவும்",
    "auth.login.email": "மின்னஞ்சல் முகவரி",
    "auth.login.password": "கடவுச்சொல்",
    "auth.login.forgotPassword": "கடவுச்சொல் மறந்துவிட்டதா?",
    "auth.login.noAccount": "கணக்கு இல்லையா?",
    "auth.login.signUp": "பதிவு செய்யவும்",
    "auth.register.title": "கணக்கை உருவாக்கு",
    "auth.register.subtitle": "KalviPlus இல் சேரவும்",
    "auth.register.name": "முழு பெயர்",
    "auth.register.role": "பாத்திரத்தைத் தேர்ந்தெடுக்கவும்",
    "auth.register.haveAccount": "ஏற்கனவே கணக்கு உள்ளதா?",
    "auth.register.signIn": "உள்நுழையவும்",
    "auth.forgotPassword.title": "கடவுச்சொல்லை மீட்டமை",
    "auth.forgotPassword.subtitle": "மீட்டமை இணைப்பைப் பெற உங்கள் மின்னஞ்சலை உள்ளிடவும்",
    "auth.forgotPassword.send": "மீட்டமை இணைப்பை அனுப்பு",
    "auth.forgotPassword.backToLogin": "உள்நுழைவுக்குத் திரும்பு",

    // Roles
    "role.super_admin": "முதன்மை நிர்வாகி",
    "role.school_admin": "பள்ளி நிர்வாகி",
    "role.faculty": "ஆசிரியர்",
    "role.student": "மாணவர்",
    "role.parent": "பெற்றோர்",

    // Navigation
    "nav.dashboard": "டாஷ்போர்ட்",
    "nav.schools": "பள்ளிகள்",
    "nav.students": "மாணவர்கள்",
    "nav.faculty": "ஆசிரியர்கள்",
    "nav.subjects": "பாடங்கள்",
    "nav.lessons": "பாடங்கள்",
    "nav.assessments": "மதிப்பீடுகள்",
    "nav.analytics": "பகுப்பாய்வு",
    "nav.ai": "AI நுண்ணறிவு",
    "nav.videos": "வீடியோக்கள்",
    "nav.quizzes": "வினாடி வினா",
    "nav.results": "முடிவுகள்",
    "nav.attendance": "வருகை",
    "nav.documentation": "ஆவணங்கள்",
    "nav.content": "உள்ளடக்கம்",
    "nav.performance": "செயல்திறன்",
    "nav.recommendations": "பரிந்துரைகள்",

    // Standards & Medium
    "standard.10": "10ஆம் வகுப்பு",
    "standard.11": "11ஆம் வகுப்பு",
    "standard.12": "12ஆம் வகுப்பு",
    "medium.english": "ஆங்கில வழி",
    "medium.tamil": "தமிழ் வழி",

    // Subjects
    "subject.mathematics": "கணிதம்",
    "subject.science": "அறிவியல்",
    "subject.physics": "இயற்பியல்",
    "subject.chemistry": "வேதியியல்",
    "subject.biology": "உயிரியல்",
    "subject.computerScience": "கணினி அறிவியல்",

    // Dashboard
    "dashboard.welcome": "மீண்டும் வரவேற்கிறோம்",
    "dashboard.totalSchools": "மொத்த பள்ளிகள்",
    "dashboard.totalStudents": "மொத்த மாணவர்கள்",
    "dashboard.totalFaculty": "மொத்த ஆசிரியர்கள்",
    "dashboard.totalSubjects": "மொத்த பாடங்கள்",
    "dashboard.recentActivity": "சமீபத்திய செயல்பாடு",
    "dashboard.performanceOverview": "செயல்திறன் கண்ணோட்டம்",
    "dashboard.districtComparison": "மாவட்ட ஒப்பீடு",
    "dashboard.topPerformers": "சிறந்த மாணவர்கள்",
    "dashboard.atRiskStudents": "ஆபத்தில் உள்ள மாணவர்கள்",
    "dashboard.upcomingAssessments": "வரவிருக்கும் மதிப்பீடுகள்",

    // Faculty
    "faculty.uploadLesson": "பாடம் பதிவேற்றம்",
    "faculty.uploadVideo": "வீடியோ பதிவேற்றம்",
    "faculty.uploadPDF": "PDF பதிவேற்றம்",
    "faculty.createQuiz": "வினாடி வினா உருவாக்கு",
    "faculty.classAnalytics": "வகுப்பு பகுப்பாய்வு",
    "faculty.riskStudents": "ஆபத்தில் உள்ள மாணவர்கள்",

    // Student
    "student.enrolledSubjects": "சேர்ந்த பாடங்கள்",
    "student.watchVideos": "வீடியோ பார்",
    "student.attemptQuiz": "வினாடி வினா முயற்சி",
    "student.myPerformance": "என் செயல்திறன்",
    "student.predictedScore": "கணிக்கப்பட்ட மதிப்பெண்",
    "student.recommendedLessons": "பரிந்துரைக்கப்பட்ட பாடங்கள்",

    // AI
    "ai.predictedScore": "கணிக்கப்பட்ட இறுதி மதிப்பெண்",
    "ai.riskLevel": "ஆபத்து நிலை",
    "ai.recommendations": "தனிப்பட்ட பரிந்துரைகள்",
    "ai.confidence": "நம்பிக்கை",

    // Assessment
    "assessment.create": "மதிப்பீடு உருவாக்கு",
    "assessment.title": "மதிப்பீடு தலைப்பு",
    "assessment.type": "வகை",
    "assessment.duration": "கால அளவு (நிமிடங்கள்)",
    "assessment.totalMarks": "மொத்த மதிப்பெண்கள்",
    "assessment.questions": "கேள்விகள்",
    "assessment.addQuestion": "கேள்வி சேர்",
    "assessment.start": "மதிப்பீடு தொடங்கு",
    "assessment.submit": "மதிப்பீடு சமர்ப்பி",
    "assessment.timeRemaining": "மீதமுள்ள நேரம்",
    "assessment.score": "உங்கள் மதிப்பெண்",
    "assessment.passed": "தேர்ச்சி",
    "assessment.failed": "மேம்பாடு தேவை",

    // Analytics
    "analytics.subjectPerformance": "பாட செயல்திறன்",
    "analytics.progressOverTime": "நேரப்போக்கில் முன்னேற்றம்",
    "analytics.weakAreas": "பலவீனமான பகுதிகள்",
    "analytics.classAverage": "வகுப்பு சராசரி",
    "analytics.unitDifficulty": "அலகு சிரமம்",
    "analytics.schoolComparison": "பள்ளி ஒப்பீடு",
    "analytics.districtPerformance": "மாவட்ட செயல்திறன்",

    // Language
    "language.english": "English",
    "language.tamil": "தமிழ்",
    "language.toggle": "மொழி மாற்று",
  },
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  locale: "en",
  setLocale: (locale) => set({ locale }),
  t: (key: string) => {
    const { locale } = get()
    return translations[locale]?.[key] || key
  },
}))
