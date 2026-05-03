import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaMoon, FaSun, FaArrowRight, FaThumbsUp, FaThumbsDown, FaEdit, FaTwitter, FaFacebook, FaYoutube, FaGithub, FaVolumeUp, FaPrint, FaDownload, FaImage, FaFileAlt, FaTimes, FaPaperclip } from "react-icons/fa";
import aiService from "../services/aiService";

export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState("ask"); // ask, lesson, assessment
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const printRef = useRef(null);

  // Curriculum Data State
  const [curricula, setCurricula] = useState([]);
  const [isLoadingCurricula, setIsLoadingCurricula] = useState(true);
  const [selectedCurriculumIndex, setSelectedCurriculumIndex] = useState(0);
  const [selectedStrandIndex, setSelectedStrandIndex] = useState(0);
  
  // Ingestion State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Attached File State
  const [attachedFile, setAttachedFile] = useState(null);
  const [attachedFileType, setAttachedFileType] = useState(null); // 'image' or 'doc'
  const [previewUrl, setPreviewUrl] = useState(null);
  const imageInputRef = useRef(null);
  const docInputRef = useRef(null);

  const tabs = [
    { id: "ask", label: "Ask AI", icon: "🤖" },
    { id: "lesson", label: "Lesson Planner", icon: "📝" },
    { id: "assessment", label: "Assessment Generator", icon: "📊" },
  ];

  // Fetch curricula on mount
  useEffect(() => {
    const fetchCurricula = async () => {
      try {
        setIsLoadingCurricula(true);
        const data = await aiService.getCurricula();
        // The backend returns { message, curriculums, pagination }
        setCurricula(data.curriculums || []);
      } catch (err) {
        console.error("Failed to fetch curricula:", err);
        setError("Could not load curriculum data. Please try again later.");
      } finally {
        setIsLoadingCurricula(false);
      }
    };
    fetchCurricula();
  }, []);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const content = printRef.current.innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>DigiCurriculum - Document</title>
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
            h1 { color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px; margin-top: 0; }
            h2 { color: #1f2937; margin-top: 25px; border-left: 4px solid #10b981; padding-left: 10px; }
            .section { margin-bottom: 30px; page-break-inside: avoid; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
            th { background-color: #f9fafb; font-weight: 600; }
            .badge { display: inline-block; padding: 2px 8px; background: #ecfdf5; color: #065f46; border-radius: 9999px; font-size: 12px; font-weight: 600; }
            @media print {
              button { display: none; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
            <div style="font-size: 20px; font-weight: bold; color: #059669;">DigiCurriculum AI</div>
            <div style="font-size: 11px; color: #9ca3af;">Generated on ${new Date().toLocaleDateString()}</div>
          </div>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    setUploadMessage("AI is analyzing and ingesting curriculum...");
    setError(null);
    
    try {
      const result = await aiService.ingestCurriculum(formData);
      setUploadMessage(`Successfully ingested ${result.curriculum.name}!`);
      
      // Refresh list
      const data = await aiService.getCurricula();
      setCurricula(data.curriculums || []);
      
      // Clear after 3 seconds
      setTimeout(() => setUploadMessage(null), 5000);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(typeof err === 'string' ? err : err.error || "Failed to ingest curriculum.");
      setUploadMessage(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setAttachedFile(file);
      setAttachedFileType('image');
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleDocSelect = (event) => {
    const file = event.target.files[0];
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (file && validTypes.includes(file.type)) {
      setAttachedFile(file);
      setAttachedFileType('doc');
      setPreviewUrl(null);
      setError(null);
    } else {
      setError("Please select a valid document (PDF, DOCX).");
    }
  };

  const clearAttachedFile = () => {
    setAttachedFile(null);
    setAttachedFileType(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (docInputRef.current) docInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!inputText.trim() && !attachedFile) return;
    
    setIsGenerating(true);
    setError(null);
    setOutputText("");

    const curriculum = curricula[selectedCurriculumIndex];
    if (!curriculum) {
      setError("Please select a curriculum first.");
      setIsGenerating(false);
      return;
    }

    try {
      let result;
      if (activeTab === "ask") {
        let query = inputText;
        if (attachedFile) {
          query += ` [Attached ${attachedFileType}: ${attachedFile.name}]`;
        }
        const data = await aiService.askAI(query, curriculum.grade);
        setOutputText(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      } else if (activeTab === "lesson") {
        const lessonPlanData = {
          name: curriculum.name,
          code: curriculum.code,
          grade: curriculum.grade,
          strands: curriculum.strands[selectedStrandIndex]?.name,
          title: inputText || (attachedFile ? `Lesson based on ${attachedFile.name}` : "New Lesson"),
          duration: 60,
          objectives: ["Understand the core concepts of " + (inputText || "the attached material")]
        };
        const data = await aiService.generateLessonPlan(lessonPlanData);
        setOutputText(JSON.stringify(data.lessonPlan || data, null, 2));
      } else if (activeTab === "assessment") {
        const assessmentData = {
          grade: curriculum.grade,
          name: curriculum.name,
          strandName: curriculum.strands[selectedStrandIndex]?.name,
          assessmentType: "Quiz",
          numberOfQuestions: 5,
          difficultyLevel: "Medium",
          questionType: "Multiple Choice"
        };
        const data = await aiService.generateAssessment(assessmentData);
        setOutputText(JSON.stringify(data.assessment || data, null, 2));
      }
    } catch (err) {
      console.error("Generation failed:", err);
      setError(err.message || "Something went wrong while generating content.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? "bg-gray-900 text-white" : "bg-[#f8f9fa] text-gray-800"}`}>
      {/* Top Navbar */}
      <nav className="flex justify-between items-center py-4 px-6 md:px-12">
        <div className="w-10"></div> {/* Spacer for centering */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-green-600 text-white p-1 rounded">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <span className="font-bold text-2xl tracking-tight">DigiCurriculum AI</span>
        </Link>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-yellow-400" : "bg-white text-gray-600 shadow-sm"} transition`}
        >
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
        <div className="ml-4">
        </div>
      </nav>

      {/* Header */}
      <div className="text-center mt-6 mb-8 px-4">
        {uploadMessage && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold animate-bounce inline-block">
            ✨ {uploadMessage}
          </div>
        )}
        <h1 className="text-lg md:text-xl font-medium text-gray-500">
          AI-Powered Curriculum Assistance, Lesson Planning and Assessments
        </h1>
      </div>

      {/* Main Interface Card */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className={`rounded-xl shadow-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          
          {/* Tabs */}
          <div className={`flex flex-wrap border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dual Panel Workspace */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4 relative">
              
              {/* Left Panel (Input) */}
              <div className={`flex-1 rounded-lg border flex flex-col ${isDarkMode ? "border-gray-600 bg-gray-900" : "border-gray-200 bg-white"}`}>
                <div className={`px-4 py-3 border-b flex flex-col md:flex-row gap-3 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                  <select 
                    value={selectedCurriculumIndex}
                    onChange={(e) => {
                      setSelectedCurriculumIndex(parseInt(e.target.value));
                      setSelectedStrandIndex(0); // Reset strand
                    }}
                    className={`bg-transparent font-medium outline-none cursor-pointer text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                  >
                    {isLoadingCurricula ? (
                      <option>Loading...</option>
                    ) : curricula.length > 0 ? (
                      curricula.map((c, i) => (
                        <option key={c._id} value={i} className={isDarkMode ? "bg-gray-800" : "bg-white"}>
                          Grade {c.grade} - {c.name}
                        </option>
                      ))
                    ) : (
                      <option>No Curricula Found</option>
                    )}
                  </select>

                  {curricula[selectedCurriculumIndex]?.strands && (
                    <select 
                      value={selectedStrandIndex}
                      onChange={(e) => setSelectedStrandIndex(parseInt(e.target.value))}
                      className={`bg-transparent font-medium outline-none cursor-pointer text-sm border-l pl-3 ${isDarkMode ? "text-gray-200 border-gray-600" : "text-gray-700 border-gray-200"}`}
                    >
                      {curricula[selectedCurriculumIndex].strands.map((s, i) => (
                        <option key={s._id || i} value={i}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="relative flex-grow">
                  {error && (
                    <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-600 p-2 text-xs text-center z-10">
                      {error}
                    </div>
                  )}
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      activeTab === "ask" ? "Ask a question about the curriculum (e.g. What are the key indicators for Algebra?)..." :
                      activeTab === "lesson" ? "Describe the specific lesson topic (e.g. Introduction to Linear Equations)..." :
                      "Describe the focus of your assessment (e.g. Final quiz on quadratic equations)..."
                    }
                    className={`w-full h-80 p-4 outline-none resize-none bg-transparent ${isDarkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                    {inputText.length} / 2000
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-4">
                  {/* File Preview Area */}
                  {attachedFile && (
                    <div className={`flex items-center gap-3 p-2 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-blue-50 border-blue-100"}`}>
                      {attachedFileType === 'image' ? (
                        <div className="relative w-12 h-12 rounded overflow-hidden border border-gray-300">
                          <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                          <FaFileAlt size={20} />
                        </div>
                      )}
                      <div className="flex-grow min-w-0">
                        <p className={`text-xs font-bold truncate ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{attachedFile.name}</p>
                        <p className="text-[10px] text-gray-500">{(attachedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button 
                        onClick={clearAttachedFile}
                        className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <input 
                        type="file" 
                        ref={imageInputRef} 
                        onChange={handleImageSelect} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <input 
                        type="file" 
                        ref={docInputRef} 
                        onChange={handleDocSelect} 
                        accept=".pdf,.docx,.doc" 
                        className="hidden" 
                      />
                      <button 
                        onClick={() => imageInputRef.current.click()}
                        className={`p-2 rounded-lg transition ${isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
                        title="Attach Image"
                      >
                        <FaImage size={18} />
                      </button>
                      <button 
                        onClick={() => docInputRef.current.click()}
                        className={`p-2 rounded-lg transition ${isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
                        title="Attach Document"
                      >
                        <FaFileAlt size={18} />
                      </button>
                    </div>
                    <button
                      onClick={handleGenerate}
                      disabled={(!inputText.trim() && !attachedFile) || isGenerating || curricula.length === 0}
                      className={`px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all ${
                        (inputText.trim() || attachedFile) && !isGenerating && curricula.length > 0
                          ? "bg-[#A9DEF9] hover:bg-[#8CCDF0] text-gray-800 shadow-md transform hover:scale-105"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isGenerating ? "GENERATING..." : "GENERATE"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Divider / Exchange Icon */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white shadow-lg border-4 border-white cursor-pointer hover:bg-yellow-600 transition">
                <FaArrowRight size={14} />
              </div>

              {/* Right Panel (Output) */}
              <div className={`flex-1 rounded-lg border flex flex-col ${isDarkMode ? "border-gray-600 bg-gray-900" : "border-gray-200 bg-gray-50"}`}>
                <div className={`px-4 py-3 border-b flex justify-between items-center ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                  <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                    AI Result
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrint}
                      disabled={!outputText}
                      className={`p-1.5 rounded transition ${isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-200 text-gray-600"} ${!outputText && "opacity-50 cursor-not-allowed"}`}
                      title="Print Document"
                    >
                      <FaPrint size={14} />
                    </button>
                    <select className={`bg-transparent font-medium outline-none cursor-pointer text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                      <option>Document View</option>
                      <option>Raw JSON</option>
                    </select>
                  </div>
                </div>
                <div className="relative flex-grow overflow-auto max-h-[500px]" ref={printRef}>
                  {!outputText && !isGenerating ? (
                    <div className={`flex flex-col items-center justify-center h-full p-8 text-center ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>
                      <div className="mb-4 opacity-20">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">Your AI-generated content will appear here.</p>
                      <p className="text-xs mt-1">Select a tab and provide details to begin.</p>
                    </div>
                  ) : isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 animate-pulse">
                      <div className={`w-8 h-8 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin mb-4`}></div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Gemini is crafting your content...</p>
                    </div>
                  ) : (
                    <div className={`p-6 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                      <ResultRenderer 
                        content={outputText} 
                        type={activeTab} 
                        isDarkMode={isDarkMode} 
                      />
                    </div>
                  )}
                  {outputText && !isGenerating && (
                    <button className="absolute bottom-4 right-4 p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition shadow-lg">
                      <FaVolumeUp size={14} />
                    </button>
                  )}
                </div>
                <div className="p-4 flex items-center justify-between border-t border-transparent bg-opacity-50">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>Quality Check:</span>
                    <button className="p-1.5 rounded bg-gray-100 hover:bg-green-100 hover:text-green-600 transition" title="Looks Good"><FaThumbsUp size={12} /></button>
                    <button className="p-1.5 rounded bg-gray-100 hover:bg-red-100 hover:text-red-600 transition" title="Needs Improvement"><FaThumbsDown size={12} /></button>
                    <button className="p-1.5 rounded bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition" title="Edit Result"><FaEdit size={12} /></button>
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Under-card text */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Empower your educational journey with DigiCurriculum's AI-driven insights and interactive planning tools.
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8 text-center text-sm text-gray-500 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition"><FaTwitter size={14} /></a>
          <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition"><FaFacebook size={14} /></a>
          <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition"><FaYoutube size={14} /></a>
          <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition"><FaGithub size={14} /></a>
        </div>
        <div>
          © {new Date().getFullYear()} Copyright: <span className="font-semibold text-gray-700">LitmusTest</span>
        </div>
        <Link to="/" className="flex items-center gap-2">
          Powered by <span className="px-2 py-1 rounded bg-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-300 transition">LitmusTest ↗</span>
        </Link>
      </footer>
    </div>
  );
}

/**
 * Rich Text Renderer for AI Responses
 */
const ResultRenderer = ({ content, type, isDarkMode }) => {
  if (!content) return null;

  let data;
  let isJson = false;
  try {
    if (typeof content === 'string' && (content.trim().startsWith('{') || content.trim().startsWith('['))) {
      data = JSON.parse(content);
      isJson = true;
    } else {
      data = content;
    }
  } catch (e) {
    data = content;
  }

  // --- LESSON PLAN RENDERER ---
  if (type === 'lesson' && isJson && typeof data === 'object') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="border-b-2 border-green-600 pb-4">
          <h1 className="text-3xl font-black tracking-tight text-green-600">{data.title || "Lesson Plan"}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm font-bold uppercase tracking-widest text-gray-500">
            <span className="flex items-center gap-1"><span className="text-green-600">Grade:</span> {data.grade || "N/A"}</span>
            <span className="flex items-center gap-1"><span className="text-green-600">Duration:</span> {data.duration || "60"} mins</span>
            <span className="flex items-center gap-1"><span className="text-green-600">Code:</span> {data.code || "N/A"}</span>
          </div>
        </header>

        <section className="bg-green-50 bg-opacity-30 p-6 rounded-2xl border border-green-100">
          <h2 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
            🎯 Learning Objectives
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-green-900">
            {Array.isArray(data.objectives) ? data.objectives.map((obj, i) => (
              <li key={i} className="font-medium">{obj}</li>
            )) : <li className="font-medium">{data.objectives}</li>}
          </ul>
        </section>

        {data.materials && (
          <section>
            <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 mb-4">Required Materials</h2>
            <div className="flex flex-wrap gap-2">
              {data.materials?.map((item, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm font-bold text-gray-600 border border-gray-200">
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 mb-4">Lesson Procedure</h2>
          <div className="space-y-4">
            {data.procedure?.map((step, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs shadow-lg group-hover:scale-110 transition">
                  {i + 1}
                </div>
                <div className="flex-grow pt-1">
                  <div className="flex justify-between items-start">
                    <p className={`font-bold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{step.description}</p>
                    <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded uppercase tracking-tighter text-gray-400">
                      {step.duration} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {data.assessment && (
          <section className="p-6 rounded-2xl border-2 border-dashed border-gray-200">
            <h2 className="text-xl font-bold mb-3">Checking for Understanding</h2>
            <p className="text-gray-500 italic">"{data.assessment}"</p>
          </section>
        )}

        {data.standards && (
          <section className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              📚 Curriculum Standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.standards?.map((std, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{std.code}</span>
                  <p className="text-xs mt-1 text-gray-300 leading-relaxed">{std.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // --- ASSESSMENT / QUIZ RENDERER ---
  if (type === 'assessment' && isJson && Array.isArray(data)) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="text-center pb-8 border-b border-gray-100">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Knowledge Check</h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Student Assessment Material</p>
        </header>

        <div className="space-y-12">
          {data.map((q, i) => (
            <div key={i} className={`relative p-8 rounded-3xl border border-gray-100 transition-colors shadow-sm ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
              <span className="absolute -top-4 -left-4 w-10 h-10 bg-black text-white rounded-2xl flex items-center justify-center font-bold shadow-xl">
                {i + 1}
              </span>
              <h3 className={`text-lg font-bold mb-6 leading-snug ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>{q.question}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options?.map((opt, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border transition cursor-default flex items-center gap-3 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-gray-50 border-gray-50 text-gray-700 hover:bg-green-50 hover:border-green-100"}`}>
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </div>
                ))}
              </div>

              <details className="mt-8 group">
                <summary className="list-none cursor-pointer flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-600 hover:text-green-700 transition">
                  <span className="group-open:rotate-180 transition-transform inline-block">▼</span>
                  View Answer Key & Explanation
                </summary>
                <div className={`mt-4 p-5 rounded-2xl border animate-in fade-in slide-in-from-top-2 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-green-50 border-green-100"}`}>
                  <p className={`text-sm font-bold mb-1 ${isDarkMode ? "text-green-400" : "text-green-800"}`}>Correct Answer: {q.answer}</p>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? "text-gray-400" : "text-green-700"}`}>{q.explanation}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- DEFAULT TEXT / MARKDOWN RENDERER ---
  return (
    <div className={`prose prose-sm max-w-none ${isDarkMode ? "prose-invert" : ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
      </ReactMarkdown>
    </div>
  );
};
