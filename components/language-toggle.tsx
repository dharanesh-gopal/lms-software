"use client"

import { useLanguageStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { locale, setLocale } = useLanguageStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "en" ? "ta" : "en")}
      className="flex items-center gap-1.5 text-sm"
    >
      <Languages className="h-4 w-4" />
      <span>{locale === "en" ? "தமிழ்" : "English"}</span>
    </Button>
  )
}
