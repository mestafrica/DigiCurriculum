import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [subjectTag, setSubjectTag] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Fetch existing task by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${baseUrl}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }

        const data = await response.json();

        setTitle(data.title);
        setSubjectTag(data.subjectTag);
        setStatus(data.status);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        console.error("Error loading task:", error);
        alert("Failed to load task.");
        navigate("/tasks");
      }
    };

    fetchTask();
  }, [id, token, navigate]);

  // Handle Update
  const updateTask = async (e) => {
    e.preventDefault();

    const updatedTask = {
      title,
      subjectTag,
      status,
      description,
    };

    try {
      const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/tasks");
      }, 2000);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading task...</p>;

  return (
    <div className="relative flex justify-center items-center mt-10 px-4">
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          Task updated successfully!
        </div>
      )}

      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Edit Task
        </h2>

        <form onSubmit={updateTask} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Task Title
            </label>
            <input
              className="border p-2 rounded w-full"
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
              value={subjectTag}
              onChange={(e) => setSubjectTag(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Task Stage
            </label>
            <select
              className="border p-2 rounded w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="upcomingTasks">Upcoming</option>
              <option value="toDo">To Do</option>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>

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

export default EditTask;
