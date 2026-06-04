import React, { useEffect, useState } from "react";
import aiService from "../../../../services/aiService";
import ReactMarkdown from "react-markdown";

const mockLessons = [
  {
    id: "L-001",
    title: "Introduction to Fractions",
    subject: "Mathematics",
    grade: "Grade 4",
    description: "Core concepts of fractions, representation and comparing fractions.",
    createdAt: "2025-10-10",
  },
  {
    id: "L-002",
    title: "Photosynthesis Overview",
    subject: "Biology",
    grade: "Grade 6",
    description: "Light-dependent reactions and plant energy flow.",
    createdAt: "2025-10-14",
  },
];

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  
  // Generator State
  const [showGenerator, setShowGenerator] = useState(false);
  const [curricula, setCurricula] = useState([]);
  const [loadingCurricula, setLoadingCurricula] = useState(false);
  const [selectedCurriculumIndex, setSelectedCurriculumIndex] = useState("");
  const [selectedStrandIndex, setSelectedStrandIndex] = useState(0);
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetch existing lessons
    const t = setTimeout(() => {
      setLessons(mockLessons);
      setLoading(false);
    }, 650);
    return () => clearTimeout(t);
  }, []);

  const handleOpenGenerator = async () => {
    setShowGenerator(true);
    setGeneratedPlan(null);
    if (curricula.length === 0) {
      setLoadingCurricula(true);
      try {
        const data = await aiService.getCurricula();
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (Array.isArray(data?.curriculums)) list = data.curriculums;
        else if (Array.isArray(data?.data)) list = data.data;
        setCurricula(list);
      } catch (err) {
        console.error("Failed to load curricula", err);
      } finally {
        setLoadingCurricula(false);
      }
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (selectedCurriculumIndex === "" || !topic.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedPlan(null);

    const curriculum = curricula[selectedCurriculumIndex];
    const data = {
      name: curriculum.name,
      code: curriculum.code,
      grade: curriculum.grade,
      strands: curriculum.strands?.[selectedStrandIndex]?.name || "",
      title: topic,
      duration: 60,
      objectives: ["Understand " + topic]
    };

    try {
      const response = await aiService.generateLessonPlan(data);
      setGeneratedPlan(response.lessonPlan || response);
    } catch (err) {
      setError(err.message || "Failed to generate lesson plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const filtered = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(q.toLowerCase()) ||
      l.subject.toLowerCase().includes(q.toLowerCase()) ||
      l.grade.toLowerCase().includes(q.toLowerCase())
  );

  if (showGenerator) {
    return (
      <div className="p-6 md:p-8 animate-fade-in w-full max-w-5xl mx-auto">
        <button 
          onClick={() => setShowGenerator(false)}
          className="mb-6 flex items-center text-gray-600 hover:text-primary transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Lessons
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Plan Generator</h2>
          <p className="text-gray-500 mb-8">Fill in the details below to generate a comprehensive AI-powered lesson plan.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl flex items-center">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject / Curriculum</label>
                <select 
                  value={selectedCurriculumIndex}
                  onChange={(e) => {
                    setSelectedCurriculumIndex(e.target.value);
                    setSelectedStrandIndex(0);
                  }}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  disabled={loadingCurricula || isGenerating}
                  required
                >
                  <option value="">{loadingCurricula ? "Loading curricula..." : "-- Select Subject --"}</option>
                  {curricula.map((c, i) => (
                    <option key={i} value={i}>{c.name}</option>
                  ))}
                </select>
              </div>

              {selectedCurriculumIndex !== "" && curricula[selectedCurriculumIndex]?.strands?.length > 0 && (
                <div>

                  <select 
                    value={selectedStrandIndex}
                    onChange={(e) => setSelectedStrandIndex(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    disabled={isGenerating}
                  >
                    {curricula[selectedCurriculumIndex].strands.map((s, i) => (
                      <option key={i} value={i}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Lesson Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Introduction to Linear Equations"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                disabled={isGenerating}
                required
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isGenerating || selectedCurriculumIndex === "" || !topic.trim()}
                className={`flex items-center px-8 py-3 rounded-xl font-bold text-white transition-all transform ${
                  isGenerating || selectedCurriculumIndex === "" || !topic.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 hover:scale-[1.02] shadow-md"
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Lesson Plan"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {generatedPlan && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden animate-fade-in slide-in-from-bottom-4">
            <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex justify-between items-center">
              <h3 className="font-bold text-green-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Plan Generated Successfully
              </h3>
              <button 
                onClick={() => {
                  setLessons([{
                    id: `L-NEW-${Date.now()}`,
                    title: topic,
                    subject: curricula[selectedCurriculumIndex]?.name || "Custom",
                    grade: curricula[selectedCurriculumIndex]?.grade || "-",
                    description: "AI Generated Lesson Plan",
                    createdAt: new Date().toISOString().split('T')[0]
                  }, ...lessons]);
                  setShowGenerator(false);
                }}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Save to My Lessons
              </button>
            </div>
            <div className="p-6 md:p-8 prose max-w-none">
              {typeof generatedPlan === 'string' ? (
                <ReactMarkdown>{generatedPlan}</ReactMarkdown>
              ) : (
                <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {JSON.stringify(generatedPlan, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Lessons</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your lesson plans and generate new ones with AI.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search lessons..."
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition shadow-sm"
            />
          </div>
          <button
            className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2 rounded-xl transition shadow-sm"
            onClick={handleOpenGenerator}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            New Lesson
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded-lg w-1/4 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-200 rounded-2xl" />)}
            </div>
          </div>
        </div>
      ) : (
        <>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">No lessons found</h3>
              <p className="text-gray-500 mt-1 max-w-sm">We couldn't find any lessons matching your search. Try different keywords or generate a new one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((lesson) => (
                <article
                  key={lesson.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md mb-2">
                        {lesson.subject}
                      </span>
                      <h3 className="font-bold text-lg text-gray-800 leading-tight">{lesson.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-grow">
                    {lesson.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="text-xs font-medium text-gray-400">{lesson.createdAt}</div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition" title="Preview">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Lessons;
