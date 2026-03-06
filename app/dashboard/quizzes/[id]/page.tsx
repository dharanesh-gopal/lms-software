'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface QuizQuestion {
  _id: string;
  text: string;
  type: string;
  options?: string[];
  points: number;
}

interface Quiz {
  _id: string;
  title: string;
  questions: QuizQuestion[];
  totalPoints: number;
  timeLimit?: number;
  passingScore: number;
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const router = useRouter();
  const params = useParams();
  const quizId = params?.id as string;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (!quizStarted || !quiz?.timeLimit || timeLeft === null) return;

    if (timeLeft === 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev !== null ? prev - 1 : null);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, quiz]);

  async function fetchQuiz() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`);
      if (res.ok) {
        const data = await res.json();
        setQuiz(data);
      }
    } catch (err) {
      console.error('Failed to fetch quiz:', err);
    } finally {
      setLoading(false);
    }
  }

  function startQuiz() {
    setQuizStarted(true);
    if (quiz?.timeLimit) {
      setTimeLeft(quiz.timeLimit);
    }
  }

  function handleAnswerChange(questionId: string, answer: string) {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  }

  function goToNextQuestion() {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  }

  async function handleAutoSubmit() {
    setSubmitted(true);
    await submitQuiz();
  }

  async function handleSubmitQuiz() {
    setSubmitted(true);
    await submitQuiz();
  }

  async function submitQuiz() {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const formattedAnswers = Object.entries(answers).map(([qId, answer]) => ({
        questionId: qId,
        answer
      }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          answers: formattedAnswers,
          course: 'default-course'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    }
  }

  if (loading) return <div className="p-8 text-center">Loading quiz...</div>;
  if (!quiz) return <div className="p-8 text-center">Quiz not found</div>;

  if (!quizStarted) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg border-2 border-blue-500 text-center">
          <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
          
          <div className="space-y-4 my-8">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-gray-700">
                <span className="font-semibold">Total Questions:</span> {quiz.questions.length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-gray-700">
                <span className="font-semibold">Total Points:</span> {quiz.totalPoints}
              </p>
            </div>
            {quiz.timeLimit && (
              <div className="bg-orange-50 p-4 rounded">
                <p className="text-gray-700">
                  <span className="font-semibold">Time Limit:</span> {Math.floor(quiz.timeLimit / 60)} minutes
                </p>
              </div>
            )}
            <div className="bg-purple-50 p-4 rounded">
              <p className="text-gray-700">
                <span className="font-semibold">Passing Score:</span> {quiz.passingScore}%
              </p>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className={`bg-white p-8 rounded-lg border-2 ${result.passed ? 'border-green-500' : 'border-red-500'}`}>
          <h1 className="text-3xl font-bold mb-4 text-center">Quiz Completed!</h1>
          
          <div className="space-y-4 my-8">
            <div className="bg-blue-50 p-4 rounded text-center">
              <p className="text-gray-600 text-sm">Your Score</p>
              <p className="text-4xl font-bold text-blue-600">{result.score}/{result.totalPoints}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded text-center">
              <p className="text-gray-600 text-sm">Percentage</p>
              <p className="text-4xl font-bold text-purple-600">{result.percentage}%</p>
            </div>

            <div className={`p-4 rounded text-center ${result.passed ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className={`text-2xl font-bold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                {result.passed ? '✓ PASSED' : '✗ FAILED'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Passing score: {quiz.passingScore}%
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push('/dashboard/my-courses')}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Back to Courses
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setCurrentQuestion(0);
                setQuizStarted(false);
                setTimeLeft(null);
              }}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 font-semibold"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / quiz.questions.length) * 100);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header with Timer */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <p className="text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</p>
        </div>
        {timeLeft !== null && (
          <div className={`text-3xl font-bold p-4 rounded-lg ${
            timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}>
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-8 rounded-lg border mb-8">
        <h2 className="text-xl font-semibold mb-6">
          {question.text}
          <span className="text-sm text-gray-600 ml-2">({question.points} pts)</span>
        </h2>

        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option}
                  checked={answers[question._id] === option}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  className="w-4 h-4 mr-4"
                />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-3">
            {['True', 'False'].map((option) => (
              <label key={option} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option}
                  checked={answers[question._id] === option}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  className="w-4 h-4 mr-4"
                />
                <span className="text-gray-800 font-semibold">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'short-answer' && (
          <textarea
            value={answers[question._id] || ''}
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            placeholder="Type your answer here..."
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestion === 0}
          className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          ← Previous
        </button>

        <div className="flex gap-2 flex-wrap justify-center">
          {quiz.questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-10 h-10 rounded-lg font-semibold transition ${
                idx === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answers[quiz.questions[idx]._id]
                  ? 'bg-green-200 text-green-800'
                  : 'bg-gray-200 text-gray-800'
              }`}
              title={`Question ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-semibold"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={goToNextQuestion}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Next →
          </button>
        )}
      </div>

      {/* Answered Questions Summary */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{Object.keys(answers).length}</span> of{' '}
          <span className="font-semibold">{quiz.questions.length}</span> questions answered
        </p>
      </div>
    </div>
  );
}
