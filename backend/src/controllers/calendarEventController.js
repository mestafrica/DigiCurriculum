import { CalendarEventModel } from "../models/calendarEventModel.js";  
import { calendarEventValidator, calendarEventIdValidator, updateCalendarEventValidator } from "../../validator/calendarEventValidator.js";

// Get all calendar events
export const getAllCalendarEvents = async (req, res) => {
    try{
        const { filter = "{}",sort = "{}" } = req.query;
        const result = await CalendarEventModel.find({
            ...JSON.parse(filter),
            isDeleted: false,
        }).sort(JSON.parse(sort));
        
        if ( result.length === 0 ) {
            return res.status(404).json({ message: "No calendar events found." });
        }
        return res.status(200).json({ 
            message: " Here are all your Calendar events",
            data: result 
        });
    } catch (error) {
        return res.json({ 
            message: "Request unsuccessful, kindly reload the page",
            status: "error"
        });
    }
};

// Create a new calendar event
export const addCalendarEvent = async (req, res) => {
    try {
        const { error, value } = calendarEventValidator.validate({...req.body}, 
            { abortEarly: false}
        );
        if (error) {
            return res.status(422).json({ 
                message: "Validation unsuccessful",
                details: error.details,
                status: "error"
            });
        }

        if (!req.auth?.userId){ // FIXED: changed from id to userId
            return res.status(401).json({ 
                message: "User is not authenticated",
                status: "error"
            });
        }

        // Save the new calendar event to the database
        const result = await CalendarEventModel.create({
            ...value,
            userId: req.auth.userId, // FIXED: changed from id to userId
        });
        return res.status(201).json(result);
    }
    catch (error) {
        console.error("Error creating calendar event:", error);
        
        if (error.name === "MongooseError") {
            return res.status(409).json({
                message: "Request not successful, Internal server error",
                status: "error",
            });
        }

        return res.status(500).json({ 
            message: "Internal server error",
            status: "error"
        });
    }
};

export const calendarEventsByUser = async (req, res) => {
    try {
        const { filter = "{}", sort = "{}" } = req.query;

        const result = await CalendarEventModel.find({
            ...JSON.parse(filter),
            userId: req.params.userId,
            isDeleted: false,
        }).sort(JSON.parse(sort));

        if (result.length === 0) {
            return res.status(404).json({ message: "No Calendar events found" });
        }
        res.json({
            message: "Here are your calendar events",
            data: result,
        });
    } catch (error) {
        return res.json({
            message: "Request not successful, kindly refresh your page",
            status: "error",
        });
    }
};

// Get one listing
export const getOneCalendarEvent = async (req, res) => {
    try {
        const { error, value } = calendarEventIdValidator.validate(req.params, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({ message: "Validation unsuccessful", status: "error" });
        }
        const result = await CalendarEventModel.findById(value.id);
        if (!result) {
            return res.status(404).json({ message: "No calendar events found" });
        }
        res.json(result);
    } catch (error) {
        return res.json({
            message: "Request unsuccessful, kindly refresh your application",
        });
    }
};

// Update/Patch Event
export const updateCalendarEvent = async (req, res) => {
    try {
        const { error, value } = updateCalendarEventValidator.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                message: "Validation Unsuccessful",
                status: "error",
            });
        }

        // Find EVENT by Id
        const confirmEvent = await CalendarEventModel.findById(req.params.id);
        if (!confirmEvent) {
            return res.status(400).json({ message: "Calendar event not found", status: "error" });
        }

        // Confirm that the authenticated user is the rightful owner
        if (confirmEvent.userId.toString() !== req.auth.userId) { // FIXED: changed from id to userId
            return res.status(403).json({ message: "You are not authorized to update this calendar event" });
        }

        // Continue to update the calendar event
        const result = await CalendarEventModel.findByIdAndUpdate(req.params.id, value, {
            new: true,
        });

        if (!result) {
            return res.json({ message: "Calendar event not found", status: "error" });
        }

        res.status(200).json({
            message: "Calendar event successfully updated",
            data: result,
            status: "success",
        });
    } catch (error) {
        return res.status(404).json({
            message: "Request unsuccessful, kindly refresh your application",
            status: "error",
        });
    }
};

// Put/ Replace calendar event
export const replaceCalendarEVent = async (req, res) => {
    try {
        const { error, value } = calendarEventValidator.validate(req.body, { // FIXED: should validate body, not params
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({ message: "Validation Unsuccessful", status: "error" });
        }

        const confirmEvent = await CalendarEventModel.findById(req.params.id);
        if (!confirmEvent) {
            return res.status(404).json({ message: "Calendar event not found" });
        }
        if (confirmEvent.userId.toString() !== req.auth.userId) { // FIXED: changed from id to userId
            return res.status(403).json({ message: "You are not authorized to update this calendar event" });
        }

        const result = await CalendarEventModel.findByIdAndUpdate(req.params.id, value, {
            new: true,
        });
        if (!result) {
            return res.status(404).json("Calendar event not found");
        }
        res.status(200).json({
            message: "Calendar event successfully updated",
            data: result,
        });
    } catch (error) {
        return res.json({
            message: "Request unsuccessful, kindly refresh your application",
        });
    }
};

// DELETE calendar event
export const deleteCalendarEvent = async (req, res) => {
    try {
        const { error, value } = calendarEventIdValidator.validate(req.params, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({ message: "Validation unsuccessful", status: "error" });
        }

        const confirmEvent = await CalendarEventModel.findById(value.id);
        if (!confirmEvent) {
            return res.status(400).json({ message: "Calendar event not found" });
        }

        if (!req.auth || confirmEvent.userId.toString() !== req.auth.userId) { // FIXED: changed from id to userId
            return res.status(403).json({ message: "You are not authorized to delete this calendar event" });
        }

        const result = await CalendarEventModel.findByIdAndUpdate(
            value.id,
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "Calendar event not found" });
        }

        res.status(200).json({
            message: "Calendar event deleted successfully",
            data: result,
            status: "success",
        });
    } catch (error) {
        console.error("Delete calendar event error:", error);
        return res.status(500).json({
            message: "Request unsuccessful, kindly refresh your application",
            status: "error",
        });
    }
};

// View deleted calendar events using userid
export const viewDeletedCalendarEvents = async (req, res) => {
    try {
        // Confirm ownership
        if (req.params.userId !== req.auth.userId) { // FIXED: changed from id to userId
            return res.status(403).json({
                message: "You are not authorized to view these deleted calendar events",
            });
        }

        const result = await CalendarEventModel.find({
            userId: req.params.userId,
            isDeleted: true,
        });

        if (result.length === 0) {
            return res.status(404).json({ message: "No deleted calendar event found" });
        }

        res.status(200).json({ 
            message: "Here are your deleted calendar events", 
            data: result 
        });
    } catch (error) {
        return res.status(404).json({
            message: "Request unsuccessful, kindly refresh your application",
        });
    }
};