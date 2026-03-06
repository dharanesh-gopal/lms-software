"use client"

import Link from "next/link"
import { useLanguageStore } from "@/lib/store"
import { StatCard } from "./stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Trophy, Brain, Target, Play, ArrowRight } from "lucide-react"
import {
  mockPerformanceAnalytics,
  mockRecommendations,
  mockAIPrediction,
  subjectPerformanceData,
  monthlyProgressData,
  mockSubjects,
} from "@/lib/mock-data"
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
  Area,
  AreaChart,
} from "recharts"

export function StudentDashboard() {
  const { t, locale } = useLanguageStore()

  const enrolledSubjects = mockSubjects.filter((s) => s.standard === "10" && s.medium === "english")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">{t("role.student")} {t("common.dashboard")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("standard.10")} - {t("medium.english")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t("student.enrolledSubjects")} value="6" icon={BookOpen} />
        <StatCard title="Quizzes Completed" value="12" change={15} icon={Trophy} iconColor="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]" />
        <StatCard title={t("ai.predictedScore")} value={`${mockAIPrediction.predictedScore}%`} change={3} icon={Brain} iconColor="bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" />
        <StatCard title="Overall Progress" value="65%" change={8} icon={Target} iconColor="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" />
      </div>

      {/* AI Prediction Card */}
      <Card className="border-0 shadow-sm bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--sidebar-primary))]/20">
                <Brain className="h-6 w-6 text-[hsl(var(--sidebar-primary))]" />
              </div>
              <div>
                <h3 className="font-semibold">{t("ai.predictedScore")}</h3>
                <p className="text-sm text-[hsl(var(--sidebar-foreground))]/60">Based on your current performance and AI analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-[hsl(var(--sidebar-primary))]">{mockAIPrediction.predictedScore}%</p>
                <p className="text-xs text-[hsl(var(--sidebar-foreground))]/60">{t("ai.confidence")}: {Math.round(mockAIPrediction.confidence * 100)}%</p>
              </div>
              <Badge
                className={`text-xs ${
                  mockAIPrediction.riskLevel === "low"
                    ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))] border-0"
                    : mockAIPrediction.riskLevel === "medium"
                    ? "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))] border-0"
                    : "bg-destructive/20 text-destructive border-0"
                }`}
              >
                {mockAIPrediction.riskLevel} risk
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Subject Performance */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("analytics.subjectPerformance")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={subjectPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" name="Your Score" radius={[6, 6, 0, 0]} />
                <Bar dataKey="average" fill="hsl(var(--muted))" name="Class Avg" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Progress Over Time */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("analytics.progressOverTime")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Enrolled Subjects */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("student.enrolledSubjects")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {enrolledSubjects.map((subject) => {
                const perf = mockPerformanceAnalytics.find((p) => p.subjectId === subject.id)
                return (
                  <Link
                    key={subject.id}
                    href={`/dashboard/subjects`}
                    className="group flex flex-col gap-2 rounded-xl border p-3 transition-all hover:shadow-md hover:border-[hsl(var(--primary))]/30"
                  >
                    <p className="text-sm font-medium group-hover:text-[hsl(var(--primary))]">
                      {locale === "ta" ? subject.name_ta : subject.name_en}
                    </p>
                    {perf && (
                      <>
                        <Progress value={perf.progressPercentage} className="h-1.5" />
                        <p className="text-xs text-muted-foreground">{perf.progressPercentage}% complete</p>
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("ai.recommendations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {mockRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    rec.priority === "high" ? "bg-destructive/10 text-destructive" : rec.priority === "medium" ? "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" : "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                  }`}>
                    <Target className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{locale === "ta" ? rec.title_ta : rec.title_en}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {locale === "ta" ? rec.description_ta : rec.description_en}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize shrink-0">{rec.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
