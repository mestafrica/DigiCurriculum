import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

async function getEmbedding(text) {
  try {
    const result = await embeddingModel.embedContent(text);
    // console.log("Embedding:", result.embedding);
    return result.embedding.values;
  } catch (error) {
    console.log("Error getting embedding from Gemini:", error);
    throw new Error("Failed to generate embedding");
  }
}

export default getEmbedding;



  