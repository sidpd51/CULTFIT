import { z } from "zod";

// Matches YYYY-MM-DD
const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;

// Matches HH:mm or HH:mm:ss (24-hour format)
const timeOnlyRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

export const createClassScheduleSchema = z.object({
    centerId: z.number({
        required_error: "centerId is required",
    }).min(1, "centerId min value should be 1"),

    classTypeId: z.number({
        required_error: "classTypeId is required",
    }).min(1, "classTypeId min value should be 1"),

    isRecurring: z.boolean().optional(),

    startDate: z.string()
        .refine(dateStr => {
            return dateOnlyRegex.test(dateStr) && !isNaN(new Date(dateStr).getTime());
        }, {
            message: "startDate must be a valid date in YYYY-MM-DD format"
        })
        .optional(),

    endDate: z.string()
        .refine(dateStr => {
            return dateOnlyRegex.test(dateStr) && !isNaN(new Date(dateStr).getTime());
        }, {
            message: "endDate must be a valid date in YYYY-MM-DD format"
        })
        .optional(),

    startTime: z.string()
        .refine(timeStr => {
            return timeOnlyRegex.test(timeStr);
        }, {
            message: "startTime must be in HH:mm or HH:mm:ss format"
        })
        .optional(),

    dayIds: z.array(z.number()) // fill this in as needed
}).strip();
