"use client"

import { useState } from "react"
import { useLanguageStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, ArrowLeft, CheckCircle } from "lucide-react"

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const { t } = useLanguageStore()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]">
          <GraduationCap className="h-8 w-8 text-[hsl(var(--primary-foreground))]" />
        </div>
        <CardTitle className="text-xl font-semibold">{t("auth.forgotPassword.title")}</CardTitle>
        <CardDescription>{t("auth.forgotPassword.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <CheckCircle className="h-12 w-12 text-[hsl(var(--accent))]" />
            <p className="text-center text-sm text-muted-foreground">
              A password reset link has been sent to <strong>{email}</strong>
            </p>
            <Button variant="outline" onClick={onSwitchToLogin} className="mt-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("auth.forgotPassword.backToLogin")}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="forgot-email">{t("auth.login.email")}</Label>
              <Input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@tnlms.gov.in"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t("auth.forgotPassword.send")}
            </Button>
            <Button variant="ghost" onClick={onSwitchToLogin} className="text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("auth.forgotPassword.backToLogin")}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
