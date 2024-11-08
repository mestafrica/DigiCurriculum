import { Router } from "express";
import { bulkGetCurriculums, createCurriculum, deleteCurriculum, getAllCurriculums, getCurriculumByGrade, updateCurriculum } from "../controllers/curriculuControllers.js";
import { isAuthenticated, hasPermissions } from "../middlewares/auth.js";

const router = Router();

// Routes for CRUD operations
router.post('/curriculum', isAuthenticated, hasPermissions('create_curriculum'), createCurriculum);

router.patch('/curriculum/:code',isAuthenticated, hasPermissions('update_curriculum'), updateCurriculum)

router.delete('/curriculum/:code',isAuthenticated, hasPermissions('delete_curriculum'), deleteCurriculum)

router.get('/curriculum',isAuthenticated, hasPermissions('get_all_curriculums'), getAllCurriculums);

router.get('/curriculum/:grade',isAuthenticated, hasPermissions('get_curriculum_by_grade'), getCurriculumByGrade);

router.post('/curriculum/bulk',isAuthenticated, hasPermissions('bulk_get_curriculums'), bulkGetCurriculums)


export default router;