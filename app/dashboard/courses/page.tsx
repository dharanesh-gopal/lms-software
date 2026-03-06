'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Course {
  _id: string;
  title: string;
  description: string;
  subject: { name: string };
  standard: string;
  faculty: { name: string };
  totalLessons: number;
  students: any[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedStandard, setSelectedStandard] = useState('11');
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
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.standard) setSelectedStandard(parsedUser.standard);
      if (parsedUser.classTeaching) setSelectedStandard(parsedUser.classTeaching);
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    filterCoursesByStandard();
  }, [courses, selectedStandard]);

  async function fetchCourses() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  }

  function filterCoursesByStandard() {
    const filtered = courses.filter(c => c.standard === selectedStandard);
    setFilteredCourses(filtered);
  }

  async function handleEnroll(courseId: string) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchCourses();
      }
    } catch (err) {
      console.error('Failed to enroll:', err);
    }
  }

  if (loading) return <div className="p-8">Loading courses...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
        
        {user?.role === 'student' && (
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Your Standard: <span className="font-semibold">{user.standard}th Grade</span></p>
          </div>
        )}

        {user?.role === 'faculty' && (
          <div className="mb-6 flex gap-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              + Create New Course
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No courses available for your standard
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div key={course._id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="bg-blue-500 text-white p-4">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-sm opacity-90">{course.subject?.name}</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Faculty: <span className="font-semibold">{course.faculty?.name}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Lessons: <span className="font-semibold">{course.totalLessons}</span>
                </p>
                
                {user?.role === 'student' && (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Enroll Course
                  </button>
                )}
                
                {user?.role === 'faculty' && (
                  <Link
                    href={`/dashboard/courses/${course._id}`}
                    className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Manage Course
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
