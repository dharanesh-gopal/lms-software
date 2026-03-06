"use client"

import { useAuthStore } from "@/lib/store"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { SchoolAdminDashboard } from "@/components/dashboard/school-admin-dashboard"
import { FacultyDashboard } from "@/components/dashboard/faculty-dashboard"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"

export default function DashboardPage() {
  const { user } = useAuthStore()

  if (!user) return null

  switch (user.role) {
    case "super_admin":
      return <AdminDashboard />
    case "school_admin":
      return <SchoolAdminDashboard />
    case "faculty":
      return <FacultyDashboard />
    case "student":
      return <StudentDashboard />
    default:
      return <StudentDashboard />
  }
}
