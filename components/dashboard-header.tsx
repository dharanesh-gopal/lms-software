"use client"

import { useAuthStore, useLanguageStore } from "@/lib/store"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  const { user } = useAuthStore()
  const { t } = useLanguageStore()

  if (!user) return null

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-medium text-card-foreground">{t("dashboard.welcome")}, {user.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {t(`role.${user.role}`)}
          </Badge>
        </div>
      </div>
    </header>
  )
}
