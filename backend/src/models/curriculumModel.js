import mongoose from "mongoose";


const Schema = mongoose.Schema;

// PerformanceIndicator Schema
const performanceIndicatorSchema = new mongoose.Schema({
  code: {type: String, required: true, unique: true},
  description: { type: String, required: true},
  suggestedTimeframe: {type: String},
  assessmentCriteria: {type: String},
  resources: {type: String},
});

// Schema for SubStrand
const subStrandSchema = new mongoose.Schema({
  code: { type: String, required: true,unique: true },
  name: { type: String, required: true},
  performanceIndicator: [performanceIndicatorSchema]
  
});

// Schema for Strand 
const strandSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: {type: String, required: true},
  subStrand: [subStrandSchema],
  
});

// schema for Course
const courseSchema = new mongoose.Schema({
  courseCode: {type: String, required: true, unique: true },
  courseName: { type: String,required: true},
  strands: [strandSchema],
});

// Schema for Curriculum
const curriculumSchema = new mongoose.Schema({
  gradeLevel: {type: Number, required: true, unique: true, min: 1},
  courses: [courseSchema],
});


const Curriculum = mongoose.model('Curriculum', curriculumSchema);

export default Curriculum;




