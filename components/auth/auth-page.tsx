"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { LanguageToggle } from "../language-toggle"
import { useLanguageStore } from "@/lib/store"
import { BookOpen, Sparkles } from "lucide-react"

type AuthView = "login" | "register" | "forgot"

export function AuthPage() {
  const [view, setView] = useState<AuthView>("login")
  const { t } = useLanguageStore()

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between relative z-10 p-12 text-white">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">{t("app.title")}</h1>
          </div>
          <p className="mt-2 text-lg text-slate-300">{t("app.subtitle")}</p>
        </div>

        <div className="space-y-8">
          {/* Standards Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-slate-200">Available Standards</h2>
            </div>

            <div className="space-y-3">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-slate-800 bg-opacity-80 backdrop-blur-xl border border-slate-700 group-hover:border-cyan-500 rounded-2xl p-4 transition duration-300">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">10</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">10th Standard</p>
                      <p className="text-xs text-slate-500">6 Subjects / 2 Mediums</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-slate-800 bg-opacity-80 backdrop-blur-xl border border-slate-700 group-hover:border-purple-500 rounded-2xl p-4 transition duration-300">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">11</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">11th Standard</p>
                      <p className="text-xs text-slate-500">8 Subjects / 2 Mediums</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-slate-800 bg-opacity-80 backdrop-blur-xl border border-slate-700 group-hover:border-green-500 rounded-2xl p-4 transition duration-300">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">12</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">12th Standard</p>
                      <p className="text-xs text-slate-500">5 Subjects / 2 Mediums</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-slate-800 bg-opacity-40 backdrop-blur-xl border border-slate-700 rounded-2xl p-6">
            <p className="text-sm text-slate-300 leading-relaxed flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Empowering Tamil Nadu students with digital learning. Access video lessons, practice quizzes, and AI-powered insights in both Tamil and English.</span>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Government of Tamil Nadu - Department of Education
        </p>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 relative z-10">
        <div className="absolute top-4 right-4">
          <LanguageToggle />
        </div>

        <div className="lg:hidden mb-8 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">{t("app.title")}</h1>
          </div>
          <p className="text-sm text-slate-400">{t("app.subtitle")}</p>
        </div>

        {view === "login" && (
          <LoginForm
            onSwitchToRegister={() => setView("register")}
            onSwitchToForgot={() => setView("forgot")}
          />
        )}
        {view === "register" && (
          <RegisterForm onSwitchToLogin={() => setView("login")} />
        )}
        {view === "forgot" && (
          <ForgotPasswordForm onSwitchToLogin={() => setView("login")} />
        )}
      </div>
    </div>
  )
}
