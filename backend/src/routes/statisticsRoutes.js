import express from "express";
import { getStatistics } from "../controllers/statisticsController.js";

const statisticsRouter = express.Router();

// Route to fetch Statistics
statisticsRouter.get("/statistics", getStatistics);

export default statisticsRouter;