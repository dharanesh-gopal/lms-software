"use client"

import { useAuthStore, useLanguageStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, BarChart3 } from "lucide-react"
import { mockAIPrediction, mockRecommendations, subjectPerformanceData, riskStudents } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: 12,
}

export default function AIInsightsPage() {
  const { t, locale } = useLanguageStore()
  const { user } = useAuthStore()

  const radarData = subjectPerformanceData.map((d) => ({
    subject: d.subject,
    score: d.score,
    fullMark: 100,
  }))

  const isStudentView = user?.role === "student"
  const isAdminView = user?.role === "super_admin" || user?.role === "school_admin"
  const isFacultyView = user?.role === "faculty"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("nav.ai")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered predictions, risk analysis, and personalized learning recommendations
        </p>
      </div>

      {/* AI Prediction Banner (Student) */}
      {isStudentView && (
        <Card className="border-0 shadow-sm bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--sidebar-primary))]/20">
                  <Brain className="h-7 w-7 text-[hsl(var(--sidebar-primary))]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t("ai.predictedScore")}</h3>
                  <p className="text-sm text-[hsl(var(--sidebar-foreground))]/60">
                    Based on your learning patterns and quiz performance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[hsl(var(--sidebar-primary))]">{mockAIPrediction.predictedScore}%</p>
                  <p className="text-xs text-[hsl(var(--sidebar-foreground))]/60">
                    {t("ai.confidence")}: {Math.round(mockAIPrediction.confidence * 100)}%
                  </p>
                </div>
                <Badge
                  className={`text-sm px-3 py-1 ${
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
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Factors Influencing Score */}
        {isStudentView && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[hsl(var(--warning))]" />
                Key Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {mockAIPrediction.factors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                    <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      idx < 2 ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" : "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]"
                    }`}>
                      {idx + 1}
                    </div>
                    <p className="text-sm">{factor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subject Strength Radar */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              {isStudentView ? "Your Strength Map" : "Average Student Strength Map"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Personalized Recommendations (Student) */}
        {isStudentView && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-[hsl(var(--primary))]" />
                {t("ai.recommendations")}
              </CardTitle>
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
                    <Badge variant="outline" className="text-xs capitalize shrink-0">{rec.priority}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* At-Risk Students (Faculty/Admin) */}
        {(isFacultyView || isAdminView) && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                AI-Detected At-Risk Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {riskStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        student.risk === "high"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]"
                      }`}>
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{student.score}%</p>
                        <Progress value={student.score} className="h-1 w-16 mt-1" />
                      </div>
                      <Badge variant={student.risk === "high" ? "destructive" : "secondary"} className="text-xs">
                        {student.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Predicted Performance Distribution (Admin) */}
        {isAdminView && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[hsl(var(--primary))]" />
                AI Performance Predictions by Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={subjectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="score" fill="hsl(var(--primary))" name="Predicted" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="average" fill="hsl(var(--muted))" name="Current Avg" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Improvement Suggestions (Faculty) */}
        {isFacultyView && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[hsl(var(--accent))]" />
                AI Teaching Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {[
                  { title: "Focus on Trigonometry", desc: "78% difficulty rate - consider additional practice sessions", priority: "high" },
                  { title: "Review Optics Unit", desc: "Students scoring 15% below average - visual aids recommended", priority: "high" },
                  { title: "Extend Algebra Sessions", desc: "Good progress but 35% still below benchmark", priority: "medium" },
                  { title: "Genetics Needs Revision", desc: "Common misconceptions detected in quiz responses", priority: "medium" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg border p-3">
                    <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      item.priority === "high" ? "bg-destructive/10 text-destructive" : "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]"
                    }`}>
                      <Lightbulb className="h-3 w-3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize shrink-0">{item.priority}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
