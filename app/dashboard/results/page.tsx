'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Trophy, Clock, CheckCircle, XCircle, ChevronRight, BarChart } from 'lucide-react';

interface QuizAttempt {
  _id: string;
  quiz: {
    _id: string;
    title: string;
    totalPoints: number;
    passingScore: number;
  };
  score: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

export default function ResultsPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchAttempts();
  }, []);

  async function fetchAttempts() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/my/attempts`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setAttempts(data);
      }
    } catch (err) {
      console.error('Failed to fetch attempts:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-500 font-medium">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Results
          </h1>
          <p className="text-gray-500 mt-2">Track your quiz scores and overall performance</p>
        </div>
        
        {attempts.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-xl font-bold text-gray-900">
                {Math.round(attempts.reduce((acc, curr) => acc + curr.percentage, 0) / attempts.length)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {attempts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No results yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            You haven't completed any quizzes yet. Head over to the quizzes section to test your knowledge!
          </p>
          <button 
            onClick={() => router.push('/dashboard/quizzes')}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Take a Quiz
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attempts.map((attempt) => (
            <div 
              key={attempt._id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              <div className={`h-2 w-full ${attempt.passed ? 'bg-green-500' : 'bg-red-500'}`} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {attempt.quiz?.title || 'Unknown Quiz'}
                  </h3>
                  <div className={`p-2 rounded-full ${attempt.passed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {attempt.passed ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(attempt.completedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Score</span>
                      <span className="font-semibold text-gray-900">{attempt.score} / {attempt.quiz?.totalPoints || 0}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${attempt.passed ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(100, attempt.percentage)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Percentage</span>
                    <span className={`text-lg font-bold ${attempt.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {attempt.percentage}%
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => router.push(`/dashboard/quizzes/${attempt.quiz?._id}`)}
                    className="flex justify-between items-center w-full text-sm font-medium text-blue-600 hover:text-blue-700 group-hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4" />
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
