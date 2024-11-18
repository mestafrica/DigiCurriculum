import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetCurriculumDetails, apiUpdateCurriculum } from "@/services/admin"; // Import API services
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCurriculum() {
  const { curriculumId } = useParams(); // Get curriculum ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    grade: "",
    code: "",
    learningIndicators: "",
    contentStandards: "",
    strandCode: "",
    strandName: "",
    subStrandCode: "",
    subStrandTitle: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch existing curriculum details
    const fetchCurriculumDetails = async () => {
      try {
        setLoading(true);
        const data = await apiGetCurriculumDetails(curriculumId);
        console.log(data)
        setFormData({
          grade: data.data.curriculums[0].grade,
          code: data.data.curriculums[0].code,
          learningIndicators: data.data.curriculums[0].learningIndicators,
          contentStandards: data.data.curriculums[0].contentStandards,
          strandCode: data.data.curriculums[0].strandCode,
          strandName: data.strandName,
          subStrandCode: data.subStrandCode,
          subStrandTitle: data.subStrandTitle,
        });
        toast.success("Curriculum details loaded successfully.");
      } catch (err) {
        setError("Failed to load curriculum details.");
        toast.error("Failed to load curriculum details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculumDetails();
  }, [curriculumId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiUpdateCurriculum(curriculumId, formData); 
      toast.success("Curriculum updated successfully.");
      navigate(`admin-dashboard/curriculum/${curriculumId}`); 
    } catch (err) {
      toast.error("Failed to update curriculum.");
      console.error("Error updating curriculum:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="text-gray-700 font-semibold">Loading curriculum details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-red-500 text-xl font-bold">Error</h2>
          <p className="text-gray-700 mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Edit Curriculum</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        {/* Grade */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Grade</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Code */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Learning Indicators */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Learning Indicators</label>
          <textarea
            name="learningIndicators"
            value={formData.learningIndicators}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Content Standards */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Content Standards</label>
          <textarea
            name="contentStandards"
            value={formData.contentStandards}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Strand Code */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Strand Code</label>
          <input
            type="text"
            name="strandCode"
            value={formData.strandCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Strand Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Strand Name</label>
          <input
            type="text"
            name="strandName"
            value={formData.strandName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Sub-Strand Code */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Sub-Strand Code</label>
          <input
            type="text"
            name="subStrandCode"
            value={formData.subStrandCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Sub-Strand Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Sub-Strand Title</label>
          <input
            type="text"
            name="subStrandTitle"
            value={formData.subStrandTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Update Curriculum
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCurriculum;
