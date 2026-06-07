import { PDFParse as pdf } from 'pdf-parse';

import mammoth from 'mammoth';
import { generateContent } from '../utils/gemini.js';
import CurriculumModel from '../models/curriculumModel.js';

export const ingestCurriculum = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let extractedText = '';

    if (req.file.mimetype === 'application/pdf') {
      const parser = new pdf({ data: req.file.buffer });
      const data = await parser.getText();
      extractedText = data.text;
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      extractedText = result.value;
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Please upload a PDF or DOCX.' });
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract enough text from the document.' });
    }

    const systemPrompt = `
      You are an expert curriculum analyzer. Your task is to take the following extracted text from an educational curriculum document and convert it into a structured JSON format.
      
      The JSON structure MUST strictly follow this schema:
      {
        "name": "Subject Name",
        "code": "UNIQUE-CODE (e.g. MATH-G7)",
        "grade": Number,
        "strands": [
          {
            "name": "Strand Name",
            "code": "STRAND-CODE",
            "subStrand": [
              {
                "code": "SUBSTRAND-CODE",
                "title": "Sub-Strand Title",
                "contentStandards": "The main standard text",
                "learningIndicators": ["Indicator 1", "Indicator 2"]
              }
            ]
          }
        ]
      }

      CRITICAL RULES:
      1. ONLY return the JSON object. No markdown, no explanations.
      2. If the text is too long, focus on the core structure and sample at least 5 major strands.
      3. Ensure the 'grade' is a number.
      4. If you cannot find a specific field, make a reasonable inference based on the context.

      CURRICULUM TEXT:
      ${extractedText.substring(0, 15000)} 
    `;

    const aiResponse = await generateContent(systemPrompt);
    
    // Clean AI response in case it includes markdown backticks
    const cleanJson = aiResponse.replace(/```json|```/g, '').trim();
    
    let curriculumData;
    try {
      curriculumData = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("AI returned invalid JSON:", aiResponse);
      return res.status(500).json({ 
        error: 'AI failed to generate valid JSON structure.', 
        rawResponse: aiResponse.substring(0, 500) 
      });
    }

    // Save to Database
    const newCurriculum = new CurriculumModel(curriculumData);
    await newCurriculum.save();

    res.status(201).json({ 
      message: 'Curriculum ingested and saved successfully!', 
      curriculum: {
        name: newCurriculum.name,
        grade: newCurriculum.grade,
        code: newCurriculum.code,
        strandsCount: newCurriculum.strands.length
      }
    });

  } catch (error) {
    console.error('Ingestion error:', error);
    res.status(500).json({ error: 'An error occurred during curriculum ingestion', details: error.message });
  }
};
