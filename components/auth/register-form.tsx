"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useLanguageStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Loader2, AlertCircle } from "lucide-react"
import type { UserRole } from "@/lib/types"

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { t } = useLanguageStore()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("student")
  const [standard, setStandard] = useState("")
  const [classTeaching, setClassTeaching] = useState("")
  const [subjects, setSubjects] = useState<any[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchingSubjects, setFetchingSubjects] = useState(false)

  // Fetch subjects when standard/classTeaching changes
  useEffect(() => {
    if ((role === "student" && standard) || (role === "faculty" && classTeaching)) {
      fetchSubjects()
    }
  }, [standard, classTeaching, role])

  async function fetchSubjects() {
    try {
      setFetchingSubjects(true)
      const stdToFetch = role === "student" ? standard : classTeaching
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/standards/${stdToFetch}/subjects`
      
      console.log("Fetching subjects from:", apiUrl)
      
      const res = await fetch(apiUrl)
      if (res.ok) {
        const data = await res.json()
        console.log("Subjects fetched:", data)
        setSubjects(data)
        setSelectedSubjects([])
      } else {
        console.error("Failed to fetch subjects - Status:", res.status, res.statusText)
        setError(`Failed to load subjects (HTTP ${res.status})`)
      }
    } catch (err) {
      console.error("Error fetching subjects:", err)
      setError("Failed to load subjects - check if backend is running on port 5001")
    } finally {
      setFetchingSubjects(false)
    }
  }

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate required fields
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (role === "student" && !standard) {
      setError("Please select your standard")
      return
    }

    if (role === "faculty" && !classTeaching) {
      setError("Please select the class you teach")
      return
    }

    if (selectedSubjects.length === 0) {
      setError("Please select at least one subject")
      return
    }

    setLoading(true)

    try {
      const payload: any = {
        name,
        email,
        password,
        role,
        subjects: selectedSubjects,
      }

      if (role === "student") {
        payload.standard = parseInt(standard)
      } else if (role === "faculty") {
        payload.classTeaching = classTeaching
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Signup failed")
      }

      const { token, user } = await res.json()
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during signup")
    } finally {
      setLoading(false)
    }
  }

  const isSubmitDisabled =
    loading ||
    !name ||
    !email ||
    !password ||
    selectedSubjects.length === 0 ||
    (role === "student" && !standard) ||
    (role === "faculty" && !classTeaching) ||
    fetchingSubjects

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-card">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
          <GraduationCap className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">{t("auth.register.title")}</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">{t("auth.register.subtitle")}</CardDescription>
        
        {/* Step Indicator */}
        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          <span className={name && email && password ? "text-green-600 font-semibold" : ""}>
            1. Account
          </span>
          <span className={role ? "text-green-600 font-semibold" : ""}>
            2. Role
          </span>
          <span className={(role === "student" && standard) || (role === "faculty" && classTeaching) ? "text-green-600 font-semibold" : ""}>
            3. Class
          </span>
          <span className={selectedSubjects.length > 0 ? "text-green-600 font-semibold" : ""}>
            4. Subjects
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="flex gap-2 bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">{t("auth.register.name")}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="reg-email">{t("auth.login.email")}</Label>
            <Input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="reg-password">{t("auth.login.password")}</Label>
            <Input
              id="reg-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("auth.register.role")}</Label>
            <Select value={role} onValueChange={(v) => {
              setRole(v as UserRole)
              setStandard("")
              setClassTeaching("")
              setSelectedSubjects([])
              setSubjects([])
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">{t("role.student")}</SelectItem>
                <SelectItem value="faculty">{t("role.faculty")}</SelectItem>
                <SelectItem value="school_admin">{t("role.school_admin")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === "student" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="standard">Select Your Standard *</Label>
              <Select value={standard} onValueChange={setStandard}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your standard..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10th Grade</SelectItem>
                  <SelectItem value="11">11th Grade</SelectItem>
                  <SelectItem value="12">12th Grade</SelectItem>
                </SelectContent>
              </Select>
              {standard && (
                <p className="text-xs text-blue-600">✓ Standard selected - Choose your subjects below</p>
              )}
            </div>
          )}

          {role === "faculty" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="class-teaching">Class to Teach *</Label>
              <Select value={classTeaching} onValueChange={setClassTeaching}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose the class you teach..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10th Grade</SelectItem>
                  <SelectItem value="11">11th Grade</SelectItem>
                  <SelectItem value="12">12th Grade</SelectItem>
                </SelectContent>
              </Select>
              {classTeaching && (
                <p className="text-xs text-blue-600">✓ Class selected - Choose your subjects below</p>
              )}
            </div>
          )}

          {((role === "student" && standard) || (role === "faculty" && classTeaching)) && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label>Select Subjects * ({selectedSubjects.length} selected)</Label>
                {fetchingSubjects && (
                  <span className="text-xs text-blue-600 animate-pulse">Loading subjects...</span>
                )}
              </div>
              {subjects.length > 0 ? (
                <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200 max-h-48 overflow-y-auto">
                  {subjects.map((subj) => (
                    <div key={subj._id} className="flex items-center gap-2">
                      <Checkbox
                        id={`subject-${subj._id}`}
                        checked={selectedSubjects.includes(subj._id)}
                        onCheckedChange={() => toggleSubject(subj._id)}
                        disabled={fetchingSubjects}
                      />
                      <label
                        htmlFor={`subject-${subj._id}`}
                        className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {subj.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : fetchingSubjects ? (
                <div className="px-4 py-2 border rounded-lg text-center text-sm text-muted-foreground">
                  Loading subjects...
                </div>
              ) : (
                <div className="px-4 py-2 border rounded-lg text-center text-sm text-red-600">
                  No subjects available for this standard
                </div>
              )}
              {selectedSubjects.length > 0 && (
                <p className="text-xs text-green-600">✓ {selectedSubjects.length} subject{selectedSubjects.length !== 1 ? 's' : ''} selected</p>
              )}
            </div>
          )}

          <Button type="submit" disabled={isSubmitDisabled} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {loading ? "Registering..." : t("common.register")}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {t("auth.register.haveAccount")}{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-[hsl(var(--primary))] hover:underline"
          >
            {t("auth.register.signIn")}
          </button>
        </p>
      </CardContent>
    </Card>
  )
}
