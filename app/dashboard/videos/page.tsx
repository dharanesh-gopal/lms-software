"use client"

import { useState } from "react"
import { useLanguageStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Video, Play, Pause, Volume2, Maximize, ChevronLeft, Clock, BookOpen } from "lucide-react"
import { mockLessons, mockUnits, mockSubjects } from "@/lib/mock-data"

export default function VideosPage() {
  const { t, locale } = useLanguageStore()
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(35)

  const lesson = mockLessons.find((l) => l.id === selectedLesson)

  if (selectedLesson && lesson) {
    return (
      <div className="flex flex-col gap-6">
        <Button variant="ghost" size="sm" className="w-fit" onClick={() => setSelectedLesson(null)}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("common.back")}
        </Button>

        {/* Video Player */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="relative aspect-video bg-[hsl(var(--sidebar-background))] flex items-center justify-center">
            <div className="text-center">
              <Video className="h-16 w-16 text-[hsl(var(--sidebar-foreground))]/40 mx-auto mb-3" />
              <p className="text-[hsl(var(--sidebar-foreground))]/60 text-sm">
                Video Player - {locale === "ta" ? lesson.title_ta : lesson.title_en}
              </p>
              <p className="text-[hsl(var(--sidebar-foreground))]/40 text-xs mt-1">
                Video content would stream here from the backend
              </p>
            </div>
            {/* Player Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="mb-2">
                <Slider
                  value={[progress]}
                  onValueChange={([v]) => setProgress(v)}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between text-[hsl(var(--sidebar-foreground))]">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:opacity-80">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <Volume2 className="h-4 w-4" />
                  <span className="text-xs">
                    {Math.floor((progress / 100) * (lesson.duration || 45))}:{String(Math.floor(Math.random() * 60)).padStart(2, "0")} / {lesson.duration || 45}:00
                  </span>
                </div>
                <Maximize className="h-4 w-4 cursor-pointer hover:opacity-80" />
              </div>
            </div>
          </div>
        </Card>

        {/* Lesson Details */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">{locale === "ta" ? lesson.title_ta : lesson.title_en}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {locale === "ta" ? lesson.description_ta || "" : lesson.description_en || ""}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lesson.duration && <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />{lesson.duration} min</Badge>}
                  <Badge variant="outline">Lesson {lesson.lessonNumber}</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-1">Watch Progress</p>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Related Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {mockLessons.filter((l) => l.id !== selectedLesson).slice(0, 4).map((l) => (
                    <button
                      key={l.id}
                      onClick={() => { setSelectedLesson(l.id); setProgress(0) }}
                      className="flex items-center gap-2 rounded-lg p-2 text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--primary))]/10 text-xs font-bold text-[hsl(var(--primary))]">
                        {l.lessonNumber}
                      </div>
                      <span className="text-xs font-medium truncate">{locale === "ta" ? l.title_ta : l.title_en}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("nav.videos")}</h1>
        <p className="text-sm text-muted-foreground mt-1">Watch video lessons for your enrolled subjects</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockLessons.map((lesson) => {
          const unit = mockUnits.find((u) => u.id === lesson.unitId)
          return (
            <Card
              key={lesson.id}
              className="border-0 shadow-sm cursor-pointer transition-all hover:shadow-md group"
              onClick={() => setSelectedLesson(lesson.id)}
            >
              <div className="relative aspect-video bg-muted rounded-t-xl flex items-center justify-center">
                <div className="absolute inset-0 bg-[hsl(var(--sidebar-background))]/80 rounded-t-xl flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]/90 group-hover:bg-[hsl(var(--primary))] transition-colors">
                    <Play className="h-5 w-5 text-[hsl(var(--primary-foreground))] ml-0.5" />
                  </div>
                </div>
                {lesson.duration && (
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0 text-[10px]">
                    {lesson.duration} min
                  </Badge>
                )}
              </div>
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold line-clamp-1">
                  {locale === "ta" ? lesson.title_ta : lesson.title_en}
                </h3>
                {unit && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {locale === "ta" ? unit.name_ta : unit.name_en}
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
