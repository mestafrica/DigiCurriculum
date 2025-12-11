import Joi from "joi";

// Create Calendar Event Validator
export const calendarEventValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().greater(Joi.ref('start')).required().messages({
        'date.greater': 'End date must be after start date'
    }),
    recurring: Joi.boolean().default(false),
    eventType: Joi.string().required().valid(
        'class', 'meeting', 'deadline', 'other',
        'Class', 'Meeting', 'Deadline', 'Other'
    ),
    recurringPattern: Joi.string()
        .valid('daily', 'weekly', 'monthly', 'none')
        .when('recurring', {
            is: true,
            then: Joi.required().messages({
                'any.required': 'Recurring pattern is required when recurring is true'
            }),
            otherwise: Joi.optional()
        }),
    userId: Joi.string().optional(), 
   
});

// Update Calendar Event Validator
export const updateCalendarEventValidator = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    start: Joi.date().optional(),
    end: Joi.date().optional(),
    recurring: Joi.boolean().optional(),
    eventType: Joi.string().optional().valid(
        'class', 'meeting', 'deadline', 'other',
        'Class', 'Meeting', 'Deadline', 'Other'
    ),
    recurringPattern: Joi.string().optional().valid('daily', 'weekly', 'monthly', 'none'),
    
}).min(1).messages({
    'object.min': 'At least one field must be provided for update'
});

// Calendar Event ID Validator
export const calendarEventIdValidator = Joi.object({
    id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
        'string.pattern.base': 'Invalid calendar event ID format'
    }),
});