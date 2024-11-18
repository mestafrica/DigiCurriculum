import { Router } from "express";
import { bulkGetCurriculums, createCurriculum, deleteCurriculum, getAllCurriculums, getCurriculumByGrade, updateCurriculum } from "../controllers/curriculuControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

// Routes for CRUD operations
router.post('/curriculum',  createCurriculum);

router.patch('/curriculum/:code', updateCurriculum)

router.delete('/curriculum/:code', deleteCurriculum)

router.get('/curriculum', getAllCurriculums);

router.get('/curriculum/:grade', getCurriculumByGrade);

router.post('/curriculum/bulk', bulkGetCurriculums)


export default router;