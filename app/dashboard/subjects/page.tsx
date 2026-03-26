"use client"

import { useState } from "react"
import { useLanguageStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, ChevronRight } from "lucide-react"
import { mockSubjects, mockUnits, mockLessons } from "@/lib/mock-data"
import type { Standard, Medium } from "@/lib/types"
import Link from "next/link"

export default function SubjectsPage() {
  const { t } = useLanguageStore()
  const [standard, setStandard] = useState<Standard>("10")
  const [medium, setMedium] = useState<Medium>("english")
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null)

  const filteredSubjects = mockSubjects.filter(
    (s) => s.standard === standard && s.medium === medium
  )

  const units = selectedSubjectId
    ? mockUnits.filter((u) => u.subjectId === selectedSubjectId)
    : []

  const lessons = selectedUnitId
    ? mockLessons.filter((l) => l.unitId === selectedUnitId)
    : []

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("nav.subjects")}</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse subjects by standard and medium</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={standard} onValueChange={(v) => { setStandard(v as Standard); setSelectedSubjectId(null); setSelectedUnitId(null) }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">{t("standard.10")}</SelectItem>
            <SelectItem value="12">{t("standard.12")}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={medium} onValueChange={(v) => { setMedium(v as Medium); setSelectedSubjectId(null); setSelectedUnitId(null) }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">{t("medium.english")}</SelectItem>
            <SelectItem value="tamil">{t("medium.tamil")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
        <button onClick={() => { setSelectedSubjectId(null); setSelectedUnitId(null) }} className="hover:text-foreground">
          {t("nav.subjects")}
        </button>
        {selectedSubjectId && (
          <>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => setSelectedUnitId(null)} className="hover:text-foreground">
              {filteredSubjects.find((s) => s.id === selectedSubjectId)?.name_en}
            </button>
          </>
        )}
        {selectedUnitId && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">
              {units.find((u) => u.id === selectedUnitId)?.name_en}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      {!selectedSubjectId && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.map((subject) => (
            <Card
              key={subject.id}
              className="border-0 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-[hsl(var(--primary))]/20"
              onClick={() => setSelectedSubjectId(subject.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10">
                    <BookOpen className="h-5 w-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-card-foreground">
                      {subject.name_en}
                    </h3>
                    <Badge variant="outline" className="text-[10px] mt-2 font-mono">{subject.code}</Badge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedSubjectId && !selectedUnitId && (
        <div className="flex flex-col gap-3">
          {units.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No units available for this subject yet.</p>
              </CardContent>
            </Card>
          ) : (
            units.map((unit) => (
              <Card
                key={unit.id}
                className="border-0 shadow-sm cursor-pointer transition-all hover:shadow-md"
                onClick={() => setSelectedUnitId(unit.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent))]/10 text-sm font-bold text-[hsl(var(--accent))]">
                        {unit.unitNumber}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{unit.name_en}</h3>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {selectedUnitId && (
        <div className="flex flex-col gap-3">
          {lessons.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No lessons available for this unit yet.</p>
              </CardContent>
            </Card>
          ) : (
            lessons.map((lesson) => (
              <Card key={lesson.id} className="border-0 shadow-sm transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-sm font-bold text-[hsl(var(--primary))]">
                        {lesson.lessonNumber}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{lesson.title_en}</h3>
                        {lesson.description_en && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {lesson.description_en}
                          </p>
                        )}
                        {lesson.duration && (
                          <Badge variant="secondary" className="text-[10px] mt-1">{lesson.duration} min</Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/videos">View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
