// dashboard/src/components/Teacher/TeacherDashboardPages/Readytouse.jsx
import React, { useEffect, useState } from "react";

const mockTemplates = [
  {
    id: "T-001",
    title: "Weekly Lesson Template",
    description: "A reusable weekly plan template for classroom lessons.",
    category: "Planner",
  },
  {
    id: "T-002",
    title: "Student Assessment Sheet",
    description: "A ready-to-use assessment template for formative checks.",
    category: "Assessment",
  },
  {
    id: "T-003",
    title: "Classroom Activity Ideas",
    description: "Short activities to engage learners during lessons.",
    category: "Activities",
  },
];

const Readytouse = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(mockTemplates);
      setLoading(false);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Ready to Use</h2>
          <p className="text-sm text-muted-foreground">
            Templates and quick resources you can drop into lessons.
          </p>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => alert("Add template - placeholder")}
          >
            Add Template
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-200 rounded" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div
              key={it.id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{it.title}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {it.category}
                  </div>
                </div>
                <div className="text-xs text-zinc-500">ID: {it.id}</div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{it.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  className="px-3 py-1 border rounded text-sm"
                  onClick={() => alert(`Preview ${it.title}`)}
                >
                  Preview
                </button>
                <button
                  className="px-3 py-1 bg-primary text-white rounded text-sm"
                  onClick={() => alert(`Use ${it.title}`)}
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Readytouse;
