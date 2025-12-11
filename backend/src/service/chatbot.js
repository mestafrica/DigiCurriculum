import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


export async function answerQuestion(question) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const result = await model.generateContent(question);
    const answer = await result.response.text();
    
    return { 
      success: true, 
      answer
    };
    
  } catch (error) {
    console.error('Chatbot error:', error);
    return { 
      success: false, 
      answer: 'Sorry, I encountered an error.',
      error: error.message 
    };
  }
}





