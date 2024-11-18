import { deleteCalendar, fetchCalendar, generateCalendar, updateCalendar } from "../controllers/calendarControllers.js";
import { isAuthenticated, developerPermission } from "../middlewares/auth.js";
import Router from "express";



const CalendarRouter = Router();

CalendarRouter.post('/create-schedule',isAuthenticated, developerPermission('create_schedule'),generateCalendar);


CalendarRouter.get('/all-schedules', isAuthenticated, developerPermission('get_all_schedules'), fetchCalendar)


CalendarRouter.patch('/update-schedule/:id', isAuthenticated, developerPermission('update_schedule'), updateCalendar)


CalendarRouter.delete('/delete-schedule/:id', isAuthenticated, developerPermission('delete_schedule'),deleteCalendar)

export default CalendarRouter;
