import express from "express";
import { generateLessonPlan, getLessonPlans, updateLessonPlan, deleteLessonPlan } from "../controllers/lessonPlanController.js";

const router = express.Router();

router.post("/generate/lessonplan", generateLessonPlan);
router.get("/lessonplans", getLessonPlans);
router.patch("/lessonplans/:id", updateLessonPlan);
router.delete("/lessonplans/:id", deleteLessonPlan);

export default router;
