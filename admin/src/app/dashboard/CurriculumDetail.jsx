import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetCurriculumDetails, apiDeleteCurriculum } from "@/services/admin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function CurriculumDetail() {
  const { curriculumId } = useParams();
  const [curriculumDetail, setCurriculumDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurriculumDetail = async () => {
      try {
        setLoading(true);
        const data = await apiGetCurriculumDetails(curriculumId);
        setCurriculumDetail(data.data.curriculums[0]);
        toast.success("Curriculum details loaded successfully.");
      } catch (error) {
        setError("Failed to fetch curriculum details.");
        toast.error("Failed to fetch curriculum details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculumDetail();
  }, [curriculumId]);

  const handleDelete = async () => {
    try {
      await apiDeleteCurriculum(curriculumId);
      toast.success("Curriculum deleted successfully.");
      setDeleteModalOpen(false);
      navigate("/admin-dashboard/curriculum-list");
    } catch (error) {
      toast.error("Failed to delete curriculum.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-6 w-3/4 bg-gray-300 rounded mt-4"></div>
            <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white border border-red-200 p-6 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-red-500 text-xl font-bold">Error</h2>
          <p className="text-gray-700 mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8  min-h-screen">
      {/* Modal for delete confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm text-center">
            <h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this curriculum?
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Details Card */}
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-105">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {curriculumDetail?.name}
              </h1>
              <p className="text-gray-600 text-sm mt-2">Code: {curriculumDetail?.code}</p>
              <p className="text-gray-600 text-sm">Grade: {curriculumDetail?.grade}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/admin-dashboard/curriculum/edit/${curriculumId}`)}
                className="bg-blue-500 p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                title="Edit Curriculum"
              >
                <FaEdit className="text-white" />
              </button>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="bg-red-500 p-3 rounded-full shadow-md hover:bg-red-600 transition duration-300"
                title="Delete Curriculum"
              >
                <FaTrashAlt className="text-white" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {curriculumDetail?.strands.map((strand) => (
              <div key={strand.code} className="py-4">
                <h2 className="text-lg font-semibold text-gray-800">{strand.name}</h2>
                <div className="ml-4 mt-2">
                  {strand.subStrand.map((sub) => (
                    <div
                      key={sub.code}
                      className="bg-gray-50 p-4 rounded-lg shadow-md mt-4 hover:shadow-lg transition duration-300"
                    >
                      <p className="text-gray-700 font-medium">{sub.title}</p>
                      <ul className="list-disc list-inside mt-2 text-gray-600">
                        {sub.learningIndicators.map((indicator, idx) => (
                          <li key={idx}>{indicator}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurriculumDetail;
