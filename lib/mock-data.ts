import type {
  School,
  Subject,
  Unit,
  Lesson,
  Assessment,
  Question,
  Result,
  PerformanceAnalytics,
  Recommendation,
  AIPrediction,
} from "./types"

// ===== Schools =====
export const mockSchools: School[] = [
  {
    id: "s1",
    name_en: "Government Higher Secondary School, Chennai",
    name_ta: "அரசு மேல்நிலைப் பள்ளி, சென்னை",
    district: "Chennai",
    code: "TN-CHN-001",
    principalName: "Dr. S. Murugan",
    studentCount: 1250,
    facultyCount: 65,
    createdAt: "2023-06-01",
  },
  {
    id: "s2",
    name_en: "Government Higher Secondary School, Madurai",
    name_ta: "அரசு மேல்நிலைப் பள்ளி, மதுரை",
    district: "Madurai",
    code: "TN-MDU-001",
    principalName: "Mrs. K. Vijayalakshmi",
    studentCount: 980,
    facultyCount: 52,
    createdAt: "2023-06-01",
  },
  {
    id: "s3",
    name_en: "Government Higher Secondary School, Coimbatore",
    name_ta: "அரசு மேல்நிலைப் பள்ளி, கோயம்புத்தூர்",
    district: "Coimbatore",
    code: "TN-CBE-001",
    principalName: "Mr. R. Kathirvel",
    studentCount: 1100,
    facultyCount: 58,
    createdAt: "2023-06-01",
  },
  {
    id: "s4",
    name_en: "Government Higher Secondary School, Tiruchirappalli",
    name_ta: "அரசு மேல்நிலைப் பள்ளி, திருச்சிராப்பள்ளி",
    district: "Tiruchirappalli",
    code: "TN-TRY-001",
    principalName: "Dr. P. Saravanan",
    studentCount: 870,
    facultyCount: 45,
    createdAt: "2023-06-01",
  },
  {
    id: "s5",
    name_en: "Government Higher Secondary School, Salem",
    name_ta: "அரசு மேல்நிலைப் பள்ளி, சேலம்",
    district: "Salem",
    code: "TN-SLM-001",
    principalName: "Mrs. N. Priya",
    studentCount: 760,
    facultyCount: 40,
    createdAt: "2023-07-01",
  },
]

// ===== Subjects =====
export const mockSubjects: Subject[] = [
  // 10th Standard - English Medium
  { id: "sub1", name_en: "Mathematics", name_ta: "கணிதம்", standard: "10", medium: "english", code: "10-EN-MATH" },
  { id: "sub2", name_en: "Science", name_ta: "அறிவியல்", standard: "10", medium: "english", code: "10-EN-SCI" },
  { id: "sub3", name_en: "Physics", name_ta: "இயற்பியல்", standard: "10", medium: "english", code: "10-EN-PHY" },
  { id: "sub4", name_en: "Chemistry", name_ta: "வேதியியல்", standard: "10", medium: "english", code: "10-EN-CHE" },
  { id: "sub5", name_en: "Biology", name_ta: "உயிரியல்", standard: "10", medium: "english", code: "10-EN-BIO" },
  { id: "sub6", name_en: "Computer Science", name_ta: "கணினி அறிவியல்", standard: "10", medium: "english", code: "10-EN-CS" },
  // 10th Standard - Tamil Medium
  { id: "sub7", name_en: "Mathematics", name_ta: "கணிதம்", standard: "10", medium: "tamil", code: "10-TA-MATH" },
  { id: "sub8", name_en: "Science", name_ta: "அறிவியல்", standard: "10", medium: "tamil", code: "10-TA-SCI" },
  { id: "sub9", name_en: "Physics", name_ta: "இயற்பியல்", standard: "10", medium: "tamil", code: "10-TA-PHY" },
  { id: "sub10", name_en: "Chemistry", name_ta: "வேதியியல்", standard: "10", medium: "tamil", code: "10-TA-CHE" },
  { id: "sub11", name_en: "Biology", name_ta: "உயிரியல்", standard: "10", medium: "tamil", code: "10-TA-BIO" },
  { id: "sub12", name_en: "Computer Science", name_ta: "கணினி அறிவியல்", standard: "10", medium: "tamil", code: "10-TA-CS" },
  // 12th Standard - English Medium
  { id: "sub13", name_en: "Mathematics", name_ta: "கணிதம்", standard: "12", medium: "english", code: "12-EN-MATH" },
  { id: "sub14", name_en: "Physics", name_ta: "இயற்பியல்", standard: "12", medium: "english", code: "12-EN-PHY" },
  { id: "sub15", name_en: "Chemistry", name_ta: "வேதியியல்", standard: "12", medium: "english", code: "12-EN-CHE" },
  { id: "sub16", name_en: "Biology", name_ta: "உயிரியல்", standard: "12", medium: "english", code: "12-EN-BIO" },
  { id: "sub17", name_en: "Computer Science", name_ta: "கணினி அறிவியல்", standard: "12", medium: "english", code: "12-EN-CS" },
  // 12th Standard - Tamil Medium
  { id: "sub18", name_en: "Mathematics", name_ta: "கணிதம்", standard: "12", medium: "tamil", code: "12-TA-MATH" },
  { id: "sub19", name_en: "Physics", name_ta: "இயற்பியல்", standard: "12", medium: "tamil", code: "12-TA-PHY" },
  { id: "sub20", name_en: "Chemistry", name_ta: "வேதியியல்", standard: "12", medium: "tamil", code: "12-TA-CHE" },
  { id: "sub21", name_en: "Biology", name_ta: "உயிரியல்", standard: "12", medium: "tamil", code: "12-TA-BIO" },
  { id: "sub22", name_en: "Computer Science", name_ta: "கணினி அறிவியல்", standard: "12", medium: "tamil", code: "12-TA-CS" },
]

// ===== Units =====
export const mockUnits: Unit[] = [
  { id: "u1", subjectId: "sub1", name_en: "Real Numbers", name_ta: "மெய் எண்கள்", unitNumber: 1 },
  { id: "u2", subjectId: "sub1", name_en: "Algebra", name_ta: "இயற்கணிதம்", unitNumber: 2 },
  { id: "u3", subjectId: "sub1", name_en: "Geometry", name_ta: "வடிவியல்", unitNumber: 3 },
  { id: "u4", subjectId: "sub1", name_en: "Trigonometry", name_ta: "முக்கோணவியல்", unitNumber: 4 },
  { id: "u5", subjectId: "sub1", name_en: "Statistics", name_ta: "புள்ளியியல்", unitNumber: 5 },
  { id: "u6", subjectId: "sub3", name_en: "Laws of Motion", name_ta: "இயக்க விதிகள்", unitNumber: 1 },
  { id: "u7", subjectId: "sub3", name_en: "Heat and Thermodynamics", name_ta: "வெப்பமும் வெப்ப இயக்கவியலும்", unitNumber: 2 },
  { id: "u8", subjectId: "sub3", name_en: "Optics", name_ta: "ஒளியியல்", unitNumber: 3 },
  { id: "u9", subjectId: "sub4", name_en: "Chemical Reactions", name_ta: "வேதிவினைகள்", unitNumber: 1 },
  { id: "u10", subjectId: "sub4", name_en: "Acids, Bases and Salts", name_ta: "அமிலங்கள், காரங்கள் மற்றும் உப்புகள்", unitNumber: 2 },
  { id: "u11", subjectId: "sub5", name_en: "Cell Biology", name_ta: "உயிரணு உயிரியல்", unitNumber: 1 },
  { id: "u12", subjectId: "sub5", name_en: "Genetics", name_ta: "மரபியல்", unitNumber: 2 },
]

// ===== Lessons =====
export const mockLessons: Lesson[] = [
  { id: "l1", unitId: "u1", title_en: "Introduction to Real Numbers", title_ta: "மெய் எண்களின் அறிமுகம்", lessonNumber: 1, duration: 45, description_en: "Understanding the number system and real numbers", description_ta: "எண் முறை மற்றும் மெய் எண்களைப் புரிந்துகொள்ளுதல்" },
  { id: "l2", unitId: "u1", title_en: "Euclid's Division Lemma", title_ta: "யூக்ளிடின் வகுத்தல் தேற்றம்", lessonNumber: 2, duration: 40, description_en: "Learning about Euclid's Division Algorithm", description_ta: "யூக்ளிடின் வகுத்தல் தேற்றத்தை கற்றல்" },
  { id: "l3", unitId: "u2", title_en: "Polynomials", title_ta: "பல்லுறுப்புக் கோவைகள்", lessonNumber: 1, duration: 50, description_en: "Introduction to polynomials and operations", description_ta: "பல்லுறுப்புக் கோவைகளின் அறிமுகம்" },
  { id: "l4", unitId: "u2", title_en: "Linear Equations", title_ta: "நேரியல் சமன்பாடுகள்", lessonNumber: 2, duration: 45 },
  { id: "l5", unitId: "u3", title_en: "Triangles", title_ta: "முக்கோணங்கள்", lessonNumber: 1, duration: 55 },
  { id: "l6", unitId: "u6", title_en: "Newton's First Law", title_ta: "நியூட்டனின் முதல் விதி", lessonNumber: 1, duration: 40 },
  { id: "l7", unitId: "u6", title_en: "Newton's Second Law", title_ta: "நியூட்டனின் இரண்டாம் விதி", lessonNumber: 2, duration: 45 },
  { id: "l8", unitId: "u9", title_en: "Types of Chemical Reactions", title_ta: "வேதிவினை வகைகள்", lessonNumber: 1, duration: 50 },
  { id: "l9", unitId: "u11", title_en: "Structure of a Cell", title_ta: "உயிரணுவின் அமைப்பு", lessonNumber: 1, duration: 45 },
  { id: "l10", unitId: "u12", title_en: "Mendel's Laws", title_ta: "மெண்டலின் விதிகள்", lessonNumber: 1, duration: 50 },
]

// ===== Assessments =====
export const mockAssessments: Assessment[] = [
  { id: "a1", subjectId: "sub1", unitId: "u1", title_en: "Real Numbers Quiz", title_ta: "மெய் எண்கள் வினாடி வினா", type: "quiz", totalMarks: 25, duration: 20, questionCount: 10, createdBy: "u3", createdAt: "2024-09-01" },
  { id: "a2", subjectId: "sub1", unitId: "u2", title_en: "Algebra Assessment", title_ta: "இயற்கணிதம் மதிப்பீடு", type: "exam", totalMarks: 50, duration: 45, questionCount: 20, createdBy: "u3", createdAt: "2024-09-15" },
  { id: "a3", subjectId: "sub3", unitId: "u6", title_en: "Laws of Motion Quiz", title_ta: "இயக்க விதிகள் வினாடி வினா", type: "quiz", totalMarks: 25, duration: 15, questionCount: 10, createdBy: "u3", createdAt: "2024-10-01" },
  { id: "a4", subjectId: "sub4", unitId: "u9", title_en: "Chemical Reactions Test", title_ta: "வேதிவினைகள் தேர்வு", type: "exam", totalMarks: 50, duration: 40, questionCount: 15, createdBy: "u3", createdAt: "2024-10-10" },
  { id: "a5", subjectId: "sub5", unitId: "u11", title_en: "Cell Biology Quiz", title_ta: "உயிரணு உயிரியல் வினாடி வினா", type: "quiz", totalMarks: 20, duration: 15, questionCount: 8, createdBy: "u3", createdAt: "2024-10-20" },
]

// ===== Questions =====
export const mockQuestions: Question[] = [
  {
    id: "q1", assessmentId: "a1",
    question_en: "Which of the following is an irrational number?",
    question_ta: "பின்வருவனவற்றுள் எது ஒரு விகிதமுறா எண்?",
    options_en: ["2/3", "0.5", "Square root of 2", "7"],
    options_ta: ["2/3", "0.5", "வர்க்கமூலம் 2", "7"],
    correctAnswer: 2, marks: 2.5,
    explanation_en: "Square root of 2 cannot be expressed as a simple fraction.",
    explanation_ta: "வர்க்கமூலம் 2 ஐ எளிய பின்னமாக வெளிப்படுத்த இயலாது.",
  },
  {
    id: "q2", assessmentId: "a1",
    question_en: "The HCF of 12 and 18 is:",
    question_ta: "12 மற்றும் 18 இன் மீ.பொ.வ:",
    options_en: ["2", "4", "6", "12"],
    options_ta: ["2", "4", "6", "12"],
    correctAnswer: 2, marks: 2.5,
  },
  {
    id: "q3", assessmentId: "a1",
    question_en: "Every positive integer is:",
    question_ta: "ஒவ்வொரு நேர்முழு எண்ணும்:",
    options_en: ["Rational", "Irrational", "Prime", "Composite"],
    options_ta: ["விகிதமுறு", "விகிதமுறா", "பகா", "பகுஎண்"],
    correctAnswer: 0, marks: 2.5,
  },
  {
    id: "q4", assessmentId: "a1",
    question_en: "The decimal expansion of a rational number is:",
    question_ta: "விகிதமுறு எண்ணின் தசம விரிவாக்கம்:",
    options_en: ["Always terminating", "Always non-terminating", "Either terminating or repeating", "Never repeating"],
    options_ta: ["எப்போதும் முடிவுறும்", "எப்போதும் முடிவுறா", "முடிவுறும் அல்லது மீண்டும் வரும்", "ஒருபோதும் மீண்டும் வராது"],
    correctAnswer: 2, marks: 2.5,
  },
  {
    id: "q5", assessmentId: "a1",
    question_en: "LCM of 6, 15 and 21 is:",
    question_ta: "6, 15 மற்றும் 21 இன் மீ.சி.ம:",
    options_en: ["42", "105", "210", "630"],
    options_ta: ["42", "105", "210", "630"],
    correctAnswer: 2, marks: 2.5,
  },
  {
    id: "q6", assessmentId: "a3",
    question_en: "Newton's first law of motion is also known as:",
    question_ta: "நியூட்டனின் முதல் இயக்க விதி என்றும் அழைக்கப்படுகிறது:",
    options_en: ["Law of acceleration", "Law of inertia", "Law of reaction", "Law of gravity"],
    options_ta: ["முடுக்க விதி", "அடமை விதி", "வினை விதி", "ஈர்ப்பு விதி"],
    correctAnswer: 1, marks: 2.5,
  },
  {
    id: "q7", assessmentId: "a3",
    question_en: "The SI unit of force is:",
    question_ta: "விசையின் SI அலகு:",
    options_en: ["Joule", "Newton", "Watt", "Pascal"],
    options_ta: ["ஜூல்", "நியூட்டன்", "வாட்", "பாஸ்கல்"],
    correctAnswer: 1, marks: 2.5,
  },
]

// ===== Results =====
export const mockResults: Result[] = [
  {
    id: "r1", studentId: "u4", assessmentId: "a1", score: 20, totalMarks: 25, percentage: 80, timeTaken: 18,
    attemptDate: "2024-09-05",
    answers: [
      { questionId: "q1", selectedAnswer: 2, isCorrect: true },
      { questionId: "q2", selectedAnswer: 2, isCorrect: true },
      { questionId: "q3", selectedAnswer: 0, isCorrect: true },
      { questionId: "q4", selectedAnswer: 2, isCorrect: true },
      { questionId: "q5", selectedAnswer: 1, isCorrect: false },
    ],
  },
  {
    id: "r2", studentId: "u4", assessmentId: "a3", score: 17.5, totalMarks: 25, percentage: 70, timeTaken: 14,
    attemptDate: "2024-10-05",
    answers: [
      { questionId: "q6", selectedAnswer: 1, isCorrect: true },
      { questionId: "q7", selectedAnswer: 1, isCorrect: true },
    ],
  },
]

// ===== Performance Analytics =====
export const mockPerformanceAnalytics: PerformanceAnalytics[] = [
  {
    id: "pa1", studentId: "u4", subjectId: "sub1",
    averageScore: 78, totalAttempts: 5,
    strongUnits: ["u1", "u2"], weakUnits: ["u4"],
    progressPercentage: 65, lastUpdated: "2024-10-15",
  },
  {
    id: "pa2", studentId: "u4", subjectId: "sub3",
    averageScore: 72, totalAttempts: 3,
    strongUnits: ["u6"], weakUnits: ["u8"],
    progressPercentage: 45, lastUpdated: "2024-10-15",
  },
  {
    id: "pa3", studentId: "u4", subjectId: "sub4",
    averageScore: 85, totalAttempts: 4,
    strongUnits: ["u9", "u10"], weakUnits: [],
    progressPercentage: 72, lastUpdated: "2024-10-15",
  },
  {
    id: "pa4", studentId: "u4", subjectId: "sub5",
    averageScore: 68, totalAttempts: 3,
    strongUnits: ["u11"], weakUnits: ["u12"],
    progressPercentage: 50, lastUpdated: "2024-10-15",
  },
]

// ===== Recommendations =====
export const mockRecommendations: Recommendation[] = [
  {
    id: "rec1", studentId: "u4", type: "review",
    title_en: "Review Trigonometry Basics",
    title_ta: "முக்கோணவியல் அடிப்படைகளை மீள்பார்வை செய்யுங்கள்",
    description_en: "Your scores in trigonometry suggest you need to revisit fundamental concepts",
    description_ta: "முக்கோணவியலில் உங்கள் மதிப்பெண்கள் அடிப்படைக் கருத்துகளை மீண்டும் பார்க்க வேண்டும் என்று குறிக்கின்றன",
    priority: "high", lessonId: "l5",
  },
  {
    id: "rec2", studentId: "u4", type: "practice",
    title_en: "Practice Optics Problems",
    title_ta: "ஒளியியல் கணக்குகளை பயிற்சி செய்யுங்கள்",
    description_en: "Additional practice in optics will help improve your physics score",
    description_ta: "ஒளியியலில் கூடுதல் பயிற்சி உங்கள் இயற்பியல் மதிப்பெண்ணை மேம்படுத்த உதவும்",
    priority: "medium",
  },
  {
    id: "rec3", studentId: "u4", type: "lesson",
    title_en: "Watch Genetics Video Lesson",
    title_ta: "மரபியல் வீடியோ பாடத்தைப் பாருங்கள்",
    description_en: "The video lesson on genetics covers the concepts you missed in the last quiz",
    description_ta: "மரபியல் பற்றிய வீடியோ பாடம் கடந்த வினாடி வினாவில் நீங்கள் தவறவிட்ட கருத்துகளை உள்ளடக்கியது",
    priority: "high", lessonId: "l10",
  },
]

// ===== AI Predictions =====
export const mockAIPrediction: AIPrediction = {
  predictedScore: 74,
  riskLevel: "medium",
  confidence: 0.82,
  factors: [
    "Consistent performance in Mathematics",
    "Improvement needed in Physics - Optics",
    "Strong in Chemistry fundamentals",
    "Genetics section needs attention",
  ],
}

// ===== Chart Data =====
export const districtPerformanceData = [
  { district: "Chennai", average: 78, students: 12500 },
  { district: "Madurai", average: 74, students: 9800 },
  { district: "Coimbatore", average: 76, students: 11000 },
  { district: "Tiruchirappalli", average: 72, students: 8700 },
  { district: "Salem", average: 70, students: 7600 },
  { district: "Tirunelveli", average: 73, students: 6500 },
  { district: "Erode", average: 71, students: 5800 },
  { district: "Thanjavur", average: 75, students: 7200 },
]

export const monthlyProgressData = [
  { month: "Jun", score: 62 },
  { month: "Jul", score: 65 },
  { month: "Aug", score: 68 },
  { month: "Sep", score: 72 },
  { month: "Oct", score: 74 },
  { month: "Nov", score: 78 },
  { month: "Dec", score: 76 },
  { month: "Jan", score: 80 },
]

export const subjectPerformanceData = [
  { subject: "Mathematics", score: 78, average: 72 },
  { subject: "Physics", score: 72, average: 68 },
  { subject: "Chemistry", score: 85, average: 75 },
  { subject: "Biology", score: 68, average: 70 },
  { subject: "Computer Sci", score: 88, average: 76 },
]

export const unitDifficultyData = [
  { unit: "Real Numbers", difficulty: 35, avgScore: 82 },
  { unit: "Algebra", difficulty: 55, avgScore: 71 },
  { unit: "Geometry", difficulty: 65, avgScore: 65 },
  { unit: "Trigonometry", difficulty: 78, avgScore: 58 },
  { unit: "Statistics", difficulty: 42, avgScore: 76 },
  { unit: "Laws of Motion", difficulty: 48, avgScore: 74 },
  { unit: "Optics", difficulty: 72, avgScore: 62 },
]

export const riskStudents = [
  { id: "rs1", name: "Arun Kumar", score: 42, risk: "high" as const, subject: "Mathematics" },
  { id: "rs2", name: "Deepa S.", score: 48, risk: "high" as const, subject: "Physics" },
  { id: "rs3", name: "Karthik R.", score: 55, risk: "medium" as const, subject: "Chemistry" },
  { id: "rs4", name: "Meena P.", score: 52, risk: "medium" as const, subject: "Biology" },
  { id: "rs5", name: "Ravi M.", score: 38, risk: "high" as const, subject: "Mathematics" },
]

export const classAverageData = [
  { className: "10-A", average: 74, students: 45 },
  { className: "10-B", average: 71, students: 42 },
  { className: "10-C", average: 68, students: 44 },
  { className: "12-A", average: 76, students: 40 },
  { className: "12-B", average: 72, students: 38 },
  { className: "12-C", average: 70, students: 41 },
]
