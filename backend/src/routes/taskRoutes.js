import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createTask,
  getAllTasks,
  getTasksByStatus,
  getTaskById,
  updateTask,
  moveTaskStatus,
  deleteTask
} from "../controllers/taskController.js";

const taskRouter = express.Router();

// Task routes (all protected with authentication)
taskRouter.post("/tasks", isAuthenticated, createTask);
taskRouter.get("/tasks", isAuthenticated, getAllTasks);
taskRouter.get("/tasks/status/:status", isAuthenticated, getTasksByStatus);
taskRouter.get("/tasks/:id", isAuthenticated, getTaskById);
taskRouter.patch("/tasks/:id", isAuthenticated, updateTask);
taskRouter.patch("/tasks/:id/status", isAuthenticated, moveTaskStatus);
taskRouter.delete("/tasks/:id", isAuthenticated, deleteTask);

export default taskRouter;