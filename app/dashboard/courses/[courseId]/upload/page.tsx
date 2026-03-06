'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Lesson {
  _id: string;
  title: string;
  order: number;
  videoUrl?: string;
}

export default function UploadVideoPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [order, setOrder] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || user.role !== 'faculty') {
      router.push('/dashboard');
      return;
    }

    if (courseId) {
      fetchLessons();
    }
  }, [courseId]);

  async function fetchLessons() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLessons(data.lessons || []);
      }
    } catch (err) {
      console.error('Failed to fetch lessons:', err);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const preview = URL.createObjectURL(file);
      setVideoPreview(preview);
      setTitle(file.name.split('.')[0]);
    }
  }

  async function handleUploadVideo(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!videoFile) {
      setError('Please select a video file');
      return;
    }

    if (!title) {
      setError('Please enter a lesson title');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', title);
      formData.append('course', courseId);
      formData.append('description', description);
      formData.append('order', order);
      formData.append('duration', '0');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to upload video');
      }

      setSuccess('Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setVideoPreview('');
      setOrder((parseInt(order) + 1).toString());

      setTimeout(() => {
        fetchLessons();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upload Course Videos</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6">{success}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-6">Upload New Video</h2>

          <form onSubmit={handleUploadVideo} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Lesson Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g., Introduction to Motion"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Lesson Order *</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                required
                min="1"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Lesson description..."
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Video File *</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-input"
                  required
                />
                <label htmlFor="video-input" className="cursor-pointer">
                  {videoFile ? (
                    <div>
                      <p className="font-semibold text-green-600">✓ {videoFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-blue-600 font-semibold">Click to upload video</p>
                      <p className="text-sm text-gray-600">MP4, WebM, Ogg</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {videoPreview && (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Preview</label>
                <video
                  src={videoPreview}
                  controls
                  className="w-full rounded-lg bg-black"
                  style={{ maxHeight: '200px' }}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !videoFile}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
            >
              {loading ? 'Uploading...' : 'Upload Video'}
            </button>
          </form>
        </div>

        {/* Lessons List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-6">Course Lessons ({lessons.length})</h2>

          {lessons.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No lessons yet. Upload your first video!</p>
          ) : (
            <div className="space-y-3">
              {lessons
                .sort((a, b) => a.order - b.order)
                .map((lesson, idx) => (
                  <div key={lesson._id} className="border p-4 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded font-semibold min-w-fit">
                        Lesson {lesson.order}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {lesson.videoUrl ? (
                            <span className="text-green-600">✓ Video uploaded</span>
                          ) : (
                            <span className="text-gray-500">No video</span>
                          )}
                        </p>
                      </div>
                      <button className="text-blue-600 hover:underline text-sm">Edit</button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
