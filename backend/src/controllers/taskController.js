import Task from "../models/taskModel.js";

// allowed statuses centralised
const VALID_STATUSES = ["upcoming-tasks", "to-do", "in-progress", "done"];

// Create a new task
export const createTask = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth?.sub;
    if (!userId)
      return res.status(401).json({ error: "Unauthorized - No user ID found" });

    const { title, description, subjectTag, status } = req.body;

    if (!title || !subjectTag) {
      return res
        .status(400)
        .json({ error: "Title and subject tag are required" });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const task = await Task.create({
      title,
      description: description || "",
      subjectTag,
      status: status || "upcoming-tasks",
      owner: userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("createTask error:", error);
    return res.status(500).json({ error: "Failed to create task" });
  }
};

// Get all tasks for authenticated user (grouped by status)
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth?.sub;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });

    const groupedTasks = {
      "upcoming-tasks": tasks.filter((t) => t.status === "upcoming-tasks"),
      "to-do": tasks.filter((t) => t.status === "to-do"),
      "in-progress": tasks.filter((t) => t.status === "in-progress"),
      done: tasks.filter((t) => t.status === "done"),
    };

    return res.status(200).json(groupedTasks);
  } catch (error) {
    console.error("getAllTasks error:", error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get tasks by specific status
export const getTasksByStatus = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth?.sub;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { status } = req.params;
    if (!VALID_STATUSES.includes(status))
      return res.status(400).json({ error: "Invalid status" });

    const tasks = await Task.find({ owner: userId, status }).sort({
      createdAt: -1,
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("getTasksByStatus error:", error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth?.sub;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const task = await Task.findOne({ _id: id, owner: userId });

    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json(task);
  } catch (error) {
    console.error("getTaskById error:", error);
    return res.status(500).json({ error: "Failed to fetch task" });
  }
};

// Update a task 
export const updateTask = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth?.sub;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, subjectTag, status } = req.body;

    const update = {};
    if (typeof title !== "undefined") update.title = title;
    if (typeof description !== "undefined") update.description = description;
    if (typeof subjectTag !== "undefined") update.subjectTag = subjectTag;
    if (typeof status !== "undefined") {
      if (!VALID_STATUSES.includes(status))
        return res.status(400).json({ error: "Invalid status value" });
      update.status = status;
    }

    // prevent owner modification
    delete update.owner;

    const task = await Task.findOneAndUpdate(
      { _id: id, owner: userId },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!task)
      return res
        .status(404)
        .json({ error: "Task not found or not owned by user" });

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("updateTask error:", error);
    return res.status(500).json({ error: "Failed to update task" });
  }
};

// Move task to different status 
export const moveTaskStatus = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth?.sub;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status))
      return res.status(400).json({ error: "Invalid status" });

    const task = await Task.findOneAndUpdate(
      { _id: id, owner: userId },
      { $set: { status } },
      { new: true }
    );

    if (!task)
      return res
        .status(404)
        .json({ error: "Task not found or not owned by user" });

    return res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("moveTaskStatus error:", error);
    return res.status(500).json({ error: "Failed to update task status" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth?.sub;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const deleted = await Task.findOneAndDelete({ _id: id, owner: userId });

    if (!deleted)
      return res
        .status(404)
        .json({ error: "Task not found or not owned by user" });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("deleteTask error:", error);
    return res.status(500).json({ error: "Failed to delete task" });
  }
};

export default {
  createTask,
  getAllTasks,
  getTasksByStatus,
  getTaskById,
  updateTask,
  moveTaskStatus,
  deleteTask,
};
