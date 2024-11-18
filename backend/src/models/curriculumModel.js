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



