#!/usr/bin/env node

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Subject = require('../models/Subject');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lms';

async function generateSampleData() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing sample data (optional - be careful!)
    console.log('🧹 Clearing existing sample courses, lessons, and quizzes...');
    await Course.deleteMany({ title: { $regex: /Sample|Demo/i } });
    await Lesson.deleteMany({ title: { $regex: /Sample|Demo/i } });
    await Quiz.deleteMany({ title: { $regex: /Sample|Demo/i } });

    // Get subjects for 11th grade
    console.log('📚 Fetching subjects...');
    const subjects = await Subject.find({ standard: 11 });
    console.log(`Found ${subjects.length} subjects for 11th grade`);

    // Create sample faculty users
    console.log('👨‍🏫 Creating sample faculty...');
    const facultyEmails = [
      'mrathey@school.com',
      'msjoshi@school.com',
      'msmalini@school.com'
    ];

    let facultyUsers = [];
    for (const email of facultyEmails) {
      let faculty = await User.findOne({ email });
      if (!faculty) {
        faculty = await User.create({
          name: email.split('@')[0].replace('m', '').replace('s', 'Ms. ').toUpperCase(),
          email,
          password: await require('bcryptjs').hash('password123', 10),
          role: 'faculty',
          classTeaching: '11'
        });
        console.log(`✅ Created faculty: ${email}`);
      }
      facultyUsers.push(faculty);
    }

    // Create sample student users
    console.log('🎓 Creating sample students...');
    const studentEmails = [
      'raj.kumar@student.com',
      'priya.sharma@student.com',
      'arjun.singh@student.com',
      'neha.patel@student.com',
      'vikram.gupta@student.com'
    ];

    let studentUsers = [];
    for (const email of studentEmails) {
      let student = await User.findOne({ email });
      if (!student) {
        student = await User.create({
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email,
          password: await require('bcryptjs').hash('password123', 10),
          role: 'student',
          standard: 11,
          subject: subjects[Math.floor(Math.random() * subjects.length)]._id
        });
        console.log(`✅ Created student: ${email}`);
      }
      studentUsers.push(student);
    }

    // Create sample courses with lessons
    console.log('📖 Creating sample courses with lessons and quizzes...');

    const coursesData = [
      {
        title: 'Sample: Mathematics - Algebra & Functions',
        description: 'Complete course on algebra, polynomials, and function theory for 11th grade.',
        subject: subjects.find(s => s.name === 'Math')?._id,
        lessons: 3,
        quizzes: 2
      },
      {
        title: 'Sample: Physics - Motion & Forces',
        description: 'Learn about kinematics, Newton\'s laws, and motion in detail.',
        subject: subjects.find(s => s.name === 'Physics')?._id,
        lessons: 3,
        quizzes: 2
      },
      {
        title: 'Sample: Chemistry - Atomic Structure',
        description: 'Explore the structure of atoms, electrons, and chemical bonding.',
        subject: subjects.find(s => s.name === 'Chemistry')?._id,
        lessons: 3,
        quizzes: 2
      }
    ];

    for (const courseData of coursesData) {
      if (!courseData.subject) continue;

      const course = await Course.create({
        title: courseData.title,
        description: courseData.description,
        subject: courseData.subject,
        standard: 11,
        faculty: facultyUsers[Math.floor(Math.random() * facultyUsers.length)]._id,
        school: 'Sample School',
        students: studentUsers.slice(0, 3).map(s => s._id),
        totalLessons: courseData.lessons
      });

      console.log(`✅ Created course: ${courseData.title}`);

      // Create lessons for course
      for (let i = 1; i <= courseData.lessons; i++) {
        const lesson = await Lesson.create({
          title: `Lesson ${i}: ${courseData.title.split('-')[1].trim()} Part ${i}`,
          course: course._id,
          order: i,
          description: `Comprehensive lesson covering part ${i} of the course content with detailed explanations and examples.`,
          videoUrl: `/uploads/videos/sample-lesson-${course._id}-${i}.mp4`,
          videoTitle: `Video - ${courseData.title.split(':')[1].trim()} (Part ${i})`,
          duration: 600 + (i * 300) // 10, 15, 20 minutes
        });

        console.log(`  📹 Created lesson: ${lesson.title} (${lesson.duration}s)`);
      }

      // Create quizzes for course
      const quizzes = [
        {
          title: `Sample: Quiz 1 - ${courseData.title.split(':')[1].trim()} Basics`,
          questions: [
            {
              text: 'What is the fundamental concept introduced in this module?',
              type: 'multiple-choice',
              options: ['Option A', 'Option B', 'Option C', 'Option D'],
              correctAnswer: 'Option A',
              points: 5
            },
            {
              text: 'Which formula applies here?',
              type: 'multiple-choice',
              options: ['F = ma', 'E = mc²', 'PV = nRT', 'y = mx + c'],
              correctAnswer: 'y = mx + c',
              points: 5
            },
            {
              text: 'Is the statement true or false?',
              type: 'true-false',
              correctAnswer: 'True',
              points: 5
            },
            {
              text: 'Explain the key concept in your own words.',
              type: 'short-answer',
              correctAnswer: 'Accept student explanation',
              points: 10
            }
          ],
          totalPoints: 25,
          timeLimit: 900, // 15 minutes
          passingScore: 60
        },
        {
          title: `Sample: Quiz 2 - ${courseData.title.split(':')[1].trim()} Advanced`,
          questions: [
            {
              text: 'Apply the concept to solve this problem.',
              type: 'multiple-choice',
              options: ['Solution 1', 'Solution 2', 'Solution 3', 'Solution 4'],
              correctAnswer: 'Solution 2',
              points: 8
            },
            {
              text: 'Does this relationship hold in all cases?',
              type: 'true-false',
              correctAnswer: 'False',
              points: 7
            },
            {
              text: 'What are the implications?',
              type: 'short-answer',
              correctAnswer: 'Accept student analysis',
              points: 10
            }
          ],
          totalPoints: 25,
          timeLimit: 1200, // 20 minutes
          passingScore: 70
        }
      ];

      for (const quizData of quizzes) {
        const quiz = await Quiz.create({
          title: quizData.title,
          course: course._id,
          lesson: null,
          questions: quizData.questions,
          totalPoints: quizData.totalPoints,
          timeLimit: quizData.timeLimit,
          passingScore: quizData.passingScore,
          allowRetake: true
        });

        console.log(`  📝 Created quiz: ${quizData.title}`);
      }
    }

    console.log('\n✅ Sample data generation completed successfully!');
    console.log('\nSample Data Summary:');
    console.log(`  👨‍🏫 Faculty Created: ${facultyUsers.length}`);
    console.log(`  🎓 Students Created: ${studentUsers.length}`);
    console.log(`  📖 Courses Created: ${coursesData.length}`);
    console.log(`  📹 Lessons Created: ${coursesData.reduce((sum, c) => sum + c.lessons, 0)}`);
    console.log(`  📝 Quizzes Created: ${coursesData.reduce((sum, c) => sum + c.quizzes, 0)}`);
    console.log('\nCredentials for Testing:');
    console.log('  Faculty Email: mrathey@school.com');
    console.log('  Student Email: raj.kumar@student.com');
    console.log('  Password: password123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error generating sample data:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

generateSampleData();
