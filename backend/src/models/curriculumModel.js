import mongoose from "mongoose";
import { indexCurriculum } from "../service/ai/curriculum.service.js";


const Schema = mongoose.Schema;


// Schema for Create Curriculum
const curriculumSchema = new mongoose.Schema({
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
  }]
},
  { timestamps: true }
);


const curriculumModel = mongoose.model('curriculumModel', curriculumSchema);

export default curriculumModel;





// // PerformanceIndicator Schema
// const performanceIndicatorSchema = new mongoose.Schema({
//   code: {type: String, required: true, unique: true},
//   name: {type: String,required: true},
//   description: { type: String },
//   suggestedTimeframe: {type: String},
//   assessmentCriteria: {type: String},
//   resources: {type: String},
// });

// // Schema for SubStrand
// const subStrandSchema = new mongoose.Schema({
//   code: { type: String, required: true,unique: true },
//   name: { type: String, required: true},
//   description: { type: String },
//   performanceIndicator: [performanceIndicatorSchema]
  
// });

// // Schema for Strand 
// const strandSchema = new mongoose.Schema({
//   code: { type: String, required: true, unique: true },
//   name: {type: String, required: true},
//   description: { type: String },
//   subStrand: [subStrandSchema],
  
// });

// // schema for Course
// const courseSchema = new mongoose.Schema({
//   courseCode: {type: String, required: true, unique: true },
//   courseName: { type: String,required: true},
//   description: { type: String },
//   strands: [strandSchema],
// });

