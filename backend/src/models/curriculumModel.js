import mongoose from "mongoose";


const Schema = mongoose.Schema;

// PerformanceIndicator Schema
const performanceIndicatorSchema = new Schema({
  code: {
     type: String,
 required: true, unique: true
 },
  name: { 
    type: String,
     required: true 
    },
  description: {
     type: String 
    },
});

// Schema for SubStrand
const subStrandSchema = new Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true 
},
  name: { 
    type: String, 
    required: true 
},
  description: { type: String },
  
});

// Schema for Strand 
const strandSchema = new Schema({
  code: { 
    type: String,
     required: true, 
     unique: true 
    },
  name: {
     type: String, 
     required: true 
    },
  description: { type: String },
  
});

// schema for Course
const courseSchema = new Schema({
  code: {
     type: String, 
    required: true, 
    unique: true 
},
  name: {
     type: String,
      required: true 
    },
  description: { 
    type: String 
},
  strands: [strandSchema],
});

// Schema for Curriculum
const curriculumSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  timeframes: { type: String },
  courses: [courseSchema],
});


const Curriculum = mongoose.model('Curriculum', curriculumSchema);

module.exports = Curriculum;
