"use client"

import { useLanguageStore } from "@/lib/store"
import { StatCard } from "./stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { School, Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react"
import { mockSchools, districtPerformanceData, subjectPerformanceData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"

export function AdminDashboard() {
  const { t, locale } = useLanguageStore()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">{t("role.super_admin")} {t("common.dashboard")}</h1>
        <p className="text-sm text-muted-foreground mt-1">State-wide overview of the Tamil Nadu LMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t("dashboard.totalSchools")} value="2,847" change={12} icon={School} />
        <StatCard title={t("dashboard.totalStudents")} value="1.2M" change={8} icon={Users} iconColor="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]" />
        <StatCard title={t("dashboard.totalFaculty")} value="48,520" change={5} icon={GraduationCap} iconColor="bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" />
        <StatCard title={t("dashboard.totalSubjects")} value="22" change={0} icon={BookOpen} iconColor="bg-[hsl(var(--chart-4))]/10 text-[hsl(var(--chart-4))]" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* District Performance */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("dashboard.districtComparison")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={districtPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="district" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="average" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("dashboard.performanceOverview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={subjectPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="subject" type="category" width={90} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="hsl(var(--primary))" name="State Average" radius={[0, 6, 6, 0]} />
                <Bar dataKey="average" fill="hsl(var(--accent))" name="National Average" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Schools Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">{t("nav.schools")}</CardTitle>
            <Badge variant="secondary" className="text-xs">{mockSchools.length} schools</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">School</th>
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">District</th>
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">Students</th>
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">Faculty</th>
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">Code</th>
                </tr>
              </thead>
              <tbody>
                {mockSchools.map((school) => (
                  <tr key={school.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 font-medium">{locale === "ta" ? school.name_ta : school.name_en}</td>
                    <td className="py-3 px-2 text-muted-foreground">{school.district}</td>
                    <td className="py-3 px-2">{school.studentCount.toLocaleString()}</td>
                    <td className="py-3 px-2">{school.facultyCount}</td>
                    <td className="py-3 px-2"><Badge variant="outline" className="text-xs font-mono">{school.code}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
