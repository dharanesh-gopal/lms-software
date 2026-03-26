"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, ArrowLeft, CheckCircle } from "lucide-react"

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-card">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
          <GraduationCap className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">Enter your email to receive a reset link</CardDescription>
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
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="forgot-email">Email Address</Label>
              <Input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
            <Button variant="ghost" onClick={onSwitchToLogin} className="text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
