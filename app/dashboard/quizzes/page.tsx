"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguageStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ClipboardList, Clock, ChevronLeft, CheckCircle, XCircle, Trophy, Timer } from "lucide-react"
import { mockAssessments, mockQuestions } from "@/lib/mock-data"

type QuizState = "list" | "taking" | "result"

export default function QuizzesPage() {
  const { t, locale } = useLanguageStore()
  const [quizState, setQuizState] = useState<QuizState>("list")
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)

  const assessment = mockAssessments.find((a) => a.id === activeAssessment)
  const questions = mockQuestions.filter((q) => q.assessmentId === activeAssessment)

  const finishQuiz = useCallback(() => {
    setQuizState("result")
  }, [])

  useEffect(() => {
    if (quizState !== "taking" || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [quizState, timeLeft, finishQuiz])

  const startQuiz = (id: string) => {
    const a = mockAssessments.find((a) => a.id === id)
    if (!a) return
    setActiveAssessment(id)
    setCurrentQuestionIdx(0)
    setAnswers({})
    setTimeLeft(a.duration * 60)
    setQuizState("taking")
  }

  const selectAnswer = (questionId: string, answerIdx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIdx }))
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, "0")}`
  }

  // Calculate score
  const calculateScore = () => {
    let correct = 0
    let total = 0
    questions.forEach((q) => {
      total += q.marks
      if (answers[q.id] === q.correctAnswer) correct += q.marks
    })
    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 }
  }

  // Taking Quiz
  if (quizState === "taking" && assessment && questions.length > 0) {
    const currentQ = questions[currentQuestionIdx]
    if (!currentQ) return null

    return (
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {/* Timer Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">{locale === "ta" ? assessment.title_ta : assessment.title_en}</h2>
            <p className="text-xs text-muted-foreground">
              Question {currentQuestionIdx + 1} of {questions.length}
            </p>
          </div>
          <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="text-sm font-mono px-3 py-1">
            <Timer className="h-3.5 w-3.5 mr-1.5" />
            {formatTime(timeLeft)}
          </Badge>
        </div>

        <Progress value={((currentQuestionIdx + 1) / questions.length) * 100} className="h-1.5" />

        {/* Question Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <p className="text-base font-medium mb-6">
              {locale === "ta" ? currentQ.question_ta : currentQ.question_en}
            </p>
            <RadioGroup
              value={answers[currentQ.id]?.toString()}
              onValueChange={(v) => selectAnswer(currentQ.id, parseInt(v))}
            >
              <div className="flex flex-col gap-3">
                {(locale === "ta" ? currentQ.options_ta : currentQ.options_en).map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => selectAnswer(currentQ.id, idx)}>
                    <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} />
                    <Label htmlFor={`opt-${idx}`} className="cursor-pointer flex-1 text-sm">{opt}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={currentQuestionIdx === 0}
            onClick={() => setCurrentQuestionIdx((p) => p - 1)}
          >
            Previous
          </Button>
          <div className="flex gap-1.5">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIdx(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  idx === currentQuestionIdx
                    ? "bg-[hsl(var(--primary))]"
                    : answers[questions[idx]?.id ?? ""] !== undefined
                    ? "bg-[hsl(var(--accent))]"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          {currentQuestionIdx === questions.length - 1 ? (
            <Button onClick={finishQuiz}>{t("assessment.submit")}</Button>
          ) : (
            <Button onClick={() => setCurrentQuestionIdx((p) => p + 1)}>Next</Button>
          )}
        </div>
      </div>
    )
  }

  // Result
  if (quizState === "result" && assessment) {
    const { correct, total, percentage } = calculateScore()
    const passed = percentage >= 50

    return (
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <Button variant="ghost" size="sm" className="w-fit" onClick={() => setQuizState("list")}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("common.back")}
        </Button>

        <Card className="border-0 shadow-sm text-center">
          <CardContent className="p-8">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${passed ? "bg-[hsl(var(--success))]/10" : "bg-destructive/10"}`}>
              {passed ? <Trophy className="h-8 w-8 text-[hsl(var(--success))]" /> : <XCircle className="h-8 w-8 text-destructive" />}
            </div>
            <h2 className="text-xl font-bold mb-1">{passed ? t("assessment.passed") : t("assessment.failed")}</h2>
            <p className="text-sm text-muted-foreground mb-6">{locale === "ta" ? assessment.title_ta : assessment.title_en}</p>
            <div className="text-4xl font-bold text-[hsl(var(--primary))] mb-2">{percentage}%</div>
            <p className="text-sm text-muted-foreground">{correct} / {total} marks</p>
          </CardContent>
        </Card>

        {/* Answer Review */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Answer Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {questions.map((q, idx) => {
                const isCorrect = answers[q.id] === q.correctAnswer
                return (
                  <div key={q.id} className={`rounded-lg border p-4 ${isCorrect ? "border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/5" : "border-destructive/30 bg-destructive/5"}`}>
                    <div className="flex items-start gap-2">
                      {isCorrect ? <CheckCircle className="h-4 w-4 text-[hsl(var(--success))] shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />}
                      <div>
                        <p className="text-sm font-medium">{idx + 1}. {locale === "ta" ? q.question_ta : q.question_en}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Correct: {(locale === "ta" ? q.options_ta : q.options_en)[q.correctAnswer]}
                        </p>
                        {q.explanation_en && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            {locale === "ta" ? q.explanation_ta : q.explanation_en}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz List
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("nav.quizzes")}</h1>
        <p className="text-sm text-muted-foreground mt-1">Take quizzes and track your progress</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockAssessments.map((a) => {
          const qCount = mockQuestions.filter((q) => q.assessmentId === a.id).length
          return (
            <Card key={a.id} className="border-0 shadow-sm transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10">
                    <ClipboardList className="h-5 w-5 text-[hsl(var(--primary))]" />
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">{a.type}</Badge>
                </div>
                <h3 className="text-sm font-semibold mb-1">{locale === "ta" ? a.title_ta : a.title_en}</h3>
                <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.duration} min</span>
                  <span>{a.totalMarks} marks</span>
                  <span>{qCount > 0 ? qCount : a.questionCount} questions</span>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-4"
                  disabled={qCount === 0}
                  onClick={() => startQuiz(a.id)}
                >
                  {qCount > 0 ? t("assessment.start") : "No questions available"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
