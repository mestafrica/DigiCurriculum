import { GoogleGenerativeAI } from "@google/generative-ai";
import LessonPlan from "../models/lessonPlanModels.js";
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

function cleanGeneratedContent(content) {
  const startIndex = content.indexOf("{");
  const endIndex = content.lastIndexOf("}");

  if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
    throw new Error("No valid JSON object found in the generated content");
  }

  const jsonContent = content.slice(startIndex, endIndex + 1);

  try {
    return JSON.stringify(JSON.parse(jsonContent));
  } catch (error) {
    throw new Error(`Invalid JSON structure: ${error.message}`);
  }
}

export async function generateLessonPlan(req, res) {
  const { gradeLevel, courseName, strandName, title, duration, objectives } =
    req.body;

  try {
    // Validate required fields
    if (
      !gradeLevel ||
      !courseName ||
      !strandName ||
      !title ||
      !duration ||
      !objectives
    ) {
      return res.status(400).json({ message: "Missing required fields." });
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
      Generate a lesson plan for grade ${gradeLevel} for the course ${courseName}, strand ${strandName}.
      The lesson plan should have the title "${title}" and last for ${duration} minutes.
      The objectives of the lesson are: ${objectives.join(", ")}.
      
      Provide the lesson plan content as a JSON object with the following structure:
      {
        "materials": ["string"],
        "procedure": [
          {
            "step": number,
            "description": "string",
            "duration": number
          }
        ],
        "assessment": "string",
        "standards": [
          {
            "code": "string",
            "description": "string"
          }
        ],
        "notes": "string"
      }
    `;

    const generatedText = await generateContent(prompt);
    console.log("Generated text:", generatedText);

    const cleanedText = cleanGeneratedContent(generatedText);

    let lessonPlanContent;
    try {
      lessonPlanContent = JSON.parse(cleanedText);
    } catch (error) {
      return res.status(500).json({
        message: `Failed to parse generated content as JSON: ${error.message}`,
        generatedContent: cleanedText,
      });
    }

    const lessonPlan = new LessonPlan({
      courseCode: course.courseCode,
      strandCode: strand.code,
      title,
      gradeLevel,
      duration,
      objectives,
      ...lessonPlanContent,
    });

    const savedLessonPlan = await lessonPlan.save();
    if (!savedLessonPlan) {
      throw new Error("Failed to save the lesson plan to the database");
    }

    res.status(201).json({
      message: "Lesson plan generated and saved successfully",
      lessonPlan: savedLessonPlan,
    });
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    res
      .status(500)
      .json({ message: "Error generating lesson plan", error: error.message });
  }
}

export const getLessonPlans = async (req, res) => {
  try {
    const lessonPlans = await LessonPlan.find();
    res.status(200).json(lessonPlans);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving lesson plans", error: error.message });
  }
};

export const updateLessonPlan = async (req, res) => {
  try {
    const lessonPlan = await LessonPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!lessonPlan) {
      return res.status(404).json({ message: "Lesson plan not found" });
    }
    res.status(200).json(lessonPlan);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating lesson plan", error: error.message });
  }
};

export const deleteLessonPlan = async (req, res) => {
  try {
    const lessonPlan = await LessonPlan.findByIdAndDelete(req.params.id);
    if (!lessonPlan) {
      return res.status(404).json({ message: "Lesson plan not found" });
    }
    res.status(200).json({ message: "Lesson plan deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting lesson plan", error: error.message });
  }
};
