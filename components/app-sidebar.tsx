"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  School,
  Users,
  GraduationCap,
  BookOpen,
  Video,
  FileText,
  BarChart3,
  Brain,
  ClipboardList,
  Trophy,
  Calendar,
  FileCode,
  Upload,
  AlertTriangle,
  Target,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { useAuthStore } from "@/lib/store"
import type { UserRole } from "@/lib/types"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavSection {
  label: string
  items: {
    title: string
    href: string
    icon: React.ReactNode
    roles: UserRole[]
  }[]
}

function getNavSections(): NavSection[] {
  return [
    {
      label: "Main",
      items: [
        { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" />, roles: ["super_admin", "school_admin", "faculty", "student"] },
      ],
    },
    {
      label: "Management",
      items: [
        { title: "Schools", href: "/dashboard/schools", icon: <School className="h-4 w-4" />, roles: ["super_admin"] },
        { title: "Students", href: "/dashboard/students", icon: <Users className="h-4 w-4" />, roles: ["super_admin", "school_admin", "faculty"] },
        { title: "Faculty", href: "/dashboard/faculty", icon: <GraduationCap className="h-4 w-4" />, roles: ["super_admin", "school_admin"] },
      ],
    },
    {
      label: "Academic",
      items: [
        { title: "Subjects", href: "/dashboard/subjects", icon: <BookOpen className="h-4 w-4" />, roles: ["super_admin", "school_admin", "faculty", "student"] },
        { title: "Lessons", href: "/dashboard/lessons", icon: <FileText className="h-4 w-4" />, roles: ["faculty", "student"] },
        { title: "Videos", href: "/dashboard/videos", icon: <Video className="h-4 w-4" />, roles: ["faculty", "student"] },
      ],
    },
    {
      label: "Assessment",
      items: [
        { title: "Quizzes", href: "/dashboard/quizzes", icon: <ClipboardList className="h-4 w-4" />, roles: ["faculty", "student"] },
        { title: "Results", href: "/dashboard/results", icon: <Trophy className="h-4 w-4" />, roles: ["faculty", "student"] },
      ],
    },
    {
      label: "Content (Faculty)",
      items: [
        { title: "Upload Lesson", href: "/dashboard/upload-lesson", icon: <Upload className="h-4 w-4" />, roles: ["faculty"] },
        { title: "Create Quiz", href: "/dashboard/create-quiz", icon: <ClipboardList className="h-4 w-4" />, roles: ["faculty"] },
        { title: "At-Risk Students", href: "/dashboard/risk-students", icon: <AlertTriangle className="h-4 w-4" />, roles: ["faculty"] },
      ],
    },
    {
      label: "Insights",
      items: [
        { title: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="h-4 w-4" />, roles: ["super_admin", "school_admin", "faculty", "student"] },
        { title: "AI Insights", href: "/dashboard/ai-insights", icon: <Brain className="h-4 w-4" />, roles: ["super_admin", "school_admin", "faculty", "student"] },
        { title: "Recommendations", href: "/dashboard/recommendations", icon: <Target className="h-4 w-4" />, roles: ["student"] },
        { title: "Attendance", href: "/dashboard/attendance", icon: <Calendar className="h-4 w-4" />, roles: ["school_admin", "faculty"] },
      ],
    },
    {
      label: "System",
      items: [
        { title: "Documentation", href: "/dashboard/documentation", icon: <FileCode className="h-4 w-4" />, roles: ["super_admin"] },
      ],
    },
  ]
}

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const navSections = getNavSections()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  const filteredSections = navSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.roles.includes(user.role)),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">KalviPlus</span>
            <span className="text-[10px] text-sidebar-foreground/60">LMS</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {filteredSections.map((section) => (
          <Collapsible key={section.label} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  {section.label}
                  <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname === item.href}>
                          <Link href={item.href}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-3">
        <div className="flex items-center gap-2 rounded-lg p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-xs">
              {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-xs font-medium text-sidebar-foreground">{user.name}</span>
            <span className="truncate text-[10px] text-sidebar-foreground/60 capitalize">{user.role.replace("_", " ")}</span>
          </div>
          <button onClick={handleLogout} className="rounded-md p-1.5 hover:bg-sidebar-accent" title="Logout">
            <LogOut className="h-3.5 w-3.5 text-sidebar-foreground/60" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
