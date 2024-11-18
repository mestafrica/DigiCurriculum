import { calendarModel } from "../models/calendarModel.js";
import { generateContent } from "../utils/gemini.js";
import CurriculumModel from "../models/curriculumModel.js";


function CalculateEndDate(startDate, period) {
    const start = new Date(startDate);
    if (isNaN(start)) {
        throw new Error("Invalid start date provided.");
    }

    const periodMatch = period.match(/^(\d+)\s*(week|weeks)$/i);
    if (!periodMatch) {
        throw new Error(`Unsupported period format: ${period}`);
    }

    const numberOfWeeks = parseInt(periodMatch[1], 10);
    const end = new Date(start);
    end.setDate(start.getDate() + numberOfWeeks * 7);

    return end.toISOString();
}


export const generateCalendar = async (req, res) => {
    const {
        grade,      // Use grade instead of gradeLevel
        name,       // Curriculum name
        strandCode, // Strand code
        startDate,
        period,
        applicableDays,
    } = req.body;

    try {
        // Log the request body for debugging
        console.log("Request Body:", req.body);

        // Validate inputs
        if (!grade || typeof grade !== "number") {
            return res.status(400).json({ message: "Valid grade (number) is required." });
        }
        if (!name) {
            return res.status(400).json({ message: "Curriculum name (name) is required." });
        }
        if (!strandCode) {
            return res.status(400).json({ message: "Strand code is required." });
        }
        if (!startDate || isNaN(new Date(startDate))) {
            return res.status(400).json({ message: "Valid startDate is required." });
        }
        if (!period || typeof period !== "string") {
            return res.status(400).json({
                message: "Period must be a string in the format 'X weeks'.",
            });
        }
        if (!applicableDays || !Array.isArray(applicableDays)) {
            return res.status(400).json({ message: "Applicable days must be an array." });
        }

        // Calculate the end date
        const endDate = CalculateEndDate(startDate, period);

        // Fetch the curriculum using grade and name (instead of gradeLevel and courseName)
        const curriculum = await CurriculumModel.findOne({
            grade,      // Use grade from the request body
            name: name, // Use curriculum name here
        });

        if (!curriculum) {
            return res.status(404).json({
                message: `No curriculum found for grade ${grade} with curriculum name ${name}.`,
            });
        }

        // Find the strand
        const strand = curriculum.strands.find((s) => s.code === strandCode);
        if (!strand) {
            return res.status(404).json({ message: `No strand found with code ${strandCode}.` });
        }

        // Generate the calendar using the AI service
        const prompt = `
            Generate an academic calendar for grade ${grade} from ${startDate} to ${endDate}.
            The curriculum structure is as follows:
            ${JSON.stringify(strand, null, 2)}
            
            For each sub-strand and learning indicator, create a scheduled lesson.
            Format the output as a JSON array of scheduled lessons, where each lesson has the following structure:
            {
              "date": "YYYY-MM-DDTHH:mm:ss.sssZ",
              "strandCode": "string",
              "subStrandCode": "string",
              "learningIndicator": "string",
              "description": "string"
            }
            
            Ensure that lessons are only scheduled on the following days: ${applicableDays.join(", ")}.
            Distribute them evenly across the given date range.
        `;

        const generatedText = await generateContent(prompt);
        const cleanedText = cleanGeneratedContent(generatedText);

        let scheduledLessons;
        try {
            scheduledLessons = JSON.parse(cleanedText);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to parse generated content as JSON.",
                error: error.message,
            });
        }

        // Ensure each lesson has the strandCode
        scheduledLessons = scheduledLessons.map((lesson) => ({
            ...lesson,
            date: new Date(lesson.date).toISOString(),
            strandCode: lesson.strandCode || strandCode,
        }));

        // Save the generated calendar
        const calendar = new calendarModel({
            startDate: new Date(startDate).toISOString(),
            endDate,
            grade,      // Store the grade in the calendar
            strandCode,
            period,
            applicableDays,
            scheduledLessons,
        });

        await calendar.save();

        res.status(201).json({
            message: "Schedule generated successfully.",
            schedule: calendar,
        });
    } catch (error) {
        console.error("Error generating calendar:", error);
        res.status(500).json({
            message: "Error generating calendar.",
            error: error.message,
        });
    }
};





export const fetchCalendar = async (req, res) => {
    try {
        const getAllCalendars = await calendarModel.find();
        res.status(200).json({message: "Displaying all schedules",
           schedules: getAllCalendars});
    } catch (error) {
        res.status(500).json({ message: "Error fetching calendars", error });
    }
};


export const updateCalendar = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        const calendarUpdate = await calendarModel.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!calendarUpdate) {
            return res.status(404).json({ message: "Calendar entry not found" });
        }

        res.status(200).json({message: "Schedule updated successfully",
            calendarUpdate});
    } catch (error) {
        res.status(500).json({ message: "Error updating calendar entry", error });
    }
};

export const deleteCalendar = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedCalendar = await calendarModel.findByIdAndDelete(id);

        if (!deletedCalendar) {
            return res.status(404).json({ message: "Calendar entry not found" });
        }

        res.status(200).json({ message: "Calendar entry deleted successfully", deletedCalendar });
    } catch (error) {
        res.status(500).json({ message: "Error deleting calendar entry", error });
    }
};
