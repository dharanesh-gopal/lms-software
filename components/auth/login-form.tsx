"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react"

interface LoginFormProps {
  onSwitchToRegister: () => void
  onSwitchToForgot: () => void
}

export function LoginForm({ onSwitchToRegister, onSwitchToForgot }: LoginFormProps) {
  const { login, isLoading } = useAuthStore()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
    }
  }

  return (
    <div className="w-full max-w-md">
      <Card className="border-0 shadow-xl bg-card">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            Access your KalviPlus account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex gap-2 bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-11 h-11 bg-background"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-semibold text-foreground">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={onSwitchToForgot}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-11 pr-11 h-11 bg-background"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 font-medium text-base shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
