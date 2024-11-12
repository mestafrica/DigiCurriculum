import React, { useState, useEffect } from 'react';
import { Select, SelectValue, SelectItem } from "@/components/ui/select"; // Adjusted imports
import Label from "@/components/ui/Label"; // Ensure this is a default import

function CurriculumList({ curriculumData = [] }) { // Default to empty array
  const [filteredData, setFilteredData] = useState(curriculumData);
  const [filters, setFilters] = useState({
    grade: '',
    strand: '',
    subStrand: '',
  });
  const [filterOption, setFilterOption] = useState(''); // New state for filter option

  useEffect(() => {
    const filterCurriculum = () => {
      let data = curriculumData;

      if (filters.grade) {
        data = data.filter(entry => entry.class === filters.grade);
      }
      if (filters.strand) {
        data = data.filter(entry => entry.strand === filters.strand);
      }
      if (filters.subStrand) {
        data = data.filter(entry => entry.subStrand === filters.subStrand);
      }

      setFilteredData(data);
    };

    filterCurriculum();
  }, [filters, curriculumData]);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row md:justify-end mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <Select onValueChange={(value) => setFilterOption(value)} className="w-full md:w-48">
          <SelectValue placeholder="Select Filter" />
          <SelectItem value="">None</SelectItem>
          <SelectItem value="grade">Grade</SelectItem>
          <SelectItem value="strand">Strand</SelectItem>
          <SelectItem value="subStrand">Sub-strand</SelectItem>
        </Select>
        <div className="flex items-center w-full md:w-auto">
          <Label htmlFor="filterValue" className="hidden md:block">{filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}</Label>
          <Select onValueChange={(value) => handleFilterChange(filterOption, value)} disabled={!filterOption} className="ml-2 w-full md:w-48">
            <SelectValue placeholder={`Select ${filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}`} />
            <SelectItem value="">All</SelectItem>
            {filterOption === 'grade' && (
              <>
                <SelectItem value="Class 1">Grade 1</SelectItem>
                <SelectItem value="Class 2">Grade 2</SelectItem>
                <SelectItem value="Class 3">Grade 3</SelectItem>
              </>
            )}
            {filterOption === 'strand' && (
              <>
                <SelectItem value="Strand A">Strand A</SelectItem>
                <SelectItem value="Strand B">Strand B</SelectItem>
              </>
            )}
            {filterOption === 'subStrand' && (
              <>
                <SelectItem value="Sub-strand A1">Sub-strand A1</SelectItem>
                <SelectItem value="Sub-strand B1">Sub-strand B1</SelectItem>
              </>
            )}
          </Select>
        </div>
      </div>

      {/* Curriculum List Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">Grade</th>
              <th className="px-4 py-2 border text-left">Strand</th>
              <th className="px-4 py-2 border text-left">Sub-strand</th>
              <th className="px-4 py-2 border text-left">Content Standards</th>
              <th className="px-4 py-2 border text-left">Learning Indicators</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-2 border">{entry.class}</td>
                  <td className="px-4 py-2 border">{entry.strand}</td>
                  <td className="px-4 py-2 border">{entry.subStrand}</td>
                  <td className="px-4 py-2 border">{entry.contentStandards}</td>
                  <td className="px-4 py-2 border">{entry.learningIndicators}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center border">No entries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurriculumList;
