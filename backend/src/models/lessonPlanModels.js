import mongoose from "mongoose";

const LessonPlanSchema = new mongoose.Schema(
  {
    courseCode: { type: String, required: true },
    strandCode: { type: String, required: true },
    title: { type: String, required: true },
    gradeLevel: { type: Number, required: true },
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const LessonPlan = mongoose.model("LessonPlan", LessonPlanSchema);

export default LessonPlan;
