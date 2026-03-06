"use client"

import { useLanguageStore } from "@/lib/store"
import { StatCard } from "./stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, BookOpen, Award, AlertTriangle } from "lucide-react"
import { classAverageData, riskStudents } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export function SchoolAdminDashboard() {
  const { t } = useLanguageStore()

  const facultyList = [
    { id: "f1", name: "Mr. Senthil Nathan", subject: "Mathematics", classes: 3, rating: 4.5 },
    { id: "f2", name: "Mrs. Priya Shankar", subject: "Physics", classes: 2, rating: 4.8 },
    { id: "f3", name: "Mr. Karthikeyan R.", subject: "Chemistry", classes: 3, rating: 4.2 },
    { id: "f4", name: "Ms. Divya M.", subject: "Biology", classes: 2, rating: 4.6 },
    { id: "f5", name: "Mr. Arjun Kumar", subject: "Computer Science", classes: 2, rating: 4.4 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">{t("role.school_admin")} {t("common.dashboard")}</h1>
        <p className="text-sm text-muted-foreground mt-1">Govt. Higher Secondary School, Chennai</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t("dashboard.totalStudents")} value="1,250" change={5} icon={Users} />
        <StatCard title={t("dashboard.totalFaculty")} value="65" change={3} icon={GraduationCap} iconColor="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]" />
        <StatCard title={t("dashboard.totalSubjects")} value="22" change={0} icon={BookOpen} iconColor="bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" />
        <StatCard title="Pass Rate" value="87%" change={4} icon={Award} iconColor="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Class Performance */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("analytics.classAverage")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={classAverageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="className" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
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

        {/* At-Risk Students */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              {t("dashboard.atRiskStudents")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {riskStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.subject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{student.score}%</span>
                    <Badge
                      variant={student.risk === "high" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {student.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">{t("nav.faculty")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">Name</th>
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">Subject</th>
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">Classes</th>
                  <th className="py-3 px-2 text-left font-medium text-muted-foreground">Rating</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((f) => (
                  <tr key={f.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 font-medium">{f.name}</td>
                    <td className="py-3 px-2 text-muted-foreground">{f.subject}</td>
                    <td className="py-3 px-2">{f.classes}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[hsl(var(--warning))]">{"*"}</span>
                        <span>{f.rating}</span>
                      </div>
                    </td>
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
