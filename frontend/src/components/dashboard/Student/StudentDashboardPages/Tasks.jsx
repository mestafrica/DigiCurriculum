import React, { useEffect, useState } from "react";
import TaskColumn from "./TaskColunm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tasks`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const goToCreateTask = () => {
    navigate("/create-task");
  };

  // Filter tasks by status
  const filterTasks = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  const deleteTask = async (id) => {
    if (!confirm("Do you want to delete this task?")) return;

    try {
      const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete task");

      // remove from UI
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <>
      <div className="md:mt-20 mt-10 flex flex-col items-center p-4 bg-blue-100">
        <div className="bg-blue-100 flex flex-col md:flex-row gap-4 w-full ">
          <TaskColumn
            title="Upcoming Tasks"
            tasks={filterTasks("upcomingTasks")}
            onDelete={deleteTask}
          />

          <TaskColumn
            title="To Do Tasks"
            tasks={filterTasks("toDo")}
            onDelete={deleteTask}
          />

          <TaskColumn
            title="In Progress"
            tasks={filterTasks("inProgress")}
            onDelete={deleteTask}
          />

          <TaskColumn
            title="Done"
            tasks={filterTasks("done")}
            onDelete={deleteTask}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Link to="/create-task">
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded">
              +
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Tasks;
