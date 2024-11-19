import React, { useState } from "react";

const BulkOperations = () => {
  const [fileList, setFileList] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFileList(files);
    setFeedback({ type: "success", message: "Files uploaded successfully!" });
  };

  const handleExport = () => {
    setFeedback({ type: "success", message: "Export completed successfully!" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#9ea7bb] p-6 text-white">
          <h2 className="text-3xl font-bold text-center">Bulk Operations</h2>
          <p className="text-center mt-2 text-gray-100">
            Easily manage bulk imports and exports in your curriculum system.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Import Section */}
          <div className="bg-gray-50 shadow-md rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Import</h3>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              id="file-upload"
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition-all"
            >
              Upload Files
            </label>
            <div className="space-y-2">
              {fileList.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md shadow-sm text-sm text-gray-700"
                >
                  <span>{file.name}</span>
                  <span className="text-gray-400 text-xs">Uploaded</span>
                </div>
              ))}
            </div>
          </div>

          {/* Export Section */}
          <div className="bg-gray-50 shadow-md rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Export</h3>
            <button
              onClick={handleExport}
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div
            className={`py-3 px-4 text-center font-semibold transition-all ${
              feedback.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkOperations;
