import { searchCurricula } from "../service/ai/curriculum.service.js";

export const searchCurriculumHandler = async (req, res) => {
  try {
    const {
      query, // Free text search
      grade, // Grade level
      code, // Curriculum code
      strandCode, // Strand code
      contentText, // Search in content standards
      limit = 20, // Number of results to return
    } = req.query;
console.log("grade--->", grade)
    const gradeNumber = grade && !isNaN(Number(grade)) ? Number(grade) : undefined;

    if (grade && gradeNumber === undefined) {
      return res.status(400).json({ error: 'Invalid grade format'})
    }
    const filters = {
      grade: gradeNumber,
      code,
      strandCode,
    };

    // Remove undefined filters
    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key]
    );

    const results = await searchCurricula(
      query || contentText, // Use either query or content text for searching
      filters,
      parseInt(limit)
    );

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error in curriculum search:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
