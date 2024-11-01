import mongoose from "mongoose";


    const CalendarSchema = new mongoose.Schema({
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        gradeLevel: { type: Number, required: true, min: 1 },
        strandCode: { type: String, required: true },
        period: { type: String, required: true },
        applicableDays: { type: [String], required: true },

        scheduledLessons: [
          {
            date: { type: Date, required: true },
            courseCode: { type: String, required: true },
            strandCode: { type: String, required: true },
            subStrandCode: { type: String, required: true },
            performanceIndicatorCode: { type: String, required: true },
            description: { type: String, required: true },
          },
        ],
      });
      
  


export const calendarModel = mongoose.model('Calendar', CalendarSchema)