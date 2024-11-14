import express from "express";
import { searchCurriculumHandler } from "../controllers/searchCurricula.js"

const router = express.Router();

// Search routes
router.get("/curriculum/search", searchCurriculumHandler);

export default router;
