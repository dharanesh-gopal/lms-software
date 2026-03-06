'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Lesson {
  _id: string;
  title: string;
  order: number;
  videoUrl?: string;
  duration?: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  subject: { name: string };
  faculty: { name: string };
  standard: string;
  totalLessons: number;
  lessons?: Lesson[];
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      if (parsed.role !== 'student') {
        router.push('/dashboard');
        return;
      }
    }

    fetchEnrolledCourses();
  }, []);

  async function fetchEnrolledCourses() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const allCourses = await res.json();
        // Filter for user's standard
        const filtered = allCourses.filter(
          (c: Course) => c.standard === user?.standard
        );
        setCourses(filtered);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-8">Loading your courses...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-gray-600">
          Standard: <span className="font-semibold">{user?.standard}th Grade</span>
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
          <Link
            href="/dashboard/courses"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold">{course.title}</h2>
                <p className="text-blue-100 mt-1">{course.subject?.name}</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm">Faculty</p>
                    <p className="text-lg font-semibold">{course.faculty?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Lessons</p>
                    <p className="text-lg font-semibold">{course.totalLessons || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Standard</p>
                    <p className="text-lg font-semibold">{course.standard}th Grade</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700">{course.description}</p>
                </div>

                {course.lessons && course.lessons.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Lessons</h3>
                    <div className="space-y-2">
                      {course.lessons
                        .sort((a, b) => a.order - b.order)
                        .map((lesson) => (
                          <div key={lesson._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-semibold text-sm">
                              {lesson.order}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{lesson.title}</p>
                              {lesson.duration && (
                                <p className="text-sm text-gray-600">
                                  Duration: {Math.floor(lesson.duration / 60)} min
                                </p>
                              )}
                            </div>
                            {lesson.videoUrl && (
                              <Link
                                href={`/dashboard/courses/${course._id}/lesson/${lesson._id}`}
                                className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                              >
                                Watch
                              </Link>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/courses/${course._id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center font-semibold"
                  >
                    View Course
                  </Link>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-semibold">
                    Take Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
