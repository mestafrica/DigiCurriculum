import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { apiGetCurriculum, apiDeleteCurriculum } from "@/services/admin";

// React Icons
import { FaPlus, FaEye, FaEdit, FaTrash, FaFileExport } from "react-icons/fa";

function CurriculumList() {
  const [curriculumData, setCurriculumData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGetCurriculum();
        setCurriculumData(data.curriculums);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to load curriculum data.");
        console.error("Error fetching curriculum data:", error);
      }
    };

    fetchData();
  }, []);

  const handleView = (curriculumId) => {
    navigate(`/admin-dashboard/curriculum/${curriculumId}`);
  };

  const handleEdit = (curriculumId) => {
    navigate(`/admin-dashboard/edit-curriculum/${curriculumId}`);
  };

  const handleDeleteClick = (curriculumId) => {
    setSelectedCurriculumId(curriculumId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiDeleteCurriculum(selectedCurriculumId);
      setCurriculumData((prev) =>
        prev.filter((item) => item.id !== selectedCurriculumId)
      );
      setShowModal(false);
      toast.success("Curriculum deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete curriculum.");
      console.error("Error deleting curriculum:", error);
    }
  };

  const handleExport = () => {
    toast.info("Export functionality is not implemented yet.");
  };

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />

      {/* Banner Section */}
      <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">Curriculum List</h1>
          <p className="text-gray-600">Manage your curriculums effectively.</p>
        </div>
        <button
          className="flex items-center bg-blue-500 text-white p-3 rounded-full shadow hover:bg-blue-600 transition"
          onClick={() => navigate("/admin-dashboard/addcurriculum")}
        >
          <FaPlus className="text-lg" />
        </button>
      </div>

      {/* Curriculum Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        {isLoading ? (
          <Skeleton height={200} />
        ) : (
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="px-4 py-3 border-b text-left font-semibold">Grade</th>
                <th className="px-4 py-3 border-b text-left font-semibold">Name</th>
                <th className="px-4 py-3 border-b text-left font-semibold">View</th>
                <th className="px-4 py-3 border-b text-left font-semibold">Edit</th>
                <th className="px-4 py-3 border-b text-left font-semibold">Delete</th>
                <th className="px-4 py-3 border-b text-left font-semibold">Export</th>
              </tr>
            </thead>
            <tbody>
              {curriculumData.length > 0 ? (
                curriculumData.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-3 border-b">{entry.grade}</td>
                    <td className="px-4 py-3 border-b">{entry.name}</td>
                    <td className="px-4 py-3 border-b">
                      <button
                        className="p-2 text-green-600 rounded hover:bg-green-100 transition"
                        onClick={() => handleView(entry.grade)}
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <button
                        className="p-2 text-yellow-600 rounded hover:bg-yellow-100 transition"
                        onClick={() => handleEdit(entry.grade)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <button
                        className="p-2 text-red-600 rounded hover:bg-red-100 transition"
                        onClick={() => handleDeleteClick(entry.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <button
                        className="p-2 text-blue-600 rounded hover:bg-blue-100 transition"
                        onClick={handleExport}
                      >
                        <FaFileExport />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No entries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Curriculum</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this curriculum? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurriculumList;
