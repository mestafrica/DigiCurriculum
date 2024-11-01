// import mongoose from "mongoose";

// const AssessmentSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   questions: [
//     {
//       questionText: {
//         type: String,
//         required: true,
//       },
//       options: [
//         {
//           type: String,
//           required: true,
//         },
//       ],
//       correctAnswer: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Assessment = mongoose.model("Assessment", AssessmentSchema);

// export default Assessment;

// const mongoose = require("mongoose");

import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  strandCode: { type: String, required: true },
  subStrandCode: { type: String, required: false },
  performanceIndicatorCode: { type: String, required: false },
  assessmentType: {
    type: String,
    enum: ["Quiz", "Test", "Project", "Exam"],
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String }],
      correctAnswer: { type: String, required: true },
      points: { type: Number, required: true },
    },
  ],
  totalPoints: { type: Number, required: true },
  duration: { type: Number, required: true },
  questionType: { type: String, required: true },
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  numberOfQuestions: { type: Number, required: true },
});

const Assessment = mongoose.model("Assessment", AssessmentSchema);

export default Assessment;
