import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.Gemini_ApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export  const generateContent= async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content with AI:", error);
    throw error;
  }
}

