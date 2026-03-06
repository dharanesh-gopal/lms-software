require('dotenv').config();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Standard = require('../models/Standard');

const subjects11 = [
  { name: 'Mathematics', code: 'MATH11', description: 'Advanced Mathematics for 11th Grade' },
  { name: 'Physics', code: 'PHY11', description: 'Physics - Mechanics, Waves, Heat' },
  { name: 'Chemistry', code: 'CHEM11', description: 'Chemistry - Organic and Inorganic' },
  { name: 'Biology', code: 'BIO11', description: 'Biology - Cell Biology and Genetics' },
  { name: 'English', code: 'ENG11', description: 'English Literature and Language' },
  { name: 'History', code: 'HIST11', description: 'World and Indian History' },
  { name: 'Geography', code: 'GEO11', description: 'Physical and Human Geography' },
  { name: 'Computer Science', code: 'CS11', description: 'Programming and Data Structures' }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Subject.deleteMany({ standard: '11' });
    await Standard.deleteMany({ standard: '11' });

    // Create subjects
    const createdSubjects = await Subject.insertMany(
      subjects11.map(s => ({ ...s, standard: '11' }))
    );
    console.log(`Created ${createdSubjects.length} subjects for 11th standard`);

    // Create standard
    const standard11 = await Standard.create({
      standard: '11',
      name: '11th Grade',
      subjects: createdSubjects.map(s => s._id)
    });
    console.log('Created 11th standard with subjects');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSubjects created:');
    createdSubjects.forEach(s => console.log(`  - ${s.name} (${s.code})`));

    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();
