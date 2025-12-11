import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

// Create Calendar Event Schema
const calendarEventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    recurring: { type: Boolean, required: true, default: false },
    eventType: { 
        type: String, 
        enum: ['class', 'meeting', 'deadline', 'other', 'Class', 'Meeting', 'Deadline', 'Other'], 
        required: true 
    },
    recurringPattern: { 
        type: String, 
        enum: ['daily', 'weekly', 'monthly', 'none'], 
        required: false // Only required when recurring is true
    },
    userId: { 
        type: Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
    deletedAt: { 
        type: Date, 
        default: null 
    },
}, 
{ timestamps: true }
);

calendarEventSchema.plugin(normalize);

export const CalendarEventModel = model("CalendarEvent", calendarEventSchema);