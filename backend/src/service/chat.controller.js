import { answerQuestion } from '../service/chatbot.js';

export async function handleChatRequest(req, res) {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: 'Message is required' 
      });
    }
    
    const result = await answerQuestion(message);
    res.json(result);
    
  } catch (error) {
    console.error('Chat controller error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message 
    });
  }
}