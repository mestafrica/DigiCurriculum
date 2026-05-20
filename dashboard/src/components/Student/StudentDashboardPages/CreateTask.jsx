import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [subjectTag, setSubjectTag] = useState("");
  const [status, setStatus] = useState("upcoming");
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { token } = useAuth();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const submitTask = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      subjectTag,
      status,
      description,
    };

    try {
      const response = await fetch(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/tasks");
      }, 2000);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  const cancelCreate = () => {
    navigate("/tasks");
  };

  return (
    <div className="relative flex justify-center items-center mt-10 px-4">
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          Task created successfully!
        </div>
      )}

      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create New Task
        </h2>

        <form onSubmit={submitTask} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Task Title
            </label>
            <input
              className="border p-2 rounded w-full"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Subject
            </label>
            <input
              className="border p-2 rounded w-full"
              placeholder="Enter subject"
              value={subjectTag}
              onChange={(e) => setSubjectTag(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Task Status
            </label>
            <select
              className="border p-2 rounded w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="upcomingTasks">Upcoming</option>
              <option value="toDo">ToDo</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              className="border p-2 rounded w-full h-28 resize-none"
              placeholder="Enter task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={cancelCreate}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>

      {/* Fade animation */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.4s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default CreateTask;
