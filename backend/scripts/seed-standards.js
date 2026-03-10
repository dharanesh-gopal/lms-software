require('dotenv').config();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Standard = require('../models/Standard');

const subjects10 = [
  { name: 'Mathematics', code: 'MATH10', description: 'Basic Mathematics for 10th Grade' },
  { name: 'Science', code: 'SCI10', description: 'Physics, Chemistry, and Biology' },
  { name: 'English', code: 'ENG10', description: 'English Grammar and Literature' },
  { name: 'Social Studies', code: 'SS10', description: 'History, Geography, and Civics' },
  { name: 'Tamil', code: 'TAM10', description: 'Tamil Language' }
];

const subjects11 = [
  { name: 'Mathematics', code: 'MATH11', description: 'Advanced Mathematics for 11th Grade' },
  { name: 'Physics', code: 'PHY11', description: 'Physics - Mechanics, Waves, Heat' },
  { name: 'Chemistry', code: 'CHEM11', description: 'Chemistry - Organic and Inorganic' },
  { name: 'Biology', code: 'BIO11', description: 'Biology - Cell Biology and Genetics' },
  { name: 'English', code: 'ENG11', description: 'English Literature and Language' },
  { name: 'Computer Science', code: 'CS11', description: 'Programming and Data Structures' }
];

const subjects12 = [
  { name: 'Mathematics', code: 'MATH12', description: 'Advanced Mathematics for 12th Grade' },
  { name: 'Physics', code: 'PHY12', description: 'Physics - Electromagnetism, Modern Physics' },
  { name: 'Chemistry', code: 'CHEM12', description: 'Chemistry - Physical and Organic' },
  { name: 'Biology', code: 'BIO12', description: 'Biology - Human Physiology and Botany' },
  { name: 'English', code: 'ENG12', description: 'Advanced English Literature' },
  { name: 'Computer Science', code: 'CS12', description: 'Advanced Programming and Databases' }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Drop the unique name index if it exists from previous schema
    try {
      await Subject.collection.dropIndex('name_1');
      console.log('Dropped legacy unique index on name');
    } catch (e) {
      // Ignore if index doesn't exist
    }

    // Seed 10th Standard
    await Subject.deleteMany({ standard: '10' });
    await Standard.deleteMany({ standard: '10' });
    const createdSubjects10 = await Subject.insertMany(subjects10.map(s => ({ ...s, standard: '10' })));
    await Standard.create({ standard: '10', name: '10th Grade', subjects: createdSubjects10.map(s => s._id) });
    console.log('Created 10th standard with subjects');

    // Seed 11th Standard
    await Subject.deleteMany({ standard: '11' });
    await Standard.deleteMany({ standard: '11' });
    const createdSubjects11 = await Subject.insertMany(subjects11.map(s => ({ ...s, standard: '11' })));
    await Standard.create({ standard: '11', name: '11th Grade', subjects: createdSubjects11.map(s => s._id) });
    console.log('Created 11th standard with subjects');

    // Seed 12th Standard
    await Subject.deleteMany({ standard: '12' });
    await Standard.deleteMany({ standard: '12' });
    const createdSubjects12 = await Subject.insertMany(subjects12.map(s => ({ ...s, standard: '12' })));
    await Standard.create({ standard: '12', name: '12th Grade', subjects: createdSubjects12.map(s => s._id) });
    console.log('Created 12th standard with subjects');

    console.log('\n✅ Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();
