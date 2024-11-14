// // import mongoose from "mongoose";
// // import { indexCurriculum } from "../services/ai/curriculum.service";

// const { Schema } = mongoose;

// const PerformanceIndicatorSchema = new Schema({
//   code: { type: String, required: true, unique: true },
//   description: { type: String, required: true },
//   suggestedTimeframe: String,
//   assessmentCriteria: String,
//   resources: String,
// });

// const SubStrandSchema = new Schema({
//   code: { type: String, required: true },
//   name: { type: String, required: true },
//   performanceIndicators: [PerformanceIndicatorSchema],
// });

// const StrandSchema = new Schema({
//   code: { type: String, required: true },
//   name: { type: String, required: true },
//   subStrands: [SubStrandSchema],
// });

// // Curriculum Schema with indexing middleware
// const curriculumSchema = new Schema(
//   {
//     code: { type: String, required: true, unique: true },
//     grade: { type: Number, required: true, min: 1 },
//     strands: [
//       {
//         name: { type: String, required: true },
//         code: { type: String, required: true },
//         subStrand: [
//           {
//             code: { type: String, required: true },
//             title: { type: String, required: true },
//             contentStandards: { type: String },
//             learningIndicators: [String],
//           },
//         ],
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // Post-save middleware for automatic indexing
// curriculumSchema.post("save", async function (doc) {
//   try {
//     await indexCurriculum(doc);
//   } catch (error) {
//     console.error("Error indexing curriculum:", error);
//   }
// });

// // Post-update middleware for handling updates
// curriculumSchema.post("findOneAndUpdate", async function (doc) {
//   if (doc) {
//     try {
//       await indexCurriculum(doc);
//     } catch (error) {
//       console.error("Error indexing updated curriculum:", error);
//     }
//   }
// });

// // Pre-remove middleware to remove from index if needed
// curriculumSchema.pre("remove", async function () {
//   try {
//     const curriculumId = this._id.toString();
//     await index.delete1({ ids: [curriculumId] });
//   } catch (error) {
//     console.error("Error removing curriculum from index:", error);
//   }
// });

// // Curriculum Model
// const CurriculumModel = mongoose.model("Curriculum", curriculumSchema);

// export default CurriculumModel;
