"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { useLanguageStore } from "@/lib/store"
import { BookOpen, Sparkles } from "lucide-react"

type AuthView = "login" | "register" | "forgot"

import Image from "next/image"

export function AuthPage() {
  const [view, setView] = useState<AuthView>("login")

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel - Branding (Distinctive Edge Layout) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden bg-white">
        
        {/* Slanted Top Header Background */}
        <div 
          className="absolute top-0 left-0 w-full h-[35%] bg-gradient-to-r from-blue-700 to-cyan-400"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)" }}
        ></div>

        {/* Top Header Text */}
        <div className="relative z-20 pt-16 px-12">
          <h1 className="text-4xl font-extrabold text-white tracking-wide uppercase mb-3">
            LMS DISTINCTIVE EDGE
          </h1>
          <p className="text-2xl text-white/90 font-light tracking-wide max-w-xl leading-snug">
            Cultivating Adaptive Problem-Solvers<br />Through Skill-Building
          </p>
        </div>

        {/* Main Content Area (Image + Paragraph) */}
        <div className="relative z-10 flex flex-1 w-full mt-10">
          
          {/* Left Side: Circular Background + Student Image */}
          <div className="relative w-[45%] flex items-end justify-center">
            {/* The circular background */}
            <div className="absolute bottom-0 left-4 w-96 h-96 bg-cyan-200 rounded-full blur-sm -z-10 translate-y-12"></div>
            <div className="relative w-full h-[500px] flex items-end justify-center">
              <Image 
                src="/images/auth-hero.png" 
                alt="Happy Student" 
                layout="fill"
                objectFit="contain"
                objectPosition="bottom center"
                className="drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right Side: Descriptive Text */}
          <div className="w-[55%] flex items-center pr-16 pl-6 pt-16 pb-8">
            <p className="text-slate-800 text-[15px] font-medium leading-relaxed text-justify">
              One unique aspect of LMS is its incorporation of a specialized "skill-builder" section with its lessons. This innovative feature equips students with the ability to apply the acquired concepts to a wide range of problem types, fostering a deep understanding and adaptability that extends beyond rote learning. This focus on holistic skill development sets LMS apart, enabling students to excel not only in exams but also in real-world problem-solving scenarios.
            </p>
          </div>
          
        </div>

        {/* Bottom Right Slanted Shape */}
        <div 
          className="absolute bottom-0 right-0 w-1/2 h-[15%] bg-cyan-500"
          style={{ clipPath: "polygon(100% 100%, 100% 20%, 50% 100%)" }}
        ></div>
        
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 relative bg-background">

        <div className="lg:hidden mb-10 text-center w-full max-w-sm">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">LMS</h1>
          </div>
          <p className="text-sm text-muted-foreground">Learning Management System</p>
        </div>

        <div className="w-full max-w-[440px] px-4 sm:px-0">
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
    </div>
  )
}
