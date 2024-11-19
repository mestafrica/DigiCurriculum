import React, { useEffect, useState } from "react";
import CurriculumList from "./CurriculumList"; // Import your CurriculumList component

function ManageCurriculum() {
  const [curriculumData, setCurriculumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/curriculum"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("");
        }

        const data = await response.json();
        setCurriculumData(data); // Save the fetched data
      } catch (error) {
        setError(error.message); // Set the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCurriculumData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="text-gray-700 font-semibold">Loading curriculum data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-red-500 text-xl font-bold">Error</h2>
          <p className="text-gray-700 mt-4">
            Unable to load curriculum data. {error}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please check your connection or contact support if the issue persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white">
          <h1 className="text-3xl font-bold text-center">Manage Curriculum</h1>
          <p className="text-center mt-2 text-gray-100">
            View and manage all curriculum data.
          </p>
        </div>
      </div>

      {/* Curriculum List */}
      <div className="bg-gray-50 shadow-md rounded-xl p-6">
        <CurriculumList curriculumData={curriculumData} />
      </div>
    </div>
  );
}

export default ManageCurriculum;
