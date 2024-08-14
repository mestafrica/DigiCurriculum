import { Router } from "express";
import generateAssessment, {
  deleteAssessment,
  getAssessments,
  updateAssessment,
} from "../controllers/assessmentController.js";

const router = Router();

router.get("/api/assessments", getAssessments);
router.post("/api/assessments", generateAssessment);
router.put("/api/assessments/:id", updateAssessment);
router.delete("/api/assessments/:id", deleteAssessment);

export default router;
