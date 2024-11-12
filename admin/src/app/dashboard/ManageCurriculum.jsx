// src/app/dashboard/manageCurriculum.jsx
import React, { useEffect, useState } from 'react';
import CurriculumList from './CurriculumList'; // Import the CurriculumList component

function ManageCurriculum() {
  const [curriculumData, setCurriculumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch('/api/curriculum'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurriculumData(data); // Set the fetched data
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    fetchCurriculumData();
  }, []);

  // Render loading or error state
  if (loading) {
    return <div>Loading...</div>; // Render a loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Render an error state
  }

  return (
    <div>
      <h1>Manage Curriculum</h1>
      <CurriculumList curriculumData={curriculumData} /> {/* Pass the data to CurriculumList */}
    </div>
  );
}

export default ManageCurriculum;
