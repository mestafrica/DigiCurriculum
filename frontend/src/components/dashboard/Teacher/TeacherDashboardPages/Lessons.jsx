// dashboard/src/components/Teacher/TeacherDashboardPages/Lessons.jsx
import React, { useEffect, useState } from "react";

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
  {
    id: "L-003",
    title: "Short Story Elements",
    subject: "English",
    grade: "Grade 5",
    description: "Exploring plot, character, setting, and theme.",
    createdAt: "2025-10-20",
  },
];

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    // Simulate fetch
    const t = setTimeout(() => {
      setLessons(mockLessons);
      setLoading(false);
    }, 650);
    return () => clearTimeout(t);
  }, []);

  const filtered = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(q.toLowerCase()) ||
      l.subject.toLowerCase().includes(q.toLowerCase()) ||
      l.grade.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">My Lessons</h2>
          <p className="text-sm text-muted-foreground">
            Manage your lesson plans and quick previews.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lessons by title, subject or grade"
            className="w-full md:w-80 border rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-200 outline-none"
          />
          <button
            className="hidden md:inline-block bg-primary text-white px-4 py-2 rounded-md"
            onClick={() => {
              // placeholder: create new lesson flow
              alert("Create lesson - placeholder");
            }}
          >
            New Lesson
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-6 bg-gray-200 rounded mb-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="h-32 bg-gray-200 rounded" />
              <div className="h-32 bg-gray-200 rounded" />
              <div className="h-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No lessons found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filtered.map((lesson) => (
                <article
                  key={lesson.id}
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{lesson.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {lesson.subject} • {lesson.grade}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500">{lesson.createdAt}</div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                    {lesson.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-zinc-500">ID: {lesson.id}</div>
                    <div className="flex gap-2">
                      <button
                        className="text-sm px-3 py-1 rounded-md border"
                        onClick={() => alert(`Preview ${lesson.title}`)}
                      >
                        Preview
                      </button>
                      <button
                        className="text-sm px-3 py-1 rounded-md bg-primary text-white"
                        onClick={() => alert(`Edit ${lesson.title}`)}
                      >
                        Edit
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
