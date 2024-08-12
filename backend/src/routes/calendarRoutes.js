import { deleteCalendar, fetchCalendar, generateCalendar, updateCalendar } from "../controllers/calendarControllers.js";
import Router from "express"



const router = Router();

router.post('/create-schedule',generateCalendar);
router.get('/all-schedules', fetchCalendar)
router.put('/update-schedule/:id', updateCalendar)
router.delete('/delete-schedule/:id',deleteCalendar)

export default router;
