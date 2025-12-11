import { Router } from "express";
import { addCalendarEvent, deleteCalendarEvent, getAllCalendarEvents, replaceCalendarEVent } from "../controllers/calendarEventController.js";

import { isAuthenticatedCalendarEvent, isAuthorizedCalendarEvent } from "../middlewares/calendarEventAuth.js";

const calendarEventRouter = Router ();

// Create calendar event routes


// get calender events 
calendarEventRouter.get("/api/calendar/events", getAllCalendarEvents);

// Add calendar event
calendarEventRouter.post("/api/calendar/events", isAuthenticatedCalendarEvent, isAuthorizedCalendarEvent(["Teacher", "Admin"]), addCalendarEvent);

// Replace calendar event
calendarEventRouter.put("/api/calendar/events/:id", isAuthenticatedCalendarEvent, isAuthorizedCalendarEvent(["Teacher", "Admin"]), replaceCalendarEVent);

// Delete Calendar event
calendarEventRouter.delete("/api/calendar/events/:id", isAuthenticatedCalendarEvent, isAuthorizedCalendarEvent(["Teacher", "Admin"]), deleteCalendarEvent)


// export router

export default calendarEventRouter;
