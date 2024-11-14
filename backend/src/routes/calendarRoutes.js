import { deleteCalendar, fetchCalendar, generateCalendar, updateCalendar } from "../controllers/calendarControllers.js";
import { isAuthenticated, hasPermissions } from "../middlewares/auth.js";
import Router from "express"



const router = Router();

router.post('/create-schedule',isAuthenticated, hasPermissions('create_schedule'),generateCalendar);
router.get('/all-schedules', isAuthenticated, hasPermissions('get_all_schedules'), fetchCalendar)
router.patch('/update-schedule/:id', isAuthenticated, hasPermissions('update_schedule'), updateCalendar)
router.delete('/delete-schedule/:id', isAuthenticated, hasPermissions('delete_schedule'),deleteCalendar)

export default router;
