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
  {
    id: "q8", assessmentId: "a2",
    question_en: "If x + 2 = 5, what is the value of x?",
    question_ta: "x + 2 = 5 எனில், x இன் மதிப்பு என்ன?",
    options_en: ["2", "3", "5", "7"],
    options_ta: ["2", "3", "5", "7"],
    correctAnswer: 1, marks: 5,
  },
  {
    id: "q9", assessmentId: "a2",
    question_en: "What is the degree of a quadratic polynomial?",
    question_ta: "ஒரு இருபடி பல்லுறுப்புக்கோவையின் படி என்ன?",
    options_en: ["1", "2", "3", "4"],
    options_ta: ["1", "2", "3", "4"],
    correctAnswer: 1, marks: 5,
  },
  {
    id: "q10", assessmentId: "a4",
    question_en: "Which gas is evolved when an acid reacts with a metal?",
    question_ta: "அமிலம் உலோகத்துடன் வினைபுரியும் போது எந்த வாயு வெளியேறுகிறது?",
    options_en: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
    options_ta: ["ஆக்சிஜன்", "கார்பன் டை ஆக்சைடு", "நைட்ரஜன்", "ஹைட்ரஜன்"],
    correctAnswer: 3, marks: 5,
  },
  {
    id: "q11", assessmentId: "a4",
    question_en: "What is the chemical formula of water?",
    question_ta: "நீரின் வேதியியல் சூத்திரம் என்ன?",
    options_en: ["HO", "H2O", "HO2", "H2O2"],
    options_ta: ["HO", "H2O", "HO2", "H2O2"],
    correctAnswer: 1, marks: 5,
  },
  {
    id: "q12", assessmentId: "a5",
    question_en: "Which part of the cell is known as the powerhouse?",
    question_ta: "செல்லின் ஆற்றல் மையம் என்று அழைக்கப்படுவது எது?",
    options_en: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    options_ta: ["உட்கரு", "ரைபோசோம்", "மைட்டோகாண்ட்ரியா", "பசுங்கணிகம்"],
    correctAnswer: 2, marks: 5,
  },
  {
    id: "q13", assessmentId: "a5",
    question_en: "What is the basic structural and functional unit of life?",
    question_ta: "உயிர்களின் அடிப்படை அமைப்பு மற்றும் செயல்பாட்டு அலகு எது?",
    options_en: ["Tissue", "Organ", "Cell", "Organism"],
    options_ta: ["திசு", "உறுப்பு", "செல்", "உயிரினம்"],
    correctAnswer: 2, marks: 5,
  },
  // Expanded Real Numbers Questions (a1)
  {
    id: "q_a1_e1", assessmentId: "a1",
    question_en: "Which of these is a rational number?",
    question_ta: "இவற்றில் எது ஒரு விகிதமுறு எண்?",
    options_en: ["√2", "π", "0.333...", "√3"],
    options_ta: ["√2", "π", "0.333...", "√3"],
    correctAnswer: 2, marks: 2.5
  },
  {
    id: "q_a1_e2", assessmentId: "a1",
    question_en: "The sum of a rational and irrational number is always:",
    question_ta: "விகிதமுறு மற்றும் விகிதமுறா எண்களின் கூட்டுத்தொகை எப்போதும்:",
    options_en: ["Irrational", "Rational", "Integer", "Whole number"],
    options_ta: ["விகிதமுறா எண்", "விகிதமுறு எண்", "முழு எண்", "முழுக்கள்"],
    correctAnswer: 0, marks: 2.5
  },
  {
    id: "q_a1_e3", assessmentId: "a1",
    question_en: "If p is a prime number, then √p is:",
    question_ta: "P ஒரு பகா எண் எனில், √p என்பது:",
    options_en: ["Rational", "Irrational", "Terminating decimal", "Integer"],
    options_ta: ["விகிதமுறு", "விகிதமுறா", "முடிவுறும் தசமம்", "முழு எண்"],
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a1_e4", assessmentId: "a1",
    question_en: "The decimal expansion of 22/7 is:",
    question_ta: "22/7 இன் தசம விரிவாக்கம்:",
    options_en: ["Terminating", "Non-terminating and repeating", "Non-terminating and non-repeating", "None of the above"],
    options_ta: ["முடிவுறும்", "முடிவுறா மற்றும் மீண்டும் வரும்", "முடிவுறா மற்றும் மீண்டும் வராத", "மேற்கூறிய எதுவும் இல்லை"],
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a1_e5", assessmentId: "a1",
    question_en: "Which of the following numbers is an integer?",
    question_ta: "பின்வரும் எண்களில் எது ஒரு முழு எண்?",
    options_en: ["-4", "2.5", "√5", "3/4"],
    options_ta: ["-4", "2.5", "√5", "3/4"],
    correctAnswer: 0, marks: 2.5
  },

  // Expanded Laws of Motion Questions (a3)
  {
    id: "q_a3_e1", assessmentId: "a3",
    question_en: "Inertia is directly proportional to:",
    question_ta: "நிலைமம் இதற்கு நேர்த்தகவில் இருக்கும்:",
    options_en: ["Velocity", "Mass", "Force", "Acceleration"],
    options_ta: ["திசைவேகம்", "நிறை", "விசை", "முடுக்கம்"],
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a3_e2", assessmentId: "a3",
    question_en: "Action and reaction forces act on:",
    question_ta: "செயல் மற்றும் எதிர்வினை விசைகள் எதில் செயல்படுகின்றன?",
    options_en: ["Same body", "Different bodies", "Horizontal planes", "Vertical planes"],
    options_ta: ["ஒரே பொருளில்", "வெவ்வேறு பொருட்களில்", "கிடைமட்ட தளங்களில்", "செங்குத்து தளங்களில்"],
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a3_e3", assessmentId: "a3",
    question_en: "Momentum is the product of:",
    question_ta: "உந்தம் எதன் பெருக்கற்பலனாகும்?",
    options_en: ["Mass and acceleration", "Mass and velocity", "Force and time", "Force and area"],
    options_ta: ["நிறை மற்றும் முடுக்கம்", "நிறை மற்றும் திசைவேகம்", "விசை மற்றும் நேரம்", "விசை மற்றும் பரப்பு"],
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a3_e4", assessmentId: "a3",
    question_en: "A freely falling body experiences:",
    question_ta: "தடையின்றி கீழே விழும் பொருள் உணர்வது:",
    options_en: ["Zero acceleration", "Zero weight", "Infinite acceleration", "Zero velocity"],
    options_ta: ["சுழி முடுக்கம்", "சுழியின் எடை", "எல்லையற்ற முடுக்கம்", "சுழி திசைவேகம்"],
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a3_e5", assessmentId: "a3",
    question_en: "For every action there is an equal and opposite reaction. This is Newton's:",
    question_ta: "ஒவ்வொரு விசைக்கும் சிமமான மற்றும் எதிர்விசை உண்டு. இது நியூட்டனின்:",
    options_en: ["First law", "Second law", "Third law", "Law of gravitation"],
    options_ta: ["முதல் விதி", "இரண்டாம் விதி", "மூன்றாம் விதி", "ஈர்ப்பு விதி"],
    correctAnswer: 2, marks: 2.5
  },
  {
    id: "q_a3_e6", assessmentId: "a3",
    question_en: "Force = mass × ?",
    question_ta: "விசை = நிறை × ?",
    options_en: ["Velocity", "Momentum", "Inertia", "Acceleration"],
    options_ta: ["திசைவேகம்", "உந்தம்", "நிலைமம்", "முடுக்கம்"],
    correctAnswer: 3, marks: 2.5
  },
  {
    id: "q_a3_e7", assessmentId: "a3",
    question_en: "The rate of change of momentum is proportional to:",
    question_ta: "உந்த மாறுபாட்டு வீதம் எதற்கு நேர்த்தகவில் இருக்கும்?",
    options_en: ["Velocity", "Time", "Applied force", "Mass"],
    options_ta: ["திசைவேகம்", "நேரம்", "செலுத்தப்பட்ட விசை", "நிறை"],
    correctAnswer: 2, marks: 2.5
  },
  {
    id: "q_a3_e8", assessmentId: "a3",
    question_en: "A rocket works on the principle of conservation of:",
    question_ta: "ராக்கெட் எந்த அழிவின்மை விதியின் அடிப்படையில் செயல்படுகிறது?",
    options_en: ["Energy", "Momentum", "Mass", "Velocity"],
    options_ta: ["ஆற்றல்", "உந்தம்", "நிறை", "திசைவேகம்"],
    correctAnswer: 1, marks: 2.5
  },

  // Expanded Chemistry Reactions Questions (a4)
  {
    id: "q_a4_e1", assessmentId: "a4",
    question_en: "What happens when dilute HCl is added to iron fillings?",
    question_ta: "இரும்புச் துகள்களுடன் நீர்த்த HCl சேர்க்கப்படும்போது என்ன நிகழ்கிறது?",
    options_en: ["Hydrogen gas and iron chloride are formed", "Chlorine gas and iron hydroxide are formed", "No reaction", "Water and iron salt are formed"],
    options_ta: ["ஹைட்ரஜன் வாயுவும் இரும்பு குளோரைடும் உருவாகிறது", "குளோரின் வாயுவும் இரும்பு ஹைட்ராக்சைடும் உருவாகிறது", "எந்த வினையும் இல்லை", "நீரும் இரும்பு உப்பும் உருவாகிறது"],
    correctAnswer: 0, marks: 5
  },
  {
    id: "q_a4_e2", assessmentId: "a4",
    question_en: "Rusting of iron is an example of:",
    question_ta: "இரும்பு துருப்பிடித்தல் எதற்கு ஒரு உதாரணம்?",
    options_en: ["Reduction", "Ionization", "Oxidation", "Dissociation"],
    options_ta: ["ஒடுக்கம்", "அயனியாக்கம்", "ஆக்ஸிஜனேற்றம்", "பிரிதல்"],
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a4_e3", assessmentId: "a4",
    question_en: "Which of the following is an endothermic reaction?",
    question_ta: "பின்வருவனவற்றுள் எது வெப்பம் கொள் வினை?",
    options_en: ["Burning of coal", "Respiration", "Photosynthesis", "Digestion"],
    options_ta: ["நிலக்கரி எரிதல்", "சுவாசம்", "ஒளிச்சேர்க்கை", "செரிமானம்"],
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a4_e4", assessmentId: "a4",
    question_en: "A reaction where two or more substances combine to form a single product is:",
    question_ta: "இரண்டு அல்லது அதற்கு மேற்பட்ட பொருட்கள் ஒன்றிணைந்து ஒரு பொருளை உருவாக்கும் வினை:",
    options_en: ["Displacement", "Combination", "Decomposition", "Double displacement"],
    options_ta: ["இடப்பெயர்ச்சி", "சேர்க்கை", "சிதைவு", "இரட்டை இடப்பெயர்ச்சி"],
    correctAnswer: 1, marks: 5
  },
  {
    id: "q_a4_e5", assessmentId: "a4",
    question_en: "The insoluble substance formed during a chemical reaction is called:",
    question_ta: "வேதியியல் வினையின் போது உருவாகும் கரையாத பொருள் எவ்வாறு அழைக்கப்படுகிறது?",
    options_en: ["Solvent", "Precipitate", "Residue", "Filtrate"],
    options_ta: ["கரைப்பான்", "வீழ்படிவு", "மீதி", "வடிகட்டப்பட்ட திரவம்"],
    correctAnswer: 1, marks: 5
  },
  {
    id: "q_a4_e6", assessmentId: "a4",
    question_en: "Which gas is used in the manufacturing of ammonia?",
    question_ta: "அம்மோனியா தயாரிப்பில் எந்த வாயு பயன்படுத்தப்படுகிறது?",
    options_en: ["Oxygen", "Carbon dioxide", "Nitrogen", "Chlorine"],
    options_ta: ["ஆக்ஸிஜன்", "கார்பன் டை ஆக்சைடு", "நைட்ரஜன்", "குளோரின்"],
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a4_e7", assessmentId: "a4",
    question_en: "Combustion is a chemical process in which a substance reacts with:",
    question_ta: "எரிதல் என்பது ஒரு பொருள் எந்த வாயுவுடன் வினைபுரியும் வேதியியல் செயல்முறையாகும்?",
    options_en: ["Nitrogen", "Hydrogen", "Oxygen", "Carbon"],
    options_ta: ["நைட்ரஜன்", "ஹைட்ரஜன்", "ஆக்ஸிஜன்", "கார்பன்"],
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a4_e8", assessmentId: "a4",
    question_en: "The colour of copper oxide is:",
    question_ta: "தாமிர ஆக்சைடின் நிறம்:",
    options_en: ["Red", "Black", "Blue", "Green"],
    options_ta: ["சிவப்பு", "கருப்பு", "நீலம்", "பச்சை"],
    correctAnswer: 1, marks: 5
  },

  // Dummy Algebra & Cell Biology out of scope for brevity, let's keep it complete.
  // Expanded Algebra Questions (a2)
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `q_a2_extra_${i}`, assessmentId: "a2",
    question_en: `Solve for x in the equation ${i+2}x + 4 = 10`,
    question_ta: `${i+2}x + 4 = 10 என்ற சமன்பாட்டில் x இன் மதிப்பைக் காண்க`,
    options_en: ["3", "2", "6/(i+2)", "4"],
    options_ta: ["3", "2", "6/(i+2)", "4"],
    correctAnswer: 2, marks: 5
  })),
  
  // Expanded Cell Biology Questions (a5)
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `q_a5_extra_${i}`, assessmentId: "a5",
    question_en: `What is a primary function of organelle ${i+1}?`,
    question_ta: `உறுப்பு ${i+1} இன் முக்கிய செயல்பாடு என்ன?`,
    options_en: ["Energy production", "Protein synthesis", "Waste disposal", "Cell division"],
    options_ta: ["ஆற்றல் உற்பத்தி", "புரத தொகுப்பு", "கழிவு நீக்கம்", "செல் பிரிவு"],
    correctAnswer: Math.floor(Math.random() * 4), marks: 2
  })),
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
