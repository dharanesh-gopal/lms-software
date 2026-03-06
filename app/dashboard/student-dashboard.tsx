'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Zap, TrendingUp, Trophy, Clock, BarChart3 } from 'lucide-react';

interface StudentDashboardStats {
  coursesEnrolled: number;
  totalLessonsWatched: number;
  averageQuizScore: number;
  quizzesTaken: number;
  totalTimeSpent: number;
  courseProgress: any[];
}

export default function StudentDashboard() {
  const [stats, setStats] = useState<StudentDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchDashboardStats();
  }, []);

  async function fetchDashboardStats() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/dashboard/student`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
  
  if (!stats) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-600">Error loading dashboard</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          Welcome Back! 👋
        </h1>
        <p className="text-gray-600">Track your learning progress and achieve your goals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Courses Enrolled */}
        <div className="card-hover group relative bg-white rounded-2xl p-8 border border-gray-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition duration-500"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-600 transition">
                <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Courses Enrolled</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900">{stats.coursesEnrolled}</p>
            <p className="text-xs text-gray-500 mt-2">Active courses</p>
          </div>
        </div>

        {/* Lessons Watched */}
        <div className="card-hover group relative bg-white rounded-2xl p-8 border border-gray-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition duration-500"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-600 transition">
                <TrendingUp className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Lessons Watched</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900">{stats.totalLessonsWatched}</p>
            <p className="text-xs text-gray-500 mt-2">Total videos completed</p>
          </div>
        </div>

        {/* Avg Quiz Score */}
        <div className="card-hover group relative bg-white rounded-2xl p-8 border border-gray-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition duration-500"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-600 transition">
                <Trophy className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Avg Quiz Score</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900">{stats.averageQuizScore}%</p>
            <p className="text-xs text-gray-500 mt-2">Your performance</p>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Quizzes Taken */}
        <div className="card-hover bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Quizzes Taken</h2>
              <p className="text-sm text-gray-500">Total assessments completed</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-5xl font-bold text-gray-900">{stats.quizzesTaken}</p>
        </div>

        {/* Time Spent */}
        <div className="card-hover bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Time Invested</h2>
              <p className="text-sm text-gray-500">Total study duration</p>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-5xl font-bold text-gray-900">
            {Math.round(stats.totalTimeSpent / 3600)}<span className="text-2xl ml-2">h</span>
          </p>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-xl">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Course Progress</h2>
            <p className="text-sm text-gray-500 mt-1">Your completion status</p>
          </div>
        </div>

        <div className="space-y-6">
          {stats.courseProgress.map((cp, idx) => (
            <div key={idx} className="group">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-900">Course {idx + 1}</span>
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {cp.progress}%
                </span>
              </div>
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/50" 
                  style={{ width: `${cp.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {cp.lessonsCompleted} of {cp.totalLessons} lessons completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
