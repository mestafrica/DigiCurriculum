import React, { useState, useRef, useEffect } from 'react';
import aiService from "../../../../services/aiService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AiTools = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am your AI Teaching Assistant. How can I help you today? You can ask me about curriculum details, teaching strategies, or general educational topics."
    }
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMessage = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      // In a real multi-turn chat we would send message history.
      // aiService.askAI takes query and optionally grade.
      const response = await aiService.askAI(userMessage.content);
      
      let aiContent = "";
      if (typeof response === "string") {
        aiContent = response;
      } else if (response && response.answer) {
        aiContent = response.answer;
      } else {
        aiContent = JSON.stringify(response, null, 2);
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiContent
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        isError: true,
        content: "Sorry, I encountered an error while processing your request. Please try again later."
      }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 md:p-8 flex flex-col h-[calc(100vh-64px)] w-full max-w-5xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">AI Teaching Assistant</h2>
          <p className="text-sm text-gray-500 mt-1">Chat with our advanced AI to find resources and answers.</p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  msg.role === 'user' ? 'bg-primary text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {msg.role === 'user' ? 'U' : '🤖'}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : msg.isError 
                      ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
                      : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none'
                }`}>
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isSending && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">🤖</div>
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm rounded-tl-none flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="relative flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Type your question here... (Press Enter to send)"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-14 py-3 resize-none h-[52px] min-h-[52px] max-h-32 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              disabled={isSending}
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className={`absolute right-2 p-2 rounded-lg transition ${
                !input.trim() || isSending
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-primary hover:bg-primary/10'
              }`}
            >
              <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AiTools;
