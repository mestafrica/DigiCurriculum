import { calendarModel } from "../models/calendarModel.js";
import { generateContent } from "../utils/gemini.js";
// import { curriculumModel } from "../models/curriculum.js";

function CalculateEndDate(startDate, period) {
    const start = new Date(startDate);
    const end = new Date(start);

    const periodMatch = period.match(/^(\d+)\s*(week|weeks)$/i);
    if (!periodMatch) {
        throw new Error(`Unsupported period format: ${period}`);
    }

    const numberOfWeeks = parseInt(periodMatch[1], 10);
    end.setDate(start.getDate() + numberOfWeeks * 7);

    return end.toISOString();
}

function cleanGeneratedContent(content) {
    return content
        .replace(/^```json\n/, "")
        .replace(/```$/, "")
        .trim();
}

export const generateCalendar = async (req, res) => {
    const {
        gradeLevel,
        courseName,
        strandCode,
        startDate,
        period,
        applicableDays,
    } = req.body;

    try {
        if (!period) {
            return res.status(400).json({ message: "Period is required" });
        }
        if (!strandCode) {
            return res.status(400).json({ message: "Strandcode is required" });
        }
        if (!applicableDays || !Array.isArray(applicableDays)) {
            return res.status(400).json({ message: "ApplicableDays is required and must be an array." });
        }

        const endDate = CalculateEndDate(startDate, period);

        const curriculum = await curriculumModel.findOne({
            gradeLevel,
            "courses.courseName": courseName,
        });

        if (!curriculum) {
            return res.status(404).json({
                message: `No curriculum found for grade level ${gradeLevel} with course ${courseName}`,
            });
        }

        const course = curriculum.courses.find((c) => c.courseName === courseName);
        if (!course) {
            return res.status(404).json({ message: `No course found with name ${courseName}` });
        }

        const strand = course.strands.find((strand) => strand.code === strandCode);
        if (!strand) {
            return res.status(404).json({ message: `No strand found with code ${strandCode}` });
        }

        console.log("Course data:", course);

        const prompt = `
            Generate an academic calendar for grade ${gradeLevel} from ${startDate} to ${endDate}.
            The curriculum structure is as follows:
            ${JSON.stringify(strand, null, 2)}
            
            For each course, sub-strand, and performance indicator, create a scheduled lesson.
            Format the output as a JSON array of scheduled lessons, where each lesson has the following structure:
            {
              "date": "YYYY-MM-DDTHH:mm:ss.sssZ",
              "courseCode": "string",
              "strandCode": "string",
              "subStrandCode": "string",
              "performanceIndicatorCode": "string",
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
                message: `Failed to parse generated content as JSON: ${error.message}`,
            });
        }

        // Ensure each lesson has the strandCode if not already provided
        scheduledLessons = scheduledLessons.map((lesson) => ({
            ...lesson,
            date: new Date(lesson.date).toISOString(),
            strandCode: lesson.strandCode || strandCode,
        }));

        const calendar = new calendarModel({
            startDate: new Date(startDate).toISOString(),
            endDate: endDate,
            gradeLevel,
            strandCode,
            period,
            applicableDays,
            scheduledLessons,
        });

        await calendar.save();
        res.status(201).json({message: "schedule generated successfully",
           schedule: calendar});

    } catch (error) {
        console.error("Error generating calendar:", error);
        res.status(500).json({ message: "Error generating calendar", error: error.message });
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
