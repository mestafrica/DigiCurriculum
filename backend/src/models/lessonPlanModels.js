import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LessonPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    grade: { type: Number, required: true, min: 1 },
    strands: [{ 
      name: { type: String, required: true },
      code: { type: String, required: true },
      subStrand: [{
        code: { type: String, required: true },
        title: { type: String, required: true },
        contentStandards: { type: String },
        learningIndicators: [String]
      }]
    }], 
    duration: { type: Number, required: true }, // in minutes
    objectives: [{ type: String, required: true }],
    materials: [String],
    procedure: [
      {
        step: Number,
        description: String,
        duration: Number, // in minutes
      },
    ],
    assessment: String,
    standards: [
      {
        code: String,
        description: String,
      },
    ],
    notes: String,
  },
  { timestamps: true }
);

const LessonPlan = mongoose.model("LessonPlan", LessonPlanSchema);

export default LessonPlan;
