import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CurriculumModel from './src/models/curriculumModel.js';

dotenv.config();

const seedData = [
  {
    name: "English Language",
    code: "ENG-G1",
    grade: 1,
    strands: [
      {
        name: "Oral Language",
        code: "OL1",
        subStrand: [
          {
            code: "OL1.1",
            title: "Listening and Speaking",
            contentStandards: "Develop basic communication skills.",
            learningIndicators: ["Listen to simple stories", "Express needs clearly"]
          }
        ]
      }
    ]
  },
  {
    name: "Mathematics",
    code: "MATH-G7",
    grade: 7,
    strands: [
      {
        name: "Number",
        code: "N7",
        subStrand: [
          {
            code: "N7.1",
            title: "Number Systems",
            contentStandards: "Students will demonstrate an understanding of number systems.",
            learningIndicators: ["Convert fractions to decimals", "Identify prime factors"]
          }
        ]
      },
      {
        name: "Algebra",
        code: "A7",
        subStrand: [
          {
            code: "A7.1",
            title: "Patterns and Relations",
            contentStandards: "Students will use patterns and relations to solve problems.",
            learningIndicators: ["Describe linear relations", "Solve one-step equations"]
          }
        ]
      }
    ]
  },
  {
    name: "Science",
    code: "SCI-G8",
    grade: 8,
    strands: [
      {
        name: "Life Science",
        code: "LS8",
        subStrand: [
          {
            code: "LS8.1",
            title: "Cells and Systems",
            contentStandards: "Understand the basic structure of cells.",
            learningIndicators: ["Identify cell parts", "Compare plant and animal cells"]
          }
        ]
      }
    ]
  },
  {
    name: "Computing",
    code: "COMP-G9",
    grade: 9,
    strands: [
      {
        name: "Programming",
        code: "P9",
        subStrand: [
          {
            code: "P9.1",
            title: "Introduction to Python",
            contentStandards: "Learn the basics of coding.",
            learningIndicators: ["Write a hello world program", "Understand variables"]
          }
        ]
      }
    ]
  },
  {
    name: "Social Studies",
    code: "SOC-G10",
    grade: 10,
    strands: [
      {
        name: "Our Environment",
        code: "OE10",
        subStrand: [
          {
            code: "OE10.1",
            title: "Physical Environment",
            contentStandards: "Understand our physical surroundings.",
            learningIndicators: ["Identify map symbols", "Describe major landforms"]
          }
        ]
      }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB...");
    
    for (const data of seedData) {
      await CurriculumModel.findOneAndUpdate(
        { code: data.code }, // Find by unique code
        data,                // Update with this data
        { upsert: true, new: true } // Create if doesn't exist
      );
    }
    
    console.log("Database successfully synchronized with seed data!");
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
