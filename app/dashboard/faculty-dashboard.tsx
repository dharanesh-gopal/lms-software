'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FacultyDashboardStats {
  coursesTaught: number;
  totalStudents: number;
  courseSummary: any[];
  quizStats: {
    totalQuizzes: number;
    avgScore: number;
    passedCount: number;
  };
}

export default function FacultyDashboard() {
  const [stats, setStats] = useState<FacultyDashboardStats | null>(null);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/dashboard/faculty`, {
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

  if (loading) return <div className="p-8">Loading...</div>;
  if (!stats) return <div className="p-8">Error loading dashboard</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Faculty Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <p className="text-gray-700 text-sm">Courses Taught</p>
          <p className="text-3xl font-bold text-blue-600">{stats.coursesTaught}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <p className="text-gray-700 text-sm">Total Students</p>
          <p className="text-3xl font-bold text-green-600">{stats.totalStudents}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg">
          <p className="text-gray-700 text-sm">Avg Quiz Score</p>
          <p className="text-3xl font-bold text-purple-600">
            {stats.quizStats.avgScore.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Quiz Statistics</h2>
          <div className="space-y-2">
            <p className="text-gray-700">Total Quizzes: <span className="font-bold">{stats.quizStats.totalQuizzes}</span></p>
            <p className="text-gray-700">Students Passed: <span className="font-bold">{stats.quizStats.passedCount}</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2">
            Create Course
          </button>
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Upload Video
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
        <div className="space-y-3">
          {stats.courseSummary.map((course) => (
            <div key={course.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{course.title}</p>
                <p className="text-sm text-gray-600">{course.students} students enrolled</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
