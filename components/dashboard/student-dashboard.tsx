"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLanguageStore } from "@/lib/store"
import { StatCard } from "./stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Trophy, Brain, Target, Play, ArrowRight, Star, Award } from "lucide-react"
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
  const [gamification, setGamification] = useState<any>(null)

  useEffect(() => {
    async function fetchGamification() {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/dashboard/student`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setGamification(data.gamification)
        }
      } catch (err) {
        console.error('Failed to fetch gamification:', err)
      }
    }
    fetchGamification()
  }, [])

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

      {/* Gamification Profile */}
      {gamification && (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 mt-2 mb-4 flex flex-col md:flex-row gap-8 items-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
          
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 p-1.5 shadow-lg shadow-orange-500/30">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Level</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-rose-600 leading-none">{gamification.level}</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full p-2 border-4 border-white shadow-md">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10">
            <div className="flex justify-between items-end mb-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Scholar Journey</h2>
                <p className="text-sm text-gray-500">Keep learning to level up and earn badges!</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">{gamification.xp}</span>
                <span className="text-sm font-semibold text-gray-400"> / {gamification.nextLevelXp} XP</span>
              </div>
            </div>
            
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-6 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full transition-all duration-1000 relative" 
                style={{ width: `${Math.min(100, (gamification.xp / gamification.nextLevelXp) * 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            
            {gamification.badges && gamification.badges.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Earned Badges</p>
                <div className="flex gap-3 flex-wrap">
                  {gamification.badges.map((badge: any, idx: number) => (
                    <div key={idx} className="group relative flex items-center gap-2 bg-white border border-orange-100 hover:border-orange-300 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all cursor-default overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Award className="w-5 h-5 text-orange-500 relative z-10" />
                      <div className="relative z-10">
                        <span className="block text-sm font-bold text-gray-800">{badge.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(!gamification.badges || gamification.badges.length === 0) && (
              <p className="text-sm text-gray-400 italic">No badges earned yet. Complete a quiz to earn your first badge!</p>
            )}
          </div>
        </div>
      )}

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
