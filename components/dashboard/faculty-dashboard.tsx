"use client"

import Link from "next/link"
import { useLanguageStore } from "@/lib/store"
import { StatCard } from "./stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Video, ClipboardList, BookOpen, Upload, AlertTriangle, BarChart3, Plus } from "lucide-react"
import { classAverageData, riskStudents, unitDifficultyData, mockAssessments } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

export function FacultyDashboard() {
  const { t } = useLanguageStore()

  const recentUploads = [
    { id: 1, title: "Real Numbers - Introduction", type: "video", date: "2024-10-15" },
    { id: 2, title: "Algebra Worksheet", type: "pdf", date: "2024-10-14" },
    { id: 3, title: "Geometry Practice Quiz", type: "quiz", date: "2024-10-12" },
    { id: 4, title: "Newton's Laws Explained", type: "video", date: "2024-10-10" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground text-balance">{t("role.faculty")} {t("common.dashboard")}</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your classes, content, and assessments</p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm">
            <Link href="/dashboard/upload-lesson"><Upload className="h-4 w-4 mr-1.5" />{t("faculty.uploadLesson")}</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/create-quiz"><Plus className="h-4 w-4 mr-1.5" />{t("faculty.createQuiz")}</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="My Students" value="126" change={3} icon={Users} />
        <StatCard title="Videos Uploaded" value="34" change={12} icon={Video} iconColor="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]" />
        <StatCard title="Quizzes Created" value="18" change={8} icon={ClipboardList} iconColor="bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" />
        <StatCard title="Avg. Class Score" value="74%" change={5} icon={BarChart3} iconColor="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Unit Difficulty Scatter */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("analytics.unitDifficulty")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="difficulty" name="Difficulty" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" label={{ value: "Difficulty %", position: "bottom", fontSize: 11 }} />
                <YAxis dataKey="avgScore" name="Avg Score" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" label={{ value: "Avg Score", angle: -90, position: "left", fontSize: 11 }} />
                <ZAxis range={[60, 200]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => [value, name]}
                />
                <Scatter data={unitDifficultyData} fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* At-Risk Students */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              {t("faculty.riskStudents")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {riskStudents.slice(0, 4).map((student) => (
                <div key={student.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.subject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{student.score}%</span>
                    <Badge variant={student.risk === "high" ? "destructive" : "secondary"} className="text-xs">
                      {student.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Uploads */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {recentUploads.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      upload.type === "video" ? "bg-[hsl(var(--primary))]/10" : upload.type === "pdf" ? "bg-[hsl(var(--accent))]/10" : "bg-[hsl(var(--warning))]/10"
                    }`}>
                      {upload.type === "video" ? <Video className="h-4 w-4 text-[hsl(var(--primary))]" /> :
                       upload.type === "pdf" ? <BookOpen className="h-4 w-4 text-[hsl(var(--accent))]" /> :
                       <ClipboardList className="h-4 w-4 text-[hsl(var(--warning))]" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{upload.title}</p>
                      <p className="text-xs text-muted-foreground">{upload.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">{upload.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assessments */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("dashboard.upcomingAssessments")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {mockAssessments.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{a.title_en}</p>
                    <p className="text-xs text-muted-foreground">{a.duration} min / {a.totalMarks} marks</p>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">{a.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
