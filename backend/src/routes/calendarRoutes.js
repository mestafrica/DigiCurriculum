import { deleteCalendar, fetchCalendar, generateCalendar, updateCalendar } from "../controllers/calendarControllers.js";
import { isAuthenticated, developerPermission } from "../middlewares/auth.js";
import Router from "express";



const CalendarRouter = Router();

CalendarRouter.post('/create-schedule', generateCalendar);


CalendarRouter.get('/all-schedules', fetchCalendar)


CalendarRouter.patch('/update-schedule/:id', updateCalendar)


CalendarRouter.delete('/delete-schedule/:id', deleteCalendar)

export default CalendarRouter;
