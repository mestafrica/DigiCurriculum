import { Router } from "express";
import {createCurriculum, getCurriculumByGrade, updateCurriculum, deleteCurriculum } from "../controllers/curriculumControllers.js";

const router = Router();

router.post('/curriculums', createCurriculum);
router.get('/curriculums/:grade', getCurriculumByGrade);
router.put('/curriculums/:code', updateCurriculum);
router.delete('/curriculums/:code', deleteCurriculum);

export default router;
