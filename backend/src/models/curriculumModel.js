import { model, Schema } from "mongoose";



// Schema for Create Curriculum
const curriculumSchema = new Schema({
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
  }]
},
  { timestamps: true }
);


const CurriculumModel = model("Curriculum", curriculumSchema);

export default CurriculumModel
