import { GoogleGenerativeAI } from "@google/generative-ai";
import Assessment from "../models/assessmentModels.js";
// import Curriculum from "../models/Curriculum.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content with AI:", error);
    throw new Error(`AI content generation failed: ${error.message}`);
  }
}

// Create the assessment with generated questions

function cleanGeneratedContent(content) {
  // Find the start and end of the JSON array
  const startIndex = content.indexOf("[");
  const endIndex = content.lastIndexOf("]");

  if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
    throw new Error("No valid JSON array found in the generated content");
  }

  // Extract the JSON array
  const jsonContent = content.slice(startIndex, endIndex + 1);

  // Parse and stringify to ensure valid JSON
  try {
    return JSON.stringify(JSON.parse(jsonContent));
  } catch (error) {
    throw new Error(`Invalid JSON structure: ${error.message}`);
  }
}

async function generateAssessment(req, res) {
  const {
    gradeLevel,
    courseName,
    strandName,
    assessmentType,
    numberOfQuestions,
    difficultyLevel,
    questionType,
  } = req.body;

  try {
    // Validate required fields
    if (!gradeLevel) {
      return res.status(400).json({ message: "GradeLevel is required." });
    }
    if (!courseName) {
      return res.status(400).json({ message: "CourseName is required." });
    }
    if (!strandName) {
      return res.status(400).json({ message: "StrandName is required." });
    }
    if (!assessmentType) {
      return res.status(400).json({ message: "AssessmentType is required." });
    }
    if (numberOfQuestions === undefined || numberOfQuestions <= 0) {
      return res
        .status(400)
        .json({ message: "NumberOfQuestions must be a positive integer." });
    }
    if (!difficultyLevel) {
      return res.status(400).json({ message: "DifficultyLevel is required." });
    }
    if (!questionType) {
      return res.status(400).json({ message: "QuestionType is required." });
    }

    const curriculum = await Curriculum.findOne({
      gradeLevel,
      "courses.courseName": courseName,
    });

    if (!curriculum) {
      return res.status(404).json({
        message: `No curriculum found for grade level ${gradeLevel} with course ${courseName}`,
      });
    }

    const course = curriculum.courses.find((c) => c.courseName === courseName);
    if (!course) {
      return res
        .status(404)
        .json({ message: `No course found with name ${courseName}` });
    }

    const strand = course.strands.find((strand) => strand.name === strandName);
    if (!strand) {
      return res
        .status(404)
        .json({ message: `No strand found with name ${strandName}` });
    }

    const prompt = `
        Generate an assessment for grade ${gradeLevel} for the course ${courseName}.
        The assessment should be of type ${assessmentType} and have ${numberOfQuestions} questions.
        The difficulty level of the questions should be ${difficultyLevel} and the question type should be ${questionType}.
        
        Provide the assessment content as a JSON array of questions, where each question has the following structure:
        {
          "questionText": "string",
          "options": ["string"],
          "correctAnswer": "string",
          "points": number
        }
        
        Ensure the total points for the assessment and the duration are included in the response.
      `;

    const generatedText = await generateContent(prompt);
    console.log("Generated text:", generatedText);

    const cleanedText = cleanGeneratedContent(generatedText);

    let questions;
    try {
      questions = JSON.parse(cleanedText);
    } catch (error) {
      return res.status(500).json({
        message: `Failed to parse generated content as JSON:${error.message}`,
        generatedContent: cleanedText,
      });
    }

    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

    const duration = Math.ceil(numberOfQuestions * 2); // Assuming 2 minutes per question

    const assessment = new Assessment({
      courseCode: course.courseCode,
      strandCode: strand.code,
      assessmentType,
      questions,
      totalPoints,
      duration: 60,
      questionType,
      difficultyLevel,
      numberOfQuestions,
    });

    const savedAssessment = await assessment.save();
    if (!savedAssessment) {
      throw new Error("Failed to save the assessment to the database");
    }

    res.status(201).json({
      message: "Assessment generated and saved successfully",
      assessment: savedAssessment,
    });
  } catch (error) {
    console.error("Error generating assessment:", error);
    res
      .status(500)
      .json({ message: "Error generating assessment", error: error.message });
  }
}

export default generateAssessment;

// Get all assessments
export const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.status(200).json(assessments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving assessments", error: error.message });
  }
};

// Update an assessment
export const updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating assessment", error: error.message });
  }
};

// Delete an assessment
export const deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndDelete(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.status(200).json({ message: "Assessment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting assessment", error: error.message });
  }
};
