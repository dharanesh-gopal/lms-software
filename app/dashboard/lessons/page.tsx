"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen } from "lucide-react"

export default function LessonsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Lessons</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Lesson Cards */}
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapter {i}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mt-2">Introduction to Concepts</div>
              <p className="text-xs text-muted-foreground mt-1">
                4 Topics • 45 Minutes
              </p>
              <div className="mt-4 flex items-center text-sm text-primary font-medium">
                <BookOpen className="h-4 w-4 mr-2" />
                Start Lesson →
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted rounded-xl bg-muted/10">
        <FileText className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">More lessons coming soon</h3>
        <p className="text-sm text-muted-foreground mt-1 text-center max-w-sm">
          Your instructors are actively adding new learning materials. Check back later for updates.
        </p>
      </div>
    </div>
  )
}
