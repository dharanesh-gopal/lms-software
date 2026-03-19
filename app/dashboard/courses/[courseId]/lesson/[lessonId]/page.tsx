'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Lesson {
  _id: string;
  title: string;
  order: number;
  videoUrl: string;
  description?: string;
  duration?: number;
}

interface Course {
  _id: string;
  title: string;
  lessons: Lesson[];
}

export default function LessonPage() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoWatched, setVideoWatched] = useState(false);
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  const lessonId = params?.lessonId as string;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchLessonDetails();
  }, [courseId, lessonId]);

  async function fetchLessonDetails() {
    try {
      const token = localStorage.getItem('token');

      // Fetch course with all lessons
      const courseRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (courseRes.ok) {
        const courseData = await courseRes.json();
        setCourse(courseData);
        setLessons(courseData.lessons || []);

        // Find specific lesson
        const currentLesson = courseData.lessons?.find((l: Lesson) => l._id === lessonId);
        if (currentLesson) {
          setLesson(currentLesson);
        }
      }
    } catch (err) {
      console.error('Failed to fetch lesson:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleVideoWatched() {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          course: courseId,
          action: 'video-watched',
          duration: 300
        })
      });
      setVideoWatched(true);
    } catch (err) {
      console.error('Failed to track video:', err);
    }
  }

  if (loading) return <div className="p-8">Loading lesson...</div>;
  if (!lesson) return <div className="p-8">Lesson not found</div>;

  const currentIndex = lessons.findIndex(l => l._id === lessonId);
  const nextLesson = currentIndex !== -1 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Video Player */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          
          <div className="bg-black rounded-lg overflow-hidden shadow-lg">
            {lesson.videoUrl ? (
              <video
                controls
                onEnded={handleVideoWatched}
                className="w-full"
                style={{ minHeight: '500px' }}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full bg-gray-800 h-96 flex items-center justify-center text-white">
                <p>No video available for this lesson</p>
              </div>
            )}
          </div>

          {videoWatched && (
            <div className="mt-4 bg-green-100 text-green-700 p-4 rounded">
              ✓ Lesson marked as watched
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">About This Lesson</h2>
              <p className="text-gray-700">
                {lesson.description || 'No description provided for this lesson'}
              </p>

              {lesson.duration && (
                <div className="mt-4 flex gap-8">
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-lg font-semibold">
                      {Math.floor(lesson.duration / 60)} minutes
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-6">
              {prevLesson && (
                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/courses/${courseId}/lesson/${prevLesson._id}`
                    )
                  }
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 font-semibold"
                >
                  ← Previous Lesson
                </button>
              )}
              {nextLesson && (
                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/courses/${courseId}/lesson/${nextLesson._id}`
                    )
                  }
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Next Lesson →
                </button>
              )}
            </div>
          </div>

          {/* Sidebar - All Lessons */}
          <div className="bg-white p-6 rounded-lg border h-fit">
            <h2 className="text-lg font-semibold mb-4">Course Lessons</h2>
            <div className="space-y-2">
              {[...lessons]
                .sort((a, b) => a.order - b.order)
                .map((l) => (
                  <button
                    key={l._id}
                    onClick={() =>
                      router.push(`/dashboard/courses/${courseId}/lesson/${l._id}`)
                    }
                    className={`w-full text-left p-3 rounded-lg transition ${
                      l._id === lessonId
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="font-semibold">Lesson {l.order}</p>
                    <p className="text-sm opacity-75 truncate">{l.title}</p>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
