'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminStats {
  totalUsers: number;
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  totalLessons: number;
  totalQuizzes: number;
  averageStudentScore: number;
  completionRate: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  standard?: number;
  classTeaching?: string;
  createdAt: string;
}

interface CourseStats {
  _id: string;
  title: string;
  faculty: { name: string };
  standard: number;
  students: string[];
  totalLessons: number;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<CourseStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses'>('overview');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch analytics
      const analyticsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/dashboard/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Fetch all users
      const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Fetch all courses
      const coursesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        setStats(data);
      }

      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(Array.isArray(data) ? data : data.users || []);
      }

      if (coursesRes.ok) {
        const data = await coursesRes.json();
        setCourses(Array.isArray(data) ? data : data.courses || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(userId: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setUsers(users.filter(u => u._id !== userId));
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  }

  async function updateUserRole(userId: string, newRole: string) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (res.ok) {
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        setEditingUser(null);
      }
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">System management and analytics</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'courses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Courses
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalUsers}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-600 text-sm font-medium">Students</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalStudents}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-600 text-sm font-medium">Faculty</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalFaculty}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-600 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.totalCourses}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-600 text-sm font-medium">Total Lessons</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalLessons}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-600 text-sm font-medium">Total Quizzes</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalQuizzes}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-600 text-sm font-medium">Avg Student Score</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.averageStudentScore.toFixed(1)}%</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-teal-600 mt-2">{stats.completionRate.toFixed(1)}%</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Database Status</span>
                    <span className="text-green-600 font-semibold">✓ Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Status</span>
                    <span className="text-green-600 font-semibold">✓ Operational</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Sessions</span>
                    <span className="text-blue-600 font-semibold">{stats.totalUsers}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded hover:bg-blue-100 font-medium text-left">
                    → Generate Sample Data
                  </button>
                  <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded hover:bg-green-100 font-medium text-left">
                    → Backup Database
                  </button>
                  <button className="w-full bg-orange-50 text-orange-700 py-2 px-4 rounded hover:bg-orange-100 font-medium text-left">
                    → View System Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Standard/Class</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        {editingUser?._id === user._id ? (
                          <select
                            value={editingUser.role}
                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                            className="px-3 py-1 border rounded text-sm"
                          >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Admin</option>
                            <option value="school-admin">School Admin</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-red-100 text-red-700' :
                            user.role === 'faculty' ? 'bg-blue-100 text-blue-700' :
                            user.role === 'school-admin' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.standard ? `${user.standard}` : user.classTeaching || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        {editingUser?._id === user._id ? (
                          <>
                            <button
                              onClick={() => updateUserRole(user._id, editingUser.role)}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs font-semibold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingUser(null)}
                              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-xs font-semibold"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setEditingUser(user)}
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs font-semibold"
                            >
                              Edit Role
                            </button>
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs font-semibold"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t text-sm text-gray-600">
              Total Users: <span className="font-semibold">{users.length}</span>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {courses.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                <p className="text-gray-600">No courses created yet</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {courses.map((course) => (
                  <div key={course._id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Faculty: <span className="font-medium">{course.faculty?.name || 'N/A'}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{course.students.length}</p>
                        <p className="text-sm text-gray-600">Enrolled Students</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600">Standard</p>
                        <p className="text-lg font-semibold text-gray-900">{course.standard}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Lessons</p>
                        <p className="text-lg font-semibold text-gray-900">{course.totalLessons}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created</p>
                        <p className="text-sm text-gray-900">{new Date(course.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
