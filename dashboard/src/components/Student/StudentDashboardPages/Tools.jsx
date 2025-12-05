import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getUserById } from "../../../services/authService";

const baseUrl = import.meta.env.VITE_BASE_URL;
const Tools = () => {
  const { token, userId } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Grab query params first
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token");
    let userId = urlParams.get("userId");

    if (token && userId) {
      // ✅ Save in localStorage for persistence
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    } else {
      // Fallback: use localStorage
      token = localStorage.getItem("token");
      userId = localStorage.getItem("userId");
    }

    if (!token || !userId) {
      console.error("❌ No auth info found (token/userId missing)");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await getUserById(userId, token);
        setUserInfo(response.user || response);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add the user question to chat
    const newMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/chat`, {
        message: question,
      });

      const botMessage = { sender: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = { sender: "bot", text: "Sorry, something went wrong." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col width-full bg-gray-100 justify-center p-6 gap-y-20">
      <div className="mb-9 flex flex-row w-max p-4 m-auto">
        <h1 className="font-quicksand text-4xl   text-blue-500 font-bold">
          Hello, <span className="text-orange-300">{userInfo?.firstName || "Loading..."}</span> 
        </h1>
      </div>
      <div className="flex flex-col h-screen bg-gray-100 items-center">
        <div className="w-full max-w-[700px] bg-white shadow-lg rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-orange-300 text-white text-center py-3 font-semibold text-lg">
            Your AI Chat Assistant
          </div>

          {/* Messages Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-2xl text-sm rounded-bl-none animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-3 border-t"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition disabled:bg-blue-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tools;

// import React from "react";

// const Tools = () => {
//   return (
//     <div className="min-h-[calc(100vh-54px-52px)] rounded-tl-lg bg-white">
//       <div className="mx-2 flex flex-col gap-4 rounded-lg px-4 items-center py-5 sm:px-6">
//         <div className="flex w-full flex-col items-center justify-center space-y-8 py-10">
//           <div className="w-full max-w-[845px]">
//             <div className="mb-9 flex flex-row">
//               <h1 className="font-quicksand text-4xl font-semibold text-azulRealEscuro">
//                 Hello, Sika Danquah!
//               </h1>
//             </div>
//             <div className="relative">
//               <div className="relative flex h-16 w-full items-center justify-between rounded-full border border-amarelo bg-white px-2 shadow-md">
//                 <div className="relative flex items-center w-full">
//                   <div className="relative flex items-center w-full rounded-lg border-0 px-4 font-quicksand text-sm font-semibold text-azulRealEscuro sm:text-base md:text-lg">
//                     <span
//                       className="sr-only"
//                       aria-live="polite"
//                       aria-atomic="false"
//                       aria-relevant="additions text"
//                       role="log"
//                     />
//                     <div className="relative w-full overflow-hidden inline-flex justify-center align-middle">
//                       <span className="relative block h-6">
//                         How can I assist you today?
//                       </span>
//                     </div>
//                     <input
//                       autoCapitalize="none"
//                       autoComplete="off"
//                       autoCorrect="off"
//                       id="react-select-5-input"
//                       spellCheck="false"
//                       tabIndex={0}
//                       type="text"
//                       aria-autocomplete="list"
//                       aria-expanded="false"
//                       aria-haspopup="true"
//                       role="combobox"
//                       aria-activedescendant=""
//                       aria-describedby="react-select-5-placeholder"
//                       className="w-full bg-transparent outline-none"
//                       style={{ padding: "0.5rem" }} // Adjust padding for better alignment
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center"
//                 >
//                   <img
//                     src=">"
//                     className="h-6"
//                     alt="send"
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex w-full flex-wrap gap-2 space-y-2 xl:-mx-2 xl:grid xl:grid-cols-2 xl:gap-3 xl:space-y-0 xl:px-2">
//           <button
//             type="button"
//             className="mx-2 flex h-fit w-full flex-row rounded-lg border border-[#d5e1ed] p-4 transition-colors duration-100 hover:bg-[#eff5fb] sm:items-center sm:justify-center md:p-4 lg:h-24"
//             fdprocessedid="h4csb"
//           >
//             <div className="mr-4 flex w-[30%] items-center justify-center sm:w-[10%]">
//               <img
//                 src=""
//                 alt="Study Plan"
//                 className="flex w-full max-w-10 items-center justify-center sm:size-full"
//               />
//             </div>
//             <div className="flex h-full w-[70%] flex-col justify-center text-left leading-5 sm:w-[90%]">
//               <div className="font-quicksand text-sm font-bold text-[#313d47] sm:text-base lg:line-clamp-1">
//                 Study Plan
//               </div>
//             </div>
//           </button>
//           <button
//             type="button"
//             className="mx-2 flex h-fit w-full flex-row rounded-lg border border-[#d5e1ed] p-4 transition-colors duration-100 hover:bg-[#eff5fb] sm:items-center sm:justify-center md:p-4 lg:h-24"
//             fdprocessedid="md25pb"
//           >
//             <div className="mr-4 flex w-[30%] items-center justify-center sm:w-[10%]">
//               <img
//                 src=""
//                 alt="Grammar Checker"
//                 className="flex w-full max-w-10 items-center justify-center sm:size-full"
//               />
//             </div>
//             <div className="flex h-full w-[70%] flex-col justify-center text-left leading-5 sm:w-[90%]">
//               <div className="font-quicksand text-sm font-bold text-[#313d47] sm:text-base lg:line-clamp-1">
//                 Grammar Checker
//               </div>
//             </div>
//           </button>
//           <button
//             type="button"
//             className="mx-2 flex h-fit w-full flex-row rounded-lg border border-[#d5e1ed] p-4 transition-colors duration-100 hover:bg-[#eff5fb] sm:items-center sm:justify-center md:p-4 lg:h-24"
//             fdprocessedid="1s8vbc"
//           >
//             <div className="mr-4 flex w-[30%] items-center justify-center sm:w-[10%]">
//               <img
//                 src=""
//                 alt="Text Summarizer"
//                 className="flex w-full max-w-10 items-center justify-center sm:size-full"
//               />
//             </div>
//             <div className="flex h-full w-[70%] flex-col justify-center text-left leading-5 sm:w-[90%]">
//               <div className="font-quicksand text-sm font-bold text-[#313d47] sm:text-base lg:line-clamp-1">
//                 Text Summarizer
//               </div>
//             </div>
//           </button>
//           <button
//             type="button"
//             className="mx-2 flex h-fit w-full flex-row rounded-lg border border-[#d5e1ed] p-4 transition-colors duration-100 hover:bg-[#eff5fb] sm:items-center sm:justify-center md:p-4 lg:h-24"
//             fdprocessedid="e4liac"
//           >
//             <div className="mr-4 flex w-[30%] items-center justify-center sm:w-[10%]">
//               <img
//                 src=""
//                 alt="Common Mistakes"
//                 className="flex w-full max-w-10 items-center justify-center sm:size-full"
//               />
//             </div>
//             <div className="flex h-full w-[70%] flex-col justify-center text-left leading-5 sm:w-[90%]">
//               <div className="font-quicksand text-sm font-bold text-[#313d47] sm:text-base lg:line-clamp-1">
//                 Common Mistakes
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tools;
