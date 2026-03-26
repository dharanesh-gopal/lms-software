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
  { id: "sub1", name_en: "Mathematics",  standard: "10", medium: "english", code: "10-EN-MATH" },
  { id: "sub2", name_en: "Science",  standard: "10", medium: "english", code: "10-EN-SCI" },
  { id: "sub3", name_en: "Physics",  standard: "10", medium: "english", code: "10-EN-PHY" },
  { id: "sub4", name_en: "Chemistry",  standard: "10", medium: "english", code: "10-EN-CHE" },
  { id: "sub5", name_en: "Biology",  standard: "10", medium: "english", code: "10-EN-BIO" },
  { id: "sub6", name_en: "Computer Science",  standard: "10", medium: "english", code: "10-EN-CS" },
  // 10th Standard - Tamil Medium
  { id: "sub7", name_en: "Mathematics",  standard: "10", medium: "tamil", code: "10-TA-MATH" },
  { id: "sub8", name_en: "Science",  standard: "10", medium: "tamil", code: "10-TA-SCI" },
  { id: "sub9", name_en: "Physics",  standard: "10", medium: "tamil", code: "10-TA-PHY" },
  { id: "sub10", name_en: "Chemistry",  standard: "10", medium: "tamil", code: "10-TA-CHE" },
  { id: "sub11", name_en: "Biology",  standard: "10", medium: "tamil", code: "10-TA-BIO" },
  { id: "sub12", name_en: "Computer Science",  standard: "10", medium: "tamil", code: "10-TA-CS" },
  // 12th Standard - English Medium
  { id: "sub13", name_en: "Mathematics",  standard: "12", medium: "english", code: "12-EN-MATH" },
  { id: "sub14", name_en: "Physics",  standard: "12", medium: "english", code: "12-EN-PHY" },
  { id: "sub15", name_en: "Chemistry",  standard: "12", medium: "english", code: "12-EN-CHE" },
  { id: "sub16", name_en: "Biology",  standard: "12", medium: "english", code: "12-EN-BIO" },
  { id: "sub17", name_en: "Computer Science",  standard: "12", medium: "english", code: "12-EN-CS" },
  // 12th Standard - Tamil Medium
  { id: "sub18", name_en: "Mathematics",  standard: "12", medium: "tamil", code: "12-TA-MATH" },
  { id: "sub19", name_en: "Physics",  standard: "12", medium: "tamil", code: "12-TA-PHY" },
  { id: "sub20", name_en: "Chemistry",  standard: "12", medium: "tamil", code: "12-TA-CHE" },
  { id: "sub21", name_en: "Biology",  standard: "12", medium: "tamil", code: "12-TA-BIO" },
  { id: "sub22", name_en: "Computer Science",  standard: "12", medium: "tamil", code: "12-TA-CS" },
]

// ===== Units =====
export const mockUnits: Unit[] = [
  { id: "u1", subjectId: "sub1", name_en: "Real Numbers",  unitNumber: 1 },
  { id: "u2", subjectId: "sub1", name_en: "Algebra",  unitNumber: 2 },
  { id: "u3", subjectId: "sub1", name_en: "Geometry",  unitNumber: 3 },
  { id: "u4", subjectId: "sub1", name_en: "Trigonometry",  unitNumber: 4 },
  { id: "u5", subjectId: "sub1", name_en: "Statistics",  unitNumber: 5 },
  { id: "u6", subjectId: "sub3", name_en: "Laws of Motion",  unitNumber: 1 },
  { id: "u7", subjectId: "sub3", name_en: "Heat and Thermodynamics",  unitNumber: 2 },
  { id: "u8", subjectId: "sub3", name_en: "Optics",  unitNumber: 3 },
  { id: "u9", subjectId: "sub4", name_en: "Chemical Reactions",  unitNumber: 1 },
  { id: "u10", subjectId: "sub4", name_en: "Acids, Bases and Salts",  unitNumber: 2 },
  { id: "u11", subjectId: "sub5", name_en: "Cell Biology",  unitNumber: 1 },
  { id: "u12", subjectId: "sub5", name_en: "Genetics",  unitNumber: 2 },
]

// ===== Lessons =====
export const mockLessons: Lesson[] = [
  { id: "l1", unitId: "u1", title_en: "Introduction to Real Numbers",  lessonNumber: 1, duration: 45, description_en: "Understanding the number system and real numbers", },
  { id: "l2", unitId: "u1", title_en: "Euclid's Division Lemma",  lessonNumber: 2, duration: 40, description_en: "Learning about Euclid's Division Algorithm", },
  { id: "l3", unitId: "u2", title_en: "Polynomials",  lessonNumber: 1, duration: 50, description_en: "Introduction to polynomials and operations", },
  { id: "l4", unitId: "u2", title_en: "Linear Equations",  lessonNumber: 2, duration: 45 },
  { id: "l5", unitId: "u3", title_en: "Triangles",  lessonNumber: 1, duration: 55 },
  { id: "l6", unitId: "u6", title_en: "Newton's First Law",  lessonNumber: 1, duration: 40 },
  { id: "l7", unitId: "u6", title_en: "Newton's Second Law",  lessonNumber: 2, duration: 45 },
  { id: "l8", unitId: "u9", title_en: "Types of Chemical Reactions",  lessonNumber: 1, duration: 50 },
  { id: "l9", unitId: "u11", title_en: "Structure of a Cell",  lessonNumber: 1, duration: 45 },
  { id: "l10", unitId: "u12", title_en: "Mendel's Laws",  lessonNumber: 1, duration: 50 },
]

// ===== Assessments =====
export const mockAssessments: Assessment[] = [
  { id: "a1", subjectId: "sub1", unitId: "u1", title_en: "Real Numbers Quiz",  type: "quiz", totalMarks: 25, duration: 20, questionCount: 10, createdBy: "u3", createdAt: "2024-09-01" },
  { id: "a2", subjectId: "sub1", unitId: "u2", title_en: "Algebra Assessment",  type: "exam", totalMarks: 50, duration: 45, questionCount: 20, createdBy: "u3", createdAt: "2024-09-15" },
  { id: "a3", subjectId: "sub3", unitId: "u6", title_en: "Laws of Motion Quiz",  type: "quiz", totalMarks: 25, duration: 15, questionCount: 10, createdBy: "u3", createdAt: "2024-10-01" },
  { id: "a4", subjectId: "sub4", unitId: "u9", title_en: "Chemical Reactions Test",  type: "exam", totalMarks: 50, duration: 40, questionCount: 15, createdBy: "u3", createdAt: "2024-10-10" },
  { id: "a5", subjectId: "sub5", unitId: "u11", title_en: "Cell Biology Quiz",  type: "quiz", totalMarks: 20, duration: 15, questionCount: 8, createdBy: "u3", createdAt: "2024-10-20" },
]

// ===== Questions =====
export const mockQuestions: Question[] = [
  {
    id: "q1", assessmentId: "a1",
    question_en: "Which of the following is an irrational number?",
    
    options_en: ["2/3", "0.5", "Square root of 2", "7"],
    
    correctAnswer: 2, marks: 2.5,
    explanation_en: "Square root of 2 cannot be expressed as a simple fraction.",
    
  },
  {
    id: "q2", assessmentId: "a1",
    question_en: "The HCF of 12 and 18 is:",
    
    options_en: ["2", "4", "6", "12"],
    
    correctAnswer: 2, marks: 2.5,
  },
  {
    id: "q3", assessmentId: "a1",
    question_en: "Every positive integer is:",
    
    options_en: ["Rational", "Irrational", "Prime", "Composite"],
    
    correctAnswer: 0, marks: 2.5,
  },
  {
    id: "q4", assessmentId: "a1",
    question_en: "The decimal expansion of a rational number is:",
    
    options_en: ["Always terminating", "Always non-terminating", "Either terminating or repeating", "Never repeating"],
    
    correctAnswer: 2, marks: 2.5,
  },
  {
    id: "q5", assessmentId: "a1",
    question_en: "LCM of 6, 15 and 21 is:",
    
    options_en: ["42", "105", "210", "630"],
    
    correctAnswer: 2, marks: 2.5,
  },
  {
    id: "q6", assessmentId: "a3",
    question_en: "Newton's first law of motion is also known as:",
    
    options_en: ["Law of acceleration", "Law of inertia", "Law of reaction", "Law of gravity"],
    
    correctAnswer: 1, marks: 2.5,
  },
  {
    id: "q7", assessmentId: "a3",
    question_en: "The SI unit of force is:",
    
    options_en: ["Joule", "Newton", "Watt", "Pascal"],
    
    correctAnswer: 1, marks: 2.5,
  },
  {
    id: "q8", assessmentId: "a2",
    question_en: "If x + 2 = 5, what is the value of x?",
    
    options_en: ["2", "3", "5", "7"],
    
    correctAnswer: 1, marks: 5,
  },
  {
    id: "q9", assessmentId: "a2",
    question_en: "What is the degree of a quadratic polynomial?",
    
    options_en: ["1", "2", "3", "4"],
    
    correctAnswer: 1, marks: 5,
  },
  {
    id: "q10", assessmentId: "a4",
    question_en: "Which gas is evolved when an acid reacts with a metal?",
    
    options_en: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
    
    correctAnswer: 3, marks: 5,
  },
  {
    id: "q11", assessmentId: "a4",
    question_en: "What is the chemical formula of water?",
    
    options_en: ["HO", "H2O", "HO2", "H2O2"],
    
    correctAnswer: 1, marks: 5,
  },
  {
    id: "q12", assessmentId: "a5",
    question_en: "Which part of the cell is known as the powerhouse?",
    
    options_en: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    
    correctAnswer: 2, marks: 5,
  },
  {
    id: "q13", assessmentId: "a5",
    question_en: "What is the basic structural and functional unit of life?",
    
    options_en: ["Tissue", "Organ", "Cell", "Organism"],
    
    correctAnswer: 2, marks: 5,
  },
  // Expanded Real Numbers Questions (a1)
  {
    id: "q_a1_e1", assessmentId: "a1",
    question_en: "Which of these is a rational number?",
    
    options_en: ["√2", "π", "0.333...", "√3"],
    
    correctAnswer: 2, marks: 2.5
  },
  {
    id: "q_a1_e2", assessmentId: "a1",
    question_en: "The sum of a rational and irrational number is always:",
    
    options_en: ["Irrational", "Rational", "Integer", "Whole number"],
    
    correctAnswer: 0, marks: 2.5
  },
  {
    id: "q_a1_e3", assessmentId: "a1",
    question_en: "If p is a prime number, then √p is:",
    
    options_en: ["Rational", "Irrational", "Terminating decimal", "Integer"],
    
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a1_e4", assessmentId: "a1",
    question_en: "The decimal expansion of 22/7 is:",
    
    options_en: ["Terminating", "Non-terminating and repeating", "Non-terminating and non-repeating", "None of the above"],
    
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a1_e5", assessmentId: "a1",
    question_en: "Which of the following numbers is an integer?",
    
    options_en: ["-4", "2.5", "√5", "3/4"],
    
    correctAnswer: 0, marks: 2.5
  },

  // Expanded Laws of Motion Questions (a3)
  {
    id: "q_a3_e1", assessmentId: "a3",
    question_en: "Inertia is directly proportional to:",
    
    options_en: ["Velocity", "Mass", "Force", "Acceleration"],
    
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a3_e2", assessmentId: "a3",
    question_en: "Action and reaction forces act on:",
    
    options_en: ["Same body", "Different bodies", "Horizontal planes", "Vertical planes"],
    
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a3_e3", assessmentId: "a3",
    question_en: "Momentum is the product of:",
    
    options_en: ["Mass and acceleration", "Mass and velocity", "Force and time", "Force and area"],
    
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a3_e4", assessmentId: "a3",
    question_en: "A freely falling body experiences:",
    
    options_en: ["Zero acceleration", "Zero weight", "Infinite acceleration", "Zero velocity"],
    
    correctAnswer: 1, marks: 2.5
  },
  {
    id: "q_a3_e5", assessmentId: "a3",
    question_en: "For every action there is an equal and opposite reaction. This is Newton's:",
    
    options_en: ["First law", "Second law", "Third law", "Law of gravitation"],
    
    correctAnswer: 2, marks: 2.5
  },
  {
    id: "q_a3_e6", assessmentId: "a3",
    question_en: "Force = mass × ?",
    
    options_en: ["Velocity", "Momentum", "Inertia", "Acceleration"],
    
    correctAnswer: 3, marks: 2.5
  },
  {
    id: "q_a3_e7", assessmentId: "a3",
    question_en: "The rate of change of momentum is proportional to:",
    
    options_en: ["Velocity", "Time", "Applied force", "Mass"],
    
    correctAnswer: 2, marks: 2.5
  },
  {
    id: "q_a3_e8", assessmentId: "a3",
    question_en: "A rocket works on the principle of conservation of:",
    
    options_en: ["Energy", "Momentum", "Mass", "Velocity"],
    
    correctAnswer: 1, marks: 2.5
  },

  // Expanded Chemistry Reactions Questions (a4)
  {
    id: "q_a4_e1", assessmentId: "a4",
    question_en: "What happens when dilute HCl is added to iron fillings?",
    
    options_en: ["Hydrogen gas and iron chloride are formed", "Chlorine gas and iron hydroxide are formed", "No reaction", "Water and iron salt are formed"],
    
    correctAnswer: 0, marks: 5
  },
  {
    id: "q_a4_e2", assessmentId: "a4",
    question_en: "Rusting of iron is an example of:",
    
    options_en: ["Reduction", "Ionization", "Oxidation", "Dissociation"],
    
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a4_e3", assessmentId: "a4",
    question_en: "Which of the following is an endothermic reaction?",
    
    options_en: ["Burning of coal", "Respiration", "Photosynthesis", "Digestion"],
    
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a4_e4", assessmentId: "a4",
    question_en: "A reaction where two or more substances combine to form a single product is:",
    
    options_en: ["Displacement", "Combination", "Decomposition", "Double displacement"],
    
    correctAnswer: 1, marks: 5
  },
  {
    id: "q_a4_e5", assessmentId: "a4",
    question_en: "The insoluble substance formed during a chemical reaction is called:",
    
    options_en: ["Solvent", "Precipitate", "Residue", "Filtrate"],
    
    correctAnswer: 1, marks: 5
  },
  {
    id: "q_a4_e6", assessmentId: "a4",
    question_en: "Which gas is used in the manufacturing of ammonia?",
    
    options_en: ["Oxygen", "Carbon dioxide", "Nitrogen", "Chlorine"],
    
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a4_e7", assessmentId: "a4",
    question_en: "Combustion is a chemical process in which a substance reacts with:",
    
    options_en: ["Nitrogen", "Hydrogen", "Oxygen", "Carbon"],
    
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a4_e8", assessmentId: "a4",
    question_en: "The colour of copper oxide is:",
    
    options_en: ["Red", "Black", "Blue", "Green"],
    
    correctAnswer: 1, marks: 5
  },

  // Expanded Algebra Questions (a2)
  {
    id: "q_a2_e1", assessmentId: "a2",
    question_en: "If 3x - 6 = 9, what is x?",
    options_en: ["3", "5", "6", "7"],
    correctAnswer: 1, marks: 5
  },
  {
    id: "q_a2_e2", assessmentId: "a2",
    question_en: "What is the value of x in 2x + 8 = 20?",
    options_en: ["4", "6", "10", "12"],
    correctAnswer: 1, marks: 5
  },
  {
    id: "q_a2_e3", assessmentId: "a2",
    question_en: "The roots of the quadratic equation x² - 5x + 6 = 0 are:",
    options_en: ["2 and 3", "1 and 6", "-2 and -3", "4 and 1"],
    correctAnswer: 0, marks: 5
  },
  {
    id: "q_a2_e4", assessmentId: "a2",
    question_en: "What is the degree of the polynomial 4x³ - 2x² + x - 5?",
    options_en: ["1", "2", "3", "4"],
    correctAnswer: 2, marks: 5
  },
  {
    id: "q_a2_e5", assessmentId: "a2",
    question_en: "If f(x) = 2x + 3, what is f(4)?",
    options_en: ["8", "9", "10", "11"],
    correctAnswer: 3, marks: 5
  },
  {
    id: "q_a2_e6", assessmentId: "a2",
    question_en: "Which of the following is a linear equation?",
    options_en: ["x² + 3 = 0", "2x + 5 = 11", "x³ = 27", "x² - x = 0"],
    correctAnswer: 1, marks: 5
  },
  {
    id: "q_a2_e7", assessmentId: "a2",
    question_en: "The sum of zeroes of polynomial x² - 4x + 3 is:",
    options_en: ["3", "4", "-4", "-3"],
    correctAnswer: 1, marks: 5
  },
  {
    id: "q_a2_e8", assessmentId: "a2",
    question_en: "For what value of k does 3x + ky = 7 have infinitely many solutions when combined with 6x + 4y = 14?",
    options_en: ["1", "2", "3", "4"],
    correctAnswer: 1, marks: 5
  },

  // Expanded Cell Biology Questions (a5)
  {
    id: "q_a5_e1", assessmentId: "a5",
    question_en: "Which organelle is responsible for protein synthesis?",
    options_en: ["Mitochondria", "Ribosome", "Golgi apparatus", "Lysosome"],
    correctAnswer: 1, marks: 2
  },
  {
    id: "q_a5_e2", assessmentId: "a5",
    question_en: "The control center of a cell is the:",
    options_en: ["Cell membrane", "Cytoplasm", "Nucleus", "Vacuole"],
    correctAnswer: 2, marks: 2
  },
  {
    id: "q_a5_e3", assessmentId: "a5",
    question_en: "Which organelle performs photosynthesis in plant cells?",
    options_en: ["Mitochondria", "Ribosome", "Chloroplast", "Nucleus"],
    correctAnswer: 2, marks: 2
  },
  {
    id: "q_a5_e4", assessmentId: "a5",
    question_en: "The fluid-filled space inside the cell membrane is called:",
    options_en: ["Nucleus", "Cytoplasm", "Vacuole", "Lysosome"],
    correctAnswer: 1, marks: 2
  },
  {
    id: "q_a5_e5", assessmentId: "a5",
    question_en: "Which part of the cell controls what enters and exits?",
    options_en: ["Cell wall", "Nucleus", "Cell membrane", "Ribosome"],
    correctAnswer: 2, marks: 2
  },
  {
    id: "q_a5_e6", assessmentId: "a5",
    question_en: "What is the function of the Golgi apparatus?",
    options_en: ["Energy production", "Protein packaging and transport", "DNA replication", "Photosynthesis"],
    correctAnswer: 1, marks: 2
  },
  {
    id: "q_a5_e7", assessmentId: "a5",
    question_en: "Lysosomes contain:",
    options_en: ["Chlorophyll", "Digestive enzymes", "DNA", "Starch"],
    correctAnswer: 1, marks: 2
  },
  {
    id: "q_a5_e8", assessmentId: "a5",
    question_en: "Which type of cell lacks a nucleus?",
    options_en: ["Animal cell", "Plant cell", "Prokaryotic cell", "Eukaryotic cell"],
    correctAnswer: 2, marks: 2
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
    
    description_en: "Your scores in trigonometry suggest you need to revisit fundamental concepts",
    
    priority: "high", lessonId: "l5",
  },
  {
    id: "rec2", studentId: "u4", type: "practice",
    title_en: "Practice Optics Problems",
    
    description_en: "Additional practice in optics will help improve your physics score",
    
    priority: "medium",
  },
  {
    id: "rec3", studentId: "u4", type: "lesson",
    title_en: "Watch Genetics Video Lesson",
    
    description_en: "The video lesson on genetics covers the concepts you missed in the last quiz",
    
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
