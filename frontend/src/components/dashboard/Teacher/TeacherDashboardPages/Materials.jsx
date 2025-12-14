// dashboard/src/components/Teacher/TeacherDashboardPages/Materials.jsx
import React, { useEffect, useState } from "react";

const mockMaterials = [
  {
    id: "M-001",
    title: "Fraction Worksheets (Printable)",
    type: "Worksheet",
    subject: "Mathematics",
    size: "120 KB",
    uploadedAt: "2025-10-11",
  },
  {
    id: "M-002",
    title: "Photosynthesis Slide Deck",
    type: "Presentation",
    subject: "Biology",
    size: "2.1 MB",
    uploadedAt: "2025-10-15",
  },
  {
    id: "M-003",
    title: "Short Story Reading Pack",
    type: "Document",
    subject: "English",
    size: "640 KB",
    uploadedAt: "2025-10-21",
  },
];

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setMaterials(mockMaterials);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">My Materials</h2>
          <p className="text-sm text-muted-foreground">
            Upload and manage teaching resources for your lessons.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            id="upload-file"
            className="hidden"
            onChange={() => alert("Upload placeholder")}
          />
          <label
            htmlFor="upload-file"
            className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer"
          >
            Upload
          </label>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-200 rounded" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-sm">Title</th>
                <th className="text-left px-4 py-3 text-sm">Type</th>
                <th className="text-left px-4 py-3 text-sm">Subject</th>
                <th className="text-left px-4 py-3 text-sm">Size</th>
                <th className="text-left px-4 py-3 text-sm">Uploaded</th>
                <th className="text-right px-4 py-3 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="px-4 py-3 text-sm">{m.title}</td>
                  <td className="px-4 py-3 text-sm">{m.type}</td>
                  <td className="px-4 py-3 text-sm">{m.subject}</td>
                  <td className="px-4 py-3 text-sm">{m.size}</td>
                  <td className="px-4 py-3 text-sm">{m.uploadedAt}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-3 py-1 text-sm border rounded"
                        onClick={() => alert(`Download ${m.title}`)}
                      >
                        Download
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-primary text-white rounded"
                        onClick={() => alert(`Manage ${m.title}`)}
                      >
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {materials.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No materials uploaded yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Materials;
